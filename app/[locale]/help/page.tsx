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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            {t('title')}
          </h1>
        </header>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              ❓ {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{faq.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
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
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              📧 {t('contact.title')}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <p className="text-xl text-gray-700 mb-6">
              {t('contact.description')}
            </p>
            <a
              href={`mailto:${tFooter('email')}`}
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white
                       px-8 py-4 rounded-2xl text-xl font-bold shadow-lg
                       hover:shadow-xl hover:scale-105 transition-all"
            >
              {t('contact.email')} ✉️
            </a>
            <p className="text-gray-600 mt-4">
              {tFooter('email')}
            </p>
          </div>
        </section>

          {/* Back to Home Button */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-white/20 backdrop-blur-sm text-white
                       px-8 py-4 rounded-2xl text-xl font-bold shadow-lg
                       hover:bg-white/30 hover:shadow-xl hover:scale-105 transition-all"
            >
              🏠 {tNav('home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
