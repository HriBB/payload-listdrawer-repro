import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

/**
 * BeforeDashboard component
 *
 * @see https://github.com/payloadcms/payload/blob/beta/templates/website/src/components/BeforeDashboard/index.tsx
 */
const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      <SeedButton />
    </div>
  )
}

export default BeforeDashboard
