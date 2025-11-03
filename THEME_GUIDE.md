# Theme System Guide

This document outlines the theming system for the Kids Games application and provides guidelines for maintaining consistent dark/light mode support.

## 🎨 Theme Philosophy

Our application uses a **theme-aware color system** that automatically adapts to dark and light modes. **Never use hardcoded Tailwind colors** (like `bg-blue-500`, `text-red-600`) as they don't adapt to theme changes.

## ✅ Available Theme Colors

### Core Colors
Use these for the main UI elements:

| Color Variable | Usage | Example Classes |
|---------------|-------|-----------------|
| `background` | Main background | `bg-background` |
| `foreground` | Main text | `text-foreground` |
| `card` | Card backgrounds | `bg-card`, `text-card-foreground` |
| `primary` | Primary actions/buttons | `bg-primary`, `text-primary-foreground` |
| `secondary` | Secondary elements | `bg-secondary`, `text-secondary-foreground` |
| `muted` | Subtle backgrounds | `bg-muted`, `text-muted-foreground` |
| `accent` | Highlighted elements | `bg-accent`, `text-accent`, `hover:text-accent` |
| `border` | Borders | `border`, `border-border` |
| `input` | Input fields | `border-input` |
| `ring` | Focus rings | `focus:border-ring` |

### Semantic Colors
Use these for specific meanings:

| Color Variable | Usage | Example Classes |
|---------------|-------|-----------------|
| `success` | Success states, easy difficulty | `bg-success`, `text-success-foreground` |
| `warning` | Warning states, medium difficulty | `bg-warning`, `text-warning-foreground` |
| `info` | Informational messages | `bg-info`, `text-info-foreground` |
| `destructive` | Errors, hard difficulty, delete actions | `bg-destructive`, `text-destructive-foreground` |

## 📋 Common Patterns

### Containers and Cards
```tsx
// ✅ Good
<div className="bg-background">
  <div className="bg-card rounded-3xl p-8 border-4 border-border">
    <h1 className="text-foreground">Title</h1>
    <p className="text-muted-foreground">Subtitle</p>
  </div>
</div>

// ❌ Bad
<div className="bg-gray-100">
  <div className="bg-white rounded-3xl p-8 border-4 border-gray-300">
    <h1 className="text-gray-900">Title</h1>
    <p className="text-gray-600">Subtitle</p>
  </div>
</div>
```

### Buttons
```tsx
// ✅ Primary Button
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click Me
</button>

// ✅ Secondary Button
<button className="bg-card text-card-foreground hover:text-accent border-2 border-border">
  Cancel
</button>

// ✅ Destructive Button
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete
</button>

// ❌ Bad
<button className="bg-blue-500 text-white hover:bg-blue-600">
  Click Me
</button>
```

### Difficulty Levels
```tsx
// ✅ Good - Uses semantic colors
const difficulties = [
  { level: 'easy', color: 'bg-success text-success-foreground' },
  { level: 'medium', color: 'bg-warning text-warning-foreground' },
  { level: 'hard', color: 'bg-destructive text-destructive-foreground' }
];

// ❌ Bad - Hardcoded colors
const difficulties = [
  { level: 'easy', color: 'bg-green-500 text-white' },
  { level: 'medium', color: 'bg-yellow-500 text-white' },
  { level: 'hard', color: 'bg-red-500 text-white' }
];
```

### Feedback Messages
```tsx
// ✅ Good
{isCorrect ? (
  <div className="text-success">Correct!</div>
) : (
  <div className="text-destructive">Wrong answer</div>
)}

// ❌ Bad
{isCorrect ? (
  <div className="text-green-600">Correct!</div>
) : (
  <div className="text-red-600">Wrong answer</div>
)}
```

## 🚫 Exceptions

There are very few cases where hardcoded colors are acceptable:

1. **Canvas drawing surfaces** - May need `bg-white` for the actual drawing area
2. **SVG/Canvas context colors** - Drawing operations (fillStyle, strokeStyle) may need specific colors
3. **External library requirements** - Some third-party components may require specific color values

If you think you need an exception, **ask first** and document why in the code.

## 🧪 Testing

We have automated tests to prevent hardcoded colors:

```bash
# Run the hardcoded colors test
npm run test:run -- __tests__/hardcoded-colors.test.tsx
```

This test will fail if:
- You use Tailwind color classes with numbers (e.g., `bg-blue-500`)
- You use hex colors in className (e.g., `#3B82F6`)
- You use RGB/HSL colors in className

## 🎯 Quick Reference

### DO ✅
- Use `bg-background` instead of `bg-white` or `bg-gray-100`
- Use `text-foreground` instead of `text-black` or `text-gray-900`
- Use `bg-card` for card backgrounds
- Use semantic colors (`success`, `warning`, `destructive`) for meaningful states
- Use opacity modifiers for hover states (e.g., `hover:bg-primary/90`)

### DON'T ❌
- Use color classes with numbers (`bg-blue-500`, `text-red-600`)
- Use `bg-white` except for canvas surfaces
- Use hex colors in className
- Mix hardcoded and theme colors

## 🔧 Customizing the Theme

To add new theme colors:

1. **Update `app/globals.css`** - Add CSS variables for both light and dark modes
2. **Update `tailwind.config.ts`** - Add the color to the Tailwind configuration
3. **Update `__tests__/hardcoded-colors.test.tsx`** - Add to ALLOWED_COLOR_CLASSES if needed
4. **Document** - Add to this guide

## 📚 Additional Resources

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- Our automated test: `__tests__/hardcoded-colors.test.tsx`
