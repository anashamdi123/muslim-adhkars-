import { AnimatedScreen } from "@/components/animated-screen";
import { CommonHeader } from "@/components/common-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export default function PrayersScreen() {
  const { prayers, loading, error, location, refreshPrayerTimes } = usePrayerTimes();
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Find next prayer
  const getNextPrayer = () => {
    const now = new Date();
    return prayers.find(prayer => prayer.timestamp > now.getTime()) || prayers[0];
  };

  const nextPrayer = getNextPrayer();

  // Format time remaining
  const getTimeRemaining = (prayerTimestamp: number) => {
    const now = new Date().getTime();
    const diff = prayerTimestamp - now;
    
    if (diff <= 0) return "الآن";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `بعد ${hours} ساعة و ${minutes} دقيقة`;
    }
    return `بعد ${minutes} دقيقة`;
  };

  const renderPrayerItem = ({ item }: { item: any }) => {
    const isNext = nextPrayer && item.name === nextPrayer.name;
    const isPassed = item.timestamp < currentTime.getTime();
    
    return (
      <View style={[styles.prayerItem, { backgroundColor: colors.card }]}>
        <View style={styles.prayerInfo}>
          <ThemedText 
            type="title" 
            size="large" 
            weight="bold"
            style={[styles.prayerName, { color: colors.text }]}
          >
            {item.name}
          </ThemedText>
          
          <ThemedText 
            type="body" 
            size="large" 
            weight="semiBold"
            style={[styles.prayerTime, { color: colors.text }]}
          >
            {item.time}
          </ThemedText>
        </View>
        
        <View style={styles.prayerStatus}>
          {isNext && (
            <View style={[styles.nextIndicator, { backgroundColor: colors.primary }]}>
              <ThemedText style={styles.nextText}>التالي</ThemedText>
            </View>
          )}
          
          {isPassed && !isNext && (
            <MaterialIcons name="check-circle" size={24} color={colors.primary} />
          )}
          
          {isNext && (
            <ThemedText 
              type="label" 
              size="small" 
              style={[styles.timeRemaining, { color: colors.textSecondary }]}
            >
              {getTimeRemaining(item.timestamp)}
            </ThemedText>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <AnimatedScreen animationType="fade" duration={400}>
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
          <CommonHeader title="مواقيت الصلاة" showBackButton={false} />
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

  if (error) {
    return (
      <AnimatedScreen animationType="fade" duration={400}>
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
          <CommonHeader title="مواقيت الصلاة" showBackButton={false} />
          <View style={styles.center}>
            <MaterialIcons name="error-outline" size={48} color={colors.error} />
            <ThemedText style={{ marginTop: Spacing.md, color: colors.error, textAlign: 'center' }}>
              {error}
            </ThemedText>
            <ThemedText 
              style={{ marginTop: Spacing.lg, color: colors.primary, textAlign: 'center' }}
              onPress={refreshPrayerTimes}
            >
              إعادة المحاولة
            </ThemedText>
          </View>
        </ThemedView>
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen animationType="fade" duration={400}>
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <CommonHeader title="مواقيت الصلاة" showBackButton={false} />
        
        {location && (
          <View style={[styles.locationCard, { backgroundColor: colors.card }]}>
            <MaterialIcons name="location-on" size={18} color={colors.primary} />
            <ThemedText 
              type="body" 
              size="small" 
              style={[styles.locationText, { color: colors.textSecondary }]}
            >
              {location}
            </ThemedText>
          </View>
        )}
        
        <FlatList
          data={prayers}
          renderItem={renderPrayerItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.footer}>
          <ThemedText 
            type="label" 
            size="small" 
            style={[styles.footerText, { color: colors.textSecondary }]}
          >
            التحديث التلقائي في منتصف الليل
          </ThemedText>
        </View>
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
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
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
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  prayerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.md,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  prayerInfo: {
    flex: 1,
  },
  prayerName: {
    marginBottom: Spacing.xs,
  },
  prayerTime: {
    fontSize: 20,
  },
  prayerStatus: {
    alignItems: 'flex-end',
  },
  nextIndicator: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    marginBottom: Spacing.xs,
  },
  nextText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  timeRemaining: {
    fontSize: 12,
  },
  footer: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  footerText: {
    fontSize: 12,
  },
});