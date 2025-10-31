import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Test suite to ensure no emojis are present in the codebase
 * Emojis can cause rendering issues and accessibility problems
 */

// Comprehensive emoji regex pattern
// Covers most common emoji ranges in Unicode
const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{231A}\u{231B}\u{2328}\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{24C2}\u{25AA}\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2600}-\u{2604}\u{260E}\u{2611}\u{2614}\u{2615}\u{2618}\u{261D}\u{2620}\u{2622}\u{2623}\u{2626}\u{262A}\u{262E}\u{262F}\u{2638}-\u{263A}\u{2640}\u{2642}\u{2648}-\u{2653}\u{265F}\u{2660}\u{2663}\u{2665}\u{2666}\u{2668}\u{267B}\u{267E}\u{267F}\u{2692}-\u{2697}\u{2699}\u{269B}\u{269C}\u{26A0}\u{26A1}\u{26A7}\u{26AA}\u{26AB}\u{26B0}\u{26B1}\u{26BD}\u{26BE}\u{26C4}\u{26C5}\u{26C8}\u{26CE}\u{26CF}\u{26D1}\u{26D3}\u{26D4}\u{26E9}\u{26EA}\u{26F0}-\u{26F5}\u{26F7}-\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}\u{2935}\u{2B05}-\u{2B07}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}]/gu;

// Files and directories to check
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.json'];
const DIRECTORIES_TO_CHECK = [
  'app',
  'components',
  'data',
  'i18n/messages',
  'hooks',
  'lib',
  'types'
];

// Files that are allowed to have emojis (e.g., this test file, documentation)
const ALLOWED_FILES = [
  'tests/no-emojis.test.ts',
  'DEVELOPMENT_GUIDE.md',
  'HOW_IT_WORKS.md',
  'README.md',
  'PROJECT_GUIDELINES.md'
];

interface EmojiMatch {
  file: string;
  line: number;
  content: string;
  emoji: string;
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath: string, baseDir: string = dirPath): string[] {
  const files: string[] = [];
  const items = readdirSync(dirPath);

  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      const ext = item.substring(item.lastIndexOf('.'));
      if (FILE_EXTENSIONS.includes(ext)) {
        // Get relative path from project root
        const relativePath = fullPath.replace(baseDir + '/', '');
        files.push(relativePath);
      }
    }
  }

  return files;
}

/**
 * Check a file for emojis
 */
function checkFileForEmojis(filePath: string): EmojiMatch[] {
  const matches: EmojiMatch[] = [];

  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const emojiMatches = line.match(EMOJI_REGEX);
      if (emojiMatches) {
        emojiMatches.forEach(emoji => {
          matches.push({
            file: filePath,
            line: index + 1,
            content: line.trim(),
            emoji: emoji
          });
        });
      }
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
  }

  return matches;
}

describe('Emoji Detection Tests', () => {
  describe('Source Code Files', () => {
    const projectRoot = process.cwd();
    let allMatches: EmojiMatch[] = [];

    // Collect all files to check
    const filesToCheck: string[] = [];
    DIRECTORIES_TO_CHECK.forEach(dir => {
      const dirPath = join(projectRoot, dir);
      try {
        const files = getAllFiles(dirPath, projectRoot);
        filesToCheck.push(...files);
      } catch (error) {
        console.warn(`Could not scan directory ${dir}:`, error);
      }
    });

    // Check each file
    filesToCheck.forEach(file => {
      const fullPath = join(projectRoot, file);

      // Skip allowed files
      if (ALLOWED_FILES.some(allowed => file.includes(allowed))) {
        return;
      }

      const matches = checkFileForEmojis(fullPath);
      allMatches.push(...matches);
    });

    it('should not contain any emojis in source files', () => {
      if (allMatches.length > 0) {
        const errorMessage = [
          '\n❌ Found emojis in the following files:\n',
          ...allMatches.map(match =>
            `  ${match.file}:${match.line}\n    Emoji: ${match.emoji}\n    Line: ${match.content}\n`
          ),
          `\nTotal emojis found: ${allMatches.length}`
        ].join('\n');

        expect(allMatches, errorMessage).toHaveLength(0);
      } else {
        expect(allMatches).toHaveLength(0);
      }
    });

    it('should have checked at least some files', () => {
      expect(filesToCheck.length).toBeGreaterThan(0);
    });
  });

  describe('Specific Critical Files', () => {
    const projectRoot = process.cwd();

    it('should not have emojis in game data files', () => {
      const gameFiles = [
        'data/games.ts',
        'data/categories.ts'
      ];

      const matches: EmojiMatch[] = [];
      gameFiles.forEach(file => {
        const fullPath = join(projectRoot, file);
        matches.push(...checkFileForEmojis(fullPath));
      });

      expect(matches, 'Game data files should not contain emojis').toHaveLength(0);
    });

    it('should not have emojis in translation files', () => {
      const translationFiles = [
        'i18n/messages/en.json',
        'i18n/messages/he.json',
        'i18n/messages/ru.json',
        'i18n/messages/ar.json'
      ];

      const matches: EmojiMatch[] = [];
      translationFiles.forEach(file => {
        const fullPath = join(projectRoot, file);
        matches.push(...checkFileForEmojis(fullPath));
      });

      expect(matches, 'Translation files should not contain emojis').toHaveLength(0);
    });

    it('should not have emojis in main page components', () => {
      const componentFiles = [
        'app/[locale]/page.tsx',
        'components/games/TicTacToe/index.tsx',
        'components/games/LanguageGame/index.tsx',
        'components/games/LanguageGame/Celebration.tsx'
      ];

      const matches: EmojiMatch[] = [];
      componentFiles.forEach(file => {
        const fullPath = join(projectRoot, file);
        matches.push(...checkFileForEmojis(fullPath));
      });

      expect(matches, 'Main component files should not contain emojis').toHaveLength(0);
    });
  });

  describe('Emoji Regex Pattern Validation', () => {
    it('should detect common emojis', () => {
      const testCases = [
        '🎮',
        '🎨',
        '🎯',
        '⭕',
        '❌',
        '🔥',
        '💡',
        '🌟',
        '✨',
        '🎉'
      ];

      testCases.forEach(emoji => {
        expect(EMOJI_REGEX.test(emoji), `Should detect emoji: ${emoji}`).toBe(true);
      });
    });

    it('should not detect regular text', () => {
      const testCases = [
        'Hello World',
        'משחקים לילדים',
        'ABC',
        'X-O',
        '123',
        '!@#$%'
      ];

      testCases.forEach(text => {
        const regex = new RegExp(EMOJI_REGEX.source, EMOJI_REGEX.flags);
        expect(regex.test(text), `Should not detect regular text: ${text}`).toBe(false);
      });
    });
  });
});
