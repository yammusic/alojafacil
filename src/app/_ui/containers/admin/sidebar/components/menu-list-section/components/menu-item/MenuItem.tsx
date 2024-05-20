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
import type { MenuItemProps } from './props-types'

export function MenuItem({ item, level }: Readonly<MenuItemProps>) {
  const { breakpoints } = useTheme()
  const matchDownLg = useMediaQuery(breakpoints.down('lg'))
  const pathname = usePathname()
  const isSelected = pathname === item.url

  const { setSidebarMenuActive } = useAppActions()
  const { setDrawerOpen } = useThemeActions()
  const itemsActive = appSidebarMenuActive()

  const onItemPress = useCallback((id: string) => {
    setSidebarMenuActive(itemsActive.filter((item) => item !== id))
    if (matchDownLg) { setDrawerOpen(false) }
  }, [itemsActive, matchDownLg])

  return (
    <ListItemButton
      disabled={ item.disabled }
      onClick={ () => onItemPress(item.id) }
      selected={ isSelected }
      sx={ {
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

        <ListItemText>
          <MenuItemTitle
            selected={ isSelected }
            title={ item.title }
          />
        </ListItemText>
      </Link>
    </ListItemButton>
  )
}
