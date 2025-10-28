'use client';

import { Letter, LanguageConfig } from '@/types';
import LetterBox from './LetterBox';

interface LetterGridProps {
  letters: Letter[];
  languageConfig: LanguageConfig;
  onLetterClick: (letter: Letter) => void;
  correctLetter?: Letter | null;
  wrongLetter?: Letter | null;
}

export default function LetterGrid({
  letters,
  languageConfig,
  onLetterClick,
  correctLetter,
  wrongLetter
}: LetterGridProps) {
  return (
    <div
      className="
        grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3
        bg-white/10 backdrop-blur-sm rounded-3xl p-4 md:p-6 mb-6
      "
      dir={languageConfig.dir}
    >
      {letters.map((letter, index) => (
        <LetterBox
          key={`${letter.letter}-${index}`}
          letter={letter}
          color={languageConfig.colors[index % languageConfig.colors.length]}
          onClick={() => onLetterClick(letter)}
          showBothCases={languageConfig.showBothCases}
          showCorrect={correctLetter?.letter === letter.letter}
          showWrong={wrongLetter?.letter === letter.letter}
        />
      ))}
    </div>
  );
}
