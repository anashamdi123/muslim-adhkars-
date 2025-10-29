import { I18nManager, StyleSheet, Text, type TextProps } from 'react-native';

import { getArabicFont, getDisplayFont, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'subtitle' | 'headline' | 'body' | 'label' | 'display' | 'adhkar';
  size?: 'small' | 'medium' | 'large';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold';
  // Use display font (Noto Kufi Arabic) for Quranic text and adhkars
  useDisplayFont?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  size = 'medium',
  weight = 'regular',
  useDisplayFont = false,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Get typography styles based on type and size
  const getTypographyStyle = () => {
    switch (type) {
      case 'display':
        return Typography.display[size];
      case 'headline':
        return Typography.headline[size];
      case 'title':
        return Typography.title[size];
      case 'body':
        return Typography.body[size];
      case 'label':
        return Typography.label[size];
      case 'adhkar':
        return Typography.adhkar[size];
      case 'subtitle':
        return Typography.headline.medium;
      default:
        return Typography.body[size];
    }
  };

  const typographyStyle = getTypographyStyle();

  // Use Noto Kufi Arabic for adhkars/Quranic text, Cairo for UI text
  const fontFamily = (useDisplayFont || type === 'adhkar') 
    ? getDisplayFont(weight)
    : getArabicFont(weight);

  return (
    <Text
      style={[
        {
          color,
          fontFamily,
          ...typographyStyle,
          writingDirection: 'rtl',
          // Always use right alignment for Arabic text
          textAlign: 'right',
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Legacy styles for backward compatibility
  default: {
    ...Typography.body.medium,
  },
  title: {
    ...Typography.display.large,
  },
  subtitle: {
    ...Typography.headline.medium,
  },
  link: {
    ...Typography.body.medium,
    color: '#0a7ea4',
  },
});
