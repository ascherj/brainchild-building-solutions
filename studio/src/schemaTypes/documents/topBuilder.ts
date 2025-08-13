import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'topBuilder',
  title: 'Top Builder',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Builder Name',
      type: 'string',
      description: 'The name of the building company',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Builder Logo',
      type: 'image',
      description: 'Logo of the building company',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Builder Website',
      type: 'url',
      description: 'The builder\'s website URL',
      validation: (rule) => 
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this builder (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'website',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})