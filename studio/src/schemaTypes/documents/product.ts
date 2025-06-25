import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Roof Trusses', value: 'roof-trusses'},
          {title: 'Floor Joists', value: 'floor-joists'},
          {title: 'Engineered Beams', value: 'engineered-beams'},
          {title: 'Lumber', value: 'lumber'},
          {title: 'Hardware', value: 'hardware'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief overview of the product',
    }),
    defineField({
      name: 'specsRichText',
      title: 'Specifications & Details',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed specifications, dimensions, materials, etc.',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Product Gallery',
      type: 'array',
      of: [
        {
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
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'leadTime',
      title: 'Typical Lead Time',
      type: 'string',
      description: 'e.g., "2-3 weeks", "Custom - contact for details"',
    }),
    defineField({
      name: 'suppliers',
      title: 'Preferred Suppliers',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of suppliers we work with for this product',
    }),
    defineField({
      name: 'applications',
      title: 'Common Applications',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Where this product is typically used',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show this product prominently on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in listings',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'galleryImages.0',
    },
  },
})
