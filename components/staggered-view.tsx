import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface StaggeredViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  index: number;
  animationType?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'spring';
  staggerDelay?: number;
  duration?: number;
  enableReanimation?: boolean; // Control whether to re-animate on every focus
}

export function StaggeredView({
  children,
  style,
  index,
  animationType = 'fadeUp',
  staggerDelay = 100,
  duration = 400,
  enableReanimation = true, // Default to true - re-animate on every visit
}: StaggeredViewProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const translateX = useSharedValue(30);
  const scale = useSharedValue(0.8);

  // Reset animation values to initial state
  const resetAnimationValues = useCallback(() => {
    'worklet';
    opacity.value = 0;
    
    switch (animationType) {
      case 'fadeUp':
        translateY.value = 30;
        translateX.value = 0;
        scale.value = 1;
        break;
      case 'fadeLeft':
        translateX.value = 30;
        translateY.value = 0;
        scale.value = 1;
        break;
      case 'fadeRight':
        translateX.value = 30;
        translateY.value = 0;
        scale.value = 1;
        break;
      case 'scale':
      case 'spring':
        scale.value = 0.8;
        translateX.value = 0;
        translateY.value = 0;
        break;
    }
  }, [animationType]);

  // Start staggered animation
  const startAnimation = useCallback(() => {
    'worklet';
    const delay = index * staggerDelay;

    switch (animationType) {
      case 'fadeUp':
        opacity.value = withDelay(delay, withTiming(1, { duration: duration * 0.8 }));
        translateY.value = withDelay(delay, withTiming(0, { duration }));
        break;
      case 'fadeLeft':
        opacity.value = withDelay(delay, withTiming(1, { duration: duration * 0.8 }));
        translateX.value = withDelay(delay, withTiming(0, { duration }));
        break;
      case 'fadeRight':
        opacity.value = withDelay(delay, withTiming(1, { duration: duration * 0.8 }));
        translateX.value = withDelay(delay, withTiming(0, { duration }));
        break;
      case 'scale':
        opacity.value = withDelay(delay, withTiming(1, { duration: duration * 0.8 }));
        scale.value = withDelay(delay, withTiming(1, { duration }));
        break;
      case 'spring':
        opacity.value = withDelay(delay, withTiming(1, { duration: duration * 0.6 }));
        scale.value = withDelay(delay, withSpring(1, {
          damping: 12,
          stiffness: 100,
          mass: 0.8,
        }));
        break;
    }
  }, [index, animationType, staggerDelay, duration]);

  // Re-trigger animation on every screen focus if enabled
  useFocusEffect(
    useCallback(() => {
      if (!enableReanimation) return;

      // Cancel any ongoing animations
      cancelAnimation(opacity);
      cancelAnimation(translateY);
      cancelAnimation(translateX);
      cancelAnimation(scale);
      
      // Reset to initial state
      resetAnimationValues();
      
      // Start staggered animation
      startAnimation();
    }, [enableReanimation, resetAnimationValues, startAnimation])
  );

  const animatedStyle = useAnimatedStyle(() => {
    const baseStyle: any = {
      opacity: opacity.value,
    };

    switch (animationType) {
      case 'fadeUp':
        baseStyle.transform = [{ translateY: translateY.value }];
        break;
      case 'fadeLeft':
        baseStyle.transform = [{ translateX: translateX.value }];
        break;
      case 'fadeRight':
        baseStyle.transform = [{ translateX: -translateX.value }];
        break;
      case 'scale':
      case 'spring':
        baseStyle.transform = [{ scale: scale.value }];
        break;
    }

    return baseStyle;
  });

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
