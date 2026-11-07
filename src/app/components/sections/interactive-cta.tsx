'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';

interface InteractiveCtaProps {
  href: string;
  children: ReactNode;
  className: string;
  direction?: 'forward' | 'back';
  showDownArrow?: boolean;
}

export function InteractiveCta({
  href,
  children,
  className,
  direction = 'forward',
  showDownArrow = false,
}: InteractiveCtaProps) {
  const Arrow = showDownArrow ? ArrowDown : direction === 'back' ? ArrowUpLeft : ArrowUpRight;

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 360, damping: 22 }}>
      <Link href={href} className={className}>
        <span>{children}</span>
        <Arrow className="cta-arrow" aria-hidden="true" size={17} />
      </Link>
    </motion.div>
  );
}
