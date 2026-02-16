import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { BrandColors, BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/theme';

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
          backgroundColor: disabled ? BrandColors.gray : BrandColors.gold,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? BrandColors.lightGray : BrandColors.primary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? BrandColors.gray : BrandColors.gold,
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
        return { ...baseTextStyle, color: BrandColors.primary };
      case 'secondary':
        return { ...baseTextStyle, color: BrandColors.white };
      case 'outline':
        return { ...baseTextStyle, color: disabled ? BrandColors.gray : BrandColors.gold };
      case 'ghost':
        return { ...baseTextStyle, color: disabled ? BrandColors.gray : BrandColors.gold };
      default:
        return baseTextStyle;
    }
  };

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
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? BrandColors.primary : BrandColors.gold}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  size_sm: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
  },
  size_md: {
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
  },
  size_lg: {
    paddingVertical: 12,
    paddingHorizontal: Spacing.xl,
  },
  text: {
    fontWeight: FontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text_sm: {
    fontSize: FontSizes.sm,
  },
  text_md: {
    fontSize: FontSizes.md,
  },
  text_lg: {
    fontSize: FontSizes.lg,
  },
});
