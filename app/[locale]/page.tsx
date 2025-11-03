import { useTranslations } from 'next-intl';
import { gamesConfig } from '@/data/games';
import { categoriesConfig } from '@/data/categories';
import GameCard from '@/components/shared/GameCard';
import ComingSoonCard from '@/components/shared/ComingSoonCard';
import Navigation from '@/components/shared/Navigation';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 drop-shadow-lg">
            {t('home.title')}
          </h1>
        </header>

        {/* Categories */}
        {categoriesConfig.map(category => {
          const categoryGames = gamesConfig.filter(g => g.category === category.id);

          if (categoryGames.length === 0) return null;

          return (
            <section key={category.id} className="mb-16">
              {/* Category Header */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {t(category.title)}
                </h2>
              </div>

              {/* Games Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryGames.map(game =>
                  game.active ? (
                    <GameCard key={game.id} game={game} />
                  ) : (
                    <ComingSoonCard key={game.id} game={game} />
                  )
                )}
              </div>
            </section>
          );
        })}
        </div>
      </div>
    </div>
  );
}
