// Pocket Synth: a palm-sized hardware sampler. Chunky keys that sit on the panel, a pale LCD and one loud key colour.
import { A, choice, defineTheme, flatComponents, merge, NONE, solid } from '@team-spotube/theme-tool';

const key = (top: string, bot: string) => ['linear', 180, top, bot];
const lcd = solid('{vars.lcd}');
const mono = { fontFamily: 'Space Mono' };


// The app's own components: cards are keycaps sitting on the panel, players and selected rows are the pale LCD.
const cap = key('{vars.capTop}', '{vars.capBot}');
const lcdText = { color: '{vars.lcdInk}', fontFamily: 'Space Mono' };
const lcdDim = { color: ['alpha', '{vars.lcdInk}', 0.65], fontFamily: 'Space Mono' };
// Millennium components the stock look would otherwise leave glossy.
const gaps = {
  autocomplete: {
    base: {
      panelBackground: solid('{vars.panel}'), panelShape: 8, panelBorderColor: '{vars.capEdge}', panelBorderWidth: 1, panelBottomRimColor: '{vars.seat}', panelShadowElevation: 14, panelShadowColor: '#00000060', itemShape: 4, itemForeground: '{vars.ink}',
      highlightedItemBackground: solid('{vars.key}'), highlightedItemForeground: '#ffffff', dividerColor: '{vars.capEdge}', itemTextStyle: { fontSize: 13 }, itemInteractionOverlay: solid(NONE),
    },
    states: { hovered: { itemBackground: solid('{vars.key}') }, pressed: { itemBackground: solid('{vars.keyDown}') } },
  },
  bottomSheet: { base: { background: solid('{vars.panel}'), shape: [10, 10, 0, 0], borderColor: '{vars.capEdge}', borderWidth: 1, innerGlowColor: '#ffffff60', bottomRimColor: '{vars.seat}', shadowElevation: 14, shadowColor: '#00000060', foreground: '{vars.ink}', handleColor: '{vars.capEdge}', handleShape: 'pill', orbColor: null } },
  modalBottomSheet: { base: { background: solid('{vars.panel}'), shape: [10, 10, 0, 0], borderColor: '{vars.capEdge}', borderWidth: 1, innerGlowColor: '#ffffff60', bottomRimColor: '{vars.seat}', shadowElevation: 14, shadowColor: '#00000060', foreground: '{vars.ink}', handleColor: '{vars.capEdge}', handleShape: 'pill', scrimColor: '#00000070', orbColor: null } },
  drawer: { base: { background: solid('{vars.panel}'), shape: [0, 10, 10, 0], borderColor: '{vars.capEdge}', borderWidth: 1, innerGlowColor: '#ffffff60', bottomRimColor: '{vars.seat}', shadowElevation: 18, shadowColor: '#00000070', foreground: '{vars.ink}', scrimColor: '#00000070', orbColor: null } },
  tabGroup: {
    base: {
      listBackground: solid('{vars.seat}'), listBorderColor: '{vars.capEdge}', listBorderWidth: 1, listShape: 6, listBottomRimColor: null, listInnerGlowColor: NONE, tabShape: 4, tabTextStyle: { ...mono, fontWeight: 700 }, unselectedTabForeground: '{vars.ink}',
      unselectedTabBackground: key('{vars.capTop}', '{vars.capBot}'), selectedTabBackground: lcd, selectedTabForeground: '{vars.lcdInk}', selectedTabBorderColor: '{vars.capEdge}', selectedTabBottomRimColor: null, selectedTabOrbColor: null, tabHoverBackground: key('{vars.capTop}', '{vars.capTop}'),
    },
  },
  loading: {
    base: {
      color: '{vars.key}', fillBrush: solid('{vars.key}'), trackBackground: solid('{vars.seat}'), trackBorderColor: NONE, linearShape: 3, linearHeight: 10, trackBottomRimColor: null,
      skeletonBackground: solid('{vars.panelLo}'), skeletonShimmerColor: '#ffffff60',
    },
  },
  avatar: { base: { shape: 4, background: lcd, foreground: '{vars.lcdInk}', borderColor: '{vars.capEdge}', borderWidth: 1, shadowElevation: 0, innerGlowColor: '#ffffff60', bottomRimColor: '{vars.seat}', initialsBackground: lcd, textStyle: { ...mono, fontWeight: 700 } } },
  radioGroup: {
    base: { indicatorBackground: lcd, indicatorBorderColor: '{vars.capEdge}', indicatorBorderWidth: 1, indicatorShape: 'pill', indicatorBottomRimColor: null, selectedIndicatorBackground: lcd, dotBrush: solid('{vars.lcdInk}') },
  },
  triStateCheckbox: {
    base: { faceShape: 3, faceSize: [18, 18], faceBackground: lcd, faceBorderColor: '{vars.capEdge}', faceBorderWidth: 1, selectedFaceBackground: lcd, indeterminateFaceBackground: lcd, selectedFaceBorderColor: '{vars.capEdge}', selectedFaceForeground: '{vars.lcdInk}', dashBrush: solid('{vars.lcdInk}') },
  },
  disclosure: {
    base: { background: solid('{vars.panelLo}'), borderColor: '{vars.capEdge}', borderWidth: 1, shape: 8, foreground: '{vars.ink}', chevronForeground: '{vars.dim}', headerBackground: key('{vars.capTop}', '{vars.capBot}'), innerGlowColor: '#ffffff60', bottomRimColor: '{vars.seat}', titleStyle: { ...mono, fontWeight: 700 } },
    states: { hovered: { headerBackground: key('{vars.capTop}', '{vars.capTop}') } },
  },
  pullToRefresh: { base: { indicatorBackground: lcd, indicatorBorderColor: '{vars.capEdge}', indicatorBorderWidth: 1, indicatorShape: 6, indicatorShadowElevation: 8, indicatorShadowColor: '#00000060', indicatorInnerGlowColor: '#ffffff60', indicatorBottomRimColor: '{vars.seat}', indicatorProgressBackground: solid('{vars.key}'), indicatorTrackBackground: solid('{vars.seat}') } },
};
const appComponents = {
  mediaCard: {
    variants: {
      root: {
        base: { shape: 6, background: cap, borderColor: '{vars.capEdge}', borderWidth: 1, innerGlowColor: '#ffffffa0', shadowElevation: 0, scaleMillis: 60, transitionMillis: 80 },
        states: {
          hovered: { highlightBackground: solid('{vars.wash}') },
          focused: { highlightBackground: solid('{vars.wash}'), borderColor: '{vars.key}', borderWidth: 2 },
          pressed: { background: key('{vars.capBot}', '{vars.capTop}'), highlightBackground: solid('{vars.wash}'), innerGlowColor: NONE, scale: 0.985 },
          error: { background: solid(['alpha', '{tokens.color.danger}', 0.18]), borderColor: '{tokens.color.danger}' },
        },
      },
      artwork: { base: { shape: 4 } },
      info: { base: { titleStyle: { ...mono, fontWeight: 700, fontSize: 13 }, subtitleStyle: { ...mono, fontSize: 11 } } },
    },
  },
  mediaListTile: {
    base: { shape: 6, borderColor: NONE, borderWidth: 1, titleStyle: { ...mono, fontWeight: 700 }, subtitleStyle: { ...mono } },
    states: {
      selected: { background: lcd, borderColor: '{vars.seat}', titleForeground: '{vars.lcdInk}' },
      error: { borderColor: '{tokens.color.danger}' },
    },
  },
  mediaArtwork: { base: { shape: 4, borderColor: '{vars.seat}', background: lcd, placeholderTint: '{vars.lcdInk}' } },
  floatingPlayer: {
    variants: {
      root: { base: { background: lcd, shape: [10, 10, 0, 0], borderColor: '{vars.seat}', borderWidth: 2, progressHeight: 4 } },
      artwork: { base: { shape: 4, background: ['alpha', '{vars.lcdInk}', 0.14], placeholderTint: '{vars.lcdInk}' } },
      info: { base: { titleStyle: { ...lcdText, fontWeight: 700 }, subtitleStyle: { ...lcdDim } } },
    },
  },
  largePlayer: {
    variants: {
      root: { base: { tint: ['alpha', '{vars.panel}', 0.92], blurRadius: 0 } },
      artwork: { base: { shape: 6 } },
      info: { base: { titleStyle: { ...mono, fontWeight: 700 } } },
      transport: { base: { activeTint: '{vars.key}', timeStyle: { ...mono } } },
    },
  },
  expandedPlayer: {
    variants: {
      root: { base: { headerStyle: { ...mono, fontWeight: 700 } } },
      artwork: { base: { shape: 8 } },
      info: { base: { titleStyle: { ...mono, fontWeight: 700 } } },
      transport: { base: { activeTint: '{vars.key}', timeStyle: { ...mono } } },
      lyrics: { base: { shadowElevation: 0, titleStyle: { ...mono, fontWeight: 700 }, iconTint: '{vars.key}' } },
      optionTile: { base: { iconTint: '{vars.key}', labelStyle: { ...mono } } },
    },
  },
  playerQueue: {
    variants: {
      root: { base: { titleStyle: { ...mono, fontWeight: 700 } } },
      row: {
        base: { thumbShape: 4, thumbBackground: '{vars.lcd}', handleTint: '{vars.dim}', thumbIndexStyle: { ...lcdText } },
        states: { selected: { titleStyle: { color: '{vars.key}', fontWeight: 700 } } },
      },
    },
  },
  trackList: {
    variants: {
      row: {
        base: { selectedBackground: lcd, artworkShape: 4 },
        states: {
          selected: { titleStyle: { ...lcdText, fontWeight: 700 }, indexStyle: { ...lcdText }, artistStyle: { ...lcdDim }, albumStyle: { ...lcdDim }, durationStyle: { ...lcdDim }, artistSeparatorStyle: { ...lcdDim } },
          error: { titleStyle: { color: '{tokens.color.danger}' } },
        },
      },
    },
  },
  trackOptions: { base: { headerArtworkShape: 4, headerTitleStyle: { ...mono, fontWeight: 700 } } },
  collectionHeader: { base: { artworkShape: 8, collapsedArtworkShape: 4, titleStyle: { ...mono, fontWeight: 700 }, compactTitleStyle: { ...mono, fontWeight: 700 }, collapsedTitleStyle: { ...mono, fontWeight: 700 } } },
  featuredCarousel: { base: { cardShape: 10, titleStyle: { ...mono, fontWeight: 700 }, buttonTint: '{vars.key}' } },
  emptyState: { base: { iconBoxShape: 6, iconBoxBackground: lcd, iconBoxBorderColor: '{vars.seat}', iconBoxBorderWidth: 2, iconTint: '{vars.lcdInk}', titleStyle: { ...mono, fontWeight: 700 } } },
  errorDisplay: { base: { iconTint: '{tokens.color.danger}', titleStyle: { ...mono, fontWeight: 700 } } },
  loginRequired: { base: { badgeShape: 6, badgeBackground: '{vars.lcd}', iconTint: '{vars.lcdInk}', titleStyle: { ...mono, fontWeight: 700 } } },
  section: { variants: { header: { base: { titleStyle: { ...mono, fontWeight: 700 } } } } },
  connectBanner: { variants: { row: { base: { background: '{vars.lcd}', shape: 6, textStyle: { ...lcdText } , chevronTint: '{vars.lcdInk}' } }, dot: { base: { color: '{vars.key}' } } } },
  settingsRow: { variants: { root: { base: { titleStyle: { ...mono, fontWeight: 700 } } } } },
  lyricsLine: {
    variants: {
      root: { states: { selected: { textStyle: { color: '{vars.key}', fontWeight: 700 } } } },
      immersive: { states: { selected: { textStyle: { color: '{vars.key}', fontWeight: 700 } } } },
    },
  },
};

export default defineTheme({
  name: 'Pocket Synth',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  updates: true,
  description: 'A palm-sized hardware sampler: chunky keys that sit on the panel, a pale LCD and one loud key colour.',
  iconPack: 'phosphor-fill',
  logo: 'logos/pocket-synth.svg',
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
  components: merge(merge(merge(flatComponents(), {
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
  }), appComponents), gaps),
});
