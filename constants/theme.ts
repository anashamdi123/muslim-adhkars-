/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#22c55e'; // Islamic green
const tintColorDark = '#22c55e';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#22c55e', // Islamic green
    secondary: '#16a34a',
    surface: '#f8fafc',
    border: '#e2e8f0',
    card: '#ffffff',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#22c55e', // Islamic green
    secondary: '#16a34a',
    surface: '#1f2937',
    border: '#374151',
    card: '#1f2937',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
};
