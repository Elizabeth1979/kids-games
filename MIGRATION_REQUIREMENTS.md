# Kids Games - React Migration Requirements

**Document Version:** 1.0
**Date:** October 28, 2025
**Author:** Elizabeth Patrick
**Project:** Kids Educational Games Platform

---

## Executive Summary

This document outlines the complete requirements for migrating the Kids Games project from vanilla HTML/JavaScript to a modern React + TypeScript stack with comprehensive testing, internationalization support, and PWA capabilities.

### Goals
- **70% code reduction** (from ~2,700 to ~900 lines)
- **Single reusable component** replaces 4 duplicate language games
- **Full i18n architecture** ready for 4 UI languages (Hebrew, English, Russian, Arabic)
- **60-70% test coverage** with E2E, unit, and accessibility tests
- **PWA support** (installable, offline-capable, native app feel)
- **Dramatically improved maintainability** and scalability

---

## Tech Stack

### Core Technologies
- **React 18** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Build tool (fast, modern)
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library (copies components, no dependency weight)

### Internationalization
- **react-i18next** - i18n framework
- **i18next** - Core i18n library
- **i18next-browser-languagedetector** - Auto-detect user language

### Testing
- **Vitest** - Unit/component test runner (fast, Vite-native)
- **@testing-library/react** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **Playwright** - E2E browser testing
- **@axe-core/playwright** - Accessibility testing

### PWA
- **vite-plugin-pwa** - PWA configuration and service worker generation
- **workbox** - Service worker runtime (via vite-plugin-pwa)

### Deployment
- **Vercel** - Static hosting with automatic deployments
- **GitHub Actions** - CI/CD pipeline

---

## Project Structure

```
kids-games/
├── public/
│   ├── icons/                    # PWA icons (multiple sizes)
│   ├── manifest.json             # PWA manifest
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── layout/               # Header, Footer, Navigation
│   │   ├── games/
│   │   │   ├── LanguageGame/     # Main reusable language game
│   │   │   └── TicTacToe/        # Board game
│   │   └── shared/               # GameCard, ComingSoonCard
│   ├── data/
│   │   ├── languages/            # Letter data per language
│   │   ├── games.ts              # Game configurations
│   │   └── categories.ts         # Category definitions
│   ├── hooks/
│   │   ├── useSpeechSynthesis.ts # Speech API logic
│   │   ├── useGameState.ts       # Game state management
│   │   └── useDrawingCanvas.ts   # Canvas drawing logic
│   ├── i18n/
│   │   ├── config.ts             # i18n setup
│   │   └── locales/              # Translation files (he, en, ru, ar)
│   ├── pages/
│   │   ├── Home.tsx              # Main menu
│   │   ├── GamePage.tsx          # Dynamic game router
│   │   └── Help.tsx              # FAQ/Guidelines
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   └── lib/
│       └── utils.ts              # Utility functions
├── tests/
│   ├── unit/                     # Vitest tests
│   └── e2e/                      # Playwright tests
├── .github/
│   └── workflows/
│       └── ci.yml                # CI/CD pipeline
├── playwright.config.ts
├── vitest.config.ts
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Internationalization (i18n) Strategy

### Phase 1: Hebrew UI with i18n Architecture
- **UI Language:** Hebrew only (with full i18n structure)
- **Content Languages:** Hebrew, English, Russian, Arabic (letters)
- **Architecture:** Ready for 4 UI languages (easy to add translations later)

### Phase 2: Full Multilingual UI
- Add English, Russian, Arabic UI translations
- Estimated effort: 2 hours (just translation work, architecture already done)

### URL Structure
```
/:locale/                          # UI language (he, en, ru, ar)
  ├── /                           # Home page
  ├── /game/:gameId               # Game pages
  └── /help                       # Help page

