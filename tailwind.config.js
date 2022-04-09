module.exports = {
  content: [
     "./dist/sections/*.liquid",
     "./dist/snippets/*.liquid",
     "./src/scripts/Vue/**/*.vue",
     "./dist/templates/**/*.liquid"
  ],
  theme: {
    screens: {
      'mobile': '375px',
      'tablet': '768px',
      'desktop': '1024px',
      'desktop-large': '1200px',
      'desktop-xl': '1440px'
    },
    fontFamily: {
      'main': ['overpass-regular', 'sans-serif']
    },
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'white': '#FFFFFF',
      'light-yellow': '#FAF6F0',
      'blue': '#2E8DE4',
      'red': '#DA3A3A',
      'darkblue': '#161823',
      'lightgrey': '#E6E6E6',
      'black': {
        900: '#FAFAFA',
        800: '#F2F2F2',
        700: '#E5E5E5',
        600: '#CCCCCC',
        500: '#B2B2B2',
        400: '#999999',
        300: '#666666',
        200: '#383838',
        150: '#333333',
        100: '#151414'
      }
    },
    borderRadius: {
      'none': '0',
      'xs': '1.3125rem',
      'sm': '1.4375rem',
      'md': '1.5625rem',
      'lg': '1.625rem',
    }, 
    fontSize: {
      'xxs': ['.8125rem', '1rem'],
      'xs': ['.875rem', '1.375rem'],
      'sm': ['.9375rem', '1.188rem'],
      'base': ['1rem', '1.35rem'],
      'large': ['1.125rem', '1.438rem'],
    },  
    extend: {
      spacing: {
        '0.75': '0.1875rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '25': '6.25rem',
        '26': '6.5rem',
        '22': '5.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        'screen-xl': '90rem',
      },
      letterSpacing: {
        'large': '0.005rem',
      },
      aspectRatio: {
        'product': '785 / 873',
        'banner': '293 / 186',
        'slider': '317 / 344',
        'insta-modal': '343 / 378'
      },
    }
  },
  plugins: [],
}