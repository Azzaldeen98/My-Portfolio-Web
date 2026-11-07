import { Layers3 } from 'lucide-react';
import { Reveal } from './reveal';

interface AboutSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  experienceLabel: string;
  projectsLabel: string;
  yearsExperience: number;
  projectsCompleted: number;
  technologiesLabel: string;
  technologies: string[];
}

export function AboutSection({
  eyebrow,
  title,
  description,
  experienceLabel,
  projectsLabel,
  yearsExperience,
  projectsCompleted,
  technologiesLabel,
  technologies,
}: AboutSectionProps) {
  return (
    <section
      id="about"
      className="portfolio-section about-section"
      aria-labelledby="about-title"
    >
      <Reveal className="section-heading-block">
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 id="about-title" className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
      </Reveal>

      <div className="portfolio-stats" aria-label={`${experienceLabel}, ${projectsLabel}`}>
        {yearsExperience>0 && (
        <Reveal className="portfolio-stat">
          <strong>{yearsExperience}+</strong>
          <span>{experienceLabel}</span>
        </Reveal>
        )}
       {projectsCompleted>0 && (
        <Reveal className="portfolio-stat" delay={0.08}>
          <strong>{projectsCompleted}+</strong>
          <span>{projectsLabel}</span>
        </Reveal>
       )}
      </div>

      <Reveal className="expertise-stack-panel" delay={0.12}>
        <div className="stack-panel-heading">
          <Layers3 aria-hidden="true" size={18} />
          <h3>{technologiesLabel}</h3>
        </div>
        <ul className="expertise-pills" aria-label={technologiesLabel}>
          {technologies.map((technology) => (
            <li className="expertise-pill" key={technology}>{technology}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
