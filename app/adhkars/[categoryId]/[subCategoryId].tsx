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
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken
} from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';


// ✅ Enhanced animated circular progress component with improved animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  progress,
  size,
  strokeWidth,
  color,
  backgroundColor,
  count,
}: {
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
  backgroundColor: string;
  count: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Create shared values for all animations
  const progressValue = useSharedValue(progress);
  const scaleValue = useSharedValue(1);
  const rotateValue = useSharedValue(0);
  const opacityValue = useSharedValue(1);

  // Enhanced animation update with multiple visual effects
  useEffect(() => {
    // Animate progress with a smooth easing function
    progressValue.value = withTiming(progress, {
      duration: 200,
      easing: Easing.out(Easing.exp),
    });

    // Add a more dynamic bounce effect on tap
    scaleValue.value = withSequence(
      withTiming(1.15, { 
        duration: 80,
        easing: Easing.out(Easing.quad)
      }),
      withTiming(1, { 
        duration: 120,
        easing: Easing.out(Easing.quad)
      })
    );

    // Add a subtle rotation effect for visual interest
    if (progress > 0) {
      rotateValue.value = withTiming(5, {
        duration: 200,
        easing: Easing.out(Easing.exp)
      });
    } else {
      rotateValue.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.exp)
      });
    }

    // Pulse opacity for completed state
    if (progress === 1) {
      opacityValue.value = withSequence(
        withTiming(0.7, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
    }
  }, [progress]);

  // Animated props for the progress circle
  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progressValue.value),
  }));

  // Animated style for the entire component
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scaleValue.value },
      { rotate: `${rotateValue.value}deg` }
    ],
    opacity: opacityValue.value,
  }));

  return (
    <Animated.View
      style={[{ alignItems: 'center', justifyContent: 'center' }, animatedContainerStyle]}
    >
      <Svg width={size} height={size}>
        {/* Background track with subtle glow effect */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.3}
        />
        {/* Animated progress spinner with gradient effect simulation */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth + 1}
          strokeDasharray={circumference}
          animatedProps={animatedCircleProps}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      {/* Number or check icon with enhanced animations */}
      {count > 0 ? (
        <Animated.View
          key="count"
          entering={FadeIn.duration(150).springify().damping(15)}
          exiting={FadeOut.duration(100).easing(Easing.out(Easing.exp))}
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ThemedText style={{ 
            fontSize: 32, 
            fontWeight: 'bold', 
            color,
            textShadowColor: 'rgba(0,0,0,0.1)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}>
            {count}
          </ThemedText>
        </Animated.View>
      ) : (
        <Animated.View
          key="check"
          entering={FadeIn.duration(200).springify().damping(12).stiffness(200)}
          exiting={FadeOut.duration(150).easing(Easing.out(Easing.exp))}
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons 
            name="check-circle" 
            size={44} 
            color={color} 
            style={{
              textShadowColor: 'rgba(0,0,0,0.2)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};


// 🕌 Main Screen
export default function DhikrDetailScreen() {
  const { categoryId, subCategoryId } = useLocalSearchParams();
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  const category = ADHKARS_GROUPS.find((item) => item.id === categoryId);
  const subCategory = category?.subCategories.find((item) => item.id === subCategoryId);

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { height } = Dimensions.get('window');
  const completionOpacity = useSharedValue(0);

  // initialize counts
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

  // detect completion
  useEffect(() => {
    const allCounts = Object.values(counts);
    if (allCounts.length > 0 && allCounts.every((c) => c === 0)) {
      setIsCompleted(true);
      completionOpacity.value = withTiming(1, { duration: 300 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setIsCompleted(false);
      completionOpacity.value = 0;
    }
  }, [counts]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

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
        const currentCount = prev[key] || 0;
        if (currentCount > 0) {
          const updatedCounts = { ...prev, [key]: currentCount - 1 };

          // scroll to next dhikr after finishing one
          if (currentCount - 1 === 0 && index + 1 < (subCategory?.adhkars.length || 0)) {
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
            }, 600);
          }

          return updatedCounts;
        }
        return prev;
      });
    },
    [categoryId, subCategoryId, subCategory]
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

  const renderDhikrCard = ({ item, index }: { item: any; index: number }) => {
    const key = `${categoryId}-${subCategoryId}-${index}`;
    const count = counts[key] || 0;
    const isFinished = count === 0;
    const initialRepetitions = item.repetitions || 0;
    const progress =
      initialRepetitions > 0 ? 1 - count / initialRepetitions : initialRepetitions === 0 ? 1 : 0;

    return (
      <View style={[styles.cardContainer, { height }]}>
        <TouchableOpacity
          onPress={() => handlePress(index)}
          activeOpacity={0.95}
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              opacity: isCompleted && !isFinished ? 0.5 : 1,
            },
          ]}
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
                  textAlign: 'justify',
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

          {/* 🌀 Counter Spinner */}
          <View style={styles.counterContainer}>
            <CircularProgress
              progress={progress}
              size={90}
              strokeWidth={5}
              color={colors.primary}
              backgroundColor={colors.border}
              count={count}
            />
          </View>

          {/* Progress indicator */}
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
        <CommonHeader title={subCategory?.title || ''} showBackButton={true} showMenuButton={false} />

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
          getItemLayout={(_, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
          initialNumToRender={2}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews={true}
        />

        {/* ✅ Completion Overlay */}
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
              <ThemedText
                type="headline"
                size="large"
                weight="bold"
                style={[styles.completionTitle, { color: colors.primary }]}
              >
                ✅ تم الانتهاء من الأذكار
              </ThemedText>
              <ThemedText
                type="body"
                size="medium"
                weight="regular"
                style={[styles.completionSubtitle, { color: colors.muted }]}
              >
                بارك الله فيك
              </ThemedText>
            </View>
          </Animated.View>
        )}
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  cardContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
  },
  card: {
    width: '90%',
    height: '85%',
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    fontSize: 24,
    writingDirection: 'rtl',
    lineHeight: 40,
    paddingHorizontal: 8,
    textAlign: 'justify',
  },
  referenceContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reference: {
    fontSize: 11,
    fontStyle: 'italic',
    flex: 1,
  },
  counterContainer: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  progressContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  completionTitle: { fontSize: 24, textAlign: 'center' },
  completionSubtitle: { fontSize: 16, textAlign: 'center' },
});
