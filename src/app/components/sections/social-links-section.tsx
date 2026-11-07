import type { SocialLinkRow } from '@/app/core/domain/types';
import { getPortfolioIcon } from './portfolio-icon';

interface SocialLinksSectionProps {
  label: string;
  links: SocialLinkRow[];
}

export function SocialLinksSection({ label, links }: SocialLinksSectionProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="portfolio-section social-section" aria-label={label}>
      <h2 className="social-section-label">{label}</h2>
      <ul className="social-links">
        {links.map((link) => {
          const Icon = getPortfolioIcon(link.icon_name);
          return (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noreferrer">
                <Icon aria-hidden="true" size={17} />
                <span>{link.platform_name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
