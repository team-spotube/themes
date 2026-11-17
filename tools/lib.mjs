// Small helpers shared by the theme modules.

/** A value that differs between appearances. */
export const A = (light, dark) => ({ light, dark });

/** Fully transparent, for "no colour" (use `null` instead where a property is nullable, e.g. orb/rim colours). */
export const NONE = '#00000000';

/** A flat two-stop "gradient" (a solid brush). */
export const solid = (c) => ['gradient', c, c];

/** Colour parameter with swatches: options = [[value, label, '#swatch'], ...]. */
export const choice = (label, def, options) => ({
  type: 'enum',
  label,
  default: def,
  options: options.map(([value, label, color]) => ({ value, label, ...(color ? { color } : {}) })),
});

/** `match` over the accent parameter: byAccent({ pink: x, cyan: y }) */
export const byAccent = (map, param = 'accent') => ['match', `{params.${param}}`, map];

/** Deep merge (arrays and scalars replace, objects merge). */
export function merge(a, b) {
  if (b === undefined) return a;
  if (!a || typeof a !== 'object' || Array.isArray(a) || !b || typeof b !== 'object' || Array.isArray(b)) return b;
  const out = { ...a };
  for (const k of Object.keys(b)) out[k] = merge(a[k], b[k]);
  return out;
}

const N = NONE;
const noMotion = { hoverScale: 1, pressedScale: 1 };

/**
 * Every component with all of Millennium's built-in gloss switched off (no shadows, rims, glows, overlays, scaling).
 * Themes merge their own colours, shapes and effects on top, so a property that is not mentioned is flat, never the
 * stock Millennium sheen.
 */
export const flatComponents = () => ({
  button: { base: { shadows: [N], shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, interactionOverlay: N, interactionRim: N, motion: noMotion, borderWidth: 0 } },
  iconButton: { base: { orb: false, shadows: [N], shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, interactionOverlay: N, interactionRim: N, motion: noMotion, borderWidth: 0 } },
  toggleSwitch: {
    base: {
      trackGlowColor: N, trackBottomRimColor: null, thumbGlowColor: N, thumbBottomRimColor: null, thumbElevation: 0, trackInteractionOverlay: N, thumbInteractionOverlay: N,
      thumbHoverScaleX: 1, thumbHoverScaleY: 1, thumbPressedScaleX: 1, thumbPressedScaleY: 1, thumbBorderColor: N, trackBorderColor: N,
    },
  },
  checkbox: { base: { faceGlowColor: N, selectedFaceGlowColor: N, faceElevation: 0, faceBottomRimColor: null, faceInteractionOverlay: N, faceHoverScale: 1, facePressedScale: 1 } },
  slider: {
    base: {
      trackInsetShadeColor: N, trackInnerGlowColor: N, trackBottomRimColor: null, activeTrackGlowColor: N, thumbGlowColor: N, thumbBottomRimColor: null, thumbElevation: 0,
      trackInteractionOverlay: N, thumbInteractionOverlay: N, trackBorderColor: N,
    },
  },
  progress: { base: { borderColor: N, borderWidth: 0, progressInnerGlowColor: N, progressBottomRimColor: null, trackBottomRimColor: null } },
  textField: { base: { insetShadeColor: N, innerGlowColor: N, bottomRimColor: null, interactionOverlay: N } },
  card: { base: { shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, insetShadeColor: N, interactionOverlay: N } },
  listTile: { base: { shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, interactionOverlay: N, borderWidth: 0 } },
  separator: { base: { highlightColor: N } },
  dialog: {
    base: {
      panelGlowColor: N, panelBottomRimColor: null, panelShadowElevation: 0, titleBarBorderColor: N, titleBarDividerThickness: 0, footerBorderColor: N, footerDividerThickness: 0,
      closeCapBorderColor: N, closeCapBorderWidth: 0, closeCapGlowColor: N, closeCapElevation: 0, closeCapRaisedElevation: 0, closeCapPressedElevation: 0, closeCapTint: N,
      closeScaleHover: 1, closeScalePressed: 1,
    },
  },
  dropdownMenu: {
    base: {
      panelGlowColor: N, panelBottomRimColor: null, panelShadowElevation: 0, itemActiveElevation: 0, itemHoverScale: 1, itemPressedScale: 1, itemBorderColor: N, itemBorderWidth: 0,
      itemGlowColor: N, itemActiveBorderColor: N, itemOrbColor: null, itemBottomRimColor: null, itemShadowColor: N, itemOverlayBrush: N,
    },
  },
  tooltip: { base: { shadowElevation: 0, borderWidth: 0 } },
  segmentedButton: { base: { shadows: [N], shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, interactionOverlay: N, interactionRim: N, motion: noMotion, borderWidth: 0 } },
  scrollbar: { base: { thumbInnerGlowColor: N, thumbBottomRimColor: null, trackInnerGlowColor: N, trackBottomRimColor: null, thumbInteractionOverlay: N, thumbBorderColor: N } },
  snackbar: { base: { shadowElevation: 0, borderWidth: 0 } },
  bottomNavigationBar: {
    variants: {
      main: { base: { borderWidth: 0, shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, orbColor: null, overlayBrush: N } },
      item: { base: { borderWidth: 0, borderColor: N, shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, orbColor: null, overlayBrush: N, hoverScale: 1, pressedScale: 1 } },
    },
  },
  sidebar: {
    variants: {
      root: { base: { borderWidth: 0, shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, orbColor: null, overlayBrush: N } },
      header: { base: { background: ['gradient', N, N], dividerColor: N, dividerWidth: 0, dividerHighlightColor: N } },
      footer: { base: { background: ['gradient', N, N], dividerColor: N, dividerWidth: 0, dividerHighlightColor: N } },
      group: { base: { labelBorderColor: N, labelBorderWidth: 0, labelInnerGlowColor: N, labelOverlayBrush: N } },
      item: {
        base: {
          borderWidth: 0, borderColor: N, shadowElevation: 0, innerGlowColor: N, bottomRimColor: null, orbColor: null, overlayBrush: N, hoverScale: 1, pressedScale: 1,
          selectedIndicatorColor: N, selectedIndicatorBrush: N, selectedIndicatorWidth: 0,
        },
      },
    },
  },
});
