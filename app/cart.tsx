import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button } from '@/components/ui/Button';
import {
  BrandColors,
  Colors,
  FontSizes,
  FontWeights,
  Spacing,
  BorderRadius,
  Shadows,
} from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useCart } from '@/context/CartContext';

const CartScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleGoBack = () => {
    router.back();
  };

  const handleCheckout = () => {
    Alert.alert(
      'Order Placed!',
      `Your order of Rs. ${getCartTotal().toLocaleString()} has been placed successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.back();
          },
        },
      ]
    );
  };

  const handleQuantityChange = (productId: string, change: number, currentQty: number) => {
    const newQty = currentQty + change;
    updateQuantity(productId, newQty);
  };

  const renderCartItem = ({ item }: { item: { product: any; quantity: number } }) => {
    const discount = item.product.originalPrice
      ? Math.round(
          ((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100
        )
      : 0;

    return (
      <View style={[styles.cartItem, { backgroundColor: colors.card }, Shadows.sm]}>
        <Image
          source={{ uri: item.product.image }}
          style={styles.productImage}
          contentFit="cover"
        />
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: colors.text }]} numberOfLines={2}>
            {item.product.name}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>Rs. {item.product.price.toLocaleString()}</Text>
            {discount > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{discount}%</Text>
              </View>
            )}
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: colors.background }]}
              onPress={() => handleQuantityChange(item.product.id, -1, item.quantity)}
              accessibilityLabel="Decrease quantity"
            >
              <Ionicons name="remove" size={18} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.quantityText, { color: colors.text }]}>{item.quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: colors.background }]}
              onPress={() => handleQuantityChange(item.product.id, 1, item.quantity)}
              accessibilityLabel="Increase quantity"
            >
              <Ionicons name="add" size={18} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.product.id)}
          accessibilityLabel="Remove from cart"
        >
          <Ionicons name="trash-outline" size={20} color={BrandColors.burgundy} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="bag-outline" size={80} color={BrandColors.gold} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>Your Cart is Empty</Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Looks like you haven't added any items to your cart yet.
      </Text>
      <Button
        title="Start Shopping"
        onPress={handleGoBack}
        variant="primary"
        size="lg"
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Cart</Text>
        <View style={styles.headerRight}>
          {cartItems.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Clear Cart', 'Are you sure you want to clear all items?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear', style: 'destructive', onPress: clearCart },
                ])
              }
              accessibilityLabel="Clear cart"
            >
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          {/* Cart Items */}
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Summary Section */}
          <View style={[styles.summaryContainer, { backgroundColor: colors.card }, Shadows.lg]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                Rs. {getCartTotal().toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Delivery</Text>
              <Text style={[styles.freeText]}>FREE</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
              <Text style={styles.totalValue}>Rs. {getCartTotal().toLocaleString()}</Text>
            </View>
            <Button
              title="Proceed to Checkout"
              onPress={handleCheckout}
              variant="primary"
              size="lg"
              fullWidth
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  headerRight: {
    width: 44,
    alignItems: 'flex-end',
  },
  clearText: {
    fontSize: FontSizes.sm,
    color: BrandColors.burgundy,
    fontWeight: FontWeights.semibold,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: 200,
  },
  cartItem: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
  },
  productInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: BrandColors.gold,
  },
  discountBadge: {
    backgroundColor: BrandColors.burgundy,
    paddingVertical: 2,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BrandColors.lightGray,
  },
  quantityText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyIconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: BrandColors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: FontSizes.md,
  },
  summaryValue: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  freeText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: BrandColors.success,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  totalLabel: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  totalValue: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: BrandColors.gold,
  },
});

export default CartScreen;
