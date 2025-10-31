import { useTranslations } from 'next-intl';

interface ControlsProps {
  onNewGame: () => void;
  onResetScore: () => void;
}

export default function Controls({ onNewGame, onResetScore }: ControlsProps) {
  const t = useTranslations('ticTacToe');

  return (
    <div className="flex gap-4 justify-center mb-8 flex-wrap">
      <button
        onClick={onNewGame}
        className="px-8 py-4 bg-primary text-primary-foreground
                   rounded-2xl font-bold text-lg shadow-lg
                   hover:shadow-xl hover:scale-105 transition-all hover:bg-primary/90"
      >
        {t('newGame')}
      </button>
      <button
        onClick={onResetScore}
        className="px-8 py-4 bg-destructive text-destructive-foreground
                   rounded-2xl font-bold text-lg shadow-lg
                   hover:shadow-xl hover:scale-105 transition-all hover:bg-destructive/90"
      >
        {t('resetScore')}
      </button>
    </div>
  );
}
