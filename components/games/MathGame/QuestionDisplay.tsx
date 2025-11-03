'use client';

import { useTranslations } from 'next-intl';
import type { MathQuestion } from '@/types';

interface QuestionDisplayProps {
  question: MathQuestion | null;
  showFeedback: boolean;
  isCorrect: boolean | null;
}

export default function QuestionDisplay({
  question,
  showFeedback,
  isCorrect
}: QuestionDisplayProps) {
  const t = useTranslations('math');

  if (!question) {
    return (
      <div className="text-center py-12">
        <div className="text-2xl text-gray-500">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-purple-300 mb-6">
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-bold text-purple-900 mb-4 font-mono">
          {question.displayText}
        </div>

        {showFeedback && (
          <div
            className={`text-3xl md:text-4xl font-bold mt-6 animate-bounce ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isCorrect ? (
              <div className="flex items-center justify-center gap-3">
                <span>✅</span>
                <span>{t('feedback.correct')}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <span>❌</span>
                <span>
                  {t('feedback.wrong', { answer: question.correctAnswer })}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
