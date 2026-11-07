'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedPortraitProps {
  alt: string;
  imageUrl: string;
  placeholderLabel: string;
}

export function AnimatedPortrait({
  alt,
  imageUrl,
  placeholderLabel,
}: AnimatedPortraitProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="hero-portrait-stage">
      <motion.figure
        className="hero-portrait"
        initial={false}
        animate={prefersReducedMotion ? { y: 0 } : { y: [0, -8, 0] }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={prefersReducedMotion ? undefined : { scale: 1.035 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      >
        <Image
          src={imageUrl || '/profile-portrait.jpg'}
          alt={alt}
          fill
          priority
          unoptimized
          sizes="(max-width: 640px) 55vw, (max-width: 900px) 35vw, 28vw"
          className="hero-portrait-image"
        />
        <span className="hero-portrait-overlay" aria-hidden="true" />
        <figcaption className="hero-portrait-caption">{placeholderLabel}</figcaption>
      </motion.figure>
    </div>
  );
}
