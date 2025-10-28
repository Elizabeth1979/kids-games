'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Navigation() {
  const t = useTranslations('nav');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-white text-xl md:text-2xl font-bold hover:scale-105 transition-transform"
          >
            🎮 {t('home')}
          </Link>
          <div className="flex gap-4">
            <Link
              href="/help"
              className="text-white text-lg md:text-xl font-semibold
                       px-4 py-2 rounded-xl hover:bg-white/20 transition-all"
            >
              ❓ {t('help')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
