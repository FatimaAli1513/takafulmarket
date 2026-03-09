import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CATEGORIES, Product, getProductsByCategory } from '@/constants/data';
import {
  BorderRadius,
  BrandColors,
  Colors,
  FontSizes,
  FontWeights,
  Shadows,
  Spacing,
} from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 3) / 2;

const ShopScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { addToCart, getCartItemCount } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return getProductsByCategory(selectedCategory as Product['category'] | 'all');
  }, [selectedCategory]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => setSelectedProduct(null);

  const handleAddToCartFromModal = (productId: string) => {
    handleAddToCart(productId);
    closeProductModal();
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
  };

  const handleOpenCart = () => {
    router.push('/cart');
  };

  const cartItemCount = getCartItemCount();

  const renderCategoryItem = (category: { id: string; name: string; icon: string }) => {
    const isSelected = selectedCategory === category.id;

    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryItem,
          isSelected && styles.categoryItemActive,
          { backgroundColor: isSelected ? BrandColors.primary : colors.card },
        ]}
        onPress={() => handleCategoryPress(category.id)}
        accessibilityRole="button"
        accessibilityLabel={`${category.name} category`}
        accessibilityState={{ selected: isSelected }}
      >
        <Ionicons
          name={category.icon as any}
          size={20}
          color={isSelected ? BrandColors.white : colors.textSecondary}
        />
        <Text
          style={[
            styles.categoryText,
            { color: isSelected ? BrandColors.white : colors.text },
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const discount = item.originalPrice
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0;

    return (
      <TouchableOpacity
        style={[styles.productCard, { backgroundColor: colors.card }, Shadows.md]}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, Price: ${item.price} PKR`}
      >
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            contentFit="cover"
            transition={200}
          />
          {item.isNew && (
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

        <View style={styles.productContent}>
          <Text style={[styles.productName, { color: colors.text }]} numberOfLines={2}>
            {item.name}
          </Text>

          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < Math.floor(item.rating) ? 'star' : 'star-outline'}
                size={12}
                color={BrandColors.amber}
              />
            ))}
            <Text style={[styles.reviewCount, { color: colors.textSecondary }]}>
              ({item.reviews})
            </Text>
          </View>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>{item.price.toLocaleString()}</Text>
              {item.originalPrice ? (
                <Text style={[styles.originalPrice, { color: colors.textSecondary }]}>
                  {item.originalPrice.toLocaleString()}
                </Text>
              ) :
                <Text style={[styles.originalPrice, { color: colors.textSecondary }]}>
                </Text>
              }
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleAddToCart(item.id)}
            accessibilityLabel="Add to cart"
            activeOpacity={0.8}
            style={styles.addToCartButtonWrap}
          >
            <LinearGradient
              colors={[BrandColors.primary, BrandColors.charcoal]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addToCartButton}
            >
              <Ionicons name="bag-add-outline" size={16} color={BrandColors.white} />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Shop</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleOpenCart}
          accessibilityLabel="Cart"
        >
          <Ionicons name="bag-outline" size={24} color={colors.text} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map(renderCategoryItem)}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
          {filteredProducts.length} Products
        </Text>

      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={[styles.productsGrid, { paddingBottom: insets.bottom + 120 }]}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bag-outline" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No products found
            </Text>
          </View>
        }
      />

      {/* Product Detail Modal */}
      <Modal
        visible={selectedProduct !== null}
        transparent
        animationType="fade"
        onRequestClose={closeProductModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeProductModal}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={[styles.productModalCard, { backgroundColor: BrandColors.primary }]}
          >
            {selectedProduct && (
              <>
                <Text style={styles.productModalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.productModalPrice}>
                  Price: Rs. {selectedProduct.price.toLocaleString()}
                </Text>
                <Text style={styles.productModalDescription}>
                  {selectedProduct.description}
                </Text>
                <Text style={styles.productModalFeaturesTitle}>Features:</Text>
                {selectedProduct.features.map((f, i) => (
                  <Text key={i} style={styles.productModalFeature}>
                    • {f}
                  </Text>
                ))}
                <View style={styles.productModalActions}>
                  <TouchableOpacity
                    style={styles.productModalCancelBtn}
                    onPress={closeProductModal}
                  >
                    <Text style={styles.productModalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleAddToCartFromModal(selectedProduct.id)}
                    activeOpacity={0.8}
                    style={styles.productModalAddBtnWrap}
                  >
                    <LinearGradient
                      colors={[BrandColors.primary, BrandColors.charcoal]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.productModalAddBtn}
                    >
                      <Text style={styles.productModalAddText}>Add to Cart</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: BrandColors.burgundy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.white,
  },
  categoriesContainer: {
    marginBottom: Spacing.md,
  },
  categoriesScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  categoryItemActive: {
    backgroundColor: BrandColors.primary,
  },
  categoryText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  resultsCount: {
    fontSize: FontSizes.sm,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sortText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  productsGrid: {
    paddingHorizontal: Spacing.lg,
    // paddingBottom is set dynamically with insets
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  productCard: {
    width: CARD_WIDTH,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  productImageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: BrandColors.offWhite,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: BrandColors.primary,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  newBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
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
  productContent: {
    padding: Spacing.md,
  },
  productName: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.xs,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: 2,
  },
  reviewCount: {
    fontSize: FontSizes.xs,
    marginLeft: Spacing.xs,
  },
  priceRow: {
    marginBottom: Spacing.sm,
  },
  price: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: BrandColors.primary,
  },
  originalPrice: {
    fontSize: FontSizes.xs,
    textDecorationLine: 'line-through',
  },
  addToCartButtonWrap: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  addToCartText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl * 2,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    marginTop: Spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  productModalCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.lg,
  },
  productModalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
    marginBottom: Spacing.sm,
  },
  productModalPrice: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: BrandColors.cream,
    marginBottom: Spacing.md,
  },
  productModalDescription: {
    fontSize: FontSizes.md,
    color: BrandColors.cream,
    marginBottom: Spacing.md,
    lineHeight: 22,
  },
  productModalFeaturesTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: BrandColors.white,
    marginBottom: Spacing.xs,
  },
  productModalFeature: {
    fontSize: FontSizes.sm,
    color: BrandColors.cream,
    marginBottom: 2,
  },
  productModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  productModalAddBtnWrap: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  productModalCancelBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  productModalCancelText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: BrandColors.cream,
  },
  productModalAddBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  productModalAddText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
  },
});

export default ShopScreen;
