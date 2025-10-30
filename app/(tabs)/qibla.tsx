import { AnimatedScreen } from "@/components/animated-screen";
import { CommonHeader } from "@/components/common-header";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function QiblaScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  // Example rotation (replace later with real magnetometer heading)
  const rotation = "60deg";

  return (
    <AnimatedScreen animationType="fade" duration={400}>
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <CommonHeader title="اتجاه القبلة" showBackButton />

        <View style={styles.content}>
          {/* Fixed Kaaba Icon */}
          <View style={styles.kaabaFixed}>
            <FontAwesome5 name="kaaba" size={80} color={colors.primary} />
            <Text style={[styles.label, { color: colors.textSecondary }]}>القبلة</Text>
          </View>

          {/* Compass */}
          <View style={styles.compassWrapper}>
            <View
              style={[
                styles.glassCircle,
                {
                  backgroundColor: `${colors.card}40`,
                  borderColor: `${colors.border}50`,
                },
              ]}
            >
              {/* Cardinal Points */}
              <Text style={[styles.directionText, styles.north, { color: colors.primary }]}>N</Text>
              <Text style={[styles.directionText, styles.south, { color: colors.textSecondary }]}>S</Text>
              <Text style={[styles.directionText, styles.east, { color: colors.textSecondary }]}>E</Text>
              <Text style={[styles.directionText, styles.west, { color: colors.textSecondary }]}>W</Text>

              {/* Centered Arrow */}
              <Animated.View
                style={[
                  styles.arrowContainer,
                  {
                    transform: [{ rotate: rotation }],
                  },
                ]}
              >
                <MaterialIcons
                  name="navigation"
                  size={110}
                  color={colors.primary}
                  style={{ transform: [{ rotate: "180deg" }] }} // ensures arrow points upward initially
                />
              </Animated.View>

              {/* Center Dot */}
              <View style={[styles.centerDot, { backgroundColor: colors.primary }]} />
            </View>
          </View>
        </View>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xxxl,
  },

  /* --- Kaaba Icon --- */
  kaabaFixed: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: "500",
    opacity: 0.8,
  },

  /* --- Compass --- */
  compassWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  glassCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },

  /* Arrow centered on compass */
  arrowContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  centerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: "absolute",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },

  /* --- Cardinal Directions --- */
  directionText: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "600",
  },
  north: { top: 10 },
  south: { bottom: 10 },
  east: { right: 12 },
  west: { left: 12 },
});
