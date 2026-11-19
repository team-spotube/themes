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
  updates: true,
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
    autocomplete: {
      base: {
        panelBackground: tile('{vars.tile}'), panelShape: 'rect', panelBorderWidth: 0, panelGlowColor: NONE, panelBottomRimColor: NONE, panelShadowElevation: 0, panelShadowColor: NONE,
        itemBackground: tile(NONE), itemShape: 'rect', itemForeground: '{vars.ink}', highlightedItemBackground: tile('{vars.key}'), highlightedItemForeground: '#ffffff', itemMinimumHeight: 44,
        itemTextStyle: { fontSize: 15, fontWeight: 300 }, itemInnerGlowColor: NONE, itemInteractionOverlay: tile(NONE), itemShadowElevation: 0, itemHoverScale: 1, itemPressedScale: 1, dividerColor: '{vars.tileHi}', dividerSecondaryColor: NONE,
      },
    },
    bottomSheet: { base: { background: tile('{vars.tile}'), shape: 'rect', borderWidth: 0, innerGlowColor: NONE, bottomRimColor: NONE, orbColor: null, overlayBrush: NONE, shadowElevation: 0, handleColor: '{vars.dim}', handleShape: 'rect', foreground: '{vars.ink}' } },
    modalBottomSheet: { base: { background: tile('{vars.tile}'), shape: 'rect', borderWidth: 0, innerGlowColor: NONE, bottomRimColor: NONE, orbColor: null, overlayBrush: NONE, shadowElevation: 0, handleColor: '{vars.dim}', handleShape: 'rect', foreground: '{vars.ink}', scrimColor: A('#ffffffc0', '#000000c0') } },
    drawer: { base: { background: tile('{vars.tile}'), shape: 'rect', borderWidth: 0, innerGlowColor: NONE, bottomRimColor: NONE, orbColor: null, overlayBrush: NONE, shadowElevation: 0, foreground: '{vars.ink}', scrimColor: A('#ffffffc0', '#000000c0') } },
    tabGroup: {
      base: {
        listBackground: tile(NONE), listBorderWidth: 0, listBottomRimColor: NONE, listInnerGlowColor: NONE, listInsetShadeColor: NONE, listShadowElevation: 0, listShape: 'rect', tabShape: 'rect', tabElevation: 0, tabGlowColor: NONE,
        tabHoverScale: 1, tabPressedScale: 0.96, tabHoverBackground: tile('{vars.tile}'), tabPressedBackground: tile('{vars.tileHi}'), unselectedTabBackground: tile(NONE), unselectedTabForeground: '{vars.dim}',
        selectedTabBackground: tile('{vars.key}'), selectedTabItemBackground: tile('{vars.key}'), selectedTabForeground: '#ffffff', selectedTabBorderColor: NONE, selectedTabBottomRimColor: NONE, selectedTabOrbColor: null, selectedTabOverlayBrush: NONE,
        tabBorderWidth: 0, tabHoverBorderWidth: 0, tabTextStyle: { fontWeight: 300, fontSize: 18 },
      },
    },
    loading: {
      base: {
        color: '{vars.key}', fillBrush: tile('{vars.key}'), glossBrush: tile(NONE), trackBackground: tile('{vars.tileHi}'), trackBorderWidth: 0, trackBottomRimColor: NONE, trackGlowColor: NONE, bufferedBrush: tile('{vars.tileHi}'),
        linearHeight: 4, linearShape: 'rect', segmentShape: 'rect', skeletonBackground: tile('{vars.tile}'), skeletonShimmerColor: '{vars.tileHi}',
      },
    },
    avatar: { base: { shape: 'rect', background: tile('{vars.tile}'), initialsBackground: tile('{vars.key}'), foreground: '#ffffff', borderWidth: 0, shadowElevation: 0, innerGlowColor: NONE, bottomRimColor: NONE, imageOverlay: tile(NONE), interactionOverlay: tile(NONE) } },
    radioGroup: {
      base: {
        indicatorShape: 'pill', indicatorBackground: tile(NONE), selectedIndicatorBackground: tile(NONE), indicatorBorderColor: '{vars.ink}', indicatorBorderWidth: 2, indicatorGlowColor: NONE, indicatorBottomRimColor: NONE, indicatorElevation: 0,
        indicatorHoverScale: 1, indicatorPressedScale: 0.96, indicatorInteractionOverlay: tile(NONE), indicatorInteractionRim: tile(NONE), dotColor: '{vars.key}', dotBrush: tile('{vars.key}'), labelColor: '{vars.ink}', selectedLabelColor: '{vars.ink}',
      },
      states: { selected: { indicatorBorderColor: '{vars.key}' } },
    },
    triStateCheckbox: {
      base: {
        faceShape: 'rect', faceSize: [22, 22], faceBackground: tile(NONE), faceBorderColor: '{vars.ink}', faceBorderWidth: 2, selectedFaceBackground: tile('{vars.key}'), indeterminateFaceBackground: tile('{vars.key}'), selectedFaceBorderColor: '{vars.key}',
        selectedFaceForeground: '#ffffff', dashBrush: tile('#ffffff'), faceGlowColor: NONE, selectedFaceGlowColor: NONE, faceElevation: 0, faceBottomRimColor: NONE, faceInteractionOverlay: tile(NONE), faceHoverScale: 1, facePressedScale: 0.96,
      },
    },
    disclosure: {
      base: {
        background: tile('{vars.tile}'), shape: 'rect', borderWidth: 0, innerGlowColor: NONE, bottomRimColor: NONE, shadowElevation: 0, shadows: [NONE], headerBackground: tile(NONE), headerInteractionOverlay: tile(NONE), headerInteractionRim: tile(NONE),
        headerPressedScale: 0.98, chevronForeground: '{vars.ink}', foreground: '{vars.ink}', contentBackground: tile(NONE), titleStyle: { fontWeight: 300, fontSize: 18 },
      },
    },
    pullToRefresh: {
      base: {
        indicatorBackground: tile('{vars.tile}'), indicatorBorderWidth: 0, indicatorBottomRimColor: NONE, indicatorInnerGlowColor: NONE, indicatorShadowElevation: 0, indicatorShape: 'rect',
        indicatorProgressBackground: tile('{vars.key}'), indicatorTrackBackground: tile('{vars.tileHi}'),
      },
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

    // ---- the app's own components (theme format 1.3): flat tiles, no corners, light type, presses tilt back ----
    mediaCard: {
      variants: {
        root: {
          base: {
            shape: 'rect', background: solid('{vars.tile}'), highlightBackground: solid('{vars.tileHi}'), borderColor: NONE, borderWidth: 0, innerGlowColor: NONE,
            shadowElevation: 0, transitionMillis: 120, scaleMillis: 120,
          },
          states: {
            focused: { borderColor: '{vars.ink}', borderWidth: 2 },
            pressed: { scale: 0.96 },
            error: { background: solid(['alpha', '{tokens.color.danger}', 0.3]) },
          },
        },
        artwork: { base: { shape: 'rect' } },
        info: { base: { titleStyle: { fontWeight: 400 } } },
      },
    },
    mediaListTile: {
      base: { shape: 'rect', borderWidth: 0, borderColor: NONE },
      states: {
        hovered: { background: solid('{vars.tile}') },
        selected: { background: solid('{vars.key}'), titleForeground: '#ffffff', subtitleStyle: { color: '#ffffffd0' } },
        error: { titleForeground: '{tokens.color.danger}' },
      },
    },
    mediaArtwork: { base: { shape: 'rect', background: solid('{vars.tileHi}'), borderColor: NONE, borderWidth: 0, placeholderTint: '{vars.dim}' } },
    floatingPlayer: {
      variants: {
        root: { base: { background: solid('{vars.tile}'), shape: 'rect', borderColor: NONE, borderWidth: 0, progressHeight: 4 } },
        artwork: { base: { shape: 'rect', background: '{vars.tileHi}' } },
        info: { base: { titleStyle: { fontWeight: 400 } } },
      },
    },
    largePlayer: {
      variants: {
        root: { base: { tint: ['alpha', '{vars.page}', 0.94], blurRadius: 0 } },
        artwork: { base: { shape: 'rect', background: '{vars.tileHi}' } },
        info: { base: { titleStyle: { fontWeight: 300 } } },
        transport: { base: { activeTint: '{vars.key}' } },
      },
    },
    expandedPlayer: {
      variants: {
        root: { base: { headerStyle: { fontWeight: 300 } } },
        artwork: { base: { shape: 'rect', background: '{vars.tileHi}' } },
        info: { base: { titleStyle: { fontWeight: 300 } } },
        transport: { base: { activeTint: '{vars.key}' } },
        lyrics: { base: { shadowElevation: 0, titleStyle: { fontWeight: 300 } } },
        optionTile: { base: { labelStyle: { fontWeight: 300 } } },
      },
    },
    playerQueue: {
      variants: {
        root: { base: { titleStyle: { fontWeight: 300 } } },
        row: {
          base: { thumbShape: 'rect', thumbBackground: '{vars.tileHi}' },
          states: { selected: { titleStyle: { color: '{vars.key}' } } },
        },
      },
    },
    trackList: {
      variants: {
        card: { base: { errorColor: '{tokens.color.danger}' } },
        row: {
          base: { artworkShape: 'rect' },
          states: {
            selected: { titleStyle: { color: '#ffffff' }, artistStyle: { color: '#ffffffd0' }, albumStyle: { color: '#ffffffd0' }, durationStyle: { color: '#ffffffd0' }, indexStyle: { color: '#ffffffd0' } },
            error: { titleStyle: { color: '{tokens.color.danger}' } },
          },
        },
      },
    },
    trackOptions: { base: { headerArtworkShape: 'rect', headerTitleStyle: { fontWeight: 300 } } },
    collectionHeader: { base: { artworkShape: 'rect', titleStyle: { fontWeight: 300 }, compactTitleStyle: { fontWeight: 300 } } },
    featuredCarousel: { base: { cardShape: 'rect', titleStyle: { fontWeight: 300 } } },
    emptyState: { base: { iconBoxShape: 'rect', iconBoxBackground: solid('{vars.tile}'), iconBoxBorderWidth: 0, iconBoxBorderColor: NONE, iconTint: '{vars.dim}', titleStyle: { fontWeight: 300 } } },
    errorDisplay: { base: { iconTint: '{vars.key}', titleStyle: { fontWeight: 300 } } },
    loginRequired: { base: { badgeShape: 'rect', badgeBackground: '{vars.key}', iconTint: '#ffffff', titleStyle: { fontWeight: 300 } } },
    section: { variants: { header: { base: { titleStyle: { fontWeight: 300 } } } } },
    connectBanner: {
      variants: {
        row: { base: { background: '{vars.key}', shape: 'rect', textStyle: { color: '#ffffff' }, chevronTint: '#ffffff' } },
      },
    },
    settingsRow: { variants: { root: { base: { titleStyle: { fontWeight: 400 } } } } },
    lyricsLine: {
      variants: {
        root: { states: { selected: { textStyle: { fontWeight: 300, color: '{vars.key}' } } } },
        immersive: { base: { shape: 'rect' } },
      },
    },
  }),
});
