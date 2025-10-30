import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { PrayerCacheService, PrayerTime, CachedLocation } from '@/services/prayer-cache.service';

export interface UsePrayerTimesResult {
  prayers: PrayerTime[];
  loading: boolean;
  error: string | null;
  location: string | null;
  offline: boolean;
  refreshPrayerTimes: () => Promise<void>;
  getPrayerTimesByDate: (date: Date) => Promise<PrayerTime[]>;
}

/**
 * Enhanced custom hook to fetch and manage Islamic prayer times with offline support
 * 
 * Features:
 * - Offline support with yearly cache
 * - Auto-detects location changes
 * - Background sync when online
 * - Day navigation support
 * - Instant cached data loading
 * - Auto-refresh once daily
 */
export function usePrayerTimesEnhanced(): UsePrayerTimesResult {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [offline, setOffline] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<CachedLocation | null>(null);

  /**
   * Initialize with cached data if available
   */
  const initializeWithCache = useCallback(async () => {
    try {
      // Try to load last location
      const lastLocation = await PrayerCacheService.getLastLocation();
      
      if (lastLocation) {
        setCurrentLocation(lastLocation);
        setLocation(lastLocation.name);
        
        // Load today's prayers from cache
        const today = new Date();
        const cachedPrayers = await PrayerCacheService.getPrayersForDate(
          today,
          lastLocation.latitude,
          lastLocation.longitude,
          lastLocation.name
        );
        
        if (cachedPrayers && cachedPrayers.length > 0) {
          setPrayers(cachedPrayers);
          setLoading(false);
          setOffline(true);
          return true;
        }
      }
      
      return false;
    } catch (err) {
      console.error('Error loading cache:', err);
      return false;
    }
  }, []);

  /**
   * Fetch current location and prayer times
   */
  const fetchPrayerTimes = useCallback(async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        setLoading(true);
      }
      setError(null);

      // Check online status
      const isOnline = await PrayerCacheService.isOnline();
      setOffline(!isOnline);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        // If permission denied, try to use cached location
        const hasCache = await initializeWithCache();
        if (!hasCache) {
          setError('يرجى السماح بالوصول إلى الموقع');
        }
        setLoading(false);
        return;
      }

      // Get current location with timeout
      const locationData = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Location timeout')), 10000)
        )
      ]);

      const { latitude, longitude } = locationData.coords;

      // Check if location changed significantly
      const locationChanged = currentLocation
        ? PrayerCacheService.hasLocationChanged(
            currentLocation.latitude,
            currentLocation.longitude,
            latitude,
            longitude
          )
        : true;

      // Get location name
      const locationName = await PrayerCacheService.getLocationName(
        latitude,
        longitude
      );
      setLocation(locationName);

      // Save current location
      const newLocation: CachedLocation = {
        latitude,
        longitude,
        name: locationName,
        timestamp: Date.now(),
      };
      setCurrentLocation(newLocation);
      await PrayerCacheService.saveLastLocation(newLocation);

      // Get today's prayers (will cache entire year if needed)
      const today = new Date();
      const todayPrayers = await PrayerCacheService.getPrayersForDate(
        today,
        latitude,
        longitude,
        locationName
      );

      setPrayers(todayPrayers);
      setLoading(false);

      // Background cache next year if location changed
      if (locationChanged && isOnline) {
        const nextYear = new Date().getFullYear() + 1;
        PrayerCacheService.cacheYearPrayers(
          latitude,
          longitude,
          nextYear,
          locationName
        ).catch((err) => console.error('Background cache error:', err));
      }
    } catch (err) {
      console.error('Error fetching prayer times:', err);
      
      // Try to use cached data on error
      const hasCache = await initializeWithCache();
      
      if (!hasCache) {
        // Provide user-friendly error messages
        const errorMessage = err instanceof Error && err.message.includes('Location')
          ? 'تعذر الحصول على الموقع. يرجى التأكد من تفعيل خدمات الموقع'
          : 'فشل في تحميل مواقيت الصلاة. يرجى المحاولة لاحقاً';
        setError(errorMessage);
      } else {
        // We have cache, so just show offline mode
        setOffline(true);
      }
      setLoading(false);
    }
  }, [currentLocation, initializeWithCache]);

  /**
   * Get prayers for a specific date
   */
  const getPrayerTimesByDate = useCallback(
    async (date: Date): Promise<PrayerTime[]> => {
      try {
        if (!currentLocation) {
          return prayers; // Return current if no location
        }

        const datePrayers = await PrayerCacheService.getPrayersForDate(
          date,
          currentLocation.latitude,
          currentLocation.longitude,
          currentLocation.name
        );

        return datePrayers;
      } catch (err) {
        console.error('Error getting prayers for date:', err);
        return prayers;
      }
    },
    [currentLocation, prayers]
  );

  /**
   * Initialize on mount
   */
  useEffect(() => {
    const initialize = async () => {
      // First try to load from cache instantly
      const hasCache = await initializeWithCache();
      
      // Then fetch fresh data in background
      if (hasCache) {
        // Delay to avoid blocking UI
        setTimeout(() => {
          fetchPrayerTimes(true);
        }, 1000);
      } else {
        await fetchPrayerTimes();
      }
    };

    initialize();
  }, []);

  /**
   * Schedule daily refresh at midnight
   */
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimeout = setTimeout(() => {
      fetchPrayerTimes(true);

      // Set up daily interval
      const dailyInterval = setInterval(() => {
        fetchPrayerTimes(true);
      }, 24 * 60 * 60 * 1000);

      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, [fetchPrayerTimes]);

  return {
    prayers,
    loading,
    error,
    location,
    offline,
    refreshPrayerTimes: () => fetchPrayerTimes(true),
    getPrayerTimesByDate,
  };
}
