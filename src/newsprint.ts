// Newsprint: the Sunday paper. Ink on cream (or a night edition), serif type, hairline rules and square corners.
import { A, choice, defineTheme, flatComponents, merge, NONE, solid } from '@team-spotube/theme-tool';

const paper = (c: unknown) => solid(c);
const rule = { borderWidth: 1, borderColor: '{vars.ink}' };

export default defineTheme({
  name: 'Newsprint',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  updates: true,
  description: 'The Sunday paper: ink on cream (or a night edition), serif headlines, hairline rules and square corners.',
  iconPack: 'phosphor-thin',
  logo: 'logos/newsprint.svg',
  fonts: {
    'DM Serif Display': { dir: 'dmserifdisplay', files: [['DMSerifDisplay-Regular.ttf', 400]] },
    Caladea: { dir: 'caladea', files: [['Caladea-Regular.ttf', 400], ['Caladea-Bold.ttf', 700], ['Caladea-Italic.ttf', 400, 'italic']] },
  },
  parameters: {
    ink: choice('Ink', 'black', [['black', 'Black', '#1a1a1a'], ['red', 'Red', '#b3261e'], ['blue', 'Blue', '#1d3f8a'], ['green', 'Green', '#1f5a3a']]),
  },
  vars: {
    none: { type: 'color', default: NONE },
    ink: { type: 'color', value: A('#1b1a17', '#ece6d6') },
    spot: { type: 'color', value: ['match', '{params.ink}', { black: A('#1a1a1a', '#ece6d6'), red: A('#b3261e', '#ff8a7a'), blue: A('#1d3f8a', '#9db8ff'), green: A('#1f5a3a', '#8fd6a8') }] },
    onSpot: { type: 'color', value: A('#f4efe3', '#1c1a17') },
    paper: { type: 'color', value: A('#f4efe3', '#1c1a17') },
    paper2: { type: 'color', value: A('#ebe4d2', '#26231f') },
    paper3: { type: 'color', value: A('#e0d8c2', '#312d28') },
    dim: { type: 'color', value: A('#6a6354', '#a39b88') },
    tint: { type: 'color', value: ['alpha', '{vars.spot}', 0.1] },
  },
  tokens: {
    color: {
      background: '{vars.paper}', surface: '{vars.paper2}', raised: '{vars.paper3}', inset: '{vars.paper2}', text: '{vars.ink}', muted: '{vars.dim}', border: '{vars.ink}', highlight: NONE,
      accent: '{vars.spot}', accentTop: '{vars.spot}', accentBottom: '{vars.spot}', onAccent: '{vars.onSpot}', success: A('#1f5a3a', '#8fd6a8'), danger: A('#b3261e', '#ff8a7a'), scrim: A('#1b1a1780', '#000000a0'),
    },
    shape: { small: 0, medium: 0, large: 0 },
    type: {
      family: 'Caladea',
      styles: {
        displaySmall: { fontFamily: 'DM Serif Display' }, headlineLarge: { fontFamily: 'DM Serif Display' }, headlineMedium: { fontFamily: 'DM Serif Display' },
        headlineSmall: { fontFamily: 'DM Serif Display' }, titleLarge: { fontFamily: 'DM Serif Display' },
      },
    },
    interaction: { lighting: false },
    surface: { shadows: false, glow: false },
    app: { background: solid('{vars.paper}') },
  },
  defaults: { shape: 'rect' },
  components: merge(flatComponents(), {
    button: {
      base: { background: paper(NONE), foreground: '{vars.ink}', ...rule, shape: 'rect', padding: [20, 9], textStyle: { fontSize: 15, fontWeight: 700 } },
      states: { hovered: { background: paper('{vars.ink}'), foreground: '{vars.paper}' }, pressed: { background: paper('{vars.spot}'), foreground: '{vars.onSpot}' }, focused: { borderWidth: 2 }, disabled: { alpha: 0.45 } },
      variants: {
        primary: { base: { background: paper('{vars.spot}'), foreground: '{vars.onSpot}', borderColor: '{vars.spot}' }, states: { hovered: { background: paper('{vars.ink}'), foreground: '{vars.paper}', borderColor: '{vars.ink}' } } },
        secondary: {},
        quiet: { base: { borderColor: NONE, textStyle: { fontStyle: 'italic', fontWeight: 400, fontSize: 15 } }, states: { hovered: { background: paper('{vars.tint}'), foreground: '{vars.ink}' } } },
        danger: { base: { foreground: A('#b3261e', '#ff8a7a'), borderColor: A('#b3261e', '#ff8a7a') }, states: { hovered: { background: paper(A('#b3261e', '#ff8a7a')), foreground: '{vars.paper}' } } },
      },
    },
    iconButton: {
      base: { background: paper(NONE), foreground: '{vars.ink}', ...rule, shape: 'rect', iconSize: 18 },
      states: { hovered: { background: paper('{vars.ink}'), foreground: '{vars.paper}' } },
      variants: {
        primary: { base: { background: paper('{vars.spot}'), foreground: '{vars.onSpot}', borderColor: '{vars.spot}' } },
        secondary: {},
        quiet: { base: { borderColor: NONE } },
        danger: { base: { foreground: A('#b3261e', '#ff8a7a'), borderColor: A('#b3261e', '#ff8a7a') } },
      },
    },
    toggleSwitch: {
      base: { trackSize: [42, 20], trackShape: 'rect', thumbShape: 'rect', trackBackground: paper(NONE), selectedTrackBackground: paper('{vars.tint}'), trackBorderColor: '{vars.ink}', thumbBackground: paper('{vars.ink}'), thumbBorderColor: NONE },
    },
    checkbox: { base: { faceShape: 'rect', faceSize: [18, 18], faceBackground: paper(NONE), faceBorderColor: '{vars.ink}', faceBorderWidth: 1, selectedFaceBackground: paper(NONE), selectedFaceBorderColor: '{vars.ink}', selectedFaceForeground: '{vars.spot}' } },
    slider: {
      base: { trackBackground: paper('{vars.paper3}'), trackShape: 'rect', activeTrackBackground: paper('{vars.ink}'), activeTrackShape: 'rect', thumbBackground: paper('{vars.paper}'), thumbBorderColor: '{vars.ink}', thumbBorderWidth: 2, thumbShape: 'rect', trackBorderColor: NONE },
    },
    progress: { base: { shape: 'rect', height: 6, trackBackground: paper('{vars.paper3}'), progressBackground: paper('{vars.ink}'), progressShape: 'rect' } },
    textField: {
      base: { background: paper('{vars.paper}'), ...rule, shape: 'rect', cursorColor: '{vars.ink}', placeholderColor: '{vars.dim}', labelColor: '{vars.ink}', textStyle: { fontSize: 16 } },
      states: { focused: { borderWidth: 2, borderColor: '{vars.spot}' } },
    },
    card: { base: { background: paper('{vars.paper2}'), ...rule, shape: 'rect' } },
    listTile: {
      base: {
        shape: 'rect', background: paper(NONE), selectedBackground: paper('{vars.tint}'), titleForeground: '{vars.ink}', subtitleForeground: '{vars.dim}', selectedTitleForeground: '{vars.spot}', selectedSubtitleForeground: '{vars.dim}',
        borderWidth: 0, minimumHeight: 52, titleStyle: { fontWeight: 700 }, subtitleStyle: { fontStyle: 'italic' },
      },
      states: { hovered: { background: paper('{vars.paper2}') } },
    },
    separator: { base: { color: '{vars.ink}', highlightColor: '{vars.ink}', thickness: 1 } },
    dialog: {
      base: {
        shape: 'rect', panelBackground: paper('{vars.paper}'), panelBorderColor: '{vars.ink}', panelBorderWidth: 2, enterScale: 1, titleBarBackground: paper('{vars.paper}'), titleBarForeground: '{vars.ink}',
        titleStyle: { fontFamily: 'DM Serif Display', fontSize: 26 }, titleBarBorderColor: '{vars.ink}', titleBarDividerThickness: 3, footerBackground: paper('{vars.paper}'), footerBorderColor: '{vars.ink}', footerDividerThickness: 1,
        scrimColor: A('#1b1a1780', '#000000b0'), closeCapBackground: paper(NONE), closeCapForeground: '{vars.ink}', closeCapShape: 'rect',
      },
      states: { hovered: { closeCapBackground: paper('{vars.ink}'), closeCapForeground: '{vars.paper}' } },
    },
    dropdownMenu: {
      base: {
        panelBackground: paper('{vars.paper}'), panelShape: 'rect', panelBorderColor: '{vars.ink}', panelBorderWidth: 1, itemShape: 'rect', itemForeground: '{vars.ink}', itemActiveBackground: paper('{vars.ink}'), itemSelectedBackground: paper('{vars.tint}'),
        itemActiveForeground: '{vars.paper}', itemIconTint: '{vars.ink}', itemMutedForeground: '{vars.dim}', separatorBrush: '{vars.ink}', separatorThickness: 1, groupLabelForeground: '{vars.dim}', itemTextStyle: { fontSize: 15 },
      },
      states: { hovered: { itemBackground: paper('{vars.ink}'), itemIconTint: '{vars.paper}' }, focused: { itemBackground: paper('{vars.ink}') }, pressed: { itemBackground: paper('{vars.spot}'), itemIconTint: '{vars.onSpot}' } },
    },
    tooltip: { base: { background: paper('{vars.ink}'), foreground: '{vars.paper}', shape: 'rect' } },
    segmentedButton: { base: { background: paper(NONE), foreground: '{vars.ink}', ...rule }, states: { selected: { background: paper('{vars.ink}'), foreground: '{vars.paper}' }, hovered: { background: paper('{vars.paper2}') } } },
    scrollbar: { base: { trackBackground: paper(NONE), thumbBackground: paper('{vars.dim}') } },
    snackbar: { base: { background: paper('{vars.ink}'), foreground: '{vars.paper}', shape: 'rect' } },
    topAppBar: { base: { background: paper('{vars.paper}'), separatorColor: '{vars.ink}' } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: paper('{vars.paper}'), shape: 'rect', minimumHeight: 62, itemSpacing: 0, overlayBrush: ['linear', 180, ['{vars.ink}', 0], ['{vars.ink}', 0.04], [NONE, 0.04], [NONE, 1]] } },
        item: {
          base: { background: paper(NONE), foreground: '{vars.dim}', shape: 'rect', iconSize: 20, labelStyle: { fontSize: 12, fontStyle: 'italic' } },
          states: { hovered: { background: paper('{vars.paper2}'), foreground: '{vars.ink}' }, selected: { foreground: '{vars.spot}', background: paper('{vars.tint}'), labelStyle: { fontSize: 12, fontWeight: 700 } } },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: paper('{vars.paper}'), foreground: '{vars.ink}', shape: 'rect', overlayBrush: ['linear', 90, [NONE, 0], [NONE, 0.994], ['{vars.ink}', 0.994], ['{vars.ink}', 1]] } },
        header: { base: { dividerColor: '{vars.ink}', dividerWidth: 3 } },
        footer: { base: { dividerColor: '{vars.ink}', dividerWidth: 1 } },
        group: { base: { labelForeground: '{vars.dim}', labelShape: 'rect', labelHoveredBackground: paper(NONE), separatorBrush: '{vars.ink}', labelStyle: { fontStyle: 'italic', fontSize: 13 } } },
        item: {
          base: {
            background: paper(NONE), foreground: '{vars.ink}', iconTint: '{vars.dim}', iconSize: 16, shape: 'rect', minimumHeight: 40, labelStyle: { fontSize: 17 },
            hoverBackground: paper('{vars.paper2}'), focusBackground: paper('{vars.paper2}'), pressedBackground: paper('{vars.paper3}'), selectedBackground: paper('{vars.tint}'),
          },
          states: {
            hovered: { background: paper('{vars.paper2}'), iconTint: '{vars.ink}' },
            pressed: { background: paper('{vars.paper3}') },
            selected: { background: paper('{vars.tint}'), foreground: '{vars.spot}', iconTint: '{vars.spot}', selectedIndicatorColor: '{vars.spot}', selectedIndicatorWidth: 3, labelStyle: { fontSize: 17, fontWeight: 700 } },
          },
        },
      },
    },
  }),
});
