// src/components/common/footer.tsx
import { useTranslations } from 'next-intl';

async function CurrentYear() {
  'use cache';
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full border-t border-border-main bg-surface transition-colors py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-content-muted">
          © <CurrentYear /> folio. {t('rights')}
        </p>
      </div>
    </footer>
  );
}