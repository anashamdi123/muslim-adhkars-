import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';

// RTL/LTR is controlled globally via i18n initialization
import '@/src/i18n';

export default function TabLayout() {
  const { colorScheme } = useTheme();
  const { t } = require('react-i18next');

  const colors = Colors[colorScheme ?? 'dark'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          paddingBottom: Platform.OS === 'ios' ? 20 : Spacing.md,
          paddingTop: Spacing.md,
          paddingHorizontal: Spacing.lg,
          height: Platform.OS === 'ios' ? 85 : 70,
          ...Shadows.md,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
          fontFamily: 'Cairo_600SemiBold',
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.adhkars'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasbih"
        options={{
          title: t('tabs.tasbih'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="radio-button-checked" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qibla"
        options={{
          title: t('tabs.qibla'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="navigation" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: t('tabs.prayers'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="access-time" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings.title'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size || 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
