import { useTranslations } from 'next-intl';
import { Difficulty } from '@/hooks/useTicTacToe';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ difficulty, onDifficultyChange }: DifficultySelectorProps) {
  const t = useTranslations('ticTacToe');

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <label className="text-lg md:text-xl font-bold text-gray-800">
          {t('difficulty')}
        </label>
      </div>
      <div className="flex gap-3 justify-center flex-wrap">
        {difficulties.map((level) => (
          <button
            key={level}
            onClick={() => onDifficultyChange(level)}
            className={`
              px-6 py-3 rounded-xl font-bold text-base md:text-lg
              border-2 transition-all
              ${difficulty === level
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-500'
                : 'bg-white text-gray-600 border-gray-300 hover:border-purple-500 hover:text-purple-500'
              }
            `}
          >
            {t(level)}
          </button>
        ))}
      </div>
    </div>
  );
}
