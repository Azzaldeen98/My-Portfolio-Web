This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase setup

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
The homepage reads all eight portfolio tables and requires one row in `profile`.

Apply the SQL in
[`supabase/migrations/20261104180000_create_experiences.sql`](./supabase/migrations/20261104180000_create_experiences.sql)
to the configured Supabase project if the `experiences` table is missing. It enables
public read-only access for that table and refreshes the PostgREST schema cache.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


<!-- 

Adhering to the engineering standards and rigorous design rules outlined in the `AGENTS.md` file (Next.js App Router, `[locale]` routing, strict TypeScript—with no usage of the `any` type—semantic design tokens, and Clean Architecture), you are required to develop the complete code for the homepage (Body/Main Content Area) and its associated Supabase-integrated components, with full support for both Arabic (RTL) and English (LTR) languages.

⚠️ **Critical Implementation Rule (Step-by-Step Verification & Testing):**

- Build the project and test each step or software layer incrementally (e.g., defining TypeScript types, then implementing Server Actions, followed by UI components). This ensures that there are no TypeScript errors, build issues, or Supabase query failures before proceeding to the next stage.
- Ensure the codebase is entirely free of runtime errors and ESLint warnings.

🛡️ **Empty Database Safeguard:** 
The 8 database tables are successfully created and ready in Supabase, but they are currently empty. All data-fetching functions and UI components MUST implement graceful fallback handling (e.g., returning empty arrays `[]` or default null values) to ensure the homepage renders cleanly without throwing errors or crashing when tables have no data.

### Supabase Schema Reference (All 8 Tables):
Data-fetching queries and TypeScript interface definitions must strictly match the following fields:
1. `profile`: id, full_name_ar, full_name_en, headline_ar, headline_en, bio_ar, bio_en, years_experience, projects_completed, avatar_url, cv_url_ar, cv_url_en, updated_at
2. `categories`: id, slug, name_ar, name_en, sort_order, created_at
3. `projects`: id, title_ar, title_en, description_ar, description_en, image_url, github_url, demo_url, technologies (TEXT[]), category_id (FK), is_featured, sort_order, created_at

4. `education`: id, degree_ar, degree_en, institution_ar, institution_en, field_ar, field_en, grade_ar, grade_en, start_year, end_year, description_ar, description_en, sort_order, created_at
5. `experiences`: id, title_ar, title_en, company_ar, company_en, location_ar, location_en, start_date, end_date, is_current, description_ar, description_en, technologies (TEXT[]), sort_order, created_at
6. `skills`: id, name, category, icon_name, proficiency, sort_order, created_at
7. `services`: id, title_ar, title_en, description_ar, description_en, icon_name, sort_order, created_at
8. `social_links`: id, platform_name, icon_name, url, sort_order, created_at
9. `project_images`: id, project_id, image_url, caption_ar, caption_en, sort_order, created_at

### Required Tasks:
1. **Data-Fetching Layer (Server Actions / Data Layer):**
   - Create independent functions to fetch data from the eight tables, incorporating logic to handle the `locale` dynamically in order to retrieve the appropriate fields (e.g., `_ar` or `_en`).
2. **TypeScript Interfaces (Types):**
   - Define all types and interfaces with complete precision; the use of `any` is strictly prohibited.
3. **Development of Main Page Components (Body Components & UI):**
   - **Hero Section:** Fetch and display the name, bio, and profile picture (`avatar_url`), incorporating neon lighting effects and dynamic buttons for downloading the CV (`cv_url_ar`/`cv_url_en`). 
   - **About & Stats:** Display key statistics (years of experience, completed projects) alongside a professional biography. 
   - **Work Experience Timeline:** Present professional and freelance experience—fetched from the `experiences` table—within an elegant, timeline-based layout. 
   - **Education & Academic Background:** Showcase academic qualifications, including the university, field of study, and grade/distinction (`grade_ar/en`). 
   - **Featured Projects & Filtering:** Implement an advanced project grid featuring a dynamic filtering system based on `categories`. 
   - **Skills & Services:** Display technical skills and professional services, complete with corresponding icons and proficiency levels.
4. **Animation & Design:**
   - Utilize Framer Motion to ensure smooth, scroll-triggered element reveals (Scroll Reveal). 
   - Strictly adhere to semantic design tokens (e.g., `bg-app`, `bg-surface`, `text-content-main`, `text-primary`, `border-border-main`); the use of hardcoded, static color values ​​is prohibited.

