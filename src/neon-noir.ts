// Neon Noir: synthwave after dark. A sunset-gradient backdrop, tubes of neon around outlines, Audiowide headings.
import { A, choice, defineTheme, flatComponents, merge, NONE, solid } from '@team-spotube/theme-tool';

const tube = (c = '{vars.neon}', r = 10) => ({ color: c, offsetX: 0, offsetY: 0, blurRadius: r });
const sheet = (a: string, b: string) => ['linear', 160, a, b];
const ghost = solid(NONE);


// The app's own components (cards, players, lists, screens): neon tubes around outlines, Audiowide headings.
const neonTitle = (extra = {}) => ({ fontFamily: 'Audiowide', shadow: tube('{vars.halo}', 8), ...extra });
// Millennium components the stock look would otherwise leave glossy.
const gaps = {
  autocomplete: {
    base: {
      panelBackground: sheet('{vars.pane}', '{vars.pane2}'), panelShape: 18, panelBorderColor: '{vars.neon}', panelBorderWidth: 1, panelShadowElevation: 24, panelShadowColor: '{vars.haloSoft}', panelBottomRimColor: null,
      itemShape: 12, itemForeground: '{vars.ink}', highlightedItemBackground: solid('{vars.wash}'), highlightedItemForeground: '{vars.neon}', dividerColor: '{vars.line}', itemInteractionOverlay: ghost,
    },
    states: { hovered: { itemBackground: solid('{vars.wash}') }, pressed: { itemBackground: solid('{vars.wash}') } },
  },
  bottomSheet: { base: { background: sheet('{vars.pane}', '{vars.pane2}'), shape: [24, 24, 0, 0], borderColor: '{vars.neon}', borderWidth: 1, shadowElevation: 24, shadowColor: '{vars.halo}', foreground: '{vars.ink}', handleColor: '{vars.line}', handleShape: 'pill', bottomRimColor: null, orbColor: null } },
  modalBottomSheet: { base: { background: sheet('{vars.pane}', '{vars.pane2}'), shape: [24, 24, 0, 0], borderColor: '{vars.neon}', borderWidth: 1, shadowElevation: 24, shadowColor: '{vars.halo}', foreground: '{vars.ink}', handleColor: '{vars.line}', handleShape: 'pill', scrimColor: A('#2a124570', '#05020ac0'), bottomRimColor: null, orbColor: null } },
  drawer: { base: { background: sheet('{vars.pane}', '{vars.pane2}'), shape: [0, 24, 24, 0], borderColor: '{vars.neon}', borderWidth: 1, shadowElevation: 24, shadowColor: '{vars.halo}', foreground: '{vars.ink}', scrimColor: A('#2a124570', '#05020ac0'), bottomRimColor: null, orbColor: null } },
  tabGroup: {
    base: {
      listBackground: solid('{vars.pane2}'), listBorderColor: '{vars.line}', listBorderWidth: 1, listShape: 'pill', listBottomRimColor: null, tabShape: 'pill', tabTextStyle: { fontWeight: 700 }, unselectedTabForeground: '{vars.dim}',
      selectedTabBackground: ['linear', 135, '{vars.neonHi}', '{vars.neonLo}'], selectedTabForeground: '#ffffff', selectedTabBorderColor: '{vars.neon}', selectedTabBottomRimColor: null, selectedTabOrbColor: null, tabHoverBackground: solid('{vars.wash}'), tabGlowColor: '{vars.haloSoft}',
    },
  },
  loading: {
    base: {
      color: '{vars.neon}', highlightColor: '{vars.neonHi}', fillBrush: ['linear', 90, '{vars.neonLo}', '{vars.neon}', '{vars.neonHi}'], trackBackground: solid('{vars.pane2}'), trackBorderColor: '{vars.line}', trackBorderWidth: 1,
      linearShape: 'pill', linearHeight: 8, trackBottomRimColor: null, skeletonBackground: solid('{vars.wash}'), skeletonShimmerColor: ['alpha', '{vars.neon}', 0.25],
    },
  },
  avatar: { base: { shape: 'pill', background: solid('{vars.pane2}'), foreground: '{vars.ink}', borderColor: '{vars.neon}', borderWidth: 1.5, shadowElevation: 0, bottomRimColor: null, initialsBackground: ['linear', 135, '{vars.neonHi}', '{vars.neonLo}'] } },
  radioGroup: {
    base: { indicatorBackground: ghost, indicatorBorderColor: '{vars.line}', indicatorBorderWidth: 1.5, indicatorShape: 'pill', indicatorBottomRimColor: null, indicatorInteractionOverlay: ghost, selectedIndicatorBackground: ghost, dotBrush: ['linear', 135, '{vars.neonHi}', '{vars.neonLo}'] },
    states: { selected: { indicatorBorderColor: '{vars.neon}', indicatorGlowColor: '{vars.halo}' } },
  },
  triStateCheckbox: {
    base: { faceShape: 6, faceSize: [20, 20], faceBackground: ghost, faceBorderColor: '{vars.line}', faceBorderWidth: 1.5, selectedFaceBackground: ['linear', 135, '{vars.neonHi}', '{vars.neonLo}'], indeterminateFaceBackground: ['linear', 135, '{vars.neonHi}', '{vars.neonLo}'], selectedFaceBorderColor: '{vars.neon}', selectedFaceForeground: '#ffffff', selectedFaceGlowColor: '{vars.halo}' },
  },
  disclosure: {
    base: { background: ghost, borderColor: '{vars.line}', borderWidth: 1, shape: 14, foreground: '{vars.ink}', chevronForeground: '{vars.neon}', headerBackground: ghost, bottomRimColor: null, titleStyle: { fontWeight: 700 } },
    states: { hovered: { headerBackground: solid('{vars.wash}') } },
  },
  pullToRefresh: { base: { indicatorBackground: sheet('{vars.pane}', '{vars.pane2}'), indicatorBorderColor: '{vars.neon}', indicatorBorderWidth: 1, indicatorShape: 'pill', indicatorShadowElevation: 12, indicatorShadowColor: '{vars.halo}', indicatorBottomRimColor: null, indicatorProgressBackground: ['linear', 90, '{vars.neonLo}', '{vars.neon}'], indicatorTrackBackground: solid('{vars.pane2}') } },
};
const appComponents = {
  mediaCard: {
    variants: {
      root: {
        base: { shape: 14, background: solid('{vars.pane}'), borderColor: '{vars.line}', borderWidth: 1, shadowElevation: 0, innerGlowColor: NONE },
        states: {
          hovered: { highlightBackground: ['linear', 160, '{vars.wash}', NONE], borderColor: '{vars.neon}', innerGlowColor: '{vars.haloSoft}' },
          focused: { highlightBackground: ['linear', 160, '{vars.wash}', NONE], borderColor: '{vars.twin}', borderWidth: 2, innerGlowColor: '{vars.twinHalo}' },
          pressed: { highlightBackground: ['linear', 160, '{vars.wash}', NONE], borderColor: '{vars.neon}', innerGlowColor: '{vars.halo}', scale: 0.97 },
          error: { background: solid(['alpha', '{tokens.color.danger}', 0.14]), borderColor: '{tokens.color.danger}' },
        },
      },
      artwork: { base: { shape: 10 } },
      info: { base: { titleStyle: { fontWeight: 700, letterSpacing: 0.3 } } },
    },
  },
  mediaListTile: {
    base: { shape: 12, borderColor: NONE, borderWidth: 1 },
    states: {
      selected: { background: ['linear', 90, '{vars.wash}', NONE], borderColor: '{vars.neon}', titleForeground: '{vars.neon}' },
      error: { borderColor: '{tokens.color.danger}' },
    },
  },
  mediaArtwork: { base: { shape: 10, borderColor: '{vars.line}', background: solid('{vars.pane2}'), placeholderTint: '{vars.neon}' } },
  floatingPlayer: {
    variants: {
      root: { base: { background: ['linear', 180, '{vars.pane}', '{vars.pane2}'], shape: 16, horizontalMargin: 14, borderColor: '{vars.neon}', borderWidth: 1 } },
      artwork: { base: { shape: 8, background: '{vars.wash}', placeholderTint: '{vars.neon}' } },
      info: { base: { titleStyle: { fontWeight: 700, shadow: tube('{vars.halo}', 6) } } },
    },
  },
  largePlayer: {
    variants: {
      root: { base: { tint: ['alpha', '{vars.deep}', 0.72] } },
      artwork: { base: { shape: 14 } },
      info: { base: { titleStyle: neonTitle({ fontSize: 15 }) } },
      transport: { base: { activeTint: '{vars.neon}' } },
    },
  },
  expandedPlayer: {
    variants: {
      root: { base: { headerStyle: { fontFamily: 'Audiowide' } } },
      artwork: { base: { shape: 22 } },
      info: { base: { titleStyle: neonTitle() } },
      transport: { base: { activeTint: '{vars.neon}' } },
      lyrics: { base: { titleStyle: { fontFamily: 'Audiowide' }, iconTint: '{vars.neon}', shadowElevation: 0 } },
      optionTile: { base: { iconTint: '{vars.neon}' } },
    },
  },
  playerQueue: {
    variants: {
      root: { base: { titleStyle: { fontFamily: 'Audiowide' } } },
      row: {
        base: { thumbShape: 8, handleTint: '{vars.dim}', thumbBackground: '{vars.pane2}' },
        states: { selected: { titleStyle: { fontWeight: 700, color: '{vars.neon}', shadow: tube('{vars.halo}', 8) } } },
      },
    },
  },
  trackList: {
    variants: {
      row: {
        base: { selectedBackground: ['linear', 90, '{vars.wash}', NONE], artworkShape: 8 },
        states: {
          selected: { titleStyle: { fontWeight: 700, color: '{vars.neon}', shadow: tube('{vars.halo}', 8) }, indexStyle: { color: '{vars.neon}' } },
          error: { titleStyle: { color: '{tokens.color.danger}' } },
        },
      },
    },
  },
  trackOptions: { base: { headerArtworkShape: 10, headerTitleStyle: { fontFamily: 'Audiowide' } } },
  collectionHeader: { base: { artworkShape: 22, titleStyle: neonTitle(), compactTitleStyle: neonTitle(), collapsedTitleStyle: { fontFamily: 'Audiowide' }, collapsedArtworkShape: 8 } },
  featuredCarousel: { base: { cardShape: 22, scrimColor: ['alpha', '{vars.deep}', 0.85], buttonTint: '{vars.neon}', titleStyle: neonTitle() } },
  emptyState: { base: { iconBoxShape: 14, iconBoxBackground: solid('{vars.wash}'), iconBoxBorderColor: '{vars.neon}', iconTint: '{vars.neon}', titleStyle: { fontFamily: 'Audiowide' } } },
  errorDisplay: { base: { iconTint: '{tokens.color.danger}', titleStyle: { fontFamily: 'Audiowide' } } },
  loginRequired: { base: { badgeShape: 'pill', badgeBackground: '{vars.wash}', iconTint: '{vars.neon}', titleStyle: { fontFamily: 'Audiowide' } } },
  section: { variants: { header: { base: { titleStyle: neonTitle() } } } },
  connectBanner: {
    variants: {
      row: { base: { background: '{vars.wash}', shape: 'pill', chevronTint: '{vars.neon}' } },
      dot: { base: { color: '{vars.neon}', ringColor: '{vars.halo}' } },
    },
  },
  settingsRow: { variants: { root: { base: { titleStyle: { fontWeight: 700 } } } } },
  lyricsLine: {
    variants: {
      root: { states: { selected: { textStyle: { color: '{vars.neon}', fontWeight: 700, shadow: tube('{vars.halo}', 10) } } } },
      immersive: { states: { selected: { textStyle: { color: '{vars.neon}', shadow: tube('{vars.halo}', 10) } } } },
    },
  },
};

