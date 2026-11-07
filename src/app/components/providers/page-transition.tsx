// src/components/common/page-transition.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locale}
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: locale === 'ar' ? -15 : 15 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex-1 flex flex-col w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}