Please draft the files and outline the implementation methodology step-by-step, ensuring the integrity of each code segment before proceeding to the next.


بناءً على المعايير الهندسية وقواعد التصميم الصارمة الواردة في ملف AGENTS.md (Next.js App Router, [locale] routing, strict TypeScript بدون أي استخدام لـ any، semantic design tokens، Clean Architecture)، مطلوب منك كتابة وتطوير كامل كود الصفحة الرئيسية (Body / Main Content Area) ومكوناتها المرتبطة بـ Supabase مع دعم كامل للغتين (العربية RTL والإنجليزية LTR).

⚠️ **قاعدة حرجة جداً أثناء التنفيذ (Step-by-Step Verification & Testing):**
- قم ببناء المشروع واختبار كل خطوة أو طبقة برمجية (مثلاً: تعريفات الـ Types ثم الـ Server Actions ثم مكونات العرض) بشكل تدريجي لضمان عدم وجود أخطاء في الـ TypeScript، أو مشاكل في الـ Build، أو أخطاء في استعلامات Supabase قبل الانتقال للخطوة التالية.
- تأكد من خلو الكود تماماً من أي أخطاء وقت التشغيل (Runtime Errors) أو تحذيرات الـ ESLint.

### مرجع جداول قاعدة البيانات الثمانية (Supabase Schema Reference):
يجب أن تتطابق استعلامات جلب البيانات وتعريفات الـ TypeScript Interfaces بدقة مع الحقول التالية:
1. `profile`: id, full_name_ar, full_name_en, headline_ar, headline_en, bio_ar, bio_en, years_experience, projects_completed, avatar_url, cv_url_ar, cv_url_en
2. `categories`: id, slug, name_ar, name_en, sort_order
3. `projects`: id, title_ar, title_en, description_ar, description_en, image_url, github_url, demo_url, technologies (TEXT[]), category_id (FK), is_featured, sort_order
4. `education`: id, degree_ar, degree_en, institution_ar, institution_en, field_ar, field_en, grade_ar, grade_en, start_year, end_year, description_ar, description_en, sort_order
5. `experiences`: id, title_ar, title_en, company_ar, company_en, location_ar, location_en, start_date, end_date, is_current, description_ar, description_en, technologies (TEXT[]), sort_order
6. `skills`: id, name, category, icon_name, proficiency, sort_order
7. `services`: id, title_ar, title_en, description_ar, description_en, icon_name, sort_order
8. `social_links`: id, platform_name, icon_name, url, sort_order

### المهام المطلوبة للتنفيذ:
1. **طبقة جلب البيانات (Server Actions / Data Layer):** 
   - إنشاء الدوال البرمجية المستقلة لجلب البيانات من الجداول الثمانية مع التعامل الذكي مع الـ locale لجلب الحقول المناسبة (_ar / _en).
2. **واجهات TypeScript (Types):**
   - تعريف كافة الأنواع والـ Interfaces بدقة تامة ومنع استخدام `any` نهائياً.
3. **تطوير مكونات الصفحة الرئيسية (Body Components & UI):**
   - **Hero Section:** جلب الاسم، النبذة، والصورة الشخصية (`avatar_url`) مع تأثيرات إضاءة نيون وأزرار تحميل الـ CV ديناميكياً.
   - **About & Stats:** عرض الإحصائيات (سنوات الخبرة والمشاريع المكتملة) والنبذة التعريفية.
   - **Work Experience Timeline:** عرض الخبرات المهنية والعمل الحر المجلوبة من جدول `experiences` بتصميم مسار زمني أنيق.
   - **Education & Academic Background:** عرض المؤهلات والجامعة والتخصص والتقدير (`grade_ar/en`).
   - **Featured Projects & Filtering:** شبكة مشاريع متطورة مع نظام فلترة ديناميكي حسب `categories`.
   - **Skills & Services:** عرض المهارات والخدمات الهندسية بأيقوناتها ونسب الإتقان.
4. **الأنيميشن والتصميم:**
   - استخدام Framer Motion لظهور العناصر بسلاسة (Scroll Reveal).
   - الالتزام التام بتوكنات التصميم الدلالية (`bg-app`, `bg-surface`, `text-content-main`, `text-primary`, `border-border-main`) ومنع استخدام أي ألوان ثابتة مباشرة.

يرجى كتابة الملفات ومنهجية التنفيذ خطوة بخطوة مع التأكد من سلامة كل جزء برمجي قبل الانتقال لما يلي. -->