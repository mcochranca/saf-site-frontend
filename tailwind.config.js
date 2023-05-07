const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      // colors: {
      //   "MITRE-blue": "var(--color-MITRE-blue)",
      //   "MITRE-highlighter": "var(--color-MITRE-highlighter)",
      //   "MITRE-dark-navy": "var(--color-MITRE-dark-navy)",
      //   "MITRE-navy": "var(--color-MITRE-navy)",
      //   "MITRE-light-blue": "var(--color-MITRE-light-blue)",
      //   "MITRE-black": "var(--color-MITRE-black)",
      //   "MITRE-dark-gray": "var(--color-MITRE-dark-gray)",
      //   "MITRE-silver": "var(--color-MITRE-silver)",
      //   "MITRE-light-silver": "var(--color-MITRE-light-silver)",
      //   "MITRE-white": "var(--color-MITRE-white)",
      //   "dark-bg": "var(--color-DARKMODE-dark-bg)",
      //   "dark-text": "var(--color-DARKMODE-dark-text)",
      // },


      colors: {
        light: {
          'text': '#111921',
          'header': '#2563eb',
          'subtext': '#7E8284',
          'hover': '#111921',
          'icon-primary': '#2563eb',
          'highlighter': '#FFF601',
          'dropshadow': '#000000',
          'blur': '#000000',
          'focus': '',
          'code': '',
          'backdrop-primary': '#ffffff',
          'backdrop-secondary': '#f1f3f4',
          'backdrop-tertiary': '#d1d5db',
          'border-primary': '#87deff',
        },
        dark: {
          'text': '#d1d5db',
          'header': '#61a3eb',
          'subtext': '#9ca3af',
          'hover': '#111921',
          'icon-primary': '#2563eb',
          'highlighter': '',
          'dropshadow': '#6b7280',
          'focus': '',
          'code': '',
          'backdrop-primary': '#1F1A24',
          'backdrop-secondary': '#4b5563',
          'backdrop-tertiary': '#d1d5db',
          'border-primary': '#87deff',
        },
        btn: {
          light: {
            'primary': '#0b2338',
            'secondary': '#ffffff',
            'tertiary': '',
            'danger': '',
            'disabled': '#9ca3af',
            'primary-text': '#83d9fa',
            'secondary-text': '#0b2338',
            'tertiary-text': '',
            'danger-text': '',
            'disabled-text': '#000000',
            'primary-hover': '#ffffff',
            'secondary-hover': '#0b2338',
            'tertiary-hover': '',
            'danger-hover': '',
            'primary-hover-text': '#0b2338',
            'secondary-hover-text': '#83d9fa',
            'tertiary-hover-text': '',
            'danger-hover-text': '',
            'primary-border': '#87deff',
            'secondary-border': '#87deff',
            'tertiary-border': '',
            'danger-border': '',
          },
          dark: {
            'primary': '',
            'secondary': '',
            'tertiary': '',
            'danger': '',
            'disabled': '#9ca3af',
            'primary-text': '',
            'secondary-text': '',
            'tertiary-text': '',
            'danger-text': '',
            'disabled-text': '#000000',
            'primary-hover': '',
            'secondary-hover': '',
            'tertiary-hover': '',
            'danger-hover': '',
          },
        },
        nav: {
          light: {
            'active': '#005b94',
            'hover': '#7E8284',
            'inactive': '#111921',
            'disabled': '',
          },
          dark: {
            'active': '#0ea5e9',
            'hover': '#d1d5db',
            'inactive': '#d1d5db',
            'disabled': '',
          },
        },
        mitre: {
          blue: '#005B94',
          highlighter: '#FFF601',
          'dark-navy': '#0B2338',
          navy: '#0D2F4F',
          'light-blue': '#87DEFF',
          black: '#111921',
          'dark-gray': '#7E8284',
          silver: '#D4D4D3',
          'light-silver': '#F1F3F4',
        },
      },
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}


