import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
        <CommonHeader 
          title="التسبيح" 
          showResetButton={true}
          onResetPress={reset}
        />

        {/* Whole content area is now tappable */}
        <TouchableOpacity
          style={styles.touchableArea}
          onPress={increment}
          activeOpacity={0.8}
        >
          <Animated.View style={[styles.animatedContent, animatedStyle]}>
            <View style={styles.counterContainer}>
              <ThemedText
                type="display"
                size="large"
                weight="bold"
                style={[styles.countText, { color: colors.primary }]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.5}
              >
                {count}
              </ThemedText>
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* Remove the old reset button since we're using the header button now */}
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    direction: 'rtl', // RTL support
    gap: Spacing.xxxl + Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  touchableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  animatedContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  countText: { 
    fontSize: 80,
    lineHeight: 90,
    textAlign: 'center',
    width: '100%',
  },
});