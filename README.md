# Brainchild Building Solutions - Website

A lead-generation focused website for Brainchild Building Solutions, a building component supply company serving regional builders, custom home contractors, and commercial contractors.

![Business Website for Building Component Supply](/brainchild_screenshot.png)

## 🏢 About Brainchild Building Solutions

**Brainchild Building Solutions** is a building component supply company that sources and supplies construction materials to builders and contractors. They specialize in:

- **Roof trusses, floor joists, engineered beams**
- **Lumber and hardware components**
- **Supply chain logistics and coordination**
- **Expert guidance on component selection**

**Key Focus**: Generate qualified leads through contact/quote forms while showcasing expertise and building credibility with potential clients.

## 🎯 Target Users

- **Regional Builders** - Need reliable suppliers for consistent projects
- **Custom Home General Contractors** - Require specialized/custom components
- **Commercial Contractors** - Large volume projects with certification requirements

## ✨ Features

- **Lead Generation Focused:** Multiple contact forms strategically placed throughout the site
- **Mobile-First Design:** Optimized for construction workers browsing on phones at job sites
- **Product Catalog:** Detailed specifications for building components with quote request functionality
- **Project Gallery:** Portfolio of successful supply jobs with testimonials
- **Performance Optimized:** ≥90 Lighthouse scores, Core Web Vitals compliance
- **Content Management:** Easy-to-use Sanity Studio for non-technical content updates
- **Real-time Visual Editing:** Live preview of content changes with Sanity's Presentation Tool
- **Netlify Forms Integration:** Spam-protected contact forms with email notifications

## 🏗️ Tech Stack

- **Frontend:** Next.js 15 with App Router, React 19, TypeScript
- **Styling:** Tailwind CSS 4.x + shadcn/ui components
- **CMS:** Sanity v3 with TypeScript auto-generation
- **Deployment:** Netlify (frontend + forms) + Sanity Cloud (studio)
- **Images:** Next.js Image optimization with Sanity image loader
- **Forms:** Netlify Forms with honeypot spam protection
- **Architecture:** Monorepo with npm workspaces

## 📋 Site Structure

- **Home** (`/`) - Hero, featured products, testimonials, services overview
- **Products** (`/products`) - Building component catalog with specifications
- **Projects** (`/projects`) - Portfolio of successful supply projects
- **About** (`/about`) - Company story, team, certifications
- **Contact** (`/contact`) - Contact form and business information
- **Services** (`/services`) - Core services and capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Sanity account (for CMS)
- Netlify account (for deployment and forms)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brainchild_building_solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment template
   cp .env.local.example .env.local

   # Add your Sanity project details
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

