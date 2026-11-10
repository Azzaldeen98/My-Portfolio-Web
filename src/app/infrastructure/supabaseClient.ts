import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type {
  CategoryRow,
  Database,
  EducationRow,
  ExperienceRow,
  HomepageData,
  Locale,
  LocalizedSkill,
  LocalizedCategory,
  LocalizedEducation,
  LocalizedExperience,
  LocalizedProfile,
  LocalizedProject,
  LocalizedService,
  ProjectImage,
  ProjectImageRow,
  ProfileRow,
  ProjectRow,
  ServiceRow,
  SkillCategoryRow,
  SkillRow,
  SkillRowWithCategoryId,
  SocialLinkRow,
} from '@/app/core/domain/types';

let client: SupabaseClient<Database> | undefined;

function getSupabaseClient(): SupabaseClient<Database> {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    );
  }

  client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return client;
}

function throwQueryError(resource: string, message: string): never {
  throw new Error(`Failed to load ${resource} from Supabase: ${message}`);
}

function localizedValue(
  locale: Locale,
  arabicValue: string,
  englishValue: string,
): string {
  return locale === 'ar' ? arabicValue : englishValue;
}

function isSkillRowWithCategoryId(value: unknown): value is SkillRowWithCategoryId {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    typeof row.name === 'string' &&
    (typeof row.category_id === 'string' || row.category_id === null) &&
    (typeof row.icon_name === 'string' || row.icon_name === null) &&
    typeof row.proficiency === 'number' &&
    typeof row.sort_order === 'number' &&
    typeof row.created_at === 'string'
  );
}

function normalizeSkillRowsWithCategoryId(data: unknown): SkillRow[] {
  if (!Array.isArray(data) || !data.every(isSkillRowWithCategoryId)) {
    throw new Error('Supabase returned skills with an unexpected category_id row shape.');
  }

  return data.map(({ category_id, ...skill }) => ({
    ...skill,
    skill_category_id: category_id,
  }));
}

function isMissingSkillCategoryColumn(error: { code: string; message: string }): boolean {
  return (
    (error.code === '42703' || error.code === 'PGRST204') &&
    error.message.includes('skill_category_id')
  );
}

export async function getProfile(locale: Locale): Promise<LocalizedProfile | null> {
  const { data, error } = await getSupabaseClient()
    .from('profile')
    .select(
      'id,full_name_ar,full_name_en,headline_ar,headline_en,bio_ar,bio_en,years_experience,projects_completed,avatar_url,cv_url_ar,cv_url_en,updated_at',
    )
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throwQueryError('profile', error.message);
  }

  if (!data) {
    return null;
  }

  const profile: ProfileRow = data;
  return {
    id: profile.id,
    fullName: localizedValue(locale, profile.full_name_ar, profile.full_name_en),
    headline: localizedValue(locale, profile.headline_ar, profile.headline_en),
    bio: localizedValue(locale, profile.bio_ar, profile.bio_en),
    yearsExperience: profile.years_experience,
    projectsCompleted: profile.projects_completed,
    avatarUrl: profile.avatar_url,
    cvUrl: locale === 'ar' ? profile.cv_url_ar : profile.cv_url_en,
  };
}

export async function getCategories(locale: Locale): Promise<LocalizedCategory[]> {
  const { data, error } = await getSupabaseClient()
    .from('categories')
    .select('id,slug,name_ar,name_en,sort_order,created_at')
    .order('sort_order', { ascending: true });

  if (error) {
    throwQueryError('categories', error.message);
  }

  return ((data ?? []) satisfies CategoryRow[]).map((category) => ({
    id: category.id,
    slug: category.slug,
    name: localizedValue(locale, category.name_ar, category.name_en),
    sortOrder: category.sort_order,
  }));
}

export async function getProjects(locale: Locale): Promise<LocalizedProject[]> {
  const { data, error } = await getSupabaseClient()
    .from('projects')
    .select(
      'id,title_ar,title_en,description_ar,description_en,image_url,github_url,demo_url,technologies,category_id,is_featured,sort_order,created_at',
    )
    .eq('is_featured', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throwQueryError('projects', error.message);
  }

  const projects = (data ?? []) satisfies ProjectRow[];
  const projectIds = projects.map((project) => project.id);
  const imagesByProjectId = new Map<string, ProjectImage[]>();

  if (projectIds.length > 0) {
    const { data: imageData, error: imageError } = await getSupabaseClient()
      .from('project_images')
      .select('id,project_id,image_url,caption_ar,caption_en,sort_order')
      .in('project_id', projectIds)
      .order('sort_order', { ascending: true });

    if (imageError) {
      throwQueryError('project images', imageError.message);
    }

    for (const image of (imageData ?? []) satisfies ProjectImageRow[]) {
      const projectImages = imagesByProjectId.get(image.project_id) ?? [];
      projectImages.push({
        id: image.id,
        imageUrl: image.image_url,
        caption: locale === 'ar' ? image.caption_ar : image.caption_en,
        sortOrder: image.sort_order,
      });
      imagesByProjectId.set(image.project_id, projectImages);
    }
  }

  return projects.map((project) => ({
    id: project.id,
    title: localizedValue(locale, project.title_ar, project.title_en),
    description: localizedValue(locale, project.description_ar, project.description_en),
    imageUrl: project.image_url,
    githubUrl: project.github_url,
    demoUrl: project.demo_url,
    technologies: project.technologies,
    categoryId: project.category_id,
    isFeatured: project.is_featured,
    sortOrder: project.sort_order,
    images: imagesByProjectId.get(project.id) ?? [],
  }));
}

