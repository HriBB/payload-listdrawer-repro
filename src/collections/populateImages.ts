import type { FieldHook } from 'payload'
import { Image } from 'payload-types'

export const populateImages: FieldHook<Image> = async ({
  data,
  req: { payload, locale },
  context,
}) => {
  if (context?.isPopulating) return []
  if (!data) return []

  const imageRoutes = await payload.find({
    collection: 'image-routes',
    locale,
    depth: 0,
    where: {
      route: { equals: data.id },
    },
    context: {
      isPopulating: true,
    },
  })

  if (imageRoutes.docs) {
    return imageRoutes.docs.map((doc) => doc.image)
  }

  return []
}
