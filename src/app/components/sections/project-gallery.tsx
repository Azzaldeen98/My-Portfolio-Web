'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import type { ProjectImage } from '@/app/core/domain/types';

interface ProjectGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

export function ProjectGallery({
  images,
  projectTitle,
}: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Home.projects');
  const prefersReducedMotion = useReducedMotion();
  const isRtl = locale === 'ar';
  const sortedImages = useMemo(
    () => [...images].sort((first, second) => first.sortOrder - second.sortOrder),
    [images],
  );
  const activeImage = sortedImages[activeIndex];
  const PreviousIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (images.length === 0) {
    return null;
  }

  function showPreviousImage() {
    setActiveIndex((index) => (index - 1 + sortedImages.length) % sortedImages.length);
  }

  function showNextImage() {
    setActiveIndex((index) => (index + 1) % sortedImages.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === (isRtl ? 'ArrowRight' : 'ArrowLeft')) {
      event.preventDefault();
      showPreviousImage();
    } else if (event.key === (isRtl ? 'ArrowLeft' : 'ArrowRight')) {
      event.preventDefault();
      showNextImage();
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      dialogRef.current?.close();
    }
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-border-main bg-surface px-3 py-2 text-sm font-medium text-primary transition hover:bg-surface-hover hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={() => setIsOpen(true)}
      >
        <Images aria-hidden="true" size={16} />
        <span>{t('galleryButton')}</span>
      </button>
      <dialog
        ref={dialogRef}
        className="project-gallery-dialog"
        dir={isRtl ? 'rtl' : 'ltr'}
        aria-label={t('galleryTitle', { title: projectTitle })}
        onClose={() => setIsOpen(false)}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          className="project-gallery-content"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="project-gallery-header">
            <div>
              <h2 className="text-lg font-semibold text-content-main">
                {projectTitle}
              </h2>
              <p className="text-sm text-content-muted">
                {t('galleryCounter', {
                  current: activeIndex + 1,
                  total: sortedImages.length,
                })}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border-main text-content-main transition hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={t('galleryClose')}
              onClick={() => dialogRef.current?.close()}
            >
              <X aria-hidden="true" size={19} />
            </button>
          </div>

          <div className="project-gallery-stage">
            <AnimatePresence mode="wait" initial={false}>
              {isOpen && activeImage ? (
                <motion.div
                  key={activeImage.id}
                  className="project-gallery-image"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: isRtl ? -12 : 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: isRtl ? 12 : -12 }}
                  transition={{ duration: 0.16 }}
                >
                  <Image
                    src={activeImage.imageUrl}
                    alt={activeImage.caption || projectTitle}
                    fill
                    unoptimized
                    sizes="(max-width: 700px) 94vw, 80vw"
                    className="project-gallery-image-content"
                    priority
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            {sortedImages.length > 1 ? (
              <>
                <button
                  type="button"
                  className="project-gallery-control project-gallery-previous"
                  aria-label={t('galleryPrevious')}
                  onClick={showPreviousImage}
                >
                  <PreviousIcon aria-hidden="true" size={21} />
                </button>
                <button
                  type="button"
                  className="project-gallery-control project-gallery-next"
                  aria-label={t('galleryNext')}
                  onClick={showNextImage}
                >
                  <NextIcon aria-hidden="true" size={21} />
                </button>
              </>
            ) : null}
          </div>

          {activeImage?.caption ? (
            <p className="project-gallery-caption">{activeImage.caption}</p>
          ) : null}
        </motion.div>
      </dialog>
    </>
  );
}
