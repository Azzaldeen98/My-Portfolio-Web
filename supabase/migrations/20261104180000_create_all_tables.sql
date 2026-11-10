-- -- أولاً: حذف الجداول القديمة إذا كانت موجودة بالترتيب الصحيح لتجنب تعارض المفاتيح الأجنبية
-- DROP TABLE IF EXISTS public.projects CASCADE;
-- DROP TABLE IF EXISTS public.categories CASCADE;
-- DROP TABLE IF EXISTS public.skills CASCADE;
-- DROP TABLE IF EXISTS public.services CASCADE;
-- DROP TABLE IF EXISTS public.profile CASCADE;
-- DROP TABLE IF EXISTS public.education CASCADE;
-- DROP TABLE IF EXISTS public.social_links CASCADE;
-- DROP TABLE IF EXISTS public.experiences CASCADE;


-- 1. جدول التصنيفات الديناميكية (Categories)
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL, 
    name_ar VARCHAR(100) NOT NULL,    
    name_en VARCHAR(100) NOT NULL,    
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. جدول المشاريع (Projects) مع ربطه بجدول التصنيفات
CREATE TABLE public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    image_url TEXT NOT NULL,
    github_url TEXT,
    demo_url TEXT,
    technologies TEXT[] NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL, 
    is_featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,                  -- مسار الصورة في Supabase Storage
    caption_ar VARCHAR(255),                  -- تعليق توضيحي بالعربية (اختياري)
    caption_en VARCHAR(255),                  -- تعليق توضيحي بالإنجليزية (اختياري)
    sort_order INT DEFAULT 0,                 -- للتحكم بترتيب عرض الصور في المعرض
    is_active BOOLEAN DEFAULT TRUE,           -- تفعيل أو إخفاء الصورة
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. فئات المهارات
CREATE TABLE public.skill_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. جدول المهارات والتقنيات (Skills)
CREATE TABLE public.skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    skill_category_id UUID REFERENCES public.skill_categories(id) ON DELETE SET NULL,
    icon_name VARCHAR(100), 
    proficiency INT DEFAULT 80, 
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. جدول الخدمات (Services)
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    icon_name VARCHAR(100),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. جدول نبذة والبيانات الشخصية (Profile / Bio) مع دعم الصورة الشخصية والـ CV
CREATE TABLE public.profile (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name_ar VARCHAR(255) NOT NULL,
    full_name_en VARCHAR(255) NOT NULL,
    headline_ar VARCHAR(255) NOT NULL,
    headline_en VARCHAR(255) NOT NULL,
    bio_ar TEXT NOT NULL,
    bio_en TEXT NOT NULL,
    years_experience INT DEFAULT 0,
    projects_completed INT DEFAULT 0,
    avatar_url TEXT,    -- رابط الصورة الشخصية المرفوعة في الـ assets bucket
    cv_url_ar TEXT,     -- رابط ملف الـ PDF الخاص بالنسخة العربية
    cv_url_en TEXT,     -- رابط ملف الـ PDF الخاص بالنسخة الإنجليزية
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. جدول التعليم والشهادات الأكاديمية (Education & Degrees) متضمنًا التقدير
CREATE TABLE public.education (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    degree_ar VARCHAR(255) NOT NULL,      -- الدرجة العلمية بالعربي مثل: 'بكالوريوس'
    degree_en VARCHAR(255) NOT NULL,      -- الدرجة العلمية بالإنجليزي مثل: 'Bachelor'
    institution_ar VARCHAR(255) NOT NULL, -- اسم الجامعة بالعربي
    institution_en VARCHAR(255) NOT NULL, -- اسم الجامعة بالإنجليزي
    field_ar VARCHAR(255),                -- التخصص الدقيق بالعربي
    field_en VARCHAR(255),                -- التخصص الدقيق بالإنجليزي
    grade_ar VARCHAR(100),                -- التقدير أو المعدل بالعربي مثل: 'ممتاز مع مرتبة الشرف' أو 'GPA: 3.8/4.0'
    grade_en VARCHAR(100),                -- التقدير أو المعدل بالإنجليزي مثل: 'Excellent with Honors'
    start_year VARCHAR(10),               -- سنة البدء
    end_year VARCHAR(10) NOT NULL,        -- سنة التخرج
    description_ar TEXT,                  -- نبذة أو مشروع التخرج بالعربي
    description_en TEXT,                  -- نبذة أو مشروع التخرج بالإنجليزي
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. جدول وسائل التواصل الاجتماعي وروابط الاتصال (Social Links & Contacts)
CREATE TABLE public.social_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform_name VARCHAR(50) NOT NULL, 
    icon_name VARCHAR(100) NOT NULL,    
    url TEXT NOT NULL,                  
    sort_order INT DEFAULT 0,           
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. جدول الخبرات المهنية والعمل الحر (Work Experience & Career Timeline)
CREATE TABLE public.experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title_ar VARCHAR(255) NOT NULL,       -- المسمى الوظيفي بالعربي مثل: 'مطور برمجيات أول' أو 'مطور تطبيقات موبايل حر'
    title_en VARCHAR(255) NOT NULL,       -- المسمى الوظيفي بالإنجليزي مثل: 'Senior Full-Stack Developer'
    company_ar VARCHAR(255) NOT NULL,     -- اسم الشركة أو جهة العمل (أو 'عمل حر / Freelance') بالعربي
    company_en VARCHAR(255) NOT NULL,     -- اسم الشركة بالإنجليزي
    location_ar VARCHAR(100),             -- مكان العمل بالعربي (مثل: 'عن بُعد / اليمن' أو اسم المدينة)
    location_en VARCHAR(100),             -- مكان العمل بالإنجليزي
    start_date VARCHAR(50) NOT NULL,      -- تاريخ البدء (مثل: 'يناير 2023' أو '2023')
    end_date VARCHAR(50),                 -- تاريخ الانتهاء (مثل: 'الآن' أو 'Present' أو 'ديسمبر 2024')
    is_current BOOLEAN DEFAULT false,     -- هل هي الوظيفة الحالية؟
    description_ar TEXT NOT NULL,         -- المهام والإنجازات بالعربي
    description_en TEXT NOT NULL,         -- المهام والإنجازات بالإنجليزي
    technologies TEXT[],                  -- التقنيات المستخدمة في هذه الوظيفة
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- تفعيل سياسات الأمان للقراءة العامة (Row Level Security - RLS) لكل الجداول
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات السماح بالقراءة العامة لجميع الزوار
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skill Categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Social Links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);