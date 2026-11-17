#!/usr/bin/env python3
"""Generates the palette-based themes in themes/ from palette data and tools/template.json.

The template is Spotube's flat "Modern" theme (solid surfaces, hairline borders, no gloss). Each palette supplies
light and dark colours and a list of accent choices (exposed to users as the "Accent color" parameter). Text on every
accent is picked by contrast, so a pastel accent never gets white text.

Neon Noir and Candy Pop are hand-written and not produced here.

usage: build_themes.py [palette-id ...]
"""
import copy, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from make_logo import make_logo  # noqa: E402

OUT = os.path.join(os.path.dirname(HERE), 'themes')
REPO = 'https://github.com/team-spotube/themes'


# ---- colour maths ---------------------------------------------------------------------------------
def rgb(h):
    h = h.lstrip('#')
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def lum(h):
    def c(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = rgb(h)
    return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b)


def contrast(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def on(color, dark_ink):
    """Readable text colour for a filled [color]: white on saturated mid-tones (3:1 or better), else the dark ink.

    Pastel accents (white would be unreadable) get the palette's dark ink; anything white can carry stays white,
    which is what people expect on a primary button.
    """
    return '#ffffff' if contrast('#ffffff', color) >= 3.0 else dark_ink


def mix(a, b, t):
    return '#' + ''.join(f'{round(x + (y - x) * t):02x}' for x, y in zip(rgb(a), rgb(b)))


# ---- palettes ---------------------------------------------------------------------------------------
# Each mode: bg, surface, raised, muted, border, text, subtext (secondary text); accents: name -> hex.
# `swatch` accent names are shown in the settings UI (dark-mode colour); `default` is the signature accent.
PALETTES = {
    'dracula': dict(
        name='Dracula', blurb='The classic dark theme with vivid purple and pink, and its light sibling Alucard.',
        upstream='https://draculatheme.com', holder='Dracula Theme authors', default='purple', radius=8,
        dark=dict(bg='#282a36', surface='#21222c', raised='#343746', muted='#343746', border='#44475a', text='#f8f8f2', subtext='#a4abd0',
                  success='#50fa7b', danger='#ff5555',
                  accents=dict(purple='#bd93f9', pink='#ff79c6', cyan='#8be9fd', green='#50fa7b', orange='#ffb86c', yellow='#f1fa8c')),
        light=dict(bg='#fffbeb', surface='#fffef5', raised='#ffffff', muted='#f1ecd8', border='#cfcfde', text='#1f1f1f', subtext='#6c664b',
                   success='#14710a', danger='#cb3a2a',
                   accents=dict(purple='#644ac9', pink='#a3144d', cyan='#036a96', green='#14710a', orange='#a34d14', yellow='#846e15')),
    ),
    'nord': dict(
        name='Nord', blurb='An arctic, north-bluish palette: calm polar-night greys and cool frost accents.',
        upstream='https://www.nordtheme.com', holder='Arctic Ice Studio', default='frost', radius=4,
        dark=dict(bg='#2e3440', surface='#3b4252', raised='#434c5e', muted='#434c5e', border='#4c566a', text='#eceff4', subtext='#aab3c5',
                  success='#a3be8c', danger='#bf616a',
                  accents=dict(frost='#88c0d0', blue='#81a1c1', teal='#8fbcbb', green='#a3be8c', orange='#d08770', purple='#b48ead')),
        light=dict(bg='#eceff4', surface='#e5e9f0', raised='#ffffff', muted='#dde3ec', border='#d0d6e2', text='#2e3440', subtext='#596478',
                   success='#5f8a46', danger='#bf616a',
                   accents=dict(frost='#5e81ac', blue='#4a6fa5', teal='#4f8c8b', green='#5f8a46', orange='#b4623f', purple='#8d6a8c')),
    ),
    'catppuccin': dict(
        name='Catppuccin', blurb='Soothing pastels: Latte by day, Mocha by night, with your pick of accent.',
        upstream='https://catppuccin.com', holder='Catppuccin', default='mauve', radius=12,
        dark=dict(bg='#1e1e2e', surface='#181825', raised='#313244', muted='#313244', border='#45475a', text='#cdd6f4', subtext='#a6adc8',
                  success='#a6e3a1', danger='#f38ba8',
                  accents=dict(mauve='#cba6f7', blue='#89b4fa', pink='#f5c2e7', green='#a6e3a1', peach='#fab387', red='#f38ba8', teal='#94e2d5', lavender='#b4befe')),
        light=dict(bg='#eff1f5', surface='#e6e9ef', raised='#ffffff', muted='#ccd0da', border='#bcc0cc', text='#4c4f69', subtext='#6c6f85',
                   success='#40a02b', danger='#d20f39',
                   accents=dict(mauve='#8839ef', blue='#1e66f5', pink='#ea76cb', green='#40a02b', peach='#fe640b', red='#d20f39', teal='#179299', lavender='#7287fd')),
    ),
    'gruvbox': dict(
        name='Gruvbox', blurb='Retro groove: warm, earthy, low-contrast colours that are easy on the eyes.',
        upstream='https://github.com/morhetz/gruvbox', holder='Pavel Pertsev', default='orange', radius=2,
        dark=dict(bg='#282828', surface='#32302f', raised='#3c3836', muted='#3c3836', border='#504945', text='#ebdbb2', subtext='#a89984',
                  success='#b8bb26', danger='#fb4934',
                  accents=dict(orange='#fe8019', yellow='#fabd2f', green='#b8bb26', aqua='#8ec07c', blue='#83a598', purple='#d3869b')),
        light=dict(bg='#fbf1c7', surface='#f2e5bc', raised='#fdf6d8', muted='#ebdbb2', border='#d5c4a1', text='#3c3836', subtext='#7c6f64',
                   success='#79740e', danger='#9d0006',
                   accents=dict(orange='#af3a03', yellow='#b57614', green='#79740e', aqua='#427b58', blue='#076678', purple='#8f3f71')),
    ),
    'solarized': dict(
        name='Solarized', blurb='Precision colours for machines and people: the original dark and light pair.',
        upstream='https://ethanschoonover.com/solarized', holder='Ethan Schoonover', default='blue', radius=2,
        dark=dict(bg='#002b36', surface='#073642', raised='#0c4350', muted='#073642', border='#13505d', text='#93a1a1', subtext='#839496',
                  success='#859900', danger='#dc322f',
                  accents=dict(blue='#268bd2', cyan='#2aa198', green='#859900', yellow='#b58900', orange='#cb4b16', violet='#6c71c4')),
        light=dict(bg='#fdf6e3', surface='#eee8d5', raised='#fffbee', muted='#eee8d5', border='#ddd6c1', text='#586e75', subtext='#839496',
                   success='#859900', danger='#dc322f',
                   accents=dict(blue='#268bd2', cyan='#2aa198', green='#859900', yellow='#b58900', orange='#cb4b16', violet='#6c71c4')),
    ),
    'tokyo-night': dict(
        name='Tokyo Night', blurb='A clean dark theme inspired by the lights of downtown Tokyo, with a Day variant.',
        upstream='https://github.com/enkia/tokyo-night-vscode-theme', holder='enkia', default='blue', radius=6,
        dark=dict(bg='#1a1b26', surface='#16161e', raised='#24283b', muted='#292e42', border='#3b4261', text='#c0caf5', subtext='#7982a9',
                  success='#9ece6a', danger='#f7768e',
                  accents=dict(blue='#7aa2f7', purple='#bb9af7', cyan='#7dcfff', green='#9ece6a', orange='#ff9e64', red='#f7768e')),
        light=dict(bg='#e1e2e7', surface='#d5d6db', raised='#eceef3', muted='#c8cad3', border='#b4b6c4', text='#3760bf', subtext='#6172b0',
                   success='#587539', danger='#f52a65',
                   accents=dict(blue='#2e7de9', purple='#9854f1', cyan='#007197', green='#587539', orange='#b15c00', red='#f52a65')),
    ),
    'rose-pine': dict(
        name='Rosé Pine', blurb='All natural pine, faux fur and a bit of soho vibes: soft and low-contrast.',
        upstream='https://rosepinetheme.com', holder='Rosé Pine', default='iris', radius=10,
        dark=dict(bg='#191724', surface='#1f1d2e', raised='#26233a', muted='#26233a', border='#403d52', text='#e0def4', subtext='#908caa',
                  success='#9ccfd8', danger='#eb6f92',
                  accents=dict(iris='#c4a7e7', rose='#ebbcba', love='#eb6f92', gold='#f6c177', pine='#3e8fb0', foam='#9ccfd8')),
        light=dict(bg='#faf4ed', surface='#fffaf3', raised='#ffffff', muted='#f2e9e1', border='#dfdad9', text='#575279', subtext='#797593',
                   success='#56949f', danger='#b4637a',
                   accents=dict(iris='#907aa9', rose='#d7827e', love='#b4637a', gold='#ea9d34', pine='#286983', foam='#56949f')),
    ),
    'one': dict(
        name='One', blurb="Atom's One Dark and One Light: the balanced editor classics.",
        upstream='https://github.com/atom/one-dark-syntax', holder='GitHub, Inc. (Atom)', default='blue', radius=4,
        dark=dict(bg='#282c34', surface='#21252b', raised='#2c313a', muted='#2c313a', border='#3e4451', text='#abb2bf', subtext='#7f848e',
                  success='#98c379', danger='#e06c75',
                  accents=dict(blue='#61afef', purple='#c678dd', cyan='#56b6c2', green='#98c379', yellow='#e5c07b', orange='#d19a66')),
        light=dict(bg='#fafafa', surface='#f0f0f1', raised='#ffffff', muted='#eaeaeb', border='#dbdbdc', text='#383a42', subtext='#696c77',
                   success='#50a14f', danger='#e45649',
                   accents=dict(blue='#4078f2', purple='#a626a4', cyan='#0184bc', green='#50a14f', yellow='#c18401', orange='#986801')),
    ),
    'github': dict(
        name='GitHub', blurb='GitHub Primer colours: familiar, neutral and quietly blue.',
        upstream='https://primer.style', holder='GitHub, Inc. (Primer)', default='blue', radius=6,
        dark=dict(bg='#0d1117', surface='#161b22', raised='#1c2128', muted='#21262d', border='#30363d', text='#e6edf3', subtext='#8b949e',
                  success='#3fb950', danger='#f85149',
                  accents=dict(blue='#2f81f7', green='#3fb950', purple='#a371f7', orange='#db6d28', red='#f85149', yellow='#d29922')),
        light=dict(bg='#ffffff', surface='#f6f8fa', raised='#ffffff', muted='#eaeef2', border='#d0d7de', text='#1f2328', subtext='#656d76',
                   success='#1a7f37', danger='#cf222e',
                   accents=dict(blue='#0969da', green='#1a7f37', purple='#8250df', orange='#bc4c00', red='#cf222e', yellow='#9a6700')),
    ),
}

MIT = """MIT License

Copyright (c) {holder}

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
"""


def appearance(light, dark):
    return {'light': light, 'dark': dark}


def build(tid, p):
    doc = json.load(open(os.path.join(HERE, 'template.json'), encoding='utf-8'))
    L, D = p['light'], p['dark']
    ink = D['bg']  # dark text used on light accents, in both modes

    doc.update({
        'id': tid, 'name': p['name'], 'version': '1.0.0', 'author': 'Spotube Team', 'description': p['blurb'],
        'repository': REPO, 'bugs': REPO + '/issues', 'homepage': p['upstream'],
        'license': f'AGPL-3.0 (theme), MIT ({p["name"]} palette)', 'logo': 'logo.png',
    })

    # user parameters: accent choices (swatch = dark-mode colour) and the theme's signature corner radius
    names = list(D['accents'])
    doc['parameters']['accent'] = {
        'type': 'enum', 'label': 'Accent color', 'default': p['default'],
        'options': [{'value': n, 'label': n.replace('-', ' ').title(), 'color': D['accents'][n]} for n in names],
    }
    doc['parameters']['radius']['default'] = p['radius']

    v = doc['vars']
    v['bg'] = {'type': 'color', 'value': appearance(L['bg'], D['bg'])}
    v['card'] = {'type': 'color', 'value': appearance(L['surface'], D['surface'])}
    v['fg'] = {'type': 'color', 'value': appearance(L['text'], D['text'])}
    v['muted'] = {'type': 'color', 'value': appearance(L['muted'], D['muted'])}
    v['mutedFg'] = {'type': 'color', 'value': appearance(L['subtext'], D['subtext'])}
    v['border'] = {'type': 'color', 'value': appearance(L['border'], D['border'])}
    v['ring'] = {'type': 'color', 'value': ['match', '{params.accent}', {n: appearance(L['accents'][n], D['accents'][n]) for n in names}]}
    v['primary'] = {'type': 'color', 'value': ['match', '{params.accent}', {n: appearance(L['accents'][n], D['accents'][n]) for n in names}]}
    v['primaryFg'] = {'type': 'color', 'value': ['match', '{params.accent}',
                                                 {n: appearance(on(L['accents'][n], ink), on(D['accents'][n], ink)) for n in names}]}
    v['destructive'] = {'type': 'color', 'value': appearance(L['danger'], D['danger'])}
    v['destructiveFg'] = {'type': 'color', 'value': appearance(on(L['danger'], ink), on(D['danger'], ink))}
    v['wash'] = {'type': 'color', 'value': appearance('#0000000d', '#ffffff14')}
    v['shadow'] = {'type': 'color', 'value': appearance('#0000001a', '#00000080')}

    t = doc['tokens']['color']
    t['surface'] = '{vars.card}'
    t['raised'] = appearance(L['raised'], D['raised'])
    t['success'] = appearance(L['success'], D['success'])
    t['danger'] = appearance(L['danger'], D['danger'])
    t['scrim'] = appearance('#00000066', '#00000099')

    # Panels read the card colour, the page and bars read the background (cards then sit one step off the page).
    comps = doc['components']
    for name in ('card', 'dialog', 'dropdownMenu', 'snackbar', 'sidebar'):
        comps[name] = json.loads(json.dumps(comps[name]).replace('{vars.bg}', '{vars.card}'))

    folder = os.path.join(OUT, tid)
    os.makedirs(folder, exist_ok=True)
    with open(os.path.join(folder, 'theme.json'), 'w', encoding='utf-8') as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)
        f.write('\n')
    with open(os.path.join(folder, 'LICENSE'), 'w', encoding='utf-8') as f:
        f.write(f'{p["name"]} theme for Spotube\n\n'
                f'The theme definition (theme.json) is licensed under the GNU Affero General Public License v3.0 or later, '
                f'like the rest of this repository (see ../../LICENSE).\n\n'
                f'The {p["name"]} colour palette comes from {p["upstream"]} and is used under the MIT License:\n\n'
                + MIT.format(holder=p['holder']))
    make_logo(os.path.join(folder, 'logo.png'), D['accents'][p['default']], D['bg'])
    print(f'{tid}: {len(names)} accents, default {p["default"]}')


if __name__ == '__main__':
    only = sys.argv[1:]
    for tid, pal in PALETTES.items():
        if not only or tid in only:
            build(tid, pal)
