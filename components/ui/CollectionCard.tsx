import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { BrandColors, BorderRadius, FontSizes, FontWeights, Spacing, Shadows } from '@/constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

interface CollectionCardProps {
  title: string;
  description: string;
  image: string;
  onPress: () => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  description,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, Shadows.lg]}
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`View ${title} collection`}
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Explore →</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 300,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginRight: Spacing.lg,
    backgroundColor: BrandColors.charcoal,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSizes.sm,
    color: BrandColors.lightGray,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  badge: {
    backgroundColor: BrandColors.gold,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    color: BrandColors.primary,
  },
});
