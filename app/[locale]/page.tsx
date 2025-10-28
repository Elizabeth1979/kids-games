import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          {t('title')} 🎮
        </h1>
        <p className="text-2xl text-white/90">
          {t('subtitle')}
        </p>
        <p className="mt-8 text-white/70">
          Next.js + i18n is working! ✅
        </p>
      </div>
    </div>
  );
}
