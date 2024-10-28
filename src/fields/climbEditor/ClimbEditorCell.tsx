'use client'
import React from 'react'

import './ClimbEditorCell.scss'

export const baseClass = 'climb-editor-cell'

/**
 * Climb Editor Cell
 */
export const ClimbEditorCell = (props: any) => {
  const { cellData } = props

  if (!cellData) return null

  return (
    <div
      className={baseClass}
      //style={{ backgroundColor: cellData as string }}
    ></div>
  )
}

export default ClimbEditorCell
