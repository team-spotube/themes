// Brutal: raw black outlines, loud flat colour, heavy type, hard edges. Hover floods a control with the accent.
import { A, choice, defineTheme, flatComponents, merge, NONE, solid } from '@team-spotube/theme-tool';

const f = (c: string) => solid(c);


// The app's own components (mediaCard, players, lists, screens): outlined, flat, hover floods with the paint.
const head = { fontFamily: 'Archivo Black' };
const appComponents = {
  mediaCard: {
    variants: {
      root: {
        base: { shape: 'rect', borderColor: '{vars.line}', borderWidth: '{vars.w}', shadowElevation: 0, innerGlowColor: NONE, scale: 1 },
        states: {
          hovered: { highlightBackground: f('{vars.paint}') },
          focused: { highlightBackground: f('{vars.paint}'), borderWidth: 5 },
          pressed: { highlightBackground: f('{vars.paint}'), scale: 0.97 },
          error: { background: ['alpha', '#ff3b30', 0.25] },
        },
      },
      artwork: { base: { shape: 'rect' } },
      info: { base: { titleStyle: { ...head, fontSize: 13 } } },
    },
  },
  mediaListTile: {
    base: { shape: 'rect', titleStyle: { ...head, fontSize: 13 } },
    states: {
      hovered: { background: f('{vars.paint}'), titleForeground: '{vars.onPaint}', borderColor: '{vars.line}', borderWidth: '{vars.w}' },
      selected: { background: f('{vars.paint}'), titleForeground: '{vars.onPaint}', borderColor: '{vars.line}', borderWidth: '{vars.w}' },
      error: { borderColor: '#ff3b30', borderWidth: '{vars.w}' },
    },
  },
  mediaArtwork: { base: { shape: 'rect', borderColor: '{vars.line}', borderWidth: '{vars.w}', background: f('{vars.paper2}'), placeholderTint: '{vars.ink}' } },
  floatingPlayer: {
    variants: {
      root: { base: { background: f('{vars.paper}'), shape: 'rect', borderColor: '{vars.line}', borderWidth: '{vars.w}', shadowElevation: 0 } },
      artwork: { base: { shape: 'rect', background: '{vars.paper2}', placeholderTint: '{vars.ink}' } },
      info: { base: { titleStyle: { ...head, fontSize: 13 } } },
    },
  },
  largePlayer: {
    variants: {
      root: { base: { tint: ['alpha', '{vars.paper}', 0.94], blurRadius: 0 } },
      artwork: { base: { shape: 'rect' } },
      info: { base: { titleStyle: { ...head, fontSize: 14 } } },
      transport: { base: { activeTint: '{vars.ink}' } },
    },
  },
  expandedPlayer: {
    variants: {
      root: { base: { headerStyle: { ...head, fontSize: 13 } } },
      artwork: { base: { shape: 'rect' } },
      info: { base: { titleStyle: { ...head, fontSize: 20 } } },
      transport: { base: { activeTint: '{vars.ink}' } },
      lyrics: { base: { shadowElevation: 0, iconTint: '{vars.ink}', titleStyle: { ...head, fontSize: 13 } } },
      optionTile: { base: { iconTint: '{vars.ink}', labelStyle: { ...head, fontSize: 13 } } },
    },
  },
  playerQueue: {
    variants: {
      root: { base: { titleStyle: { ...head, fontSize: 14 } } },
      row: {
        base: { thumbShape: 'rect', handleTint: '{vars.ink}' },
        states: { selected: { thumbBackground: '{vars.paint}', titleStyle: { fontWeight: 700 } } },
      },
    },
  },
  trackList: {
    variants: {
      row: {
        base: { artworkShape: 'rect', titleStyle: { fontWeight: 700 } },
        states: {
          selected: { background: f('{vars.paint}'), selectedBackground: f('{vars.paint}'), titleStyle: { color: '{vars.onPaint}' } },
          error: { titleStyle: { color: '#ff3b30' } },
        },
      },
    },
  },
  trackOptions: { base: { labelStyle: { ...head, fontSize: 13 }, headerArtworkShape: 'rect', headerTitleStyle: { ...head, fontSize: 14 } } },
  collectionHeader: { base: { artworkShape: 'rect', collapsedArtworkShape: 'rect', ownerPlaceholderBackground: '{vars.paint}', ownerPlaceholderTint: '{vars.onPaint}' } },
  featuredCarousel: { base: { cardShape: 'rect', titleStyle: head } },
  emptyState: {
    base: { iconBoxShape: 'rect', iconBoxBackground: f('{vars.paint}'), iconBoxBorderColor: '{vars.line}', iconBoxBorderWidth: '{vars.w}', iconTint: '{vars.onPaint}', titleStyle: { ...head, fontSize: 16 } },
  },
  errorDisplay: { base: { iconTint: '#ff3b30', titleStyle: { ...head, fontSize: 16 } } },
  loginRequired: { base: { badgeShape: 'rect', badgeBackground: '{vars.paint}', iconTint: '{vars.onPaint}', titleStyle: { ...head, fontSize: 16 } } },
  section: { variants: { header: { base: { titleStyle: head } } } },
  lyricsLine: {
    variants: {
      root: { states: { selected: { textStyle: { ...head } } } },
      immersive: { base: { shape: 'rect' }, states: { selected: { textStyle: { ...head } } } },
    },
  },
  connectBanner: {
    variants: {
      row: { base: { shape: 'rect', background: '{vars.paint}', textStyle: { ...head, fontSize: 12, color: '{vars.onPaint}' }, chevronTint: '{vars.onPaint}' } },
      dot: { base: { color: '{vars.ink}', ringColor: '{vars.paint}' } },
    },
  },
  settingsRow: { variants: { root: { base: { titleStyle: { ...head, fontSize: 13 } } } } },
};

