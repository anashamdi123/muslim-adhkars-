import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function QiblaScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={[styles.title, { color: colors.primary }]}>
        اتجاه القبلة
      </ThemedText>
      
      <View style={styles.compassContainer}>
        <View style={[styles.compass, { borderColor: colors.primary }]}>
          <MaterialIcons name="navigation" size={80} color={colors.primary} />
          <Text style={[styles.direction, { color: colors.text }]}>شمال شرق</Text>
          <Text style={[styles.degrees, { color: colors.icon }]}>45°</Text>
        </View>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>الرباط، المغرب</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="place" size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>المسافة إلى مكة: 2,847 كم</Text>
        </View>
      </View>

      <View style={[styles.calibrationCard, { backgroundColor: colors.primary + '20' }]}>
        <MaterialIcons name="info" size={20} color={colors.primary} />
        <Text style={[styles.calibrationText, { color: colors.text }]}>
          للحصول على اتجاه دقيق، تأكد من معايرة البوصلة وابتعد عن المعادن
        </Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  compassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compass: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  direction: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  degrees: {
    fontSize: 16,
    marginTop: 5,
  },
  infoCard: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: 'right',
    flex: 1,
  },
  calibrationCard: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calibrationText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    textAlign: 'right',
  },
});
