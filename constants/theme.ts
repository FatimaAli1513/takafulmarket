/**
 * Takaful Market - Luxury Accessories Brand Theme
 * Premium color scheme with gold accents
 */

import { Platform } from 'react-native';

// Brand Colors - Premium Luxury Theme (Brown + White)
export const BrandColors = {
  // Primary - Deep Brown (Main Brand Color)
  primary: '#4A2C2A',      // Deep warm brown (main accent)
  primaryDark: '#2C1810',  // Darker brown
  primaryLight: '#5D3D3A', // Lighter brown
  
  // Accent Colors
  gold: '#4A2C2A',         // Using brown instead of gold
  goldLight: '#8B6F6D',    // Muted brown
  goldDark: '#3D2320',     // Dark brown
  
  // Brown Shades (Earthy tones from image)
  chocolate: '#4A2C2A',    // Rich chocolate brown
  coffee: '#6B4842',       // Coffee brown
  leather: '#8B6B61',      // Leather brown
  tan: '#A68B7B',          // Tan/light brown
  
  // Secondary
  cream: '#FDF8F5',        // Warm cream
  ivory: '#FAF5F2',        // Ivory white
  charcoal: '#2D2D2D',     // Deep charcoal (belt color)
  
  // Accent
  burgundy: '#4A2C2A',     // Brown accent
  bronze: '#8B6B61',       // Bronze/leather
  
  // Neutrals
  white: '#FFFFFF',        // Crisp white (for text)
  offWhite: '#FAFAFA',
  lightGray: '#E8E0DC',
  gray: '#7A6A62',
  darkGray: '#4A4039',
  black: '#1A1512',
  
  // Warm Amber Glow
  amber: '#D4A574',        // Warm amber highlight
  warmLight: '#F5E6D3',    // Warm light tone
  
  // Status
  success: '#4A7C59',
  warning: '#C9956C',
  error: '#8B4A4A',
  info: '#5B7899',
};

const tintColorLight = BrandColors.primary;
const tintColorDark = BrandColors.white;

export const Colors = {
  light: {
    text: BrandColors.primaryDark,
    textSecondary: BrandColors.gray,
    background: BrandColors.white,
    backgroundSecondary: BrandColors.cream,
    tint: tintColorLight,
    icon: BrandColors.primary,
    tabIconDefault: BrandColors.tan,
    tabIconSelected: BrandColors.primary,
    card: BrandColors.white,
    border: BrandColors.lightGray,
    primary: BrandColors.primary,
    primaryDark: BrandColors.primaryDark,
  },
  dark: {
    text: BrandColors.white,
    textSecondary: BrandColors.lightGray,
    background: BrandColors.primaryDark,
    backgroundSecondary: BrandColors.primary,
    tint: tintColorDark,
    icon: BrandColors.white,
    tabIconDefault: BrandColors.tan,
    tabIconSelected: BrandColors.white,
    card: BrandColors.primary,
    border: BrandColors.coffee,
    primary: BrandColors.white,
    primaryDark: BrandColors.cream,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 40,
};

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'System',
    mono: 'Courier',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