export default defineTheme({
  name: 'Brutal',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  updates: true,
  description: 'Thick black outlines, loud flat colour and heavy type with no softness anywhere. Hover floods controls with the accent.',
  iconPack: 'phosphor-bold',
  logo: 'logos/brutalist.svg',
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
    ...appComponents,
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
    // Millennium components the theme had left at the stock glossy look.
    autocomplete: {
      base: {
        panelBackground: f('{vars.paper}'), panelShape: 'rect', panelBorderColor: '{vars.line}', panelBorderWidth: 4, panelShadowElevation: 0, panelGlowColor: NONE, panelBottomRimColor: null, panelShadowColor: NONE,
        dividerColor: '{vars.line}', dividerSecondaryColor: NONE, itemShape: 'rect', itemForeground: '{vars.ink}', highlightedItemBackground: f('{vars.paint}'), highlightedItemForeground: '{vars.onPaint}',
        itemBorderColor: NONE, itemBorderWidth: 0, itemInnerGlowColor: NONE, itemInteractionOverlay: NONE, itemShadowElevation: 0, itemHoverScale: 1, itemPressedScale: 1, itemTextStyle: { fontWeight: 700 },
      },
      states: { hovered: { itemBackground: f('{vars.paint}'), itemForeground: '{vars.onPaint}' }, pressed: { itemBackground: f('{vars.ink}'), itemForeground: '{vars.paper}' } },
    },
    bottomSheet: {
      base: {
        background: f('{vars.paper}'), shape: 'rect', borderColor: '{vars.line}', borderWidth: 5, innerGlowColor: NONE, bottomRimColor: null, orbColor: null, overlayBrush: NONE, shadowElevation: 0, shadowColor: NONE,
        handleBrush: f('{vars.ink}'), handleColor: '{vars.ink}', handleShape: 'rect', handleSize: [48, 8],
      },
    },
    modalBottomSheet: {
      base: {
        background: f('{vars.paper}'), shape: 'rect', borderColor: '{vars.line}', borderWidth: 5, innerGlowColor: NONE, bottomRimColor: null, orbColor: null, overlayBrush: NONE, shadowElevation: 0, shadowColor: NONE,
        handleBrush: f('{vars.ink}'), handleColor: '{vars.ink}', handleShape: 'rect', handleSize: [48, 8], scrimColor: A('#11111180', '#000000b0'),
      },
    },
    drawer: {
      base: {
        background: f('{vars.paper}'), shape: 'rect', borderColor: '{vars.line}', borderWidth: 5, innerGlowColor: NONE, bottomRimColor: null, orbColor: null, overlayBrush: NONE, shadowElevation: 0, shadowColor: NONE,
        scrimColor: A('#11111180', '#000000b0'),
      },
    },
    tabGroup: {
      base: {
        listBackground: f('{vars.paper}'), listBorderColor: '{vars.line}', listBorderWidth: '{vars.w}', listShape: 'rect', listInnerGlowColor: NONE, listBottomRimColor: NONE, listInsetShadeColor: NONE, listShadowElevation: 0, listPadding: 0, listInnerSpacing: 0,
        tabShape: 'rect', unselectedTabBackground: f(NONE), unselectedTabForeground: '{vars.ink}', selectedTabBackground: f('{vars.paint}'), selectedTabItemBackground: f('{vars.paint}'), selectedTabForeground: '{vars.onPaint}',
        selectedTabBorderColor: '{vars.line}', selectedTabBottomRimColor: NONE, selectedTabOrbColor: null, selectedTabOverlayBrush: NONE, tabGlowColor: NONE, tabElevation: 0,
        tabHoverBackground: f('{vars.paper2}'), tabPressedBackground: f('{vars.ink}'), tabHoverScale: 1, tabPressedScale: 1, tabTextStyle: { fontFamily: 'Archivo Black', fontSize: 13 },
      },
    },
    loading: {
      base: {
        color: '{vars.ink}', fillBrush: f('{vars.paint}'), glossBrush: NONE, trackBackground: f('{vars.paper}'), trackBorderColor: '{vars.line}', trackBorderWidth: '{vars.w}', trackBottomRimColor: NONE, trackGlowColor: NONE,
        linearShape: 'rect', segmentShape: 'rect', segmentBackground: f('{vars.paper2}'), segmentBorderColor: '{vars.line}', skeletonBackground: f('{vars.paper2}'), skeletonShimmerColor: '{vars.paint}',
      },
    },
    avatar: {
      base: {
        background: f('{vars.paper2}'), shape: 'rect', borderColor: '{vars.line}', borderWidth: '{vars.w}', innerGlowColor: NONE, bottomRimColor: NONE, shadowElevation: 0, shadowColor: NONE,
        foreground: '{vars.onPaint}', initialsBackground: f('{vars.paint}'), textStyle: head, interactionOverlay: NONE, imageOverlay: NONE,
      },
    },
    radioGroup: {
      base: {
        indicatorSize: [22, 22], indicatorShape: 'rect', indicatorBackground: f('{vars.paper}'), selectedIndicatorBackground: f('{vars.paint}'), indicatorBorderColor: '{vars.line}', indicatorBorderWidth: '{vars.w}', indicatorBottomRimColor: NONE,
        indicatorElevation: 0, indicatorGlowColor: NONE, indicatorShadows: [NONE], dotColor: '{vars.ink}', dotShape: 'rect', indicatorInteractionOverlay: NONE, indicatorInteractionRim: NONE, indicatorHoverScale: 1, indicatorPressedScale: 1,
        labelColor: '{vars.ink}', selectedLabelColor: '{vars.ink}',
      },
    },
    triStateCheckbox: { base: { faceShape: 'rect', faceSize: [22, 22], faceBackground: f('{vars.paper}'), faceBorderColor: '{vars.line}', faceBorderWidth: '{vars.w}', selectedFaceBackground: f('{vars.paint}'), selectedFaceBorderColor: '{vars.line}', selectedFaceForeground: '{vars.onPaint}', indeterminateFaceBackground: f('{vars.paint}'), dashBrush: f('{vars.onPaint}') } },
    disclosure: {
      base: {
        background: f(NONE), headerBackground: f('{vars.paper}'), contentBackground: f('{vars.paper2}'), shape: 'rect', borderColor: '{vars.line}', borderWidth: '{vars.w}', innerGlowColor: NONE, bottomRimColor: NONE, shadowElevation: 0, shadows: [NONE],
        foreground: '{vars.ink}', chevronForeground: '{vars.ink}', titleStyle: head, headerInteractionOverlay: NONE, headerInteractionRim: NONE, headerPressedScale: 1,
      },
      states: { hovered: { headerBackground: f('{vars.paint}'), foreground: '{vars.onPaint}', chevronForeground: '{vars.onPaint}' } },
    },
    pullToRefresh: {
      base: {
        indicatorBackground: f('{vars.paper}'), indicatorBorderColor: '{vars.line}', indicatorBorderWidth: '{vars.w}', indicatorBottomRimColor: NONE, indicatorInnerGlowColor: NONE, indicatorShape: 'rect', indicatorShadowElevation: 0,
        indicatorProgressBackground: f('{vars.paint}'), indicatorTrackBackground: f('{vars.paper2}'),
      },
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
