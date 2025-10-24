import { I18nManager, StyleSheet, Text, type TextProps } from 'react-native';

import { getArabicFont, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'subtitle' | 'headline' | 'body' | 'label' | 'display';
  size?: 'small' | 'medium' | 'large';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'display';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  size = 'medium',
  weight = 'regular',
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
      case 'subtitle':
        return Typography.headline.medium;
      default:
        return Typography.body[size];
    }
  };

  const typographyStyle = getTypographyStyle();

  return (
    <Text
      style={[
        {
          color,
          fontFamily: getArabicFont(weight),
          ...typographyStyle,
          writingDirection: 'rtl',
          textAlign: I18nManager.isRTL ? 'right' : 'left',
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
