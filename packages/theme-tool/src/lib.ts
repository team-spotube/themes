// Helpers and types for writing theme modules:
//   import { defineTheme, A, solid, merge, flatComponents, choice } from '@team-spotube/theme-tool';

/** Any JSON-ish value a theme property can hold (colours, numbers, brush expressions, `{light, dark}` pairs...). */
export type Value = unknown;
/** A bag of component properties (names mirror Millennium's `*ThemeProperties`; see the JSON Schema). */
export type Props = Record<string, Value>;
export type ThemeState = 'default' | 'hovered' | 'focused' | 'pressed' | 'disabled' | 'selected' | 'error';
export interface VariantTheme { base?: Props; states?: Partial<Record<ThemeState, Props>> }
export interface ComponentTheme {
  base?: Props;
  states?: Partial<Record<ThemeState, Props>>;
  variants?: Record<string, VariantTheme>;
  rules?: { when: unknown; set: Props }[];
  vars?: Record<string, VarDecl>;
}
export type ComponentName =
  | 'autocomplete' | 'avatar' | 'bottomNavigationBar' | 'bottomSheet' | 'button' | 'card' | 'checkbox' | 'dialog' | 'disclosure' | 'drawer' | 'dropdownMenu'
  | 'icon' | 'iconButton' | 'listTile' | 'loading' | 'modalBottomSheet' | 'progress' | 'pullToRefresh' | 'radioGroup' | 'scaffold' | 'scrollbar' | 'segmentedButton'
  | 'separator' | 'sidebar' | 'slider' | 'snackbar' | 'tabGroup' | 'text' | 'textField' | 'toggleSwitch' | 'tooltip' | 'topAppBar' | 'triStateCheckbox'
  | AppComponentName;

/** The app's own components (theme format 1.3): styled through `variants.<slot>`, see docs/themes/theme-format. */
export const APP_COMPONENT_NAMES = [
  'appShell', 'collectionHeader', 'connectBanner', 'emptyState', 'errorDisplay', 'expandedPlayer', 'featuredCarousel', 'floatingPlayer', 'largePlayer', 'loginRequired',
  'lyricsLine', 'mediaArtwork', 'mediaCard', 'mediaListTile', 'playerQueue', 'screen', 'section', 'settingsRow', 'trackList', 'trackOptions',
] as const;
export type AppComponentName = (typeof APP_COMPONENT_NAMES)[number];

export interface VarDecl { type: 'color' | 'number' | 'bool' | 'string' | 'enum'; default?: Value; value?: Value; min?: number; max?: number; options?: Value[] }
/** A setting offered to users under *Customize*; referenced as `{params.name}`. */
export interface Parameter {
  type: 'color' | 'number' | 'bool' | 'string' | 'enum';
  label: string;
  description?: string;
  default: Value;
  min?: number;
  max?: number;
  step?: number;
  options?: (string | { value: string; label?: string; color?: string })[];
  presets?: string[];
}
type FontFileEntry = [file: string, weight: number] | [file: string, weight: number, style: 'normal' | 'italic'];
/**
 * A font family from anywhere:
 *   `{ dir: 'my-font', files }`            a folder in your project's `fonts/`, or one bundled with the tool;
 *   `{ from: '@fontsource/inter', files }` any npm font package (Fontsource, @expo-google-fonts/*...) or a `./path`;
 * `files` are paths inside that folder: `.ttf`, `.otf`, `.woff` or `.woff2` (the last two are converted).
 */
export type FontSpec =
  | { dir: string; files: FontFileEntry[] }
  | { from: string; files: FontFileEntry[] };
/** Options shared by generic icon packs. Missing roles keep Spotube's stock icon. */
interface GenericIconPack {
  label?: string;
  /** Licence text (or name) to put in the theme's LICENSE. */
  license?: string;
  /** Override the icon name used for a role: `{ 'skip-forward': 'player-skip-forward' }`. */
  names?: Record<string, string>;
  prefix?: string;
  /** Pick a style variant: `'-fill'`, `'-bold'`, `'-solid'`... */
  suffix?: string;
  /** PNG size in px (default 96). */
  size?: number;
  /** Recolour with the icon colour (default true; set false for multicolour art). */
  tint?: boolean;
}
/** An icon pack: a bundled font pack id, an Iconify set from npm, or any folder of SVG files. */
export type IconPackSpec = IconPackId | (GenericIconPack & { iconify: string }) | (GenericIconPack & { svgDir: string });
export type IconPackId = 'lucide' | 'phosphor' | 'phosphor-thin' | 'phosphor-bold' | 'phosphor-fill' | 'bootstrap' | 'fontawesome' | 'fluent' | 'fluent-filled' | (string & {});

/** What a `src/<id>.ts` module default-exports. The file name is the theme id. */
export interface ThemeModule {
  name: string;
  description: string;
  version?: string;
  author?: string;
  repository?: string;
  bugs?: string;
  homepage?: string;
  contact?: string;
  license?: string;
  /** Your logo: path to a `.png` (max 512x512) or `.svg` (rendered to PNG), relative to the project. */
  logo: string;
  /**
   * Update checks from GitHub releases (theme format 1.2): `true` uses your `repository` and an archive named `<id>.zip`
   * (what \`spotube-theme zip\` produces); or `{ github, asset }`. Release tags must be semver, with or without a `v`.
   */
  updates?: true | { github?: string; asset?: string };
  iconPack?: IconPackSpec;
  fonts?: Record<string, FontSpec>;
  licenseNote?: string;
  parameters?: Record<string, Parameter>;
  vars?: Record<string, VarDecl>;
  tokens?: Record<string, Value>;
  defaults?: Props;
  components?: Partial<Record<ComponentName, ComponentTheme>>;
}

/** Identity helper that type-checks a theme module and returns it unchanged. */
export const defineTheme = (theme: ThemeModule): ThemeModule => theme;

/** A value that differs between appearances. */
export const A = <L, D = L>(light: L, dark: D): { light: L; dark: D } => ({ light, dark });

/** Fully transparent, for "no colour" (use `null` instead where a property is nullable, e.g. orb/rim colours). */
export const NONE = '#00000000';

/** A flat two-stop "gradient" (a solid brush). */
export const solid = (c: Value): Value[] => ['gradient', c, c];

/** Colour parameter with swatches: options = [[value, label, '#swatch'], ...]. */
export const choice = (label: string, def: string, options: [value: string, label: string, color?: string][]): Parameter => ({
  type: 'enum',
  label,
  default: def,
  options: options.map(([value, label, color]) => ({ value, label, ...(color ? { color } : {}) })),
});

/** `match` over the accent parameter: byAccent({ pink: x, cyan: y }) */
export const byAccent = (map: Record<string, Value>, param = 'accent'): Value[] => ['match', `{params.${param}}`, map];

/** Deep merge (arrays and scalars replace, objects merge). */
export function merge<T = any>(a: any, b: any): T {
  if (b === undefined) return a;
  if (!a || typeof a !== 'object' || Array.isArray(a) || !b || typeof b !== 'object' || Array.isArray(b)) return b;
  const out: Record<string, unknown> = { ...a };
  for (const k of Object.keys(b)) out[k] = merge(a[k], b[k]);
  return out as T;
}

const N = NONE;
const noMotion = { hoverScale: 1, pressedScale: 1 };

/**
 * Every component with all of Millennium's built-in gloss switched off (no shadows, rims, glows, overlays, scaling).
 * Themes merge their own colours, shapes and effects on top, so a property that is not mentioned is flat, never the
 * stock Millennium sheen.
 */
export const flatComponents = (): Partial<Record<ComponentName, ComponentTheme>> => ({
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
