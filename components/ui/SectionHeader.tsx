import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BrandColors, FontSizes, FontWeights, Spacing, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  showViewAll = false,
  onViewAll,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        )}
      </View>
      {showViewAll && (
        <TouchableOpacity
          onPress={handleViewAll}
          accessibilityRole="button"
          accessibilityLabel={`View all ${title}`}
        >
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.sm,
  },
  viewAll: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: BrandColors.gold,
  },
});
