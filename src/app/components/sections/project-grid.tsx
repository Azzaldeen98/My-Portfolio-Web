'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LocalizedCategory, LocalizedProject } from '@/app/core/domain/types';
import { ProjectCard } from './project-card';
import { Reveal } from './reveal';

interface ProjectGridProps {
  categories: LocalizedCategory[];
  projects: LocalizedProject[];
  allLabel: string;
  projectCta: string;
  demoLabel: string;
  githubLabel: string;
  filterLabel: string;
  emptyLabel: string;
}

export function ProjectGrid({
  categories,
  projects,
  allLabel,
  projectCta,
  demoLabel,
  githubLabel,
  filterLabel,
  emptyLabel,
}: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const visibleProjects = activeCategory
    ? projects.filter((project) => project.categoryId === activeCategory)
    : projects;

  return (
    <>
      <div className="project-filters" role="group" aria-label={filterLabel}>
        <button
          type="button"
          className={`project-filter${activeCategory === null ? ' is-active' : ''}`}
          aria-pressed={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        >
          {allLabel}
        </button>
        {categories.map((category) => (
          <button
            type="button"
            className={`project-filter${activeCategory === category.id ? ' is-active' : ''}`}
            aria-pressed={activeCategory === category.id}
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <motion.div className="projects-grid" layout>
        {visibleProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06}>
            <ProjectCard
              project={project}
              images={project.images}
              projectCta={projectCta}
              demoLabel={demoLabel}
              githubLabel={githubLabel}
            />
          </Reveal>
        ))}
        {visibleProjects.length === 0 ? (
          <p className="project-empty-state" role="status">{emptyLabel}</p>
        ) : null}
      </motion.div>
    </>
  );
}
