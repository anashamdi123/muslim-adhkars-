import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { I18nManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './themed-text';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { colorScheme, toggleTheme, themeMode } = useTheme();
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const rotation = useSharedValue(0);

  // RTL-aware translation: slide from right in RTL, from left in LTR
  const translateX = useSharedValue(I18nManager.isRTL ? 300 : -300);

  // Animate sidebar opening/closing
  React.useEffect(() => {
    translateX.value = withSpring(isOpen ? 0 : (I18nManager.isRTL ? 300 : -300), {
      damping: 20,
      stiffness: 150,
    });
  }, [isOpen]);

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? 1 : 0, { duration: 200 }),
  }));

  const handleToggleTheme = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    rotation.value = withSpring(rotation.value + 180, {
      damping: 15,
      stiffness: 150,
    });
    toggleTheme();
  };

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const getThemeIcon = () => {
    if (themeMode === 'auto') {
      return colorScheme === 'dark' ? 'nightlight' : 'wb-sunny';
    }
    return colorScheme === 'dark' ? 'nightlight' : 'wb-sunny';
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'light':
        return 'الوضع الفاتح';
      case 'dark':
        return 'الوضع الداكن';
      case 'auto':
        return 'تلقائي';
      default:
        return 'المظهر';
    }
  };



  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <Animated.View
        style={[styles.overlay, overlayStyle]}
        onTouchEnd={onClose}
      />

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            backgroundColor: colors.background,
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
          },
          I18nManager.isRTL ? {
            right: 0,
            borderLeftWidth: 1,
            borderLeftColor: colors.border,
          } : {
            left: 0,
            borderRightWidth: 1,
            borderRightColor: colors.border,
          },
          sidebarStyle,
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText
            type="headline"
            size="large"
            weight="bold"
            style={[styles.headerTitle, { color: colors.primary }]}
          >
            الأذكار الإسلامية
          </ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Theme Toggle */}
        <View style={styles.themeSection}>
          
          <TouchableOpacity
            style={[styles.themeItem, { backgroundColor: colors.surface }]}
            onPress={handleToggleTheme}
          >
            <View style={styles.themeLeft}>
              <Animated.View style={animatedIconStyle}>
                <MaterialIcons name={getThemeIcon()} size={24} color={colors.primary} />
              </Animated.View>
              <ThemedText
                type="body"
                size="large"
                weight="medium"
                style={[styles.navText, { color: colors.text }]}
              >
                {getThemeLabel()}
              </ThemedText>
            </View>
            <MaterialIcons 
              name={I18nManager.isRTL ? "chevron-left" : "chevron-right"} 
              size={20} 
              color={colors.muted} 
            />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText
            type="label"
            size="small"
            weight="regular"
            style={[styles.footerText, { color: colors.muted }]}
          >
            نسخة 1.0.0
          </ThemedText>
        </View>
      </Animated.View>
    </>
  );
}

// Add React import for useEffect
import React from 'react';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 280,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
  },
  closeButton: {
    padding: 4,
  },
  themeSection: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  navText: {
    flex: 1,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
  },
});
