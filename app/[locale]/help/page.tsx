'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navigation from '@/components/shared/Navigation';

export default function HelpPage() {
  const t = useTranslations('help');
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');

  const faqs = [
    {
      question: t('faq.speech.question'),
      answer: t('faq.speech.answer'),
      icon: '🔊'
    },
    {
      question: t('faq.android.question'),
      answer: t('faq.android.answer'),
      icon: '📱'
    },
    {
      question: t('faq.install.question'),
      answer: t('faq.install.answer'),
      icon: '📲'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 drop-shadow-lg">
            {t('title')}
          </h1>
        </header>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="bg-secondary/50 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-border">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              ❓ {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{faq.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12">
          <div className="bg-secondary/50 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-border">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              📧 {t('contact.title')}
            </h2>
          </div>

          <div className="bg-card rounded-3xl p-8 shadow-lg text-center border border-border">
            <p className="text-xl text-muted-foreground mb-6">
              {t('contact.description')}
            </p>
            <a
              href={`mailto:${tFooter('email')}`}
              className="inline-block bg-accent text-accent-foreground
                       px-8 py-4 rounded-2xl text-xl font-bold shadow-lg
                       hover:shadow-xl hover:scale-105 transition-all hover:bg-accent/90"
            >
              {t('contact.email')} ✉️
            </a>
            <p className="text-muted-foreground mt-4">
              {tFooter('email')}
            </p>
          </div>
        </section>

          {/* Back to Home Button */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-secondary backdrop-blur-sm text-secondary-foreground
                       px-8 py-4 rounded-2xl text-xl font-bold shadow-lg
                       hover:bg-secondary/80 hover:shadow-xl hover:scale-105 transition-all border border-border"
            >
              🏠 {tNav('home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
