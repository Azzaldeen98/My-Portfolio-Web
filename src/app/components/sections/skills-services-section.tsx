import { ArrowUpRight } from 'lucide-react';
import type { LocalizedService, SkillRow } from '@/app/core/domain/types';
import { Reveal } from './reveal';
import { SkillExplorer } from './skill-explorer';
import { getPortfolioIcon } from './portfolio-icon';

interface SkillsServicesSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  skills: SkillRow[];
  categoriesLabel: string;
  proficiencyLabel: string;
  emptySkillsLabel: string;
  categoryLabels: Readonly<Record<string, string>>;
  servicesEyebrow: string;
  servicesTitle: string;
  services: LocalizedService[];
}

export function SkillsServicesSection({
  eyebrow,
  title,
  description,
  skills,
  categoriesLabel,
  proficiencyLabel,
  emptySkillsLabel,
  categoryLabels,
  servicesEyebrow,
  servicesTitle,
  services,
}: SkillsServicesSectionProps) {
  return (
    <>
      <section
        id="skills"
        className="portfolio-section skills-section"
        aria-labelledby="skills-title"
      >
        <Reveal className="skills-intro">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 id="skills-title" className="section-title">{title}</h2>
          <p className="section-description">{description}</p>
        </Reveal>
        <Reveal className="skills-explorer-wrap" delay={0.12}>
          <SkillExplorer
            skills={skills}
            categoriesLabel={categoriesLabel}
            proficiencyLabel={proficiencyLabel}
            emptyLabel={emptySkillsLabel}
            categoryLabels={categoryLabels}
          />
        </Reveal>
      </section>

      <section
        id="services"
        className="portfolio-section services-section"
        aria-labelledby="services-title"
      >
        <Reveal className="services-header">
          <div>
            <span className="section-eyebrow">{servicesEyebrow}</span>
            <h2 id="services-title" className="section-title">{servicesTitle}</h2>
          </div>
        </Reveal>
        <div className="services-list">
          {services.map((service, index) => {
            const Icon = getPortfolioIcon(service.iconName);
            return (
              <Reveal key={service.id} delay={index * 0.08}>
                <article className="service-row">
                  <span className="service-row-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="service-row-icon">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <div className="service-row-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <ArrowUpRight className="service-row-arrow" aria-hidden="true" size={18} />
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
