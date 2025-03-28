import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const SynthwaveSunsetPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f3e8ff',
      100: '#e0cfff',
      200: '#c4a9ff',
      300: '#a073ff',
      400: '#924dff',
      500: '#9933FF', // MAIN
      600: '#7f29d9',
      700: '#6a21b3',
      800: '#53198c',
      900: '#3d1266',
      950: '#2b0c47',
    },
    secondary: {
      100: '#ffe0b3',
      200: '#ffc266',
      300: '#ffa733',
      400: '#ff951a',
      500: '#FF8C00', // MAIN
      600: '#cc7000',
      700: '#995400',
      800: '#663800',
      900: '#331c00',
    },
    accent: {
      300: '#ffef99',
      400: '#ffe866',
      500: '#FFD700', // MAIN
      600: '#ccad00',
    },
    highlight: {
      400: '#ff6688',
      500: '#FF3366', // MAIN
      600: '#cc2a52',
    },
    link: {
      500: '#FF33FF', // MAIN magenta
    },
    surface: {
      0: '#111827', // Dark background
      50: '#1e293b', // Cards
      100: '#2d3a4e', // Hovers
    },
    content: {
      default: '#F3F4F6',
      secondary: '#CBD5E1',
      strong: '#FFFFFF',
    },
  },
});
