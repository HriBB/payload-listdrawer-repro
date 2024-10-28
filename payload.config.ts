import path from 'path'
import { fileURLToPath } from 'url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { buildConfig } from 'payload'
import { en } from 'payload/i18n/en'
import sharp from 'sharp'

import { seedHandler } from '@/endpoints/seedHandler'

import { Locations } from '@/collections/Locations'
import { Sectors } from '@/collections/Sectors'
import { Images } from '@/collections/Images'
import { Routes } from '@/collections/Routes'
import { ImageRoutes } from '@/collections/ImageRoutes'

export const ROOT_PATH = path.dirname(fileURLToPath(import.meta.url))
export const MEDIA_PATH = path.resolve(ROOT_PATH, 'media')
export const TMP_PATH = path.resolve(ROOT_PATH, 'tmp')

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL,
  cors: [process.env.PAYLOAD_WEBSITE_URL || ''],
  csrf: [process.env.PAYLOAD_WEBSITE_URL || ''],
  secret: process.env.PAYLOAD_SECRET || '',
  editor: lexicalEditor(),
  typescript: {
    outputFile: path.resolve(ROOT_PATH, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  i18n: {
    supportedLanguages: { en },
  },
  admin: {
    autoLogin: {
      email: 'dev@payloadcms.com',
      password: 'test',
      prefillOnly: true,
    },
    components: {
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
  },
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      handler: seedHandler,
      method: 'get',
      path: '/seed',
    },
  ],
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Slovenščina',
        code: 'sl',
      },
    ],
  },
  collections: [Locations, Sectors, Images, Routes, ImageRoutes],
  graphQL: {
    schemaOutputFile: path.resolve(ROOT_PATH, 'generated-schema.graphql'),
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
        },
      })
    }
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
})
