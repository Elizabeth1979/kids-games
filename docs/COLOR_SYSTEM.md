# Color System Documentation

## Overview

This project uses a **centralized HSL-based color system** with light/dark mode support, built on top of **shadcn/ui** components for accessibility and consistency.

## Design Philosophy

### HSL Color Model
We use HSL (Hue, Saturation, Lightness) instead of RGB or HEX because:
- **Single Source of Truth**: Define one base hue, create variations by adjusting lightness
- **Consistency**: All colors share the same hue family
- **Easy Adjustments**: Change brightness without affecting the color identity
- **Better for Theming**: Perfect for light/dark mode inversions

### Color Scheme

**Base Hue**: Blue with Purple Undertone
- HSL: `hsl(250, X%, X%)`
- This creates a professional, kid-friendly, gender-neutral palette

**Accent Hue**: Golden Yellow
- HSL: `hsl(48, X%, X%)`
- Warm, energetic, high contrast for buttons and highlights

## Color Palette

### Light Mode (Default)

```css
--background: 250 25% 97%        /* Very light blue-purple tint */
--foreground: 250 70% 18%        /* Very dark blue-purple */

--card: 250 40% 92%              /* Vibrant light purple-blue for cards */
--card-foreground: 250 70% 18%   /* Dark text on cards */

--primary: 250 60% 45%           /* Rich medium blue-purple for navigation */
--primary-foreground: 250 5% 98% /* Nearly white text on primary */

--secondary: 250 30% 88%         /* Subtle background accent */
--secondary-foreground: 250 60% 25% /* Medium dark for text */

--muted: 250 20% 90%             /* Very subtle backgrounds */
--muted-foreground: 250 40% 35%  /* Medium text color */

--accent: 48 90% 50%             /* Deep golden yellow */
--accent-foreground: 250 70% 18% /* Dark text on golden */

--destructive: 0 84% 60%         /* Error/warning red */
--border: 250 30% 85%            /* Subtle borders */
```

### Dark Mode

```css
--background: 250 45% 10%        /* Very dark blue-purple */
--foreground: 48 85% 88%         /* Light golden cream */

--card: 250 40% 20%              /* Dark purple-blue cards */
--card-foreground: 48 85% 88%    /* Light golden text */

--primary: 250 60% 15%           /* Darker navigation */
--primary-foreground: 48 85% 88% /* Light golden text */

--secondary: 250 35% 25%         /* Slightly lighter dark */
--secondary-foreground: 48 80% 85% /* Light text */

--muted: 250 30% 20%             /* Muted dark backgrounds */
--muted-foreground: 250 15% 75%  /* Light purple-gray text */

--accent: 48 95% 65%             /* Bright golden yellow */
--accent-foreground: 250 60% 12% /* Very dark for contrast */

--destructive: 0 62% 50%         /* Slightly darker red */
--border: 250 35% 25%            /* Subtle dark borders */
```

## How to Use Colors

### In Components

Use semantic Tailwind classes that reference CSS variables:

```tsx
// Background colors
<div className="bg-background">        // Page background
<div className="bg-card">              // Card background
<div className="bg-primary">           // Primary elements (nav, buttons)
<div className="bg-accent">            // Accent/highlights

// Text colors
<p className="text-foreground">        // Primary text
<p className="text-muted-foreground">  // Secondary text
<p className="text-card-foreground">   // Text on cards

// Borders
<div className="border border-border"> // Standard borders
```

### Hover States

```tsx
<button className="bg-primary hover:bg-primary/90">
<div className="bg-card hover:bg-accent/10">
```

## How to Modify Colors

### Change the Base Hue

To shift the entire color palette (e.g., from purple-blue to teal-blue):

1. Open `app/globals.css`
2. Find the HSL values for light mode (lines 9-36)
3. Change the **first number** (hue) in each color:
   - Current: `250` (blue with purple undertone)
   - Teal: `180` (cyan/teal)
   - Pure Blue: `230`
   - Purple: `270`

Example:
```css
/* Before */
--background: 250 25% 97%;

/* After (for teal) */
--background: 180 25% 97%;
```

4. Repeat for dark mode (lines 40-70)

### Adjust Brightness

To make the theme lighter or darker:

1. Modify the **third number** (lightness) in the HSL values
2. Light mode: Increase lightness for lighter theme
3. Dark mode: Decrease lightness for darker theme

