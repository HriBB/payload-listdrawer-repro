import { formatSlug } from '@/utils/formatSlug'
import { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',
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
  ],
}
