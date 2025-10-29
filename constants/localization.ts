/**
 * Arabic Localization Strings
 * Centralized Arabic text for the Muslim Adhkar app
 * Full RTL support with proper Arabic typography
 */

export const Localization = {
  // App Name
  appName: 'أذكار المسلم',
  
  // Tab Bar
  tabs: {
    adhkars: 'الأذكار',
    tasbih: 'التسبيح',
    qibla: 'القبلة',
    prayers: 'الصلاة',
  },
  
  // Common UI
  common: {
    back: 'رجوع',
    close: 'إغلاق',
    done: 'تم',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    share: 'مشاركة',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    retry: 'إعادة المحاولة',
    noData: 'لا توجد بيانات',
  },
  
  // Adhkars Screen
  adhkars: {
    title: 'الأذكار الإسلامية',
    categories: 'الفئات',
    section: 'قسم',
    dhikr: 'ذِكر',
    completed: 'تم الانتهاء من الأذكار',
    notFound: 'لم يتم العثور على الأذكار',
    categoryNotFound: 'لم يتم العثور على الفئة',
  },
  
  // Tasbih Screen
  tasbih: {
    title: 'التسبيح',
    counter: 'العداد',
    reset: 'إعادة تعيين',
    count: 'العدد',
  },
  
  // Qibla Screen
  qibla: {
    title: 'اتجاه القبلة',
    direction: 'أمامك مباشرة',
    instruction: 'وجه هاتفك نحو السهم الأخضر',
    north: 'ش',
    south: 'ج',
    east: 'ق',
    west: 'غ',
  },
  
  // Prayer Times Screen
  prayers: {
    title: 'مواقيت الصلاة',
    nextPrayer: 'الصلاة القادمة',
    loading: 'جاري تحميل مواقيت الصلاة...',
    error: 'حدث خطأ في تحميل مواقيت الصلاة',
    locationError: 'يرجى السماح بالوصول إلى الموقع',
    retry: 'إعادة المحاولة',
    after: 'بعد',
    hours: 'ساعة',
    minutes: 'دقيقة',
    and: 'و',
    locatingLocation: 'جاري تحديد الموقع...',
    
    // Prayer Names
    names: {
      fajr: 'الفجر',
      sunrise: 'الشروق',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
    },
  },
  
  // Settings
  settings: {
    title: 'الإعدادات',
    theme: 'المظهر',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    themeAuto: 'تلقائي',
    language: 'اللغة',
    notifications: 'الإشعارات',
    about: 'حول التطبيق',
    version: 'الإصدار',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
  },
  
  // Time Formatting
  time: {
    am: 'ص',
    pm: 'م',
    now: 'الآن',
    today: 'اليوم',
    tomorrow: 'غداً',
  },
  
  // Hijri Months
  hijriMonths: [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الآخر',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
  ],
  
  // Gregorian Months
  gregorianMonths: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  
  // Days of Week
  daysOfWeek: [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
};

// Helper function to format time remaining
export const formatTimeRemaining = (hours: number, minutes: number): string => {
  if (hours > 0) {
    return `${Localization.prayers.after} ${hours} ${Localization.prayers.hours} ${Localization.prayers.and} ${minutes} ${Localization.prayers.minutes}`;
  }
  return `${Localization.prayers.after} ${minutes} ${Localization.prayers.minutes}`;
};

// Helper function to format Hijri date
export const formatHijriDate = (day: number, month: number, year: number): string => {
  return `${day} ${Localization.hijriMonths[month - 1]} ${year}`;
};

// Helper function to format Gregorian date
export const formatGregorianDate = (day: number, month: number, year: number): string => {
  return `${day} ${Localization.gregorianMonths[month - 1]} ${year}`;
};

export default Localization;
