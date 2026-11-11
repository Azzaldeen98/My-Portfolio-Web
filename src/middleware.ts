// src/middleware.ts

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  // استبدال النمط القديم بنمط موحد يتجاوز ملفات النظام والملفات الثابتة والصور
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};

//import createMiddleware from 'next-intl/middleware';
//import { locales, defaultLocale } from './i18n/request';

//export default createMiddleware({
 // locales,
//  defaultLocale,
  //localePrefix: 'always',
//});

//export const config = {
  //matcher: ['/', '/(ar|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
//};