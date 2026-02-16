import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { CollectionCard } from '@/components/ui/CollectionCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PromiseCard } from '@/components/ui/PromiseCard';
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
import {
  FEATURES,
  COLLECTIONS,
  getBestsellers,
  getNewArrivals,
  BRAND_PROMISES,
} from '@/constants/data';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const bestsellers = getBestsellers();
  const newArrivals = getNewArrivals();

  const handleShopNow = () => {
    router.push('/(tabs)/shop');
  };

  const handleCollectionPress = (collectionId: string) => {
    router.push(`/(tabs)/shop?collection=${collectionId}`);
  };

  const handleProductPress = (productId: string) => {
    Alert.alert('Product', `View product: ${productId}`);
  };

  const handleAddToCart = (productId: string) => {
    Alert.alert('Added to Cart', 'Product added to cart successfully!');
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
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            accessibilityLabel="Search"
            accessibilityRole="button"
          >
            <Ionicons name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            accessibilityLabel="Cart"
            accessibilityRole="button"
          >
            <Ionicons name="bag-outline" size={24} color={colors.text} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
                size="lg"
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
              "Crafted with Passion,{'\n'}Worn with Pride"
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
            colors={[BrandColors.gold, BrandColors.goldDark]}
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
              size="lg"
            />
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <View style={[styles.logoIcon, { backgroundColor: BrandColors.gold }]}>
              <Text style={[styles.logoText, { color: BrandColors.primary }]}>TM</Text>
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
    backgroundColor: BrandColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  logoText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: BrandColors.primary,
  },
  brandName: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  brandAccent: {
    color: BrandColors.gold,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
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
    paddingBottom: 120,
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
    color: BrandColors.gold,
    marginBottom: Spacing.lg,
    fontStyle: 'italic',
  },
  aboutText: {
    fontSize: FontSizes.md,
    color: BrandColors.lightGray,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  aboutBrand: {
    color: BrandColors.gold,
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
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: BrandColors.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  ctaSubtitle: {
    fontSize: FontSizes.md,
    color: BrandColors.charcoal,
    marginBottom: Spacing.lg,
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
});

export default HomeScreen;
