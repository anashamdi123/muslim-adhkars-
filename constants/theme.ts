/**
 * Spotify-inspired theme for Muslim Adhkar app
 * Combines Spotify's sleek dark aesthetic with Islamic design principles
 * Features deep blacks, vibrant greens, and high contrast for optimal readability
 */

const spotifyGreen = '#1DB954'; // Spotify's signature green
const spotifyBlack = '#000000'; // Pure black like Spotify
const spotifyDarkGray = '#121212'; // Spotify's main background
const spotifyGray = '#181818'; // Spotify's card background

// Tajawal font family constants using Expo Google Fonts
export const Fonts = {
  arabic: {
    // Expo Google Fonts Tajawal variants
    regular: 'Tajawal_400Regular',
    medium: 'Tajawal_500Medium', 
    semiBold: 'Tajawal_700Bold', // Using Bold as semiBold since Tajawal doesn't have SemiBold
    bold: 'Tajawal_700Bold',
    display: 'Tajawal_700Bold', // For headers and titles
    // Fallbacks
    systemFallback: 'System',
  },
  english: {
    // Also using Tajawal for English text for consistency
    regular: 'Tajawal_400Regular',
    medium: 'Tajawal_500Medium',
    semiBold: 'Tajawal_700Bold',
    bold: 'Tajawal_700Bold',
  },
};

// Tajawal font family helper function with weight support
export const getArabicFont = (weight: 'regular' | 'medium' | 'semiBold' | 'bold' | 'display' = 'regular') => {
  // Map weights to Expo Google Fonts Tajawal variants with fallbacks
  const fontMap = {
    regular: Fonts.arabic.regular,
    medium: Fonts.arabic.medium,
    semiBold: Fonts.arabic.semiBold,
    bold: Fonts.arabic.bold,
    display: Fonts.arabic.display,
  };
  
  return fontMap[weight] || Fonts.arabic.regular;
};

// Universal Tajawal font helper (same as Arabic since we're using Tajawal for everything)
export const getTajawalFont = (weight: 'regular' | 'medium' | 'semiBold' | 'bold' | 'display' = 'regular') => {
  return getArabicFont(weight);
};

// Typography scale for consistent sizing
export const Typography = {
  // Display sizes (for headers and hero text)
  display: {
    large: { fontSize: 32, lineHeight: 48, letterSpacing: -0.5 },
    medium: { fontSize: 28, lineHeight: 40, letterSpacing: -0.25 },
    small: { fontSize: 24, lineHeight: 32, letterSpacing: 0 },
  },
  // Headline sizes (for section headers)
  headline: {
    large: { fontSize: 22, lineHeight: 32, letterSpacing: 0 },
    medium: { fontSize: 20, lineHeight: 28, letterSpacing: 0.15 },
    small: { fontSize: 18, lineHeight: 26, letterSpacing: 0.15 },
  },
  // Title sizes (for card titles, etc.)
  title: {
    large: { fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
    medium: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    small: { fontSize: 12, lineHeight: 18, letterSpacing: 0.1 },
  },
  // Body text sizes
  body: {
    large: { fontSize: 16, lineHeight: 26, letterSpacing: 0.5 },
    medium: { fontSize: 14, lineHeight: 22, letterSpacing: 0.25 },
    small: { fontSize: 12, lineHeight: 18, letterSpacing: 0.4 },
  },
  // Label sizes (for buttons, tabs, etc.)
  label: {
    large: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    medium: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
    small: { fontSize: 10, lineHeight: 14, letterSpacing: 0.5 },
  },
};

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: spotifyGreen,
      icon: '#6A6A6A',
      tabIconDefault: '#6A6A6A',
      tabIconSelected: spotifyGreen,
      primary: spotifyGreen,
      secondary: '#1ED760', // Brighter green for hover states
      surface: '#F7F7F7',
      border: '#E5E5E5',
      card: '#FFFFFF',
      cardSecondary: '#F7F7F7',
      success: '#1DB954',
      warning: '#FFA500',
      error: '#E22134',
      muted: '#6A6A6A',
      accent: '#1DB954',
    },
  dark: {
    text: '#FFFFFF',
    background: spotifyBlack,
    tint: spotifyGreen,
    icon: '#B3B3B3',
    tabIconDefault: '#B3B3B3',
    tabIconSelected: spotifyGreen,
    primary: spotifyGreen,
    secondary: '#1ED760', // Brighter green for hover states
    surface: spotifyDarkGray,
    border: '#2A2A2A',
    card: spotifyGray,
    cardSecondary: '#282828',
    success: '#1DB954',
    warning: '#FFA500',
    error: '#E22134',
    muted: '#B3B3B3',
    accent: '#1DB954',
  },
};
