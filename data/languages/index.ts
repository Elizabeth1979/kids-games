import { hebrewLanguage } from './hebrew';
import { englishLanguage } from './english';
import { russianLanguage } from './russian';
import { arabicLanguage } from './arabic';
import { LanguageConfig } from '@/types';

export const languages: Record<string, LanguageConfig> = {
  hebrew: hebrewLanguage,
  english: englishLanguage,
  russian: russianLanguage,
  arabic: arabicLanguage
};

export const getLanguageById = (id: string): LanguageConfig | undefined => {
  return languages[id];
};

export { hebrewLanguage, englishLanguage, russianLanguage, arabicLanguage };
