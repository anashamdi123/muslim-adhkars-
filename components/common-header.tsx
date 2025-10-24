import { Sidebar } from '@/components/sidebar';
import { ThemedText } from '@/components/themed-text';
import { Colors, getArabicFont } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { I18nManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  centerElement?: React.ReactNode;
  backgroundColor?: string;
  titleColor?: string;
  titleSize?: number;
  titleWeight?: 'normal' | 'bold';
  paddingTop?: number;
  paddingBottom?: number;
  paddingHorizontal?: number;
  useSafeArea?: boolean;
}

export function CommonHeader({
  title,
  showBackButton = false,
  showMenuButton = true,
  onBackPress,
  rightElement,
  leftElement,
  centerElement,
  backgroundColor,
  titleColor,
  titleSize = 18,
  titleWeight = 'bold',
  paddingTop = 20,
  paddingBottom = 10,
  paddingHorizontal = 20,
  useSafeArea = true,
}: HeaderProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSidebarOpen(true);
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const renderLeftElement = () => {
    if (leftElement) return leftElement;
    if (showBackButton) {
      return (
        <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
          <MaterialIcons 
            name={I18nManager.isRTL ? "arrow-forward" : "arrow-back"} 
            size={26} 
            color={colors.text} 
          />
        </TouchableOpacity>
      );
    }
    if (showMenuButton) {
      return (
        <TouchableOpacity onPress={handleMenuPress} style={styles.iconButton}>
          <MaterialIcons name="menu" size={26} color={colors.text} />
        </TouchableOpacity>
      );
    }
    return <View style={styles.placeholder} />;
  };

  const renderCenterElement = () => {
    if (centerElement) return centerElement;
    if (title) {
      return (
        <ThemedText
          type="headline"
          size="medium"
          weight={titleWeight === 'bold' ? 'bold' : 'semiBold'}
          style={[
            styles.title,
            {
              color: titleColor || colors.primary,
              fontSize: titleSize,
              fontFamily: getArabicFont('bold'),
              writingDirection: 'rtl',
              textAlign: 'center',
              lineHeight: titleSize * 1.3,
            },
          ]}
        >
          {title}
        </ThemedText>
      );
    }
    return null;
  };

  const renderRightElement = () => {
    if (rightElement) return rightElement;
    return <View style={styles.placeholder} />;
  };

  return (
    <>
      <View
        style={[
          styles.header,
          {
            backgroundColor: backgroundColor || colors.background,
            paddingTop: useSafeArea ? insets.top + paddingTop : paddingTop,
            paddingBottom,
            paddingHorizontal,
          },
        ]}
      >
        {renderLeftElement()}
        <View style={styles.centerContainer}>
          {renderCenterElement()}
        </View>
        {renderRightElement()}
      </View>
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  iconButton: {
    padding: 4,
    borderRadius: 8,
  },
  placeholder: {
    width: 26,
    height: 26,
  },
});
