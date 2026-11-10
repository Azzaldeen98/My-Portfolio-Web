import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { AboutSection } from '@/app/components/sections/about-section';
import { EducationSection } from '@/app/components/sections/education-section';
import { ExperienceSection } from '@/app/components/sections/experience-section';
import { FeaturedProjectsSection } from '@/app/components/sections/featured-projects-section';
import { HeroSection } from '@/app/components/sections/hero-section';
import { SkillsServicesSection } from '@/app/components/sections/skills-services-section';
import { SocialLinksSection } from '@/app/components/sections/social-links-section';
import type { Locale } from '@/app/core/domain/types';
import { getHomepageData } from '@/app/infrastructure/supabaseClient';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}


//-------------------------------------------------------------------------


export default async function HomePage({ params }: HomePageProps) {
  const { locale: routeLocale } = await params;
  if (routeLocale !== 'ar' && routeLocale !== 'en') {
    notFound();
  }

  const locale: Locale = routeLocale;
  // await connection();
  const [t, data] = await Promise.all([
    getTranslations({ locale, namespace: 'Home' }),
    getHomepageData(locale),
  ]);
  const profile = data.profile;
  const bio = profile?.bio || t('about.description');
  const technologies = [...new Set(data.skills.map((skill) => skill.name))];

  return (
    <div className="portfolio-page bg-app text-content-main">
      <HeroSection
        greeting={t('hero.greeting')}
        name={profile?.fullName || t('hero.name')}
        role={profile?.headline || t('hero.role')}
        introduction={bio}
        availability={t('hero.availability')}
        projectsCta={t('hero.projectsCta')}
        contactCta={t('hero.contactCta')}
        downloadCta={t('hero.downloadCta')}
        cvUrl={profile?.cvUrl ?? ''}
        avatarUrl={profile?.avatarUrl ?? ''}
        scrollLabel={t('hero.scrollLabel')}
        visualCaption={t('hero.visualCaption')}
        engineeringLabel={t('hero.engineeringLabel')}
        focusLabel={t('hero.focusLabel')}
        orbitLabels={[t('hero.orbitFullStack') , t('hero.orbitAi'), t('hero.orbitMobile')]}
        direction={locale === 'ar' ? 'back' : 'forward'}
        portraitAlt={t('hero.portraitAlt')}
        portraitLabel={t('hero.portraitLabel')}
      />
      <AboutSection
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        description={bio}
        experienceLabel={t('about.experienceLabel')}
        projectsLabel={t('about.projectsCompletedLabel')}
        yearsExperience={profile?.yearsExperience ?? 0}
        projectsCompleted={profile?.projectsCompleted ?? 0}
        technologiesLabel={t('about.expertiseLabel')}
        technologies={technologies}
      />
      <ExperienceSection
        eyebrow={t('experience.eyebrow')}
        title={t('experience.title')}
        currentLabel={t('experience.currentLabel')}
        emptyLabel={t('experience.emptyLabel')}
        experiences={data.experiences}
      />
      <EducationSection
        eyebrow={t('education.eyebrow')}
        title={t('education.title')}
        gradeLabel={t('education.gradeLabel')}
        emptyLabel={t('education.emptyLabel')}
        education={data.education}
      />
      <FeaturedProjectsSection
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        description={t('projects.description')}
        categories={data.categories}
        projects={data.projects}
        projectCta={t('projects.projectCta')}
        demoLabel={t('projects.demoLabel')}
        githubLabel={t('projects.githubLabel')}
        allLabel={t('projects.allLabel')}
        filterLabel={t('projects.filterLabel')}
        emptyLabel={t('projects.emptyLabel')}
      />
      <SkillsServicesSection
        eyebrow={t('skills.eyebrow')}
        title={t('skills.title')}
        description={t('skills.description')}
        categoriesLabel={t('skills.categoriesLabel')}
        proficiencyLabel={t('skills.proficiencyLabel')}
        emptySkillsLabel={t('skills.emptyLabel')}
        uncategorizedLabel={t('skills.uncategorizedLabel')}
        categoryLabels={{
          backend: t('skills.categories.backend.label'),
          mobile: t('skills.categories.mobile.label'),
          ai: t('skills.categories.ai.label'),
          data: t('skills.categories.data.label'),
          'ai/rag': t('skills.categories.ai.label'),
          'data/apis': t('skills.categories.data.label'),
          'ai & rag': t('skills.categories.ai.label'),
          'data & apis': t('skills.categories.data.label'),
        }}
        skills={data.skills}
        servicesEyebrow={t('services.eyebrow')}
        servicesTitle={t('services.title')}
        services={data.services}
      />
      <SocialLinksSection label={t('social.label')} links={data.socialLinks} />
    </div>
  );
}

//-------------------------------------------------------------------------
