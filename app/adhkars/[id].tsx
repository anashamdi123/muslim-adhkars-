import { CommonHeader } from '@/components/common-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ADHKARS_DATA } from '@/constants/adhkars';
import { Colors, getArabicFont } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function DhikrDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const { height } = Dimensions.get('window');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [counts, setCounts] = useState<number[]>([]);

  const scale = useSharedValue(1);

  const category = ADHKARS_DATA.find((c) => c.id === id);

  useEffect(() => {
    if (category?.adhkars) {
      setCounts(category.adhkars.map((a) => a.repetitions || 0));
    }
  }, [category?.id]);

  const handlePress = (index: number) => {
    if (!category) return;

    scale.value = withSpring(0.8, {}, () => (scale.value = withSpring(1)));

    setCounts((prev) => {
      const updated = [...prev];
      if (updated[index] > 0) updated[index] -= 1;

      // Auto-move to next dhikr when count reaches 0
      if (updated[index] === 0 && index + 1 < prev.length) {
        setTimeout(() => setCurrentIndex(index + 1), 300);
      }

      return updated;
    });
  };

  if (!category)
    return (
      <ThemedView style={styles.center}>
        <MaterialIcons name="error-outline" size={40} color={colors.muted} />
        <ThemedText>لم يتم العثور على الأذكار</ThemedText>
      </ThemedView>
    );

  const currentDhikr = category.adhkars[currentIndex];

  return (
    <ThemedView style={{ flex: 1 }}>
      <CommonHeader title={category.title} showBackButton />
      <FlatList
        data={[currentDhikr]}
        keyExtractor={(_, i) => i.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Disable manual scroll, only programmatic
        renderItem={() => (
          <View style={[styles.card, { height: height - 100, backgroundColor: colors.card }]}>
            <TouchableOpacity onPress={() => handlePress(currentIndex)} activeOpacity={0.9} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ThemedText style={[styles.text, { color: colors.text, fontFamily: getArabicFont() }]}>
                {currentDhikr.text}
              </ThemedText>

              <Animated.View
                style={[styles.counterCircle, { borderColor: colors.primary, transform: [{ scale: scale.value }] }]}
              >
                {counts[currentIndex] === 0 ? (
                  <MaterialIcons name="check" size={30} color={colors.primary} />
                ) : (
                  <ThemedText style={[styles.count, { color: colors.primary }]}>{counts[currentIndex] || 0}</ThemedText>
                )}
              </Animated.View>
            </TouchableOpacity>
          </View>
        )}
      />
      {currentIndex === counts.length - 1 && counts[currentIndex] === 0 && (
        <View style={styles.completedMessage}>
          <ThemedText style={{ color: colors.primary, fontSize: 18 }}>✅ تم الانتهاء من الأذكار</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  card: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 38,
  },
  counterCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  count: { fontSize: 28, fontWeight: 'bold' },
  completedMessage: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 12,
    borderRadius: 12,
  },
});
