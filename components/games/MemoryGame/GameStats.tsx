import { useTranslations } from 'next-intl';

interface GameStatsProps {
  moves: number;
  matches: number;
  totalPairs: number;
}

export default function GameStats({
  moves,
  matches,
  totalPairs,
}: GameStatsProps) {
  const t = useTranslations('games.memory');

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <div className="bg-card border-2 border-border rounded-lg px-6 py-3 min-w-[120px] text-center">
        <div className="text-2xl font-bold text-primary">{moves}</div>
        <div className="text-sm text-muted-foreground">{t('moves')}</div>
      </div>
      <div className="bg-card border-2 border-border rounded-lg px-6 py-3 min-w-[120px] text-center">
        <div className="text-2xl font-bold text-green-600">
          {matches}/{totalPairs}
        </div>
        <div className="text-sm text-muted-foreground">{t('matches')}</div>
      </div>
    </div>
  );
}
