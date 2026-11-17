// Phosphor: a terminal. Monospace everywhere, hard 1px outlines, no corners, and inverse video for hover and selection.
import { A, choice, defineTheme, flatComponents, merge, NONE, solid } from '@team-spotube/theme-tool';

const inv = (extra = {}) => ({ background: solid('{vars.ink}'), foreground: '{vars.bg}', ...extra });
const glow = { color: '{vars.glow}', offsetX: 0, offsetY: 0, blurRadius: 7 };
const outline = { background: solid(NONE), foreground: '{vars.ink}', borderColor: '{vars.ink}', borderWidth: 1, shape: 'rect' };

export default defineTheme({
  name: 'Phosphor',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  version: '1.0.0',
  description: 'A terminal: monospace type, one-pixel outlines, no corners and inverse video for hover and selection. Dark is a CRT, light is paper.',
  iconPack: 'fontawesome',
  logo: 'logos/phosphor.svg',
  fonts: { VT323: { dir: 'vt323', files: [['VT323-Regular.ttf', 400]] } },
  parameters: {
    ink: choice('Phosphor', 'green', [['green', 'Green', '#39ff6e'], ['amber', 'Amber', '#ffb000'], ['ice', 'Ice', '#7fe3ff'], ['white', 'White', '#e8f0e8']]),
  },
  vars: {
    none: { type: 'color', default: NONE },
    ink: { type: 'color', value: ['match', '{params.ink}', { green: A('#0f5a2a', '#39ff6e'), amber: A('#8a4b00', '#ffb000'), ice: A('#0b4f6c', '#7fe3ff'), white: A('#222222', '#e8f0e8') }] },
    bg: { type: 'color', value: A('#f3f0df', '#000000') },
    dim: { type: 'color', value: ['mix', '{vars.ink}', '{vars.bg}', 0.5] },
    faint: { type: 'color', value: ['alpha', '{vars.ink}', 0.2] },
    glow: { type: 'color', value: A('#00000000', ['alpha', '{vars.ink}', 0.6]) },
  },
  tokens: {
    color: {
      background: '{vars.bg}', surface: '{vars.bg}', raised: '{vars.bg}', inset: '{vars.bg}', text: '{vars.ink}', muted: '{vars.dim}', border: '{vars.ink}',
      highlight: NONE, accent: '{vars.ink}', accentTop: '{vars.ink}', accentBottom: '{vars.ink}', onAccent: '{vars.bg}', success: '{vars.ink}', danger: A('#b00020', '#ff5555'), scrim: A('#00000066', '#000000b0'),
    },
    shape: { small: 0, medium: 0, large: 0 },
    type: { family: 'VT323', scale: 1.22 },
    interaction: { lighting: false },
    surface: { shadows: false, glow: false },
    app: { background: ['radial', 0.5, 0.45, 1.05, A('#f7f4e6', '#0a140c'), A('#e7e3cf', '#000000')] },
  },
  defaults: { shape: 'rect' },
  components: merge(flatComponents(), {
    button: {
      base: { ...outline, textStyle: { fontSize: 17, shadow: glow }, padding: [14, 5] },
      states: { hovered: inv(), pressed: inv({ background: solid('{vars.dim}') }), focused: { borderWidth: 2 }, disabled: { foreground: '{vars.dim}', borderColor: '{vars.dim}' } },
      variants: {
        primary: { base: inv(), states: { hovered: { ...outline, borderWidth: 2 }, pressed: { ...outline, background: solid('{vars.faint}') } } },
        secondary: {},
        quiet: { base: { borderColor: NONE }, states: { hovered: inv() } },
        danger: { base: { foreground: A('#b00020', '#ff5555'), borderColor: A('#b00020', '#ff5555') }, states: { hovered: { background: solid(A('#b00020', '#ff5555')), foreground: '{vars.bg}' } } },
      },
    },
    iconButton: {
      base: { ...outline, iconSize: 16 },
      states: { hovered: inv(), pressed: inv({ background: solid('{vars.dim}') }) },
      variants: { primary: { base: inv() }, secondary: {}, quiet: { base: { borderColor: NONE } }, danger: { base: { foreground: A('#b00020', '#ff5555'), borderColor: A('#b00020', '#ff5555') } } },
    },
    toggleSwitch: {
      base: {
        trackSize: [40, 18], trackShape: 'rect', thumbShape: 'rect', trackBackground: solid(NONE), selectedTrackBackground: solid('{vars.faint}'), trackBorderColor: '{vars.ink}',
        thumbBackground: solid('{vars.ink}'), thumbBorderColor: NONE,
      },
    },
    checkbox: { base: { faceShape: 'rect', faceSize: [16, 16], faceBackground: solid(NONE), faceBorderColor: '{vars.ink}', faceBorderWidth: 1, selectedFaceBackground: solid('{vars.ink}'), selectedFaceBorderColor: '{vars.ink}', selectedFaceForeground: '{vars.bg}' } },
    slider: {
      base: {
        trackBackground: solid('{vars.faint}'), trackShape: 'rect', activeTrackBackground: solid('{vars.ink}'), activeTrackShape: 'rect',
        thumbBackground: solid('{vars.ink}'), thumbBorderColor: '{vars.bg}', thumbBorderWidth: 2, thumbShape: 'rect', trackBorderColor: NONE,
      },
    },
    progress: { base: { shape: 'rect', height: 14, trackBackground: solid(NONE), borderColor: '{vars.ink}', borderWidth: 1, progressBackground: ['linear', 0, '{vars.ink}', '{vars.ink}'], progressShape: 'rect' } },
    textField: {
      base: { background: solid(NONE), borderColor: '{vars.ink}', borderWidth: 1, shape: 'rect', cursorColor: '{vars.ink}', placeholderColor: '{vars.dim}', labelColor: '{vars.ink}', textStyle: { color: '{vars.ink}', shadow: glow } },
      states: { focused: { borderWidth: 2 } },
    },
    card: { base: { background: solid(NONE), borderColor: '{vars.ink}', borderWidth: 1, shape: 'rect' } },
    listTile: {
      base: { shape: 'rect', background: solid(NONE), selectedBackground: solid('{vars.ink}'), titleForeground: '{vars.ink}', subtitleForeground: '{vars.dim}', selectedTitleForeground: '{vars.bg}', selectedSubtitleForeground: '{vars.bg}', minimumHeight: 34 },
      states: { hovered: { background: solid('{vars.faint}') } },
    },
    separator: { base: { color: '{vars.dim}', thickness: 1 } },
    dialog: {
      base: {
        shape: 'rect', panelBackground: solid('{vars.bg}'), panelBorderColor: '{vars.ink}', panelBorderWidth: 2, enterScale: 1, exitScale: 1, panelShadowElevation: 0,
        titleBarBackground: solid('{vars.ink}'), titleBarForeground: '{vars.bg}', titleStyle: { fontSize: 20 }, footerBackground: solid('{vars.bg}'), scrimColor: A('#00000066', '#000000c0'),
        closeCapBackground: solid(NONE), closeCapForeground: '{vars.bg}', closeCapShape: 'rect',
      },
      states: { hovered: { closeCapBackground: solid('{vars.bg}'), closeCapForeground: '{vars.ink}' } },
    },
    dropdownMenu: {
      base: {
        panelBackground: solid('{vars.bg}'), panelShape: 'rect', panelBorderColor: '{vars.ink}', panelBorderWidth: 1, itemShape: 'rect', itemForeground: '{vars.ink}', itemActiveBackground: solid('{vars.ink}'),
        itemSelectedBackground: solid('{vars.ink}'), itemActiveForeground: '{vars.bg}', itemMutedForeground: '{vars.dim}', itemIconTint: '{vars.ink}', separatorBrush: '{vars.dim}', separatorThickness: 1,
        groupLabelForeground: '{vars.dim}', enterScale: 1, exitScale: 1,
      },
      states: { hovered: { itemBackground: solid('{vars.ink}'), itemIconTint: '{vars.bg}' }, focused: { itemBackground: solid('{vars.ink}'), itemIconTint: '{vars.bg}' }, pressed: { itemBackground: solid('{vars.ink}'), itemIconTint: '{vars.bg}' } },
    },
    tooltip: { base: { background: solid('{vars.ink}'), foreground: '{vars.bg}', shape: 'rect' } },
    segmentedButton: { base: { background: outline.background, foreground: '{vars.ink}', borderColor: '{vars.ink}', borderWidth: 1 }, states: { hovered: inv(), selected: inv() } },
    scrollbar: { base: { trackBackground: solid(NONE), thumbBackground: solid('{vars.dim}') } },
    snackbar: { base: { background: solid('{vars.bg}'), foreground: '{vars.ink}', borderColor: '{vars.ink}', borderWidth: 1, shape: 'rect' } },
    topAppBar: { base: { background: solid('{vars.bg}'), separatorColor: '{vars.ink}' } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: solid('{vars.bg}'), shape: 'rect', minimumHeight: 58, itemSpacing: 0, overlayBrush: ['linear', 180, ['{vars.ink}', 0], ['{vars.ink}', 0.02], [NONE, 0.02], [NONE, 1]] } },
        item: {
          base: { background: solid(NONE), foreground: '{vars.dim}', shape: 'rect', iconSize: 18, labelStyle: { fontSize: 15 } },
          states: { hovered: { background: solid('{vars.faint}'), foreground: '{vars.ink}' }, pressed: inv(), selected: inv({ labelStyle: { fontSize: 15 } }) },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: solid('{vars.bg}'), foreground: '{vars.ink}', shape: 'rect', overlayBrush: ['linear', 90, [NONE, 0], [NONE, 0.995], ['{vars.ink}', 0.995], ['{vars.ink}', 1]] } },
        header: { base: { dividerColor: '{vars.dim}', dividerWidth: 1 } },
        footer: { base: { dividerColor: '{vars.dim}', dividerWidth: 1 } },
        group: { base: { labelForeground: '{vars.dim}', labelShape: 'rect', labelHoveredBackground: solid('{vars.faint}'), separatorBrush: '{vars.dim}' } },
        item: {
          base: {
            background: solid(NONE), foreground: '{vars.ink}', iconTint: '{vars.ink}', iconSize: 16, shape: 'rect', minimumHeight: 34, labelStyle: { fontSize: 17 },
            hoverBackground: solid('{vars.faint}'), focusBackground: solid('{vars.faint}'), pressedBackground: solid('{vars.ink}'), selectedBackground: solid('{vars.ink}'),
          },
          states: {
            hovered: { background: solid('{vars.faint}') },
            pressed: inv({ iconTint: '{vars.bg}' }),
            selected: inv({ iconTint: '{vars.bg}' }),
            focused: { borderWidth: 1, borderColor: '{vars.ink}' },
          },
        },
      },
    },
  }),
});
