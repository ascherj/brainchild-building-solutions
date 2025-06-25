import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      title: 'Project Description',
      type: 'text',
      description: 'Brief overview of the project and what was supplied',
    }),
    defineField({
      name: 'clientName',
      title: 'Client/Builder Name',
      type: 'string',
      description: 'Name of the contractor or builder (if public)',
    }),
    defineField({
      name: 'location',
      title: 'Project Location',
      type: 'string',
      description: 'City, State or general area',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Residential - Single Family', value: 'residential-single'},
          {title: 'Residential - Multi-Family', value: 'residential-multi'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Industrial', value: 'industrial'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'componentsSupplied',
      title: 'Components Supplied',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of building components we supplied for this project',
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
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
      name: 'completedDate',
      title: 'Completion Date',
      type: 'date',
      description: 'When the project was completed',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project prominently in the gallery',
      initialValue: false,
    }),
    defineField({
      name: 'testimonial',
      title: 'Related Testimonial',
      type: 'reference',
      to: [{type: 'testimonial'}],
      description: 'Link to a testimonial from this project (if available)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      media: 'images.0',
    },
  },
})
