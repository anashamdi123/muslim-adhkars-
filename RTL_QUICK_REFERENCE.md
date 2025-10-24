# RTL Quick Reference Guide

## 🚀 Quick Start

Your app is now **fully RTL-enabled**. Here's everything you need to know:

---

## ✅ What's Already Done

- ✅ **Global RTL enabled** - `I18nManager.forceRTL(true)`
- ✅ **All text aligns right** - via `ThemedText` component
- ✅ **Navigation reversed** - screens slide from right
- ✅ **Icons flipped** - directional icons auto-reverse
- ✅ **Sidebar from right** - natural for Arabic
- ✅ **Utility functions** - in `utils/rtl.ts`

---

## 🎯 Common Tasks

### 1. **Adding New Text**
```typescript
// ✅ CORRECT - Use ThemedText (auto RTL)
<ThemedText>مرحبا بكم</ThemedText>

// ❌ WRONG - Don't use raw Text
<Text>مرحبا بكم</Text>
```

### 2. **Creating Layouts**
```typescript   
// ✅ CORRECT - flexDirection auto-reverses
<View style={{ flexDirection: 'row' }}>
  {/* Items flow right-to-left automatically */}
</View>

// ❌ WRONG - Don't force row-reverse
<View style={{ flexDirection: 'row-reverse' }}>
```

### 3. **Adding Icons**
```typescript
import { getDirectionalIcon } from '@/utils/rtl';

// ✅ CORRECT - Use utility
<MaterialIcons name={getDirectionalIcon('back')} />

// ❌ WRONG - Hardcoded icon
<MaterialIcons name="arrow-back" />
```

### 4. **Margins & Padding**
```typescript
// ✅ CORRECT - Use logical properties
style={{
  marginStart: 10,  // Auto: right in RTL, left in LTR
  marginEnd: 20,
  paddingStart: 15,
  paddingEnd: 15,
}}

// ❌ WRONG - Physical properties
style={{
  marginLeft: 10,
  marginRight: 20,
}}
```

### 5. **Text Alignment**
```typescript
import { getTextAlign } from '@/utils/rtl';

// ✅ CORRECT - Use utility
<Text style={{ textAlign: getTextAlign() }}>

// ✅ ALSO CORRECT - ThemedText handles it
<ThemedText>نص</ThemedText>

// ❌ WRONG - Hardcoded
<Text style={{ textAlign: 'left' }}>
```

---

## 🛠️ RTL Utility Functions

### Import:
```typescript
import { 
  isRTL, 
  getTextAlign, 
  getFlexDirection,
  getDirectionalIcon,
  getHorizontalSpacing 
} from '@/utils/rtl';
```

### Usage Examples:

#### Check if RTL:
```typescript
if (isRTL()) {
  // RTL-specific logic
}
```

#### Get Text Alignment:
```typescript
const align = getTextAlign(); // 'right' in RTL, 'left' in LTR
const centerAlign = getTextAlign(true); // always 'center'
```

#### Get Flex Direction:
```typescript
const direction = getFlexDirection(); // 'row-reverse' in RTL
const reversed = getFlexDirection(true); // opposite of normal
```

#### Get Icon Names:
```typescript
const backIcon = getDirectionalIcon('back');     // 'arrow-forward' in RTL
const forwardIcon = getDirectionalIcon('forward'); // 'arrow-back' in RTL
const leftIcon = getDirectionalIcon('left');     // 'chevron-right' in RTL
const rightIcon = getDirectionalIcon('right');   // 'chevron-left' in RTL
```

#### Get Horizontal Spacing:
```typescript
const startMargin = getHorizontalSpacing(10, 'start'); 
// { marginRight: 10 } in RTL
// { marginLeft: 10 } in LTR

const endPadding = getHorizontalSpacing(20, 'end');
// { marginLeft: 20 } in RTL  
// { marginRight: 20 } in LTR
```

---

## 📱 Testing Checklist

### Before Committing Changes:

- [ ] Text aligns right
- [ ] Icons face correct direction
- [ ] Navigation feels natural (swipe from right)
- [ ] Layouts flow right-to-left
- [ ] No text overflow
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested on Web (if applicable)

---

## 🎨 Common Patterns

### Pattern 1: Card with Icon
```typescript
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  {/* Icon automatically on right in RTL */}
  <MaterialIcons name="star" size={24} />
  <ThemedText style={{ marginStart: 8 }}>النص</ThemedText>
</View>
```

