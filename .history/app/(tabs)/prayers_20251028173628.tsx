import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { StaggeredView } from '@/components/staggered-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function PrayersScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const { prayers: prayerTimes, loading, error, location, refreshPrayerTimes } = usePrayerTimes();
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every minute to recalculate prayer status
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Determine prayer status (completed, next, upcoming)
  const getPrayerStatus = (timestamp: number, index: number) => {
    if (timestamp < currentTime) {
      return 'completed';
    }
    // Find the next prayer (first one that hasn't passed)
    const nextPrayerIndex = prayerTimes.findIndex(p => p.timestamp > currentTime);
    if (index === nextPrayerIndex) {
      return 'next';
    }
    return 'upcoming';
  };

  // Calculate time remaining until next prayer
  const getTimeRemaining = (timestamp: number): string => {
    const diff = timestamp - currentTime;
    if (diff <= 0) return '';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `بعد ${hours} ساعة و ${minutes} دقيقة`;
    }
    return `بعد ${minutes} دقيقة`;
  };

  // Get current Hijri date
  const getHijriDate = (): string => {
    // Simple approximation - you can use a library for accurate conversion
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 
                          'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const date = new Date();
    // This is a placeholder - use proper Hijri conversion library for production
    return '15 ربيع الآخر 1446';
  };

  const prayers = prayerTimes.map((prayer, index) => ({
    ...prayer,
    status: getPrayerStatus(prayer.timestamp, index),
  }));

  const nextPrayer = prayers.find(p => p.status === 'next');

  return (
    <AnimatedScreen animationType="fade" duration={400}>
      <ThemedView style={styles.container}>
        <CommonHeader title="مواقيت الصلاة" />
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Loading State */}
          {loading && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <ThemedText 
                type="body" 
                size="medium" 
                weight="medium"
                style={[styles.loadingText, { color: colors.icon }]}
              >
                جاري تحميل مواقيت الصلاة...
              </ThemedText>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View style={styles.centerContainer}>
              <MaterialIcons name="error-outline" size={48} color={colors.error} />
              <ThemedText 
                type="body" 
                size="medium" 
                weight="medium"
                style={[styles.errorText, { color: colors.error }]}
              >
                {error}
              </ThemedText>
              <TouchableOpacity 
                style={[styles.retryButton, { backgroundColor: colors.primary }]}
                onPress={refreshPrayerTimes}
              >
                <ThemedText type="body" size="medium" weight="bold" style={styles.retryButtonText}>
                  إعادة المحاولة
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}

          {/* Content - Only show when not loading and no error */}
          {!loading && !error && (
            <>
              {/* Next Prayer Card - Prominent Display */}
              {nextPrayer && (
          <StaggeredView index={0} animationType="fadeUp" staggerDelay={100} duration={400}>
            <View style={[
              styles.nextPrayerCard, 
              { 
                backgroundColor: colors.primary,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }
            ]}>
              <View style={styles.nextPrayerHeader}>
                <MaterialIcons name="schedule" size={24} color="#fff" />
                <ThemedText 
                  type="body" 
                  size="medium" 
                  weight="medium"
                  style={styles.nextPrayerLabel}
                >
                  الصلاة القادمة
                </ThemedText>
              </View>
              
              <ThemedText 
                type="display" 
                size="medium" 
                weight="bold"
                style={styles.nextPrayerName}
              >
                {nextPrayer.name}
              </ThemedText>
              
              <ThemedText 
                type="display" 
                size="large" 
                weight="bold"
                style={styles.nextPrayerTime}
              >
                {nextPrayer.time}
              </ThemedText>
              
              {getTimeRemaining(nextPrayer.timestamp) && (
                <ThemedText 
                  type="body" 
                  size="small" 
                  weight="regular"
                  style={styles.timeRemaining}
                >
                  {getTimeRemaining(nextPrayer.timestamp)}
                </ThemedText>
              )}
            </View>
              </StaggeredView>
            )}

            {/* Simple Date & Location Info */}
            <StaggeredView index={1} animationType="fadeUp" staggerDelay={100} duration={400}>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <MaterialIcons name="location-on" size={18} color={colors.icon} />
                  <ThemedText 
                    type="body" 
                    size="small" 
                    weight="regular"
                    style={[styles.infoText, { color: colors.icon }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {location || 'جاري تحديد الموقع...'}
                  </ThemedText>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoItem}>
                  <MaterialIcons name="calendar-today" size={18} color={colors.icon} />
                  <ThemedText 
                    type="body" 
                    size="small" 
                    weight="regular"
                    style={[styles.infoText, { color: colors.icon }]}
                  >
                    {getHijriDate()}
                  </ThemedText>
                </View>
              </View>
            </StaggeredView>

            {/* All Prayers List - Clean & Simple */}
            <View style={styles.prayersContainer}>
          {prayers.map((prayer, index) => (
            <StaggeredView
              key={prayer.name}
              index={index + 2}
              animationType="fadeLeft"
              staggerDelay={60}
              duration={400}
            >
              <View style={[
                styles.prayerRow,
                prayer.status === 'next' && {
                  borderWidth: 2,
                  borderColor: colors.primary,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  marginHorizontal: -12,
                  backgroundColor: colors.primary + '30',
                }
              ]}>
                <View style={styles.prayerInfo}>
                  <ThemedText 
                    type="title" 
                    size="large" 
                    weight="bold"
                    style={[styles.prayerName, { color: colors.text }]}
                  >
                    {prayer.name}
                  </ThemedText>
                </View>
                
                <ThemedText 
                  type="headline" 
                  size="small" 
                  weight="bold"
                  style={[
                    styles.prayerTime,
                    { color: prayer.status === 'next' ? colors.primary : colors.text }
                  ]}
                >
                  {prayer.time}
                </ThemedText> 
              </View>
              
              {index < prayers.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
              </StaggeredView>
            ))}
          </View>
          </>
        )}
        </ScrollView>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  // Next Prayer Card - Hero Section
  nextPrayerCard: {
    padding: Spacing.xxl,
    borderRadius: BorderRadius.xxl,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: 'center',
    ...Shadows.lg,
  },
  nextPrayerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  nextPrayerLabel: {
    color: '#fff',
    opacity: 0.95,
  },
  nextPrayerName: {
    color: '#fff',
    marginTop: 4,
  },
  nextPrayerTime: {
    color: '#fff',
    marginTop: 8,
    fontSize: 48,
  },
  timeRemaining: {
    color: '#fff',
    marginTop: 8,
    opacity: 0.9,
  },
  // Info Row - Date & Location
  infoRow: {
    flexDirection: 'row-reverse', // RTL: items flow right-to-left
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  infoText: {
    fontSize: 13,
  },
  infoDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#ccc',
    marginHorizontal: Spacing.lg,
    opacity: 0.3,
  },
  // Prayers List - Clean Layout
  prayersContainer: {
    paddingHorizontal: Spacing.lg,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  prayerInfo: {
    flexDirection: 'row-reverse', // RTL: items flow right-to-left
    alignItems: 'center',
    gap: 8,
  },
  prayerName: {
    fontSize: 18,
  },
  prayerTime: {
    fontSize: 20,
  },
  divider: {
    height: 1,
    opacity: 0.1,
  },
  // Loading & Error States
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: Spacing.xl,
  },
  loadingText: {
    marginTop: Spacing.lg,
    textAlign: 'center',
  },
  errorText: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  retryButtonText: {
    color: '#fff',
  },
});
