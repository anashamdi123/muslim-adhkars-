import { AnimatedScreen } from '@/components/animated-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const COMPASS_SIZE = Math.min(320, SCREEN_WIDTH - 60);

export default function QiblaScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme as keyof typeof Colors];

  // Generate tick marks
  const renderCompassTicks = () => {
    const ticks = [];
    for (let i = 0; i < 360; i += 15) {
      const isMain = i % 45 === 0;
      const isCardinal = i % 90 === 0;
      ticks.push(
        <View
          key={i}
          style={[
            styles.tick,
            {
              transform: [{ rotate: `${i}deg` }, { translateY: -COMPASS_SIZE / 2 + 8 }],
              width: isMain ? 4 : 2,
              height: isCardinal ? 16 : isMain ? 12 : 8,
              backgroundColor: isCardinal ? colors.primary : colorScheme === 'dark' ? '#888' : '#555',
            },
          ]}
        />
      );
    }
    return ticks;
  };

  const renderCardinalLabels = () => {
    const labels = [
      { dir: 'N', angle: 0, text: 'ش' },
      { dir: 'E', angle: 90, text: 'ق' },
      { dir: 'S', angle: 180, text: 'ج' },
      { dir: 'W', angle: 270, text: 'غ' },
    ];

    return labels.map((label) => (
      <View
        key={label.dir}
        style={[
          styles.cardinalLabel,
          {
            transform: [
              { rotate: `${label.angle}deg` },
              { translateY: -COMPASS_SIZE / 2 + 36 },
            ],
          },
        ]}
      >
        <ThemedText
          type="label"
          size="large"
          weight="bold"
          style={{
            color: label.dir === 'N' ? colors.primary : colors.text,
          }}
        >
          {label.text}
        </ThemedText>
      </View>
    ));
  };

  return (
    <AnimatedScreen animationType="slideUp" duration={500}>
      <ThemedView style={styles.container}>
        {/* Kaaba Icon */}
        <View style={styles.header}>
          <View style={styles.kaabaIconContainer}>
            <FontAwesome5 name="kaaba" size={48} color={colors.primary} />
          </View>
          <ThemedText type="headline" size="large" weight="bold">
            اتجاه القبلة
          </ThemedText>
        </View>

        {/* Compass */}
        <View style={styles.compassContainer}>
          <View style={[styles.compassOuterRing, { borderColor: colorScheme === 'dark' ? '#444' : '#ddd' }]}>
            <View style={[styles.compassInnerContainer]}>
              {renderCompassTicks()}
              {renderCardinalLabels()}

              {/* Static Qibla indicator */}
              <View
                style={[
                  styles.qiblaIndicator,
                  {
                    transform: [
                      { rotate: `60deg` },
                      { translateY: -COMPASS_SIZE / 2 + 10 },
                    ],
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            </View>

            {/* Center arrow */}
            <View style={styles.compassCenter}>
              <View style={[styles.compassArrow, { borderBottomColor: colors.primary }]} />
              <View style={[styles.compassDot, { backgroundColor: colors.primary }]} />
            </View>
          </View>

          {/* Direction text */}
          <View style={styles.directionTextContainer}>
            <ThemedText type="title" size="large" weight="bold" style={styles.directionText}>
              أمامك مباشرة • 60°
            </ThemedText>
            <ThemedText type="body" size="medium" style={styles.directionSubtext}>
              وجه هاتفك نحو السهم الأخضر
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  kaabaIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(29,185,84,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  compassContainer: { alignItems: 'center', marginTop: 20 },
  compassOuterRing: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    borderRadius: COMPASS_SIZE / 2,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  compassInnerContainer: {
    width: '100%',
    height: '100%',
    borderRadius: COMPASS_SIZE / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: { position: 'absolute', borderRadius: 1 },
  cardinalLabel: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  qiblaIndicator: { position: 'absolute', width: 6, height: 20, borderRadius: 3 },
  compassCenter: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  compassArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    top: -35,
  },
  compassDot: { width: 16, height: 16, borderRadius: 8 },
  directionTextContainer: { marginTop: 30, alignItems: 'center' },
  directionText: { fontSize: 22, marginBottom: 8 },
  directionSubtext: { opacity: 0.7 },
});
