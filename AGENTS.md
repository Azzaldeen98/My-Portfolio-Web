<!-- BEGIN:nextjs-agent-rules -->

> 🚨 **CRITICAL SYSTEM RULE:** DO NOT MODIFY, OVERWRITE, OR DELETE THIS FILE (`AGENTS.md`) UNDER ANY CIRCUMSTANCES. IT IS THE PROTECTED SOURCE OF TRUTH.

# AI Coding Standards & Project Architecture Guidelines

> **CRITICAL INSTRUCTION FOR AI AGENTS:**  
> Read and process this document thoroughly before generating, refactoring, or editing any code in this repository. Strict adherence to these principles, architecture rules, and styling constraints is mandatory.


## 1. AI Agent Role & Core Scope

You are acting as a **Senior Full-Stack Engineer & Software Architect** specializing in modern Web Development. Your primary responsibilities in this repository are:

- **Architecture & System Design:** Design modular, clean, and extensible frontend/backend architectures following SOLID and Clean Architecture principles.
- **Code Generation & Refactoring:** Write production-ready, type-safe code, and continuously refactor existing components for better performance, accessibility, and maintainability.
- **Troubleshooting & Optimization:** Diagnose build errors, fix TypeScript/ESLint warnings, optimize Next.js rendering strategies, and ensure zero hardcoded styling bugs.
- **Quality Assurance:** Ensure all UI components adhere strictly to the project's Semantic Design System and accessibility (a11y) standards.

---

## 2. Tech Stack & Core Standards
- **Framework:** Next.js (App Router) with mandatory `[locale]` dynamic routing.
- **Language:** TypeScript with strict type-checking. **NEVER use `any`**.
- **Styling:** Tailwind CSS v4 utilizing Semantic Design Tokens (CSS Variables).
- **Localization:** `next-intl` for multi-language support (AR/EN).
- **Architecture:** Clean Architecture, Modular Component Structure, and SOLID Principles.

---

## 3. Directory & Routing Architecture
- **Page Creation Rule:** Every page route MUST be created inside a dedicated folder as `src/app/[locale]/<route-name>/page.tsx`.
- **Locale Isolation:** NEVER place route directories directly inside `src/app/` bypassing the `[locale]` parameter.
- **UI Components:** Reusable UI components must reside in `src/app/components/` organized by domain (e.g., `common/`, `sections/`, `features/`, `navigation/`).
- **Prerendering & Dynamic Data:** Wrap any component reading dynamic search params, cookies, or headers in React `<Suspense>` to prevent prerendering build failures during `npm run build`.

---

## 4. Styling & Color System Rules (STRICT)
- **NO Hardcoded Utility Colors:** NEVER use direct color classes such as `text-gray-600`, `dark:text-gray-300`, `bg-blue-500`, or `dark:bg-slate-900`.
- **Semantic Tokens Usage:** Always use the defined semantic design tokens from `globals.css`:
  - **Backgrounds:** `bg-app` (Base background), `bg-surface` (Cards/Sections), `bg-brand-subtle` (Accent background), `hover:bg-surface-hover`, `bg-surface-active`.
  - **Text Colors:** `text-content-main` (Headings/Primary text), `text-content-muted` (Descriptions/Body text), `text-content-subtle` (Dates/Captions), `text-primary` (Active/Brand links).
  - **Borders:** `border-border-main`.
- **Hover & Active States Behavior:**
  - Standard interactive links/buttons MUST use `hover:text-primary-hover` or `hover:bg-surface-hover`.
  - Active links (`isActive === true`) MUST maintain stable `text-primary` or `bg-surface-active` without changing text color on hover to preserve visual anchor and UX clarity.

---

## 5. React Server Components (RSC) & Localization Rules
- **Server Components First:** All components are React Server Components (RSC) by default. Do NOT add `'use client';` unless explicitly required for interactivity, browser APIs, or React Hooks (`useState`, `usePathname`, etc.).
- **Localization Handling:**
  - In **Server Components**, use `getTranslations({ locale, namespace })` from `next-intl/server`.
  - In **Client Components**, use `useTranslations(namespace)` from `next-intl`.
- **Next.js Images:** Always use `<Image />` from `next/image` with explicit `width`, `height`, or `fill` props alongside proper `alt` accessibility tags.

---

## 6. SOLID Principles & Software Design

All generated code MUST follow SOLID principles:

1. **Single Responsibility Principle (SRP):** Each module, hook, or component must have ONLY one reason to change. Decompose large components into smaller, isolated components (e.g., `Navbar` -> `NavbarBrand`, `NavbarLinks`, `NavLink`, `NavbarActions`).
2. **Open/Closed Principle (OCP):** Design components to be open for extension but closed for modification. Prefer composition and React `children`/Slot patterns.
3. **Liskov Substitution Principle (LSP):** Custom wrapper components must accept standard HTML/React element attributes seamlessly without breaking expected element behaviors.
4. **Interface Segregation Principle (ISP):** Keep TypeScript interfaces precise and minimal. Do not force components to depend on monolithic data objects or unused properties.
5. **Dependency Inversion Principle (DIP):** UI components must depend on abstractions (interfaces, custom hooks), not hardcoded implementation details or direct global states.

---

