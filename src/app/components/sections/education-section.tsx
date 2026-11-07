import { GraduationCap } from 'lucide-react';
import type { LocalizedEducation } from '@/app/core/domain/types';
import { Reveal } from './reveal';

interface EducationSectionProps {
  eyebrow: string;
  title: string;
  gradeLabel: string;
  emptyLabel: string;
  education: LocalizedEducation[];
}

export function EducationSection({
  eyebrow,
  title,
  gradeLabel,
  emptyLabel,
  education,
}: EducationSectionProps) {
  return (
    <section
      id="education"
      className="portfolio-section education-section"
      aria-labelledby="education-title"
    >
      <Reveal className="section-heading-block">
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 id="education-title" className="section-title">{title}</h2>
      </Reveal>

      <div className="education-grid">
        {education.length === 0 ? <p className="section-description">{emptyLabel}</p> : null}
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.07}>
            <article className="resume-card education-card">
              <span className="resume-card-icon">
                <GraduationCap aria-hidden="true" size={19} />
              </span>
              <p className="resume-date">
                {item.startYear ? `${item.startYear} – ` : ''}{item.endYear}
              </p>
              <h3>{item.degree}</h3>
              <p className="resume-organization">{item.institution}</p>
              {item.field ? <p className="resume-description">{item.field}</p> : null}
              {item.grade ? (
                <p className="education-grade">
                  <span>{gradeLabel}</span> {item.grade}
                </p>
              ) : null}
              {item.description ? <p className="resume-description">{item.description}</p> : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
