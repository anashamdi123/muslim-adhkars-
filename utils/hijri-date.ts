/**
 * Hijri Date Conversion Utility
 * Converts Gregorian dates to Hijri (Islamic) calendar
 */

interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
}

const HIJRI_MONTHS = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الثاني',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];

/**
 * Convert Gregorian date to Hijri date
 * Using the Umm al-Qura calendar algorithm
 */
export function gregorianToHijri(date: Date): HijriDate {
  // Julian day calculation
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  let jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  // Convert Julian day to Hijri
  let l = jd - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j =
    Math.floor((10985 - l) / 5316) *
      Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) *
      Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) *
      Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) *
      Math.floor((15238 * j) / 43) +
    29;

  const hijriMonth = Math.floor((24 * l) / 709);
  const hijriDay = l - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * n + j - 30;

  return {
    day: hijriDay,
    month: hijriMonth,
    year: hijriYear,
    monthName: HIJRI_MONTHS[hijriMonth - 1] || '',
  };
}

/**
 * Format Hijri date as Arabic string
 */
export function formatHijriDate(date: Date): string {
  const hijri = gregorianToHijri(date);
  return `${hijri.day} ${hijri.monthName} ${hijri.year}هـ`;
}

/**
 * Get Arabic day name
 */
export function getArabicDayName(date: Date): string {
  const days = [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ];
  return days[date.getDay()];
}

/**
 * Get Arabic month name
 */
export function getArabicMonthName(date: Date): string {
  const months = [
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
  ];
  return months[date.getMonth()];
}

/**
 * Format full date with both Gregorian and Hijri
 */
export function formatFullDate(date: Date): {
  gregorian: string;
  hijri: string;
  dayName: string;
  isToday: boolean;
  isTomorrow: boolean;
} {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();

  const dayName = getArabicDayName(date);
  const day = date.getDate();
  const month = getArabicMonthName(date);
  const year = date.getFullYear();

  const gregorian = `${dayName}، ${day} ${month} ${year}`;
  const hijri = formatHijriDate(date);

  return {
    gregorian,
    hijri,
    dayName,
    isToday,
    isTomorrow,
  };
}
