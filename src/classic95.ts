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
    app: { background: solid('{vars.face}') },
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
  },
});
