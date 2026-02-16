import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { CollectionCard } from '@/components/ui/CollectionCard';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { PromiseCard } from '@/components/ui/PromiseCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  BRAND_PROMISES,
  COLLECTIONS,
  FEATURES,
  getBestsellers,
  getNewArrivals,
} from '@/constants/data';
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

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { addToCart, getCartItemCount } = useCart();

  const bestsellers = getBestsellers();
  const newArrivals = getNewArrivals();
  const cartItemCount = getCartItemCount();

  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = () => {
    if (!formData.name || !formData.phone || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Your message has been sent! We will contact you soon.', [
      {
        text: 'OK',
        onPress: () => {
          setFormData({ name: '', email: '', phone: '', message: '' });
          setShowContactForm(false);
        },
      },
    ]);
  };

  const handleShopNow = () => {
    router.push('/(tabs)/shop');
  };

  const handleCollectionPress = (collectionId: string) => {
    router.push(`/(tabs)/shop?collection=${collectionId}`);
  };

  const handleProductPress = (productId: string) => {
    // Product detail view can be added later
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
  };

  const handleOpenCart = () => {
    router.push('/cart');
  };

  const handleViewAllBestsellers = () => {
    router.push('/(tabs)/shop');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>TM</Text>
          </View>
          <Text style={[styles.brandName, { color: colors.text }]}>
            Takaful<Text style={styles.brandAccent}>Market</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleOpenCart}
          accessibilityLabel="Cart"
          accessibilityRole="button"
        >
          <Ionicons name="bag-outline" size={24} color={colors.text} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800' }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <View style={styles.saleBadge}>
                <Text style={styles.saleBadgeText}>UP TO 50% OFF</Text>
              </View>
              <Text style={styles.heroTitle}>Elevate Your{'\n'}Style Every Day!</Text>
              <Text style={styles.heroSubtitle}>
                Premium watches, belts & wallets crafted with passion
              </Text>
              <Button
                title="Shop Now"
                onPress={handleShopNow}
                variant="primary"
                size="md"
              />
            </View>
          </LinearGradient>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuresScroll}
          >
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon as any}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </ScrollView>
        </View>

        {/* Collections Section */}
        <View style={styles.section}>
          <SectionHeader
            title="Exclusive Collections"
            subtitle="Handpicked luxury for you"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsScroll}
          >
            {COLLECTIONS.map((collection) => (
              <CollectionCard
                key={collection.id}
                title={collection.title}
                description={collection.description}
                image={collection.image}
                onPress={() => handleCollectionPress(collection.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Bestsellers Section */}
        <View style={styles.section}>
          <SectionHeader
            title="Bestsellers"
            subtitle="Most loved by our customers"
            showViewAll
            onViewAll={handleViewAllBestsellers}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                isNew={product.isNew}
                onPress={() => handleProductPress(product.id)}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* About Section */}
        <View style={[styles.section, styles.aboutSection]}>
          <LinearGradient
            colors={[BrandColors.primary, BrandColors.charcoal]}
            style={styles.aboutGradient}
          >
            <Text style={styles.aboutQuote}>
              {'"Crafted with Passion,\nWorn with Pride"'}
            </Text>
            <Text style={styles.aboutText}>
              At <Text style={styles.aboutBrand}>Takaful Market</Text>, we believe that
              accessories are more than just items—they are a statement of your personality.
              Our journey started with a simple goal: to provide high-quality, genuine leather
              goods that last a lifetime.
            </Text>
            <Text style={styles.aboutText}>
              Every watch, belt, and wallet in our collection is hand-selected and quality-checked
              to ensure you get nothing but the best.
            </Text>
          </LinearGradient>
        </View>

        {/* New Arrivals Section */}
        <View style={styles.section}>
          <SectionHeader
            title="New Arrivals"
            subtitle="Fresh styles just dropped"
            showViewAll
            onViewAll={handleViewAllBestsellers}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                isNew={product.isNew}
                onPress={() => handleProductPress(product.id)}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Brand Promise Section */}
        <View style={styles.section}>
          <SectionHeader
            title="The Brand Promise"
            subtitle="Why customers trust us"
          />
          <View style={styles.promisesContainer}>
            {BRAND_PROMISES.map((promise) => (
              <PromiseCard
                key={promise.id}
                icon={promise.icon as any}
                title={promise.title}
                description={promise.description}
                stat={promise.stat}
              />
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[BrandColors.primary, BrandColors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>Ready to Upgrade{'\n'}Your Style?</Text>
            <Text style={styles.ctaSubtitle}>
              Join 5,000+ happy customers today
            </Text>
            <Button
              title="Shop Collection Now"
              onPress={handleShopNow}
              variant="secondary"
              size="md"
            />
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <View style={[styles.logoIcon, { backgroundColor: BrandColors.primary }]}>
              <Text style={[styles.logoText, { color: BrandColors.white }]}>TM</Text>
            </View>
            <Text style={styles.footerBrand}>TakafulMarket</Text>
          </View>
          <Text style={styles.footerText}>
            Crafted with ❤️ in Pakistan
          </Text>
          <Text style={styles.copyright}>
            © 2026 TakafulMarket. All rights reserved.
          </Text>
        </View>
      </ScrollView>

      {/* Floating Contact Button */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 110 }]}
        onPress={() => setShowContactForm(true)}
        accessibilityLabel="Contact Us"
        accessibilityRole="button"
      >
        <Ionicons name="chatbubble-ellipses" size={28} color={BrandColors.white} />
      </TouchableOpacity>

      {/* Contact Form Modal */}
      <Modal
        visible={showContactForm}
        animationType="slide"
        transparent
        onRequestClose={() => setShowContactForm(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={[styles.modalContainer, { backgroundColor: colors.background, paddingBottom: insets.bottom + Spacing.lg }]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Contact Us</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowContactForm(false)}
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: Spacing.xl }}
            >
              {/* Form Fields */}
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Name *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                  placeholder="Your name"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                  placeholder="your@email.com"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Phone *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                  placeholder="+92 320 5919383"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Message *</Text>
                <TextInput
                  style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                  placeholder="How can we help you?"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.message}
                  onChangeText={(value) => handleInputChange('message', value)}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <Button
                title="Send Message"
                onPress={handleSubmitForm}
                variant="primary"
                size="lg"
                fullWidth
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  logoText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
  },
  brandName: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  brandAccent: {
    color: BrandColors.amber,
  },
  iconButton: {
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
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: BrandColors.burgundy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
  },
  scrollContent: {
    // paddingBottom is set dynamically with insets
  },
  heroSection: {
    height: 450,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: Spacing.xl,
  },
  heroContent: {
    gap: Spacing.md,
  },
  saleBadge: {
    backgroundColor: BrandColors.burgundy,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  saleBadgeText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: FontSizes.hero,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
    lineHeight: 48,
  },
  heroSubtitle: {
    fontSize: FontSizes.md,
    color: BrandColors.lightGray,
    marginBottom: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  featuresScroll: {
    paddingHorizontal: Spacing.lg,
  },
  collectionsScroll: {
    paddingHorizontal: Spacing.lg,
  },
  productsScroll: {
    paddingHorizontal: Spacing.lg,
  },
  aboutSection: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  aboutGradient: {
    padding: Spacing.xl,
  },
  aboutQuote: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: BrandColors.amber,
    marginBottom: Spacing.lg,
    fontStyle: 'italic',
  },
  aboutText: {
    fontSize: FontSizes.md,
    color: BrandColors.cream,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  aboutBrand: {
    color: BrandColors.amber,
    fontWeight: FontWeights.bold,
  },
  promisesContainer: {
    paddingHorizontal: Spacing.lg,
  },
  ctaSection: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  ctaGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: BrandColors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  ctaSubtitle: {
    fontSize: FontSizes.md,
    color: BrandColors.cream,
    marginBottom: Spacing.md,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: BrandColors.lightGray,
    marginHorizontal: Spacing.lg,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  footerBrand: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: BrandColors.gray,
  },
  footerText: {
    fontSize: FontSizes.sm,
    color: BrandColors.gray,
    marginBottom: Spacing.xs,
  },
  copyright: {
    fontSize: FontSizes.xs,
    color: BrandColors.gray,
  },
  fab: {
    position: 'absolute',
    // bottom is set dynamically with insets
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
  },
  textArea: {
    height: 100,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
});

export default HomeScreen;
