/**
 * RTL (Right-to-Left) Utility Functions
 * 
 * Provides helper functions for handling RTL layout in the app
 */

import { I18nManager, Platform } from 'react-native';

/**
 * Check if the app is in RTL mode
 */
export const isRTL = (): boolean => {
  return I18nManager.isRTL;
};

/**
 * Get the appropriate flex direction based on RTL state
 * @param reverse - If true, reverses the direction
 */
export const getFlexDirection = (reverse: boolean = false): 'row' | 'row-reverse' => {
  const rtl = I18nManager.isRTL;
  
  if (reverse) {
    return rtl ? 'row' : 'row-reverse';
  }
  
  return rtl ? 'row-reverse' : 'row';
};

/**
 * Get the appropriate text alignment based on RTL state
 * @param center - If true, returns 'center' regardless of RTL
 */
export const getTextAlign = (center: boolean = false): 'left' | 'right' | 'center' => {
  if (center) return 'center';
  return I18nManager.isRTL ? 'right' : 'left';
};

/**
 * Get the appropriate icon name for directional icons
 * @param direction - 'forward' | 'back' | 'left' | 'right'
 */
export const getDirectionalIcon = (direction: 'forward' | 'back' | 'left' | 'right'): string => {
  const rtl = I18nManager.isRTL;
  
  switch (direction) {
    case 'forward':
      return rtl ? 'arrow-back' : 'arrow-forward';
    case 'back':
      return rtl ? 'arrow-forward' : 'arrow-back';
    case 'left':
      return rtl ? 'chevron-right' : 'chevron-left';
    case 'right':
      return rtl ? 'chevron-left' : 'chevron-right';
    default:
      return 'arrow-forward';
  }
};

/**
 * Get RTL-aware margin/padding
 * Useful for converting marginLeft/marginRight to marginStart/marginEnd
 */
export const getHorizontalSpacing = (spacing: number, side: 'start' | 'end') => {
  if (side === 'start') {
    return I18nManager.isRTL ? { marginRight: spacing } : { marginLeft: spacing };
  }
  return I18nManager.isRTL ? { marginLeft: spacing } : { marginRight: spacing };
};

/**
 * Force RTL layout globally
 * Only works on native platforms, web handles RTL via CSS
 */
export const enableRTL = async (): Promise<void> => {
  if (Platform.OS === 'web') {
    console.warn('RTL on web is handled via CSS direction property');
    return;
  }

  if (!I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    
    // Reload the app to apply RTL changes
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // On native, we need to restart for RTL to take effect
      console.log('RTL enabled. Restart the app to see changes.');
    }
  }
};

/**
 * Disable RTL layout globally
 */
export const disableRTL = async (): Promise<void> => {
  if (Platform.OS === 'web') {
    console.warn('RTL on web is handled via CSS direction property');
    return;
  }

  if (I18nManager.isRTL) {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    
    console.log('RTL disabled. Restart the app to see changes.');
  }
};

/**
 * Get animation direction for screen transitions
 */
export const getAnimationDirection = (): 'slide_from_left' | 'slide_from_right' => {
  // In RTL, screens should slide from right to left (entering from right)
  return I18nManager.isRTL ? 'slide_from_right' : 'slide_from_left';
};

export default {
  isRTL,
  getFlexDirection,
  getTextAlign,
  getDirectionalIcon,
  getHorizontalSpacing,
  enableRTL,
  disableRTL,
  getAnimationDirection,
};