### Pattern 2: List Item with Arrow
```typescript
import { getDirectionalIcon } from '@/utils/rtl';

<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <ThemedText>العنوان</ThemedText>
  <MaterialIcons name={getDirectionalIcon('right')} />
</TouchableOpacity>
```

### Pattern 3: Header with Back Button
```typescript
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <TouchableOpacity onPress={goBack}>
    <MaterialIcons 
      name={I18nManager.isRTL ? "arrow-forward" : "arrow-back"} 
      size={24} 
    />
  </TouchableOpacity>
  <ThemedText style={{ marginStart: 16 }}>العنوان</ThemedText>
</View>
```

### Pattern 4: Form Input
```typescript
<TextInput
  style={{
    textAlign: getTextAlign(),
    writingDirection: 'rtl',
  }}
  placeholder="اكتب هنا..."
/>
```

---

## ⚠️ Common Mistakes

### Mistake 1: Hardcoded Text Alignment
```typescript
// ❌ WRONG
<Text style={{ textAlign: 'left' }}>النص</Text>

// ✅ CORRECT
<ThemedText>النص</ThemedText>
```

### Mistake 2: Using marginLeft/marginRight
```typescript
// ❌ WRONG
style={{ marginLeft: 10 }}

// ✅ CORRECT
style={{ marginStart: 10 }}
```

### Mistake 3: Forcing Row Direction
```typescript
// ❌ WRONG
<View style={{ flexDirection: 'row-reverse' }}>

// ✅ CORRECT  
<View style={{ flexDirection: 'row' }}>
```

### Mistake 4: Hardcoded Icons
```typescript
// ❌ WRONG
<MaterialIcons name="arrow-back" />

// ✅ CORRECT
<MaterialIcons name={getDirectionalIcon('back')} />
```

### Mistake 5: Not Using ThemedText
```typescript
// ❌ WRONG
import { Text } from 'react-native';
<Text>النص</Text>

// ✅ CORRECT
import { ThemedText } from '@/components/themed-text';
<ThemedText>النص</ThemedText>
```

---

## 🔧 Debugging Tips

### Issue: "Text not aligned right"
**Check:**
1. Are you using `<ThemedText>`?
2. Is `I18nManager.isRTL` true?
3. Did you restart the app after enabling RTL?

**Fix:**
```typescript
// Force reload (development only)
import { I18nManager } from 'react-native';
console.log('RTL Enabled:', I18nManager.isRTL); // Should be true
```

### Issue: "Icons not flipping"
**Check:**
1. Are you using directional icons (arrows, chevrons)?
2. Using Material Icons (auto-mirrors)?
3. Using custom SVG (needs manual flip)?

**Fix:**
```typescript
import { getDirectionalIcon } from '@/utils/rtl';
<MaterialIcons name={getDirectionalIcon('back')} />
```

### Issue: "Layout looks weird"
**Check:**
1. Using `flexDirection: 'row'` (not 'row-reverse')
2. Using `marginStart`/`marginEnd` (not Left/Right)
3. Tested on actual device (not just simulator)

**Fix:**
```typescript
// Clear cache and restart
npx expo start --clear
```

---

## 📚 Resources

### Internal:
- [`utils/rtl.ts`](utils/rtl.ts) - All RTL utilities
- [`components/themed-text.tsx`](components/themed-text.tsx) - RTL text component
- [`RTL_IMPLEMENTATION_COMPLETE.md`](RTL_IMPLEMENTATION_COMPLETE.md) - Full documentation

### External:
- [React Native RTL Guide](https://reactnative.dev/blog/2016/08/19/right-to-left-support-for-react-native-apps)
- [Material Design RTL](https://material.io/design/usability/bidirectionality.html)
- [Expo I18nManager](https://docs.expo.dev/versions/latest/react-native/i18nmanager/)

---

## ✅ Final Checklist

Before deploying:

- [ ] All screens tested in RTL
- [ ] Navigation flows correctly
- [ ] Text alignment verified
- [ ] Icons facing right direction
- [ ] No layout overflow issues
- [ ] Tested on iOS
- [ ] Tested on Android  
- [ ] Tested on Web
- [ ] Performance is good
- [ ] No console errors

---

## 🎉 You're All Set!

RTL is fully implemented. Just use the provided components and utilities, and everything will work automatically!

**Happy coding! 🚀**
