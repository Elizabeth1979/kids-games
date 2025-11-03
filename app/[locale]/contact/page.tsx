import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/shared/ContactForm'
import Navigation from '@/components/shared/Navigation'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export default function ContactPage() {
  const t = useTranslations('contact')

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('heading')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subheading')}
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl shadow-xl p-8">
            <ContactForm />
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>{t('privacyNote')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
