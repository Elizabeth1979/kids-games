'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="text-center mt-16 mb-8 ps-4 pe-4" dir="ltr" lang="en">
      <div className="flex flex-col gap-3 items-center">
        {/* Contact Link */}
        <Link
          href="/contact"
          className="text-sm text-foreground/80 hover:text-foreground underline font-medium"
        >
          {t('contact')}
        </Link>

        {/* Attribution */}
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
      </div>
    </footer>
  );
}
