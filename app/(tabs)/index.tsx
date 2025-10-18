import { StyleSheet, View, Text, useColorScheme, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useState } from 'react';

interface AdhkarCategory {
  id: string;
  title: string;
  icon: string;
  count: number;
  color: string;
}

export default function AdhkarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [categories] = useState<AdhkarCategory[]>([
    { id: '1', title: 'أذكار الصباح', icon: 'wb-sunny', count: 15, color: '#f59e0b' },
    { id: '2', title: 'أذكار المساء', icon: 'brightness-3', count: 12, color: '#8b5cf6' },
    { id: '3', title: 'أذكار بعد الصلاة', icon: 'schedule', count: 8, color: '#22c55e' },
    { id: '4', title: 'أذكار الأكل والشرب', icon: 'restaurant', count: 6, color: '#ef4444' },
    { id: '5', title: 'أذكار السفر', icon: 'flight', count: 10, color: '#06b6d4' },
    { id: '6', title: 'أذكار المنزل', icon: 'home', count: 7, color: '#f97316' },
    { id: '7', title: 'أذكار النوم', icon: 'bedtime', count: 9, color: '#6366f1' },
    { id: '8', title: 'أذكار عامة', icon: 'favorite', count: 20, color: '#ec4899' },
    { id: '9', title: 'أذكار الحماية', icon: 'security', count: 11, color: '#10b981' },
  ]);

  const handleCategoryPress = (category: AdhkarCategory) => {
    Alert.alert(
      category.title,
      `سيتم فتح ${category.count} من الأذكار`,
      [{ text: 'موافق', style: 'default' }]
    );
  };

  const resetAllCounters = () => {
    Alert.alert(
      'إعادة تعيين العدادات',
      'هل تريد إعادة تعيين جميع عدادات الأذكار؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'إعادة تعيين', style: 'destructive', onPress: () => {} }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={[styles.title, { color: colors.primary }]}>
          الأذكار الإسلامية
        </ThemedText>
        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: colors.surface }]}
          onPress={resetAllCounters}
        >
          <MaterialIcons name="refresh" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { 
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                <MaterialIcons 
                  name={category.icon as any} 
                  size={32} 
                  color={category.color} 
                />
              </View>
              
              <Text style={[styles.categoryTitle, { color: colors.text }]}>
                {category.title}
              </Text>
              
              <View style={[styles.countBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.countText}>{category.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.primary + '10' }]}>
          <MaterialIcons name="info" size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            اضغط على أي فئة لعرض الأذكار والبدء في التسبيح
          </Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  countBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 12,
    textAlign: 'right',
  },
});
