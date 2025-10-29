# Unified Header with Status Bar - Implementation Guide

## 🎨 Overview

The app's header has been refactored to create a **seamless unified top section** that visually merges with the status bar, inspired by the Spotify-themed design system. This creates a premium, modern look with smooth gradients and elevated surfaces.

---

## ✨ Key Features

### 1. **Gradient Background**
- **Dark Theme**: Smooth gradient from pure black (#000000) at the status bar to dark gray (#181818) at the bottom
- **Light Theme**: Smooth gradient from white (#FFFFFF) to light gray (#F7F7F7)
- Creates visual continuity between status bar and header content

### 2. **Blur Effect (Optional)**
- Alternative to gradient for a frosted glass effect
- Platform-specific implementation (iOS/Android only)
- Adjustable intensity based on theme

### 3. **Elevated Design**
- Platform-specific shadows for depth
- iOS: Subtle shadow with blur
- Android: Material elevation
- Web: CSS box-shadow

### 4. **Transparent Status Bar**
- Translucent status bar that blends with header
- Content extends behind status bar
- Proper safe area handling

---

## 🚀 Usage

### Basic Usage (Default Gradient)

```typescript
import { CommonHeader } from '@/components/common-header';

<CommonHeader 
  title="الأذكار الإسلامية"
  showMenuButton={true}
/>
```

This will automatically use:
- ✅ Gradient background
- ✅ Elevated shadow
- ✅ Safe area insets
- ✅ Spotify-inspired colors

### Custom Configuration

```typescript
<CommonHeader 
  title="مواقيت الصلاة"
  titleSize={28}
  paddingBottom={30}
  
  // Gradient options
  useGradient={true}        // Enable gradient (default: true)
  useBlur={false}           // Use blur instead (default: false)
  elevated={true}           // Add shadow (default: true)
  
  // Custom styling
  backgroundColor="#1DB954" // Override background
  titleColor="#FFFFFF"      // Override title color
/>
```

### Blur Effect (iOS/Android)

```typescript
<CommonHeader 
  title="التسبيح"
  useGradient={false}       // Disable gradient
  useBlur={true}            // Enable blur
  elevated={true}
/>
```

### Solid Background (No Gradient/Blur)

```typescript
<CommonHeader 
  title="القبلة"
  useGradient={false}
  useBlur={false}
  backgroundColor="#121212"
/>
```

---

## 🎨 Design System Integration

### Gradient Colors

#### Dark Theme
```typescript
[
  'rgba(0, 0, 0, 0.95)',      // Pure black at top (status bar)
  'rgba(18, 18, 18, 0.98)',   // Dark gray (middle)
  'rgba(24, 24, 24, 1)',      // Card gray at bottom
]
```

#### Light Theme
```typescript
[
  'rgba(255, 255, 255, 0.95)', // White at top
  'rgba(247, 247, 247, 0.98)', // Light gray (middle)
  'rgba(255, 255, 255, 1)',    // White at bottom
]
```

### Shadow Elevation

#### Dark Theme
```typescript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8, // Android
}
```

#### Light Theme
```typescript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4, // Android
}
```

---

## 📱 Platform-Specific Behavior

### iOS
- ✅ Translucent status bar
- ✅ Smooth gradient background
- ✅ Native shadow with blur
- ✅ BlurView support for frosted glass effect

### Android
- ✅ Translucent status bar
- ✅ Gradient background
- ✅ Material elevation
- ✅ BlurView support

### Web
- ✅ Gradient background
- ✅ CSS box-shadow
- ⚠️ No BlurView (falls back to solid background)

---

## 🔧 Technical Implementation

### Component Structure

```
HeaderContainer (with elevation)
  ├─ LinearGradient (if useGradient)
  │   └─ HeaderContent
  │       ├─ Left Element (back/menu button)
  │       ├─ Center Element (title)
  │       └─ Right Element (custom)
  │
  ├─ BlurView (if useBlur)
  │   └─ HeaderContent
  │
  └─ SolidView (fallback)
      └─ HeaderContent
```

### Safe Area Handling

The header automatically handles safe area insets:

```typescript
paddingTop: useSafeArea ? insets.top + paddingTop : paddingTop
```

This ensures content doesn't overlap with:
- Status bar
- Notch (iPhone X and newer)
- Dynamic Island (iPhone 14 Pro and newer)

---

## 🎯 Props Reference

### HeaderProps Interface

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Header title text |
| `showBackButton` | `boolean` | `false` | Show back navigation button |
| `showMenuButton` | `boolean` | `true` | Show menu/hamburger button |
| `onBackPress` | `() => void` | - | Custom back button handler |
| `rightElement` | `ReactNode` | - | Custom right element |
| `leftElement` | `ReactNode` | - | Custom left element |
| `centerElement` | `ReactNode` | - | Custom center element |
| `backgroundColor` | `string` | theme color | Custom background color |
| `titleColor` | `string` | primary color | Custom title color |
| `titleSize` | `number` | `18` | Title font size |
| `titleWeight` | `'normal' \| 'bold'` | `'bold'` | Title font weight |
| `paddingTop` | `number` | `16` | Top padding (added to safe area) |
| `paddingBottom` | `number` | `16` | Bottom padding |
| `paddingHorizontal` | `number` | `20` | Horizontal padding |
| `useSafeArea` | `boolean` | `true` | Apply safe area insets |
| **`useGradient`** | `boolean` | `true` | **Enable gradient background** |
| **`useBlur`** | `boolean` | `false` | **Enable blur effect** |
| **`elevated`** | `boolean` | `true` | **Add shadow elevation** |

---

## 🎨 Visual Examples

### Default (Gradient + Elevation)
```typescript
<CommonHeader title="الأذكار" />
```
- Smooth gradient from black to dark gray
- Elevated shadow for depth
- Seamless status bar integration

### Blur Effect
```typescript
<CommonHeader 
  title="الصلاة" 
  useGradient={false} 
  useBlur={true} 
/>
```
- Frosted glass effect
- Content visible through blur
- Modern iOS-style design

### Solid Background
```typescript
<CommonHeader 
  title="القبلة" 
  useGradient={false} 
  backgroundColor="#000000" 
/>
```
- Solid color background
- No gradient or blur
- Simple, clean design

---

## 🔄 Migration Guide

### Before (Old Header)
```typescript
<CommonHeader 
  title="الأذكار الإسلامية"
  titleSize={28}
  paddingBottom={30}
/>
```

### After (Unified Header)
```typescript
<CommonHeader 
  title="الأذكار الإسلامية"
  titleSize={28}
  paddingBottom={30}
  // New props automatically applied:
  // useGradient={true}
  // elevated={true}
  // useSafeArea={true}
/>
```

**No changes required!** The unified header is backward compatible. All existing headers will automatically get the gradient and elevation.

---

## 🎯 Best Practices

### 1. **Use Default Settings**
The default configuration works great for most screens:
```typescript
<CommonHeader title="عنوان الصفحة" />
```

### 2. **Customize for Special Screens**
For screens with unique requirements:
```typescript
<CommonHeader 
  title="صفحة خاصة"
  useGradient={false}
  backgroundColor={colors.primary}
  titleColor="#FFFFFF"
/>
```

### 3. **Consistent Padding**
Use consistent padding across screens:
```typescript
// Main screens
paddingBottom={30}

// Detail screens
paddingBottom={20}
```

### 4. **Title Sizes**
Follow the typography scale:
```typescript
// Large titles (main screens)
titleSize={28}

// Medium titles (sub-screens)
titleSize={22}

// Small titles (modals)
titleSize={18}
```

---

## 🐛 Troubleshooting

### Issue: Status bar overlaps content
**Solution**: Ensure `useSafeArea={true}` (default)

### Issue: Gradient not showing
**Solution**: Check `useGradient={true}` and ensure `expo-linear-gradient` is installed

### Issue: Blur not working on web
**Solution**: BlurView is not supported on web. It automatically falls back to solid background.

### Issue: Shadow not visible
**Solution**: Ensure `elevated={true}` and check theme colors for contrast

---

## 📦 Dependencies

### Required Packages
```json
{
  "expo-linear-gradient": "^13.0.2",
  "expo-blur": "^13.0.2",
  "expo-status-bar": "~3.0.8",
  "react-native-safe-area-context": "~5.6.0"
}
```

### Installation
```bash
npm install expo-linear-gradient expo-blur
```

---

## 🎨 Spotify Design Inspiration

The unified header follows Spotify's design principles:

1. **Seamless Integration**: Status bar and header are one unified element
2. **Depth through Elevation**: Shadows create visual hierarchy
3. **Smooth Gradients**: Subtle color transitions for premium feel
4. **Dark-First Design**: Optimized for OLED displays
5. **Consistent Spacing**: Follows design system spacing scale

---

## 📝 Code Examples

### Example 1: Main Screen with Large Title
```typescript
import { CommonHeader } from '@/components/common-header';

export default function MainScreen() {
  return (
    <ThemedView>
      <CommonHeader 
        title="الأذكار الإسلامية"
        titleSize={28}
        paddingBottom={30}
        showMenuButton={true}
      />
      {/* Screen content */}
    </ThemedView>
  );
}
```

### Example 2: Detail Screen with Back Button
```typescript
export default function DetailScreen() {
  return (
    <ThemedView>
      <CommonHeader 
        title="أذكار الصباح"
        titleSize={22}
        showBackButton={true}
        showMenuButton={false}
      />
      {/* Screen content */}
    </ThemedView>
  );
}
```

### Example 3: Custom Header with Blur
```typescript
export default function CustomScreen() {
  return (
    <ThemedView>
      <CommonHeader 
        title="صفحة مخصصة"
        useGradient={false}
        useBlur={true}
        elevated={true}
        rightElement={
          <TouchableOpacity>
            <MaterialIcons name="share" size={24} />
          </TouchableOpacity>
        }
      />
      {/* Screen content */}
    </ThemedView>
  );
}
```

---

## ✅ Summary

The unified header creates a **premium, modern experience** by:

- ✅ Seamlessly merging with the status bar
- ✅ Using smooth gradients inspired by Spotify
- ✅ Adding depth through platform-specific elevation
- ✅ Supporting blur effects for frosted glass look
- ✅ Maintaining backward compatibility
- ✅ Following the app's design system
- ✅ Providing flexible customization options

The implementation is **production-ready** and works across iOS, Android, and Web platforms.

---

**Implementation Date**: October 27, 2025  
**Version**: 2.1.0  
**Status**: ✅ Complete
