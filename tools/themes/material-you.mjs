// You: tonal surfaces tinted by the accent, big pill buttons, stadium selection and generous rounding.
import { A, NONE, choice, merge, flatComponents, solid } from '../lib.mjs';

const tone = (map) => ['match', '{params.tone}', map];

export default {
  name: 'You',
  version: '1.0.0',
  description: 'Tonal, softly rounded surfaces tinted by your accent: pill buttons, stadium selection and a roomy layout.',
  logo: ['#d0bcff', '#4f378b'],
  fonts: { 'Red Hat Text': { dir: 'redhat-text', files: [['RedHatText-Regular.otf', 400], ['RedHatText-Medium.otf', 500], ['RedHatText-Bold.otf', 700]] } },
  parameters: {
    tone: choice('Color', 'violet', [['violet', 'Violet', '#6750a4'], ['blue', 'Blue', '#1a73e8'], ['green', 'Green', '#2e7d32'], ['rose', 'Rose', '#b3261e'], ['amber', 'Amber', '#b26a00']]),
    shape: { type: 'enum', label: 'Corners', default: 'round', options: [{ value: 'round', label: 'Round' }, { value: 'sharp', label: 'Sharp' }] },
  },
  vars: {
    none: { type: 'color', default: NONE },
    key: { type: 'color', value: tone({ violet: A('#6750a4', '#d0bcff'), blue: A('#1a5fc9', '#a8c7fa'), green: A('#2e7d32', '#a6d6a0'), rose: A('#b3261e', '#ffb4ab'), amber: A('#8a5100', '#ffb869') }) },
    onKey: { type: 'color', value: tone({ violet: A('#ffffff', '#381e72'), blue: A('#ffffff', '#062e6f'), green: A('#ffffff', '#0c3b10'), rose: A('#ffffff', '#601410'), amber: A('#ffffff', '#4a2800') }) },
    tonal: { type: 'color', value: tone({ violet: A('#e8def8', '#4a4458'), blue: A('#d3e3fd', '#2f4a76'), green: A('#cdebc8', '#34513a'), rose: A('#ffdad6', '#7a2a25'), amber: A('#ffddb8', '#5c4021') }) },
    onTonal: { type: 'color', value: tone({ violet: A('#1d192b', '#e8def8'), blue: A('#041e49', '#d3e3fd'), green: A('#0a2e10', '#cdebc8'), rose: A('#410e0b', '#ffdad6'), amber: A('#2b1700', '#ffddb8') }) },
    page: { type: 'color', value: tone({ violet: A('#fef7ff', '#141218'), blue: A('#f8f9ff', '#111318'), green: A('#f7fbf1', '#10140f'), rose: A('#fffbff', '#1a1110'), amber: A('#fffbff', '#18120c') }) },
    panel: { type: 'color', value: tone({ violet: A('#f3edf7', '#211f26'), blue: A('#eceef4', '#1d2024'), green: A('#ebefe5', '#1c201b'), rose: A('#f9ecea', '#271d1c'), amber: A('#f6ebe0', '#241d15') }) },
    panelHi: { type: 'color', value: tone({ violet: A('#ece6f0', '#2b2930'), blue: A('#e1e3e9', '#282a2f'), green: A('#e0e4da', '#262a25'), rose: A('#f2e2df', '#322826'), amber: A('#ecdfd2', '#2f271e') }) },
    ink: { type: 'color', value: A('#1d1b20', '#e6e0e9') },
    inkDim: { type: 'color', value: A('#49454f', '#cac4d0') },
    outline: { type: 'color', value: A('#79747e', '#938f99') },
    state: { type: 'color', value: ['alpha', '{vars.onTonal}', 0.1] },
    r: { type: 'number', value: ['match', '{params.shape}', { round: 20, sharp: 6 }] },
    rCtl: { type: 'number', value: ['match', '{params.shape}', { round: 100, sharp: 6 }] },
  },
  tokens: {
    color: {
      background: '{vars.page}', surface: '{vars.panel}', raised: '{vars.panelHi}', inset: '{vars.panelHi}', text: '{vars.ink}', muted: '{vars.inkDim}', border: '{vars.outline}',
      highlight: NONE, accent: '{vars.key}', accentTop: '{vars.key}', accentBottom: '{vars.key}', onAccent: '{vars.onKey}', success: A('#1b6e2d', '#8fd69a'), danger: A('#b3261e', '#f2b8b5'), scrim: '#00000066',
    },
    shape: { small: 10, medium: 16, large: 28 },
    type: { family: 'Red Hat Text' },
    interaction: { lighting: false },
    surface: { shadows: false, glow: false },
    app: { background: ['linear', 180, '{vars.page}', '{vars.page}'] },
  },
  defaults: { shape: '{vars.r}' },
  components: merge(flatComponents(), {
    button: {
      base: { background: solid('{vars.tonal}'), foreground: '{vars.onTonal}', shape: '{vars.rCtl}', padding: [24, 12], minSize: [64, 44], textStyle: { fontWeight: 500, fontSize: 14 } },
      states: { hovered: { shadows: ['#00000030'], shadowElevation: 3 }, pressed: { background: solid('{vars.panelHi}') }, disabled: { alpha: 0.38 } },
      variants: {
        primary: { base: { background: solid('{vars.key}'), foreground: '{vars.onKey}' }, states: { hovered: { shadows: ['#00000040'], shadowElevation: 4 } } },
        secondary: {},
        quiet: { base: { background: solid(NONE), foreground: '{vars.key}' }, states: { hovered: { shadowElevation: 0, background: solid('{vars.state}') }, pressed: { background: solid('{vars.state}') } } },
        danger: { base: { background: solid(A('#ffdad6', '#8c1d18')), foreground: A('#410e0b', '#ffdad6') } },
      },
    },
    iconButton: {
      base: { background: solid('{vars.tonal}'), foreground: '{vars.onTonal}', shape: 'pill', iconSize: 20 },
      states: { hovered: { background: solid('{vars.panelHi}') } },
      variants: {
        primary: { base: { background: solid('{vars.key}'), foreground: '{vars.onKey}' }, states: { hovered: { shadows: ['#00000040'], shadowElevation: 4 } } },
        secondary: {},
        quiet: { base: { background: solid(NONE), foreground: '{vars.inkDim}' }, states: { hovered: { background: solid('{vars.state}') } } },
        danger: { base: { background: solid(A('#ffdad6', '#8c1d18')), foreground: A('#410e0b', '#ffdad6') } },
      },
    },
    toggleSwitch: {
      base: {
        trackSize: [52, 32], trackShape: 'pill', thumbShape: 'pill', trackBackground: solid('{vars.panelHi}'), selectedTrackBackground: solid('{vars.key}'), trackBorderColor: '{vars.outline}',
        thumbBackground: solid('{vars.outline}'), thumbElevation: 0,
      },
      states: { selected: { trackBorderColor: NONE, thumbBackground: solid('{vars.onKey}') } },
    },
    checkbox: { base: { faceShape: 4, faceSize: [20, 20], faceBackground: solid(NONE), faceBorderColor: '{vars.outline}', faceBorderWidth: 2, selectedFaceBackground: solid('{vars.key}'), selectedFaceBorderColor: '{vars.key}', selectedFaceForeground: '{vars.onKey}' } },
    slider: {
      base: {
        trackBackground: solid('{vars.tonal}'), trackShape: 'pill', activeTrackBackground: solid('{vars.key}'), activeTrackShape: 'pill', thumbBackground: solid('{vars.key}'), thumbBorderColor: '{vars.page}', thumbBorderWidth: 3, thumbShape: 'pill',
      },
    },
    progress: { base: { shape: 'pill', height: 6, trackBackground: solid('{vars.tonal}'), progressBackground: solid('{vars.key}'), progressShape: 'pill' } },
    textField: {
      base: { background: solid('{vars.panelHi}'), borderColor: '{vars.outline}', borderWidth: 1, shape: '{vars.r}', minimumHeight: 52, cursorColor: '{vars.key}', placeholderColor: '{vars.inkDim}', labelColor: '{vars.inkDim}' },
      states: { focused: { borderColor: '{vars.key}', borderWidth: 2 } },
    },
    card: { base: { background: solid('{vars.panel}'), shape: 28, borderWidth: 0 } },
    listTile: {
      base: { shape: '{vars.rCtl}', minimumHeight: 56, contentPadding: [20, 8], background: solid(NONE), selectedBackground: solid('{vars.tonal}'), titleForeground: '{vars.ink}', subtitleForeground: '{vars.inkDim}', selectedTitleForeground: '{vars.onTonal}', selectedSubtitleForeground: '{vars.onTonal}' },
      states: { hovered: { background: solid('{vars.state}') } },
    },
    separator: { base: { color: A('#cac4d0', '#49454f'), thickness: 1 } },
    dialog: {
      base: {
        shape: 28, panelBackground: solid('{vars.panelHi}'), panelBorderWidth: 0, panelShadowElevation: 12, panelShadowColor: '#00000050', titleBarBackground: solid('{vars.panelHi}'), titleBarForeground: '{vars.ink}',
        titleStyle: { fontSize: 24, fontWeight: 400 }, footerBackground: solid('{vars.panelHi}'), scrimColor: '#00000066', descriptionForeground: '{vars.inkDim}',
        closeCapBackground: solid(NONE), closeCapForeground: '{vars.inkDim}', closeCapShape: 'pill',
      },
      states: { hovered: { closeCapBackground: solid('{vars.state}') } },
    },
    dropdownMenu: {
      base: {
        panelBackground: solid('{vars.panelHi}'), panelShape: 16, panelBorderWidth: 0, panelShadowElevation: 8, panelShadowColor: '#00000040', itemShape: 'pill', itemForeground: '{vars.ink}',
        itemActiveBackground: solid('{vars.tonal}'), itemSelectedBackground: solid('{vars.tonal}'), itemActiveForeground: '{vars.onTonal}', itemIconTint: '{vars.inkDim}', itemMutedForeground: '{vars.inkDim}', separatorBrush: A('#cac4d0', '#49454f'), itemMinimumHeight: 44,
      },
      states: { hovered: { itemBackground: solid('{vars.state}') }, focused: { itemBackground: solid('{vars.state}') }, pressed: { itemBackground: solid('{vars.tonal}') } },
    },
    tooltip: { base: { background: solid(A('#322f35', '#e6e0e9')), foreground: A('#f5eff7', '#322f35'), shape: 8 } },
    segmentedButton: { base: { background: solid(NONE), foreground: '{vars.ink}', borderColor: '{vars.outline}', borderWidth: 1 }, states: { selected: { background: solid('{vars.tonal}'), foreground: '{vars.onTonal}' }, hovered: { background: solid('{vars.state}') } } },
    scrollbar: { base: { trackBackground: solid(NONE), thumbBackground: solid('{vars.outline}') } },
    snackbar: { base: { background: solid(A('#322f35', '#e6e0e9')), foreground: A('#f5eff7', '#322f35'), shape: 8, shadowElevation: 6, shadowColor: '#00000040' } },
    topAppBar: { base: { background: solid('{vars.page}'), separatorColor: NONE } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: solid('{vars.panel}'), shape: 'rect', minimumHeight: 76, itemSpacing: 8, contentPadding: [12, 12] } },
        item: {
          base: { background: solid(NONE), foreground: '{vars.inkDim}', shape: 'pill', iconSize: 24, minimumHeight: 56, labelStyle: { fontSize: 12, fontWeight: 500 } },
          states: { hovered: { background: solid('{vars.state}') }, pressed: { background: solid('{vars.tonal}') }, selected: { background: solid('{vars.tonal}'), foreground: '{vars.onTonal}', labelStyle: { fontSize: 12, fontWeight: 700 } } },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: solid('{vars.panel}'), foreground: '{vars.ink}', shape: 'rect' } },
        header: { base: {} },
        footer: { base: {} },
        group: { base: { labelForeground: '{vars.inkDim}', labelShape: 'pill', labelHoveredBackground: solid('{vars.state}'), separatorBrush: A('#cac4d0', '#49454f') } },
        item: {
          base: {
            background: solid(NONE), foreground: '{vars.ink}', iconTint: '{vars.inkDim}', iconSize: 22, shape: 'pill', minimumHeight: 52, contentPadding: [18, 10], labelStyle: { fontSize: 14, fontWeight: 500 },
            hoverBackground: solid('{vars.state}'), focusBackground: solid('{vars.state}'), pressedBackground: solid('{vars.tonal}'), selectedBackground: solid('{vars.tonal}'),
          },
          states: {
            hovered: { background: solid('{vars.state}') },
            pressed: { background: solid('{vars.tonal}') },
            selected: { background: solid('{vars.tonal}'), foreground: '{vars.onTonal}', iconTint: '{vars.onTonal}', labelStyle: { fontSize: 14, fontWeight: 700 } },
          },
        },
      },
    },
  }),
};
