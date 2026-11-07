'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { LocalizedProject, ProjectImage } from '@/app/core/domain/types';
import { ProjectGallery } from './project-gallery';

interface ProjectCardProps {
  project: LocalizedProject;
  images: ProjectImage[];
  projectCta: string;
  demoLabel: string;
  githubLabel: string;
}

export function ProjectCard({
  project,
  images,
  projectCta,
  demoLabel,
  githubLabel,
}: ProjectCardProps) {
  return (
    <motion.article
      className="project-card"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        event.currentTarget.style.setProperty('--pointer-x', `${x}%`);
        event.currentTarget.style.setProperty('--pointer-y', `${y}%`);
      }}
      whileHover={{ y: -5 }}
    >
      <div className="project-image-wrap">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            unoptimized
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="project-image"
          />
        ) : (
          <div className="project-image-placeholder" aria-hidden="true">
            {project.title.slice(0, 1)}
          </div>
        )}
      </div>
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="project-tech-list">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-card-actions">
          {images.length > 0 ? (
            <ProjectGallery
              images={images}
              projectTitle={project.title}
            />
          ) : null}
          {project.demoUrl ? (
            <a className="project-link" href={project.demoUrl} target="_blank" rel="noreferrer">
              <span>{demoLabel}</span>
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a className="project-link" href={project.githubUrl} target="_blank" rel="noreferrer">
              <span>{githubLabel}</span>
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          ) : null}
          {!project.demoUrl && !project.githubUrl ? (
            <Link href="/contact" className="project-link">
              <span>{projectCta}</span>
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
