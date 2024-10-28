'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

const SuccessMessage: React.FC = () => <div>Database seeded!</div>

/**
 * SeedButton component
 *
 * @see https://github.com/payloadcms/payload/blob/beta/templates/website/src/components/BeforeDashboard/SeedButton/index.tsx
 */
export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (loading) return

      setLoading(true)

      try {
        await fetch('/api/seed')
        setSeeded(true)
        toast.success(<SuccessMessage />, { duration: 5000 })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    },
    [loading],
  )

  let message = ''
  if (loading) message = ' (seeding...)'
  if (seeded) message = ' (done!)'
  if (error) message = ` (error: ${error})`

  return (
    <Fragment>
      <a href="/api/seed" onClick={handleClick} rel="noopener noreferrer" target="_blank">
        Seed your database
      </a>
      {message}
    </Fragment>
  )
}
