import {
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
  Cairo_800ExtraBold,
} from '@expo-google-fonts/cairo';
import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_500Medium,
  NotoKufiArabic_600SemiBold,
  NotoKufiArabic_700Bold,
  NotoKufiArabic_800ExtraBold,
} from '@expo-google-fonts/noto-kufi-arabic';
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
// This must be done before any components are rendered
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Check if RTL is not enabled and reload if necessary (only on native)
if (Platform.OS !== 'web' && !I18nManager.isRTL) {
  // On native platforms, need to reload for RTL to take effect
  // This will only run once on first launch
  try {
    const RNRestart = require('react-native').NativeModules.DevSettings;
    if (RNRestart) {
      RNRestart.reload();
    }
  } catch (error) {
    console.warn('Could not reload app for RTL:', error);
  }
}

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const { colorScheme } = useTheme();

  // Enhanced Spotify-inspired theme with Cairo fonts
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
        fontFamily: 'Cairo_400Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Cairo_500Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'Cairo_700Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'Cairo_800ExtraBold',
        fontWeight: '800',
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
        fontFamily: 'Cairo_400Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Cairo_500Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'Cairo_700Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'Cairo_800ExtraBold',
        fontWeight: '800',
      },
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          // RTL: screens slide from right (entering from right side)
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
      <StatusBar 
        style={colorScheme === 'dark' ? 'light' : 'dark'} 
        translucent={true}
        backgroundColor="transparent"
      />
    </ThemeProvider>
  );
}

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
    Cairo_800ExtraBold,
    NotoKufiArabic_400Regular,
    NotoKufiArabic_500Medium,
    NotoKufiArabic_600SemiBold,
    NotoKufiArabic_700Bold,
    NotoKufiArabic_800ExtraBold,
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
