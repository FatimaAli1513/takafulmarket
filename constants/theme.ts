/**
 * Takaful Market - Luxury Accessories Brand Theme
 * Premium color scheme with gold accents
 */

import { Platform } from 'react-native';

// Brand Colors
export const BrandColors = {
  // Primary - Rich Black & Gold
  primary: '#1A1A1A',
  primaryDark: '#0D0D0D',
  gold: '#D4AF37',
  goldLight: '#F4E4BA',
  goldDark: '#B8960C',
  
  // Secondary
  cream: '#FFF8E7',
  ivory: '#FFFFF0',
  charcoal: '#2D2D2D',
  
  // Accent
  burgundy: '#800020',
  bronze: '#CD7F32',
  
  // Neutrals
  white: '#FFFFFF',
  offWhite: '#F9F9F9',
  lightGray: '#E5E5E5',
  gray: '#888888',
  darkGray: '#444444',
  black: '#000000',
  
  // Status
  success: '#2E7D32',
  warning: '#F9A825',
  error: '#C62828',
  info: '#1565C0',
};

const tintColorLight = BrandColors.gold;
const tintColorDark = BrandColors.gold;

export const Colors = {
  light: {
    text: BrandColors.primary,
    textSecondary: BrandColors.gray,
    background: BrandColors.white,
    backgroundSecondary: BrandColors.offWhite,
    tint: tintColorLight,
    icon: BrandColors.darkGray,
    tabIconDefault: BrandColors.gray,
    tabIconSelected: BrandColors.gold,
    card: BrandColors.white,
    border: BrandColors.lightGray,
    primary: BrandColors.gold,
    primaryDark: BrandColors.goldDark,
  },
  dark: {
    text: BrandColors.white,
    textSecondary: BrandColors.lightGray,
    background: BrandColors.primaryDark,
    backgroundSecondary: BrandColors.primary,
    tint: tintColorDark,
    icon: BrandColors.lightGray,
    tabIconDefault: BrandColors.gray,
    tabIconSelected: BrandColors.gold,
    card: BrandColors.charcoal,
    border: BrandColors.darkGray,
    primary: BrandColors.gold,
    primaryDark: BrandColors.goldDark,
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
