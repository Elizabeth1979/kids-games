import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

// Configure PWA
const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: true,
  fallbacks: {
    document: '/offline'
  }
});

export default withNextIntl(pwaConfig(nextConfig));
