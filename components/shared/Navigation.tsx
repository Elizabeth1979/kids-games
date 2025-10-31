'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-primary-foreground text-xl md:text-2xl font-bold hover:scale-105 transition-transform"
          >
            🎮 {t('home')}
          </Link>
          <div className="flex gap-2 md:gap-4 items-center">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Picker */}
            <div className="relative group">
              <button
                className="text-primary-foreground text-lg md:text-xl font-semibold
                         px-4 py-2 rounded-xl hover:bg-primary-foreground/20 transition-all
                         flex items-center gap-2"
              >
                {languages.find(lang => lang.code === locale)?.flag}
                <span className="hidden md:inline">
                  {languages.find(lang => lang.code === locale)?.name}
                </span>
                <span className="text-sm">▼</span>
              </button>

              {/* Dropdown */}
              <div className="absolute top-full mt-2 right-0 bg-card rounded-xl shadow-xl
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            transition-all duration-200 min-w-[160px] overflow-hidden border border-border">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors
                              flex items-center gap-3 ${
                                locale === lang.code ? 'bg-secondary font-bold' : ''
                              }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-card-foreground">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/help"
              className="text-primary-foreground text-lg md:text-xl font-semibold
                       px-4 py-2 rounded-xl hover:bg-primary-foreground/20 transition-all"
            >
              ❓ {t('help')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
