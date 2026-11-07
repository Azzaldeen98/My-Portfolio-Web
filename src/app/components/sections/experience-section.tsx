import { BriefcaseBusiness, MapPin } from 'lucide-react';
import type { LocalizedExperience } from '@/app/core/domain/types';
import { Reveal } from './reveal';

interface ExperienceSectionProps {
  eyebrow: string;
  title: string;
  currentLabel: string;
  emptyLabel: string;
  experiences: LocalizedExperience[];
}

export function ExperienceSection({
  eyebrow,
  title,
  currentLabel,
  emptyLabel,
  experiences,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="portfolio-section resume-section"
      aria-labelledby="experience-title"
    >
      <Reveal className="section-heading-block">
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 id="experience-title" className="section-title">{title}</h2>
      </Reveal>

      <div className="resume-timeline">
        {experiences.length === 0 ? <p className="section-description">{emptyLabel}</p> : null}
        {experiences.map((experience, index) => (
          <Reveal className="timeline-entry" key={experience.id} delay={index * 0.07}>
            <span className="timeline-marker" aria-hidden="true" />
            <article className="resume-card">
              <div className="resume-card-heading">
                <span className="resume-card-icon">
                  <BriefcaseBusiness aria-hidden="true" size={18} />
                </span>
                <span className="resume-date">
                  {experience.startDate} – {(
                    experience.isCurrent ? currentLabel : experience.endDate ?? currentLabel
                  )}
                </span>
              </div>
              <h3>{experience.title}</h3>
              <p className="resume-organization">{experience.company}</p>
              {experience.location ? (
                <p className="resume-location">
                  <MapPin aria-hidden="true" size={14} />
                  {experience.location}
                </p>
              ) : null}
              <p className="resume-description">{experience.description}</p>
              {experience.technologies.length > 0 ? (
                <ul className="project-tech-list">
                  {experience.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
