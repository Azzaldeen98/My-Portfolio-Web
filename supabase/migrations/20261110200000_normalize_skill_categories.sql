CREATE TABLE IF NOT EXISTS public.skill_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.skills
    ADD COLUMN IF NOT EXISTS skill_category_id UUID;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'skills'
          AND column_name = 'category'
    ) THEN
        INSERT INTO public.skill_categories (name_ar, name_en, slug, sort_order)
        SELECT category, category, 'legacy-' || md5(category), row_number() OVER (ORDER BY category) - 1
        FROM (
            SELECT DISTINCT category
            FROM public.skills
            WHERE category IS NOT NULL
        ) AS existing_categories
        ON CONFLICT (slug) DO NOTHING;

        UPDATE public.skills AS skill
        SET skill_category_id = category.id
        FROM public.skill_categories AS category
        WHERE skill.skill_category_id IS NULL
          AND skill.category IS NOT NULL
          AND category.slug = 'legacy-' || md5(skill.category);

        ALTER TABLE public.skills
            DROP COLUMN category;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'skills_skill_category_id_fkey'
          AND conrelid = 'public.skills'::regclass
    ) THEN
        ALTER TABLE public.skills
            ADD CONSTRAINT skills_skill_category_id_fkey
            FOREIGN KEY (skill_category_id)
            REFERENCES public.skill_categories(id)
            ON DELETE SET NULL;
    END IF;
END;
$$;

ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Skill Categories" ON public.skill_categories;
CREATE POLICY "Public Read Skill Categories"
    ON public.skill_categories
    FOR SELECT
    USING (true);
