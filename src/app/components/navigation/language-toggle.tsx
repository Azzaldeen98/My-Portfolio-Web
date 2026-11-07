// src/components/common/language-toggle.tsx
'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Globe, Loader2 } from 'lucide-react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';

    // 1. قراءة الوضع الحقيقي المخزن في localStorage مباشرة لمنع أي تضارب
    const savedTheme = localStorage.getItem('base-web-theme');
    const isDark = 
      savedTheme === 'dark' || 
      (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
      document.documentElement.classList.contains('dark');

    // 2. تثبيت الكلاس صراحة على وسم html لحمايته أثناء إعادة التحميل
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 3. تنفيذ الانتقال
    startTransition(() => {
      router.replace(pathname, { locale: newLocale, scroll: false });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border-main hover:bg-surface-hover active:scale-95 transition-all cursor-pointer disabled:opacity-60"
      aria-label="Toggle Language"
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
      ) : (
        <Globe className="w-3.5 h-3.5 text-content-subtle" />
      )}
      <span className="text-content-muted">{locale === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
}