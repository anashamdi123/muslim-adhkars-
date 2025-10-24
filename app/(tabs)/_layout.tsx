import { Tabs } from 'expo-router';
import { I18nManager, Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';

// Ensure RTL is enabled for tab layout
if (!I18nManager.isRTL && Platform.OS !== 'web') {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

export default function TabLayout() {
  const { colorScheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopColor: Colors[colorScheme ?? 'light'].border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 90,
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
