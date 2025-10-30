import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculationMethod, Coordinates, PrayerTimes as AdhanPrayerTimes } from 'adhan';
import * as Location from 'expo-location';

export interface PrayerTime {
  name: string;
  time: string;
  timestamp: number;
}

export interface DayPrayers {
  date: string; // YYYY-MM-DD format
  prayers: PrayerTime[];
}

export interface CachedLocation {
  latitude: number;
  longitude: number;
  name: string;
  timestamp: number;
}

export interface YearlyCache {
  year: number;
  location: CachedLocation;
  days: { [date: string]: PrayerTime[] };
  lastUpdated: number;
}

const CACHE_KEY_PREFIX = 'prayer_times_';
const LOCATION_KEY = 'last_location';
const CACHE_VERSION = '1.0';

export class PrayerCacheService {
  /**
   * Format time to HH:mm
   */
  private static formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Get date string in YYYY-MM-DD format
   */
  private static getDateString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Calculate prayer times for a specific date
   */
  private static calculateDayPrayers(
    coordinates: Coordinates,
    date: Date
  ): PrayerTime[] {
    const params = CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new AdhanPrayerTimes(coordinates, date, params);

    return [
      {
        name: 'الفجر',
        time: this.formatTime(prayerTimes.fajr),
        timestamp: prayerTimes.fajr.getTime(),
      },
      {
        name: 'الشروق',
        time: this.formatTime(prayerTimes.sunrise),
        timestamp: prayerTimes.sunrise.getTime(),
      },
      {
        name: 'الظهر',
        time: this.formatTime(prayerTimes.dhuhr),
        timestamp: prayerTimes.dhuhr.getTime(),
      },
      {
        name: 'العصر',
        time: this.formatTime(prayerTimes.asr),
        timestamp: prayerTimes.asr.getTime(),
      },
      {
        name: 'المغرب',
        time: this.formatTime(prayerTimes.maghrib),
        timestamp: prayerTimes.maghrib.getTime(),
      },
      {
        name: 'العشاء',
        time: this.formatTime(prayerTimes.isha),
        timestamp: prayerTimes.isha.getTime(),
      },
    ];
  }

  /**
   * Calculate and cache entire year of prayer times
   */
  static async cacheYearPrayers(
    latitude: number,
    longitude: number,
    year: number,
    locationName: string
  ): Promise<YearlyCache> {
    const coordinates = new Coordinates(latitude, longitude);
    const days: { [date: string]: PrayerTime[] } = {};

    // Calculate for entire year
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = this.getDateString(date);
        days[dateString] = this.calculateDayPrayers(coordinates, date);
      }
    }

    const cache: YearlyCache = {
      year,
      location: {
        latitude,
        longitude,
        name: locationName,
        timestamp: Date.now(),
      },
      days,
      lastUpdated: Date.now(),
    };

    // Save to AsyncStorage
    await AsyncStorage.setItem(
      `${CACHE_KEY_PREFIX}${year}`,
      JSON.stringify(cache)
    );

    return cache;
  }

  /**
   * Get cached year data
   */
  static async getCachedYear(year: number): Promise<YearlyCache | null> {
    try {
      const cached = await AsyncStorage.getItem(`${CACHE_KEY_PREFIX}${year}`);
      if (cached) {
        return JSON.parse(cached);
      }
      return null;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }

  /**
   * Get prayers for a specific date (from cache or calculate)
   */
  static async getPrayersForDate(
    date: Date,
    latitude: number,
    longitude: number,
    locationName: string
  ): Promise<PrayerTime[]> {
    const year = date.getFullYear();
    const dateString = this.getDateString(date);

    // Try to get from cache first
    const cached = await this.getCachedYear(year);
    
    if (cached && cached.days[dateString]) {
      // Check if location matches (within 0.01 degrees ~1km)
      const locationMatches =
        Math.abs(cached.location.latitude - latitude) < 0.01 &&
        Math.abs(cached.location.longitude - longitude) < 0.01;

      if (locationMatches) {
        return cached.days[dateString];
      }
    }

    // If not in cache or location changed, calculate and cache entire year
    const newCache = await this.cacheYearPrayers(
      latitude,
      longitude,
      year,
      locationName
    );

    return newCache.days[dateString];
  }

  /**
   * Save last used location
   */
  static async saveLastLocation(location: CachedLocation): Promise<void> {
    await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  }

  /**
   * Get last used location
   */
  static async getLastLocation(): Promise<CachedLocation | null> {
    try {
      const cached = await AsyncStorage.getItem(LOCATION_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
      return null;
    } catch (error) {
      console.error('Error reading last location:', error);
      return null;
    }
  }

  /**
   * Check if online (simple check via location permission)
   */
  static async isOnline(): Promise<boolean> {
    try {
      // Simple online check - if we can request permissions, we're likely online
      const { status } = await Location.getForegroundPermissionsAsync();
      return status !== 'undetermined';
    } catch {
      return true; // Assume online if check fails
    }
  }

  /**
   * Get location name from coordinates
   */
  static async getLocationName(
    latitude: number,
    longitude: number
  ): Promise<string> {
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      
      if (geocode && geocode.length > 0) {
        const { city, subregion, region, country } = geocode[0];
        const parts = [];

        if (city) parts.push(city);
        else if (subregion) parts.push(subregion);
        else if (region) parts.push(region);

        if (country) parts.push(country);

        if (parts.length > 0) {
          return parts.join(', ');
        }
      }

      return `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
    } catch (err) {
      console.error('Geocoding error:', err);
      return `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
    }
  }

  /**
   * Check if location has changed significantly (>1km)
   */
  static hasLocationChanged(
    oldLat: number,
    oldLng: number,
    newLat: number,
    newLng: number
  ): boolean {
    return (
      Math.abs(oldLat - newLat) > 0.01 || Math.abs(oldLng - newLng) > 0.01
    );
  }

  /**
   * Clear all cached data
   */
  static async clearCache(): Promise<void> {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_KEY_PREFIX));
    await AsyncStorage.multiRemove(cacheKeys);
  }

  /**
   * Get cache size info
   */
  static async getCacheInfo(): Promise<{
    years: number[];
    totalSize: number;
  }> {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_KEY_PREFIX));
    
    const years = cacheKeys.map((key) => {
      const year = key.replace(CACHE_KEY_PREFIX, '');
      return parseInt(year, 10);
    });

    return {
      years: years.sort(),
      totalSize: cacheKeys.length,
    };
  }
}
