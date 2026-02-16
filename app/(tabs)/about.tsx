import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import { BRAND_PROMISES, TESTIMONIALS } from '@/constants/data';

const { width } = Dimensions.get('window');

const AboutScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>About Us</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroQuote}>
                "Crafted with Passion,{'\n'}Worn with Pride"
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Story Section */}
        <View style={styles.section}>
          <View style={styles.storyContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="sparkles" size={32} color={BrandColors.primary} />
            </View>
            <Text style={[styles.storyTitle, { color: colors.text }]}>Our Story</Text>
            <Text style={[styles.storyText, { color: colors.textSecondary }]}>
              At <Text style={styles.brandHighlight}>Takaful Market</Text>, we believe that
              accessories are more than just items—they are a statement of your personality.
            </Text>
            <Text style={[styles.storyText, { color: colors.textSecondary }]}>
              Our journey started with a simple goal: to provide high-quality, genuine leather
              goods that last a lifetime. Every watch, belt, and wallet in our collection is
              hand-selected and quality-checked to ensure you get nothing but the best.
            </Text>
            <Text style={[styles.storyText, { color: colors.textSecondary }]}>
              Join thousands of happy customers who trust us for their daily essentials.
              At Takaful Market, we don't just sell accessories; we craft legacies.
            </Text>
          </View>
        </View>

        {/* Mission Section */}
        <View style={[styles.section, styles.missionSection]}>
          <LinearGradient
            colors={[BrandColors.primary, BrandColors.charcoal]}
            style={styles.missionGradient}
          >
            <Text style={styles.missionTitle}>Our Mission</Text>
            <Text style={styles.missionText}>
              "To provide premium quality accessories that empower individuals to express
              their unique style while ensuring exceptional craftsmanship and customer
              satisfaction."
            </Text>
            <View style={styles.missionStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>5,000+</Text>
                <Text style={styles.statLabel}>Happy Customers</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>74+</Text>
                <Text style={styles.statLabel}>Products</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.8★</Text>
                <Text style={styles.statLabel}>Average Rating</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Values Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Values</Text>
          <View style={styles.valuesContainer}>
            {BRAND_PROMISES.map((promise) => (
              <PromiseCard
                key={promise.id}
                icon={promise.icon as any}
                title={promise.title}
                description={promise.description}
              />
            ))}
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            What Our Customers Say
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialsScroll}
          >
            {TESTIMONIALS.map((testimonial) => (
              <View
                key={testimonial.id}
                style={[styles.testimonialCard, { backgroundColor: colors.card }, Shadows.md]}
              >
                <View style={styles.testimonialHeader}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>
                      {testimonial.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.testimonialInfo}>
                    <Text style={[styles.testimonialName, { color: colors.text }]}>
                      {testimonial.name}
                    </Text>
                    <View style={styles.ratingContainer}>
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <Ionicons
                          key={index}
                          name="star"
                          size={14}
                          color={BrandColors.amber}
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={[styles.testimonialComment, { color: colors.textSecondary }]}>
                  "{testimonial.comment}"
                </Text>
                <Text style={[styles.testimonialDate, { color: colors.textSecondary }]}>
                  {testimonial.date}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Why Choose Us Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Why Choose Us?</Text>
          <View style={styles.reasonsContainer}>
            {[
              {
                icon: 'checkmark-circle',
                title: '100% Genuine Products',
                description: 'Every item is authentic and quality-verified',
              },
              {
                icon: 'shield-checkmark',
                title: 'Secure Shopping',
                description: 'Your data and payments are always protected',
              },
              {
                icon: 'timer',
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping nationwide',
              },
              {
                icon: 'swap-horizontal',
                title: 'Easy Returns',
                description: '7-day hassle-free return policy',
              },
            ].map((reason, index) => (
              <View
                key={index}
                style={[styles.reasonItem, { borderColor: colors.border }]}
              >
                <View style={styles.reasonIcon}>
                  <Ionicons name={reason.icon as any} size={24} color={BrandColors.primary} />
                </View>
                <View style={styles.reasonContent}>
                  <Text style={[styles.reasonTitle, { color: colors.text }]}>
                    {reason.title}
                  </Text>
                  <Text style={[styles.reasonDescription, { color: colors.textSecondary }]}>
                    {reason.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for choosing Takaful Market ❤️
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
  },
  heroSection: {
    height: 280,
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
  },
  heroContent: {
    padding: Spacing.xl,
  },
  heroQuote: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: BrandColors.amber,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  storyContainer: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: BrandColors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  storyTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.md,
  },
  storyText: {
    fontSize: FontSizes.md,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  brandHighlight: {
    color: BrandColors.primary,
    fontWeight: FontWeights.bold,
  },
  missionSection: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  missionGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  missionTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: BrandColors.amber,
    marginBottom: Spacing.md,
  },
  missionText: {
    fontSize: FontSizes.md,
    color: BrandColors.lightGray,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: Spacing.xl,
    fontStyle: 'italic',
  },
  missionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  statNumber: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: BrandColors.amber,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: BrandColors.lightGray,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: BrandColors.darkGray,
  },
  valuesContainer: {
    paddingHorizontal: Spacing.lg,
  },
  testimonialsScroll: {
    paddingHorizontal: Spacing.lg,
  },
  testimonialCard: {
    width: width * 0.8,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: BrandColors.primary,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  testimonialComment: {
    fontSize: FontSizes.md,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  testimonialDate: {
    fontSize: FontSizes.sm,
  },
  reasonsContainer: {
    paddingHorizontal: Spacing.lg,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  reasonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  reasonContent: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  reasonDescription: {
    fontSize: FontSizes.sm,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    // paddingBottom is set dynamically with insets in ScrollView
  },
  footerText: {
    fontSize: FontSizes.md,
    color: BrandColors.gray,
  },
});

export default AboutScreen;
