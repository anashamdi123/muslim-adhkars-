import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { StaggeredView } from '@/components/staggered-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ADHKARS_GROUPS } from '@/constants/adhkars';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function SubCategoryListScreen() {
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const { width: screenWidth } = Dimensions.get('window');

  const category = ADHKARS_GROUPS.find((item) => item.id === categoryId);

  if (!category) {
    return (
      <ThemedView style={styles.center}>
        <MaterialIcons name="error-outline" size={40} color={colors.muted} />
        <ThemedText style={{ color: colors.muted }}>
          لم يتم العثور على الفئة
        </ThemedText>
      </ThemedView>
    );
  }

  const handleSubCategoryPress = (subCategoryId: string) => {
    router.push(`/adhkars/${categoryId}/${subCategoryId}` as any);
  };

  // Determine card width based on screen width
  const getCardWidth = () => {
    const spacing = 16;
    if (screenWidth >= 768) return (screenWidth - spacing * 4) / 2;
    return screenWidth - spacing * 2;
  };

  const cardWidth = getCardWidth();

  return (
    <AnimatedScreen animationType="slideRight" duration={400}>
      <ThemedView style={styles.container}>
        <CommonHeader 
          title={category.title} 
          showMenuButton={false}
          showBackButton={true}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {category.subCategories.map((subCategory, index) => (
              <StaggeredView
                key={subCategory.id}
                index={index}
                animationType="spring"
                staggerDelay={80}
                duration={500}
              >
                <TouchableOpacity
                  style={[
                    styles.subCategoryCard,
                    {
                      width: cardWidth,
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => handleSubCategoryPress(subCategory.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardContent}>
                    <ThemedText 
                      type="title" 
                      size="medium" 
                      weight="bold"
                      style={[styles.subCategoryTitle, { color: colors.text }]}
                    >
                      {subCategory.title}
                    </ThemedText>
                    
                    {subCategory.description && (
                      <ThemedText 
                        type="label" 
                        size="small" 
                        weight="regular"
                        style={[styles.subCategoryDescription, { color: colors.muted }]}
                      >
                        {subCategory.description}
                      </ThemedText>
                    )}

                    <ThemedText 
                      type="label" 
                      size="small" 
                      weight="regular"
                      style={[styles.subCategoryCount, { color: colors.primary }]}
                    >
                      {subCategory.adhkars.length} ذِكر
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              </StaggeredView>
            ))}
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
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: Spacing.md, 
    padding: Spacing.xl 
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
  subCategoryCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 0,
    minHeight: 100,
    ...Shadows.md,
  },
  cardContent: {
    gap: Spacing.xs,
    alignItems: 'flex-start',
  },
  subCategoryTitle: { 
    fontSize: 17, 
    fontWeight: '700', 
    lineHeight: 24,
  },
  subCategoryDescription: { 
    fontSize: 13, 
    opacity: 0.75,
    lineHeight: 20,
  },
  subCategoryCount: { 
    fontSize: 13, 
    marginTop: Spacing.xs,
    fontWeight: '600',
  },
});
