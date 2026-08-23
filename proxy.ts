import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next/static (static files)
  // - _next/image (image optimization)
  // - public/static files (any path segment containing a dot)
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)']
};
