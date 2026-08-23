'use client';

import { useTranslations } from 'next-intl';
import { BarChart3, Check, X } from 'lucide-react';
import type { MathGameStats } from '@/types';

interface GameStatsProps {
  stats: MathGameStats;
}

export default function GameStats({ stats }: GameStatsProps) {
  const t = useTranslations('math.stats');

  const statItems = [
    {
      label: t('correct'),
      value: stats.correct,
      icon: Check,
      color: 'bg-secondary border-border text-secondary-foreground'
    },
    {
      label: t('total'),
      value: stats.totalQuestions,
      icon: BarChart3,
      color: 'bg-card border-border text-card-foreground'
    },
    {
      label: t('wrong'),
      value: stats.wrong,
      icon: X,
      color: 'bg-muted border-border text-muted-foreground'
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
