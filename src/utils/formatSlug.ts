import type { FieldHook } from 'payload'

export const getSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, operation, originalDoc, data }) => {
    if (typeof value === 'string') {
      return getSlug(value)
    }

    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return getSlug(fallbackData)
      }
    }

    return value
  }
