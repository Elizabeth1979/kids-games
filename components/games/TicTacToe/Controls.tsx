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
        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white
                   rounded-2xl font-bold text-lg shadow-lg
                   hover:shadow-xl hover:scale-105 transition-all"
      >
        {t('newGame')}
      </button>
      <button
        onClick={onResetScore}
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white
                   rounded-2xl font-bold text-lg shadow-lg
                   hover:shadow-xl hover:scale-105 transition-all"
      >
        {t('resetScore')}
      </button>
    </div>
  );
}
