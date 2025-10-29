'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';

const languages = [
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: newLocale }
    );
  };

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
          <div className="flex gap-4 items-center">
            {/* Language Picker */}
            <div className="relative group">
              <button
                className="text-white text-lg md:text-xl font-semibold
                         px-4 py-2 rounded-xl hover:bg-white/20 transition-all
                         flex items-center gap-2"
              >
                {languages.find(lang => lang.code === locale)?.flag}
                <span className="hidden md:inline">
                  {languages.find(lang => lang.code === locale)?.name}
                </span>
                <span className="text-sm">▼</span>
              </button>

              {/* Dropdown */}
              <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            transition-all duration-200 min-w-[160px] overflow-hidden">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-3 hover:bg-purple-100 transition-colors
                              flex items-center gap-3 ${
                                locale === lang.code ? 'bg-purple-50 font-bold' : ''
                              }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-gray-800">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

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
