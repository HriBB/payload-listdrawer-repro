'use client'
import React, { useCallback, useRef } from 'react'
import type { TextInputProps } from '@payloadcms/ui/fields/Text'
import type { ListDrawerProps } from '@payloadcms/ui/elements/ListDrawer'
import {
  useAllFormFields,
  useDocumentInfo,
  //  useListDrawer, // this one doesn't work
} from '@payloadcms/ui'

// this one works
import { useListDrawer } from '@/components/ListDrawer'

import './ClimbEditorField.scss'

/**
 * Climb Editor Field
 *
 * @see https://github.com/payloadcms/payload/issues/2427#issuecomment-1512320542
 * @see https://github.com/payloadcms/payload/discussions/1151
 */
export const ClimbEditorField: React.FC<TextInputProps> = () => {
  const [fields] = useAllFormFields()
  const fieldsRef = useRef(fields)
  fieldsRef.current = fields

  const doc = useDocumentInfo()
  const docRef = useRef(doc)
  docRef.current = doc

  const [ListDrawer, ListDrawerToggler, { closeDrawer: closeListDrawer }] = useListDrawer({
    collectionSlugs: ['routes'],
    filterOptions: {
      routes: {
        location: { equals: fields.location.value },
      },
    },
  })

  const handleListDrawerSelect = useCallback<NonNullable<ListDrawerProps['onSelect']>>(
    async ({ docID }) => {
      console.log('handleListDrawerSelect', docID)
    },
    [],
  )

  return (
    <div className="climb-editor-field">
      <ListDrawerToggler>
        <span className="climb-editor-field__example">Click me to trigger error</span>
      </ListDrawerToggler>
      <ListDrawer onSelect={handleListDrawerSelect} />
    </div>
  )
}

export default ClimbEditorField