export async function getEducation(locale: Locale): Promise<LocalizedEducation[]> {
  const { data, error } = await getSupabaseClient()
    .from('education')
    .select(
      'id,degree_ar,degree_en,institution_ar,institution_en,field_ar,field_en,grade_ar,grade_en,start_year,end_year,description_ar,description_en,sort_order,created_at',
    )
    .order('sort_order', { ascending: true });

  if (error) {
    throwQueryError('education', error.message);
  }

  return ((data ?? []) satisfies EducationRow[]).map((education) => ({
    id: education.id,
    degree: localizedValue(locale, education.degree_ar, education.degree_en),
    institution: localizedValue(locale, education.institution_ar, education.institution_en),
    field: locale === 'ar' ? education.field_ar : education.field_en,
    grade: locale === 'ar' ? education.grade_ar : education.grade_en,
    startYear: education.start_year,
    endYear: education.end_year,
    description: locale === 'ar' ? education.description_ar : education.description_en,
    sortOrder: education.sort_order,
  }));
}

export async function getExperiences(locale: Locale): Promise<LocalizedExperience[]> {
  const { data, error } = await getSupabaseClient()
    .from('experiences')
    .select(
      'id,title_ar,title_en,company_ar,company_en,location_ar,location_en,start_date,end_date,is_current,description_ar,description_en,technologies,sort_order,created_at',
    )
    .order('sort_order', { ascending: true });

  if (error) {
    throwQueryError('experiences', error.message);
  }

  return ((data ?? []) satisfies ExperienceRow[]).map((experience) => ({
    id: experience.id,
    title: localizedValue(locale, experience.title_ar, experience.title_en),
    company: localizedValue(locale, experience.company_ar, experience.company_en),
    location: locale === 'ar' ? experience.location_ar : experience.location_en,
    startDate: experience.start_date,
    endDate: experience.end_date,
    isCurrent: experience.is_current,
    description: localizedValue(
      locale,
      experience.description_ar,
      experience.description_en,
    ),
    technologies: experience.technologies ?? [],
    sortOrder: experience.sort_order,
  }));
}

export async function getSkills(locale: Locale): Promise<LocalizedSkill[]> {
  const supabase = getSupabaseClient();
  const [
    { data: categoryData, error: categoryError },
    { data: skillData, error: skillError },
  ] = await Promise.all([
    supabase
      .from('skill_categories')
      .select('id,name_ar,name_en,slug,sort_order,is_active,created_at')
      .order('sort_order', { ascending: true }),
    supabase
      .from('skills')
      .select('id,name,skill_category_id,icon_name,proficiency,sort_order,created_at')
      .order('sort_order', { ascending: true }),
  ]);

  if (categoryError) {
    throwQueryError('skill categories', categoryError.message);
  }

  let skills: SkillRow[];
  if (skillError) {
    if (!isMissingSkillCategoryColumn(skillError)) {
      throwQueryError('skills', skillError.message);
    }

    const { data: alternateSkillData, error: alternateSkillError } = await supabase
      .from('skills')
      .select('id,name,category_id,icon_name,proficiency,sort_order,created_at')
      .order('sort_order', { ascending: true });

    if (alternateSkillError) {
      throwQueryError('skills', alternateSkillError.message);
    }

    skills = normalizeSkillRowsWithCategoryId(alternateSkillData);
  } else {
    skills = (skillData ?? []) satisfies SkillRow[];
  }

  const categoryNames = new Map(
    ((categoryData ?? []) satisfies SkillCategoryRow[]).map((category) => [
      category.id,
      localizedValue(locale, category.name_ar, category.name_en),
    ]),
  );

  return skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    categoryId: skill.skill_category_id,
    categoryName: skill.skill_category_id
      ? categoryNames.get(skill.skill_category_id) ?? null
      : null,
    icon_name: skill.icon_name,
    proficiency: skill.proficiency,
    sort_order: skill.sort_order,
  }));
}

export async function getServices(locale: Locale): Promise<LocalizedService[]> {
  const { data, error } = await getSupabaseClient()
    .from('services')
    .select('id,title_ar,title_en,description_ar,description_en,icon_name,sort_order,created_at')
    .order('sort_order', { ascending: true });

  if (error) {
    throwQueryError('services', error.message);
  }

  return ((data ?? []) satisfies ServiceRow[]).map((service) => ({
    id: service.id,
    title: localizedValue(locale, service.title_ar, service.title_en),
    description: localizedValue(locale, service.description_ar, service.description_en),
    iconName: service.icon_name,
    sortOrder: service.sort_order,
  }));
}

export async function getSocialLinks(): Promise<SocialLinkRow[]> {
  const { data, error } = await getSupabaseClient()
    .from('social_links')
    .select('id,platform_name,icon_name,url,sort_order,created_at')
    .order('sort_order', { ascending: true });

  if (error) {
    throwQueryError('social links', error.message);
  }

  return (data ?? []) satisfies SocialLinkRow[];
}

export async function getHomepageData(locale: Locale): Promise<HomepageData> {
  const [
    profile,
    categories,
    projects,
    education,
    experiences,
    skills,
    services,
    socialLinks,
  ] = await Promise.all([
    getProfile(locale),
    getCategories(locale),
    getProjects(locale),
    getEducation(locale),
    getExperiences(locale),
    getSkills(locale),
    getServices(locale),
    getSocialLinks(),
  ]);

  return {
    profile,
    categories,
    projects,
    education,
    experiences,
    skills,
    services,
    socialLinks,
  };
}
