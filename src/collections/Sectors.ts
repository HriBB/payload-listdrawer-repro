import { CollectionConfig } from 'payload'
import { formatSlug } from '@/utils/formatSlug'

export const Sectors: CollectionConfig = {
  slug: 'sectors',
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
  ],
}
