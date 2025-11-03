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

          {/* Footer */}
          <footer className="text-center mt-16" dir="ltr" lang="en">
            <p className="text-sm text-foreground/80">
              Built with Love and AI by{' '}
              <a
                href="https://www.linkedin.com/in/elli-patrick/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline font-medium inline-flex items-center gap-1"
              >
                Elizabeth Patrick
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" x2="21" y1="14" y2="3" />
                </svg>
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
