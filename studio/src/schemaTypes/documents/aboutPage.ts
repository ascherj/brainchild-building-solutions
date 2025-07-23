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
      name: 'markStartedYear',
      title: "Year Mark Started in Industry",
      type: 'number',
      description: 'The year Mark started working in the industry (1989)',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'companyEstablishedYear',
      title: 'Year Company Was Established',
      type: 'number',
      description: 'The year Brainchild Building Solutions was founded (2007)',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'personalInterests',
      title: 'Beyond the Office - Personal Interests',
      type: 'array',
      of: [{type: 'string'}],
      description: "Mark's personal adventures and interests outside of work",
    }),
    defineField({
      name: 'whatSetsMarkApart',
      title: 'What Sets Mark Apart',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key differentiators and unique qualities',
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
