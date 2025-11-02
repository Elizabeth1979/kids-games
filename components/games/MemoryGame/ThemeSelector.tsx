import { useTranslations } from 'next-intl';
import { memoryThemes } from '@/data/memoryThemes';

interface ThemeSelectorProps {
  onSelectTheme: (themeId: string) => void;
}

export default function ThemeSelector({ onSelectTheme }: ThemeSelectorProps) {
  const t = useTranslations('games.memory');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground">{t('selectTheme')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {memoryThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-6 hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-5xl">
                  {theme.items[0].emoji || '🎮'}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t(`themes.${theme.id}`)}
                </h3>
                <div className="flex gap-1">
                  {theme.items.slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
