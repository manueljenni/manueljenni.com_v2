module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './public/**/*.html',
    './public/**/*.js'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter'],
    },
    extend: {
      colors: {
        'accentColor': '#86c4d5',
        'accentColorHover': '#d2e9f0',
        'accentColorOLD': '#C1E2E8',//#3697a8
        'highlightColor': {
          '400': '#3F76B5',
          '200': '#a4c3e1',
        }
      },
      maxWidth: {
        '1/3': '33%',
      },
      fontSize: {
        '2.5xl': '1.65rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}