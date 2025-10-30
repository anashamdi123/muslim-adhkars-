  import { AnimatedScreen } from "@/components/animated-screen";
import { CommonHeader } from "@/components/common-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Animated, StyleSheet, View } from "react-native";

  /**
   * Utility: calculate Qibla bearing from user's location
   * using formula for Great Circle Bearing
   */
  const getQiblaAngle = (latitude: number, longitude: number) => {
    const kaabaLat = 21.4225 * (Math.PI / 180); // Makkah latitude
    const kaabaLng = 39.8262 * (Math.PI / 180); // Makkah longitude
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

    return (angle + 360) % 360; // Normalize to 0–360°
  };

  /**
   * Converts magnetometer vector into heading (0–360°)
   */
  const getHeading = (magnetometer: { x: number; y: number; z: number }) => {
    let { x, y } = magnetometer;
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = angle >= 0 ? angle : angle + 360;
    return angle;
  };

  type ErrorType = 'location_permission' | 'location_unavailable' | 'magnetometer_unavailable' | 'calculation_error' | null;

  export default function QiblaScreen() {
    const { colorScheme } = useTheme();
    const colors = Colors[colorScheme];

    // State management
    const [heading, setHeading] = useState(0);
    const [qiblaAngle, setQiblaAngle] = useState(0);
    const [rotationAnim] = useState(new Animated.Value(0));
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorType>(null);
    const [locationName, setLocationName] = useState<string>('');
    const [magnetometerAvailable, setMagnetometerAvailable] = useState(false);

    // Initialize Qibla functionality
    const initializeQibla = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1️⃣ Check magnetometer availability
        const available = await Magnetometer.isAvailableAsync();
        if (!available) {
          setError('magnetometer_unavailable');
          setIsLoading(false);
          return;
        }
        setMagnetometerAvailable(true);

        // 2️⃣ Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('location_permission');
          setIsLoading(false);
          return;
        }

        // 3️⃣ Get current location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        // 4️⃣ Calculate Qibla angle
        const angle = getQiblaAngle(
          location.coords.latitude,
          location.coords.longitude
        );
        setQiblaAngle(angle);

        // 5️⃣ Get location name (reverse geocoding)
        try {
          const [address] = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          if (address) {
            const name = address.city || address.region || address.country || 'موقعك الحالي';
            setLocationName(name);
          }
        } catch (e) {
          setLocationName('موقعك الحالي');
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Qibla initialization error:', err);
        setError('location_unavailable');
        setIsLoading(false);
      }
    };

    // Subscribe to magnetometer updates
    useEffect(() => {
      let subscription: any;

      if (magnetometerAvailable && !error && !isLoading) {
        subscription = Magnetometer.addListener((data) => {
          const newHeading = getHeading(data);
          setHeading(newHeading);
        });

        Magnetometer.setUpdateInterval(100); // Smooth updates
      }

      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    }, [magnetometerAvailable, error, isLoading]);

    // Initialize on mount
    useEffect(() => {
      initializeQibla();

      return () => {
        // Cleanup
        Magnetometer.removeAllListeners();
      };
    }, []);

    // Compute rotation (Qibla relative to North)
    const rotation = ((qiblaAngle - heading + 360) % 360);

    // Animate the arrow rotation
    useEffect(() => {
      if (!isLoading && !error) {
        Animated.spring(rotationAnim, {
          toValue: rotation,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }).start();
      }
    }, [rotation, isLoading, error]);

    // Get error message
    const getErrorMessage = (): { title: string; message: string } => {
      switch (error) {
        case 'location_permission':
          return {
            title: 'إذن الموقع مطلوب',
            message: 'يرجى السماح بالوصول إلى موقعك لتحديد اتجاه القبلة',
          };
        case 'location_unavailable':
          return {
            title: 'خطأ في الموقع',
            message: 'تعذر الحصول على موقعك. تأكد من تفعيل خدمات الموقع',
          };
        case 'magnetometer_unavailable':
          return {
            title: 'البوصلة غير متوفرة',
            message: 'جهازك لا يدعم البوصلة المغناطيسية',
          };
        case 'calculation_error':
          return {
            title: 'خطأ في الحساب',
            message: 'حدث خطأ أثناء حساب اتجاه القبلة',
          };
        default:
          return {
            title: 'حدث خطأ',
            message: 'يرجى المحاولة مرة أخرى',
          };
      }
    };

    // Render error state
    const renderError = () => {
      const errorInfo = getErrorMessage();
      return (
        <View style={styles.center}>
          <MaterialIcons name="error-outline" size={48} color={colors.error} />
          <ThemedText style={{ marginTop: Spacing.md, color: colors.error, textAlign: 'center' }}>
            {errorInfo.title}
          </ThemedText>
          <ThemedText style={{ marginTop: Spacing.sm, color: colors.textSecondary, textAlign: 'center' }}>
            {errorInfo.message}
          </ThemedText>
          <ThemedText 
            style={{ marginTop: Spacing.lg, color: colors.primary, textAlign: 'center' }}
            onPress={initializeQibla}
          >
            إعادة المحاولة
          </ThemedText>
        </View>
      );
    };

    // Render loading state
    const renderLoading = () => (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <ThemedText style={{ marginTop: Spacing.md, color: colors.textSecondary }}>
          جاري تحديد اتجاه القبلة...
        </ThemedText>
      </View>
    );

    // Render compass
    const renderCompass = () => (
      <View style={styles.content}>
        {/* Location Card */}
        {locationName && (
          <View style={[styles.locationCard, { backgroundColor: colors.card }]}>
            <MaterialIcons name="location-on" size={18} color={colors.primary} />
            <ThemedText 
              type="body" 
              size="small" 
              style={[styles.locationText, { color: colors.textSecondary }]}
            >
              {locationName}
            </ThemedText>
          </View>
        )}

        {/* Kaaba Icon */}
        <View style={styles.kaabaFixed}>
          <View style={[styles.kaabaContainer, { backgroundColor: colors.primary }]}>
            <FontAwesome5 name="kaaba" size={70} color="#FFFFFF" />
          </View>
          <ThemedText type="title" size="large" weight="bold" style={{ color: colors.text, marginTop: Spacing.sm }}>
            القبلة
          </ThemedText>
        </View>

        {/* Compass */}
        <View style={styles.compassWrapper}>
          <View
            style={[
              styles.compassCircle,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            {/* Cardinal Points */}
            <ThemedText type="title" size="large" weight="bold" style={[styles.directionText, styles.north, { color: colors.primary }]}>
              ش
            </ThemedText>
            <ThemedText type="title" size="medium" weight="semiBold" style={[styles.directionText, styles.south, { color: colors.textSecondary }]}>
              ج
            </ThemedText>
            <ThemedText type="title" size="medium" weight="semiBold" style={[styles.directionText, styles.east, { color: colors.textSecondary }]}>
              ق
            </ThemedText>
            <ThemedText type="title" size="medium" weight="semiBold" style={[styles.directionText, styles.west, { color: colors.textSecondary }]}>
              غ
            </ThemedText>

            {/* Qibla Arrow */}
            <Animated.View
              style={[
                styles.arrowContainer,
                {
                  transform: [
                    {
                      rotate: rotationAnim.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <MaterialIcons
                name="navigation"
                size={100}
                color={colors.primary}
              />
            </Animated.View>

            {/* Center Dot */}
            <View style={[styles.centerDot, { backgroundColor: colors.primary }]} />
          </View>

          {/* Instruction */}
          <ThemedText type="body" size="small" style={[styles.instruction, { color: colors.textSecondary }]}>
            وجه هاتفك نحو السهم الأخضر
          </ThemedText>
        </View>
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.xl,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: Spacing.xl,
    },
    locationCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      marginHorizontal: Spacing.lg,
      marginBottom: Spacing.lg,
      borderRadius: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    locationText: {
      marginRight: Spacing.sm,
      flex: 1,
    },
    kaabaFixed: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing.xl,
    },
    kaabaContainer: {
      width: 110,
      height: 110,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    compassWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing.xxxl,
    },
    compassCircle: {
      width: 300,
      height: 300,
      borderRadius: 150,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    arrowContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      position: 'absolute',
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    directionText: {
      position: 'absolute',
      fontSize: 18,
      fontWeight: '600',
    },
    north: { top: 12 },
    south: { bottom: 12 },
    east: { right: 14 },
    west: { left: 14 },
    instruction: {
      marginTop: Spacing.lg,
      textAlign: 'center',
      opacity: 0.8,
    },
  });