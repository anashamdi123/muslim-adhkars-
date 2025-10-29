import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './themed-text';

interface NavbarProps {
  title?: string;
  showThemeToggle?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export function Navbar({ 
  title = 'الأذكار الإسلامية', 
  showThemeToggle = true,
  leftElement,
  rightElement 
}: NavbarProps) {
  const { colorScheme, toggleTheme, themeMode } = useTheme();
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleToggleTheme = async () => {
    // Haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Rotate animation
    rotation.value = withSpring(rotation.value + 180, {
      damping: 15,
      stiffness: 150,
    });
    
    toggleTheme();
  };

  const getThemeIcon = () => {
    if (themeMode === 'auto') {
      return colorScheme === 'dark' ? 'nightlight' : 'wb-sunny';
    }
    return colorScheme === 'dark' ? 'nightlight' : 'wb-sunny';
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          paddingTop: insets.top + 8,
          borderBottomColor: colors.border,
        }
      ]}
    >
      <View style={styles.content}>
        {/* Left Element */}
        <View style={styles.leftSection}>
          {leftElement}
        </View>

        {/* Title */}
        <View style={styles.centerSection}>
          <ThemedText 
            type="headline" 
            size="medium" 
            weight="bold"
            style={[styles.title, { color: colors.text }]}
          >
            {title}
          </ThemedText>
        </View>

        {/* Right Element with Theme Toggle */}
        <View style={styles.rightSection}>
          {showThemeToggle && (
            <TouchableOpacity
              onPress={handleToggleTheme}
              style={[styles.themeButton, { backgroundColor: colors.surface }]}
              activeOpacity={0.7}
            >
              <Animated.View style={animatedStyle}>
                <MaterialIcons 
                  name={getThemeIcon()} 
                  size={22} 
                  color={colors.primary} 
                />
              </Animated.View>
            </TouchableOpacity>
          )}
          {rightElement}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 44,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
