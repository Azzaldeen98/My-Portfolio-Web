'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from '@/app/components/providers/theme-provider';
import { Sun, Moon } from 'lucide-react';

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // المتصفح
    () => false  // الخادم
  );
}

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <div className="w-9 h-9" />;
  }

  // استخدام resolvedTheme يضمن قراءة الوضع الفعلي حتى لو كانت القيمة 'system'
  const currentTheme = resolvedTheme || theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border-main hover:bg-surface-hover transition-colors cursor-pointer"
      aria-label="Toggle Theme"
    >
      {currentTheme === 'dark' ? (
        <Sun className="w-5 h-5 text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-content-main" />
      )}
    </button>
  );
}