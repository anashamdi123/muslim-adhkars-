import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

export interface PrayerTime {
  name: string;
  time: string;
  timestamp: number;
}

export interface UsePrayerTimesResult {
  prayers: PrayerTime[];
  loading: boolean;
  error: string | null;
  location: string | null;
  refreshPrayerTimes: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage Islamic prayer times
 * 
 * Features:
 * - Auto-detects location using expo-location
 * - Calculates accurate prayer times using adhan library (Muslim World League method)
 * - Auto-refreshes at midnight
 * - Handles loading and error states
 * - Works offline once data is fetched
 * - Includes reverse geocoding for location names
 * 
 * @example
 * ```typescript
 * const { prayers, loading, error, location } = usePrayerTimes();
 * 
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage message={error} />;
 * 
 * return (
 *   <View>
 *     {prayers.map(prayer => (
 *       <Text key={prayer.name}>{prayer.name}: {prayer.time}</Text>
 *     ))}
 *   </View>
 * );
 * ```
 */
export function usePrayerTimes(): UsePrayerTimesResult {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  /**
   * Format time to HH:mm
   */
  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  /**
   * Get location name from coordinates
   */
  const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode && geocode.length > 0) {
        const { city, subregion, region, country } = geocode[0];
        
        // Build location string with available data
        const parts = [];
        
        // Prefer city, then subregion, then region
        if (city) {
          parts.push(city);
        } else if (subregion) {
          parts.push(subregion);
        } else if (region) {
          parts.push(region);
        }
        
        // Add country if available
        if (country) {
          parts.push(country);
        }
        
        // Return formatted location or coordinates as fallback
        if (parts.length > 0) {
          return parts.join(', ');
        }
      }
      
      // Fallback to coordinates if geocoding fails
      console.warn('Geocoding returned no results, using coordinates');
      return `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
    } catch (err) {
      console.error('Geocoding error:', err);
      return `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
    }
  };

  /**
   * Calculate prayer times
   */
  const calculatePrayerTimes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Location permission denied. Please enable location access.');
        setLoading(false);
        return;
      }

      // Get current location
      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = locationData.coords;

      // Get location name
      const locationName = await getLocationName(latitude, longitude);
      setLocation(locationName);

      // Create coordinates for adhan
      const coordinates = new Coordinates(latitude, longitude);

      // Get current date
      const date = new Date();

      // Use Muslim World League calculation method (suitable for most locations)
      // You can change to CalculationMethod.NorthAmerica() for ISNA
      const params = CalculationMethod.MuslimWorldLeague();
      
      // Calculate prayer times
      const prayerTimes = new PrayerTimes(coordinates, date, params);

      // Structure prayer times
      const prayersList: PrayerTime[] = [
        {
          name: 'الفجر',
          time: formatTime(prayerTimes.fajr),
          timestamp: prayerTimes.fajr.getTime(),
        },
        {
          name: 'الشروق',
          time: formatTime(prayerTimes.sunrise),
          timestamp: prayerTimes.sunrise.getTime(),
        },
        {
          name: 'الظهر',
          time: formatTime(prayerTimes.dhuhr),
          timestamp: prayerTimes.dhuhr.getTime(),
        },
        {
          name: 'العصر',
          time: formatTime(prayerTimes.asr),
          timestamp: prayerTimes.asr.getTime(),
        },
        {
          name: 'المغرب',
          time: formatTime(prayerTimes.maghrib),
          timestamp: prayerTimes.maghrib.getTime(),
        },
        {
          name: 'العشاء',
          time: formatTime(prayerTimes.isha),
          timestamp: prayerTimes.isha.getTime(),
        },
      ];

      setPrayers(prayersList);
      setLoading(false);
    } catch (err) {
      console.error('Error calculating prayer times:', err);
      setError(err instanceof Error ? err.message : 'Failed to calculate prayer times');
      setLoading(false);
    }
  }, []);

  /**
   * Schedule midnight refresh
   */
  useEffect(() => {
    // Calculate prayer times on mount
    calculatePrayerTimes();

    // Calculate time until next midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set timeout to refresh at midnight
    const midnightTimeout = setTimeout(() => {
      calculatePrayerTimes();

      // Set up daily interval after first midnight refresh
      const dailyInterval = setInterval(() => {
        calculatePrayerTimes();
      }, 24 * 60 * 60 * 1000); // 24 hours

      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, [calculatePrayerTimes]);

  return {
    prayers,
    loading,
    error,
    location,
    refreshPrayerTimes: calculatePrayerTimes,
  };
}
