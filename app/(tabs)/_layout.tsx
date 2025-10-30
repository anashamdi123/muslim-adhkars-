import { Tabs } from 'expo-router';
import { I18nManager, Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';

// Ensure RTL is enabled for tab layout
if (!I18nManager.isRTL && Platform.OS !== 'web') {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

export default function TabLayout() {
  const { colorScheme } = useTheme();

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
          title: 'الأذكار',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasbih"
        options={{
          title: 'التسبيح',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="radio-button-checked" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qibla"
        options={{
          title: 'القبلة',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="navigation" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: 'الصلاة',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="access-time" size={size || 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
