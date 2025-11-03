'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
          email: email,
          message: message,
          from_name: email,
          subject: 'New Feature Request from Kids Games'
        })
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
        setMessage('')
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-card-foreground"
          >
            {t('emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('emailPlaceholder')}
            className="w-full px-4 py-3 rounded-lg border border-input
                     bg-background
                     text-foreground
                     focus:ring-2 focus:ring-ring focus:border-transparent
                     placeholder:text-muted-foreground
                     transition-colors"
            disabled={status === 'loading'}
          />
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-card-foreground"
          >
            {t('messageLabel')}
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            placeholder={t('messagePlaceholder')}
            className="w-full px-4 py-3 rounded-lg border border-input
                     bg-background
                     text-foreground
                     focus:ring-2 focus:ring-ring focus:border-transparent
                     placeholder:text-muted-foreground
                     transition-colors resize-y"
            disabled={status === 'loading'}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 rounded-lg font-medium
                   bg-accent hover:bg-accent/90
                   text-accent-foreground
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {status === 'loading' ? t('sending') : t('submit')}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="p-4 rounded-lg bg-secondary border border-border">
            <p className="text-secondary-foreground text-center font-medium">
              {t('successMessage')}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive">
            <p className="text-destructive text-center font-medium">
              {t('errorMessage')}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
