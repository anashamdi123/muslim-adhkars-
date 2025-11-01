import { AnimatedScreen } from "@/components/animated-screen";
import { CommonHeader } from "@/components/common-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

/** Utility to calculate Qibla bearing from user's location */
const getQiblaAngle = (latitude: number, longitude: number) => {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLng = 39.8262 * (Math.PI / 180);
  const userLat = latitude * (Math.PI / 180);
  const userLng = longitude * (Math.PI / 180);
  const deltaLng = kaabaLng - userLng;

  const angle =
    (Math.atan2(
      Math.sin(deltaLng),
      Math.cos(userLat) * Math.tan(kaabaLat) -
        Math.sin(userLat) * Math.cos(deltaLng)
    ) *
      180) /
    Math.PI;

  return (angle + 360) % 360;
};

/** Converts magnetometer vector into heading (0–360°) */
const getHeading = (magnetometer: { x: number; y: number; z: number }) => {
  let { x, y } = magnetometer;
  let angle = Math.atan2(y, x) * (180 / Math.PI);
  return angle >= 0 ? angle : angle + 360;
};

type ErrorType =
  | "location_permission"
  | "location_unavailable"
  | "magnetometer_unavailable"
  | "calculation_error"
  | null;

export default function QiblaScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const screenWidth = Dimensions.get("window").width;
  const compassSize = Math.min(screenWidth * 0.8, 320);

  const [heading, setHeading] = useState(0);
  const [qiblaAngle, setQiblaAngle] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);
  const [locationName, setLocationName] = useState<string>("");

  const rotationAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  /** Initialize Qibla + permissions */
  const initializeQibla = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const available = await Magnetometer.isAvailableAsync();
      if (!available) {
        setError("magnetometer_unavailable");
        setIsLoading(false);
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("location_permission");
        setIsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const angle = getQiblaAngle(
        location.coords.latitude,
        location.coords.longitude
      );
      setQiblaAngle(angle);

      try {
        const [address] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        const name =
          address?.city ||
          address?.region ||
          address?.country ||
          "موقعك الحالي";
        setLocationName(name);
      } catch {
        setLocationName("موقعك الحالي");
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Qibla init error:", err);
      setError("location_unavailable");
      setIsLoading(false);
    }
  };

  /** Subscribe to magnetometer */
  useEffect(() => {
    let subscription: any;
    const subscribe = async () => {
      const available = await Magnetometer.isAvailableAsync();
      if (available) {
        subscription = Magnetometer.addListener((data) => {
          setHeading(getHeading(data));
        });
        Magnetometer.setUpdateInterval(100);
      }
    };
    subscribe();
    return () => subscription?.remove();
  }, []);

  /** Compute rotation animation */
  useEffect(() => {
    if (!isLoading && !error) {
      const rotation = ((qiblaAngle - heading + 360) % 360);
      Animated.timing(rotationAnim, {
        toValue: rotation,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [heading, qiblaAngle, isLoading, error]);

  /** Subtle glow pulse animation for Kaaba */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  /** Retry & error messages */
  const renderError = () => {
    const errorMessages: Record<string, { title: string; msg: string }> = {
      location_permission: {
        title: "إذن الموقع مرفوض",
        msg: "يجب السماح بالوصول إلى الموقع لتحديد القبلة.",
      },
      location_unavailable: {
        title: "تعذر تحديد الموقع",
        msg: "تأكد من تفعيل خدمات الموقع، ثم أعد المحاولة.",
      },
      magnetometer_unavailable: {
        title: "البوصلة غير متوفرة",
        msg: "جهازك لا يحتوي على مستشعر بوصلة مغناطيسية.",
      },
    };
    const e = error ? errorMessages[error] : { title: "خطأ", msg: "حدث خطأ غير متوقع." };
    return (
      <View style={styles.center}>
        <MaterialIcons name="error-outline" size={64} color={colors.error} />
        <ThemedText style={{ color: colors.error, marginTop: Spacing.md }} weight="bold">
          {e.title}
        </ThemedText>
        <ThemedText style={{ color: colors.textSecondary, textAlign: "center", marginTop: Spacing.sm }}>
          {e.msg}
        </ThemedText>
        <ThemedText
          onPress={initializeQibla}
          style={{ color: colors.primary, marginTop: Spacing.lg }}
          weight="semiBold"
        >
          إعادة المحاولة
        </ThemedText>
      </View>
    );
  };

  /** Loading indicator */
  const renderLoading = () => (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
      <ThemedText style={{ color: colors.textSecondary, marginTop: Spacing.md }}>
        جاري تحديد اتجاه القبلة...
      </ThemedText>
    </View>
  );

  /** Compass display */
  const renderCompass = () => (
    <View style={styles.content}>
      {locationName && (
        <View style={[styles.locationCard, { backgroundColor: colors.card }]}>
          <MaterialIcons name="location-on" size={18} color={colors.primary} />
          <ThemedText style={[styles.locationText, { color: colors.textSecondary }]}>
            {locationName}
          </ThemedText>
        </View>
      )}

      <View style={styles.kaabaContainer}>
        <Animated.View
          style={[
            styles.kaabaGlow,
            {
              opacity: glowAnim,
              backgroundColor: colors.primary,
            },
          ]}
        />
        <FontAwesome5 name="kaaba" size={72} color={colors.primary} />
        <ThemedText weight="bold" size="large" style={{ color: colors.text, marginTop: 6 }}>
          القبلة
        </ThemedText>
      </View>

      <View style={[styles.compassCircle, { width: compassSize, height: compassSize, borderRadius: compassSize / 2, backgroundColor: colors.card }]}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotationAnim.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        >
          <MaterialIcons name="navigation" size={100} color={colors.primary} style={{ alignSelf: "center" }} />
        </Animated.View>
        <View style={[styles.centerDot, { backgroundColor: colors.primary }]} />
      </View>

      <ThemedText style={[styles.instruction, { color: colors.textSecondary }]}>
        وجه هاتفك نحو السهم لتحديد القبلة
      </ThemedText>
    </View>
  );

  return (
    <AnimatedScreen animationType="fade" duration={400}>
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <CommonHeader title="اتجاه القبلة" showBackButton={false} />
        {isLoading ? renderLoading() : error ? renderError() : renderCompass()}
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  locationText: {
    marginEnd: Spacing.sm,
    flex: 1,
    textAlign: "right",
  },
  kaabaContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  kaabaGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.3,
  },
  compassCircle: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  centerDot: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    elevation: 2,
  },
  instruction: {
    marginTop: Spacing.xl,
    textAlign: "center",
  },
});
