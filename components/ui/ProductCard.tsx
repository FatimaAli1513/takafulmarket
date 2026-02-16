import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, BorderRadius, FontSizes, FontWeights, Spacing, Shadows, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  onPress: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  image,
  rating,
  isNew = false,
  onPress,
  onAddToCart,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }, Shadows.md]}
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`${name}, Price: ${price} PKR`}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name={index < Math.floor(rating) ? 'star' : 'star-outline'}
              size={14}
              color={BrandColors.gold}
            />
          ))}
          <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
            ({rating.toFixed(1)})
          </Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>Rs. {price.toLocaleString()}</Text>
            {originalPrice && (
              <Text style={[styles.originalPrice, { color: colors.textSecondary }]}>
                Rs. {originalPrice.toLocaleString()}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
            accessibilityLabel="Add to cart"
            accessibilityRole="button"
          >
            <Ionicons name="bag-add" size={20} color={BrandColors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 175,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  imageContainer: {
    width: '100%',
    height: 175,
    backgroundColor: BrandColors.offWhite,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: BrandColors.gold,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  newBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    color: BrandColors.primary,
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: BrandColors.burgundy,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
  },
  content: {
    padding: Spacing.md,
  },
  name: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.xs,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  ratingText: {
    fontSize: FontSizes.xs,
    marginLeft: Spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: BrandColors.gold,
  },
  originalPrice: {
    fontSize: FontSizes.xs,
    textDecorationLine: 'line-through',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BrandColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
