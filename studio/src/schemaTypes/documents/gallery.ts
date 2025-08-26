import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery Photo',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display with the photo',
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
          description: 'Important for accessibility and SEO',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      media: 'image',
    },
    prepare(selection) {
      const {caption, media} = selection
      return {
        title: caption || 'Gallery Photo',
        subtitle: 'Photo',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Most Recent',
      name: 'recent',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
