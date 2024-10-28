import { CollectionConfig } from 'payload'

export const ImageRoutes: CollectionConfig = {
  slug: 'image-routes',
  admin: {
    group: 'Guides',
    useAsTitle: 'route',
    defaultColumns: ['image', 'route', 'order'],
  },
  fields: [
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'images',
      required: true,
    },
    {
      name: 'route',
      type: 'relationship',
      relationTo: 'routes',
      required: true,
    },
  ],
}