Examples:
/he/                              # Hebrew UI, all games
/he/game/english                  # Hebrew UI, English letters game
/en/game/hebrew                   # English UI, Hebrew letters game
/ru/game/arabic                   # Russian UI, Arabic letters game
```

### Language Detection
1. URL parameter (e.g., `/ru/`)
2. localStorage (user's previous choice)
3. Browser language (`navigator.language`)
4. Fallback to Hebrew

### Content vs UI Language Separation
- **UI Language:** Interface text (buttons, instructions, feedback)
- **Content Language:** Learning material (letters being taught)
- **Speech Synthesis:** Uses content language (English letters → English voice)

### Translation Files Structure
```
src/i18n/locales/
├── he/
│   ├── common.json          # Navigation, general UI
│   ├── games.json           # Game-specific text
│   ├── help.json            # Help page content
│   └── categories.json      # Category names/descriptions
├── en/                      # Placeholder for Phase 2
├── ru/                      # Placeholder for Phase 2
└── ar/                      # Placeholder for Phase 2
```

---

## Features & Requirements

### Phase 1 Features (Initial Migration)

#### Language Learning Games
**Games:** Hebrew, English, Russian, Arabic alphabet learning

**Game Modes:**
1. **Learn Mode** - Free exploration, click letters to hear pronunciation
2. **Find Mode** - Quiz mode with scoring (find the target letter)
3. **Shuffle Mode** - Randomize letter order

**Features:**
- ✅ Colorful letter grid (responsive: 5 cols desktop, 4 cols mobile)
- ✅ Speech synthesis with intelligent fallback strategies
- ✅ Phonetic pronunciation display
- ✅ Score tracking (correct/wrong counts)
- ✅ Celebration animations on correct answers
- ✅ Drawing canvas with color picker, brush size, clear, save
- ✅ RTL support for Hebrew/Arabic
- ✅ Touch event support (mobile-friendly)
- ✅ Proper `lang` attributes for accessibility

#### Tic-Tac-Toe Game
- ✅ Convert existing vanilla JS to React component
- ✅ Preserve all difficulty levels
- ✅ Maintain current gameplay

#### Home Page
- ✅ Categorized game menu (Languages, Board Games, Math, Brain)
- ✅ Category navigation (smooth scroll)
- ✅ Game cards (active games clickable, coming soon grayed out)
- ✅ Responsive grid layout

#### Help Page
- ✅ FAQ section (speech issues, Android setup, PWA installation)
- ✅ Contact section (email link: el.patrick79@gmail.com)
- ✅ Clear troubleshooting instructions

#### PWA Features
- ✅ Install prompt ("Add to Home Screen")
- ✅ Offline support after first load
- ✅ Native app appearance (standalone mode)
- ✅ App icons (multiple sizes: 192x192, 512x512)
- ✅ Splash screen
- ✅ Works on iOS and Android

### Phase 2 Features (Future)

#### Enhanced Feedback System
- Google Form integration with structured fields
- Voting/upvoting feature for feature requests
- Multiple language support for feedback forms

#### Math Games
- Addition game (multiple difficulty levels)
- Subtraction game (multiple difficulty levels)
- Multiplication tables game (with interactive practice)
- All with proper difficulty progression

#### Brain/Motor Skills Games
- Memory matching game
- Pattern recognition game
- Sorting/categorization games
- Simon Says style games

#### Word Association
- Images paired with letters
- Example words for each letter (A = Apple, etc.)
- Multi-language support (word in content language + UI language translation)

#### Custom Themes
- User-selectable color palettes
- Dark/light mode alternatives
- Save preference to localStorage

#### Full Multilingual UI
- Complete English, Russian, Arabic UI translations
- Language switcher in header/footer
- Preserve user language choice

---

## Testing Strategy

### Testing Approach
- **Test-After for Migration:** Migrate functionality first, then write tests to lock in behavior
- **TDD for New Features:** Write tests first for all future features

### Coverage Goals
- **Phase 1:** 60-70% overall coverage
- **Phase 2:** Expand to 80%+ coverage
- **Critical paths:** 100% coverage (game logic, speech synthesis, scoring)

### Unit Tests (Vitest + React Testing Library)

**What to Test:**
- ✅ `useSpeechSynthesis` hook
  - Voice loading and selection
  - Fallback strategies
  - Language detection
  - Error handling
- ✅ `useGameState` hook
  - Mode switching
  - Score tracking
  - Shuffle functionality
  - Target letter selection
- ✅ `useDrawingCanvas` hook
  - Drawing operations
  - Color/size changes
  - Clear/download functions
- ✅ Letter Grid component
  - Rendering all letters
  - Click handling
  - Correct/wrong animations
- ✅ Score Box component
  - Score updates
  - Show/hide logic

**Coverage Target:** 60-70%

### E2E Tests (Playwright)

**Critical User Flows:**
- ✅ Navigate to game from home page
- ✅ Play in Learn mode (click letters, hear speech)
- ✅ Play in Find mode (complete quiz, track score)
- ✅ Use drawing canvas (draw, clear, save)
- ✅ Switch between game modes
- ✅ Shuffle letters
- ✅ Navigate to Help page
- ✅ Click email link

**Accessibility Tests:**
- ✅ No accessibility violations (axe-core)
- ✅ Correct `lang` attributes (UI vs content)
- ✅ Correct `dir` attributes (RTL vs LTR)
- ✅ Keyboard navigation works
- ✅ Screen reader compatible

**Visual Regression Tests:**
- ✅ Home page (desktop + mobile)
- ✅ Language game page (desktop + mobile)
- ✅ Find mode active
- ✅ Help page

**Browser/Device Coverage:**
- Desktop: Chrome, Firefox, Safari
- Mobile: iOS Safari, Android Chrome

### CI/CD Pipeline

**On Every Commit (Pre-commit Hook):**
- Run fast unit tests
- Run linter
- Type checking

**On Pull Request (GitHub Actions):**
- Run all unit tests with coverage
- Run all E2E tests
- Run accessibility tests
- Run visual regression tests
- Build project
- Upload test results/coverage

**Before Deployment:**
- All tests must pass
- Build must succeed
- No TypeScript errors

---

## Design System

### Color Palette
- **Primary:** Purple tones (soft, kid-friendly)
- **Approach:** shadcn/ui default theme with colorful accents
- **Letter colors:** Vibrant, varied palette (preserving current aesthetic)
- **Background:** Soft gradients (purple-to-pink, blue-to-purple)

### Typography
- **Headings:** Large, bold, playful
- **Body text:** Clear, readable (high contrast)
- **Letter display:** Very large (3em+), bold

### Responsive Design
- **Mobile breakpoint:** 600px
- **Grid adjustments:**
  - Desktop: 5 columns (letters)
  - Mobile: 4 columns (letters)
- **Touch targets:** Minimum 44x44px (accessibility)

### Animations
- **Letter click:** Scale animation (learn mode)
- **Correct answer:** Bounce animation + border color
- **Wrong answer:** Shake animation + border color
- **Celebration:** Emoji appears and fades
- **Transitions:** Smooth (0.3s)

---

## Data Structure

### Language Configuration

```typescript
interface Letter {
  letter: string;           // The letter character
  name: string;             // Full name in native language
  phonetic: string;         // Phonetic/transliteration
  lowercase?: string;       // Lowercase variant (if applicable)
}

