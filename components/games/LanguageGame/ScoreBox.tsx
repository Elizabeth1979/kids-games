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
    <div className="bg-card rounded-xl p-4 text-center text-xl font-bold mb-5 shadow-md border">
      <span className="inline-block text-foreground">{t('score.correct')}: <span className="text-green-600">{correct}</span></span>
      <span className="mx-3 text-muted-foreground">|</span>
      <span className="inline-block text-foreground">{t('score.wrong')}: <span className="text-red-600">{wrong}</span></span>
    </div>
  );
}
