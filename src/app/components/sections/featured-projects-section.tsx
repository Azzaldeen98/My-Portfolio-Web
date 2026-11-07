import { Reveal } from './reveal';
import type { LocalizedCategory, LocalizedProject } from '@/app/core/domain/types';
import { ProjectGrid } from './project-grid';

interface FeaturedProjectsSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  categories: LocalizedCategory[];
  projects: LocalizedProject[];
  projectCta: string;
  demoLabel: string;
  githubLabel: string;
  allLabel: string;
  filterLabel: string;
  emptyLabel: string;
}

export function FeaturedProjectsSection({
  eyebrow,
  title,
  description,
  categories,
  projects,
  projectCta,
  demoLabel,
  githubLabel,
  allLabel,
  filterLabel,
  emptyLabel,
}: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="portfolio-section projects-section" aria-labelledby="projects-title">
      <Reveal className="section-heading-block projects-heading">
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 id="projects-title" className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
      </Reveal>
      <ProjectGrid
        categories={categories}
        projects={projects}
        allLabel={allLabel}
        projectCta={projectCta}
        demoLabel={demoLabel}
        githubLabel={githubLabel}
        filterLabel={filterLabel}
        emptyLabel={emptyLabel}
      />
    </section>
  );
}
