import { ThemedText } from '@/components/themed-text';
import { Colors, getArabicFont, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { getDirectionalIcon } from '@/utils/rtl';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showResetButton?: boolean;
  onBackPress?: () => void;
  onResetPress?: () => void;
}

export function CommonHeader({
  title,
  showBackButton = false,
  showResetButton = false,
  onBackPress,
  onResetPress,
}: HeaderProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) onBackPress();
    else router.back();
  };

  const handleResetPress = async () => {
    if (onResetPress) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onResetPress();
    }
  };

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + 10,
          paddingBottom: 10,
        },
      ]}
    >
      {/* Back Button */}
      <View style={styles.side}>
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBackPress}
            style={[styles.iconButton, { backgroundColor: colors.surface }]}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="arrow-back"
              size={26}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <View style={styles.center}>
        {title && (
          <ThemedText
            style={{
              fontFamily: getArabicFont('bold'),
              fontSize: Typography.headline.large.fontSize,
              lineHeight: Typography.headline.large.lineHeight,
              letterSpacing: Typography.headline.large.letterSpacing,
              color: colors.text,
              writingDirection: 'rtl',
              textAlign: 'center',
            }}
          >
            {title}
          </ThemedText>
        )}
      </View>

      {/* Reset Button (Opposite side of Back) */}
      <View style={styles.side}>
        {showResetButton && (
          <TouchableOpacity
            onPress={handleResetPress}
            style={[styles.iconButton, { backgroundColor: colors.surface }]}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="refresh"
              size={26}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // RTL-friendly layout
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  side: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
