import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { StaggeredView } from '@/components/staggered-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ADHKARS_GROUPS } from '@/constants/adhkars';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AdhkarScreen() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { width: screenWidth } = Dimensions.get('window');

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/adhkars/${categoryId}` as any);
  };

  // Determine card width based on screen width for better grid spacing
  const getCardWidth = () => {
    const spacing = 16; // horizontal spacing between cards
    if (screenWidth >= 1200) return (screenWidth - spacing * 6) / 5; // 5 columns
    if (screenWidth >= 992) return (screenWidth - spacing * 5) / 4;  // 4 columns
    if (screenWidth >= 768) return (screenWidth - spacing * 4) / 3;  // 3 columns
    return (screenWidth - spacing * 3) / 2;                          // 2 columns
  };

  const cardWidth = getCardWidth();

  return (
    <AnimatedScreen animationType="slideUp" duration={400}>
      <ThemedView style={styles.container}>
        <CommonHeader 
          title="الأذكار الإسلامية" 
          showBackButton={false}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {ADHKARS_GROUPS.map((category, index) => {
              // Calculate total count of adhkars in all subcategories
              const totalCount = category.subCategories.reduce(
                (sum, sub) => sum + sub.adhkars.length,
                0
              );

              return (
                <StaggeredView
                  key={category.id}
                  index={index}
                  animationType="spring"
                  staggerDelay={80}
                  duration={500}
                >
                  <TouchableOpacity
                    style={[
                      styles.categoryCard,
                      {
                        width: cardWidth,
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => handleCategoryPress(category.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                      <MaterialIcons name={category.icon as any} size={32} color={category.color} />
                    </View>

                    <ThemedText 
                      type="title" 
                      size="medium" 
                      weight="bold"
                      style={[styles.categoryTitle, { color: colors.text }]}
                    >
                      {category.title}
                    </ThemedText>
                    <ThemedText 
                      type="label" 
                      size="small" 
                      weight="regular"
                      style={[styles.categoryCount, { color: colors.muted }]}
                    >
                      {category.subCategories.length} قسم • {totalCount} ذِكر
                    </ThemedText>
                  </TouchableOpacity>
                </StaggeredView>
              );
            })}
          </View>
        </ScrollView>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'transparent' 
  },
  scrollView: { 
    flex: 1 
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingBottom: Spacing.xxl, 
    paddingHorizontal: Spacing.lg 
  },
  grid: {
    flexDirection: 'row', // RTL: items flow right-to-left
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    aspectRatio: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  iconContainer: { 
    width: 64, 
    height: 64, 
    borderRadius: BorderRadius.xxl, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: Spacing.md 
  },
  categoryTitle: { 
    fontSize: 15, 
    fontWeight: '700', 
    textAlign: 'center', 
    lineHeight: 22 
  },
  categoryCount: { 
    fontSize: 12, 
    marginTop: Spacing.xs, 
    textAlign: 'center', 
    opacity: 0.8 
  },
});
  