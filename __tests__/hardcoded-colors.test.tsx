import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Test suite to ensure no hardcoded colors are used in components.
 * This enforces the use of theme-aware color classes for proper dark mode support.
 */

// List of allowed theme-aware color classes
const ALLOWED_COLOR_CLASSES = [
  // Background colors
  'bg-background',
  'bg-foreground',
  'bg-card',
  'bg-card-foreground',
  'bg-popover',
  'bg-popover-foreground',
  'bg-primary',
  'bg-primary-foreground',
  'bg-secondary',
  'bg-secondary-foreground',
  'bg-muted',
  'bg-muted-foreground',
  'bg-accent',
  'bg-accent-foreground',
  'bg-destructive',
  'bg-destructive-foreground',
  'bg-success',
  'bg-success-foreground',
  'bg-warning',
  'bg-warning-foreground',
  'bg-info',
  'bg-info-foreground',

  // Text colors
  'text-background',
  'text-foreground',
  'text-card',
  'text-card-foreground',
  'text-popover',
  'text-popover-foreground',
  'text-primary',
  'text-primary-foreground',
  'text-secondary',
  'text-secondary-foreground',
  'text-muted',
  'text-muted-foreground',
  'text-accent',
  'text-accent-foreground',
  'text-destructive',
  'text-destructive-foreground',
  'text-success',
  'text-success-foreground',
  'text-warning',
  'text-warning-foreground',
  'text-info',
  'text-info-foreground',

  // Border colors
  'border',
  'border-background',
  'border-foreground',
  'border-card',
  'border-card-foreground',
  'border-popover',
  'border-popover-foreground',
  'border-primary',
  'border-primary-foreground',
  'border-secondary',
  'border-secondary-foreground',
  'border-muted',
  'border-muted-foreground',
  'border-accent',
  'border-accent-foreground',
  'border-destructive',
  'border-destructive-foreground',
  'border-success',
  'border-success-foreground',
  'border-warning',
  'border-warning-foreground',
  'border-info',
  'border-info-foreground',

  // Ring colors
  'ring-background',
  'ring-foreground',
  'ring-primary',
  'ring-secondary',
  'ring-accent',
  'ring-destructive',

  // Hover states (with opacity)
  'hover:bg-primary/90',
  'hover:bg-secondary/90',
  'hover:bg-destructive/90',
  'hover:bg-success/90',
  'hover:bg-warning/90',
  'hover:bg-info/90',
  'hover:bg-accent',
  'hover:text-foreground',
  'hover:text-primary',
  'hover:text-accent',
  'hover:border-primary',

  // Canvas/drawing specific - white is needed for actual drawing surface
  'bg-white',
];

// Patterns to detect hardcoded colors
const HARDCODED_COLOR_PATTERNS = [
  // Tailwind color classes with numbers (e.g., bg-blue-500, text-red-600)
  /(?:bg|text|border|ring|from|to|via)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}/g,

  // Hex colors in inline styles or className strings
  /#[0-9a-fA-F]{3,8}/g,

  // RGB/RGBA colors
  /rgba?\([^)]+\)/g,

  // HSL/HSLA colors
  /hsla?\([^)]+\)/g,
];

// Exceptions: patterns that are allowed despite matching the hardcoded color patterns
const EXCEPTIONS = [
  // Keep green/red for score indicators (semantic meaning)
  'text-green-600',
  'text-red-600',

  // SVG and canvas contexts may need specific colors
  /ctx\./,
  /getContext/,
  /fillStyle/,
  /strokeStyle/,

  // CSS custom properties are fine
  /var\(--/,

  // Border width/style classes (not colors)
  /border-\d+/,
  /border-t-\d+/,
  /border-b-\d+/,
  /border-l-\d+/,
  /border-r-\d+/,

  // Meta tags for browser UI (theme-color is for browser chrome, not app content)
  /theme-color/,
];

function isException(match: string, fullLine: string): boolean {
  // Check if the match is in the exceptions list
  if (EXCEPTIONS.some(exception => {
    if (typeof exception === 'string') {
      return match === exception;
    } else if (exception instanceof RegExp) {
      return exception.test(fullLine);
    }
    return false;
  })) {
    return true;
  }

  // Check if it's a border width class
  if (/^border-[tlbr]?-\d+$/.test(match)) {
    return true;
  }

  return false;
}

function findHardcodedColors(filePath: string): Array<{ line: number; match: string; context: string }> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations: Array<{ line: number; match: string; context: string }> = [];

  lines.forEach((line, index) => {
    HARDCODED_COLOR_PATTERNS.forEach(pattern => {
      const matches = line.match(pattern);
      if (matches) {
        matches.forEach(match => {
          if (!isException(match, line)) {
            violations.push({
              line: index + 1,
              match,
              context: line.trim()
            });
          }
        });
      }
    });
  });

  return violations;
}

function getComponentFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .next, and test directories
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('__tests__')) {
        getComponentFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // Skip test files
      if (!file.includes('.test.') && !file.includes('.spec.')) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

describe('Hardcoded Colors Detection', () => {
  const componentsDir = path.join(process.cwd(), 'components');
  const appDir = path.join(process.cwd(), 'app');

  const componentFiles = [
    ...getComponentFiles(componentsDir),
    ...getComponentFiles(appDir)
  ];

  describe('Game Components', () => {
    const gameFiles = componentFiles.filter(file => file.includes('components/games'));

    gameFiles.forEach(filePath => {
      const relativePath = path.relative(process.cwd(), filePath);

      it(`${relativePath} should not contain hardcoded colors`, () => {
        const violations = findHardcodedColors(filePath);

        if (violations.length > 0) {
          const errorMessage = violations.map(v =>
            `  Line ${v.line}: Found "${v.match}" in: ${v.context}`
          ).join('\n');

          throw new Error(
            `Found ${violations.length} hardcoded color(s) in ${relativePath}:\n${errorMessage}\n\n` +
            'Use theme-aware classes instead:\n' +
            '  - bg-card, bg-background, bg-primary, bg-secondary, bg-accent, bg-destructive\n' +
            '  - text-foreground, text-muted-foreground, text-primary-foreground\n' +
            '  - border, border-primary, border-secondary, border-border\n'
          );
        }

        expect(violations).toHaveLength(0);
      });
    });
  });

  describe('Shared Components', () => {
    const sharedFiles = componentFiles.filter(file =>
      file.includes('components/shared') || file.includes('components/ui')
    );

    sharedFiles.forEach(filePath => {
      const relativePath = path.relative(process.cwd(), filePath);

      it(`${relativePath} should not contain hardcoded colors`, () => {
        const violations = findHardcodedColors(filePath);

        if (violations.length > 0) {
          const errorMessage = violations.map(v =>
            `  Line ${v.line}: Found "${v.match}" in: ${v.context}`
          ).join('\n');

          throw new Error(
            `Found ${violations.length} hardcoded color(s) in ${relativePath}:\n${errorMessage}\n\n` +
            'Use theme-aware classes instead!'
          );
        }

        expect(violations).toHaveLength(0);
      });
    });
  });

  describe('App Directory', () => {
    const appFiles = componentFiles.filter(file =>
      file.includes('app/') && !file.includes('components/')
    );

    appFiles.forEach(filePath => {
      const relativePath = path.relative(process.cwd(), filePath);

      it(`${relativePath} should not contain hardcoded colors`, () => {
        const violations = findHardcodedColors(filePath);

        if (violations.length > 0) {
          const errorMessage = violations.map(v =>
            `  Line ${v.line}: Found "${v.match}" in: ${v.context}`
          ).join('\n');

          throw new Error(
            `Found ${violations.length} hardcoded color(s) in ${relativePath}:\n${errorMessage}\n\n` +
            'Use theme-aware classes instead!'
          );
        }

        expect(violations).toHaveLength(0);
      });
    });
  });

  it('should document all allowed theme-aware color classes', () => {
    // This test serves as documentation for allowed color classes
    expect(ALLOWED_COLOR_CLASSES.length).toBeGreaterThan(0);
    expect(ALLOWED_COLOR_CLASSES).toContain('bg-primary');
    expect(ALLOWED_COLOR_CLASSES).toContain('bg-card');
    expect(ALLOWED_COLOR_CLASSES).toContain('text-foreground');
    expect(ALLOWED_COLOR_CLASSES).toContain('border-primary');
  });
});
