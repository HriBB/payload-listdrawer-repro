'use client'
import { useModal } from '@payloadcms/ui'
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

import type { ListDrawerProps, ListTogglerProps, UseListDrawer } from './types'

export * from './types'

import { useConfig } from '@payloadcms/ui'
import { useEditDepth } from '@payloadcms/ui'
import { Drawer, DrawerToggler } from '@payloadcms/ui'
import { ListDrawerContent } from './DrawerContent'
import './index.scss'

export const baseClass = 'list-drawer'

export const formatListDrawerSlug = ({
  depth,
  uuid,
}: {
  depth: number
  uuid: string // supply when creating a new document and no id is available
}) => `list-drawer_${depth}_${uuid}`

export const ListDrawerToggler: React.FC<ListTogglerProps> = ({
  children,
  className,
  disabled,
  drawerSlug,
  ...rest
}) => {
  return (
    <DrawerToggler
      className={[className, `${baseClass}__toggler`].filter(Boolean).join(' ')}
      disabled={disabled}
      slug={drawerSlug}
      {...rest}
    >
      {children}
    </DrawerToggler>
  )
}

export const ListDrawer: React.FC<ListDrawerProps> = (props) => {
  const { drawerSlug } = props

  return (
    <Drawer className={baseClass} gutter={false} Header={null} slug={drawerSlug}>
      <ListDrawerContent {...props} />
    </Drawer>
  )
}

export const useListDrawer: UseListDrawer = ({
  collectionSlugs: collectionSlugsFromProps,
  filterOptions,
  selectedCollection,
  uploads,
}) => {
  const {
    config: { collections },
  } = useConfig()
  const drawerDepth = useEditDepth()
  const uuid = useId()
  const { closeModal, modalState, openModal, toggleModal } = useModal()
  const [isOpen, setIsOpen] = useState(false)
  const [collectionSlugs, setCollectionSlugs] = useState(collectionSlugsFromProps)

  const drawerSlug = formatListDrawerSlug({
    depth: drawerDepth,
    uuid,
  })

  useEffect(() => {
    setIsOpen(Boolean(modalState[drawerSlug]?.isOpen))
  }, [modalState, drawerSlug])

  useEffect(() => {
    if (!collectionSlugs || collectionSlugs.length === 0) {
      const filteredCollectionSlugs = collections.filter(({ upload }) => {
        if (uploads) {
          return Boolean(upload) === true
        }
        return true
      })

      setCollectionSlugs(filteredCollectionSlugs.map(({ slug }) => slug))
    }
  }, [collectionSlugs, uploads, collections])

  const toggleDrawer = useCallback(() => {
    toggleModal(drawerSlug)
  }, [toggleModal, drawerSlug])

  const closeDrawer = useCallback(() => {
    closeModal(drawerSlug)
  }, [drawerSlug, closeModal])

  const openDrawer = useCallback(() => {
    openModal(drawerSlug)
  }, [drawerSlug, openModal])

  const filterOptionsRef = useRef(filterOptions)
  filterOptionsRef.current = filterOptions

  const MemoizedDrawer = useMemo(() => {
    return (props) => (
      <ListDrawer
        {...props}
        closeDrawer={closeDrawer}
        collectionSlugs={collectionSlugs}
        drawerSlug={drawerSlug}
        filterOptions={filterOptionsRef.current}
        key={drawerSlug}
        selectedCollection={selectedCollection}
        uploads={uploads}
      />
    )
  }, [
    drawerSlug,
    collectionSlugs,
    uploads,
    closeDrawer,
    selectedCollection,
    //filterOptions
  ])

  const MemoizedDrawerToggler = useMemo(() => {
    return (props) => <ListDrawerToggler {...props} drawerSlug={drawerSlug} />
  }, [drawerSlug])

  const MemoizedDrawerState = useMemo(
    () => ({
      closeDrawer,
      collectionSlugs,
      drawerDepth,
      drawerSlug,
      isDrawerOpen: isOpen,
      openDrawer,
      setCollectionSlugs,
      toggleDrawer,
    }),
    [
      drawerDepth,
      drawerSlug,
      isOpen,
      toggleDrawer,
      closeDrawer,
      openDrawer,
      setCollectionSlugs,
      collectionSlugs,
    ],
  )

  return [MemoizedDrawer, MemoizedDrawerToggler, MemoizedDrawerState]
}