export default defineTheme({
  name: 'Neon Noir',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  updates: true,
  description: 'Synthwave after dark: a sunset-gradient backdrop, neon tubes around outlines, glowing headings and an Audiowide wordmark feel. Light is a pastel daylight take.',
  iconPack: 'phosphor',
  logo: 'logos/neon-noir.svg',
  fonts: {
    Audiowide: { dir: 'audiowide', files: [['Audiowide-Regular.ttf', 400]] },
    'Chakra Petch': { dir: 'chakrapetch', files: [['ChakraPetch-Regular.ttf', 400], ['ChakraPetch-Bold.ttf', 700]] },
  },
  parameters: {
    neon: choice('Neon', 'pink', [['pink', 'Pink', '#ff3da6'], ['cyan', 'Cyan', '#2ee6ff'], ['lime', 'Lime', '#a3e635'], ['amber', 'Amber', '#ffb020']]),
    glow: { type: 'number', label: 'Glow', default: 0.6, min: 0, max: 1, step: 0.1 },
  },
  vars: {
    none: { type: 'color', default: NONE },
    neon: { type: 'color', value: ['match', '{params.neon}', { pink: A('#d6177f', '#ff3da6'), cyan: A('#0891b2', '#2ee6ff'), lime: A('#4d7c0f', '#a3e635'), amber: A('#b45309', '#ffb020') }] },
    neonHi: { type: 'color', value: ['match', '{params.neon}', { pink: '#ff7ac6', cyan: '#7ff3ff', lime: '#d9ff6a', amber: '#ffd36a' }] },
    neonLo: { type: 'color', value: ['match', '{params.neon}', { pink: '#7b2ff7', cyan: '#2563eb', lime: '#16a34a', amber: '#ef4444' }] },
    twin: { type: 'color', value: ['match', '{params.neon}', { pink: A('#0891b2', '#2ee6ff'), cyan: A('#d6177f', '#ff3da6'), lime: A('#0891b2', '#2ee6ff'), amber: A('#7c3aed', '#b794ff') }] },
    halo: { type: 'color', value: ['alpha', '{vars.neon}', ['mul', '{params.glow}', 0.95]] },
    haloSoft: { type: 'color', value: ['alpha', '{vars.neon}', ['mul', '{params.glow}', 0.35]] },
    twinHalo: { type: 'color', value: ['alpha', '{vars.twin}', ['mul', '{params.glow}', 0.6]] },
    ink: { type: 'color', value: A('#2a1245', '#f6f0ff') },
    dim: { type: 'color', value: A('#6b5a86', '#a99bc7') },
    deep: { type: 'color', value: A('#f4ecff', '#0b0614') },
    pane: { type: 'color', value: A('#ffffffe6', '#150d28e6') },
    pane2: { type: 'color', value: A('#f1e6ff', '#1f1438') },
    line: { type: 'color', value: A('#cdb6ee', '#3b2a63') },
    wash: { type: 'color', value: ['alpha', '{vars.neon}', 0.16] },
  },
  tokens: {
    color: {
      background: '{vars.deep}', surface: '{vars.pane}', raised: '{vars.pane2}', inset: A('#ebdfff', '#090411'), text: '{vars.ink}', muted: '{vars.dim}', border: '{vars.line}', highlight: '#ffffff30',
      accent: '{vars.neon}', accentTop: '{vars.neonHi}', accentBottom: '{vars.neonLo}', onAccent: '#ffffff', success: '#4dffb0', danger: '#ff5470', scrim: A('#2a124570', '#05020ac0'),
    },
    shape: { small: 8, medium: 14, large: 22 },
    type: {
      family: 'Chakra Petch',
      styles: { displaySmall: { fontFamily: 'Audiowide' }, headlineLarge: { fontFamily: 'Audiowide' }, headlineMedium: { fontFamily: 'Audiowide' }, headlineSmall: { fontFamily: 'Audiowide' }, titleLarge: { fontFamily: 'Audiowide' } },
    },
    app: {
      background: ['linear', 180, A('#f8f0ff', '#0a0518'), A('#e9d7ff', '#1a0b3a'), A('#ffd9ef', '#3a0f4f')],
    },
  },
  defaults: { shape: 14 },
  components: merge(merge(merge(flatComponents(), {
    button: {
      base: { background: ghost, foreground: '{vars.ink}', borderWidth: 1.5, borderColor: '{vars.line}', shape: 'pill', padding: [22, 11], textStyle: { fontWeight: 700, letterSpacing: 0.6 }, motion: { hoverScale: 1.03, pressedScale: 0.96 } },
      states: { hovered: { borderColor: '{vars.neon}', shadows: ['{vars.haloSoft}'], shadowElevation: 12 }, pressed: { background: solid('{vars.wash}') }, disabled: { alpha: 0.4 } },
      variants: {
        primary: {
          base: { background: ['linear', 135, '{vars.neonHi}', '{vars.neon}', '{vars.neonLo}'], foreground: '#ffffff', borderWidth: 0, innerGlowColor: '#ffffff50', shadows: ['{vars.halo}'], shadowElevation: 16, textStyle: { fontWeight: 700, letterSpacing: 0.8, shadow: { color: '#00000070', offsetY: 1, blurRadius: 3 } } },
          states: { hovered: { shadowElevation: 24, motion: { hoverScale: 1.05, pressedScale: 0.95 } }, pressed: { shadowElevation: 5 } },
        },
        secondary: { base: { borderColor: '{vars.twin}', foreground: '{vars.twin}', shadows: ['{vars.twinHalo}'], shadowElevation: 10 }, states: { hovered: { background: solid('{vars.twinHalo}'), foreground: '#ffffff', shadowElevation: 18, borderColor: '{vars.twin}' } } },
        quiet: { base: { borderColor: NONE, foreground: '{vars.dim}' }, states: { hovered: { background: solid('{vars.wash}'), foreground: '{vars.ink}', borderColor: NONE, shadowElevation: 0 } } },
        danger: { base: { background: ['linear', 135, '#ff7a8e', '#ff5470', '#b3123a'], foreground: '#ffffff', borderWidth: 0, shadows: ['#ff547090'], shadowElevation: 14 } },
      },
    },
    iconButton: {
      base: { background: ghost, foreground: '{vars.ink}', borderWidth: 1.5, borderColor: '{vars.line}', shape: 'pill', iconSize: 18, motion: { hoverScale: 1.08, pressedScale: 0.92 } },
      states: { hovered: { borderColor: '{vars.neon}', shadows: ['{vars.haloSoft}'], shadowElevation: 12 } },
      variants: {
        primary: { base: { background: ['linear', 135, '{vars.neonHi}', '{vars.neonLo}'], foreground: '#ffffff', borderWidth: 0, shadows: ['{vars.halo}'], shadowElevation: 14 } },
        secondary: { base: { borderColor: '{vars.twin}', foreground: '{vars.twin}' } },
        quiet: { base: { borderColor: NONE } },
        danger: { base: { background: ['linear', 135, '#ff7a8e', '#b3123a'], foreground: '#ffffff', borderWidth: 0, shadows: ['#ff547080'], shadowElevation: 12 } },
      },
    },
    toggleSwitch: {
      base: {
        trackSize: [50, 26], trackShape: 'pill', thumbShape: 'pill', trackBackground: solid('{vars.pane2}'), selectedTrackBackground: ['linear', 90, '{vars.neonLo}', '{vars.neon}'], trackBorderColor: '{vars.line}',
        thumbBackground: ['radial', 0.35, 0.3, 0.8, '#ffffff', '#d9c6ff'], thumbBorderColor: NONE,
      },
      states: { selected: { trackBorderColor: '{vars.neon}', trackGlowColor: '{vars.halo}', thumbGlowColor: '{vars.haloSoft}' } },
    },
    checkbox: {
      base: { faceShape: 6, faceSize: [20, 20], faceBackground: ghost, faceBorderColor: '{vars.line}', faceBorderWidth: 1.5, selectedFaceBackground: ['linear', 135, '{vars.neonHi}', '{vars.neonLo}'], selectedFaceBorderColor: '{vars.neon}', selectedFaceForeground: '#ffffff', selectedFaceGlowColor: '{vars.halo}' },
    },
    slider: {
      base: {
        trackBackground: solid('{vars.pane2}'), trackBorderColor: '{vars.line}', trackShape: 'pill', activeTrackBackground: ['linear', 90, '{vars.neonLo}', '{vars.neon}', '{vars.neonHi}'], activeTrackShape: 'pill', activeTrackGlowColor: '{vars.halo}',
        thumbBackground: ['radial', 0.35, 0.3, 0.8, '#ffffff', '#e7d6ff'], thumbBorderColor: '{vars.neon}', thumbBorderWidth: 2, thumbShape: 'pill', thumbGlowColor: '{vars.halo}',
      },
    },
    progress: { base: { shape: 'pill', height: 8, trackBackground: solid('{vars.pane2}'), borderColor: '{vars.line}', borderWidth: 1, progressBackground: ['linear', 90, '{vars.neonLo}', '{vars.neon}', '{vars.neonHi}'], progressShape: 'pill', progressInnerGlowColor: '#ffffff40' } },
    textField: {
      base: { background: solid(A('#ffffffd0', '#0e0719e6')), borderWidth: 1.5, borderColor: '{vars.line}', shape: 'pill', minimumHeight: 46, cursorColor: '{vars.neonHi}', placeholderColor: '{vars.dim}', labelColor: '{vars.dim}' },
      states: { focused: { borderColor: '{vars.twin}', shadowElevation: 0 } },
    },
    card: { base: { background: sheet('{vars.pane}', '{vars.pane2}'), borderWidth: 1, borderColor: '{vars.line}', shape: 22, innerGlowColor: '#ffffff18', shadowElevation: 18, shadowColor: '{vars.haloSoft}' } },
    listTile: {
      base: { shape: 14, background: ghost, selectedBackground: ['linear', 90, '{vars.wash}', '#7b2ff710'], borderWidth: 1, borderColor: NONE, titleForeground: '{vars.ink}', subtitleForeground: '{vars.dim}', selectedTitleForeground: '{vars.neon}', selectedSubtitleForeground: '{vars.dim}', minimumHeight: 54 },
      states: { hovered: { background: solid('{vars.wash}') }, selected: { borderColor: '{vars.neon}' } },
    },
    separator: { base: { color: '{vars.line}', thickness: 1 } },
    dialog: {
      base: {
        shape: 24, panelBackground: sheet('{vars.pane}', '{vars.pane2}'), panelBorderColor: '{vars.neon}', panelBorderWidth: 1.5, panelGlowColor: '#ffffff18', panelShadowElevation: 40, panelShadowColor: '{vars.halo}',
        titleBarBackground: ghost, titleBarForeground: '{vars.ink}', titleStyle: { fontFamily: 'Audiowide', fontSize: 22, shadow: tube('{vars.halo}', 12) }, footerBackground: ghost, scrimColor: A('#2a124570', '#05020ac0'),
        closeCapBackground: ghost, closeCapForeground: '{vars.dim}', closeCapShape: 'pill',
      },
      states: { hovered: { closeCapBackground: solid('{vars.wash}'), closeCapForeground: '{vars.neon}', closeCapGlowColor: '{vars.haloSoft}' } },
    },
    dropdownMenu: {
      base: {
        panelBackground: sheet('{vars.pane}', '{vars.pane2}'), panelShape: 18, panelBorderColor: '{vars.neon}', panelBorderWidth: 1, panelShadowElevation: 24, panelShadowColor: '{vars.haloSoft}', itemShape: 12, itemForeground: '{vars.ink}',
        itemActiveBackground: solid('{vars.wash}'), itemSelectedBackground: solid('{vars.wash}'), itemActiveForeground: '{vars.neon}', itemIconTint: '{vars.dim}', itemMutedForeground: '{vars.dim}', separatorBrush: '{vars.line}', itemActiveBorderColor: '{vars.neon}',
      },
      states: { hovered: { itemBackground: solid('{vars.wash}'), itemIconTint: '{vars.neon}' }, focused: { itemBackground: solid('{vars.wash}') }, pressed: { itemBackground: solid('{vars.wash}') } },
    },
    tooltip: { base: { background: solid('{vars.pane2}'), foreground: '{vars.ink}', borderColor: '{vars.neon}', borderWidth: 1, shape: 10, shadowElevation: 12, shadowColor: '{vars.haloSoft}' } },
    segmentedButton: { base: { background: ghost, foreground: '{vars.ink}', borderColor: '{vars.line}', borderWidth: 1.5 }, states: { selected: { background: solid('{vars.wash}'), foreground: '{vars.neon}', borderColor: '{vars.neon}', shadows: ['{vars.haloSoft}'], shadowElevation: 10 } } },
    scrollbar: { base: { trackBackground: ghost, thumbBackground: solid('{vars.line}') }, states: { hovered: { thumbBackground: solid('{vars.neon}') } } },
    snackbar: { base: { background: solid('{vars.pane2}'), foreground: '{vars.ink}', borderColor: '{vars.neon}', borderWidth: 1, shape: 14, shadowElevation: 20, shadowColor: '{vars.halo}' } },
    topAppBar: { base: { background: solid('{vars.pane}'), separatorColor: '{vars.line}' } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: sheet('{vars.pane}', '{vars.pane2}'), shape: 28, margin: [14, 10], insetsInsideSurface: false, borderWidth: 1, borderColor: '{vars.neon}', shadowElevation: 24, shadowColor: '{vars.halo}', minimumHeight: 62, itemSpacing: 6, contentPadding: [8, 6] } },
        item: {
          base: { background: ghost, foreground: '{vars.dim}', shape: 'pill', iconSize: 20, labelStyle: { fontSize: 11, fontWeight: 700, letterSpacing: 0.4 } },
          states: { hovered: { background: solid('{vars.wash}'), foreground: '{vars.ink}' }, selected: { background: ['linear', 135, '{vars.neonHi}', '{vars.neonLo}'], foreground: '#ffffff', shadowElevation: 14, shadowColor: '{vars.halo}' } },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: solid(A('#ffffffb8', '#0d0720c8')), foreground: '{vars.ink}', shape: 'rect', overlayBrush: ['linear', 90, [NONE, 0], [NONE, 0.995], ['{vars.neon}', 0.995], ['{vars.neon}', 1]] } },
        header: { base: { dividerColor: '{vars.line}', dividerWidth: 1 } },
        footer: { base: { dividerColor: '{vars.line}', dividerWidth: 1 } },
        group: { base: { labelForeground: '{vars.dim}', labelShape: 10, labelHoveredBackground: solid('{vars.wash}'), separatorBrush: '{vars.line}', labelStyle: { letterSpacing: 1.2, fontSize: 11 } } },
        item: {
          base: {
            background: ghost, foreground: '{vars.ink}', iconTint: '{vars.dim}', iconSize: 18, shape: 'pill', minimumHeight: 44, labelStyle: { fontSize: 14, fontWeight: 700 },
            hoverBackground: solid('{vars.wash}'), focusBackground: solid('{vars.wash}'), pressedBackground: solid('{vars.wash}'), selectedBackground: ['linear', 90, '{vars.wash}', NONE],
          },
          states: {
            hovered: { background: solid('{vars.wash}'), iconTint: '{vars.neon}' },
            selected: {
              background: ['linear', 90, '{vars.wash}', NONE], foreground: '{vars.neon}', iconTint: '{vars.neon}', borderWidth: 1, borderColor: '{vars.neon}', shadowElevation: 14, shadowColor: '{vars.haloSoft}',
              selectedIndicatorColor: '{vars.neon}', selectedIndicatorWidth: 3, labelStyle: { fontSize: 14, fontWeight: 700, shadow: tube('{vars.halo}', 8) },
            },
          },
        },
      },
    },
  }), appComponents), gaps),
});
