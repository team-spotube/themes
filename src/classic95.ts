// Classic: a 1990s desktop. Square grey bevelled controls, navy title bars and menu highlights, a pixel-sharp sans.
import { A, choice, defineTheme, NONE, solid } from '@team-spotube/theme-tool';

const bevel = (face: string) => ({ background: solid(face), borderWidth: 1, borderColor: '{vars.frame}', innerGlowColor: '{vars.lit}', bottomRimColor: '{vars.shade}' });
const sunk = (face: string) => ({ background: solid(face), borderWidth: 1, borderColor: '{vars.frame}', innerGlowColor: NONE, bottomRimColor: null });
const flat = { shadows: [NONE], shadowElevation: 0, interactionOverlay: NONE, interactionRim: NONE, motion: { hoverScale: 1, pressedScale: 1 } };

export default defineTheme({
  name: 'Classic',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  updates: true,
  description: 'A 1990s desktop: square grey bevels, navy title bars and menu highlights, and no animation to speak of.',
  iconPack: 'fluent-filled',
  logo: 'logos/classic95.svg',
  fonts: { 'Liberation Sans': { dir: 'liberation-sans', files: [['LiberationSans-Regular.ttf', 400], ['LiberationSans-Bold.ttf', 700]] } },
  parameters: {
    desktop: choice('Highlight', 'navy', [
      ['navy', 'Navy', '#000080'], ['teal', 'Teal', '#008080'], ['maroon', 'Maroon', '#800000'], ['olive', 'Olive', '#808000'],
    ]),
    density: { type: 'enum', label: 'Row size', default: 'normal', options: [{ value: 'compact', label: 'Compact' }, { value: 'normal', label: 'Normal' }] },
  },
  vars: {
    none: { type: 'color', default: NONE },
    face: { type: 'color', value: A('#c0c0c0', '#3c3c3c') },
    faceDown: { type: 'color', value: A('#b0b0b0', '#303030') },
    field: { type: 'color', value: A('#ffffff', '#1a1a1a') },
    ink: { type: 'color', value: A('#000000', '#e8e8e8') },
    inkOff: { type: 'color', value: A('#808080', '#808080') },
    lit: { type: 'color', value: A('#ffffff', '#6a6a6a') },
    shade: { type: 'color', value: A('#808080', '#141414') },
    bad: { type: 'color', value: A('#c00000', '#ff6a6a') },
    frame: { type: 'color', value: A('#404040', '#000000') },
    hi: { type: 'color', value: ['match', '{params.desktop}', { navy: '#000080', teal: '#008080', maroon: '#800000', olive: '#6b6b00' }] },
    hiEdge: { type: 'color', value: ['match', '{params.desktop}', { navy: '#1084d0', teal: '#30c0c0', maroon: '#c04040', olive: '#b0b000' }] },
    rowH: { type: 'number', value: ['match', '{params.density}', { compact: 28, normal: 36 }] },
  },
  tokens: {
    color: {
      background: '{vars.face}', surface: '{vars.face}', raised: '{vars.face}', inset: '{vars.field}', text: '{vars.ink}', muted: '{vars.inkOff}',
      border: '{vars.frame}', highlight: '{vars.lit}', accent: '{vars.hi}', accentTop: '{vars.hiEdge}', accentBottom: '{vars.hi}', onAccent: '#ffffff',
      success: '#008000', danger: '{vars.bad}', scrim: '#00000040',
    },
    shape: { small: 0, medium: 0, large: 0 },
    type: { family: 'Liberation Sans' },
    interaction: { lighting: false },
    app: { background: solid('{vars.face}'), panel: solid('{vars.face}'), bevel: solid('{vars.face}') },
  },
  defaults: { shape: 'rect' },
  components: {
    button: {
      base: { ...bevel('{vars.face}'), ...flat, labelShadow: false, shape: 'rect', foreground: '{vars.ink}', textStyle: { fontWeight: 400 }, padding: [14, 6] },
      states: {
        pressed: { ...sunk('{vars.faceDown}'), innerGlowColor: NONE },
        focused: { borderColor: '{vars.ink}', borderWidth: 2 },
        disabled: { foreground: '{vars.inkOff}' },
      },
      variants: {
        primary: { base: { borderColor: '{vars.ink}', borderWidth: 2, textStyle: { fontWeight: 700 } } },
        secondary: {},
        quiet: { base: { background: solid(NONE), borderColor: NONE, innerGlowColor: NONE, bottomRimColor: null }, states: { hovered: { ...bevel('{vars.face}') } } },
        danger: { base: { foreground: '{vars.bad}', textStyle: { fontWeight: 700 } } },
      },
    },
    iconButton: {
      base: { ...bevel('{vars.face}'), ...flat, orb: false, shape: 'rect', foreground: '{vars.ink}', iconSize: 16 },
      states: { pressed: sunk('{vars.faceDown}') },
      variants: {
        primary: { base: { borderColor: '{vars.ink}', borderWidth: 2 } },
        secondary: {},
        quiet: { base: { background: solid(NONE), borderColor: NONE, innerGlowColor: NONE, bottomRimColor: null }, states: { hovered: { ...bevel('{vars.face}') } } },
        danger: { base: { foreground: '{vars.bad}' } },
      },
    },
    toggleSwitch: {
      base: {
        trackSize: [40, 20], trackShape: 'rect', thumbShape: 'rect',
        trackBackground: solid('{vars.field}'), selectedTrackBackground: solid('{vars.hi}'), trackBorderColor: '{vars.frame}', trackGlowColor: NONE, trackBottomRimColor: null,
        thumbBackground: solid('{vars.face}'), thumbBorderColor: '{vars.frame}', thumbGlowColor: '{vars.lit}', thumbBottomRimColor: '{vars.shade}', thumbElevation: 0,
        trackInteractionOverlay: NONE, thumbInteractionOverlay: NONE, thumbHoverScaleX: 1, thumbHoverScaleY: 1, thumbPressedScaleX: 1, thumbPressedScaleY: 1,
      },
    },
    checkbox: {
      base: {
        faceShape: 'rect', faceSize: [16, 16], faceBackground: solid('{vars.field}'), faceBorderColor: '{vars.frame}', faceBorderWidth: 1,
        selectedFaceBackground: solid('{vars.field}'), selectedFaceBorderColor: '{vars.frame}', selectedFaceForeground: '{vars.ink}',
        faceGlowColor: NONE, selectedFaceGlowColor: NONE, faceElevation: 0, faceBottomRimColor: '{vars.lit}', faceInteractionOverlay: NONE, faceHoverScale: 1, facePressedScale: 1,
      },
    },
    slider: {
      base: {
        trackBackground: solid('{vars.field}'), trackBorderColor: '{vars.frame}', trackInsetShadeColor: '{vars.shade}', trackShape: 'rect', trackBottomRimColor: '{vars.lit}',
        activeTrackBackground: solid('{vars.hi}'), activeTrackShape: 'rect', activeTrackGlowColor: NONE,
        thumbBackground: solid('{vars.face}'), thumbBorderColor: '{vars.frame}', thumbBorderWidth: 1, thumbShape: 'rect', thumbGlowColor: '{vars.lit}', thumbBottomRimColor: '{vars.shade}', thumbElevation: 0,
        trackInteractionOverlay: NONE, thumbInteractionOverlay: NONE,
      },
    },
    progress: {
      base: {
        shape: 'rect', height: 18, trackBackground: solid('{vars.field}'), borderColor: '{vars.frame}', borderWidth: 1, trackBottomRimColor: '{vars.lit}',
        progressBackground: solid('{vars.hi}'), progressShape: 'rect', progressInnerGlowColor: NONE, progressBottomRimColor: null,
      },
    },
    textField: {
      base: { ...sunk('{vars.field}'), insetShadeColor: '{vars.shade}', shape: 'rect', cursorColor: '{vars.ink}', interactionOverlay: NONE, placeholderColor: '{vars.inkOff}', labelColor: '{vars.ink}' },
      states: { focused: { borderColor: '{vars.ink}' } },
    },
    card: { base: { ...bevel('{vars.face}'), shape: 'rect', shadowElevation: 0, interactionOverlay: NONE, insetShadeColor: NONE } },
    listTile: {
      base: {
        shape: 'rect', minimumHeight: '{vars.rowH}', background: solid(NONE), selectedBackground: solid('{vars.hi}'), borderWidth: 0, shadowElevation: 0,
        titleForeground: '{vars.ink}', subtitleForeground: '{vars.inkOff}', selectedTitleForeground: '#ffffff', selectedSubtitleForeground: '#ffffffc0', interactionOverlay: NONE,
      },
      states: { hovered: { background: solid('{vars.hi}'), titleForeground: '#ffffff', subtitleForeground: '#ffffffc0' } },
    },
    separator: { base: { color: '{vars.shade}', highlightColor: '{vars.lit}', thickness: 1 } },
    dialog: {
      base: {
        shape: 'rect', panelBackground: solid('{vars.face}'), panelBorderColor: '{vars.frame}', panelBorderWidth: 2, panelGlowColor: '{vars.lit}', panelBottomRimColor: '{vars.shade}',
        panelShadowElevation: 0, enterScale: 1, exitScale: 1,
        titleBarBackground: ['linear', 0, '{vars.hi}', '{vars.hiEdge}'], titleBarForeground: '#ffffff', titleStyle: { fontWeight: 700 }, titleBarBorderColor: NONE, titleBarDividerThickness: 0,
        footerBackground: solid('{vars.face}'), footerBorderColor: NONE, footerDividerThickness: 0, scrimColor: '#00000040',
        closeCapBackground: solid('{vars.face}'), closeCapForeground: '{vars.ink}', closeCapBorderColor: '{vars.frame}', closeCapBorderWidth: 1, closeCapShape: 'rect', closeCapGlowColor: '{vars.lit}',
        closeCapElevation: 0, closeCapRaisedElevation: 0, closeCapPressedElevation: 0, closeCapTint: NONE, closeScaleHover: 1, closeScalePressed: 1,
      },
      states: { pressed: { closeCapBackground: solid('{vars.faceDown}'), closeCapGlowColor: NONE } },
    },
    dropdownMenu: {
      base: {
        panelBackground: solid('{vars.face}'), panelShape: 'rect', panelBorderColor: '{vars.frame}', panelBorderWidth: 1, panelGlowColor: '{vars.lit}', panelBottomRimColor: '{vars.shade}', panelShadowElevation: 0,
        itemShape: 'rect', itemForeground: '{vars.ink}', itemActiveBackground: solid('{vars.hi}'), itemSelectedBackground: solid('{vars.hi}'), itemActiveForeground: '#ffffff', itemActiveElevation: 0,
        itemHoverScale: 1, itemPressedScale: 1, itemMutedForeground: '{vars.inkOff}', itemIconTint: '{vars.ink}', itemBorderColor: NONE, itemBorderWidth: 0, itemGlowColor: NONE,
        itemActiveBorderColor: NONE, itemOrbColor: null, itemBottomRimColor: null, itemShadowColor: NONE, itemOverlayBrush: NONE, separatorBrush: '{vars.shade}', separatorThickness: 1,
        enterScale: 1, exitScale: 1, groupLabelForeground: '{vars.inkOff}',
      },
      states: { hovered: { itemBackground: solid('{vars.hi}'), itemIconTint: '#ffffff' }, focused: { itemBackground: solid('{vars.hi}'), itemIconTint: '#ffffff' }, pressed: { itemBackground: solid('{vars.hi}'), itemIconTint: '#ffffff' } },
    },
    autocomplete: {
      base: {
        panelBackground: solid('{vars.face}'), panelShape: 'rect', panelBorderColor: '{vars.frame}', panelBorderWidth: 1, panelGlowColor: '{vars.lit}', panelBottomRimColor: '{vars.shade}', panelShadowElevation: 0, panelShadowColor: NONE,
        itemBackground: solid(NONE), itemShape: 'rect', itemForeground: '{vars.ink}', highlightedItemBackground: solid('{vars.hi}'), highlightedItemForeground: '#ffffff', itemBorderColor: NONE, itemBorderWidth: 0,
        itemInnerGlowColor: NONE, itemInteractionOverlay: NONE, itemShadowElevation: 0, itemHoverScale: 1, itemPressedScale: 1, dividerColor: '{vars.shade}', dividerSecondaryColor: '{vars.lit}',
      },
    },
    bottomSheet: { base: { ...bevel('{vars.face}'), borderWidth: 2, shape: 'rect', shadowElevation: 0, orbColor: null, overlayBrush: NONE, handleColor: '{vars.shade}', handleShape: 'rect' } },
    modalBottomSheet: { base: { ...bevel('{vars.face}'), borderWidth: 2, shape: 'rect', shadowElevation: 0, orbColor: null, overlayBrush: NONE, handleColor: '{vars.shade}', handleShape: 'rect', scrimColor: '#00000040' } },
    drawer: { base: { ...bevel('{vars.face}'), borderWidth: 2, shape: 'rect', shadowElevation: 0, orbColor: null, overlayBrush: NONE, scrimColor: '#00000040' } },
    tabGroup: {
      base: {
        listBackground: solid('{vars.faceDown}'), listBorderColor: '{vars.frame}', listBorderWidth: 1, listBottomRimColor: '{vars.lit}', listInnerGlowColor: NONE, listInsetShadeColor: NONE, listShadowElevation: 0, listShape: 'rect',
        tabShape: 'rect', tabElevation: 0, tabGlowColor: NONE, tabHoverScale: 1, tabPressedScale: 1, tabHoverBackground: solid('{vars.face}'), tabPressedBackground: solid('{vars.faceDown}'),
        unselectedTabBackground: solid(NONE), unselectedTabForeground: '{vars.ink}', selectedTabBackground: solid('{vars.face}'), selectedTabItemBackground: solid('{vars.face}'), selectedTabForeground: '{vars.ink}',
        selectedTabBorderColor: '{vars.frame}', selectedTabBottomRimColor: '{vars.shade}', selectedTabOrbColor: null, selectedTabOverlayBrush: NONE, tabTextStyle: { fontWeight: 400 },
      },
    },
    loading: {
      base: {
        color: '{vars.hi}', fillBrush: solid('{vars.hi}'), glossBrush: solid(NONE), trackBackground: solid('{vars.field}'), trackBorderColor: '{vars.frame}', trackBorderWidth: 1, trackBottomRimColor: '{vars.lit}', trackGlowColor: NONE,
        bufferedBrush: solid('{vars.shade}'), linearShape: 'rect', segmentShape: 'rect', skeletonBackground: solid('{vars.faceDown}'), skeletonShimmerColor: '{vars.lit}',
      },
    },
    avatar: { base: { shape: 'rect', background: solid('{vars.face}'), initialsBackground: solid('{vars.face}'), foreground: '{vars.ink}', borderColor: '{vars.frame}', borderWidth: 1, shadowElevation: 0, innerGlowColor: '{vars.lit}', bottomRimColor: '{vars.shade}', imageOverlay: solid(NONE), interactionOverlay: solid(NONE) } },
    radioGroup: {
      base: {
        indicatorShape: 'pill', indicatorBackground: solid('{vars.field}'), selectedIndicatorBackground: solid('{vars.field}'), indicatorBorderColor: '{vars.frame}', indicatorBorderWidth: 1, indicatorGlowColor: NONE, indicatorBottomRimColor: '{vars.lit}',
        indicatorElevation: 0, indicatorHoverScale: 1, indicatorPressedScale: 1, indicatorInteractionOverlay: solid(NONE), indicatorInteractionRim: solid(NONE), dotColor: '{vars.ink}', dotBrush: solid('{vars.ink}'), labelColor: '{vars.ink}', selectedLabelColor: '{vars.ink}',
      },
    },
    triStateCheckbox: {
      base: {
        faceShape: 'rect', faceSize: [16, 16], faceBackground: solid('{vars.field}'), faceBorderColor: '{vars.frame}', faceBorderWidth: 1, selectedFaceBackground: solid('{vars.field}'), indeterminateFaceBackground: solid('{vars.field}'), selectedFaceBorderColor: '{vars.frame}',
        selectedFaceForeground: '{vars.ink}', dashBrush: solid('{vars.ink}'), dashShape: 'rect', faceGlowColor: NONE, selectedFaceGlowColor: NONE, faceElevation: 0, faceBottomRimColor: '{vars.lit}', faceInteractionOverlay: solid(NONE), faceHoverScale: 1, facePressedScale: 1,
      },
    },
    disclosure: {
      base: {
        ...bevel('{vars.face}'), shape: 'rect', shadowElevation: 0, shadows: [NONE], headerBackground: solid(NONE), headerInteractionOverlay: solid(NONE), headerInteractionRim: solid(NONE), headerPressedScale: 1,
        chevronForeground: '{vars.ink}', foreground: '{vars.ink}', contentBackground: solid('{vars.field}'),
      },
    },
    pullToRefresh: {
      base: {
        indicatorBackground: solid('{vars.face}'), indicatorBorderColor: '{vars.frame}', indicatorBorderWidth: 1, indicatorBottomRimColor: '{vars.shade}', indicatorInnerGlowColor: '{vars.lit}', indicatorShadowElevation: 0, indicatorShape: 'rect',
        indicatorProgressBackground: solid('{vars.hi}'), indicatorTrackBackground: solid('{vars.field}'), indicatorEnterScale: 1, indicatorExitScale: 1,
      },
    },
    tooltip: { base: { background: solid('#ffffe1'), foreground: '#000000', shape: 'rect', borderColor: '#000000', borderWidth: 1, shadowElevation: 0 } },
    segmentedButton: {
      base: { ...bevel('{vars.face}'), ...flat, foreground: '{vars.ink}' },
      states: { selected: { ...sunk('{vars.faceDown}') }, pressed: { ...sunk('{vars.faceDown}') } },
    },
    scrollbar: {
      base: { trackBackground: solid('{vars.faceDown}'), thumbBackground: solid('{vars.face}'), thumbBorderColor: '{vars.frame}', thumbInnerGlowColor: '{vars.lit}', thumbBottomRimColor: '{vars.shade}', thumbInteractionOverlay: NONE },
    },
    snackbar: { base: { background: solid('{vars.face}'), foreground: '{vars.ink}', borderColor: '{vars.frame}', borderWidth: 2, shape: 'rect', shadowElevation: 0 } },
    topAppBar: { base: { background: solid('{vars.face}'), separatorColor: '{vars.shade}' } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: solid('{vars.face}'), shape: 'rect', borderWidth: 0, shadowElevation: 0, innerGlowColor: '{vars.lit}', bottomRimColor: null, overlayBrush: NONE, itemSpacing: 2, minimumHeight: 56 } },
        item: {
          base: { background: solid(NONE), foreground: '{vars.ink}', shape: 'rect', iconSize: 20, borderWidth: 1, borderColor: NONE, shadowElevation: 0, innerGlowColor: NONE, bottomRimColor: null, orbColor: null, overlayBrush: NONE, hoverScale: 1, pressedScale: 1, labelStyle: { fontSize: 11 } },
          states: {
            hovered: { ...bevel('{vars.face}') },
            pressed: { ...sunk('{vars.faceDown}') },
            selected: { ...sunk('{vars.faceDown}'), labelStyle: { fontWeight: 700 } },
          },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: solid('{vars.face}'), foreground: '{vars.ink}', shape: 'rect', borderWidth: 0, shadowElevation: 0, innerGlowColor: NONE, bottomRimColor: null, overlayBrush: ['linear', 90, [NONE, 0], [NONE, 0.99], ['{vars.frame}', 0.99], ['{vars.frame}', 1]] } },
        header: { base: { background: solid(NONE), dividerColor: '{vars.shade}', dividerHighlightColor: '{vars.lit}', dividerWidth: 1 } },
        footer: { base: { background: solid(NONE), dividerColor: '{vars.shade}', dividerHighlightColor: '{vars.lit}', dividerWidth: 1 } },
        group: { base: { labelForeground: '{vars.inkOff}', labelShape: 'rect', labelHoveredBackground: solid('{vars.face}'), labelBorderWidth: 0, labelInnerGlowColor: NONE, labelOverlayBrush: NONE, separatorBrush: '{vars.shade}' } },
        item: {
          base: {
            background: solid(NONE), foreground: '{vars.ink}', iconTint: '{vars.ink}', iconSize: 16, shape: 'rect', borderWidth: 0, shadowElevation: 0, innerGlowColor: NONE, bottomRimColor: null, orbColor: null,
            overlayBrush: NONE, hoverScale: 1, pressedScale: 1, selectedIndicatorColor: NONE, selectedIndicatorBrush: NONE, selectedIndicatorWidth: 0,
            hoverBackground: solid('{vars.hi}'), focusBackground: solid('{vars.hi}'), pressedBackground: solid('{vars.hi}'), selectedBackground: solid('{vars.hi}'),
          },
          states: {
            hovered: { background: solid('{vars.hi}'), foreground: '#ffffff', iconTint: '#ffffff' },
            pressed: { background: solid('{vars.hi}'), foreground: '#ffffff', iconTint: '#ffffff' },
            focused: { background: solid('{vars.hi}'), foreground: '#ffffff', iconTint: '#ffffff' },
            selected: { background: solid('{vars.hi}'), foreground: '#ffffff', iconTint: '#ffffff', labelStyle: { fontWeight: 700 } },
          },
        },
      },
    },

    // ---- the app's own components (theme format 1.3): bevelled grey panels, navy selection, square everything ----
    mediaCard: {
      variants: {
        root: {
          base: { shape: 'rect', background: solid('{vars.face}'), highlightBackground: null, borderColor: '{vars.frame}', borderWidth: 1, innerGlowColor: '{vars.lit}', shadowElevation: 0, scale: 1, transitionMillis: 0, scaleMillis: 0 },
          states: {
            focused: { borderColor: '{vars.ink}', borderWidth: 2 },
            pressed: { background: solid('{vars.faceDown}'), innerGlowColor: NONE },
            error: { background: solid(['alpha', '{vars.bad}', 0.25]) },
          },
        },
        artwork: { base: { shape: 'rect' } },
        info: { base: { padding: 8, spacing: 2, titleStyle: { fontWeight: 700 } } },
      },
    },
    mediaListTile: {
      base: { shape: 'rect', borderWidth: 0, borderColor: NONE },
      states: { selected: { background: solid('{vars.hi}'), titleForeground: '#ffffff', subtitleStyle: { color: '#ffffffc0' } }, error: { titleForeground: '{vars.bad}' } },
    },
    mediaArtwork: { base: { shape: 'rect', background: solid('{vars.field}'), borderColor: '{vars.frame}', borderWidth: 1, placeholderTint: '{vars.inkOff}' } },
    floatingPlayer: {
      variants: {
        root: { base: { background: solid('{vars.face}'), shape: 'rect', borderColor: '{vars.frame}', borderWidth: 1, shadowElevation: 0 } },
        artwork: { base: { shape: 'rect', background: '{vars.field}', placeholderTint: '{vars.inkOff}' } },
        info: { base: { titleStyle: { fontWeight: 700, color: '{vars.ink}' }, subtitleStyle: { color: '{vars.inkOff}' } } },
      },
    },
    largePlayer: {
      variants: {
        root: { base: { tint: ['alpha', '{vars.face}', 0.96], blurRadius: 0 } },
        artwork: { base: { shape: 'rect', background: '{vars.field}' } },
        info: { base: { titleStyle: { fontWeight: 700 } } },
        transport: { base: { activeTint: '{vars.hi}', inactiveTint: '{vars.inkOff}' } },
      },
    },
    expandedPlayer: {
      variants: {
        root: { base: { headerStyle: { fontWeight: 700 } } },
        artwork: { base: { shape: 'rect', background: '{vars.field}' } },
        info: { base: { titleStyle: { fontWeight: 700 } } },
        transport: { base: { activeTint: '{vars.hi}', inactiveTint: '{vars.inkOff}' } },
        lyrics: { base: { shadowElevation: 0, titleStyle: { fontWeight: 700 }, iconTint: '{vars.ink}' } },
        optionTile: { base: { iconTint: '{vars.ink}' } },
      },
    },
    playerQueue: {
      variants: {
        root: { base: { titleStyle: { fontWeight: 700 } } },
        row: {
          base: { thumbShape: 'rect', thumbBackground: '{vars.field}', handleTint: '{vars.inkOff}' },
          states: { selected: { titleStyle: { fontWeight: 700, color: '{vars.hi}' } } },
        },
      },
    },
    trackList: {
      variants: {
        card: { base: { errorColor: '{vars.bad}' } },
        row: {
          base: { artworkShape: 'rect' },
          states: {
            selected: {
              titleStyle: { color: '#ffffff' }, artistStyle: { color: '#ffffffc0' }, artistSeparatorStyle: { color: '#ffffffc0' },
              albumStyle: { color: '#ffffffc0' }, durationStyle: { color: '#ffffffc0' }, indexStyle: { color: '#ffffffc0' },
            },
            error: { titleStyle: { color: '{vars.bad}' } },
          },
        },
      },
    },
    trackOptions: { base: { headerArtworkShape: 'rect', headerTitleStyle: { fontWeight: 700 } } },
    collectionHeader: { base: { artworkShape: 'rect', titleStyle: { fontWeight: 700 }, compactTitleStyle: { fontWeight: 700 } } },
    featuredCarousel: { base: { cardShape: 'rect', buttonBlur: 0, titleStyle: { fontWeight: 700 } } },
    emptyState: { base: { iconBoxShape: 'rect', iconBoxBackground: solid('{vars.face}'), iconBoxBorderColor: '{vars.frame}', iconBoxBorderWidth: 1, iconTint: '{vars.ink}', titleStyle: { fontWeight: 700 } } },
    errorDisplay: { base: { iconTint: '{vars.bad}', titleStyle: { fontWeight: 700 } } },
    loginRequired: { base: { badgeShape: 'rect', badgeBackground: '{vars.hi}', iconTint: '#ffffff', titleStyle: { fontWeight: 700 } } },
    section: { variants: { header: { base: { titleStyle: { fontWeight: 700 } } } } },
    connectBanner: {
      variants: {
        row: { base: { background: '{vars.hi}', shape: 'rect', textStyle: { color: '#ffffff' }, chevronTint: '#ffffff' } },
      },
    },
    settingsRow: { variants: { root: { base: { titleStyle: { fontWeight: 700 } } } } },
    lyricsLine: {
      variants: {
        root: { states: { selected: { textStyle: { fontWeight: 700, color: '{vars.hi}' } } } },
        immersive: { base: { shape: 'rect' } },
      },
    },
  },
});
