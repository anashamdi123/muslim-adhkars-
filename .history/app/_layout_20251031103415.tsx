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
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { CustomThemeProvider, useTheme } from '@/contexts/theme-context';
import '@/src/i18n';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// i18n initialization above will set RTL/LTR as needed

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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              animation: 'slide_from_right', // RTL: enter from right
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
    </GestureHandlerRootView>
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