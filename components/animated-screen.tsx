import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'spring';
  duration?: number;
  delay?: number;
  onAnimationComplete?: () => void;
}

export function AnimatedScreen({
  children,
  style,
  animationType = 'fade',
  duration = 300,
  delay = 0,
  onAnimationComplete,
}: AnimatedScreenProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const translateX = useSharedValue(50);
  const scale = useSharedValue(0.9);

  // Reset animation values to initial state
  const resetAnimationValues = useCallback(() => {
    'worklet';
    opacity.value = 0;
    
    switch (animationType) {
      case 'slideUp':
        translateY.value = 50;
        translateX.value = 0;
        scale.value = 1;
        break;
      case 'slideDown':
        translateY.value = -50;
        translateX.value = 0;
        scale.value = 1;
        break;
      case 'slideLeft':
        translateX.value = 50;
        translateY.value = 0;
        scale.value = 1;
        break;
      case 'slideRight':
        translateX.value = -50;
        translateY.value = 0;
        scale.value = 1;
        break;
      case 'scale':
      case 'spring':
        scale.value = 0.9;
        translateX.value = 0;
        translateY.value = 0;
        break;
      default:
        translateX.value = 0;
        translateY.value = 0;
        scale.value = 1;
    }
  }, [animationType]);

  // Start animation sequence
  const startAnimation = useCallback(() => {
    'worklet';
    
    switch (animationType) {
      case 'fade':
        opacity.value = withTiming(1, { duration }, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        });
        break;
      case 'slideUp':
        opacity.value = withTiming(1, { duration: duration * 0.8 });
        translateY.value = withTiming(0, { duration }, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        });
        break;
      case 'slideDown':
        opacity.value = withTiming(1, { duration: duration * 0.8 });
        translateY.value = withTiming(0, { duration }, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        });
        break;
      case 'slideLeft':
        opacity.value = withTiming(1, { duration: duration * 0.8 });
        translateX.value = withTiming(0, { duration }, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        });
        break;
      case 'slideRight':
        opacity.value = withTiming(1, { duration: duration * 0.8 });
        translateX.value = withTiming(0, { duration }, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        });
        break;
      case 'scale':
        opacity.value = withTiming(1, { duration: duration * 0.8 });
        scale.value = withTiming(1, { duration }, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        });
        break;
      case 'spring':
        opacity.value = withTiming(1, { duration: duration * 0.6 });
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 150,
          mass: 1,
        }, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        });
        break;
    }
  }, [animationType, duration, onAnimationComplete]);

  // Re-trigger animation on every screen focus
  useFocusEffect(
    useCallback(() => {
      // Cancel any ongoing animations
      cancelAnimation(opacity);
      cancelAnimation(translateY);
      cancelAnimation(translateX);
      cancelAnimation(scale);
      
      // Reset to initial state
      resetAnimationValues();
      
      // Start animation after delay
      if (delay > 0) {
        const timer = setTimeout(() => startAnimation(), delay);
        return () => clearTimeout(timer);
      } else {
        startAnimation();
      }
    }, [delay, resetAnimationValues, startAnimation])
  );

  const animatedStyle = useAnimatedStyle(() => {
    const baseStyle: any = {
      opacity: opacity.value,
    };

    switch (animationType) {
      case 'slideUp':
      case 'slideDown':
        baseStyle.transform = [{ translateY: translateY.value }];
        break;
      case 'slideLeft':
      case 'slideRight':
        baseStyle.transform = [{ translateX: translateX.value }];
        break;
      case 'scale':
      case 'spring':
        baseStyle.transform = [{ scale: scale.value }];
        break;
    }

    return baseStyle;
  });

  return (
    <Animated.View style={[{ flex: 1 }, style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
