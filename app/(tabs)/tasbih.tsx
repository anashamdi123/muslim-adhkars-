import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function TasbihScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const [count, setCount] = useState(0);

  const scale = useSharedValue(1);

  // Animate scale on tap
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const increment = () => {
    scale.value = withSpring(0.9, { stiffness: 200, damping: 15 }, () => {
      scale.value = withSpring(1, { stiffness: 150, damping: 12 });
    });
    setCount((prev) => prev + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <AnimatedScreen animationType="fade" duration={350}>
      <ThemedView style={styles.container}>
        <CommonHeader title="التسبيح" showResetButton onResetPress={reset} />

        <TouchableOpacity
          style={styles.touchableArea}
          activeOpacity={0.8}
          onPress={increment}
        >
          <Animated.View style={[styles.counterContainer, animatedStyle]}>
            <ThemedText
              type="display"
              size="large"
              weight="bold"
              style={[styles.countText, { color: colors.primary }]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
            >
              {count}
            </ThemedText>
          </Animated.View>
        </TouchableOpacity>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xl,
  },
  touchableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 90,
    lineHeight: 100,
    textAlign: 'center',
  },
});
