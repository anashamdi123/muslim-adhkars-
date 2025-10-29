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
      FadeIn,
      FadeOut,
      useAnimatedStyle,
      useSharedValue,
      withSpring,
      withTiming
    } from 'react-native-reanimated';

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

      // Animation values
      const scale = useSharedValue(1);
      const completionOpacity = useSharedValue(0);

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

      // Check if all dhikrs are completed
      useEffect(() => {
        const allCounts = Object.values(counts);
        if (allCounts.length > 0 && allCounts.every(c => c === 0)) {
          setIsCompleted(true);
          completionOpacity.value = withTiming(1, { duration: 400 });
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          setIsCompleted(false);
          completionOpacity.value = 0;
        }
      }, [counts]);

      // Handle viewable items change for tracking current index
      const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
          setCurrentIndex(viewableItems[0].index);
        }
      }).current;

      const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
      }).current;

      // Animated completion message style
      const completionAnimatedStyle = useAnimatedStyle(() => ({
        opacity: completionOpacity.value,
      }));

      const handlePress = useCallback((index: number) => {
        if (!subCategory) return;
        const key = `${categoryId}-${subCategoryId}-${index}`;
        
        // Haptic feedback on tap
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        scale.value = withSpring(0.85, {}, () => (scale.value = withSpring(1)));
        
        setCounts((prev) => {
          const currentCount = prev[key] || 0;
          if (currentCount > 0) {
            const updatedCounts = { ...prev, [key]: currentCount - 1 };

            // Auto-scroll to next dhikr when count reaches 0
            if (currentCount - 1 === 0 && index + 1 < (subCategory?.adhkars.length || 0)) {
              setTimeout(() => {
                flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
              }, 600);
            }

            return updatedCounts;
          }
          return prev;
        });
      }, [categoryId, subCategoryId, subCategory]);

      if (!category || !subCategory) {
        return (
          <ThemedView style={styles.center}>
            <MaterialIcons name="error-outline" size={40} color={colors.muted} />
            <ThemedText style={{ color: colors.muted }}>
              لم يتم العثور على الفئة
            </ThemedText>
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
                      textAlign: 'justify', // Justified text for better Arabic reading
                    },
                  ]}
                >
                  {item?.text || ''}
                </ThemedText>

                {item.reference && (
                  <View style={[styles.referenceContainer, { backgroundColor: colors.surface }]}>
                    <MaterialIcons name="info-outline" size={14} color={colors.muted} />
                    <ThemedText
                      style={[styles.reference, { color: colors.muted }]}
                      numberOfLines={2}
                    >
                      {item.reference}
                    </ThemedText>
                  </View>
                )}
              </ScrollView>

              <Animated.View
                style={[
                  styles.counterCircle,
                  {
                    borderColor: colors.primary,
                    backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    transform: [{ scale: scale.value }],
                  },
                ]}
              >
                {isFinished ? (
                  <MaterialIcons name="check" size={32} color={colors.primary} />
                ) : (
                  <ThemedText style={[styles.count, { color: colors.primary }]}>
                    {count}
                  </ThemedText>
                )}
              </Animated.View>

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
            <CommonHeader 
              title={subCategory?.title || ''}
              showBackButton={true}
              showMenuButton={false}
            />

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

            {/* Completion message overlay */}
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
        padding: 20 ,
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
        textAlign: 'justify', // Justified text for better Arabic reading
      },
      referenceContainer: {
        flexDirection: 'row-reverse', // RTL: items flow right-to-left
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
      counterCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      count: {
        fontSize: 32,
        fontWeight: 'bold',
        width: 80, // match counterCircle width
        height: 80, // match counterCircle height
        lineHeight: 80, // vertical centering inside the circle
        textAlign: 'center',
        textAlignVertical: 'center',
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
      completionTitle: {
        fontSize: 24,
        textAlign: 'center',
      },
      completionSubtitle: {
        fontSize: 16,
        textAlign: 'center',
      },
    });
