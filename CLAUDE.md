# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 + Sanity CMS website for **Brainchild Building Solutions**, a building component supply company. The primary business goal is lead generation through contact/quote forms targeting regional builders, custom home contractors, and commercial contractors.

## Development Commands

### Root Level Commands
```bash
# Start both Next.js and Sanity Studio in development
npm run dev

# Start only frontend (Next.js)
npm run dev:next

# Start only Sanity Studio
npm run dev:studio

# Import sample data to Sanity
npm run import-sample-data
```

### Frontend Commands (in /frontend directory)
```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Generate Sanity TypeScript types
npm run typegen
```

### Studio Commands (in /studio directory)
```bash
# Development mode
npm run dev

# Production build
npm run build

# Deploy to Sanity
npm run deploy

# Extract schema types
npm run extract-types
```

## Architecture

### Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4.x + shadcn/ui components
- **CMS**: Sanity v3 with TypeScript
- **Deployment**: Netlify (frontend) + Sanity Cloud (studio)
- **Forms**: Netlify Forms with honeypot spam protection

### Monorepo Structure
- `frontend/` - Next.js application
- `studio/` - Sanity Studio CMS
- Both workspaces managed via npm workspaces

### Key Architecture Patterns

#### Sanity Integration
- Uses `next-sanity` with live queries for real-time updates
- TypeScript types auto-generated from Sanity schemas via `sanity typegen`
- Custom image loader for Sanity assets: `frontend/lib/sanityImageLoader.js`
- Visual editing enabled in draft mode

#### Content Architecture
**Document Types:**
- `homePage` - Homepage content (singleton)
- `aboutPage` - About page content (singleton)
- `contactPage` - Contact page content (singleton)
- `page` - Flexible pages with page builder
- `product` - Building components catalog
- `project` - Portfolio/case studies
- `service` - Service offerings
- `testimonial` - Client testimonials
- `post` - Blog posts (legacy)
- `person` - Team members/authors

**Object Types:**
- `blockContent` - Rich text content
- `callToAction` - CTA blocks with links
- `infoSection` - Content sections
- `link` - Internal/external links

**Singletons:**
- `settings` - Global site settings, navigation, business info

#### Page Structure
- **App Router**: All pages in `frontend/app/` directory
- **Dynamic Routes**: `[slug]` patterns for content types
- **Layout**: Fixed header + footer with mobile-first responsive design
- **Forms**: Netlify Forms integration for lead generation

### Key Files & Locations

#### Configuration
- `frontend/next.config.ts` - Next.js configuration
- `frontend/tailwind.config.ts` - Tailwind CSS configuration
- `studio/sanity.config.ts` - Sanity Studio configuration
- `netlify.toml` - Netlify deployment configuration

#### Sanity Integration
- `frontend/sanity/lib/client.ts` - Sanity client configuration
- `frontend/sanity/lib/queries.ts` - GROQ queries for content
- `frontend/sanity/lib/api.ts` - API configuration constants
- `studio/src/schemaTypes/` - Content type definitions

#### Components
- `frontend/app/components/` - Reusable UI components
- `frontend/app/components/Header.tsx` - Navigation with mobile menu
- `frontend/app/components/Footer.tsx` - Site footer
- `frontend/app/components/MobileMenu.tsx` - Mobile navigation

## Development Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint + Prettier configured (see studio package.json)
- Mobile-first responsive design required
- WCAG 2.2 AA accessibility compliance

### Business Context Requirements
- **Always reference** `.cursor/rules/brainchild-building-solutions.mdc` for business context
- **Lead generation focus** - every page should guide toward contact/quote forms
- **Mobile-first** - construction workers often browse on phones at job sites
- **Industry-specific** - use construction terminology, emphasize trust/reliability

### Performance Targets
- Lighthouse scores ≥90 (Performance, SEO, Accessibility)
- Core Web Vitals compliance
- Next.js Image optimization for all images
- Static generation (SSG) for public pages

### Form Strategy
- Use Netlify Forms for all contact/quote forms
- Implement honeypot fields for spam protection
- Strategic placement: homepage hero, product pages, contact page
- Mobile-optimized layouts with clear success/error states

## Testing & Quality

### Type Safety
- Run `npm run typegen` in frontend/ after schema changes
- TypeScript strict mode enforced
- Sanity types auto-generated from schemas

### Linting
- Frontend: `npm run lint` (ESLint + Next.js rules)
- Studio: ESLint configured with @sanity/eslint-config-studio

### Build Process
- Frontend: `npm run build` (includes automatic typegen)
- Studio: `npm run build` (includes schema extraction)
- Deployment: Netlify automatically runs build process

## Git Commit Guidelines

### Commit Message Format
- **DO NOT include Claude co-author attribution** in commit messages
- **No "Generated with Claude Code" footer** - keep commits clean and professional
- **No "Co-Authored-By: Claude" lines** - this is a portfolio project for interviews
- **Use conventional commit format** (feat:, fix:, docs:, etc.)
- **Focus on technical achievements** and business impact in commit descriptions

### Rationale
- This is a professional portfolio project used for job interviews
- Clean commit history demonstrates individual technical contributions
- Employers expect to see developer's personal work and decision-making
- AI assistance is normal in 2025 development but attribution in Git history is unnecessary

## Important Notes

- **No existing CLAUDE.md found** - this is the initial version
- **Cursor rules exist** - comprehensive development guidelines in `.cursor/rules/`
- **Workspace structure** - always work in correct subdirectory (frontend/ or studio/)
- **Lead generation priority** - every decision should support contact form conversions
- **Mobile-first approach** - essential for construction industry target users

## Performance Optimization Guidelines

### Optimization Strategy
- Update @PERFORMANCE_OPTIMIZATIONS.md on-the-fly whenever performance optimizations are made