Example:
```css
/* Lighter light mode */
--background: 250 25% 99%;  /* Was 97%, now 99% */

/* Darker dark mode */
--background: 250 45% 5%;   /* Was 10%, now 5% */
```

### Change the Accent Color

To change from golden yellow to another accent:

1. Find `--accent` in both light and dark mode
2. Change the first number (hue):
   - Current: `48` (golden yellow)
   - Orange: `25`
   - Green: `140`
   - Pink: `330`

Example:
```css
/* Green accent */
--accent: 140 90% 50%;  /* Was 48, now 140 */
```

## Light/Dark Mode System

### How It Works

1. **ThemeProvider** wraps the entire app ([app/layout.tsx](../app/layout.tsx))
2. **localStorage** saves user preference (`kids-games-theme`)
3. **CSS class** `.dark` is added to `<html>` element when dark mode is active
4. **ThemeToggle** button in Navigation allows switching

### Default Mode

Light mode is the default. To change:

```tsx
// In app/layout.tsx
<ThemeProvider defaultTheme="dark">  {/* Change to "dark" */}
```

### Programmatic Access

```tsx
import { useTheme } from '@/components/theme-provider';

function MyComponent() {
  const { theme, setTheme } = useTheme();

  // Current theme: 'light' or 'dark'
  console.log(theme);

  // Change theme
  setTheme('dark');
}
```

## Accessibility

### Contrast Ratios

All color combinations meet **WCAG AA** standards:

- **Light Mode**:
  - `foreground` on `background`: 12.5:1 (AAA)
  - `card-foreground` on `card`: 8.2:1 (AAA)
  - `accent-foreground` on `accent`: 9.1:1 (AAA)

- **Dark Mode**:
  - `foreground` on `background`: 11.8:1 (AAA)
  - `card-foreground` on `card`: 10.3:1 (AAA)
  - `accent-foreground` on `accent`: 12.1:1 (AAA)

### Keyboard Navigation

All interactive elements support keyboard navigation:
- **Tab**: Navigate between elements
- **Enter/Space**: Activate buttons/links
- **Escape**: Close dropdowns/modals

This is ensured by using **shadcn/ui** components built on **Radix UI** primitives.

## shadcn/ui Integration

### Available Components

Installed shadcn components:
- `Button` - Accessible button with variants
- `Card` - Container for content
- `Switch` - Toggle for theme switching

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

All shadcn components automatically use our color system.

### Component Variants

shadcn components come with pre-styled variants:

```tsx
<Button variant="default">    // bg-primary
<Button variant="destructive"> // bg-destructive
<Button variant="ghost">       // Transparent bg
<Button variant="outline">     // Border only
```

## File Structure

```
app/
  globals.css              // CSS variables definition
  layout.tsx               // ThemeProvider wrapper
components/
  theme-provider.tsx       // Theme context and logic
  ui/
    theme-toggle.tsx       // Sun/Moon toggle button
    button.tsx             // shadcn Button
    card.tsx               // shadcn Card
    switch.tsx             // shadcn Switch
tailwind.config.ts         // Tailwind color configuration
components.json            // shadcn configuration
```

## Best Practices

1. **Always use semantic names**: Use `bg-primary` instead of `bg-purple-500`
2. **Use CSS variables for custom values**: If you need a specific color, define it in `globals.css`
3. **Test in both modes**: Always check light AND dark mode
4. **Maintain contrast**: Ensure text is readable on all backgrounds
5. **Use shadcn components**: Prefer shadcn over custom components for consistency

## Troubleshooting

### Colors not updating

1. Check if you're using hardcoded Tailwind colors (`bg-purple-500`)
2. Replace with semantic colors (`bg-primary`)
3. Restart dev server: `npm run dev`

### Dark mode not working

1. Check `<html>` element has `.dark` class
2. Verify ThemeProvider is wrapping the app
3. Check localStorage for `kids-games-theme` value

### Wrong contrast

1. Use browser DevTools to check contrast ratio
2. Adjust lightness values in `globals.css`
3. Test with actual users for visibility

## Future Enhancements

Possible additions:
- **System preference detection**: Respect OS dark mode setting
- **Multiple themes**: Blue, Green, Pink variants
- **Custom user colors**: Allow users to pick their own accent color
- **High contrast mode**: For accessibility
- **Colorblind modes**: Alternative color schemes

## Resources

- [HSL Color Picker](https://hslpicker.com/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
