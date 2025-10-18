import { StyleSheet, View, Text, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useState } from 'react';

export default function TasbihScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState('سبحان الله');

  const dhikrOptions = [
    'سبحان الله',
    'الحمد لله',
    'الله أكبر',
    'لا إله إلا الله',
    'أستغفر الله',
  ];

  const incrementCount = () => {
    setCount(count + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const undoCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={[styles.title, { color: colors.primary }]}>
        التسبيح
      </ThemedText>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.dhikrSelector}
        contentContainerStyle={styles.dhikrSelectorContent}
      >
        {dhikrOptions.map((dhikr) => (
          <TouchableOpacity
            key={dhikr}
            style={[
              styles.dhikrOption,
              {
                backgroundColor: selectedDhikr === dhikr ? colors.primary : colors.surface,
                borderColor: colors.border,
              }
            ]}
            onPress={() => setSelectedDhikr(dhikr)}
          >
            <Text style={[
              styles.dhikrOptionText,
              { color: selectedDhikr === dhikr ? '#fff' : colors.text }
            ]}>
              {dhikr}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.counterContainer}>
        <Text style={[styles.selectedDhikr, { color: colors.text }]}>
          {selectedDhikr}
        </Text>
        
        <TouchableOpacity
          style={[styles.counterButton, { borderColor: colors.primary }]}
          onPress={incrementCount}
        >
          <Text style={[styles.counterText, { color: colors.primary }]}>
            {count}
          </Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
            <View 
              style={[
                styles.progressFill,
                { 
                  backgroundColor: colors.primary,
                  width: `${Math.min((count % 33) / 33 * 100, 100)}%`
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: colors.icon }]}>
            {count % 33}/33
          </Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.surface }]}
          onPress={undoCount}
        >
          <MaterialIcons name="undo" size={24} color={colors.primary} />
          <Text style={[styles.controlButtonText, { color: colors.text }]}>تراجع</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.surface }]}
          onPress={resetCount}
        >
          <MaterialIcons name="refresh" size={24} color={colors.primary} />
          <Text style={[styles.controlButtonText, { color: colors.text }]}>إعادة تعيين</Text>
        </TouchableOpacity>
      </View>

      {count > 0 && count % 33 === 0 && (
        <View style={[styles.completionBadge, { backgroundColor: colors.success }]}>
          <MaterialIcons name="check-circle" size={24} color="#fff" />
          <Text style={styles.completionText}>
            مبارك! أكملت {Math.floor(count / 33)} دورة
          </Text>
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
  dhikrSelector: {
    marginBottom: 30,
  },
  dhikrSelectorContent: {
    paddingHorizontal: 10,
  },
  dhikrOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  dhikrOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDhikr: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  counterButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '80%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  controlButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  completionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
