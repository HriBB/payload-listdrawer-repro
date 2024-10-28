import { CollectionConfig } from 'payload'

import { climbEditorField } from '@/fields/climbEditor'
import { formatSlug } from '@/utils/formatSlug'
import { populateRoutes } from './populateRoutes'

export const Images: CollectionConfig = {
  slug: 'images',
  admin: {
    group: 'Guides',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sector',
      type: 'relationship',
      relationTo: 'sectors',
      required: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ data }) => {
        return data.location ? { location: { equals: data.location } } : true
      },
    },
    {
      name: 'routes',
      type: 'relationship',
      relationTo: 'routes',
      hasMany: true,
      maxDepth: 0,
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
        //readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Mutate the sibling data to prevent DB storage
            // eslint-disable-next-line no-param-reassign
            siblingData.routes = undefined
          },
        ],
        afterRead: [populateRoutes],
      },
      filterOptions: ({ data }) => {
        return data.location ? { location: { equals: data.location } } : true
      },
    },
    climbEditorField(),
  ],
}
