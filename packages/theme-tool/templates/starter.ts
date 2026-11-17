import { A, NONE, choice, defineTheme, flatComponents, merge, solid } from '@team-spotube/theme-tool';

// A small, complete starting point: one accent parameter, light and dark colours, rounded buttons and a flat look.
// Run `spotube-theme list` to see the bundled fonts and icon packs, and see the other templates for bigger ideas.
export default defineTheme({
  name: '{{name}}',
  description: 'A starting point for a new Spotube theme.',
  author: '{{author}}',
  license: '{{license}}',
  repository: '{{repository}}', // where people find the source and report problems
  logo: 'logos/{{id}}.svg', // your own artwork: a .png (max 512 px) or .svg
  iconPack: 'lucide',

  // Settings users can change under "Customize" in the app. Use them as {params.name}.
  parameters: {
    accent: choice('Accent color', 'violet', [
      ['violet', 'Violet', '#7c5cff'],
      ['rose', 'Rose', '#e11d48'],
      ['teal', 'Teal', '#0d9488'],
    ]),
  },

  // Your private tokens, referenced as {vars.name}.
  vars: {
    none: { type: 'color', default: NONE },
    key: { type: 'color', value: ['match', '{params.accent}', { violet: '#7c5cff', rose: '#e11d48', teal: '#0d9488' }] },
    page: { type: 'color', value: A('#ffffff', '#101014') },
    panel: { type: 'color', value: A('#f1f1f5', '#1c1c22') },
    ink: { type: 'color', value: A('#16161a', '#f2f2f5') },
    wash: { type: 'color', value: ['alpha', '{vars.key}', 0.16] },
  },

  tokens: {
    color: { background: '{vars.page}', text: '{vars.ink}', accent: '{vars.key}', onAccent: '#ffffff' },
    shape: { small: 8, medium: 12, large: 20 },
    interaction: { lighting: false },
    surface: { shadows: false, glow: false },
    app: { background: solid('{vars.page}') },
  },

  // Start from flatComponents() (no stock gloss), then say what each control looks like. Anything you leave out keeps
  // Millennium's default blue look, so cover the controls your theme touches.
  components: merge(flatComponents(), {
    button: {
      base: { shape: 'pill', padding: [20, 10], foreground: '{vars.ink}', background: solid('{vars.panel}') },
      states: { hovered: { background: solid('{vars.wash}') } },
      variants: {
        primary: { base: { background: solid('{vars.key}'), foreground: '#ffffff' }, states: { hovered: { background: solid('{vars.key}') } } },
        quiet: { base: { background: solid(NONE) }, states: { hovered: { background: solid('{vars.wash}') } } },
      },
    },
    iconButton: {
      base: { shape: 'pill', background: solid('{vars.panel}'), foreground: '{vars.ink}' },
      states: { hovered: { background: solid('{vars.wash}') } },
      variants: { primary: { base: { background: solid('{vars.key}'), foreground: '#ffffff' } }, quiet: { base: { background: solid(NONE) } } },
    },
    toggleSwitch: {
      base: { trackShape: 'pill', thumbShape: 'pill', trackBackground: solid('{vars.panel}'), selectedTrackBackground: solid('{vars.key}'), thumbBackground: solid('#ffffff') },
    },
    checkbox: {
      base: { faceBackground: solid('{vars.panel}'), selectedFaceBackground: solid('{vars.key}'), selectedFaceBorderColor: '{vars.key}', selectedFaceForeground: '#ffffff' },
    },
    slider: {
      base: { trackBackground: solid('{vars.panel}'), activeTrackBackground: solid('{vars.key}'), thumbBackground: solid('#ffffff'), thumbBorderColor: '{vars.key}' },
    },
    progress: { base: { trackBackground: solid('{vars.panel}'), progressBackground: solid('{vars.key}') } },
    textField: { base: { background: solid('{vars.panel}'), borderColor: NONE }, states: { focused: { borderColor: '{vars.key}' } } },
    card: { base: { background: solid('{vars.panel}'), borderColor: NONE } },
    listTile: {
      base: { shape: 12, selectedBackground: solid('{vars.wash}'), selectedTitleForeground: '{vars.key}' },
      states: { hovered: { background: solid('{vars.wash}') } },
    },
    dropdownMenu: {
      base: { panelBackground: solid('{vars.panel}'), itemActiveBackground: solid('{vars.wash}'), itemActiveForeground: '{vars.ink}' },
      states: { hovered: { itemBackground: solid('{vars.wash}') } },
    },
    dialog: { base: { panelBackground: solid('{vars.panel}') } },
    bottomNavigationBar: {
      variants: {
        main: { base: { background: solid('{vars.panel}') } },
        item: {
          base: { shape: 'pill', foreground: '{vars.ink}' },
          states: { hovered: { background: solid('{vars.wash}') }, selected: { background: solid('{vars.wash}'), foreground: '{vars.key}' } },
        },
      },
    },
    sidebar: {
      variants: {
        root: { base: { background: solid('{vars.panel}') } },
        item: {
          base: { shape: 'pill', hoverBackground: solid('{vars.wash}'), selectedBackground: solid('{vars.wash}') },
          states: { selected: { background: solid('{vars.wash}'), foreground: '{vars.key}' } },
        },
      },
    },
  }),
});