interface LanguageConfig {
  id: string;               // 'hebrew', 'english', etc.
  name: string;             // 'Hebrew', 'English'
  nativeName: string;       // 'עברית', 'English'
  letters: Letter[];        // All letters
  colors: string[];         // Color for each letter
  lang: string;             // BCP 47 code ('he-IL', 'en-US')
  dir: 'rtl' | 'ltr';       // Text direction
  voicePreferences?: string[]; // Preferred voice languages
  fallbackLanguage?: string;   // Fallback for speech
  usePhoneticForSpeech?: boolean; // Use phonetic instead of name
  speechRate?: number;      // Speech speed (0.1-2.0)
  letterDisplayFn?: (letter: Letter) => string; // Custom display
}
```

### Game Configuration

```typescript
interface GameConfig {
  id: string;               // 'hebrew', 'tic-tac-toe', etc.
  title: string;            // Display title (Hebrew)
  icon: string;             // Emoji or text icon
  description: string;      // Short description
  subtitle?: string;        // Additional info
  category: string;         // 'languages', 'board', 'math', 'brain'
  active: boolean;          // Is game playable?
  component?: React.ComponentType; // Game component
}
```

### Category Configuration

```typescript
interface CategoryConfig {
  id: string;               // 'languages', 'board', etc.
  title: string;            // Display title
  icon: string;             // Emoji icon
  description: string;      // Short description
}
```

---

## Accessibility Requirements

### Language Attributes
- ✅ `<html lang="...">` must match UI language
- ✅ Game content must have `lang` attribute matching content language
- ✅ Buttons/UI elements must use UI language `lang` attribute

### Direction Attributes
- ✅ `<html dir="...">` must match UI language direction
- ✅ Game content must have `dir` attribute matching content direction
- ✅ Handle mixed RTL/LTR correctly (Hebrew UI + English content)

### ARIA Attributes
- ✅ Proper roles for interactive elements
- ✅ Aria-labels for icon-only buttons
- ✅ Live regions for score updates and feedback

### Keyboard Navigation
- ✅ All interactive elements keyboard accessible
- ✅ Logical tab order
- ✅ Focus visible indicators

### Color Contrast
- ✅ WCAG AA minimum (4.5:1 for normal text)
- ✅ High contrast for letter boxes
- ✅ Visible focus indicators

### Touch Targets
- ✅ Minimum 44x44px (WCAG AAA)
- ✅ Adequate spacing between targets

---

## Speech Synthesis Requirements

### Voice Selection Strategy
1. Try language-specific voice preferences (if configured)
2. Try base language matching (e.g., 'ar' matches 'ar-SA', 'ar-EG')
3. Try voice name matching (for Arabic: Majed, Hoda, etc.)
4. Fallback to Google voices
5. Fallback to default/first voice

### Fallback for Missing Voices
- If no native voice available, use phonetic pronunciation
- If configured, use fallback language (e.g., Arabic → English phonetics)

### Mobile Support
- **Android:** Multiple retry attempts for voice loading (100ms, 500ms, 1000ms)
- **iOS:** Initialize speech on first user interaction (browser security requirement)
- **Voice loading:** Use `speechSynthesis.onvoiceschanged` event

### Error Handling
- Silent failures (don't crash if speech unavailable)
- Console logging for debugging
- Graceful degradation (game still playable without sound)

---

## PWA Requirements

### Manifest Configuration
```json
{
  "name": "משחקים לילדים - Kids Games",
  "short_name": "משחקים",
  "description": "משחקים חינוכיים לילדים",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "any",
  "dir": "rtl",
  "lang": "he"
}
```

### Icons Required
- ✅ 192x192px (Android home screen)
- ✅ 512x512px (Android splash screen)
- ✅ Apple touch icons (180x180px)
- ✅ Favicon (32x32px, 16x16px)

### Service Worker
- ✅ Cache static assets
- ✅ Cache Google Fonts
- ✅ Network-first for API calls (if any)
- ✅ Auto-update on new version

### Install Prompt
- ✅ Show install button/banner
- ✅ Handle install event
- ✅ Confirm successful installation

### Offline Support
- ✅ Cache all static assets on first load
- ✅ App fully functional offline (after first visit)
- ✅ Show offline indicator if applicable

---

## Deployment Requirements

### Vercel Configuration
- ✅ Automatic deployments on push to main
- ✅ Preview deployments for pull requests
- ✅ SPA routing configuration (all routes → index.html)
- ✅ Security headers (CSP, XSS protection, etc.)

### Environment Variables
- ✅ No secrets required (static site)
- ✅ Build-time environment variables if needed

### Build Optimization
- ✅ Code splitting (React.lazy for routes)
- ✅ Tree shaking (remove unused code)
- ✅ Asset optimization (images, fonts)
- ✅ Minification (JS, CSS)
- ✅ Compression (gzip/brotli)

### Performance Targets
- ✅ First Contentful Paint < 2s
- ✅ Time to Interactive < 3s
- ✅ Lighthouse score > 90 (all categories)

---

## Migration Checklist

### Pre-Migration
- [x] Document all current functionality
- [x] Create comprehensive requirements document
- [x] Plan i18n architecture
- [x] Plan testing strategy
- [x] Get stakeholder approval

### Phase 1: Setup
- [ ] Create `react-migration` git branch
- [ ] Initialize Vite + React + TypeScript
- [ ] Install all dependencies
- [ ] Configure Tailwind CSS
- [ ] Set up shadcn/ui
- [ ] Configure i18n
- [ ] Set up testing infrastructure
- [ ] Configure PWA
- [ ] Create project structure

### Phase 2: Data Migration
- [ ] Migrate language data (Hebrew, English, Russian, Arabic)
- [ ] Migrate games configuration
- [ ] Migrate categories configuration
- [ ] Create TypeScript types/interfaces

### Phase 3: Core Development
- [ ] Implement `useSpeechSynthesis` hook
- [ ] Implement `useGameState` hook
- [ ] Implement `useDrawingCanvas` hook
- [ ] Build Language Game component
- [ ] Build all Language Game subcomponents
- [ ] Convert Tic-Tac-Toe to React
- [ ] Build layout components (Header, Footer)
- [ ] Build shared components (GameCard, etc.)

### Phase 4: Pages & Routing
- [ ] Set up React Router
- [ ] Create Home page
- [ ] Create GamePage (dynamic router)
- [ ] Create Help page
- [ ] Create LocaleLayout wrapper
- [ ] Configure routing

### Phase 5: Testing
- [ ] Write unit tests for hooks
- [ ] Write component tests
- [ ] Write E2E tests (user flows)
- [ ] Write accessibility tests
- [ ] Write visual regression tests
- [ ] Set up CI/CD pipeline
- [ ] Configure pre-commit hooks

### Phase 6: Polish & Deploy
- [ ] Generate PWA icons
- [ ] Test PWA installation (iOS + Android)
- [ ] Test offline functionality
- [ ] Configure Vercel
- [ ] Run full test suite
- [ ] Fix all issues
- [ ] Deploy to Vercel preview
- [ ] User acceptance testing
- [ ] Merge to main
- [ ] Deploy to production

### Post-Migration
- [ ] Monitor for issues
- [ ] Gather user feedback
- [ ] Plan Phase 2 features
- [ ] Update documentation

---

## Success Criteria

### Code Quality
- ✅ 70% code reduction achieved
- ✅ No code duplication for language games
- ✅ TypeScript with no errors
- ✅ Linter passing with no warnings
- ✅ 60-70% test coverage

### Functionality
- ✅ All 4 language games working identically to current version
- ✅ Tic-Tac-Toe working identically to current version
- ✅ Speech synthesis working on desktop and mobile
- ✅ Drawing canvas working with mouse and touch
- ✅ All game modes working correctly
- ✅ Scoring accurate

### Accessibility
- ✅ Zero accessibility violations (axe-core)
- ✅ Keyboard navigation working
- ✅ Screen reader compatible
- ✅ Proper lang/dir attributes
- ✅ WCAG AA compliance

### Performance
- ✅ PWA installs successfully
- ✅ Works offline after installation
- ✅ Fast load times (< 3s interactive)
- ✅ Smooth animations (60fps)
- ✅ Responsive on all devices

### User Experience
- ✅ Maintains current visual aesthetic (colorful, kid-friendly)
- ✅ Intuitive navigation
- ✅ Clear instructions
- ✅ Helpful error messages
- ✅ Working contact/help system

---

## Contact & Support

**Primary Contact:** el.patrick79@gmail.com

**Feedback Channels:**
- Email link on Help page
- GitHub Issues (for bugs/features)
- Future: Embedded feedback form with voting

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-28 | Elizabeth Patrick | Initial requirements document |

---

## Appendix A: Translation Keys Structure

### common.json
```json
{
  "nav": { "home", "help", "feedback" },
  "language": { "switch", "he", "en", "ru", "ar" },
  "footer": { "contact", "email" }
}
```

### games.json
```json
{
  "modes": { "learn", "find", "shuffle" },
  "instructions": { "permanent", "findLetter" },
  "feedback": { "correct", "wrong", "excellent", "tryAgain" },
  "score": { "correct", "wrong" },
  "drawing": { "title", "color", "size", "clear", "save" },
  "shuffle": { "shuffled", "unshuffled" }
}
```

### categories.json
```json
{
  "languages": { "title", "icon", "description" },
  "board": { "title", "icon", "description" },
  "math": { "title", "icon", "description" },
  "brain": { "title", "icon", "description" }
}
```

### help.json
```json
{
  "title",
  "faq": {
    "title",
    "speech": { "question", "answer" },
    "android": { "question", "answer" },
    "install": { "question", "answer" }
  },
  "contact": { "title", "description", "email" }
}
```

---

## Appendix B: File Size Estimates

### Before Migration
- HTML files: ~240 lines
- CSS files: ~1,160 lines
- JavaScript files: ~920 lines
- **Total: ~2,700 lines**

### After Migration
- Components: ~400 lines
- Hooks: ~200 lines
- Data files: ~150 lines
- Pages: ~100 lines
- Config/Types: ~50 lines
- **Total: ~900 lines (67% reduction)**

---

## Appendix C: Browser Support

### Desktop
- ✅ Chrome 90+ (Windows, macOS, Linux)
- ✅ Firefox 88+ (Windows, macOS, Linux)
- ✅ Safari 14+ (macOS)
- ✅ Edge 90+ (Windows, macOS)

### Mobile
- ✅ iOS Safari 14+ (iPhone, iPad)
- ✅ Chrome 90+ (Android)
- ✅ Samsung Internet 14+ (Android)

### Speech Synthesis Support
- Desktop: Excellent (all browsers)
- iOS: Good (limited voices, requires user interaction to init)
- Android: Variable (some devices need voice data downloaded)

---

**End of Requirements Document**
