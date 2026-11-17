// Pocket Synth: a palm-sized hardware sampler. Chunky keys that sit on the panel, a pale LCD and one loud key colour.
import { A, NONE, choice, merge, flatComponents, solid } from '../lib.mjs';

const key = (top, bot) => ['linear', 180, top, bot];
const lcd = solid('{vars.lcd}');
const mono = { fontFamily: 'Space Mono' };

export default {
  name: 'Pocket Synth',
  version: '1.0.0',
  description: 'A palm-sized hardware sampler: chunky keys that sit on the panel, a pale LCD and one loud key colour.',
  iconPack: 'phosphor-fill',
  logo: ['#ff6a2b', '#d9d4c3'],
  fonts: { 'Space Mono': { dir: 'spacemono', files: [['SpaceMono-Regular.ttf', 400], ['SpaceMono-Bold.ttf', 700]] } },
  parameters: {
    keys: choice('Key color', 'orange', [['orange', 'Orange', '#ff5a1f'], ['blue', 'Blue', '#2f6bff'], ['green', 'Green', '#18a058'], ['pink', 'Pink', '#ff4f8b']]),
  },
  vars: {
    none: { type: 'color', default: NONE },
    key: { type: 'color', value: ['match', '{params.keys}', { orange: '#ff5a1f', blue: '#2f6bff', green: '#18a058', pink: '#ff4f8b' }] },
    keyDown: { type: 'color', value: ['darken', '{vars.key}', 0.22] },
    keyHi: { type: 'color', value: ['lighten', '{vars.key}', 0.2] },
    panel: { type: 'color', value: A('#dcd8c8', '#2b2b2e') },
    panelLo: { type: 'color', value: A('#cdc8b6', '#222225') },
    capTop: { type: 'color', value: A('#fbfaf4', '#4a4a50') },
    capBot: { type: 'color', value: A('#e6e2d3', '#38383d') },
    capEdge: { type: 'color', value: A('#a9a490', '#101012') },
    seat: { type: 'color', value: A('#9c977f', '#0a0a0b') },
    lcd: { type: 'color', value: A('#c8d1b3', '#a9b88f') },
    lcdInk: { type: 'color', value: '#1f2a14' },
    ink: { type: 'color', value: A('#26241d', '#ecebe4') },
    dim: { type: 'color', value: A('#6e6a58', '#a3a396') },
    wash: { type: 'color', value: A('#00000012', '#ffffff14') },
  },
  tokens: {
    color: {
      background: '{vars.panel}', surface: '{vars.panelLo}', raised: '{vars.capTop}', inset: '{vars.lcd}', text: '{vars.ink}', muted: '{vars.dim}', border: '{vars.capEdge}', highlight: '#ffffff80',
      accent: '{vars.key}', accentTop: '{vars.keyHi}', accentBottom: '{vars.keyDown}', onAccent: '#ffffff', success: '#18a058', danger: '#e0302c', scrim: '#00000070',
    },
    shape: { small: 4, medium: 6, large: 10 },
    type: { family: 'Space Mono', scale: 0.92 },
    interaction: { lighting: false },
    surface: { shadows: false, glow: false },
    app: { background: ['linear', 180, A('#e3dfd0', '#323236'), A('#cfcab8', '#242427')] },
  },
  defaults: { shape: 6 },
  components: merge(flatComponents(), {
    button: {
      base: {
        background: key('{vars.capTop}', '{vars.capBot}'), foreground: '{vars.ink}', borderWidth: 1, borderColor: '{vars.capEdge}', innerGlowColor: '#ffffffa0', bottomRimColor: '{vars.seat}',
        shape: 6, padding: [18, 11], textStyle: { ...mono, fontWeight: 700, fontSize: 13 }, motion: { hoverScale: 1, pressedScale: 0.985 },
      },
      states: { hovered: { background: key('#ffffff', '{vars.capBot}') }, pressed: { background: key('{vars.capBot}', '{vars.capBot}'), innerGlowColor: NONE, bottomRimColor: null, borderColor: '{vars.seat}' }, disabled: { alpha: 0.5 } },
      variants: {
        primary: {
          base: { background: key('{vars.keyHi}', '{vars.key}'), foreground: '#ffffff', borderColor: '{vars.keyDown}', bottomRimColor: '{vars.keyDown}', innerGlowColor: '#ffffff60' },
          states: { hovered: { background: key('{vars.keyHi}', '{vars.keyHi}') }, pressed: { background: key('{vars.key}', '{vars.key}'), bottomRimColor: null, innerGlowColor: NONE } },
        },
        secondary: {},
        quiet: { base: { background: solid(NONE), borderColor: NONE, innerGlowColor: NONE, bottomRimColor: null }, states: { hovered: { background: solid('{vars.wash}') } } },
        danger: { base: { background: key('#f0605a', '#e0302c'), foreground: '#ffffff', borderColor: '#a01c18', bottomRimColor: '#a01c18' } },
      },
    },
    iconButton: {
      base: { background: key('{vars.capTop}', '{vars.capBot}'), foreground: '{vars.ink}', borderWidth: 1, borderColor: '{vars.capEdge}', innerGlowColor: '#ffffffa0', bottomRimColor: '{vars.seat}', shape: 6, iconSize: 18, motion: { hoverScale: 1, pressedScale: 0.97 } },
      states: { pressed: { background: key('{vars.capBot}', '{vars.capBot}'), innerGlowColor: NONE, bottomRimColor: null } },
      variants: {
        primary: { base: { background: key('{vars.keyHi}', '{vars.key}'), foreground: '#ffffff', borderColor: '{vars.keyDown}', bottomRimColor: '{vars.keyDown}' } },
        secondary: {},
        quiet: { base: { background: solid(NONE), borderColor: NONE, innerGlowColor: NONE, bottomRimColor: null }, states: { hovered: { background: solid('{vars.wash}') } } },
        danger: { base: { background: key('#f0605a', '#e0302c'), foreground: '#ffffff', borderColor: '#a01c18', bottomRimColor: '#a01c18' } },
      },
    },
    toggleSwitch: {
      base: {
        trackSize: [44, 22], trackShape: 4, thumbShape: 3, trackBackground: solid('{vars.seat}'), selectedTrackBackground: solid('{vars.key}'), trackBorderColor: '{vars.capEdge}',
        thumbBackground: key('{vars.capTop}', '{vars.capBot}'), thumbBorderColor: '{vars.capEdge}', thumbGlowColor: '#ffffffa0', thumbBottomRimColor: '{vars.seat}',
      },
    },
    checkbox: { base: { faceShape: 3, faceSize: [18, 18], faceBackground: lcd, faceBorderColor: '{vars.capEdge}', faceBorderWidth: 1, selectedFaceBackground: lcd, selectedFaceBorderColor: '{vars.capEdge}', selectedFaceForeground: '{vars.lcdInk}' } },
    slider: {
      base: {
        trackBackground: solid('{vars.seat}'), trackShape: 2, trackBorderColor: NONE, activeTrackBackground: solid('{vars.key}'), activeTrackShape: 2,
        thumbBackground: key('{vars.capTop}', '{vars.capBot}'), thumbBorderColor: '{vars.capEdge}', thumbBorderWidth: 1, thumbShape: 4, thumbGlowColor: '#ffffffa0', thumbBottomRimColor: '{vars.seat}', thumbElevation: 0,
      },
    },
    progress: { base: { shape: 3, height: 10, trackBackground: solid('{vars.seat}'), progressBackground: solid('{vars.key}'), progressShape: 3 } },
    textField: {
      base: { background: lcd, borderWidth: 1, borderColor: '{vars.capEdge}', shape: 4, insetShadeColor: '#00000030', cursorColor: '{vars.lcdInk}', placeholderColor: '#5e6b49', labelColor: '{vars.ink}', textStyle: { color: '{vars.lcdInk}' } },
      states: { focused: { borderColor: '{vars.key}', borderWidth: 2 } },
    },
    card: { base: { background: solid('{vars.panelLo}'), borderWidth: 1, borderColor: '{vars.capEdge}', shape: 10, innerGlowColor: '#ffffff60', bottomRimColor: '{vars.seat}' } },
    listTile: {
      base: {
        shape: 4, background: solid(NONE), selectedBackground: lcd, titleForeground: '{vars.ink}', subtitleForeground: '{vars.dim}', selectedTitleForeground: '{vars.lcdInk}', selectedSubtitleForeground: '#44522e',
        borderWidth: 1, borderColor: NONE, minimumHeight: 52,
      },
      states: { hovered: { background: solid('{vars.wash}') } },
    },
    separator: { base: { color: '{vars.capEdge}', highlightColor: '#ffffff60', thickness: 1 } },
    dialog: {
      base: {
        shape: 10, panelBackground: solid('{vars.panel}'), panelBorderColor: '{vars.capEdge}', panelBorderWidth: 1, panelGlowColor: '#ffffff60', panelBottomRimColor: '{vars.seat}', panelShadowElevation: 24, panelShadowColor: '#00000070',
        titleBarBackground: lcd, titleBarForeground: '{vars.lcdInk}', titleStyle: { ...mono, fontWeight: 700, fontSize: 15 }, titleBarBorderColor: '{vars.capEdge}', titleBarDividerThickness: 1,
        footerBackground: solid(NONE), scrimColor: '#00000070', closeCapBackground: key('{vars.capTop}', '{vars.capBot}'), closeCapForeground: '{vars.ink}', closeCapBorderColor: '{vars.capEdge}', closeCapBorderWidth: 1, closeCapShape: 4,
      },
      states: { hovered: { closeCapBackground: key('{vars.keyHi}', '{vars.key}'), closeCapForeground: '#ffffff' } },
    },
    dropdownMenu: {
      base: {
        panelBackground: solid('{vars.panel}'), panelShape: 8, panelBorderColor: '{vars.capEdge}', panelBorderWidth: 1, panelBottomRimColor: '{vars.seat}', panelShadowElevation: 14, panelShadowColor: '#00000060', itemShape: 4, itemForeground: '{vars.ink}',
        itemActiveBackground: solid('{vars.key}'), itemSelectedBackground: lcd, itemActiveForeground: '#ffffff', itemIconTint: '{vars.dim}', itemMutedForeground: '{vars.dim}', separatorBrush: '{vars.capEdge}', itemTextStyle: { fontSize: 13 },
      },
      states: { hovered: { itemBackground: solid('{vars.key}'), itemIconTint: '#ffffff' }, focused: { itemBackground: solid('{vars.key}') }, pressed: { itemBackground: solid('{vars.keyDown}'), itemIconTint: '#ffffff' } },
    },
    tooltip: { base: { background: lcd, foreground: '{vars.lcdInk}', borderColor: '{vars.capEdge}', borderWidth: 1, shape: 4 } },
    segmentedButton: {
      base: { background: key('{vars.capTop}', '{vars.capBot}'), foreground: '{vars.ink}', borderColor: '{vars.capEdge}', borderWidth: 1, innerGlowColor: '#ffffffa0', bottomRimColor: '{vars.seat}' },
      states: { selected: { background: key('{vars.keyHi}', '{vars.key}'), foreground: '#ffffff', innerGlowColor: NONE, bottomRimColor: null }, pressed: { background: key('{vars.capBot}', '{vars.capBot}') } },
    },
    scrollbar: { base: { trackBackground: solid(NONE), thumbBackground: solid('{vars.seat}') } },
    snackbar: { base: { background: lcd, foreground: '{vars.lcdInk}', borderColor: '{vars.capEdge}', borderWidth: 1, shape: 6, shadowElevation: 10, shadowColor: '#00000050' } },
    topAppBar: { base: { background: solid('{vars.panel}'), separatorColor: '{vars.capEdge}' } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: solid('{vars.panelLo}'), shape: 'rect', minimumHeight: 70, itemSpacing: 8, contentPadding: [12, 8], innerGlowColor: '#ffffff60' } },
        item: {
          base: {
            background: key('{vars.capTop}', '{vars.capBot}'), foreground: '{vars.ink}', shape: 6, iconSize: 20, borderWidth: 1, borderColor: '{vars.capEdge}', innerGlowColor: '#ffffffa0', bottomRimColor: '{vars.seat}',
            labelStyle: { ...mono, fontSize: 10, fontWeight: 700 }, pressedScale: 0.97,
          },
          states: {
            hovered: { background: key('#ffffff', '{vars.capBot}') },
            pressed: { background: key('{vars.capBot}', '{vars.capBot}'), innerGlowColor: NONE, bottomRimColor: null },
            selected: { background: key('{vars.keyHi}', '{vars.key}'), foreground: '#ffffff', borderColor: '{vars.keyDown}', bottomRimColor: '{vars.keyDown}', labelStyle: { ...mono, fontSize: 10, fontWeight: 700 } },
          },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: solid('{vars.panelLo}'), foreground: '{vars.ink}', shape: 'rect', overlayBrush: ['linear', 90, [NONE, 0], [NONE, 0.994], ['{vars.capEdge}', 0.994], ['{vars.capEdge}', 1]] } },
        header: { base: { dividerColor: '{vars.capEdge}', dividerHighlightColor: '#ffffff60', dividerWidth: 1 } },
        footer: { base: { dividerColor: '{vars.capEdge}', dividerHighlightColor: '#ffffff60', dividerWidth: 1 } },
        group: { base: { labelForeground: '{vars.dim}', labelShape: 4, labelHoveredBackground: solid('{vars.wash}'), separatorBrush: '{vars.capEdge}', labelStyle: { ...mono, fontSize: 11, fontWeight: 700 } } },
        item: {
          base: {
            background: solid(NONE), foreground: '{vars.ink}', iconTint: '{vars.dim}', iconSize: 17, shape: 6, minimumHeight: 42, labelStyle: { ...mono, fontSize: 13, fontWeight: 700 },
            hoverBackground: solid('{vars.wash}'), focusBackground: solid('{vars.wash}'), pressedBackground: solid('{vars.keyDown}'), selectedBackground: solid('{vars.key}'),
          },
          states: {
            hovered: { background: solid('{vars.wash}'), iconTint: '{vars.ink}' },
            pressed: { background: solid('{vars.keyDown}'), foreground: '#ffffff', iconTint: '#ffffff' },
            selected: { background: key('{vars.keyHi}', '{vars.key}'), foreground: '#ffffff', iconTint: '#ffffff', borderWidth: 1, borderColor: '{vars.keyDown}', bottomRimColor: '{vars.keyDown}', innerGlowColor: '#ffffff50' },
          },
        },
      },
    },
  }),
};
