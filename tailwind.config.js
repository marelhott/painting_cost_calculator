/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Updated to dark green
        'primary': '#1B4332', // Dark green for header and main elements
        'secondary': '#40916C', // Medium green for secondary elements
        'accent': '#FCD34D', // Warm yellow (accent) - yellow-300
        
        // Background Colors
        'background': '#FFFFFF', // Pure white (background) - white
        'surface': '#F0F8FF', // Light blue surface - alice blue
        
        // Text Colors
        'text': {
          'primary': '#111827', // Near-black (text primary) - gray-900
          'secondary': '#6B7280', // Balanced gray (text secondary) - gray-500
        },
        
        // Status Colors
        'success': '#10B981', // Confident green (success) - emerald-500
        'warning': '#F59E0B', // Amber (warning) - amber-500
        'error': '#EF4444', // Clear red (error) - red-500
        
        // Border Colors
        'border': '#E5E7EB', // Light gray (border) - gray-200
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'md': '6px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      scale: {
        '102': '1.02',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}