import { useTranslations } from 'next-intl';
import { gamesConfig } from '@/data/games';
import { categoriesConfig } from '@/data/categories';
import GameCard from '@/components/shared/GameCard';
import ComingSoonCard from '@/components/shared/ComingSoonCard';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            🎮 {t('title')} 🎮
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            {t('subtitle')}
          </p>
        </header>

        {/* Categories */}
        {categoriesConfig.map(category => {
          const categoryGames = gamesConfig.filter(g => g.category === category.id);

          if (categoryGames.length === 0) return null;

          return (
            <section key={category.id} className="mb-16">
              {/* Category Header */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {category.icon} {category.title}
                </h2>
                <p className="text-white/80 text-lg">
                  {category.description}
                </p>
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
        <footer className="text-center mt-16 text-white/60">
          <p>משחקים חינוכיים לילדים • Educational Games for Children</p>
        </footer>
      </div>
    </div>
  );
}
