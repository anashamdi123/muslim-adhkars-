import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function QiblaScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme as keyof typeof Colors];

  return (
    <AnimatedScreen animationType="fade" duration={400}>
      <ThemedView style={styles.container}>
        <CommonHeader title="اتجاه القبلة" />

        <View style={styles.content}>
          {/* Kaaba Icon */}
          <View style={styles.kaabaContainer}>
            <FontAwesome5 name="kaaba" size={60} color={colors.primary} />
          </View>

          {/* Simple Compass */}
          <View style={styles.compassContainer}>
            {/* Compass Circle */}
            <View style={[styles.compassCircle, { borderColor: colors.border }]}>
              {/* North Indicator */}
              <View style={[styles.northIndicator, { backgroundColor: colors.primary }]} />
              
              {/* Center Navigation Arrow */}
              <MaterialIcons 
                name="navigation" 
                size={80} 
                color={colors.primary}
                style={{ transform: [{ rotate: '60deg' }] }}
              />
            </View>
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxxl + Spacing.xl,
    direction: 'rtl', // RTL support
  },
  kaabaContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(29,185,84,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  northIndicator: {
    position: 'absolute',
    top: 8,
    width: 4,
    height: 20,
    borderRadius: 2,
  },
});
