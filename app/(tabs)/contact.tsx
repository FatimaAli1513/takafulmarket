import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

interface ContactInfo {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
  action?: string;
}

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: 'location-outline',
    title: 'Address',
    value: 'Pakistan',
  },
  {
    icon: 'mail-outline',
    title: 'Email',
    value: 'Bilalmuhammad987868@gmail.com',
    action: 'email',
  },
  {
    icon: 'call-outline',
    title: 'Phone',
    value: '+92 320 5919383',
    action: 'phone',
  },
  {
    icon: 'time-outline',
    title: 'Working Hours',
    value: 'Mon - Sat: 9:00 AM - 9:00 PM',
  },
];


const ContactScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We will get back to you within 24 hours.',
        [{ text: 'OK', onPress: () => setFormData({ name: '', email: '', phone: '', subject: '', message: '' }) }]
      );
    }, 1500);
  };

  const handleContactAction = (action?: string, value?: string) => {
    if (action === 'email') {
      Alert.alert('Email', `Open email client to: ${value}`);
    } else if (action === 'phone') {
      Alert.alert('Call', `Call: ${value}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Contact Us</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              We'd love to hear from you
            </Text>
          </View>

          {/* Contact Info Cards */}
          <View style={styles.section}>
            <View style={styles.contactGrid}>
              {CONTACT_INFO.map((info, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.contactCard, { backgroundColor: colors.card }, Shadows.sm]}
                  onPress={() => handleContactAction(info.action, info.value)}
                  disabled={!info.action}
                  accessibilityRole={info.action ? 'button' : 'text'}
                  accessibilityLabel={`${info.title}: ${info.value}`}
                >
                  <View style={styles.contactIconContainer}>
                    <Ionicons name={info.icon} size={24} color={BrandColors.primary} />
                  </View>
                  <Text style={[styles.contactTitle, { color: colors.text }]}>
                    {info.title}
                  </Text>
                  <Text
                    style={[
                      styles.contactValue,
                      { color: info.action ? BrandColors.primary : colors.textSecondary },
                    ]}
                  >
                    {info.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Contact Form */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Send us a Message</Text>
            <View style={[styles.formContainer, { backgroundColor: colors.card }, Shadows.md]}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Name *</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  ]}
                  placeholder="Your name"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  accessibilityLabel="Name input"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email *</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  ]}
                  placeholder="your@email.com"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabel="Email input"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Phone</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  ]}
                  placeholder="+92 320 5919383"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                  accessibilityLabel="Phone input"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Subject</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  ]}
                  placeholder="How can we help?"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.subject}
                  onChangeText={(value) => handleInputChange('subject', value)}
                  accessibilityLabel="Subject input"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Message *</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  ]}
                  placeholder="Write your message here..."
                  placeholderTextColor={colors.textSecondary}
                  value={formData.message}
                  onChangeText={(value) => handleInputChange('message', value)}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  accessibilityLabel="Message input"
                />
              </View>

              <Button
                title="Send Message"
                onPress={handleSubmit}
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              />
            </View>
          </View>

          {/* FAQ Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Frequently Asked Questions
            </Text>
            {[
              {
                question: 'What is your return policy?',
                answer: 'We offer a 7-day hassle-free return policy for all unused products.',
              },
              {
                question: 'How long does delivery take?',
                answer: 'We deliver within 24-48 hours in major cities and 3-5 days nationwide.',
              },
              {
                question: 'Do you offer Cash on Delivery?',
                answer: 'Yes! We offer COD along with secure online payment options.',
              },
            ].map((faq, index) => (
              <View
                key={index}
                style={[styles.faqItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={styles.faqQuestion}>
                  <Ionicons name="help-circle" size={20} color={BrandColors.primary} />
                  <Text style={[styles.faqQuestionText, { color: colors.text }]}>
                    {faq.question}
                  </Text>
                </View>
                <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
                  {faq.answer}
                </Text>
              </View>
            ))}
          </View>

          {/* Footer Spacing */}
          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  contactCard: {
    width: '47%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  contactIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BrandColors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  contactTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
  },
  contactValue: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  formContainer: {
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
  },
  textArea: {
    height: 120,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  faqItem: {
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  faqQuestionText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    flex: 1,
  },
  faqAnswer: {
    fontSize: FontSizes.sm,
    lineHeight: 22,
    marginLeft: Spacing.lg + Spacing.sm,
  },
});

export default ContactScreen;
