// src/app/[locale]/layout.tsx

import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import '@/app/globals.css';





// ✅ استخدام المسارات الصحيحة المعتمدة في مشروعك
import { ThemeProvider } from '@/app/components/providers/theme-provider';
import { Navbar } from '@/app/components/navigation/navbar';
import { Footer } from '@/app/components/navigation/footer';
import { PageTransition } from '@/app/components/providers/page-transition';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale )) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className="scroll-smooth dark">
      <body className="min-h-screen flex flex-col bg-app text-content-main antialiased transition-colors duration-200">
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<div className="min-h-screen bg-app" />}>
            <ThemeProvider defaultTheme="system" enableSystem storageKey="base-web-theme">
              <Navbar />
              <main className="flex-1 flex flex-col overflow-x-hidden">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </ThemeProvider>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );

}