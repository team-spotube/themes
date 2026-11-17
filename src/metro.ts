// Metro: flat tiles in saturated colour, big light type, no corners, no borders and no shadows; presses tilt back.
import { A, choice, defineTheme, flatComponents, merge, NONE, solid } from '@team-spotube/theme-tool';

const tile = (c: string) => solid(c);
const press = { motion: { hoverScale: 1, pressedScale: 0.96 } };

export default defineTheme({
  name: 'Metro',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  version: '1.0.0',
  description: 'Flat saturated tiles, big light typography, square corners and no chrome. Presses tilt the tile back.',
  iconPack: 'bootstrap',
  logo: 'logos/metro.svg',
  fonts: { 'Open Sans': { dir: 'opensans', files: [['OpenSans-Light.ttf', 300], ['OpenSans-Regular.ttf', 400], ['OpenSans-Semibold.ttf', 600], ['OpenSans-Bold.ttf', 700]] } },
  parameters: {
    accent: choice('Accent', 'cobalt', [['cobalt', 'Cobalt', '#0078d7'], ['magenta', 'Magenta', '#d80073'], ['lime', 'Lime', '#60a917'], ['orange', 'Orange', '#fa6800'], ['teal', 'Teal', '#00aba9'], ['crimson', 'Crimson', '#a20025']]),
  },
  vars: {
    none: { type: 'color', default: NONE },
    key: { type: 'color', value: ['match', '{params.accent}', { cobalt: '#0078d7', magenta: '#d80073', lime: '#60a917', orange: '#fa6800', teal: '#00aba9', crimson: '#a20025' }] },
    keyHi: { type: 'color', value: ['lighten', '{vars.key}', 0.16] },
    page: { type: 'color', value: A('#ffffff', '#000000') },
    tile: { type: 'color', value: A('#e6e6e6', '#1f1f1f') },
    tileHi: { type: 'color', value: A('#d4d4d4', '#333333') },
    ink: { type: 'color', value: A('#000000', '#ffffff') },
    dim: { type: 'color', value: A('#666666', '#999999') },
    wash: { type: 'color', value: ['alpha', '{vars.key}', 0.18] },
  },
  tokens: {
    color: {
      background: '{vars.page}', surface: '{vars.tile}', raised: '{vars.tileHi}', inset: '{vars.tile}', text: '{vars.ink}', muted: '{vars.dim}', border: '{vars.dim}', highlight: NONE,
      accent: '{vars.key}', accentTop: '{vars.key}', accentBottom: '{vars.key}', onAccent: '#ffffff', success: '#60a917', danger: '#e51400', scrim: A('#ffffffb0', '#000000b0'),
    },
    shape: { small: 0, medium: 0, large: 0 },
    type: {
      family: 'Open Sans',
      styles: {
        headlineLarge: { fontWeight: 300 }, headlineMedium: { fontWeight: 300 }, headlineSmall: { fontWeight: 300 }, displaySmall: { fontWeight: 300 },
        titleLarge: { fontWeight: 300 }, titleMedium: { fontWeight: 400 },
      },
    },
    interaction: { lighting: false },
    surface: { shadows: false, glow: false },
    app: { background: solid('{vars.page}') },
  },
  defaults: { shape: 'rect' },
  components: merge(flatComponents(), {
    button: {
      base: { background: tile('{vars.tile}'), foreground: '{vars.ink}', shape: 'rect', padding: [22, 12], textStyle: { fontWeight: 400, fontSize: 14 }, ...press },
      states: { hovered: { background: tile('{vars.tileHi}') }, pressed: { background: tile('{vars.tileHi}') }, focused: { borderWidth: 2, borderColor: '{vars.ink}' }, disabled: { alpha: 0.4 } },
      variants: {
        primary: { base: { background: tile('{vars.key}'), foreground: '#ffffff' }, states: { hovered: { background: tile('{vars.keyHi}') }, pressed: { background: tile('{vars.key}') } } },
        secondary: {},
        quiet: { base: { background: tile(NONE), borderWidth: 2, borderColor: '{vars.ink}' }, states: { hovered: { background: tile('{vars.wash}') } } },
        danger: { base: { background: tile('#e51400'), foreground: '#ffffff' } },
      },
    },
    iconButton: {
      base: { background: tile(NONE), foreground: '{vars.ink}', shape: 'rect', iconSize: 22, borderWidth: 2, borderColor: '{vars.ink}', ...press },
      states: { hovered: { background: tile('{vars.wash}') } },
      variants: {
        primary: { base: { background: tile('{vars.key}'), foreground: '#ffffff', borderWidth: 0 } },
        secondary: {},
        quiet: { base: { borderWidth: 0 } },
        danger: { base: { background: tile('#e51400'), foreground: '#ffffff', borderWidth: 0 } },
      },
    },
    toggleSwitch: {
      base: {
        trackSize: [48, 20], trackShape: 'rect', thumbShape: 'rect', trackBackground: tile(NONE), selectedTrackBackground: tile('{vars.key}'), trackBorderColor: '{vars.ink}',
        thumbBackground: tile('{vars.ink}'), thumbBorderColor: NONE,
      },
      states: { selected: { trackBorderColor: '{vars.key}' } },
    },
    checkbox: { base: { faceShape: 'rect', faceSize: [22, 22], faceBackground: tile(NONE), faceBorderColor: '{vars.ink}', faceBorderWidth: 2, selectedFaceBackground: tile('{vars.key}'), selectedFaceBorderColor: '{vars.key}', selectedFaceForeground: '#ffffff' } },
    slider: {
      base: {
        trackBackground: tile('{vars.tileHi}'), trackShape: 'rect', activeTrackBackground: tile('{vars.key}'), activeTrackShape: 'rect',
        thumbBackground: tile('{vars.ink}'), thumbBorderColor: NONE, thumbBorderWidth: 0, thumbShape: 'rect', trackBorderColor: NONE,
      },
    },
    progress: { base: { shape: 'rect', height: 4, trackBackground: tile('{vars.tileHi}'), progressBackground: tile('{vars.key}'), progressShape: 'rect' } },
    textField: {
      base: { background: tile('{vars.tile}'), borderWidth: 2, borderColor: NONE, shape: 'rect', minimumHeight: 44, cursorColor: '{vars.ink}', placeholderColor: '{vars.dim}', labelColor: '{vars.dim}' },
      states: { focused: { background: tile('{vars.page}'), borderColor: '{vars.key}' } },
    },
    card: { base: { background: tile('{vars.tile}'), shape: 'rect', borderWidth: 0 } },
    listTile: {
      base: { shape: 'rect', minimumHeight: 68, contentPadding: [16, 10], background: tile(NONE), selectedBackground: tile('{vars.key}'), titleForeground: '{vars.ink}', subtitleForeground: '{vars.dim}', selectedTitleForeground: '#ffffff', selectedSubtitleForeground: '#ffffffd0', titleStyle: { fontWeight: 300, fontSize: 18 } },
      states: { hovered: { background: tile('{vars.tile}') } },
    },
    separator: { base: { color: '{vars.tileHi}', thickness: 1 } },
    dialog: {
      base: {
        shape: 'rect', panelBackground: tile('{vars.page}'), panelBorderColor: '{vars.key}', panelBorderWidth: 2, enterScale: 0.96, titleBarBackground: tile('{vars.page}'), titleBarForeground: '{vars.ink}',
        titleStyle: { fontSize: 26, fontWeight: 300 }, footerBackground: tile('{vars.page}'), scrimColor: A('#ffffffc0', '#000000c0'), descriptionForeground: '{vars.dim}',
        closeCapBackground: tile(NONE), closeCapForeground: '{vars.ink}', closeCapShape: 'rect',
      },
      states: { hovered: { closeCapBackground: tile('{vars.key}'), closeCapForeground: '#ffffff' } },
    },
    dropdownMenu: {
      base: {
        panelBackground: tile('{vars.tile}'), panelShape: 'rect', panelBorderWidth: 0, itemShape: 'rect', itemForeground: '{vars.ink}', itemMinimumHeight: 44, itemActiveBackground: tile('{vars.key}'), itemSelectedBackground: tile('{vars.key}'),
        itemActiveForeground: '#ffffff', itemIconTint: '{vars.ink}', itemMutedForeground: '{vars.dim}', separatorBrush: '{vars.tileHi}', itemTextStyle: { fontSize: 15, fontWeight: 300 }, enterScale: 0.96,
      },
      states: { hovered: { itemBackground: tile('{vars.key}'), itemIconTint: '#ffffff' }, focused: { itemBackground: tile('{vars.key}') }, pressed: { itemBackground: tile('{vars.key}'), itemIconTint: '#ffffff' } },
    },
    tooltip: { base: { background: tile('{vars.tileHi}'), foreground: '{vars.ink}', shape: 'rect' } },
    segmentedButton: { base: { background: tile('{vars.tile}'), foreground: '{vars.ink}' }, states: { selected: { background: tile('{vars.key}'), foreground: '#ffffff' }, hovered: { background: tile('{vars.tileHi}') } } },
    scrollbar: { base: { trackBackground: tile(NONE), thumbBackground: tile('{vars.tileHi}') }, states: { hovered: { thumbBackground: tile('{vars.key}') } } },
    snackbar: { base: { background: tile('{vars.key}'), foreground: '#ffffff', shape: 'rect' } },
    topAppBar: { base: { background: tile('{vars.page}'), separatorColor: NONE } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: tile('{vars.tile}'), shape: 'rect', minimumHeight: 64, itemSpacing: 0 } },
        item: {
          base: { background: tile(NONE), foreground: '{vars.dim}', shape: 'rect', iconSize: 22, labelStyle: { fontSize: 11, fontWeight: 400 }, pressedScale: 0.94 },
          states: { hovered: { foreground: '{vars.ink}' }, pressed: { foreground: '{vars.ink}' }, selected: { foreground: '{vars.key}', labelStyle: { fontSize: 11, fontWeight: 700 } } },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: tile('{vars.page}'), foreground: '{vars.ink}', shape: 'rect' } },
        header: { base: {} },
        footer: { base: {} },
        group: { base: { labelForeground: '{vars.dim}', labelShape: 'rect', labelHoveredBackground: tile(NONE), separatorBrush: '{vars.tileHi}', labelStyle: { fontSize: 12, fontWeight: 600 } } },
        item: {
          base: {
            background: tile(NONE), foreground: '{vars.dim}', iconTint: '{vars.dim}', iconSize: 22, shape: 'rect', minimumHeight: 58, contentPadding: [16, 10], labelStyle: { fontSize: 21, fontWeight: 300 },
            hoverBackground: tile(NONE), focusBackground: tile(NONE), pressedBackground: tile('{vars.wash}'), selectedBackground: tile(NONE), pressedScale: 0.97,
          },
          states: {
            hovered: { foreground: '{vars.ink}', iconTint: '{vars.key}' },
            pressed: { background: tile('{vars.wash}'), foreground: '{vars.ink}' },
            selected: { foreground: '{vars.key}', iconTint: '{vars.key}', labelStyle: { fontSize: 21, fontWeight: 300 } },
            focused: { borderWidth: 2, borderColor: '{vars.ink}' },
          },
        },
      },
    },
  }),
});
