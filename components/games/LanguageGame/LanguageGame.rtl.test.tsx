import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import LanguageGame from './index';
import { hebrewLanguage, englishLanguage, russianLanguage, arabicLanguage } from '@/data/languages';
import heMessages from '@/i18n/messages/he.json';
import enMessages from '@/i18n/messages/en.json';
import arMessages from '@/i18n/messages/ar.json';
import ruMessages from '@/i18n/messages/ru.json';

// Mock the routing
vi.mock('@/i18n/routing', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Mock speech synthesis
vi.mock('@/hooks/useSpeechSynthesis', () => ({
  useSpeechSynthesis: () => ({
    speak: vi.fn(),
    speaking: false,
  }),
}));

describe('LanguageGame RTL and Language Directionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('HTML lang and dir attributes', () => {
    it('should NOT set lang or dir attributes on main container', () => {
      const { container } = render(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={hebrewLanguage} />
        </NextIntlClientProvider>
      );

      const mainContainer = container.querySelector('.min-h-screen');
      expect(mainContainer).not.toHaveAttribute('lang');
      expect(mainContainer).not.toHaveAttribute('dir');
    });

    it('should set lang and dir attributes on LetterGrid for Hebrew game', () => {
      const { container } = render(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={hebrewLanguage} />
        </NextIntlClientProvider>
      );

      // LetterGrid container
      const letterGrid = container.querySelector('.grid');
      expect(letterGrid).toHaveAttribute('lang', 'he');
      expect(letterGrid).toHaveAttribute('dir', 'rtl');
    });

    it('should set lang and dir attributes on LetterGrid for English game', () => {
      const { container } = render(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={englishLanguage} />
        </NextIntlClientProvider>
      );

      const letterGrid = container.querySelector('.grid');
      expect(letterGrid).toHaveAttribute('lang', 'en');
      expect(letterGrid).toHaveAttribute('dir', 'ltr');
    });

    it('should set lang and dir attributes on LetterGrid for Russian game', () => {
      const { container } = render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={russianLanguage} />
        </NextIntlClientProvider>
      );

      const letterGrid = container.querySelector('.grid');
      expect(letterGrid).toHaveAttribute('lang', 'ru');
      expect(letterGrid).toHaveAttribute('dir', 'ltr');
    });

    it('should set lang and dir attributes on LetterGrid for Arabic game', () => {
      const { container } = render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={arabicLanguage} />
        </NextIntlClientProvider>
      );

      const letterGrid = container.querySelector('.grid');
      expect(letterGrid).toHaveAttribute('lang', 'ar');
      expect(letterGrid).toHaveAttribute('dir', 'rtl');
    });
  });

  describe('UI Locale vs Game Locale separation', () => {
    it('should display UI in Hebrew while teaching English letters (RTL UI + LTR game)', () => {
      const { container } = render(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={englishLanguage} />
        </NextIntlClientProvider>
      );

      // UI should be in Hebrew
      expect(screen.getByText('משחק אנגלית')).toBeInTheDocument();
      expect(screen.getByText('למידה')).toBeInTheDocument();
      expect(screen.getByText('לחצו על אות כדי לשמוע את שמה')).toBeInTheDocument();

      // Game content should be LTR
      const letterGrid = container.querySelector('.grid');
      expect(letterGrid).toHaveAttribute('dir', 'ltr');
      expect(letterGrid).toHaveAttribute('lang', 'en');
    });

    it('should display UI in English while teaching Hebrew letters (LTR UI + RTL game)', () => {
      const { container } = render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={hebrewLanguage} />
        </NextIntlClientProvider>
      );

      // UI should be in English
      expect(screen.getByText('Hebrew Game')).toBeInTheDocument();
      expect(screen.getByText('Learn')).toBeInTheDocument();
      expect(screen.getByText('Click on a letter to hear its name')).toBeInTheDocument();

      // Game content should be RTL
      const letterGrid = container.querySelector('.grid');
      expect(letterGrid).toHaveAttribute('dir', 'rtl');
      expect(letterGrid).toHaveAttribute('lang', 'he');
    });

    it('should display UI in Arabic while teaching English letters (RTL UI + LTR game)', () => {
      const { container } = render(
        <NextIntlClientProvider locale="ar" messages={arMessages}>
          <LanguageGame languageConfig={englishLanguage} />
        </NextIntlClientProvider>
      );

      // UI should be in Arabic
      expect(screen.getByText('لعبة الإنجليزية')).toBeInTheDocument();
      expect(screen.getByText('التعلم')).toBeInTheDocument();

      // Game content should be LTR
      const letterGrid = container.querySelector('.grid');
      expect(letterGrid).toHaveAttribute('dir', 'ltr');
      expect(letterGrid).toHaveAttribute('lang', 'en');
    });

    it('should display UI in English while teaching Russian letters (LTR UI + LTR game)', () => {
      const { container } = render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={russianLanguage} />
        </NextIntlClientProvider>
      );

      // UI should be in English
      expect(screen.getByText('Russian Game')).toBeInTheDocument();
      expect(screen.getByText('Learn')).toBeInTheDocument();

      // Game content should be LTR but in Russian
      const letterGrid = container.querySelector('.grid');
      expect(letterGrid).toHaveAttribute('dir', 'ltr');
      expect(letterGrid).toHaveAttribute('lang', 'ru');
    });
  });

  describe('Translation key resolution', () => {
    it('should resolve game title translation for all game types in Hebrew', () => {
      const { rerender } = render(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={hebrewLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('משחק עברית')).toBeInTheDocument();

      rerender(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={englishLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('משחק אנגלית')).toBeInTheDocument();

      rerender(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={russianLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('משחק רוסית')).toBeInTheDocument();

      rerender(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={arabicLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('משחק ערבית')).toBeInTheDocument();
    });

    it('should resolve game title translation for all game types in English', () => {
      const { rerender } = render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={hebrewLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('Hebrew Game')).toBeInTheDocument();

      rerender(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={englishLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('English Game')).toBeInTheDocument();

      rerender(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={russianLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('Russian Game')).toBeInTheDocument();

      rerender(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={arabicLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('Arabic Game')).toBeInTheDocument();
    });

    it('should resolve game title translation for all game types in Russian', () => {
      const { rerender } = render(
        <NextIntlClientProvider locale="ru" messages={ruMessages}>
          <LanguageGame languageConfig={hebrewLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('Игра Иврит')).toBeInTheDocument();

      rerender(
        <NextIntlClientProvider locale="ru" messages={ruMessages}>
          <LanguageGame languageConfig={englishLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('Игра Английский')).toBeInTheDocument();
    });

    it('should resolve UI instructions in correct locale regardless of game language', () => {
      const { rerender } = render(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={englishLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('לחצו על אות כדי לשמוע את שמה')).toBeInTheDocument();

      rerender(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={hebrewLanguage} />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('Click on a letter to hear its name')).toBeInTheDocument();
    });
  });

  describe('Mode buttons and UI elements', () => {
    it('should render mode selector buttons with correct translations', () => {
      render(
        <NextIntlClientProvider locale="he" messages={heMessages}>
          <LanguageGame languageConfig={englishLanguage} />
        </NextIntlClientProvider>
      );

      // Check that mode buttons are rendered with Hebrew translations
      expect(screen.getByText('למידה')).toBeInTheDocument(); // Learn
      expect(screen.getByText('מצא את האות')).toBeInTheDocument(); // Find
      expect(screen.getByText('ערבב אותיות')).toBeInTheDocument(); // Shuffle
    });

    it('should render back button with correct translation', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageGame languageConfig={hebrewLanguage} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('Back')).toBeInTheDocument();
    });
  });
});
