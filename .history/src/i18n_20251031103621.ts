import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager, Platform } from 'react-native';
import * as RNLocalize from 'react-native-localize';

import ar from './locales/ar.json';
import en from './locales/en.json';

// Languages supported
export type AppLanguage = 'en' | 'ar';

function getInitialLanguage(): AppLanguage {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales) && locales.length > 0) {
    const langCode = locales[0].languageCode?.toLowerCase();
    if (langCode === 'ar') return 'ar';
  }
  return 'en';
}

function applyDirectionFor(lang: AppLanguage): void {
  const shouldUseRTL = lang === 'ar';
  // Web handles direction via CSS; native requires toggles + reload
  if (Platform.OS !== 'web') {
    I18nManager.allowRTL(shouldUseRTL);
    I18nManager.forceRTL(shouldUseRTL);
  }
}

// Initialize i18n
const initialLang: AppLanguage = getInitialLanguage();
applyDirectionFor(initialLang);

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export async function changeLanguage(lang: AppLanguage): Promise<void> {
  if (i18n.language === lang) return;

  applyDirectionFor(lang);
  await i18n.changeLanguage(lang);

  // Restart/reload app so RTL/LTR takes effect immediately
  try {
    // Prefer Expo Updates if available
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Updates = require('expo-updates');
    if (Updates?.reloadAsync) {
      await Updates.reloadAsync();
      return;
    }
  } catch {}

  try {
    // Fallback to react-native-restart (requires native support/EAS build)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RNRestart = require('react-native-restart');
    if (RNRestart?.Restart) RNRestart.Restart();
  } catch {}
}

export default i18n;

