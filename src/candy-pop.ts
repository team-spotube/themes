// Candy Pop: sweets on a pastel gradient. Fat pills with a glossy top and a thick under-edge, bouncy presses, Comfortaa.
import { A, choice, defineTheme, flatComponents, merge, NONE, solid } from '@team-spotube/theme-tool';

const ghost = solid(NONE);
const candy = (hi: string, lo: string) => ['linear', 180, hi, lo];
const bounce = { hoverScale: 1.04, pressedScale: 0.93 };

export default defineTheme({
  name: 'Candy Pop',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  updates: true,
  description: 'Sweets on a pastel gradient: fat glossy pills with a thick under-edge, bouncy presses and a round typeface. Dark is night-time candy.',
  iconPack: 'phosphor-fill',
  logo: 'logos/candy-pop.svg',
  fonts: { Comfortaa: { dir: 'comfortaa', files: [['Comfortaa-Regular.otf', 400], ['Comfortaa-Bold.otf', 700]] } },
  parameters: {
    flavor: choice('Flavor', 'bubblegum', [['bubblegum', 'Bubblegum', '#ff4fa3'], ['mint', 'Mint', '#19c9a0'], ['grape', 'Grape', '#9b5cf6'], ['lemon', 'Lemon', '#f5b800'], ['berry', 'Berry', '#ff5a5f']]),
  },
  vars: {
    none: { type: 'color', default: NONE },
    sweet: { type: 'color', value: ['match', '{params.flavor}', { bubblegum: '#ff4fa3', mint: '#19c9a0', grape: '#9b5cf6', lemon: '#f5b800', berry: '#ff5a5f' }] },
    sweetHi: { type: 'color', value: ['lighten', '{vars.sweet}', 0.28] },
    sweetLo: { type: 'color', value: ['darken', '{vars.sweet}', 0.22] },
    onSweet: { type: 'color', value: ['match', '{params.flavor}', { bubblegum: '#ffffff', mint: '#053b2f', grape: '#ffffff', lemon: '#4a3400', berry: '#ffffff' }] },
    cream: { type: 'color', value: A('#ffffff', '#3a2f5c') },
    creamLo: { type: 'color', value: A('#ffe3f1', '#2c2347') },
    creamEdge: { type: 'color', value: A('#f0b6d3', '#18112e') },
    ink: { type: 'color', value: A('#5a2347', '#fff0f8') },
    dim: { type: 'color', value: A('#a45a86', '#c4aee0') },
    wash: { type: 'color', value: ['alpha', '{vars.sweet}', 0.2] },
    soft: { type: 'color', value: ['alpha', '{vars.sweet}', 0.45] },
  },
  tokens: {
    color: {
      background: A('#fff0f8', '#241a40'), surface: '{vars.cream}', raised: '{vars.creamLo}', inset: '{vars.creamLo}', text: '{vars.ink}', muted: '{vars.dim}', border: '{vars.creamEdge}', highlight: '#ffffffc0',
      accent: '{vars.sweet}', accentTop: '{vars.sweetHi}', accentBottom: '{vars.sweetLo}', onAccent: '{vars.onSweet}', success: '#19c9a0', danger: '#ff5a5f', scrim: A('#5a234760', '#0f0820b0'),
    },
    shape: { small: 14, medium: 20, large: 32 },
    type: { family: 'Comfortaa' },
    app: { background: ['linear', 160, A('#ffe3f4', '#2a1d4d'), A('#efe3ff', '#231a40'), A('#ddf1ff', '#1a2a4a')] },
  },
  defaults: { shape: 20 },
  components: merge(flatComponents(), {
    button: {
      base: {
        background: candy('{vars.cream}', '{vars.creamLo}'), foreground: '{vars.ink}', borderWidth: 0, innerGlowColor: '#ffffffff', bottomRimColor: '{vars.creamEdge}', shape: 'pill', padding: [26, 13], motion: bounce,
        textStyle: { fontWeight: 700, fontSize: 14 }, shadows: ['#5a234722'], shadowElevation: 8, labelShadow: false,
      },
      states: { pressed: { bottomRimColor: null, shadowElevation: 1 }, disabled: { alpha: 0.5 } },
      variants: {
        primary: { base: { background: candy('{vars.sweetHi}', '{vars.sweet}'), foreground: '{vars.onSweet}', bottomRimColor: '{vars.sweetLo}', shadows: ['{vars.soft}'], shadowElevation: 12 }, states: { pressed: { bottomRimColor: null } } },
        secondary: {},
        quiet: { base: { background: ghost, innerGlowColor: NONE, bottomRimColor: null, shadowElevation: 0, foreground: '{vars.dim}' }, states: { hovered: { background: solid('{vars.wash}'), foreground: '{vars.ink}' } } },
        danger: { base: { background: candy('#ff9a9d', '#ff5a5f'), foreground: '#ffffff', bottomRimColor: '#c93338' } },
      },
    },
    iconButton: {
      base: { background: candy('{vars.cream}', '{vars.creamLo}'), foreground: '{vars.ink}', innerGlowColor: '#ffffffff', bottomRimColor: '{vars.creamEdge}', shape: 'pill', iconSize: 20, shadows: ['#5a234722'], shadowElevation: 8, motion: { hoverScale: 1.08, pressedScale: 0.9 } },
      states: { pressed: { bottomRimColor: null, shadowElevation: 1 } },
      variants: {
        primary: { base: { background: candy('{vars.sweetHi}', '{vars.sweet}'), foreground: '{vars.onSweet}', bottomRimColor: '{vars.sweetLo}', shadows: ['{vars.soft}'], shadowElevation: 12 } },
        secondary: {},
        quiet: { base: { background: ghost, innerGlowColor: NONE, bottomRimColor: null, shadowElevation: 0 }, states: { hovered: { background: solid('{vars.wash}') } } },
        danger: { base: { background: candy('#ff9a9d', '#ff5a5f'), foreground: '#ffffff', bottomRimColor: '#c93338' } },
      },
    },
    toggleSwitch: {
      base: {
        trackSize: [54, 30], trackShape: 'pill', thumbShape: 'pill', trackBackground: solid('{vars.creamEdge}'), selectedTrackBackground: candy('{vars.sweetHi}', '{vars.sweet}'), trackBorderColor: NONE, trackBottomRimColor: null,
        thumbBackground: candy('#ffffff', '#ffeaf5'), thumbBorderColor: NONE, thumbBottomRimColor: '{vars.creamEdge}', thumbElevation: 3, thumbGlowColor: '#ffffff',
      },
    },
    checkbox: { base: { faceShape: 9, faceSize: [22, 22], faceBackground: candy('{vars.cream}', '{vars.creamLo}'), faceBorderColor: '{vars.creamEdge}', faceBorderWidth: 2, selectedFaceBackground: candy('{vars.sweetHi}', '{vars.sweet}'), selectedFaceBorderColor: '{vars.sweetLo}', selectedFaceForeground: '{vars.onSweet}' } },
    slider: {
      base: {
        trackBackground: solid('{vars.creamEdge}'), trackShape: 'pill', activeTrackBackground: candy('{vars.sweetHi}', '{vars.sweet}'), activeTrackShape: 'pill',
        thumbBackground: candy('#ffffff', '#ffeaf5'), thumbBorderColor: '{vars.sweet}', thumbBorderWidth: 3, thumbShape: 'pill', thumbElevation: 3, thumbBottomRimColor: '{vars.creamEdge}',
      },
    },
    progress: { base: { shape: 'pill', height: 12, trackBackground: solid('{vars.creamEdge}'), progressBackground: candy('{vars.sweetHi}', '{vars.sweet}'), progressShape: 'pill', progressInnerGlowColor: '#ffffff80' } },
    textField: {
      base: { background: solid('{vars.cream}'), borderWidth: 2.5, borderColor: '{vars.creamEdge}', shape: 'pill', minimumHeight: 50, insetShadeColor: '#5a23470d', cursorColor: '{vars.sweet}', placeholderColor: '{vars.dim}', labelColor: '{vars.dim}' },
      states: { focused: { borderColor: '{vars.sweet}' } },
    },
    card: { base: { background: candy('{vars.cream}', '{vars.creamLo}'), shape: 32, innerGlowColor: '#ffffffff', bottomRimColor: '{vars.creamEdge}', shadowElevation: 14, shadowColor: '#5a23472a' } },
    listTile: {
      base: { shape: 26, minimumHeight: 58, contentPadding: [20, 10], background: ghost, selectedBackground: candy('{vars.sweetHi}', '{vars.sweet}'), titleForeground: '{vars.ink}', subtitleForeground: '{vars.dim}', selectedTitleForeground: '{vars.onSweet}', selectedSubtitleForeground: '{vars.onSweet}', bottomRimColor: null },
      states: { hovered: { background: solid('{vars.wash}') } },
    },
    separator: { base: { color: '{vars.creamEdge}', thickness: 2 } },
    dialog: {
      base: {
        shape: 36, panelBackground: candy('{vars.cream}', '{vars.creamLo}'), panelGlowColor: '#ffffffff', panelBottomRimColor: '{vars.creamEdge}', panelShadowElevation: 36, panelShadowColor: '#5a234740',
        titleBarBackground: ghost, titleBarForeground: '{vars.ink}', titleStyle: { fontSize: 22, fontWeight: 700 }, footerBackground: ghost, scrimColor: A('#5a234760', '#0f0820b0'),
        closeCapBackground: candy('{vars.cream}', '{vars.creamLo}'), closeCapForeground: '{vars.dim}', closeCapShape: 'pill', closeCapGlowColor: '#ffffff', closeCapElevation: 3, closeScaleHover: 1.1, closeScalePressed: 0.9,
      },
      states: { hovered: { closeCapBackground: candy('{vars.sweetHi}', '{vars.sweet}'), closeCapForeground: '{vars.onSweet}' } },
    },
    dropdownMenu: {
      base: {
        panelBackground: candy('{vars.cream}', '{vars.creamLo}'), panelShape: 26, panelGlowColor: '#ffffffff', panelBottomRimColor: '{vars.creamEdge}', panelShadowElevation: 24, panelShadowColor: '#5a23472e', itemShape: 'pill',
        itemForeground: '{vars.ink}', itemActiveBackground: candy('{vars.sweetHi}', '{vars.sweet}'), itemSelectedBackground: solid('{vars.wash}'), itemActiveForeground: '{vars.onSweet}', itemIconTint: '{vars.dim}', itemMutedForeground: '{vars.dim}', separatorBrush: '{vars.creamEdge}', itemHoverScale: 1.02,
      },
      states: { hovered: { itemBackground: candy('{vars.sweetHi}', '{vars.sweet}'), itemIconTint: '{vars.onSweet}' }, focused: { itemBackground: solid('{vars.wash}') }, pressed: { itemBackground: candy('{vars.sweet}', '{vars.sweetLo}') } },
    },
    tooltip: { base: { background: candy('{vars.sweetHi}', '{vars.sweet}'), foreground: '{vars.onSweet}', shape: 16 } },
    segmentedButton: {
      base: { background: candy('{vars.cream}', '{vars.creamLo}'), foreground: '{vars.ink}', innerGlowColor: '#ffffffff', bottomRimColor: '{vars.creamEdge}' },
      states: { selected: { background: candy('{vars.sweetHi}', '{vars.sweet}'), foreground: '{vars.onSweet}', bottomRimColor: '{vars.sweetLo}' } },
    },
    scrollbar: { base: { trackBackground: ghost, thumbBackground: solid('{vars.creamEdge}') }, states: { hovered: { thumbBackground: solid('{vars.sweet}') } } },
    snackbar: { base: { background: candy('{vars.sweetHi}', '{vars.sweet}'), foreground: '{vars.onSweet}', shape: 22, shadowElevation: 16, shadowColor: '{vars.soft}' } },
    topAppBar: { base: { background: ghost, separatorColor: NONE } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: candy('{vars.cream}', '{vars.creamLo}'), shape: 36, margin: [14, 10], insetsInsideSurface: false, innerGlowColor: '#ffffffff', bottomRimColor: '{vars.creamEdge}', shadowElevation: 20, shadowColor: '#5a23472e', minimumHeight: 64, itemSpacing: 6, contentPadding: [8, 7] } },
        item: {
          base: { background: ghost, foreground: '{vars.dim}', shape: 'pill', iconSize: 22, labelStyle: { fontSize: 11, fontWeight: 700 }, hoverScale: 1.05, pressedScale: 0.92 },
          states: { hovered: { background: solid('{vars.wash}'), foreground: '{vars.ink}' }, selected: { background: candy('{vars.sweetHi}', '{vars.sweet}'), foreground: '{vars.onSweet}', bottomRimColor: '{vars.sweetLo}', shadowElevation: 10, shadowColor: '{vars.soft}' } },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: solid(A('#ffffffa8', '#2c2347c8')), foreground: '{vars.ink}', shape: 'rect' } },
        header: { base: {} },
        footer: { base: { dividerColor: '{vars.creamEdge}', dividerWidth: 2 } },
        group: { base: { labelForeground: '{vars.dim}', labelShape: 'pill', labelHoveredBackground: solid('{vars.wash}'), separatorBrush: '{vars.creamEdge}' } },
        item: {
          base: {
            background: ghost, foreground: '{vars.ink}', iconTint: '{vars.dim}', iconSize: 20, shape: 'pill', minimumHeight: 48, contentPadding: [18, 10], labelStyle: { fontSize: 14, fontWeight: 700 }, hoverScale: 1.02, pressedScale: 0.95,
            hoverBackground: solid('{vars.wash}'), focusBackground: solid('{vars.wash}'), pressedBackground: solid('{vars.soft}'), selectedBackground: candy('{vars.sweetHi}', '{vars.sweet}'),
          },
          states: {
            hovered: { background: solid('{vars.wash}'), iconTint: '{vars.sweet}' },
            pressed: { background: solid('{vars.soft}') },
            selected: { background: candy('{vars.sweetHi}', '{vars.sweet}'), foreground: '{vars.onSweet}', iconTint: '{vars.onSweet}', innerGlowColor: '#ffffffa0', bottomRimColor: '{vars.sweetLo}', shadowElevation: 8, shadowColor: '{vars.soft}' },
          },
        },
      },
    },
  }),
});
