import { CollectionConfig } from 'payload'
import { formatSlug } from '@/utils/formatSlug'

export const Routes: CollectionConfig = {
  slug: 'routes',
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
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'images',
      hasMany: true,
      maxDepth: 0,
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        //hidden: true,
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Mutate the sibling data to prevent DB storage
            // eslint-disable-next-line no-param-reassign
            siblingData.images = undefined
          },
        ],
      },
    },
    /*
    {
      type: 'row',
      fields: [
        {
          name: 'sitStart',
          type: 'checkbox',
        },
        {
          name: 'jumpStart',
          type: 'checkbox',
        },
        {
          name: 'highball',
          type: 'checkbox',
        },
        {
          name: 'morpho',
          type: 'checkbox',
        },
        {
          name: 'project',
          type: 'checkbox',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
    */
  ],
}
