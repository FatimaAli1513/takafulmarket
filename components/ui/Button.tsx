import { BorderRadius, BrandColors, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const PRIMARY_GRADIENT = [BrandColors.primary, BrandColors.charcoal] as const;

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    onPress();
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.base,
      ...styles[`size_${size}`],
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? BrandColors.tan : BrandColors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? BrandColors.lightGray : BrandColors.charcoal,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? BrandColors.tan : BrandColors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...styles.text,
      ...styles[`text_${size}`],
    };

    switch (variant) {
      case 'primary':
        return { ...baseTextStyle, color: BrandColors.white };
      case 'secondary':
        return { ...baseTextStyle, color: BrandColors.white };
      case 'outline':
        return { ...baseTextStyle, color: disabled ? BrandColors.tan : BrandColors.primary };
      case 'ghost':
        return { ...baseTextStyle, color: disabled ? BrandColors.tan : BrandColors.primary };
      default:
        return baseTextStyle;
    }
  };

  const buttonContent = loading ? (
    <ActivityIndicator color={BrandColors.white} size="small" />
  ) : (
    <Text style={[getTextStyle(), textStyle]}>{title}</Text>
  );

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={loading}
        activeOpacity={0.8}
        accessibilityLabel={accessibilityLabel || title}
        accessibilityRole="button"
        accessibilityState={{ disabled: loading }}
        style={[styles.gradientWrapper, fullWidth && styles.gradientFullWidth, style]}
      >
        <LinearGradient
          colors={PRIMARY_GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, styles[`size_${size}`], fullWidth && styles.fullWidth]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  gradientFullWidth: {
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  size_sm: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
  },
  size_md: {
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
  },
  size_lg: {
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
  },
  text: {
    fontWeight: FontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  text_sm: {
    fontSize: FontSizes.xs,
  },
  text_md: {
    fontSize: FontSizes.sm,
  },
  text_lg: {
    fontSize: FontSizes.md,
  },
});
