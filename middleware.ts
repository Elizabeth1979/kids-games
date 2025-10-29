import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next/static (static files)
  // - _next/image (image optimization)
  // - favicon.ico, manifest.json, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)']
};
