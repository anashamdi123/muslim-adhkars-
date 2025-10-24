import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { StaggeredView } from '@/components/staggered-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function QiblaScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme as keyof typeof Colors];

  return (
    <AnimatedScreen animationType="scale" duration={400}>
      <ThemedView style={styles.container}>
      <CommonHeader
        title="اتجاه القبلة"
        titleSize={28}
        paddingBottom={30}
      />
      
      <View style={styles.compassContainer}>
        <StaggeredView index={0} animationType="spring" staggerDelay={100} duration={600}>
          <View style={[styles.compass, { borderColor: colors.primary }]}>
          <MaterialIcons name="navigation" size={80} color={colors.primary} />
          <ThemedText 
            type="title" 
            size="large" 
            weight="bold"
            style={[styles.direction, { color: colors.text }]}
          >
            شمال شرق
          </ThemedText>
          <ThemedText 
            type="body" 
            size="medium" 
            weight="medium"
            style={[styles.degrees, { color: colors.icon }]}
          >
            45°
          </ThemedText>
          </View>
        </StaggeredView>
      </View>

      <StaggeredView index={1} animationType="fadeUp" staggerDelay={100} duration={400}>
        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={20} color={colors.primary} />
          <ThemedText 
            type="body" 
            size="medium" 
            weight="medium"
            style={[styles.infoText, { color: colors.text }]}
          >
            الرباط، المغرب
          </ThemedText>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="place" size={20} color={colors.primary} />
          <ThemedText 
            type="body" 
            size="medium" 
            weight="medium"
            style={[styles.infoText, { color: colors.text }]}
          >
            المسافة إلى مكة: 2,847 كم
          </ThemedText>
        </View>
        </View>
      </StaggeredView>

      <StaggeredView index={2} animationType="fadeUp" staggerDelay={100} duration={400}>
        <View style={[styles.calibrationCard, { backgroundColor: colors.primary + '20' }]}>
        <MaterialIcons name="info" size={20} color={colors.primary} />
        <ThemedText 
          type="body" 
          size="small" 
          weight="regular"
          style={[styles.calibrationText, { color: colors.text }]}
        >
          للحصول على اتجاه دقيق، تأكد من معايرة البوصلة وابتعد عن المعادن
        </ThemedText>
        </View>
      </StaggeredView>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  compassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderColor will be set dynamically
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 16,
    marginStart: 10,
    textAlign: 'right',
    flex: 1,
  },
  calibrationCard: {
    width: '100%',
    padding: 12,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor will be set dynamically
  },
  calibrationText: {
    fontSize: 14,
    marginStart: 10,
    flex: 1,
    textAlign: 'right',
  },
});
