// Brutal: raw black outlines, loud flat colour, heavy type, hard edges. Hover floods a control with the accent.
import { A, choice, defineTheme, flatComponents, merge, NONE, solid } from '@team-spotube/theme-tool';

const f = (c: string) => solid(c);

export default defineTheme({
  name: 'Brutal',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  version: '1.0.0',
  description: 'Thick black outlines, loud flat colour and heavy type with no softness anywhere. Hover floods controls with the accent.',
  iconPack: 'phosphor-bold',
  logo: ['#ffe14d', '#111111'],
  fonts: {
    'Archivo Black': { dir: 'archivoblack', files: [['ArchivoBlack-Regular.ttf', 400]] },
    'Space Mono': { dir: 'spacemono', files: [['SpaceMono-Regular.ttf', 400], ['SpaceMono-Bold.ttf', 700]] },
  },
  parameters: {
    paint: choice('Color', 'yellow', [['yellow', 'Yellow', '#ffe14d'], ['pink', 'Pink', '#ff6bd6'], ['blue', 'Blue', '#6aa9ff'], ['lime', 'Lime', '#b6f23a'], ['red', 'Red', '#ff5a3c']]),
    weight: { type: 'number', label: 'Outline thickness', default: 3, min: 1, max: 5, step: 1 },
  },
  vars: {
    none: { type: 'color', default: NONE },
    paint: { type: 'color', value: ['match', '{params.paint}', { yellow: '#ffe14d', pink: '#ff6bd6', blue: '#6aa9ff', lime: '#b6f23a', red: '#ff5a3c' }] },
    ink: { type: 'color', value: A('#111111', '#f5f5f0') },
    paper: { type: 'color', value: A('#fffdf2', '#141414') },
    paper2: { type: 'color', value: A('#f1eed9', '#1f1f1f') },
    onPaint: { type: 'color', value: '#111111' },
    line: { type: 'color', value: A('#111111', '#f5f5f0') },
    w: { type: 'number', value: '{params.weight}' },
  },
  tokens: {
    color: {
      background: '{vars.paper}', surface: '{vars.paper}', raised: '{vars.paper2}', inset: '{vars.paper2}', text: '{vars.ink}', muted: A('#4a4a42', '#b5b5aa'), border: '{vars.line}', highlight: NONE,
      accent: '{vars.paint}', accentTop: '{vars.paint}', accentBottom: '{vars.paint}', onAccent: '#111111', success: '#3ddc84', danger: '#ff3b30', scrim: A('#11111180', '#000000b0'),
    },
    shape: { small: 0, medium: 0, large: 0 },
    type: {
      family: 'Space Mono',
      scale: 0.95,
      styles: {
        displaySmall: { fontFamily: 'Archivo Black' }, headlineLarge: { fontFamily: 'Archivo Black' }, headlineMedium: { fontFamily: 'Archivo Black' },
        headlineSmall: { fontFamily: 'Archivo Black' }, titleLarge: { fontFamily: 'Archivo Black' }, titleMedium: { fontFamily: 'Archivo Black' },
      },
    },
    interaction: { lighting: false },
    surface: { shadows: false, glow: false },
    app: { background: f('{vars.paper}') },
  },
  defaults: { shape: 'rect' },
  components: merge(flatComponents(), {
    button: {
      base: { background: f('{vars.paper}'), foreground: '{vars.ink}', borderWidth: '{vars.w}', borderColor: '{vars.line}', shape: 'rect', padding: [18, 10], textStyle: { fontFamily: 'Archivo Black', fontSize: 14 } },
      states: { hovered: { background: f('{vars.paint}'), foreground: '{vars.onPaint}' }, pressed: { background: f('{vars.ink}'), foreground: '{vars.paper}' }, focused: { borderWidth: 5 }, disabled: { alpha: 0.4 } },
      variants: {
        primary: { base: { background: f('{vars.paint}'), foreground: '{vars.onPaint}' }, states: { hovered: { background: f('{vars.ink}'), foreground: '{vars.paper}' }, pressed: { background: f('{vars.paper}'), foreground: '{vars.ink}' } } },
        secondary: {},
        quiet: { base: { borderColor: NONE } , states: { hovered: { background: f('{vars.paint}'), foreground: '{vars.onPaint}', borderColor: '{vars.line}' } } },
        danger: { base: { background: f('#ff3b30'), foreground: '#111111' }, states: { hovered: { background: f('{vars.ink}'), foreground: '#ff3b30' } } },
      },
    },
    iconButton: {
      base: { background: f('{vars.paper}'), foreground: '{vars.ink}', borderWidth: '{vars.w}', borderColor: '{vars.line}', shape: 'rect', iconSize: 18 },
      states: { hovered: { background: f('{vars.paint}'), foreground: '{vars.onPaint}' }, pressed: { background: f('{vars.ink}'), foreground: '{vars.paper}' } },
      variants: { primary: { base: { background: f('{vars.paint}'), foreground: '{vars.onPaint}' } }, secondary: {}, quiet: { base: { borderColor: NONE } }, danger: { base: { background: f('#ff3b30'), foreground: '#111111' } } },
    },
    toggleSwitch: {
      base: { trackSize: [48, 24], trackShape: 'rect', thumbShape: 'rect', trackBackground: f('{vars.paper2}'), selectedTrackBackground: f('{vars.paint}'), trackBorderColor: '{vars.line}', thumbBackground: f('{vars.ink}'), thumbBorderColor: '{vars.line}' },
    },
    checkbox: { base: { faceShape: 'rect', faceSize: [22, 22], faceBackground: f('{vars.paper}'), faceBorderColor: '{vars.line}', faceBorderWidth: '{vars.w}', selectedFaceBackground: f('{vars.paint}'), selectedFaceBorderColor: '{vars.line}', selectedFaceForeground: '{vars.onPaint}' } },
    slider: {
      base: {
        trackBackground: f('{vars.paper2}'), trackBorderColor: '{vars.line}', trackShape: 'rect', activeTrackBackground: f('{vars.paint}'), activeTrackShape: 'rect',
        thumbBackground: f('{vars.ink}'), thumbBorderColor: '{vars.line}', thumbBorderWidth: 2, thumbShape: 'rect',
      },
    },
    progress: { base: { shape: 'rect', height: 16, trackBackground: f('{vars.paper}'), borderColor: '{vars.line}', borderWidth: '{vars.w}', progressBackground: f('{vars.paint}'), progressShape: 'rect' } },
    textField: {
      base: { background: f('{vars.paper}'), borderWidth: '{vars.w}', borderColor: '{vars.line}', shape: 'rect', cursorColor: '{vars.ink}', placeholderColor: A('#6a6a60', '#8a8a80'), labelColor: '{vars.ink}' },
      states: { focused: { background: f('{vars.paint}'), textStyle: { color: '{vars.onPaint}' } } },
    },
    card: { base: { background: f('{vars.paper}'), borderWidth: '{vars.w}', borderColor: '{vars.line}', shape: 'rect' } },
    listTile: {
      base: {
        shape: 'rect', background: f(NONE), selectedBackground: f('{vars.paint}'), titleForeground: '{vars.ink}', subtitleForeground: A('#4a4a42', '#b5b5aa'), selectedTitleForeground: '{vars.onPaint}', selectedSubtitleForeground: '{vars.onPaint}',
        borderWidth: 0, minimumHeight: 52, titleStyle: { fontFamily: 'Archivo Black', fontSize: 14 },
      },
      states: { hovered: { background: f('{vars.paper2}') } },
    },
    separator: { base: { color: '{vars.line}', thickness: '{vars.w}' } },
    dialog: {
      base: {
        shape: 'rect', panelBackground: f('{vars.paper}'), panelBorderColor: '{vars.line}', panelBorderWidth: 5, enterScale: 1, titleBarBackground: f('{vars.paint}'), titleBarForeground: '{vars.onPaint}',
        titleStyle: { fontFamily: 'Archivo Black', fontSize: 20 }, titleBarBorderColor: '{vars.line}', titleBarDividerThickness: 4, footerBackground: f('{vars.paper}'), footerBorderColor: '{vars.line}', footerDividerThickness: 4,
        scrimColor: A('#11111180', '#000000b0'), closeCapBackground: f('{vars.paper}'), closeCapForeground: '#111111', closeCapBorderColor: '#111111', closeCapBorderWidth: 3, closeCapShape: 'rect',
      },
      states: { hovered: { closeCapBackground: f('#111111'), closeCapForeground: '#ffffff' } },
    },
    dropdownMenu: {
      base: {
        panelBackground: f('{vars.paper}'), panelShape: 'rect', panelBorderColor: '{vars.line}', panelBorderWidth: 4, itemShape: 'rect', itemForeground: '{vars.ink}', itemActiveBackground: f('{vars.paint}'), itemSelectedBackground: f('{vars.paint}'),
        itemActiveForeground: '{vars.onPaint}', itemIconTint: '{vars.ink}', itemMutedForeground: A('#4a4a42', '#b5b5aa'), separatorBrush: '{vars.line}', separatorThickness: 2, itemTextStyle: { fontWeight: 700 }, enterScale: 1,
      },
      states: { hovered: { itemBackground: f('{vars.paint}'), itemIconTint: '{vars.onPaint}' }, focused: { itemBackground: f('{vars.paint}') }, pressed: { itemBackground: f('{vars.ink}'), itemIconTint: '{vars.paper}' } },
    },
    tooltip: { base: { background: f('{vars.ink}'), foreground: '{vars.paper}', shape: 'rect' } },
    segmentedButton: { base: { background: f('{vars.paper}'), foreground: '{vars.ink}', borderWidth: '{vars.w}', borderColor: '{vars.line}' }, states: { selected: { background: f('{vars.paint}'), foreground: '{vars.onPaint}' }, hovered: { background: f('{vars.paper2}') } } },
    scrollbar: { base: { trackBackground: f(NONE), thumbBackground: f('{vars.ink}') } },
    snackbar: { base: { background: f('{vars.paint}'), foreground: '{vars.onPaint}', borderColor: '{vars.line}', borderWidth: '{vars.w}', shape: 'rect' } },
    topAppBar: { base: { background: f('{vars.paper}'), separatorColor: '{vars.line}' } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: f('{vars.paper}'), shape: 'rect', minimumHeight: 62, itemSpacing: 0, overlayBrush: ['linear', 180, ['{vars.line}', 0], ['{vars.line}', 0.05], [NONE, 0.05], [NONE, 1]] } },
        item: {
          base: { background: f(NONE), foreground: '{vars.ink}', shape: 'rect', iconSize: 20, labelStyle: { fontFamily: 'Archivo Black', fontSize: 11 } },
          states: { hovered: { background: f('{vars.paper2}') }, pressed: { background: f('{vars.ink}'), foreground: '{vars.paper}' }, selected: { background: f('{vars.paint}'), foreground: '{vars.onPaint}', borderWidth: 3, borderColor: '{vars.line}' } },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: f('{vars.paper}'), foreground: '{vars.ink}', shape: 'rect', overlayBrush: ['linear', 90, [NONE, 0], [NONE, 0.985], ['{vars.line}', 0.985], ['{vars.line}', 1]] } },
        header: { base: { dividerColor: '{vars.line}', dividerWidth: 3 } },
        footer: { base: { dividerColor: '{vars.line}', dividerWidth: 3 } },
        group: { base: { labelForeground: A('#4a4a42', '#b5b5aa'), labelShape: 'rect', labelHoveredBackground: f('{vars.paper2}'), separatorBrush: '{vars.line}', labelStyle: { fontFamily: 'Archivo Black', fontSize: 11 } } },
        item: {
          base: {
            background: f(NONE), foreground: '{vars.ink}', iconTint: '{vars.ink}', iconSize: 18, shape: 'rect', minimumHeight: 44, borderWidth: 3, borderColor: NONE, labelStyle: { fontFamily: 'Archivo Black', fontSize: 14 },
            hoverBackground: f('{vars.paper2}'), focusBackground: f('{vars.paper2}'), pressedBackground: f('{vars.ink}'), selectedBackground: f('{vars.paint}'),
          },
          states: {
            hovered: { background: f('{vars.paper2}'), borderColor: '{vars.line}' },
            pressed: { background: f('{vars.ink}'), foreground: '{vars.paper}', iconTint: '{vars.paper}' },
            selected: { background: f('{vars.paint}'), foreground: '{vars.onPaint}', iconTint: '{vars.onPaint}', borderColor: '{vars.line}' },
          },
        },
      },
    },
  }),
});
