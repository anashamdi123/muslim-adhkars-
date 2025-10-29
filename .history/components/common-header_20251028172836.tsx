import { ThemedText } from '@/components/themed-text';
import { Colors, getArabicFont, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { I18nManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  onBackPress?: () => void;
}

export function CommonHeader({
  title,
  showBackButton = false,
  showMenuButton = true,
  onBackPress,
}: HeaderProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleMenuPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Menu button action - can be customized
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };


  return (
    <>
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
        {/* Left side: Placeholder for symmetry */}
        <View style={styles.side} />

        {/* Center: Title */}
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

        {/* Right side: Menu or Back button */}
        <View style={styles.side}>
          {showMenuButton && (
            <TouchableOpacity
              onPress={handleMenuPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <MaterialIcons name="menu" size={26} color={colors.text} />
            </TouchableOpacity>
          )}
          {showBackButton && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'}
                size={26}
                color={colors.text}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  side: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
});
