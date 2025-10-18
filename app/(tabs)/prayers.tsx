import { StyleSheet, View, Text, useColorScheme, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function PrayersScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const prayers = [
    { name: 'الفجر', time: '05:30', status: 'completed' },
    { name: 'الظهر', time: '13:15', status: 'completed' },
    { name: 'العصر', time: '16:45', status: 'next' },
    { name: 'المغرب', time: '19:20', status: 'upcoming' },
    { name: 'العشاء', time: '20:45', status: 'upcoming' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'next': return colors.primary;
      case 'upcoming': return colors.icon;
      default: return colors.icon;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'check-circle';
      case 'next': return 'schedule';
      case 'upcoming': return 'access-time';
      default: return 'access-time';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={[styles.title, { color: colors.primary }]}>
        مواقيت الصلاة
      </ThemedText>
      
      <View style={[styles.dateContainer, { backgroundColor: colors.surface }]}>
        <Text style={[styles.hijriDate, { color: colors.text }]}>
          15 ربيع الآخر 1446
        </Text>
        <Text style={[styles.gregorianDate, { color: colors.icon }]}>
          17 أكتوبر 2024
        </Text>
      </View>

      <View style={[styles.locationContainer, { backgroundColor: colors.surface }]}>
        <MaterialIcons name="location-on" size={20} color={colors.primary} />
        <Text style={[styles.locationText, { color: colors.text }]}>
          الرباط، المغرب
        </Text>
      </View>

      <ScrollView style={styles.prayersContainer} showsVerticalScrollIndicator={false}>
        {prayers.map((prayer, index) => (
          <View
            key={prayer.name}
            style={[
              styles.prayerCard,
              {
                backgroundColor: prayer.status === 'next' ? colors.primary + '20' : colors.surface,
                borderColor: prayer.status === 'next' ? colors.primary : colors.border,
              }
            ]}
          >
            <View style={styles.prayerInfo}>
              <Text style={[styles.prayerName, { color: colors.text }]}>
                {prayer.name}
              </Text>
              <Text style={[
                styles.prayerTime,
                { color: prayer.status === 'next' ? colors.primary : colors.text }
              ]}>
                {prayer.time}
              </Text>
            </View>
            
            <MaterialIcons
              name={getStatusIcon(prayer.status)}
              size={24}
              color={getStatusColor(prayer.status)}
            />
          </View>
        ))}
      </ScrollView>

      {prayers.find(p => p.status === 'next') && (
        <View style={[styles.nextPrayerContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.nextPrayerLabel}>الصلاة القادمة</Text>
          <Text style={styles.nextPrayerName}>العصر</Text>
          <Text style={styles.nextPrayerTime}>16:45</Text>
          <Text style={styles.timeRemaining}>بعد ساعتين و 15 دقيقة</Text>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateContainer: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  hijriDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gregorianDate: {
    fontSize: 14,
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 8,
  },
  prayersContainer: {
    flex: 1,
  },
  prayerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  prayerInfo: {
    flex: 1,
  },
  prayerName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  prayerTime: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'right',
  },
  nextPrayerContainer: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  nextPrayerLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  nextPrayerName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  nextPrayerTime: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  timeRemaining: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    opacity: 0.9,
  },
});
