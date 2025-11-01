import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AnimatedScreen } from '@/components/animated-screen';
import { CommonHeader } from '@/components/common-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTranslation } from 'react-i18next';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { changeLanguage } from '@/src/i18n';
import { I18nManager } from 'react-native';

export default function SettingsScreen() {
  const { colorScheme, themeMode, setThemeMode } = useTheme();
  const colors = Colors[colorScheme];
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const themeOptions: Array<{ value: 'light' | 'dark'; label: string; icon: string }> = [
    { value: 'light', label: t('settings.themeLight'), icon: 'light-mode' },
    { value: 'dark', label: t('settings.themeDark'), icon: 'dark-mode' },
  ];

  const currentTheme = themeOptions.find(option => option.value === themeMode);

  const handleThemeSelect = (value: 'light' | 'dark') => {
    setThemeMode(value);
    setThemeModalVisible(false);
  };

  const languageOptions: Array<{ value: 'ar' | 'en'; label: string; icon: string }> = [
    { value: 'ar', label: 'العربية', icon: 'translate' },
    { value: 'en', label: 'English', icon: 'translate' },
  ];

  const currentLanguage = languageOptions.find(option => option.value === (i18n.language === 'ar' ? 'ar' : 'en'));

  const handleLanguageSelect = async (value: 'ar' | 'en') => {
    await changeLanguage(value);
    setLangModalVisible(false);
  };

  return (
    <AnimatedScreen animationType="fade" duration={400}>
      <ThemedView style={styles.container}>
        <CommonHeader title={t('settings.title')} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Section */}
        <View style={styles.section}>
          <ThemedText type="headline" size="small" style={styles.sectionTitle}>
            {t('settings.theme')}
          </ThemedText>
          
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card }, Shadows.md]}
            onPress={() => setThemeModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.themeButton}>
              <View style={styles.themeButtonLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <MaterialIcons
                    name={currentTheme?.icon as any}
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <ThemedText type="body" size="large" weight="semiBold">
                  {currentTheme?.label}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <ThemedText type="headline" size="small" style={styles.sectionTitle}>
            {t('settings.language')}
          </ThemedText>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card }, Shadows.md]}
            onPress={() => setLangModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.themeButton}>
              <View style={styles.themeButtonLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <MaterialIcons
                    name={currentLanguage?.icon as any}
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <ThemedText type="body" size="large" weight="semiBold">
                  {currentLanguage?.label}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <ThemedText type="headline" size="small" style={styles.sectionTitle}>
            {t('settings.about')}
          </ThemedText>
          
          <View style={[styles.card, { backgroundColor: colors.card }, Shadows.md]}>
            <View style={styles.aboutRow}>
              <ThemedText type="body" size="medium" style={{ color: colors.muted }}>
                {t('settings.version')}
              </ThemedText>
              <ThemedText type="body" size="medium" weight="semiBold">
                1.0.0
              </ThemedText>
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <ThemedText type="body" size="small" style={{ color: colors.muted, textAlign: 'center' }}>
            {t('appName')}
          </ThemedText>
          <ThemedText type="body" size="small" style={{ color: colors.muted, textAlign: 'center', marginTop: Spacing.xs }}>
            تطبيق الأذكار الإسلامية
          </ThemedText>
        </View>
      </ScrollView>

      {/* Theme Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={themeModalVisible}
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setThemeModalVisible(false)}
        >
          <Pressable 
            style={[styles.modalContent, { backgroundColor: colors.card }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setThemeModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
              <ThemedText type="headline" size="medium" weight="bold" style={{ flex: 1, textAlign: I18nManager.isRTL ? 'right' : 'left' }}>
                {t('settings.theme')}
              </ThemedText>
            </View>

            <View style={styles.modalBody}>
              {themeOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.modalOption,
                    index !== themeOptions.length - 1 && styles.modalOptionBorder,
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => handleThemeSelect(option.value)}
                  activeOpacity={0.7}
                >
                  <View style={styles.modalOptionLeft}>
                    <View
                      style={[
                        styles.modalIconContainer,
                        { backgroundColor: colors.surface },
                      ]}
                    >
                      <MaterialIcons
                        name={option.icon as any}
                        size={28}
                        color={themeMode === option.value ? colors.primary : colors.text}
                      />
                    </View>
                    <ThemedText
                      type="body"
                      size="large"
                      weight="semiBold"
                      style={[
                        themeMode === option.value && { color: colors.primary },
                      ]}
                    >
                      {option.label}
                    </ThemedText>
                  </View>
                  
                  {themeMode === option.value && (
                    <MaterialIcons
                      name="check-circle"
                      size={28}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={langModalVisible}
        onRequestClose={() => setLangModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setLangModalVisible(false)}
        >
          <Pressable 
            style={[styles.modalContent, { backgroundColor: colors.card }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setLangModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
              <ThemedText type="headline" size="medium" weight="bold" style={{ flex: 1, textAlign: I18nManager.isRTL ? 'right' : 'left' }}>
                {t('settings.language')}
              </ThemedText>
            </View>

            <View style={styles.modalBody}>
              {languageOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.modalOption,
                    index !== languageOptions.length - 1 && styles.modalOptionBorder,
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => handleLanguageSelect(option.value)}
                  activeOpacity={0.7}
                >
                  <View style={styles.modalOptionLeft}>
                    <View
                      style={[
                        styles.modalIconContainer,
                        { backgroundColor: colors.surface },
                      ]}
                    >
                      <MaterialIcons
                        name={option.icon as any}
                        size={28}
                        color={(i18n.language === option.value) ? colors.primary : colors.text}
                      />
                    </View>
                    <ThemedText
                      type="body"
                      size="large"
                      weight="semiBold"
                      style={[
                        (i18n.language === option.value) && { color: colors.primary },
                      ]}
                    >
                      {option.label}
                    </ThemedText>
                  </View>
                  
                  {(i18n.language === option.value) && (
                    <MaterialIcons
                      name="check-circle"
                      size={28}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      </ThemedView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollView: { 
    flex: 1 
  },
  scrollContent: { 
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  themeButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeTextContainer: {
    flex: 1,
    gap: Spacing.xs,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  appInfo: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: BorderRadius.xl,
    ...Shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  modalBody: {
    paddingBottom: Spacing.sm,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  modalOptionBorder: {
    borderBottomWidth: 1,
  },
  modalOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  modalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
