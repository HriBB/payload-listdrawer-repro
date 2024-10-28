/**
 * This script seeds the database with example content
 *
 * Next.js revalidation errors are normal when seeding the database without a server running
 * i.e. running `yarn seed` locally instead of using the admin UI within an active app
 * The app is not running to revalidate the pages and so the API routes are not available
 * These error messages can be ignored: `Error hitting revalidate route for...`
 *
 * @see https://github.com/payloadcms/payload/blob/beta/templates/website/src/endpoints/seed/index.ts
 */

import type { Payload, PayloadRequest } from 'payload'

import { seedCollection } from './utils'

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database ...')

  //
  // locations
  //

  const location1 = await seedCollection(payload, req, {
    collection: 'locations',
    where: {
      name: { equals: 'Location 1' },
    },
    data: {
      en: {
        name: 'Location 1',
      },
      sl: {
        name: 'Lokacija 1',
      },
    },
  })

  const location2 = await seedCollection(payload, req, {
    collection: 'locations',
    where: {
      name: { equals: 'Location 2' },
    },
    data: {
      en: {
        name: 'Location 2',
      },
      sl: {
        name: 'Lokacija 2',
      },
    },
  })

  const location3 = await seedCollection(payload, req, {
    collection: 'locations',
    where: {
      name: { equals: 'Location 3' },
    },
    data: {
      en: {
        name: 'Location 3',
      },
      sl: {
        name: 'Lokacija 3',
      },
    },
  })

  //
  // posts
  //

  const sector1 = await seedCollection(payload, req, {
    collection: 'sectors',
    where: {
      name: { equals: 'Sector 1' },
    },
    data: {
      en: {
        name: 'Sector 1',
        location: location1.id,
      },
      sl: {
        name: 'Sektor 1',
        location: location1.id,
      },
    },
  })

  const sector2 = await seedCollection(payload, req, {
    collection: 'sectors',
    where: {
      name: { equals: 'Sector 2' },
    },
    data: {
      en: {
        name: 'Sector 2',
        location: location2.id,
      },
      sl: {
        name: 'Sektor 2',
        location: location2.id,
      },
    },
  })

  const sector3 = await seedCollection(payload, req, {
    collection: 'sectors',
    where: {
      name: { equals: 'Sector 3' },
    },
    data: {
      en: {
        name: 'Sector 3',
        location: location3.id,
      },
      sl: {
        name: 'Sektor 3',
        location: location3.id,
      },
    },
  })

  //
  // images
  //

  const image1 = await seedCollection(payload, req, {
    collection: 'images',
    where: {
      name: { equals: 'Image 1' },
    },
    data: {
      en: {
        name: 'Image 1',
        location: location1.id,
        sector: sector1.id,
      },
      sl: {
        name: 'Slika 1',
        location: location1.id,
        sector: sector1.id,
      },
    },
  })

  const image2 = await seedCollection(payload, req, {
    collection: 'images',
    where: {
      name: { equals: 'Image 2' },
    },
    data: {
      en: {
        name: 'Image 2',
        location: location2.id,
        sector: sector2.id,
      },
      sl: {
        name: 'Slika 2',
        location: location2.id,
        sector: sector2.id,
      },
    },
  })

  const image3 = await seedCollection(payload, req, {
    collection: 'images',
    where: {
      name: { equals: 'Image 3' },
    },
    data: {
      en: {
        name: 'Image 3',
        location: location3.id,
        sector: sector3.id,
      },
      sl: {
        name: 'Slika 3',
        location: location3.id,
        sector: sector3.id,
      },
    },
  })

  //
  // routes
  //

  const route1 = await seedCollection(payload, req, {
    collection: 'routes',
    where: {
      name: { equals: 'Route 1' },
    },
    data: {
      en: {
        name: 'Route 1',
        location: location1.id,
        sector: sector1.id,
      },
      sl: {
        name: 'Smer 1',
        location: location1.id,
        sector: sector1.id,
      },
    },
  })

  const route2 = await seedCollection(payload, req, {
    collection: 'routes',
    where: {
      name: { equals: 'Route 2' },
    },
    data: {
      en: {
        name: 'Route 2',
        location: location2.id,
        sector: sector2.id,
      },
      sl: {
        name: 'Smer 2',
        location: location2.id,
        sector: sector2.id,
      },
    },
  })

  const route3 = await seedCollection(payload, req, {
    collection: 'routes',
    where: {
      name: { equals: 'Route 3' },
    },
    data: {
      en: {
        name: 'Route 3',
        location: location3.id,
        sector: sector3.id,
      },
      sl: {
        name: 'Smer 3',
        location: location3.id,
        sector: sector3.id,
      },
    },
  })

  payload.logger.info('Seeding database done!')
}
