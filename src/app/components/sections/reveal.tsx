'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || prefersReducedMotion) {
      setIsVisible(true);
      setIsHydrated(true);
      return;
    }

    const bounds = element.getBoundingClientRect();
    const startsInView = bounds.top < window.innerHeight && bounds.bottom > 0;
    setIsVisible(startsInView);
    setIsHydrated(true);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={false}
      animate={
        !isHydrated || isVisible || prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: distance }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      onViewportEnter={() => setIsVisible(true)}
      transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
