import { Tabs } from 'expo-router';
import React from 'react';
import { I18nManager } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';

// Enable RTL layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          height: 70,
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