4. **Run the development servers**
   ```bash
   # Start both Next.js and Sanity Studio
   npm run dev
   
   # Or start individually:
   npm run dev:next    # Frontend only
   npm run dev:studio  # Studio only
   ```

   This starts:
   - Next.js app at [http://localhost:3000](http://localhost:3000)
   - Sanity Studio at [http://localhost:3333](http://localhost:3333)

### Content Setup

1. **Access the Sanity Studio** at [http://localhost:3333](http://localhost:3333)
2. **Import sample data** (optional):
   ```bash
   npm run import-sample-data
   ```
3. **Create your first content** using the Studio interface
4. **Generate TypeScript types** after schema changes:
   ```bash
   cd studio && npm run extract-types
   cd ../frontend && npm run typegen
   ```

## 📁 Project Structure

```
brainchild_building_solutions/
├── frontend/                    # Next.js application
│   ├── app/                    # App Router pages
│   │   ├── about/             # About page with dynamic content
│   │   ├── contact/           # Contact page
│   │   ├── products/          # Product catalog
│   │   ├── projects/          # Project gallery
│   │   ├── services/          # Services page
│   │   └── components/        # Reusable UI components
│   ├── lib/                   # Utilities and helpers
│   ├── sanity/                # Sanity integration
│   │   ├── lib/              # Client, queries, and API
│   │   └── schema/           # Type definitions
│   └── sanity.types.ts       # Auto-generated TypeScript types
├── studio/                    # Sanity Studio CMS
│   ├── src/
│   │   ├── schemaTypes/      # Content type definitions
│   │   │   ├── documents/    # Document schemas
│   │   │   └── objects/      # Object schemas
│   │   └── structure/        # Studio UI structure
│   └── schema.json           # Extracted schema for type generation
├── CLAUDE.md                  # Development guidelines
├── SANITY_SCHEMA_WORKFLOW.md  # Schema update process
├── SANITY_TYPESCRIPT_INTEGRATION.md # TypeScript integration guide
├── PERFORMANCE_OPTIMIZATIONS.md # Performance tracking
└── netlify.toml              # Netlify deployment config
```

## 🎨 Content Types (Sanity Schemas)

### Document Types
- **`product`** - Building components with specs, images, lead times
- **`project`** - Case studies with client info, images, components supplied
- **`service`** - Core services with benefits and descriptions
- **`testimonial`** - Client testimonials with ratings and author info
- **`homePage`** - Homepage hero and featured content (singleton)
- **`aboutPage`** - Company information with dynamic years calculation (singleton)
- **`contactPage`** - Contact page content and form configuration (singleton)
- **`page`** - Flexible pages with page builder components
- **`post`** - Blog posts (legacy)
- **`person`** - Team members and authors

### Object Types
- **`blockContent`** - Rich text content with custom marks
- **`callToAction`** - CTA blocks with internal/external links
- **`infoSection`** - Structured content sections
- **`link`** - Flexible internal/external link handling

### Settings
- **`settings`** - Global site settings, navigation, business info (singleton)

## 🚀 Deployment

### Deploy to Netlify

1. **Connect your GitHub repository** to Netlify
2. **Set build settings:**
   - Build command: `npm run build --workspace=frontend`
   - Publish directory: `frontend/out`
   - Base directory: `/` (monorepo root)
3. **Configure environment variables** in Netlify dashboard
4. **Enable Netlify Forms** for contact form functionality

### Deploy Sanity Studio

```bash
cd studio
npm run deploy
```

## 📊 Performance Targets

- **Lighthouse Performance:** ≥90
- **Core Web Vitals:**
  - LCP < 2.5s
  - CLS < 0.1
  - FID < 100ms
- **SEO Score:** ≥90
- **Accessibility:** WCAG 2.2 AA compliance

## 📝 Content Strategy

### Homepage Priority
1. Clear value proposition for building component supply
2. Featured products with specifications
3. Social proof through testimonials
4. Services overview
5. Prominent call-to-action buttons

### Lead Generation Focus
- Multiple contact forms throughout the site
- "Request Quote" buttons on product pages
- Phone numbers prominently displayed
- Clear contact information on every page

## 🔧 Development Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint + Prettier configured
- Mobile-first responsive design
- Component-based architecture
- Accessible design (WCAG 2.2 AA)

### Form Strategy
- **Netlify Forms** for all contact/quote forms
- **Honeypot fields** for spam protection
- **Clear success/error states**
- **Mobile-optimized** form layouts

## 📞 Business Goals

### Primary KPIs
- ≥10 form submissions per month within 3 months
- <40% bounce rate on product pages
- ≥90% Core Web Vitals performance scores

### Success Metrics
- Qualified leads generated through contact forms
- Improved online presence for construction industry searches
- Enhanced credibility through professional web presence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📚 Resources

### Framework Documentation
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### CMS & Content
- [Sanity v3 Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity TypeScript Integration](https://www.sanity.io/docs/typescript)

### Styling & UI
- [Tailwind CSS 4.x Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)

### Deployment & Forms
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)

### Project-Specific Guides
- [SANITY_SCHEMA_WORKFLOW.md](./SANITY_SCHEMA_WORKFLOW.md) - Schema update process
- [SANITY_TYPESCRIPT_INTEGRATION.md](./SANITY_TYPESCRIPT_INTEGRATION.md) - TypeScript integration
- [PERFORMANCE_OPTIMIZATIONS.md](./PERFORMANCE_OPTIMIZATIONS.md) - Performance tracking

## 📋 Development Documentation

### Essential Reading
- **[CLAUDE.md](./CLAUDE.md)** - Complete development guidelines and project overview
- **[SANITY_SCHEMA_WORKFLOW.md](./SANITY_SCHEMA_WORKFLOW.md)** - Step-by-step schema update process
- **[SANITY_TYPESCRIPT_INTEGRATION.md](./SANITY_TYPESCRIPT_INTEGRATION.md)** - TypeScript integration deep dive
- **[PERFORMANCE_OPTIMIZATIONS.md](./PERFORMANCE_OPTIMIZATIONS.md)** - Performance improvements tracker

### Development Commands Reference
```bash
# Root level commands
npm run dev                    # Start both frontend and studio
npm run dev:next              # Start frontend only
npm run dev:studio            # Start studio only
npm run import-sample-data     # Import sample content

# Frontend commands (in /frontend)
npm run build                  # Production build
npm run lint                   # ESLint check
npm run typegen               # Generate TypeScript types

# Studio commands (in /studio)
npm run extract-types          # Extract schema to JSON
npm run deploy                 # Deploy studio to Sanity
```

---

**Every decision should support lead generation for Brainchild Building Solutions.**
