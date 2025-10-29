import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ADHKARS_GROUPS } from '@/constants/adhkars';
import { Colors, getArabicFont } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

// ================================================================
// MAIN SCREEN
// ================================================================
export default function DhikrDetailScreen() {
  const { categoryId, subCategoryId } = useLocalSearchParams();
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const { height } = Dimensions.get('window');

  const category = ADHKARS_GROUPS.find((item) => item.id === categoryId);
  const subCategory = category?.subCategories.find((item) => item.id === subCategoryId);

  const flatListRef = useRef<FlatList>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const completionOpacity = useSharedValue(0);

  // Initialize counters
  useEffect(() => {
    if (subCategory?.adhkars) {
      const initialCounts: { [key: string]: number } = {};
      subCategory.adhkars.forEach((adhkar, index) => {
        const key = `${categoryId}-${subCategoryId}-${index}`;
        initialCounts[key] = adhkar.repetitions || 0;
      });
      setCounts(initialCounts);
      setIsInitialized(true);
    }
  }, [categoryId, subCategoryId]);

  // Detect if all completed
  useEffect(() => {
    const allCounts = Object.values(counts);
    if (allCounts.length > 0 && allCounts.every((c) => c === 0)) {
      setIsCompleted(true);
      completionOpacity.value = withTiming(1, { duration: 400 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setIsCompleted(false);
      completionOpacity.value = 0;
    }
  }, [counts]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        // optional scroll tracking
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const completionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: completionOpacity.value,
  }));

  const handlePress = useCallback(
    (index: number) => {
      if (!subCategory) return;
      const key = `${categoryId}-${subCategoryId}-${index}`;

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      setCounts((prev) => {
        const current = prev[key] || 0;
        if (current > 0) {
          const updated = { ...prev, [key]: current - 1 };
          if (current - 1 === 0 && index + 1 < (subCategory?.adhkars.length || 0)) {
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
            }, 600);
          }
          return updated;
        }
        return prev;
      });
    },
    [categoryId, subCategoryId, subCategory],
  );

  if (!category || !subCategory) {
    return (
      <ThemedView style={styles.center}>
        <MaterialIcons name="error-outline" size={40} color={colors.muted} />
        <ThemedText style={{ color: colors.muted }}>لم يتم العثور على الفئة</ThemedText>
      </ThemedView>
    );
  }

  if (!isInitialized) {
    return (
      <ThemedView style={styles.center}>
        <MaterialIcons name="hourglass-empty" size={40} color={colors.primary} />
        <ThemedText style={{ color: colors.muted, fontFamily: getArabicFont() }}>
          جاري التحميل...
        </ThemedText>
      </ThemedView>
    );
  }

  // Render each dhikr card
  const renderDhikrCard = ({ item, index }: { item: any; index: number }) => {
    const key = `${categoryId}-${subCategoryId}-${index}`;
    const count = counts[key] || 0;
    const total = item?.repetitions || 0;
    const progress = total > 0 ? (total - count) / total : 1;
    const isFinished = count === 0;

    return (
      <View style={[styles.cardContainer, { height }]}>
        <TouchableOpacity
          onPress={() => handlePress(index)}
          activeOpacity={0.95}
          style={[styles.card, { backgroundColor: colors.card }]}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <ThemedText
              style={[
                styles.text,
                {
                  color: colors.text,
                  fontFamily: getArabicFont(),
                },
              ]}
            >
              {item?.text || ''}
            </ThemedText>

            {item.reference && (
              <View style={[styles.referenceContainer, { backgroundColor: colors.surface }]}>
                <MaterialIcons name="info-outline" size={14} color={colors.muted} />
                <ThemedText style={[styles.reference, { color: colors.muted }]} numberOfLines={2}>
                  {item.reference}
                </ThemedText>
              </View>
            )}
          </ScrollView>

          <ProgressCircle
            size={90}
            strokeWidth={5}
            progress={progress}
            trackColor={colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
            progressColor={colors.primary}
          >
            {isFinished ? (
              <MaterialIcons name="check" size={34} color={colors.primary} />
            ) : (
              <ThemedText style={[styles.count, { color: colors.primary }]}>{count}</ThemedText>
            )}
          </ProgressCircle>

          <View style={styles.progressContainer}>
            <ThemedText style={[styles.progressText, { color: colors.muted }]}>
              {index + 1} / {subCategory?.adhkars.length || 0}
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AnimatedScreen animationType="slideRight" duration={350}>
      <ThemedView style={styles.container}>
        <CommonHeader title={subCategory?.title || ''} showBackButton={true} />

        <FlatList
          ref={flatListRef}
          data={subCategory?.adhkars || []}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderDhikrCard}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={height}
          snapToAlignment="start"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        {isCompleted && (
          <Animated.View
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
            style={[
              styles.completionOverlay,
              completionAnimatedStyle,
              { backgroundColor: colors.primary + '15' },
            ]}
          >
            <View style={[styles.completionCard, { backgroundColor: colors.card }]}>
              <MaterialIcons name="check-circle" size={64} color={colors.primary} />
              <ThemedText style={[styles.completionTitle, { color: colors.primary }]}>
                ✅ تم الانتهاء من الأذكار
              </ThemedText>
              <ThemedText style={[styles.completionSubtitle, { color: colors.muted }]}>
                بارك الله فيك
              </ThemedText>
            </View>
          </Animated.View>
        )}
      </ThemedView>
    </AnimatedScreen>
  );
}

// ================================================================
// PROGRESS CIRCLE (Smooth Spinner)
// ================================================================
function ProgressCircle({
  size,
  strokeWidth,
  progress,
  trackColor,
  progressColor,
  children,
}: {
  size: number;
  strokeWidth: number;
  progress: number;
  trackColor: string;
  progressColor: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressValue = useSharedValue(progress);
  const rotation = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 500 });
    rotation.value = withTiming(rotation.value + 360 * progress, { duration: 500 });
  }, [progress]);

  const animatedProps = useAnimatedStyle(() => {
    const strokeDashoffset = circumference - circumference * progressValue.value;
    return {
      strokeDashoffset,
    };
  });

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={rotateStyle}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Animated.Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>
      </Animated.View>

      <View style={StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
    </View>
  );
}

// ================================================================
// STYLES
// ================================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, padding: 20 },
  cardContainer: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  card: {
    width: '90%',
    height: '85%',
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  text: { fontSize: 24, writingDirection: 'rtl', lineHeight: 38, textAlign: 'justify' },
  referenceContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reference: { fontSize: 11, fontStyle: 'italic', flex: 1 },
  count: { fontSize: 30, fontWeight: 'bold' },
  progressContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  progressText: { fontSize: 12, fontWeight: '600' },
  completionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  completionCard: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    gap: 16,
    elevation: 12,
  },
  completionTitle: { fontSize: 22, textAlign: 'center' },
  completionSubtitle: { fontSize: 16, textAlign: 'center' },
});
