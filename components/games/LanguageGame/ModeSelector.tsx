'use client';

import { useTranslations } from 'next-intl';
import { GameMode } from '@/types';

interface ModeSelectorProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  isShuffled: boolean;
  onToggleShuffle: () => void;
}

export default function ModeSelector({
  currentMode,
  onModeChange,
  isShuffled,
  onToggleShuffle
}: ModeSelectorProps) {
  const t = useTranslations('games');

  return (
    <div className="flex gap-3 justify-center mb-6 flex-wrap">
      <button
        onClick={() => onModeChange('learn')}
        className={`
          px-6 py-3 rounded-2xl text-lg font-bold transition-all
          shadow-md hover:shadow-lg hover:-translate-y-0.5
          ${currentMode === 'learn'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-foreground hover:bg-accent border'
          }
        `}
      >
        {t('modes.learn')}
      </button>

      <button
        onClick={() => onModeChange('find')}
        className={`
          px-6 py-3 rounded-2xl text-lg font-bold transition-all
          shadow-md hover:shadow-lg hover:-translate-y-0.5
          ${currentMode === 'find'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-foreground hover:bg-accent border'
          }
        `}
      >
        {t('modes.find')}
      </button>

      <button
        onClick={onToggleShuffle}
        className={`
          px-6 py-3 rounded-2xl text-lg font-bold transition-all
          shadow-md hover:shadow-lg hover:-translate-y-0.5
          ${isShuffled
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-card text-foreground hover:bg-accent border'
          }
        `}
      >
        {t('modes.shuffle')}
      </button>
    </div>
  );
}
