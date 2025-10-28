# Pre-Deployment Testing Checklist

Complete this checklist before deploying to production.

**Test URL**: http://localhost:3000

---

## ✅ Home Page Tests

### Navigation & Localization
- [ ] Home page loads at `/he` (Hebrew - default)
- [ ] Can navigate to `/en` (English UI)
- [ ] Can navigate to `/ru` (Russian UI)
- [ ] Can navigate to `/ar` (Arabic UI)
- [ ] Hebrew/Arabic pages show RTL layout
- [ ] English/Russian pages show LTR layout
- [ ] All game cards are visible and styled correctly
- [ ] "Coming Soon" cards appear for inactive games

### Navigation Bar
- [ ] Navigation bar appears on all pages
- [ ] "Home" button navigates back to home
- [ ] "Help" button navigates to help page
- [ ] Navigation bar is sticky/fixed at top

---

## ✅ Language Games Tests (Test ALL 4 games)

### Hebrew Game (`/he/game/hebrew`)
- [ ] Game loads without errors
- [ ] All 31 Hebrew letters display correctly
- [ ] Letters are colorful and properly styled
- [ ] Back button returns to home page

#### Learn Mode
- [ ] Click any letter - hear Hebrew pronunciation
- [ ] Click multiple letters - each speaks correctly
- [ ] Letters have visual feedback on click

#### Find Mode
- [ ] Switch to "Find" mode
- [ ] Hear letter announcement immediately
- [ ] Target letter shown in instruction (e.g., "מצא את האות כ")
- [ ] Click correct letter - see green border + celebration animation
- [ ] Click wrong letter - see red border + shake animation
- [ ] Score updates correctly (✓ count increases for correct)
- [ ] Score updates correctly (✗ count increases for wrong)
- [ ] New challenge appears after correct answer
- [ ] Speech announces new letter for each challenge

#### Shuffle Mode
- [ ] Click shuffle button
- [ ] Letters rearrange in random order
- [ ] Click shuffle again - letters return to original order
- [ ] Shuffle works in both Learn and Find modes

#### Drawing Canvas
- [ ] Drawing canvas visible at bottom
- [ ] Can draw with mouse/touch
- [ ] Color picker changes drawing color
- [ ] Brush size slider works
- [ ] Clear button erases canvas
- [ ] Save button downloads image

### English Game (`/he/game/english`)
- [ ] All 26 English letters display (Aa, Bb, Cc...)
- [ ] Both uppercase and lowercase shown
- [ ] Learn mode speaks letter names clearly
- [ ] Find mode works with correct/wrong feedback
- [ ] Speech uses English voice (not Hebrew)

### Russian Game (`/he/game/russian`)
- [ ] All 33 Russian letters display (Аа, Бб, Вв...)
- [ ] Cyrillic characters render correctly
- [ ] Both cases shown
- [ ] Speech uses Russian/phonetic pronunciation
- [ ] All modes work correctly

### Arabic Game (`/he/game/arabic`)
- [ ] All 28 Arabic letters display
- [ ] Arabic script renders correctly (RTL)
- [ ] Speech uses Arabic voice
- [ ] All modes work correctly

---

## ✅ Tic-Tac-Toe Game (`/he/game/tic-tac-toe`)

### Basic Gameplay
- [ ] Game board loads (3x3 grid)
- [ ] You are X, Computer is O
- [ ] Click any cell to place X
- [ ] Computer responds with O after 500ms delay
- [ ] Can't click occupied cells
- [ ] Status message updates ("Your turn", "Computer's turn")

### Win/Lose/Tie Detection
- [ ] Win: Get 3 in a row (horizontal/vertical/diagonal)
- [ ] Win: See celebration message "כל הכבוד! ניצחת!"
- [ ] Win: Winning cells highlighted in yellow
- [ ] Win: Player score increases
- [ ] Lose: Computer gets 3 in a row
- [ ] Lose: See message "המחשב ניצח"
- [ ] Lose: Computer score increases
- [ ] Tie: All cells filled, no winner
- [ ] Tie: See message "תיקו! משחק טוב!"
- [ ] Tie: Tie score increases

