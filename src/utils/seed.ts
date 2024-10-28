import type { DeepPartial } from 'ts-essentials'
import type {
  CollectionSlug,
  Payload,
  PayloadRequest,
  RequiredDataFromCollectionSlug,
  Where,
} from 'payload'

export async function seedCollection<TSlug extends CollectionSlug>(
  payload: Payload,
  req: PayloadRequest,
  {
    collection,
    where,
    data,
  }: {
    collection: TSlug
    where: Where
    data: {
      sl: RequiredDataFromCollectionSlug<TSlug>
      en: DeepPartial<RequiredDataFromCollectionSlug<TSlug>>
    }
  },
) {
  const existing = await payload.find({
    collection,
    locale: 'sl',
    where,
    req,
  })

  const name = collection.charAt(0).toUpperCase() + collection.slice(1)

  const d = data.sl
  const title = 'title' in d ? d.title : 'slug' in d ? d.slug : 'id' in d ? d.id : 'unknown'

  if (existing.totalDocs > 0) {
    payload.logger.info(`${name}: "${title}" already exists`)
    return existing.docs[0]
  }

  payload.logger.info(`${name}: "${title}"`)

  const record = await payload.create({
    collection,
    locale: 'sl',
    data: data.sl,
    req,
  })

  await payload.update({
    collection,
    id: record.id,
    locale: 'en',
    data: data.en,
    req,
  })

  return record
}
