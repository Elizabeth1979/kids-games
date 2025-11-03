'use client';

import { useTranslations } from 'next-intl';
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
      emoji: '✅',
      color: 'bg-green-100 border-green-400 text-green-800'
    },
    {
      label: t('total'),
      value: stats.totalQuestions,
      emoji: '📊',
      color: 'bg-blue-100 border-blue-400 text-blue-800'
    },
    {
      label: t('wrong'),
      value: stats.wrong,
      emoji: '❌',
      color: 'bg-red-100 border-red-400 text-red-800'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {statItems.map((item) => (
        <div
          key={item.label}
          className={`${item.color} rounded-2xl p-4 border-4 shadow-lg text-center`}
        >
          <div className="text-3xl mb-2">{item.emoji}</div>
          <div className="text-3xl md:text-4xl font-bold mb-1">
            {item.value}
          </div>
          <div className="text-sm md:text-base font-semibold opacity-80">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
