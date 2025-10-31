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
    <div className="bg-card rounded-2xl p-6 shadow-lg border">
      <div className="text-center mb-4">
        <label className="text-lg md:text-xl font-bold text-foreground">
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
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground'
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
