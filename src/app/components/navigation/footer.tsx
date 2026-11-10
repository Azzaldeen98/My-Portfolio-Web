// src/components/common/footer.tsx
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

async function CurrentYear() {
  'use cache';
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Navbar');
  const links = [
    { href: '/', label: nav('home') },
    { href: '/about', label: nav('about') },
    { href: '/services', label: nav('services') },
    { href: '/contact', label: nav('contact') },
  ];

  return (
    <footer className="w-full border-t border-border-main bg-surface transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-16 lg:py-16">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-xl text-content-main"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs text-content-on-primary">
                A
              </span>
              <span className="tracking-tight">
                Azzaldeen<span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-content-muted">
              {t('brandDescription')}
            </p>
          </div>

          <nav aria-label={t('navigationTitle')}>
            <h2 className="text-sm font-semibold text-content-main">
              {t('navigationTitle')}
            </h2>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-muted transition-colors hover:text-primary-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-2xl border border-border-main bg-brand-subtle p-5 sm:col-span-2 lg:col-span-1 lg:p-6">
            <h2 className="text-base font-semibold text-content-main">
              {t('connectTitle')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-content-muted">
              {t('contactDescription')}
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-content-on-primary transition-colors hover:bg-primary-hover"
            >
              {t('contactAction')}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-main py-5 text-sm text-content-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> AzzaldeenTech. {t('rights')}
          </p>
          <p>{t('madeWithCare')}</p>
        </div>
      </div>
    </footer>
  );
}