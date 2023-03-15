const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(({ addUtilities }) => {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
      '-moz-backface-visibility': 'visible',
      '-webkit-backface-visibility': 'visible',
      '-ms-backface-visibility': 'visible'
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
      '-moz-backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',
      '-ms-backface-visibility': 'hidden'
    }
  })
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      light: '#fbfbfc',
      dark: {
        lighter: '#eeeeee',
        light: '#666666',
        DEFAULT: '#333333'
      },
      gray: {
        light: '#f2f2f2',
        DEFAULT: '#cdcdcd',
        dark: '#b9b9b9'
      },
      blue: {
        100: '#e5f2fb',
        200: '#c6e8ff',
        300: '#377dff',
        400: '#007aff',
        500: '#1f3a56',
        600: '#172F53'
      },
      teal: '#2bcaa4',
      yellow: {
        DEFAULT: '#ffdc23',
        dark: '#ffc107'
      },
      error: {
        DEFAULT: '#f83131',
        dark: '#cc0707'
      },
      primary: '#04009a',
      secondary: '#0e67c8',
      success: '#04d65c',
      warning: '#ffb131'
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      spacing: {
        6.5: '1.625rem'
      },
      borderRadius: {
        '1.5xl': '14px'
      },
      inset: {
        0.05: '5px',
        4.5: '1.125rem'
      },
      backgroundImage: {
        skeleton:
          'linear-gradient(to right, #d9d9d9 0 %, rgba(0, 0, 0, 0.07) 20%, #d9d9d9 40 %, #d9d9d9 100%)'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        }
      },
      animation: {
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      boxShadow: {
        primary: '0 4px 6px rgba(4, 0, 154, 0.3)',
        secondary: '0 2px 8px rgba(14, 103, 200, 0.3)',
        error: '0 2px 8px rgba(248, 49, 49, 0.3)',
        dragdrop: '0 12px 24px rgba(104, 104, 104, 0.1)',
        dropdown: '0 12px 23px 10px rgba(150, 150, 150, 0.1)',
        auth: '0px 6px 12px rgba(158, 158, 158, 0.1)',
        sidebar: '18px 4px 35px rgba(0, 0, 0, 0.02)'
      },
      fontSize: {
        '2.5xl': ['1.75rem', '2.125rem'],
        '3.5xl': ['2rem', '2.375rem'],
        '0.5xs': ['0.625rem', '0.75rem']
      },
      minWidth: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem'
      },
      minHeight: {
        8: '2rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem'
      },
      scale: {
        85: '0.85'
      },
      zIndex: {
        header: '1000',
        sidebar: '1003',
        overlay: '1001',
        modal: '1004',
        notification: '1005'
      }
    }
  },
  plugins: [
    backfaceVisibility,
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}
