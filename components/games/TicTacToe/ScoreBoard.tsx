import { useTranslations } from 'next-intl';
import { Bot, Equal, User } from 'lucide-react';

interface ScoreBoardProps {
  scores: {
    player: number;
    computer: number;
    tie: number;
  };
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  const t = useTranslations('ticTacToe.scores');

  const statItems = [
    {
      label: t('you'),
      value: scores.player,
      icon: User,
      color: 'bg-secondary border-border text-secondary-foreground'
    },
    {
      label: t('tie'),
      value: scores.tie,
      icon: Equal,
      color: 'bg-muted border-border text-muted-foreground'
    },
    {
      label: t('computer'),
      value: scores.computer,
      icon: Bot,
      color: 'bg-card border-border text-card-foreground'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`${item.color} rounded-2xl p-4 border-4 shadow-lg text-center`}
          >
            <Icon className="size-8 mx-auto mb-2" aria-hidden="true" />
            <div className="text-3xl md:text-4xl font-bold mb-1">
              {item.value}
            </div>
            <div className="text-sm md:text-base font-semibold opacity-80">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
