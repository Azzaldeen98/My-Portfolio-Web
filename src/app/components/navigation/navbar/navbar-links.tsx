import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { NavLink } from './nav-link';

const SECTION_HREFS = ['#about', '#services', '#contact'] as const;

type NavbarLinksProps = {
  mode: 'desktop' | 'mobile';
  onNavigate?: () => void;
};

export function NavbarLinks({ mode, onNavigate }: NavbarLinksProps) {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const links = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('services'), href: '/services' },
    { label: t('contact'), href: '/contact' },
  ];
  const isMobile = mode === 'mobile';
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const sections = SECTION_HREFS
      .map((href) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.3;
      const currentSection = [...sections]
        .reverse()
        .find((section) => section.getBoundingClientRect().top <= activationLine);

      setActiveSection(currentSection ? `#${currentSection.id}` : null);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [pathname]);

  return (
    <nav
      aria-label="Primary navigation"
      className={
        isMobile
          ? 'flex flex-col gap-3'
          : 'hidden md:flex items-center gap-8'
      }
    >
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          mode={mode}
          isActive={
            pathname === link.href ||
            (pathname === '/' &&
              (activeSection === link.href ||
                (link.href === '/' && activeSection === null)))
          }
          onNavigate={isMobile ? onNavigate : undefined}
        />
      ))}
    </nav>
  );
}
