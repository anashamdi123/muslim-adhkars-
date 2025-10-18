# تطبيق الأذكار الإسلامي - MVP App Flow

## 📱 Overview
A lightweight Arabic Islamic app including essential features:
- Adhkar (remembrances)
- Qibla direction
- Tasbih counter
- Prayer times

**Features**:
- Fully RTL (right-to-left) layout
- Mobile-first design with bottom tab navigation
- Clean Arabic UI with Islamic green theme

---

## 🎯 Core Features (MVP)

1. **Adhkar (الأذكار)**
   - 9 categories (Morning, Evening, After Prayer, Eating/Drinking, Travel, Home, Sleep, General, Protection)
   - Tap to view list of dhikr with counters
   - Reset counters and completion badge

2. **Qibla Compass (القبلة)**
   - Compass pointing to Mecca
   - Location info (city, coordinates, distance)
   - Calibrates via device orientation

3. **Tasbih Counter (التسبيح)**
   - Presets: Subhan Allah, Alhamdulillah, Allahu Akbar, La ilaha illallah, Astaghfirullah
   - Counter with undo/reset buttons
   - Progress ring and goal tracking

4. **Prayer Times (مواقيت الصلاة)**
   - Daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
   - Highlights next prayer
   - Auto/manual location
   - Optional Hijri date display

---

## 🗺️ Navigation
bottom tabs bar

---
## header  
the page name 
options

### 1️⃣ Adhkar Screen
- Category grid (9 categories)
- Tap category → list of dhikr
- Dhikr card:
  - Arabic text 
  - Counter badge
  - decrement  on tap (each dhikr has his own counter)
- Reset button in the header 

### 2️⃣ Qibla Compass Screen
- Compass pointing to Mecca
- Device orientation + magnetometer
- Location info card
- Calibration instructions
- Error handling for permissions

### 3️⃣ Tasbih Counter Screen
- displays the counter 

### 4️⃣ Prayer Times Screen
- Displays daily prayers with time and status
- Highlights next prayer
- Countdown timer
- Location detection 

---

## 🔄 User Flows

### First Time Use
1. App loads → Adhkar default screen
2. Tap category → view dhikr list
3. Tap dhikr 
4. Completion badge appears when finished
5. Navigate to other tabs as needed



---

## 🛠️ MVP Technical Details

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **State**: React hooks (`useState`, `useEffect`)
- **Persistence**: AsyncStorage
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Navigation**: `@react-navigation/bottom-tabs`

---

## 🎨 Design     
spotify inspired theme 
## 🔐 Permissions

- **Required**:
  - Location (for prayer times, Qibla)
  - Device Orientation (for compass)


---

## 🎯 MVP Goals

- Lightweight, fast-loading
- Fully functional core features
- Simple local persistence
- RTL Arabic interface
- User-friendly, spiritual experience



📦 muslim-app/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── adhkar/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   ├── qibla.tsx
│   ├── tasbih.tsx
│   └── prayers.tsx
├── components/
│   ├── AdhkarItem.tsx
│   ├── DhikrCard.tsx
│   ├── QiblaCompass.tsx
│   ├── PrayerCard.tsx
│   └── TasbihCounter.tsx
├── data/
│   └── adhkar.json
├── utils/
│   ├── qiblaUtils.ts
│   ├── prayerUtils.ts
│   └── storage.ts
├── assets/
│   ├── images/
│   └── fonts/
├── styles/
│   └── colors.ts
├── app.config.js
├── tsconfig.json
└── package.json
