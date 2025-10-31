# Kids Games Project - Development Guidelines

## Project Overview
This is an educational games collection for children, designed to teach Hebrew letters, English letters, and provide fun learning experiences.

## Running the Development Server

### Quick Start (Every Time You Work on This Project)

**Option 1: Use the Start Script (Easiest)**
```bash
./start-dev.sh
```

**Option 2: Manual Command**
```bash
npm run dev
```

**Option 3: Fresh Start (if something's broken)**
```bash
npm run fresh
```

Then open **http://localhost:3000** in your browser.

### Understanding the Development Server

The development server:
- Must be run every time you want to work on the project
- Always runs on port 3000: `http://localhost:3000`
- Auto-reloads when you save files
- Stops when you close the terminal
- Only works on your computer (localhost = your machine only)

**Important**: Keep the terminal window open while working! Closing it stops the server.

For a detailed explanation of how the server works, see [HOW_IT_WORKS.md](HOW_IT_WORKS.md).

## Language & Localization Rules

### Hebrew-First Approach
All games should use **Hebrew** for:
- Page titles and headings
- Instructions and user-facing text
- Button labels
- Game mode descriptions
- Success/error messages
- Any UI text that the user will read

### RTL (Right-to-Left) Support
- All pages should include `dir="rtl"` in the HTML tag
- Hebrew text should flow from right to left naturally
- Maintain RTL layout for buttons and UI elements

### Example Hebrew Phrases for Common UI Elements

#### General UI
- "חזרה" - Back
- "התחל" - Start
- "נסה שוב" - Try Again
- "הבא" - Next
- "קודם" - Previous
- "נקה" - Clear
- "שמור" - Save

#### Game Modes
- "📚 למידה" - Learn
- "🔍 מצא את האות" - Find the Letter
- "🔀 ערבב אותיות" - Shuffle Letters
- "🎮 שחק" - Play

#### Feedback Messages
- "כל הכבוד! נכון!" - Great job! Correct!
- "נסה שוב" - Try again
- "מעולה!" - Excellent!
- "יפה מאוד!" - Very nice!

#### Instructions
- "💡 לחצו על אות כדי לשמוע את שמה" - Click on a letter to hear its name
- "בחרו משחק ותתחילו ללמוד ולהנות!" - Choose a game and start learning and having fun!

## Technical Standards

### File Structure
```
/games/          - Individual game HTML files
/scripts/        - JavaScript files (one per game)
/styles/         - CSS files (common.css + one per game)
```

### Mobile Compatibility
- All games must support touch events
- Text-to-speech must work on mobile devices (iOS and Android)
- Use fallback strategies for voice selection
- Canvas elements must use `touch-action: none`

### Accessibility
- Include phonetic pronunciations for all letters
- Support both visual and audio learning
- Ensure buttons are large enough for children to tap
- Use high contrast colors

### Voice/Speech Synthesis
- Initialize speech on first user interaction
- Load voices with multiple retry attempts for Android
- Provide fallback voice strategies
- Use appropriate language codes (he-IL for Hebrew, en-US for English)

## Game Design Principles

### User Experience
- Colorful, engaging visuals
- Large, easy-to-click buttons
- Immediate audio feedback
- Visual animations for correct/incorrect answers
- Celebration emojis for success

### Learning Modes
Each educational game should include:
1. **Learn Mode** - Free exploration with audio feedback
2. **Quiz/Find Mode** - Interactive challenges with scoring
3. **Shuffle Mode** - Randomized practice

### Drawing Board
- Include a drawing board for letter practice
- Color picker and brush size controls
- Clear and Save functionality
- Touch-friendly canvas

## Code Quality

### JavaScript Standards
- Use ES6+ syntax
- Clear, descriptive variable names
- Comment complex logic
- Handle errors gracefully (silent failures for TTS)
- Initialize resources properly for mobile

### CSS Standards
- Use consistent color schemes
- Responsive design with media queries
- Smooth animations and transitions
- Mobile breakpoints at 600px

### HTML Standards
- Semantic HTML elements
- Proper meta tags for viewport
- Link external stylesheets and scripts
- Use UTF-8 encoding

## Deployment Guidelines

### Pre-Production Checklist
**ALWAYS run the build before pushing to main/production:**

1. Run `npm run build` to verify production build succeeds
2. Fix any TypeScript errors or build failures
3. Only push to main if build is successful
4. This prevents broken deployments to Vercel

### Deployment Workflow
```bash
# 1. Verify build passes
npm run build

# 2. If build succeeds, merge and push
git checkout main
git merge feature-branch
git push origin main
```

## Git Commit Guidelines

### Commit Message Format
```
Brief description (50 chars or less)

Detailed explanation of changes:
- What was changed
- Why it was changed
- Any special considerations

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Adding New Games

When adding a new game:
1. Create HTML file in `/games/` folder
2. Create corresponding CSS in `/styles/` folder
3. Create corresponding JS in `/scripts/` folder
4. Add game card to main `index.html`
5. Use Hebrew for all titles and instructions
6. Include all three learning modes where applicable
7. Test on both desktop and mobile devices
8. Ensure RTL layout is properly implemented

## Testing Checklist

Before committing a new game:
- [ ] Works on desktop browsers (Chrome, Firefox, Safari)
- [ ] Works on mobile devices (iOS and Android)
- [ ] Text-to-speech functions correctly
- [ ] Touch events work properly
- [ ] All text is in Hebrew
- [ ] RTL layout is correct
- [ ] Drawing board saves and clears properly
- [ ] All buttons are responsive
- [ ] Animations are smooth
- [ ] Colors are vibrant and child-friendly

## Future Enhancements

Ideas for future development:
- Colors game (משחק צבעים)
- Animals game (משחק חיות)
- Numbers game (משחק מספרים)
- Shapes game (משחק צורות)
- Progress tracking/scores
- Parental dashboard
- More difficulty levels
