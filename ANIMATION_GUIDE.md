# 🎬 Screen Animation Guide

## Overview
Every screen in the app now **re-animates each time you visit it**, creating a smooth and engaging user experience.

## How It Works

### **🔄 Re-animation on Every Visit**
- Uses `useFocusEffect` from `@react-navigation/native`
- Detects when a screen comes into focus
- Automatically resets and re-triggers animations
- Works on both initial visits and revisits

### **⚡ Performance Optimizations**
1. **Worklet Functions** - Animations run on the UI thread for 60fps
2. **Animation Cancellation** - Prevents conflicts when switching screens
3. **Proper Cleanup** - No memory leaks
4. **Lazy Loading** - Screens load only when needed

## Screen-by-Screen Breakdown

### 📚 **Adhkar List (index.tsx)**
- **Main Animation**: `slideUp` (400ms)
- **Stagger Effect**: `spring` animation on cards (80ms delay each)
- **Re-triggers**: ✅ Every visit
- **Visual Effect**: Cards bounce into view one by one

### 🕌 **Prayers Screen (prayers.tsx)**
- **Main Animation**: `fade` (400ms)
- **Stagger Effects**:
  - Date container: `fadeUp` (100ms delay)
  - Location: `fadeUp` (200ms delay)
  - Prayer times: `fadeLeft` (sequential, 80ms each)
- **Re-triggers**: ✅ Every visit
- **Visual Effect**: Content gracefully fades and slides in

### 🧭 **Qibla Screen (qibla.tsx)**
- **Main Animation**: `scale` (400ms)
- **Stagger Effects**:
  - Compass: `spring` bounce (600ms, delay 0)
  - Info card: `fadeUp` (delay 100ms)
  - Calibration tip: `fadeUp` (delay 200ms)
- **Re-triggers**: ✅ Every visit
- **Visual Effect**: Compass bounces dramatically, info slides up

### 📿 **Tasbih Screen (tasbih.tsx)**
- **Main Animation**: `fade` (350ms)
- **Re-triggers**: ✅ Every visit
- **Visual Effect**: Clean fade-in transition

### 📖 **Dhikr Detail ([id].tsx)**
- **Main Animation**: `slideLeft` (350ms)
- **Re-triggers**: ✅ Every visit
- **Visual Effect**: Slides in from the left like a page turn

## Component API

### **AnimatedScreen Component**
```tsx
<AnimatedScreen
  animationType="fade" // 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'spring'
  duration={400}       // Animation duration in milliseconds
  delay={0}            // Delay before animation starts
  onAnimationComplete={() => {}} // Callback when animation finishes
>
  {children}
</AnimatedScreen>
```

### **StaggeredView Component**
```tsx
<StaggeredView
  index={0}                    // Index for stagger delay calculation
  animationType="fadeUp"       // 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'spring'
  staggerDelay={100}           // Delay multiplier per index
  duration={400}               // Animation duration
  enableReanimation={true}     // Whether to re-animate on screen focus
>
  {children}
</StaggeredView>
```

## Testing the Animations

### **What to Test:**
1. **Initial Load** - Navigate to each screen for the first time
2. **Revisit** - Go to a different tab and come back
3. **Multiple Revisits** - Switch between tabs multiple times
4. **Deep Navigation** - Open an adhkar detail, go back, reopen

### **Expected Behavior:**
- ✅ Animations trigger smoothly every time
- ✅ No lag or stuttering
- ✅ Consistent timing and visual effect
- ✅ No animation conflicts when switching quickly

## Customization

### **Disable Re-animation for Specific Elements**
If you want certain elements to animate only once:
```tsx
<StaggeredView
  index={0}
  enableReanimation={false} // Will animate only on first mount
>
  {children}
</StaggeredView>
```

### **Adjust Animation Speed**
```tsx
// Faster animation
<AnimatedScreen animationType="fade" duration={200}>

// Slower, more dramatic
<AnimatedScreen animationType="spring" duration={600}>
```

### **Change Animation Type**
```tsx
// Subtle fade
<AnimatedScreen animationType="fade">

// Dynamic entrance
<AnimatedScreen animationType="spring">

// Directional slide
<AnimatedScreen animationType="slideUp">
```

## Technical Details

### **Why useFocusEffect?**
- `useEffect` only runs on mount/unmount
- `useFocusEffect` runs every time the screen comes into focus
- Perfect for tab-based navigation where screens stay mounted

### **Animation Lifecycle**
1. Screen comes into focus
2. Cancel any running animations
3. Reset all animation values to initial state
4. Start animation sequence
5. Complete animation
6. Wait for next focus event

### **Performance Impact**
- **Negligible** - Animations run on UI thread via Reanimated
- **No JavaScript thread blocking**
- **60fps maintained** even on lower-end devices
- **Memory efficient** - Proper cleanup on unmount

## Troubleshooting

### **Animations Not Triggering**
- Ensure `@react-navigation/native` is installed
- Check that screen is wrapped in `AnimatedScreen`
- Verify `enableReanimation` is not set to `false`

### **Performance Issues**
- Reduce `duration` values
- Decrease `staggerDelay` for fewer items
- Use simpler animation types (fade vs spring)

### **Visual Glitches**
- Check for CSS conflicts
- Ensure no other animation libraries interfere
- Verify Reanimated is properly configured

## Next Steps

The animation system is now fully set up! Every screen will re-animate on each visit, providing a polished, app-like experience.

To run and test:
```bash
npx expo start
```

Then test navigation between all tabs to see the animations in action! 🎉
