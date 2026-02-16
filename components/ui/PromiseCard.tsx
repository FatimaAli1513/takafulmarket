import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, BorderRadius, FontSizes, FontWeights, Spacing, Shadows, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface PromiseCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  stat?: string;
}

export const PromiseCard: React.FC<PromiseCardProps> = ({ icon, title, description, stat }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
        Shadows.sm,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`${title}: ${description}`}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color={BrandColors.gold} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
        {stat && <Text style={styles.stat}>{stat}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BrandColors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  stat: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: BrandColors.gold,
    marginTop: Spacing.xs,
  },
});
