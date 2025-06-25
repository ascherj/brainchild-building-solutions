import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyStory',
      title: 'Company Story',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Tell the story of Brainchild Building Solutions',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      description: 'Company mission and values',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role/Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bio',
              title: 'Biography',
              type: 'text',
              description: 'Brief background and experience',
            }),
            defineField({
              name: 'image',
              title: 'Photo',
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
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications & Credentials',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Industry certifications, licenses, and credentials',
    }),
    defineField({
      name: 'yearsInBusiness',
      title: 'Years in Business',
      type: 'number',
      description: 'How long the company has been operating',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Area',
      type: 'text',
      description: 'Geographic areas served',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})
