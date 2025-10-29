import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function TasbihScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const [count, setCount] = useState(0);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const increment = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    setCount((c) => c + 1);
  };

  const reset = () => {
    setCount(0);
  };


  return (
    <AnimatedScreen animationType="fade" duration={350}>
      <ThemedView style={styles.container}>
      <CommonHeader title="التسبيح" />

      <ThemedView style={styles.content}>
        <TouchableOpacity style={styles.counterButton} onPress={increment} activeOpacity={0.8}>
          <Animated.View style={[styles.counterCircle, animatedStyle, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
            <ThemedText
              type="display"
              size="large"
              weight="bold"
              style={[styles.countText, { color: colors.primary }]}
            >
              {count}
            </ThemedText>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.resetButton, { backgroundColor: colors.surface }]} 
          onPress={reset}
          activeOpacity={0.7}
        >
          <ThemedText
            type="body"
            size="medium"
            weight="medium"
            style={{ color: colors.text }}
          >
            إعادة تعيين
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xxxl + Spacing.md,
    direction: 'rtl', // RTL support
  },
  counterButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },
  countText: { 
    fontSize: 80,
    lineHeight: 90,
  },
  resetButton: {
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
    minWidth: 160,
    alignItems: 'center',
  },
});
