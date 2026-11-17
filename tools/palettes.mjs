// Palette data for the generated themes (see build-themes.mjs).
//
// Each mode has: bg (page), surface (cards/panels), raised, muted (hover and selection fill), border, text,
// subtext (secondary text), success, danger, and `accents` (name -> colour). `default` is the signature accent;
// the dark-mode colour of each accent is the swatch shown in Settings. `radius` is the theme's default corner radius.

/** @typedef {{bg:string,surface:string,raised:string,muted:string,border:string,text:string,subtext:string,success:string,danger:string,accents:Record<string,string>}} Mode */
/** @typedef {{name:string,blurb:string,upstream:string,holder:string,default:string,radius:number,dark:Mode,light:Mode}} Palette */

/** @type {Record<string, Palette>} */
export const PALETTES = {
  dracula: {
    name: 'Dracula',
    blurb: 'The classic dark theme with vivid purple and pink, and its light sibling Alucard.',
    upstream: 'https://draculatheme.com',
    holder: 'Dracula Theme authors',
    default: 'purple',
    radius: 8,
    dark: {
      bg: '#282a36', surface: '#21222c', raised: '#343746', muted: '#343746', border: '#44475a',
      text: '#f8f8f2', subtext: '#a4abd0', success: '#50fa7b', danger: '#ff5555',
      accents: { purple: '#bd93f9', pink: '#ff79c6', cyan: '#8be9fd', green: '#50fa7b', orange: '#ffb86c', yellow: '#f1fa8c' },
    },
    light: {
      bg: '#fffbeb', surface: '#fffef5', raised: '#ffffff', muted: '#f1ecd8', border: '#cfcfde',
      text: '#1f1f1f', subtext: '#6c664b', success: '#14710a', danger: '#cb3a2a',
      accents: { purple: '#644ac9', pink: '#a3144d', cyan: '#036a96', green: '#14710a', orange: '#a34d14', yellow: '#846e15' },
    },
  },
  nord: {
    name: 'Nord',
    blurb: 'An arctic, north-bluish palette: calm polar-night greys and cool frost accents.',
    upstream: 'https://www.nordtheme.com',
    holder: 'Arctic Ice Studio',
    default: 'frost',
    radius: 4,
    dark: {
      bg: '#2e3440', surface: '#3b4252', raised: '#434c5e', muted: '#434c5e', border: '#4c566a',
      text: '#eceff4', subtext: '#aab3c5', success: '#a3be8c', danger: '#bf616a',
      accents: { frost: '#88c0d0', blue: '#81a1c1', teal: '#8fbcbb', green: '#a3be8c', orange: '#d08770', purple: '#b48ead' },
    },
    light: {
      bg: '#eceff4', surface: '#e5e9f0', raised: '#ffffff', muted: '#dde3ec', border: '#d0d6e2',
      text: '#2e3440', subtext: '#596478', success: '#5f8a46', danger: '#bf616a',
      accents: { frost: '#5e81ac', blue: '#4a6fa5', teal: '#4f8c8b', green: '#5f8a46', orange: '#b4623f', purple: '#8d6a8c' },
    },
  },
  catppuccin: {
    name: 'Catppuccin',
    blurb: 'Soothing pastels: Latte by day, Mocha by night, with your pick of accent.',
    upstream: 'https://catppuccin.com',
    holder: 'Catppuccin',
    default: 'mauve',
    radius: 12,
    dark: {
      bg: '#1e1e2e', surface: '#181825', raised: '#313244', muted: '#313244', border: '#45475a',
      text: '#cdd6f4', subtext: '#a6adc8', success: '#a6e3a1', danger: '#f38ba8',
      accents: { mauve: '#cba6f7', blue: '#89b4fa', pink: '#f5c2e7', green: '#a6e3a1', peach: '#fab387', red: '#f38ba8', teal: '#94e2d5', lavender: '#b4befe' },
    },
    light: {
      bg: '#eff1f5', surface: '#e6e9ef', raised: '#ffffff', muted: '#ccd0da', border: '#bcc0cc',
      text: '#4c4f69', subtext: '#6c6f85', success: '#40a02b', danger: '#d20f39',
      accents: { mauve: '#8839ef', blue: '#1e66f5', pink: '#ea76cb', green: '#40a02b', peach: '#fe640b', red: '#d20f39', teal: '#179299', lavender: '#7287fd' },
    },
  },
  gruvbox: {
    name: 'Gruvbox',
    blurb: 'Retro groove: warm, earthy, low-contrast colours that are easy on the eyes.',
    upstream: 'https://github.com/morhetz/gruvbox',
    holder: 'Pavel Pertsev',
    default: 'orange',
    radius: 2,
    dark: {
      bg: '#282828', surface: '#32302f', raised: '#3c3836', muted: '#3c3836', border: '#504945',
      text: '#ebdbb2', subtext: '#a89984', success: '#b8bb26', danger: '#fb4934',
      accents: { orange: '#fe8019', yellow: '#fabd2f', green: '#b8bb26', aqua: '#8ec07c', blue: '#83a598', purple: '#d3869b' },
    },
    light: {
      bg: '#fbf1c7', surface: '#f2e5bc', raised: '#fdf6d8', muted: '#ebdbb2', border: '#d5c4a1',
      text: '#3c3836', subtext: '#7c6f64', success: '#79740e', danger: '#9d0006',
      accents: { orange: '#af3a03', yellow: '#b57614', green: '#79740e', aqua: '#427b58', blue: '#076678', purple: '#8f3f71' },
    },
  },
  solarized: {
    name: 'Solarized',
    blurb: 'Precision colours for machines and people: the original dark and light pair.',
    upstream: 'https://ethanschoonover.com/solarized',
    holder: 'Ethan Schoonover',
    default: 'blue',
    radius: 2,
    dark: {
      bg: '#002b36', surface: '#073642', raised: '#0c4350', muted: '#073642', border: '#13505d',
      text: '#93a1a1', subtext: '#839496', success: '#859900', danger: '#dc322f',
      accents: { blue: '#268bd2', cyan: '#2aa198', green: '#859900', yellow: '#b58900', orange: '#cb4b16', violet: '#6c71c4' },
    },
    light: {
      bg: '#fdf6e3', surface: '#eee8d5', raised: '#fffbee', muted: '#eee8d5', border: '#ddd6c1',
      text: '#586e75', subtext: '#839496', success: '#859900', danger: '#dc322f',
      accents: { blue: '#268bd2', cyan: '#2aa198', green: '#859900', yellow: '#b58900', orange: '#cb4b16', violet: '#6c71c4' },
    },
  },
  'tokyo-night': {
    name: 'Tokyo Night',
    blurb: 'A clean dark theme inspired by the lights of downtown Tokyo, with a Day variant.',
    upstream: 'https://github.com/enkia/tokyo-night-vscode-theme',
    holder: 'enkia',
    default: 'blue',
    radius: 6,
    dark: {
      bg: '#1a1b26', surface: '#16161e', raised: '#24283b', muted: '#292e42', border: '#3b4261',
      text: '#c0caf5', subtext: '#7982a9', success: '#9ece6a', danger: '#f7768e',
      accents: { blue: '#7aa2f7', purple: '#bb9af7', cyan: '#7dcfff', green: '#9ece6a', orange: '#ff9e64', red: '#f7768e' },
    },
    light: {
      bg: '#e1e2e7', surface: '#d5d6db', raised: '#eceef3', muted: '#c8cad3', border: '#b4b6c4',
      text: '#3760bf', subtext: '#6172b0', success: '#587539', danger: '#f52a65',
      accents: { blue: '#2e7de9', purple: '#9854f1', cyan: '#007197', green: '#587539', orange: '#b15c00', red: '#f52a65' },
    },
  },
  'rose-pine': {
    name: 'Rosé Pine',
    blurb: 'All natural pine, faux fur and a bit of soho vibes: soft and low-contrast.',
    upstream: 'https://rosepinetheme.com',
    holder: 'Rosé Pine',
    default: 'iris',
    radius: 10,
    dark: {
      bg: '#191724', surface: '#1f1d2e', raised: '#26233a', muted: '#26233a', border: '#403d52',
      text: '#e0def4', subtext: '#908caa', success: '#9ccfd8', danger: '#eb6f92',
      accents: { iris: '#c4a7e7', rose: '#ebbcba', love: '#eb6f92', gold: '#f6c177', pine: '#3e8fb0', foam: '#9ccfd8' },
    },
    light: {
      bg: '#faf4ed', surface: '#fffaf3', raised: '#ffffff', muted: '#f2e9e1', border: '#dfdad9',
      text: '#575279', subtext: '#797593', success: '#56949f', danger: '#b4637a',
      accents: { iris: '#907aa9', rose: '#d7827e', love: '#b4637a', gold: '#ea9d34', pine: '#286983', foam: '#56949f' },
    },
  },
  one: {
    name: 'One',
    blurb: "Atom's One Dark and One Light: the balanced editor classics.",
    upstream: 'https://github.com/atom/one-dark-syntax',
    holder: 'GitHub, Inc. (Atom)',
    default: 'blue',
    radius: 4,
    dark: {
      bg: '#282c34', surface: '#21252b', raised: '#2c313a', muted: '#2c313a', border: '#3e4451',
      text: '#abb2bf', subtext: '#7f848e', success: '#98c379', danger: '#e06c75',
      accents: { blue: '#61afef', purple: '#c678dd', cyan: '#56b6c2', green: '#98c379', yellow: '#e5c07b', orange: '#d19a66' },
    },
    light: {
      bg: '#fafafa', surface: '#f0f0f1', raised: '#ffffff', muted: '#eaeaeb', border: '#dbdbdc',
      text: '#383a42', subtext: '#696c77', success: '#50a14f', danger: '#e45649',
      accents: { blue: '#4078f2', purple: '#a626a4', cyan: '#0184bc', green: '#50a14f', yellow: '#c18401', orange: '#986801' },
    },
  },
  github: {
    name: 'GitHub',
    blurb: 'GitHub Primer colours: familiar, neutral and quietly blue.',
    upstream: 'https://primer.style',
    holder: 'GitHub, Inc. (Primer)',
    default: 'blue',
    radius: 6,
    dark: {
      bg: '#0d1117', surface: '#161b22', raised: '#1c2128', muted: '#21262d', border: '#30363d',
      text: '#e6edf3', subtext: '#8b949e', success: '#3fb950', danger: '#f85149',
      accents: { blue: '#2f81f7', green: '#3fb950', purple: '#a371f7', orange: '#db6d28', red: '#f85149', yellow: '#d29922' },
    },
    light: {
      bg: '#ffffff', surface: '#f6f8fa', raised: '#ffffff', muted: '#eaeef2', border: '#d0d7de',
      text: '#1f2328', subtext: '#656d76', success: '#1a7f37', danger: '#cf222e',
      accents: { blue: '#0969da', green: '#1a7f37', purple: '#8250df', orange: '#bc4c00', red: '#cf222e', yellow: '#9a6700' },
    },
  },
};
