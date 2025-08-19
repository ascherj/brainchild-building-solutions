import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main headline on the homepage',
      initialValue: 'Hassle-free roof trusses and building components delivered to your job site.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Supporting text under the main headline',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Important for accessibility and SEO',
          initialValue: 'Roof trusses and building components',
        }),
      ],
    }),
    defineField({
      name: 'heroCallToAction',
      title: 'Hero Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'GET A QUOTE',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'URL or page path',
          initialValue: '/contact',
        }),
      ],
    }),
    defineField({
      name: 'trustSection',
      title: 'Trust Section',
      type: 'object',
      description: 'The "Buy from someone you trust" section',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Buy from someone you trust.',
        }),
        defineField({
          name: 'content',
          title: 'Section Content',
          type: 'text',
          rows: 4,
          initialValue: 'Mark Ascher has been in this industry since 1989. You can have confidence knowing that he comes from a technical, civil engineering background. Brainchild Building Solutions was founded in 2007 and has been a reliable supplier of trusses and building components for residential and commercial projects in the greater Maryland, D.C. and Virginia area. Why not trust an expert for your next job?',
        }),
        defineField({
          name: 'callToAction',
          title: 'Call to Action',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'LEARN MORE',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/about',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      description: 'The "Professional Building Solutions" section',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Professional Building Solutions',
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          initialValue: 'From roof trusses to complete building components, we deliver quality materials on time and on budget.',
        }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Service Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Service Description',
                  type: 'text',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon SVG',
                  type: 'text',
                  description: 'SVG path for the service icon',
                }),
              ],
            },
          ],
          initialValue: [
            {
              title: 'Roof Trusses',
              description: 'Engineered roof trusses designed for residential and commercial applications.',
              icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
            },
            {
              title: 'Building Components',
              description: 'Complete range of structural building components for your construction needs.',
              icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
            },
            {
              title: 'Job Site Delivery',
              description: 'Reliable delivery service directly to your construction site when you need it.',
              icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'finalCallToAction',
      title: 'Final Call to Action Section',
      type: 'object',
      description: 'The bottom CTA section',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Ready to get started on your next project?',
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          initialValue: 'Contact us today for a quote on roof trusses and building components.',
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'REQUEST QUOTE',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/contact',
            }),
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'VIEW PRODUCTS',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/products',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Additional Page Sections',
      type: 'array',
      description: 'Optional additional sections (advanced users)',
      of: [
        {type: 'callToAction'},
        {type: 'infoSection'},
        {
          type: 'object',
          name: 'featuredProducts',
          title: 'Featured Products',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'products',
              title: 'Products',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'product'}]}],
            }),
          ],
        },
        {
          type: 'object',
          name: 'featuredTestimonials',
          title: 'Featured Testimonials',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'testimonials',
              title: 'Testimonials',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'testimonial'}]}],
            }),
          ],
        },
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
