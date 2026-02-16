import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { BrandColors, Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TabIconName = 'home' | 'bag' | 'information-circle' | 'mail';

interface TabIconProps {
  name: TabIconName;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, focused }) => {
  const iconName = focused ? name : `${name}-outline` as keyof typeof Ionicons.glyphMap;

  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Ionicons name={iconName} size={24} color={color} />
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: BrandColors.gold,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          borderRadius: 32,
          marginHorizontal: 24,
          marginBottom: 24,
          height: 70,
          paddingTop: 12,
          paddingBottom: 12,
          paddingHorizontal: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          ...Shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bag" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="information-circle" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="mail" color={color} focused={focused} />
          ),
        }}
      />
      {/* Hide the explore tab */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  iconContainerFocused: {
    backgroundColor: `${BrandColors.gold}20`,
  },
});