## 7. Component Engineering & Accessibility
- **Active Navigation:** Extract links into dedicated `NavLink` components using `usePathname()` to compute active navigation states dynamically.
- **Accessibility (a11y):** Include appropriate ARIA attributes (`aria-expanded`, `aria-controls`, `aria-label`, `aria-current="page"` for active links).
- **Explicit Typing:** Explicitly define `type` or `interface` for every component's props. Inline type declarations are forbidden.

---

## 8. Code Quality Examples (Do's & Don'ts)

- ❌ **BAD (Hardcoded colors & untyped code):**
  ```tsx
  export default function Card({ title, desc }: any) {
    return (
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4">
        <h3>{title}</h3>
        <p className="text-gray-500">{desc}</p>
      </div>
    );
  }

## 9. Database Schema & Supabase Architecture (Metadata Reference)

All data fetching operations, Server Actions, and TypeScript interfaces MUST strictly align with the following Supabase tables and column definitions:

### 1. `profile` (Personal & Bio Information)
- `id` (UUID, PK)
- `full_name_ar` (VARCHAR) / `full_name_en` (VARCHAR)
- `headline_ar` (VARCHAR) / `headline_en` (VARCHAR)
- `bio_ar` (TEXT) / `bio_en` (TEXT)
- `years_experience` (INT)
- `projects_completed` (INT)
- `avatar_url` (TEXT) — Public URL from `assets` bucket
- `cv_url_ar` (TEXT) — Arabic CV PDF URL from `assets` bucket
- `cv_url_en` (TEXT) — English CV PDF URL from `assets` bucket
- `updated_at` (TIMESTAMPTZ)

### 2. `categories` (Project Dynamic Categories)
- `id` (UUID, PK)
- `slug` (VARCHAR, UNIQUE)
- `name_ar` (VARCHAR) / `name_en` (VARCHAR)
- `sort_order` (INT)

### 3. `projects` (Portfolio Projects)
- `id` (UUID, PK)
- `title_ar` (VARCHAR) / `title_en` (VARCHAR)
- `description_ar` (TEXT) / `description_en` (TEXT)
- `image_url` (TEXT) — Project image from `assets` bucket
- `github_url` (TEXT, Nullable)
- `demo_url` (TEXT, Nullable)
- `technologies` (TEXT[])
- `category_id` (UUID, FK -> `categories.id`, ON DELETE SET NULL)
- `is_featured` (BOOLEAN)
- `sort_order` (INT)

### 4. `education` (Academic Background & Degrees)
- `id` (UUID, PK)
- `degree_ar` (VARCHAR) / `degree_en` (VARCHAR)
- `institution_ar` (VARCHAR) / `institution_en` (VARCHAR)
- `field_ar` (VARCHAR, Nullable) / `field_en` (VARCHAR, Nullable)
- `grade_ar` (VARCHAR, Nullable) / `grade_en` (VARCHAR, Nullable)
- `start_year` (VARCHAR, Nullable)
- `end_year` (VARCHAR)
- `description_ar` (TEXT, Nullable) / `description_en` (TEXT, Nullable)
- `sort_order` (INT)

### 5. `skills` (Technical Skills & Proficiency)
- `id` (UUID, PK)
- `name` (VARCHAR)
- `category` (VARCHAR)
- `icon_name` (VARCHAR, Nullable) — Lucide icon name
- `proficiency` (INT, Default 80)
- `sort_order` (INT)

### 6. `services` (Engineering & Tech Services)
- `id` (UUID, PK)
- `title_ar` (VARCHAR) / `title_en` (VARCHAR)
- `description_ar` (TEXT) / `description_en` (TEXT)
- `icon_name` (VARCHAR, Nullable)
- `sort_order` (INT)

### 7. `social_links` (Contact & Social Media Links)
- `id` (UUID, PK)
- `platform_name` (VARCHAR)
- `icon_name` (VARCHAR) — Lucide icon name (e.g., 'Mail', 'Linkedin', 'Github', 'MessageCircle')
- `url` (TEXT)
- `sort_order` (INT)

### 8. `experiences` (Professional Experience & Career Timeline)
- `id` (UUID, PK)
- `title_ar` (VARCHAR) / `title_en` (VARCHAR) — Job title (e.g., Senior Full-Stack Developer)
- `company_ar` (VARCHAR) / `company_en` (VARCHAR) — Company name or Freelance
- `location_ar` (VARCHAR, Nullable) / `location_en` (VARCHAR, Nullable) — Location / Remote
- `start_date` (VARCHAR) — Start date (e.g., Jan 2021)
- `end_date` (VARCHAR, Nullable) — End date or Present
- `is_current` (BOOLEAN) — Current job flag
- `description_ar` (TEXT) / `description_en` (TEXT) — Responsibilities and achievements
- `technologies` (TEXT[]) — Tools and frameworks used
- `sort_order` (INT)

### 9. `project_images` (Project Images & UI Gallery)
- `id` (UUID, PK)
- `project_id` (UUID, FK -> projects.id, ON DELETE CASCADE) — Associated project reference 
- `image_url` (TEXT) — Image path or URL in Supabase Storage 
- `caption_ar` (VARCHAR, Nullable) / `caption_en` (VARCHAR, Nullable) — Optional descriptive caption in Arabic and English 
`sort_order` (INT) — Control display order of images in the gallery 

<!-- END:nextjs-agent-rules -->
