/**
 * Enhanced Spotify-inspired theme for Muslim Adhkar app
 * Combines Spotify's sleek dark aesthetic with Islamic design principles
 * Features deep blacks, vibrant greens, and high contrast for optimal readability
 * Full RTL support with premium Arabic typography
 */

// Spotify Color Palette
const spotifyGreen = '#1DB954'; // Spotify's signature green
const spotifyGreenHover = '#1ED760'; // Brighter green for interactions
const spotifyBlack = '#000000'; // Pure black background
const spotifyDarkGray = '#121212'; // Main background
const spotifyGray = '#181818'; // Card background
const spotifyLightGray = '#282828'; // Elevated surfaces
const spotifyWhite = '#FFFFFF'; // Pure white text
const spotifyTextGray = '#B3B3B3'; // Muted text
const spotifyBorder = '#2A2A2A'; // Subtle borders

// Premium Arabic Font System using Cairo and Noto Kufi Arabic
export const Fonts = {
  arabic: {
    // Cairo - Modern, clean Arabic font for body text and UI
    regular: 'Cairo_400Regular',
    medium: 'Cairo_500Medium',
    semiBold: 'Cairo_600SemiBold',
    bold: 'Cairo_700Bold',
    extraBold: 'Cairo_800ExtraBold',
    // Noto Kufi Arabic - Traditional, elegant font for Quranic text and adhkars
    displayRegular: 'NotoKufiArabic_400Regular',
    displayMedium: 'NotoKufiArabic_500Medium',
    displaySemiBold: 'NotoKufiArabic_600SemiBold',
    displayBold: 'NotoKufiArabic_700Bold',
    displayExtraBold: 'NotoKufiArabic_800ExtraBold',
    // Fallback
    systemFallback: 'System',
  },
};

// Font helper for body text and UI (Cairo)
export const getArabicFont = (weight: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' = 'regular') => {
  const fontMap = {
    regular: Fonts.arabic.regular,
    medium: Fonts.arabic.medium,
    semiBold: Fonts.arabic.semiBold,
    bold: Fonts.arabic.bold,
    extraBold: Fonts.arabic.extraBold,
  };
  return fontMap[weight] || Fonts.arabic.regular;
};

// Font helper for display text (Noto Kufi Arabic - for adhkars and Quranic text)
export const getDisplayFont = (weight: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' = 'regular') => {
  const fontMap = {
    regular: Fonts.arabic.displayRegular,
    medium: Fonts.arabic.displayMedium,
    semiBold: Fonts.arabic.displaySemiBold,
    bold: Fonts.arabic.displayBold,
    extraBold: Fonts.arabic.displayExtraBold,
  };
  return fontMap[weight] || Fonts.arabic.displayRegular;
};

// Enhanced Typography Scale - Optimized for Arabic RTL
export const Typography = {
  // Display sizes (for large headers and hero text)
  display: {
    large: { fontSize: 36, lineHeight: 52, letterSpacing: -0.5 },
    medium: { fontSize: 30, lineHeight: 44, letterSpacing: -0.25 },
    small: { fontSize: 26, lineHeight: 36, letterSpacing: 0 },
  },
  // Headline sizes (for section headers)
  headline: {
    large: { fontSize: 24, lineHeight: 34, letterSpacing: 0 },
    medium: { fontSize: 20, lineHeight: 30, letterSpacing: 0.15 },
    small: { fontSize: 18, lineHeight: 28, letterSpacing: 0.15 },
  },
  // Title sizes (for card titles, navigation)
  title: {
    large: { fontSize: 18, lineHeight: 26, letterSpacing: 0.15 },
    medium: { fontSize: 16, lineHeight: 24, letterSpacing: 0.1 },
    small: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  },
  // Body text sizes (for content)
  body: {
    large: { fontSize: 17, lineHeight: 28, letterSpacing: 0.3 },
    medium: { fontSize: 15, lineHeight: 24, letterSpacing: 0.25 },
    small: { fontSize: 13, lineHeight: 20, letterSpacing: 0.2 },
  },
  // Label sizes (for buttons, tabs, metadata)
  label: {
    large: { fontSize: 15, lineHeight: 22, letterSpacing: 0.1 },
    medium: { fontSize: 13, lineHeight: 18, letterSpacing: 0.3 },
    small: { fontSize: 11, lineHeight: 16, letterSpacing: 0.3 },
  },
  // Adhkar text (special sizing for Quranic verses and adhkars)
  adhkar: {
    large: { fontSize: 28, lineHeight: 44, letterSpacing: 0.2 },
    medium: { fontSize: 24, lineHeight: 38, letterSpacing: 0.15 },
    small: { fontSize: 20, lineHeight: 32, letterSpacing: 0.1 },
  },
};

// Enhanced Spotify-Inspired Color System
export const Colors = {
  light: {
    // Base colors
    text: '#000000',
    textSecondary: '#6A6A6A',
    background: '#FFFFFF',
    backgroundElevated: '#F7F7F7',
    
    // Brand colors
    tint: spotifyGreen,
    primary: spotifyGreen,
    primaryHover: spotifyGreenHover,
    secondary: '#1ED760',
    accent: spotifyGreen,
    
    // UI elements
    icon: '#6A6A6A',
    iconActive: spotifyGreen,
    tabIconDefault: '#6A6A6A',
    tabIconSelected: spotifyGreen,
    
    // Surfaces
    surface: '#F7F7F7',
    surfaceElevated: '#FFFFFF',
    card: '#FFFFFF',
    cardHover: '#F7F7F7',
    cardSecondary: '#F7F7F7',
    
    // Borders
    border: '#E5E5E5',
    borderLight: '#F0F0F0',
    divider: '#E5E5E5',
    
    // Status colors
    success: '#1DB954',
    warning: '#FFA500',
    error: '#E22134',
    info: '#3B82F6',
    
    // Text variations
    muted: '#6A6A6A',
    disabled: '#CCCCCC',
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
  },
  dark: {
    // Base colors
    text: spotifyWhite,
    textSecondary: spotifyTextGray,
    background: spotifyBlack,
    backgroundElevated: spotifyDarkGray,
    
    // Brand colors
    tint: spotifyGreen,
    primary: spotifyGreen,
    primaryHover: spotifyGreenHover,
    secondary: spotifyGreenHover,
    accent: spotifyGreen,
    
    // UI elements
    icon: spotifyTextGray,
    iconActive: spotifyGreen,
    tabIconDefault: spotifyTextGray,
    tabIconSelected: spotifyGreen,
    
    // Surfaces
    surface: spotifyDarkGray,
    surfaceElevated: spotifyGray,
    card: spotifyGray,
    cardHover: spotifyLightGray,
    cardSecondary: spotifyLightGray,
    
    // Borders
    border: spotifyBorder,
    borderLight: '#333333',
    divider: spotifyBorder,
    
    // Status colors
    success: spotifyGreen,
    warning: '#FFA500',
    error: '#E22134',
    info: '#3B82F6',
    
    // Text variations
    muted: spotifyTextGray,
    disabled: '#535353',
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
  },
};

// Spacing System (Spotify-inspired)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border Radius System
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 999,
};

// Shadow System (Spotify-style elevation)
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
