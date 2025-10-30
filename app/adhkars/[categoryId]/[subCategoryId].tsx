import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ADHKARS_GROUPS } from '@/constants/adhkars';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DhikrDetailScreen() {
  const { categoryId, subCategoryId } = useLocalSearchParams<{ categoryId: string; subCategoryId: string }>();
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const flatListRef = useRef<FlatList>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const category = ADHKARS_GROUPS.find((item) => item.id === categoryId);
  const subCategory = category?.subCategories.find((item) => item.id === subCategoryId);

  const [counts, setCounts] = useState<Record<string, number>>({});

  // ✅ Initialize counters
  useEffect(() => {
    if (subCategory?.adhkars) {
      const initialCounts: Record<string, number> = {};
      subCategory.adhkars.forEach((adhkar, i) => {
        initialCounts[`${categoryId}-${subCategoryId}-${i}`] = adhkar.repetitions || 0;
      });
      setCounts(initialCounts);
    }
  }, [categoryId, subCategoryId]);

  const handlePress = useCallback(
    (index: number) => {
      const key = `${categoryId}-${subCategoryId}-${index}`;
      const currentCount = counts[key] || 0;
      
      Haptics.selectionAsync();
      
      // Update count if greater than 0
      if (currentCount > 0) {
        setCounts((prev) => {
          const newCount = currentCount - 1;
          const updatedCounts = { ...prev, [key]: newCount };
          
          // If count reached zero, scroll to next card after delay
          if (newCount === 0) {
            // Clear any existing timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }
            
            // Set new timeout to scroll to next card
            scrollTimeoutRef.current = setTimeout(() => {
              // Scroll to next card only if it's not the last one
              if (index < (subCategory?.adhkars.length || 0) - 1) {
                flatListRef.current?.scrollToIndex({
                  index: index + 1,
                  animated: true,
                });
              }
            }, 400);
          }
          
          return updatedCounts;
        });
      } else {
        // If already at zero, scroll to next card immediately after delay
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set new timeout to scroll to next card
        scrollTimeoutRef.current = setTimeout(() => {
          // Scroll to next card only if it's not the last one
          if (index < (subCategory?.adhkars.length || 0) - 1) {
            flatListRef.current?.scrollToIndex({
              index: index + 1,
              animated: true,
            });
          }
        }, 400);
      }
    },
    [categoryId, subCategoryId, counts, subCategory?.adhkars.length]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  if (!category || !subCategory) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={{ color: colors.muted }}>الفئة غير موجودة</ThemedText>
      </ThemedView>
    );
  }

  const renderDhikrCard = ({ item, index }: { item: any; index: number }) => {
    const key = `${categoryId}-${subCategoryId}-${index}`;
    const count = counts[key] || 0;

    return (
      <View style={styles.cardContainer}>
        <View style={[styles.card, { 
          backgroundColor: colors.card, 
          borderColor: colors.border,
          borderRadius: BorderRadius.xl,
          minHeight: 300,
        }]}>
          {/* Scrollable text area */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.scrollArea}
          >
            <ThemedText
              type="adhkar"
              size="medium"
              useDisplayFont
              style={styles.dhikrText}
            >
              {item.text}
            </ThemedText>

            {item.reference && (
              <ThemedText 
                type="body" 
                size="small" 
                style={[styles.referenceText, { color: colors.textSecondary }]}
              >
                {item.reference}
              </ThemedText>
            )}
          </ScrollView>

          {/* Bottom counter */}
          <TouchableOpacity
            style={[styles.counterButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.7}
            onPress={() => handlePress(index)}
          >
            <ThemedText type="title" size="large" style={styles.counterText}>
              {count}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <AnimatedScreen animationType="slideRight" duration={250}>
      <ThemedView style={styles.container}>
        <CommonHeader
          title={subCategory?.title || ''}
          showBackButton
        />
        <FlatList
          ref={flatListRef}
          data={subCategory?.adhkars || []}
          renderItem={renderDhikrCard}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: Spacing.lg }}
        />
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // 💫 Simplified card
  cardContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  card: {
    width: '92%',
    minHeight: 300,
    overflow: 'hidden',
    borderWidth: 0.5,
  },
  scrollArea: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dhikrText: {
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: Spacing.lg,
  },
  referenceText: {
    textAlign: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  counterButton: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  counterText: {
    color: '#fff',
    fontWeight: '600',
  },
});