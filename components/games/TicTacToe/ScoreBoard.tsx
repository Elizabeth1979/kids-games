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
      <div className="bg-card rounded-2xl p-4 md:p-6 border-t-4 border-destructive shadow-lg min-w-[120px] text-center">
        <div className="text-muted-foreground text-sm md:text-base mb-2">
          {t('you')}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-foreground">
          {scores.player}
        </div>
      </div>

      {/* Tie Score */}
      <div className="bg-card rounded-2xl p-4 md:p-6 border-t-4 border-secondary shadow-lg min-w-[120px] text-center">
        <div className="text-muted-foreground text-sm md:text-base mb-2">
          {t('tie')}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-foreground">
          {scores.tie}
        </div>
      </div>

      {/* Computer Score */}
      <div className="bg-card rounded-2xl p-4 md:p-6 border-t-4 border-primary shadow-lg min-w-[120px] text-center">
        <div className="text-muted-foreground text-sm md:text-base mb-2">
          {t('computer')}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-foreground">
          {scores.computer}
        </div>
      </div>
    </div>
  );
}
