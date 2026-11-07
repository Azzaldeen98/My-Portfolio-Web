export type Locale = 'ar' | 'en';

export interface ProfileRow {
  id: string;
  full_name_ar: string;
  full_name_en: string;
  headline_ar: string;
  headline_en: string;
  bio_ar: string;
  bio_en: string;
  years_experience: number;
  projects_completed: number;
  avatar_url: string | null;
  cv_url_ar: string | null;
  cv_url_en: string | null;
  updated_at: string;
}

export interface CategoryRow {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  sort_order: number;
  created_at: string;
}

export interface ProjectRow {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  github_url: string | null;
  demo_url: string | null;
  technologies: string[];
  category_id: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProjectImageRow {
  id: string;
  project_id: string;
  image_url: string;
  caption_ar: string | null;
  caption_en: string | null;
  sort_order: number;
}

export interface EducationRow {
  id: string;
  degree_ar: string;
  degree_en: string;
  institution_ar: string;
  institution_en: string;
  field_ar: string | null;
  field_en: string | null;
  grade_ar: string | null;
  grade_en: string | null;
  start_year: string | null;
  end_year: string;
  description_ar: string | null;
  description_en: string | null;
  sort_order: number;
  created_at: string;
}

export interface ExperienceRow {
  id: string;
  title_ar: string;
  title_en: string;
  company_ar: string;
  company_en: string;
  location_ar: string | null;
  location_en: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description_ar: string;
  description_en: string;
  technologies: string[] | null;
  sort_order: number;
  created_at: string;
}

export interface SkillRow {
  id: string;
  name: string;
  category: string;
  icon_name: string | null;
  proficiency: number;
  sort_order: number;
  created_at: string;
}

export interface ServiceRow {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon_name: string | null;
  sort_order: number;
  created_at: string;
}

export interface SocialLinkRow {
  id: string;
  platform_name: string;
  icon_name: string;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface LocalizedProfile {
  id: string;
  fullName: string;
  headline: string;
  bio: string;
  yearsExperience: number;
  projectsCompleted: number;
  avatarUrl: string | null;
  cvUrl: string | null;
}

export interface LocalizedCategory {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
}

export interface ProjectImage {
  id: string;
  imageUrl: string;
  caption: string | null;
  sortOrder: number;
}

export interface LocalizedProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string | null;
  demoUrl: string | null;
  technologies: string[]; // أو يمكن جلبها من جدول التقنيات الجديد إذا أردت
  categoryId: string | null;
  isFeatured: boolean;
  sortOrder: number;
  images: ProjectImage[];
}

export interface LocalizedEducation {
  id: string;
  degree: string;
  institution: string;
  field: string | null;
  grade: string | null;
  startYear: string | null;
  endYear: string;
  description: string | null;
  sortOrder: number;
}

export interface LocalizedExperience {
  id: string;
  title: string;
  company: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  sortOrder: number;
}

export interface LocalizedService {
  id: string;
  title: string;
  description: string;
  iconName: string | null;
  sortOrder: number;
}

export interface HomepageData {
  profile: LocalizedProfile | null;
  categories: LocalizedCategory[];
  projects: LocalizedProject[];
  education: LocalizedEducation[];
  experiences: LocalizedExperience[];
  skills: SkillRow[];
  services: LocalizedService[];
  socialLinks: SocialLinkRow[];
}

export interface TableDefinition<Row> {
  Row: Row & Record<string, unknown>;
  Insert: Partial<Row> & Record<string, unknown>;
  Update: Partial<Row> & Record<string, unknown>;
  Relationships: [];
}

export interface Database {
  public: {
    Tables: {
      profile: TableDefinition<ProfileRow>;
      categories: TableDefinition<CategoryRow>;
      projects: TableDefinition<ProjectRow>;
      project_images: TableDefinition<ProjectImageRow>;
      education: TableDefinition<EducationRow>;
      experiences: TableDefinition<ExperienceRow>;
      skills: TableDefinition<SkillRow>;
      services: TableDefinition<ServiceRow>;
      social_links: TableDefinition<SocialLinkRow>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
