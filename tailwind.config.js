module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js", "./components/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Deep space foundation
        primary: {
          DEFAULT: "#0a0a0f", // Deep space foundation
          50: "#f8f8f9", // Lightest primary tint
          100: "#e5e5e7", // Very light primary
          200: "#d1d1d4", // Light primary
          300: "#b8b8bd", // Medium light primary
          400: "#9f9fa6", // Medium primary
          500: "#86868f", // Base primary variant
          600: "#6d6d78", // Dark primary variant
          700: "#545461", // Darker primary
          800: "#3b3b4a", // Very dark primary
          900: "#222233", // Darkest primary
          950: "#0a0a0f", // Original primary
        },
        
        // Secondary Colors - Elevated surfaces
        secondary: {
          DEFAULT: "#1a1a2e", // Elevated surfaces
          50: "#f7f7f9", // Lightest secondary tint
          100: "#e8e8ec", // Very light secondary
          200: "#d9d9df", // Light secondary
          300: "#c1c1ca", // Medium light secondary
          400: "#a9a9b5", // Medium secondary
          500: "#9191a0", // Base secondary variant
          600: "#79798b", // Dark secondary variant
          700: "#616176", // Darker secondary
          800: "#494961", // Very dark secondary
          900: "#31314c", // Darkest secondary
          950: "#1a1a2e", // Original secondary
        },

        // Accent Colors - Electric energy
        accent: {
          DEFAULT: "#ff6b35", // Electric energy
          50: "#fff7f5", // Lightest accent tint
          100: "#ffede6", // Very light accent
          200: "#ffd9cc", // Light accent
          300: "#ffbfa6", // Medium light accent
          400: "#ff9570", // Medium accent
          500: "#ff6b35", // Original accent
          600: "#e55a2b", // Dark accent variant
          700: "#cc4a21", // Darker accent
          800: "#b33a17", // Very dark accent
          900: "#992a0d", // Darkest accent
          950: "#801a03", // Deepest accent
        },

        // Background and Surface
        background: "#fafafa", // Clean content canvas - gray-50
        surface: "#ffffff", // Pure interaction surfaces - white

        // Text Colors
        text: {
          primary: "#1a1a2e", // Authoritative readability
          secondary: "#6b7280", // Clear hierarchy - gray-500
        },

        // Status Colors
        success: {
          DEFAULT: "#10b981", // Positive reinforcement - emerald-500
          50: "#ecfdf5", // emerald-50
          100: "#d1fae5", // emerald-100
          500: "#10b981", // emerald-500
          600: "#059669", // emerald-600
          700: "#047857", // emerald-700
        },

        warning: {
          DEFAULT: "#f59e0b", // Attention without alarm - amber-500
          50: "#fffbeb", // amber-50
          100: "#fef3c7", // amber-100
          500: "#f59e0b", // amber-500
          600: "#d97706", // amber-600
          700: "#b45309", // amber-700
        },

        error: {
          DEFAULT: "#ef4444", // Helpful concern - red-500
          50: "#fef2f2", // red-50
          100: "#fee2e2", // red-100
          500: "#ef4444", // red-500
          600: "#dc2626", // red-600
          700: "#b91c1c", // red-700
        },

      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        jetbrains: ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        '7xl': ['4.5rem', { lineHeight: '1.2' }],
        '8xl': ['6rem', { lineHeight: '1.2' }],
        '9xl': ['8rem', { lineHeight: '1.2' }],
      },

      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dramatic': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
        '600': '600ms',
      },

      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}