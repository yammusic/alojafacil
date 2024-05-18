import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import {
  appSidebarMenuActive,
  themeBorderRadius,
  useAppActions,
  useThemeActions,
} from '@/domain/providers'

import { MenuItemIcon } from './item-icon/MenuItemIcon'
import { MenuItemTitle } from './item-title/MenuItemTitle'
import { MenuItemCaption } from './item-caption/MenuItemCaption'
import { MenuItemChip } from './item-chip/MenuItemChip'
import type { MenuItemProps } from './props-types'

export function MenuItem({ item, level }: Readonly<MenuItemProps>) {
  const { breakpoints } = useTheme()
  const matchDownLg = useMediaQuery(breakpoints.down('lg'))
  const { setSidebarMenuActive } = useAppActions()
  const { setDrawerOpen } = useThemeActions()
  const itemsActive = appSidebarMenuActive()
  const borderRadius = `${themeBorderRadius()}px`
  const pathname = usePathname()

  const onItemPress = useCallback((id: string) => {
    setSidebarMenuActive(itemsActive.filter((item) => item !== id))
    if (matchDownLg) { setDrawerOpen(false) }
  }, [itemsActive, matchDownLg])

  useEffect(() => {
    if (pathname === item.url && !itemsActive.includes(item.id)) {
      setSidebarMenuActive([...itemsActive, item.id])
    }
  }, [pathname, item, itemsActive])

  return (
    <ListItemButton
      disabled={ item.disabled }
      onClick={ () => onItemPress(item.id) }
      selected={ itemsActive.includes(item.id) }
      sx={ {
        borderRadius,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`
      } }
    >
      <Link
        passHref
        href={ item.url || '#' }
        style={ { display: 'flex', flexDirection: 'row', width: '100%' } }
        target={ item.target }
      >
        <MenuItemIcon icon={ item.icon } level={ level } />

        <ListItemText
          primary={
            <MenuItemTitle
              selected={ itemsActive.includes(item.id) }
              title={ item.title }
            />
          }
          secondary={ <MenuItemCaption caption={ item.caption } /> }
        />

        <MenuItemChip chip={ item.chip } />
      </Link>
    </ListItemButton>
  )
}
