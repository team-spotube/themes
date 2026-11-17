// Amp: a hi-fi deck. Brushed-metal panels, round knobs, and an LCD that glows in the accent colour.
import { A, choice, defineTheme, NONE, solid } from '@team-spotube/theme-tool';

const metal = (down: boolean) => (down ? ['linear', 180, '{vars.metalBot}', '{vars.metalTop}'] : ['linear', 180, '{vars.metalTop}', '{vars.metalBot}']);
const lcd = ['linear', 180, '{vars.lcdTop}', '{vars.lcdBot}'];
const glow = (c = '{vars.led}', r = 8) => ({ color: c, offsetX: 0, offsetY: 0, blurRadius: r });
const label = { fontFamily: 'Silkscreen', fontSize: 11, letterSpacing: 0.6 };
const flat = { shadows: [NONE], shadowElevation: 0, interactionOverlay: NONE, interactionRim: NONE, motion: { hoverScale: 1, pressedScale: 0.98 } };

export default defineTheme({
  name: 'Amp',
  author: 'Spotube Team',
  license: 'AGPL-3.0-or-later',
  repository: 'https://github.com/team-spotube/themes',
  bugs: 'https://github.com/team-spotube/themes/issues',
  version: '1.0.0',
  description: 'A hi-fi deck: brushed-metal panels, a glowing LCD, round knobs and pixel-font labels.',
  iconPack: 'lucide',
  logo: ['#5dff7a', '#0b1a10'],
  fonts: {
    Silkscreen: { dir: 'silkscreen', files: [['Silkscreen-Regular.ttf', 400], ['Silkscreen-Bold.ttf', 700]] },
    'Liberation Sans': { dir: 'liberation-sans', files: [['LiberationSans-Regular.ttf', 400], ['LiberationSans-Bold.ttf', 700]] },
  },
  parameters: {
    led: choice('LED color', 'green', [['green', 'Green', '#5dff7a'], ['amber', 'Amber', '#ffb000'], ['cyan', 'Cyan', '#36e0ff'], ['red', 'Red', '#ff5a4d']]),
  },
  vars: {
    none: { type: 'color', default: NONE },
    led: { type: 'color', value: ['match', '{params.led}', { green: A('#0d9c34', '#5dff7a'), amber: A('#b86e00', '#ffb000'), cyan: A('#00849c', '#36e0ff'), red: A('#c4261a', '#ff5a4d') }] },
    ledOn: { type: 'color', value: ['match', '{params.led}', { green: '#5dff7a', amber: '#ffb000', cyan: '#36e0ff', red: '#ff5a4d' }] },
    ledGlow: { type: 'color', value: ['alpha', '{vars.ledOn}', 0.55] },
    metalTop: { type: 'color', value: A('#eceff3', '#50545e') },
    metalBot: { type: 'color', value: A('#b4bac5', '#26282e') },
    edge: { type: 'color', value: A('#6f7683', '#07080a') },
    sheen: { type: 'color', value: A('#ffffffd0', '#ffffff2e') },
    ink: { type: 'color', value: A('#1b1e24', '#e9ecf2') },
    inkDim: { type: 'color', value: A('#5a6170', '#9aa1b0') },
    lcdTop: { type: 'color', value: '#06100a' },
    lcdBot: { type: 'color', value: '#0d1c13' },
    lcdInk: { type: 'color', value: '#c9ffd6' },
  },
  tokens: {
    color: {
      background: A('#c9ced8', '#1b1c21'), surface: A('#d9dde5', '#2a2c32'), raised: A('#e8ebf0', '#34363d'), inset: '#06100a', text: '{vars.ink}', muted: '{vars.inkDim}',
      border: '{vars.edge}', highlight: '{vars.sheen}', accent: '{vars.ledOn}', accentTop: '{vars.ledOn}', accentBottom: '{vars.led}', onAccent: '#04110a', success: '{vars.led}', danger: '#ff5a4d', scrim: '#000000a0',
    },
    shape: { small: 3, medium: 6, large: 10 },
    type: { family: 'Liberation Sans' },
    app: { background: ['linear', 180, A('#d4d8e0', '#2d2f36'), A('#aeb4c0', '#15161a')] },
  },
  defaults: { shape: 6 },
  components: {
    button: {
      base: { background: metal(false), borderWidth: 1, borderColor: '{vars.edge}', innerGlowColor: '{vars.sheen}', bottomRimColor: '#00000040', ...flat, labelShadow: false, shape: 6, foreground: '{vars.ink}', textStyle: label },
      states: { pressed: { background: metal(true), innerGlowColor: NONE }, hovered: { innerGlowColor: '#ffffff' }, disabled: { foreground: '{vars.inkDim}' }, focused: { borderColor: '{vars.ledOn}' } },
      variants: {
        primary: {
          base: { background: lcd, foreground: '{vars.ledOn}', borderColor: '{vars.ledOn}', innerGlowColor: '#ffffff18', bottomRimColor: null, textStyle: { ...label, shadow: glow() }, shadows: ['{vars.ledGlow}'], shadowElevation: 8 },
          states: { pressed: { background: ['linear', 180, '{vars.lcdBot}', '{vars.lcdTop}'], shadowElevation: 3 } },
        },
        secondary: {},
        quiet: { base: { background: solid(NONE), borderColor: NONE, innerGlowColor: NONE, bottomRimColor: null, foreground: '{vars.ink}' }, states: { hovered: { background: metal(false), borderColor: '{vars.edge}', innerGlowColor: '{vars.sheen}' } } },
        danger: { base: { foreground: '#ff5a4d', background: lcd, borderColor: '#ff5a4d', textStyle: { ...label, shadow: glow('#ff5a4d') } } },
      },
    },
    iconButton: {
      base: { background: metal(false), borderWidth: 1, borderColor: '{vars.edge}', innerGlowColor: '{vars.sheen}', bottomRimColor: '#00000040', ...flat, orb: false, shape: 'pill', foreground: '{vars.ink}', iconSize: 16 },
      states: { pressed: { background: metal(true), innerGlowColor: NONE } },
      variants: {
        primary: { base: { background: lcd, foreground: '{vars.ledOn}', borderColor: '{vars.ledOn}', shadows: ['{vars.ledGlow}'], shadowElevation: 8 } },
        secondary: {},
        quiet: { base: { background: solid(NONE), borderColor: NONE, innerGlowColor: NONE, bottomRimColor: null }, states: { hovered: { background: metal(false), borderColor: '{vars.edge}' } } },
        danger: { base: { background: lcd, foreground: '#ff5a4d', borderColor: '#ff5a4d' } },
      },
    },
    toggleSwitch: {
      base: {
        trackSize: [46, 22], trackShape: 'pill', thumbShape: 'pill',
        trackBackground: lcd, selectedTrackBackground: ['linear', 180, '{vars.lcdTop}', '{vars.ledGlow}'], trackBorderColor: '{vars.edge}', trackGlowColor: NONE, trackBottomRimColor: null,
        thumbBackground: ['radial', 0.35, 0.3, 0.9, '{vars.metalTop}', '{vars.metalBot}'], thumbBorderColor: '{vars.edge}', thumbGlowColor: '{vars.sheen}', thumbBottomRimColor: '#00000040', thumbElevation: 2,
        trackInteractionOverlay: NONE, thumbInteractionOverlay: NONE, thumbHoverScaleX: 1, thumbHoverScaleY: 1, thumbPressedScaleX: 1, thumbPressedScaleY: 1,
      },
      states: { selected: { trackBorderColor: '{vars.ledOn}', trackGlowColor: '{vars.ledGlow}' } },
    },
    checkbox: {
      base: {
        faceShape: 3, faceSize: [18, 18], faceBackground: lcd, faceBorderColor: '{vars.edge}', faceBorderWidth: 1,
        selectedFaceBackground: lcd, selectedFaceBorderColor: '{vars.ledOn}', selectedFaceForeground: '{vars.ledOn}', faceGlowColor: NONE, selectedFaceGlowColor: '{vars.ledGlow}',
        faceElevation: 0, faceBottomRimColor: null, faceInteractionOverlay: NONE, faceHoverScale: 1, facePressedScale: 1,
      },
    },
    slider: {
      base: {
        trackBackground: lcd, trackBorderColor: '{vars.edge}', trackInsetShadeColor: '#000000', trackShape: 'pill', trackBottomRimColor: '{vars.sheen}',
        activeTrackBackground: ['linear', 90, '{vars.led}', '{vars.ledOn}'], activeTrackShape: 'pill', activeTrackGlowColor: '{vars.ledGlow}',
        thumbBackground: ['radial', 0.35, 0.3, 0.9, '{vars.metalTop}', '{vars.metalBot}'], thumbBorderColor: '{vars.edge}', thumbBorderWidth: 1, thumbShape: 'pill', thumbGlowColor: '{vars.sheen}', thumbBottomRimColor: '#00000050', thumbElevation: 3,
        trackInteractionOverlay: NONE, thumbInteractionOverlay: NONE,
      },
    },
    progress: {
      base: {
        shape: 3, height: 10, trackBackground: lcd, borderColor: '{vars.edge}', borderWidth: 1, trackBottomRimColor: '{vars.sheen}',
        progressBackground: ['linear', 90, '{vars.led}', '{vars.ledOn}'], progressShape: 2, progressInnerGlowColor: '#ffffff40', progressBottomRimColor: null,
      },
    },
    textField: {
      base: { background: lcd, borderWidth: 1, borderColor: '{vars.edge}', shape: 4, insetShadeColor: '#000000', innerGlowColor: NONE, bottomRimColor: '{vars.sheen}', cursorColor: '{vars.ledOn}', interactionOverlay: NONE, placeholderColor: '#5f8a6c', labelColor: '{vars.ink}', textStyle: { color: '{vars.ledOn}', shadow: glow('{vars.ledGlow}', 6) } },
      states: { focused: { borderColor: '{vars.ledOn}' } },
    },
    card: { base: { background: metal(false), borderColor: '{vars.edge}', borderWidth: 1, shape: 10, innerGlowColor: '{vars.sheen}', bottomRimColor: '#00000040', shadowElevation: 6, shadowColor: '#00000066', insetShadeColor: NONE, interactionOverlay: NONE } },
    listTile: {
      base: {
        shape: 4, background: solid(NONE), selectedBackground: lcd, borderWidth: 1, borderColor: NONE, shadowElevation: 0, titleForeground: '{vars.ink}', subtitleForeground: '{vars.inkDim}',
        selectedTitleForeground: '{vars.ledOn}', selectedSubtitleForeground: '{vars.lcdInk}', interactionOverlay: NONE, titleStyle: {},
      },
      states: { hovered: { background: metal(false), borderColor: '{vars.edge}' } },
    },
    separator: { base: { color: '{vars.edge}', highlightColor: '{vars.sheen}', thickness: 1 } },
    dialog: {
      base: {
        shape: 10, panelBackground: metal(false), panelBorderColor: '{vars.edge}', panelBorderWidth: 1, panelGlowColor: '{vars.sheen}', panelBottomRimColor: '#00000040', panelShadowElevation: 30, panelShadowColor: '#000000a0',
        titleBarBackground: lcd, titleBarForeground: '{vars.ledOn}', titleStyle: { ...label, fontSize: 13, shadow: glow() }, titleBarDividerThickness: 1, titleBarBorderColor: '{vars.edge}',
        footerBackground: solid(NONE), footerBorderColor: '{vars.edge}', footerDividerThickness: 1, scrimColor: '#000000a0',
        closeCapBackground: metal(false), closeCapForeground: '{vars.ink}', closeCapBorderColor: '{vars.edge}', closeCapBorderWidth: 1, closeCapShape: 'pill', closeCapGlowColor: '{vars.sheen}',
        closeCapElevation: 0, closeCapRaisedElevation: 0, closeCapPressedElevation: 0, closeCapTint: NONE, closeScaleHover: 1, closeScalePressed: 0.95,
      },
      states: { hovered: { closeCapBackground: lcd, closeCapForeground: '{vars.ledOn}', closeCapBorderColor: '{vars.ledOn}' } },
    },
    dropdownMenu: {
      base: {
        panelBackground: lcd, panelShape: 6, panelBorderColor: '{vars.edge}', panelBorderWidth: 1, panelGlowColor: NONE, panelBottomRimColor: null, panelShadowElevation: 20, panelShadowColor: '#000000a0',
        itemShape: 3, itemForeground: '{vars.lcdInk}', itemActiveBackground: ['gradient', '{vars.ledGlow}', '{vars.ledGlow}'], itemSelectedBackground: ['gradient', '{vars.ledGlow}', '{vars.ledGlow}'], itemActiveForeground: '#ffffff', itemActiveElevation: 0,
        itemHoverScale: 1, itemPressedScale: 1, itemMutedForeground: '#7fa68b', itemIconTint: '{vars.ledOn}', itemBorderColor: NONE, itemBorderWidth: 0, itemGlowColor: NONE,
        itemActiveBorderColor: '{vars.ledOn}', itemOrbColor: null, itemBottomRimColor: null, itemShadowColor: NONE, itemOverlayBrush: NONE, separatorBrush: '#1d3a28', separatorThickness: 1, groupLabelForeground: '#7fa68b',
        itemTextStyle: { fontSize: 13 },
      },
      states: { hovered: { itemBackground: ['gradient', '{vars.ledGlow}', '{vars.ledGlow}'] }, focused: { itemBackground: ['gradient', '{vars.ledGlow}', '{vars.ledGlow}'] }, pressed: { itemBackground: ['gradient', '{vars.ledGlow}', '{vars.ledGlow}'] } },
    },
    tooltip: { base: { background: lcd, foreground: '{vars.ledOn}', shape: 3, borderColor: '{vars.ledOn}', borderWidth: 1, shadowElevation: 0 } },
    segmentedButton: {
      base: { background: metal(false), foreground: '{vars.ink}', borderColor: '{vars.edge}', borderWidth: 1, innerGlowColor: '{vars.sheen}', bottomRimColor: '#00000040', ...flat, textStyle: label },
      states: { selected: { background: lcd, foreground: '{vars.ledOn}', innerGlowColor: NONE, borderColor: '{vars.ledOn}' }, pressed: { background: metal(true) } },
    },
    scrollbar: { base: { trackBackground: solid(NONE), thumbBackground: metal(false), thumbBorderColor: '{vars.edge}', thumbInnerGlowColor: '{vars.sheen}', thumbBottomRimColor: null, thumbInteractionOverlay: NONE } },
    snackbar: { base: { background: lcd, foreground: '{vars.ledOn}', borderColor: '{vars.ledOn}', borderWidth: 1, shape: 6, shadowElevation: 14, shadowColor: '{vars.ledGlow}' } },
    topAppBar: { base: { background: metal(false), separatorColor: '{vars.edge}' } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: metal(false), shape: 'rect', borderWidth: 0, shadowElevation: 0, innerGlowColor: '{vars.sheen}', bottomRimColor: null, overlayBrush: NONE, itemSpacing: 6, minimumHeight: 64, contentPadding: [10, 6] } },
        item: {
          base: { background: solid(NONE), foreground: '{vars.inkDim}', shape: 6, iconSize: 20, borderWidth: 1, borderColor: NONE, shadowElevation: 0, innerGlowColor: NONE, bottomRimColor: null, orbColor: null, overlayBrush: NONE, hoverScale: 1, pressedScale: 1, labelStyle: { ...label, fontSize: 10 } },
          states: {
            hovered: { background: metal(false), borderColor: '{vars.edge}', foreground: '{vars.ink}', innerGlowColor: '{vars.sheen}' },
            pressed: { background: metal(true), foreground: '{vars.ink}' },
            selected: { background: lcd, foreground: '{vars.ledOn}', borderColor: '{vars.ledOn}', shadowElevation: 6, shadowColor: '{vars.ledGlow}', labelStyle: { ...label, fontSize: 10, shadow: glow() } },
          },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: metal(false), foreground: '{vars.ink}', shape: 'rect', borderWidth: 0, shadowElevation: 0, innerGlowColor: NONE, bottomRimColor: null, overlayBrush: ['linear', 90, [NONE, 0], [NONE, 0.99], ['{vars.edge}', 0.99], ['{vars.edge}', 1]] } },
        header: { base: { background: solid(NONE), dividerColor: '{vars.edge}', dividerHighlightColor: '{vars.sheen}', dividerWidth: 1 } },
        footer: { base: { background: solid(NONE), dividerColor: '{vars.edge}', dividerHighlightColor: '{vars.sheen}', dividerWidth: 1 } },
        group: { base: { labelForeground: '{vars.inkDim}', labelShape: 3, labelHoveredBackground: solid(NONE), labelBorderWidth: 0, labelInnerGlowColor: NONE, labelOverlayBrush: NONE, separatorBrush: '{vars.edge}', labelStyle: label } },
        item: {
          base: {
            background: solid(NONE), foreground: '{vars.ink}', iconTint: '{vars.inkDim}', iconSize: 16, shape: 5, borderWidth: 1, borderColor: NONE, shadowElevation: 0, innerGlowColor: NONE, bottomRimColor: null, orbColor: null,
            overlayBrush: NONE, hoverScale: 1, pressedScale: 1, selectedIndicatorColor: NONE, selectedIndicatorBrush: NONE, selectedIndicatorWidth: 0, labelStyle: { ...label, fontSize: 12 },
            hoverBackground: metal(false), focusBackground: metal(false), pressedBackground: metal(true), selectedBackground: lcd,
          },
          states: {
            hovered: { background: metal(false), borderColor: '{vars.edge}', iconTint: '{vars.ink}', innerGlowColor: '{vars.sheen}' },
            pressed: { background: metal(true), borderColor: '{vars.edge}' },
            focused: { borderColor: '{vars.ledOn}' },
            selected: { background: lcd, foreground: '{vars.ledOn}', iconTint: '{vars.ledOn}', borderColor: '{vars.edge}', shadowElevation: 6, shadowColor: '{vars.ledGlow}', labelStyle: { ...label, fontSize: 12, shadow: glow() } },
          },
        },
      },
    },
  },
});
