import { AnimatedScreen } from "@/components/animated-screen";
import { CommonHeader } from "@/components/common-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { usePrayerTimesEnhanced } from "@/hooks/use-prayer-times-enhanced";
import { formatFullDate } from "@/utils/hijri-date";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function PrayersScreen() {
  const {
    prayers,
    loading,
    error,
    location,
    offline,
    refreshPrayerTimes,
    getPrayerTimesByDate,
  } = usePrayerTimesEnhanced();
  
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentPrayers, setCurrentPrayers] = useState(prayers);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNavigating, setIsNavigating] = useState(false);

  // Animation values
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Update current prayers when prayers change
  useEffect(() => {
    if (prayers.length > 0) {
      setCurrentPrayers(prayers);
    }
  }, [prayers]);

  // Load prayers for selected date
  useEffect(() => {
    const loadDayPrayers = async () => {
      if (isNavigating) {
        const result = await getPrayerTimesByDate(currentDate);
        setCurrentPrayers(result);
        setIsNavigating(false);
      }
    };
    loadDayPrayers();
  }, [currentDate, isNavigating, getPrayerTimesByDate]);

  // Navigate to previous/next day
  const navigateDay = useCallback(
    (direction: 'next' | 'prev') => {
      // Animate out
      opacity.value = withTiming(0, { duration: 200 });
      translateX.value = withSpring(direction === 'next' ? -30 : 30, {
        damping: 15,
        stiffness: 150,
      });

      setTimeout(() => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        setCurrentDate(newDate);
        setIsNavigating(true);

        // Animate in
        translateX.value = direction === 'next' ? 30 : -30;
        setTimeout(() => {
          translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
          opacity.value = withTiming(1, { duration: 200 });
        }, 50);
      }, 200);
    },
    [currentDate, opacity, translateX]
  );

  // Swipe gesture
  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.translationX > 80) {
        navigateDay('prev');
      } else if (event.translationX < -80) {
        navigateDay('prev');
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  // Get formatted date with Hijri
  const dateInfo = formatFullDate(currentDate);
  const isToday = dateInfo.isToday;
  const isTomorrow = dateInfo.isTomorrow;

  // Find next prayer for TODAY only (not affected by day navigation)
  const nextPrayer = prayers.length > 0
    ? prayers.find((p) => p.timestamp > currentTime.getTime()) || prayers[0]
    : null;

  // Calculate time remaining for countdown
  const getTimeRemaining = (): { hours: string; minutes: string; seconds: string; text: string } => {
    if (!nextPrayer) {
      return { hours: '00', minutes: '00', seconds: '00', text: '' };
    }

    const now = currentTime.getTime();
    const diff = nextPrayer.timestamp - now;

    // If prayer time has passed (negative diff)
    if (diff <= 0) {
      return { hours: '00', minutes: '00', seconds: '00', text: `باقي على أذان ${nextPrayer.name}` };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      text: `باقي على أذان ${nextPrayer.name}`,
    };
  };

  const timeRemaining = getTimeRemaining();

  const renderPrayerItem = (item: any, index: number) => {
    const isNext = nextPrayer && item.name === nextPrayer.name && isToday;
    const isPassed = isToday && item.timestamp < currentTime.getTime();

    return (
      <View
        key={item.name}
        style={[
          styles.prayerRow,
          isNext && { backgroundColor: colors.primary + '15' },
          { borderBottomColor: colors.border },
        ]}
      >
        {/* Prayer Time */}
        <View style={styles.timeContainer}>
          <ThemedText
            type="title"
            size="large"
            weight="bold"
            style={{ color: isNext ? colors.primary : colors.text }}
          >
            {item.time}
          </ThemedText>
        </View>

        {/* Prayer Name */}
        <View style={styles.nameContainer}>
          <ThemedText
            type="title"
            size="large"
            weight="semiBold"
            style={{ color: isNext ? colors.primary : colors.text }}
          >
            {item.name}
          </ThemedText>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <AnimatedScreen animationType="fade" duration={400}>
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
          <CommonHeader title="مواقيت الصلاة" />
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
            <ThemedText style={{ marginTop: Spacing.md, color: colors.textSecondary }}>
              جاري تحميل مواقيت الصلاة...
            </ThemedText>
          </View>
        </ThemedView>
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen animationType="fade" duration={400}>
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <CommonHeader title="مواقيت الصلاة" />

        {/* Fixed Top Section: Countdown Timer */}
        {nextPrayer && (
          <View style={[styles.countdownSection, { backgroundColor: colors.card }]}>
            {/* Location */}
            {location && (
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color={colors.primary} />
                <ThemedText type="body" size="medium" style={{ color: colors.textSecondary, marginRight: 4 }}>
                  {location}
                </ThemedText>
                {offline && (
                  <View style={[styles.offlineDot, { backgroundColor: colors.error }]} />
                )}
              </View>
            )}

            {/* Digital Timer */}
            <View style={styles.timerDisplay}>
              <View style={styles.timerUnit}>
                <ThemedText type="display" size="large" weight="bold" style={[styles.timerNumber, { color: colors.primary }]}>
                  {timeRemaining.hours}
                </ThemedText>
                <ThemedText type="label" size="small" style={{ color: colors.textSecondary }}>
                  ساعة
                </ThemedText>
              </View>

              <ThemedText type="display" size="large" weight="bold" style={[styles.timerColon, { color: colors.primary }]}>
                :
              </ThemedText>

              <View style={styles.timerUnit}>
                <ThemedText type="display" size="large" weight="bold" style={[styles.timerNumber, { color: colors.primary }]}>
                  {timeRemaining.minutes}
                </ThemedText>
                <ThemedText type="label" size="small" style={{ color: colors.textSecondary }}>
                  دقيقة
                </ThemedText>
              </View>

              <ThemedText type="display" size="large" weight="bold" style={[styles.timerColon, { color: colors.primary }]}>
                :
              </ThemedText>

              <View style={styles.timerUnit}>
                <ThemedText type="display" size="large" weight="bold" style={[styles.timerNumber, { color: colors.primary }]}>
                  {timeRemaining.seconds}
                </ThemedText>
                <ThemedText type="label" size="small" style={{ color: colors.textSecondary }}>
                  ثانية
                </ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Combined Section: Date Navigation & Prayer List - Swipeable */}
          <GestureDetector gesture={panGesture}>
            <Animated.View style={animatedStyle}>
              <View style={[styles.combinedSection, { backgroundColor: colors.card }]}>
                {/* Date Navigation Header */}
                <View style={[styles.dateSection, { borderBottomColor: colors.border }]}>
                  <TouchableOpacity
                    onPress={() => navigateDay('next')}
                    style={styles.dateNavButton}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="chevron-right" size={28} color={colors.text} />
                  </TouchableOpacity>

                  <View style={styles.dateContent}>
                    {/* Day prefix */}
                    {isToday && (
                      <ThemedText type="body" size="medium" style={{ color: colors.primary, marginBottom: Spacing.xs }}>
                        اليوم
                      </ThemedText>
                    )}
                    {isTomorrow && (
                      <ThemedText type="body" size="medium" style={{ color: colors.primary, marginBottom: Spacing.xs }}>
                        غداً
                      </ThemedText>
                    )}

                    {/* Gregorian Date */}
                    <ThemedText type="title" size="medium" weight="bold" style={{ color: colors.text, textAlign: 'center' }}>
                      {dateInfo.gregorian}
                    </ThemedText>

                    {/* Hijri Date */}
                    <ThemedText type="body" size="small" style={{ color: colors.textSecondary, marginTop: Spacing.xs, textAlign: 'center' }}>
                      {dateInfo.hijri}
                    </ThemedText>
                  </View>

                  <TouchableOpacity
                    onPress={() => navigateDay('prev')}
                    style={styles.dateNavButton}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="chevron-left" size={28} color={colors.text} />
                  </TouchableOpacity>
                </View>

                {/* Prayer List */}
                <View style={styles.prayerListSection}>
                  {currentPrayers.map((prayer, index) => renderPrayerItem(prayer, index))}
                </View>
              </View>
            </Animated.View>
          </GestureDetector>
        </ScrollView>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  scrollContent: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },

  // Countdown Section
  countdownSection: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.xl,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timerDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  timerUnit: {
    alignItems: 'center',
    minWidth: 70,
  },
  timerNumber: {
    fontSize: 48,
    lineHeight: 56,
    fontVariant: ['tabular-nums'],
  },
  timerColon: {
    fontSize: 48,
    lineHeight: 56,
    marginTop: -20,
  },

  // Combined Section (Date + Prayer List)
  combinedSection: {
    marginHorizontal: Spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // Date Section
  dateSection: {
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  dateNavButton: {
    padding: Spacing.sm,
  },
  dateContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  offlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs,
  },

  // Prayer List Section
  prayerListSection: {
    // No additional styling needed, inherits from combinedSection
  },
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
