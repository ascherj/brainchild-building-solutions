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

- **Frontend:** Next.js 15 with App Router, TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **CMS:** Sanity v3 with TypeScript
- **Deployment:** Netlify (frontend + forms)
- **Images:** Next.js Image optimization
- **Forms:** Netlify Forms with honeypot spam protection

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
   npm run dev
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

## 📁 Project Structure

```
brainchild_building_solutions/
├── frontend/                 # Next.js application
│   ├── app/                 # App Router pages
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── products/       # Product catalog
│   │   ├── projects/       # Project gallery
│   │   └── services/       # Services page
│   ├── components/         # React components
│   ├── lib/               # Utilities and API clients
│   └── sanity/            # Sanity configuration
├── studio/                # Sanity Studio
│   ├── src/
│   │   ├── schemaTypes/   # Content schemas
│   │   └── structure/     # Studio structure
└── netlify.toml          # Netlify deployment config
```

## 🎨 Content Types (Sanity Schemas)

### Document Types
- **`product`** - Building components with specs, images, lead times
- **`project`** - Case studies with client info, images, components supplied
- **`service`** - Core services with benefits and descriptions
- **`testimonial`** - Client testimonials with ratings and author info
- **`homePage`** - Homepage hero and featured content (singleton)
- **`aboutPage`** - Company information and team (singleton)
- **`page`** - Flexible pages for Resources, Contact, etc.

### Settings
- **`settings`** - Business info, contact details, social links

## 🚀 Deployment

### Deploy to Netlify

1. **Connect your GitHub repository** to Netlify
2. **Set build settings:**
   - Build command: `npm run build`
   - Publish directory: `frontend/out`
   - Root directory: `frontend`
3. **Configure environment variables** in Netlify dashboard
4. **Enable Netlify Forms** for contact form functionality

### Deploy Sanity Studio

```bash
cd studio
npx sanity deploy
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

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)

## 📋 Project Context

For complete business context, user personas, and technical requirements, see [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

---

**Every decision should support lead generation for Brainchild Building Solutions.**
