import { useTranslations } from 'next-intl';

interface ScoreBoardProps {
  scores: {
    player: number;
    computer: number;
    tie: number;
  };
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  const t = useTranslations('ticTacToe.scores');

  return (
    <div className="flex justify-around gap-4 mb-8 flex-wrap">
      {/* Player Score */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border-t-4 border-red-500 shadow-lg min-w-[120px] text-center">
        <div className="text-gray-600 text-sm md:text-base mb-2">
          {t('you')}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-gray-800">
          {scores.player}
        </div>
      </div>

      {/* Tie Score */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border-t-4 border-yellow-500 shadow-lg min-w-[120px] text-center">
        <div className="text-gray-600 text-sm md:text-base mb-2">
          {t('tie')}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-gray-800">
          {scores.tie}
        </div>
      </div>

      {/* Computer Score */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border-t-4 border-blue-600 shadow-lg min-w-[120px] text-center">
        <div className="text-gray-600 text-sm md:text-base mb-2">
          {t('computer')}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-gray-800">
          {scores.computer}
        </div>
      </div>
    </div>
  );
}
