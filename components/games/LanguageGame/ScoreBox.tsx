'use client';

import { useTranslations } from 'next-intl';

interface ScoreBoxProps {
  show: boolean;
  correct: number;
  wrong: number;
}

export default function ScoreBox({ show, correct, wrong }: ScoreBoxProps) {
  const t = useTranslations('games');

  if (!show) return null;

  return (
    <div className="bg-white/90 rounded-xl p-4 text-center text-xl font-bold mb-5 shadow-md">
      {t('score.correct')}: <span className="text-green-600">{correct}</span> | {t('score.wrong')}: <span className="text-red-600">{wrong}</span>
    </div>
  );
}
