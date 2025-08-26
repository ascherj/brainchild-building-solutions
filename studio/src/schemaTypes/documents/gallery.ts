import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery Photo',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Photo Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Descriptive title for this photo',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of what this photo shows',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'Important for accessibility and SEO',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Caption text to display with the photo',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Building Components', value: 'components'},
          {title: 'Construction Site', value: 'construction'},
          {title: 'Completed Projects', value: 'completed'},
          {title: 'Materials & Supplies', value: 'materials'},
          {title: 'Equipment', value: 'equipment'},
          {title: 'Team at Work', value: 'team'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the gallery',
      initialValue: 100,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Photo',
      type: 'boolean',
      description: 'Show this photo prominently in the gallery',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where this photo was taken (optional)',
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'date',
      description: 'When this photo was taken (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1).replace('-', ' ') : 'Gallery Photo',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
    {
      title: 'Date Taken',
      name: 'dateTaken',
      by: [{field: 'dateTaken', direction: 'desc'}],
    },
    {
      title: 'Featured First',
      name: 'featured',
      by: [{field: 'featured', direction: 'desc'}, {field: 'displayOrder', direction: 'asc'}],
    },
  ],
})
