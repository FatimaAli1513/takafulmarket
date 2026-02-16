import { BorderRadius, BrandColors, Colors, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        Shadows.md,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`${title}: ${description}`}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={32} color={BrandColors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: BrandColors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  description: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
});
