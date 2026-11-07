import { ArrowDown, ArrowUpRight, Braces, Code2, Cpu, Download } from 'lucide-react';
import { Reveal } from './reveal';
import { InteractiveCta } from './interactive-cta';
import { AnimatedPortrait } from './animated-portrait';

interface HeroSectionProps {
  greeting: string;
  name: string;
  role: string;
  introduction: string;
  availability: string;
  projectsCta: string;
  contactCta: string;
  downloadCta: string;
  cvUrl: string;
  avatarUrl: string;
  scrollLabel: string;
  visualCaption: string;
  engineeringLabel: string;
  focusLabel: string;
  orbitLabels: string[];
  direction: 'forward' | 'back';
  portraitAlt: string;
  portraitLabel: string;
}

const orbitSkills = [
  { icon: Code2, index: 0 },
  { icon: Cpu, index: 1 },
  { icon: Braces, index: 2 },
] as const;

export function HeroSection({
  greeting,
  name,
  role,
  introduction,
  availability,
  projectsCta,
  contactCta,
  downloadCta,
  cvUrl,
  avatarUrl,
  scrollLabel,
  visualCaption,
  engineeringLabel,
  focusLabel,
  orbitLabels,
  direction,
  portraitAlt,
  portraitLabel,
}: HeroSectionProps) {
  return (
    <section className="portfolio-hero" aria-labelledby="home-title">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="hero-layout">
        <div className="hero-copy">
          <Reveal className="hero-availability">
            <span className="availability-indicator" />
            {availability}
          </Reveal>
          <Reveal delay={0.08}>
            <p className="hero-greeting">{greeting}</p>
            <h1 id="home-title" className="hero-title">
              <span className="hero-name">{name}</span>
              <span className="hero-role">{role}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="hero-introduction">{introduction}</p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.24}>
            <InteractiveCta href="#projects" className="portfolio-button portfolio-button-primary" showDownArrow>
              {projectsCta}
            </InteractiveCta>
            <InteractiveCta
              href="/contact"
              className="portfolio-button portfolio-button-secondary"
              direction={direction}
            >
              {contactCta}
            </InteractiveCta>
            {cvUrl ? (
              <a className="portfolio-button portfolio-button-secondary" href={cvUrl} download>
                <span>{downloadCta}</span>
                <Download className="cta-arrow" aria-hidden="true" size={17} />
              </a>
            ) : null}
          </Reveal>
          <Reveal className="hero-scroll-hint" delay={0.32}>
            <ArrowDown aria-hidden="true" size={15} />
            <span>{scrollLabel}</span>
          </Reveal>
        </div>

        <Reveal className="hero-visual" delay={0.14} distance={12}>
          <div className="hero-visual-glow" />
          <div className="hero-orbit hero-orbit-outer" />
          <div className="hero-orbit hero-orbit-inner" />
          <AnimatedPortrait
            alt={portraitAlt}
            imageUrl={avatarUrl}
            placeholderLabel={portraitLabel}
          />
          {orbitSkills.map(({ icon: Icon, index }) => (
            <div className={`orbit-chip orbit-chip-${index + 1}`} key={orbitLabels[index]}>
              <Icon aria-hidden="true" size={16} />
              <span>{orbitLabels[index]}</span>
            </div>
          ))}
          <span className="visual-caption">{visualCaption}</span>
          <ArrowUpRight className="visual-corner-mark" aria-hidden="true" size={20} />
        </Reveal>
      </div>

      <div className="hero-bottom-line">
        <span>{engineeringLabel}</span>
        <span className="hero-coordinate">{focusLabel}</span>
      </div>
    </section>
  );
}