### Controls
- [ ] "New Game" button resets board
- [ ] "Reset Score" button clears all scores
- [ ] Scores persist across games (until reset)

### Difficulty Levels
- [ ] Easy: Computer makes random moves (easier to win)
- [ ] Medium: Mix of smart and random moves
- [ ] Hard: Computer plays strategically (hard to win)
- [ ] Changing difficulty starts new game
- [ ] Selected difficulty is highlighted

---

## ✅ Help Page (`/he/help`)

### Content
- [ ] Page loads without errors
- [ ] FAQ section displays 3 questions:
  1. Sound issues
  2. Android setup
  3. PWA installation
- [ ] Contact section shows email
- [ ] "Send Email" button opens email client
- [ ] "Back to Home" button works

### Localization (Test all 4 languages)
- [ ] `/he/help` - Hebrew content
- [ ] `/en/help` - English content
- [ ] `/ru/help` - Russian content
- [ ] `/ar/help` - Arabic content

---

## ✅ Cross-Browser Testing

Test in multiple browsers (if available):
- [ ] Chrome/Brave
- [ ] Safari (Mac)
- [ ] Firefox
- [ ] Edge

---

## ✅ Mobile Responsiveness

### Desktop (resize browser window)
- [ ] Looks good at 1920px width
- [ ] Looks good at 1366px width (laptop)
- [ ] Looks good at 1024px width (tablet)

### Mobile (resize to mobile or use DevTools)
- [ ] Looks good at 768px (tablet portrait)
- [ ] Looks good at 414px (large phone)
- [ ] Looks good at 375px (iPhone)
- [ ] Navigation is usable
- [ ] Game cards stack properly
- [ ] Letter grids adjust (4 columns on mobile vs 5 on desktop)
- [ ] Drawing canvas works with touch
- [ ] All buttons are tappable

---

## ✅ Console Errors

- [ ] Open DevTools Console (F12)
- [ ] Navigate through all pages
- [ ] Play all games
- [ ] **No red errors should appear**
- [ ] Yellow warnings are OK (from browser extensions)

---

## ✅ Performance

- [ ] Pages load quickly (under 2 seconds)
- [ ] Smooth animations (letter clicks, celebrations)
- [ ] No lag when clicking letters rapidly
- [ ] Speech doesn't delay or stutter

---

## ✅ Speech Synthesis

### Voice Quality
- [ ] Hebrew game uses Hebrew voice
- [ ] English game uses English voice
- [ ] Russian game uses Russian/phonetic voice
- [ ] Arabic game uses Arabic voice
- [ ] All pronunciations are clear and understandable

### Timing
- [ ] Learn mode: Immediate speech on letter click
- [ ] Find mode: Letter announced immediately when mode starts
- [ ] Find mode: New letter announced after correct answer
- [ ] No delay or lag between action and speech
- [ ] Speech matches visual (no speaking wrong letter)

---

## 🎯 Critical Path Test (Complete Flow)

**Hebrew User Journey:**
1. [ ] Open home page (`/he`)
2. [ ] Click on Hebrew game card
3. [ ] Play in Learn mode - click 5 letters
4. [ ] Switch to Find mode - complete 3 challenges
5. [ ] Use shuffle feature
6. [ ] Draw something on canvas
7. [ ] Click Back button
8. [ ] Click on Tic-Tac-Toe
9. [ ] Play a complete game
10. [ ] Click Help in navigation
11. [ ] Read FAQ
12. [ ] Return to home

**English User Journey:**
1. [ ] Change locale to `/en`
2. [ ] UI shows English text
3. [ ] Play English game
4. [ ] Speech uses English voice
5. [ ] All features work

---

## 📊 Test Results Summary

**Total Tests**: ~100+
**Passed**: ___
**Failed**: ___
**Critical Issues**: ___

### Issues Found:
1.
2.
3.

### Notes:


---

**Testing completed by**: _______________
**Date**: _______________
**Ready for deployment**: [ ] Yes [ ] No
