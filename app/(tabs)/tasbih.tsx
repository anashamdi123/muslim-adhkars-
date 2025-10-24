import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
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
      <CommonHeader title="التسبيح" titleSize={28} paddingBottom={30} />

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
    paddingHorizontal: 20,
    gap: 40,
  },
  counterButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  countText: { 
    fontSize: 80,
    lineHeight: 90,
  },
  resetButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
