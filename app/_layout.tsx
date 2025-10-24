import {
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
} from '@expo-google-fonts/tajawal';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { I18nManager, Platform } from 'react-native';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { CustomThemeProvider, useTheme } from '@/contexts/theme-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Force RTL layout globally for Arabic app
if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  if (Platform.OS !== 'web') {
    // On native platforms, need to reload for RTL to take effect
    // This will only run once on first launch
    require('react-native').NativeModules.DevSettings?.reload();
  }
}

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const { colorScheme } = useTheme();

  // Custom theme based on our Spotify-inspired design
  const customLightTheme: Theme = {
    dark: false,
    colors: {
      primary: Colors.light.primary,
      background: Colors.light.background,
      card: Colors.light.card,
      text: Colors.light.text,
      border: Colors.light.border,
      notification: Colors.light.primary,
    },
    fonts: {
      regular: {
        fontFamily: 'Tajawal_400Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Tajawal_500Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'Tajawal_700Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'Tajawal_700Bold',
        fontWeight: '700',
      },
    },
  };

  const customDarkTheme: Theme = {
    dark: true,
    colors: {
      primary: Colors.dark.primary,
      background: Colors.dark.background,
      card: Colors.dark.card,
      text: Colors.dark.text,
      border: Colors.dark.border,
      notification: Colors.dark.primary,
    },
    fonts: {
      regular: {
        fontFamily: 'Tajawal_400Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Tajawal_500Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'Tajawal_700Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'Tajawal_700Bold',
        fontWeight: '700',
      },
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom',
          animationDuration: 300,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            animation: 'fade',
            animationDuration: 200,
          }} 
        />
        <Stack.Screen 
          name="adhkars/[id]" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }} 
        />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal',
            animation: 'slide_from_bottom',
            animationDuration: 350,
          }} 
        />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <RootNavigator />
    </CustomThemeProvider>
  );
}
