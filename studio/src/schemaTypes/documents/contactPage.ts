import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'
import {contactPageInitialValues} from '../../lib/contactPageInitialValues'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main headline for the contact page',
      initialValue: contactPageInitialValues.title,
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Supporting text under the main headline',
      initialValue: contactPageInitialValues.subtitle,
    }),
    defineField({
      name: 'formTitle',
      title: 'Contact Form Title',
      type: 'string',
      description: 'Title for the contact form section',
      initialValue: contactPageInitialValues.formTitle,
    }),
    defineField({
      name: 'contactInfoTitle',
      title: 'Contact Info Title',
      type: 'string',
      description: 'Title for the contact information section',
    }),
    defineField({
      name: 'whyChooseUsTitle',
      title: 'Why Choose Us Title',
      type: 'string',
      description: 'Title for the benefits section',
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of key benefits/reasons to choose your company',
      initialValue: contactPageInitialValues.benefits,
    }),
    defineField({
      name: 'callToActionText',
      title: 'Call to Action Text',
      type: 'string',
      description: 'Text above the product/project links',
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
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines and browser tabs',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Description for search engines',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
      }
    },
  },
})
