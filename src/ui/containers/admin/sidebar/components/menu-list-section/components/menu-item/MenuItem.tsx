import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { DRAWER_WIDTH_SMALL } from '@/domain/constants'
import { themeDrawerWidth, useThemeActions } from '@/domain/providers/store'

import { MenuItemIcon } from './item-icon/MenuItemIcon'
// import { MenuItemTitle } from './item-title/MenuItemTitle'
// import { MenuItemCaption } from './item-caption/MenuItemCaption'
import type { MenuItemProps } from './props-types'
import styles from './styles.module.scss'

export function MenuItem({ item, level }: Readonly<MenuItemProps>) {
  const { breakpoints } = useTheme()
  const matchDownLg = useMediaQuery(breakpoints.down('lg'))

  const { setDrawerWidth } = useThemeActions()
  const drawerWidth = themeDrawerWidth()
  const isSmallDrawer = useMemo(() => drawerWidth == DRAWER_WIDTH_SMALL, [drawerWidth])

  const pathname = usePathname()
  const isSelected = pathname === item.url

  const onItemPress = useCallback(() => {
    if (matchDownLg && !isSmallDrawer) {
      setDrawerWidth(DRAWER_WIDTH_SMALL)
    }
  }, [matchDownLg, isSmallDrawer])

  return (
    <Tooltip
      disableFocusListener={ !isSmallDrawer }
      disableHoverListener={ !isSmallDrawer }
      disableTouchListener={ !isSmallDrawer }
      placement="right"
      title={ item.title }
    >
      <ListItemButton
        LinkComponent={ Link }
        className={ styles.listItem }
        disabled={ item.disabled }
        onClick={ onItemPress }
        selected={ isSelected }
        sx={ {
          pl: isSmallDrawer ? '0.6rem !important' : `${level * 24}px !important`,
          pr: isSmallDrawer ? '0.6rem !important' : '1rem !important',
          color: isSelected ? 'secondary.dark' : 'inherit',
          backgroundColor: isSelected ? 'var(--secondary-light-bg-color) !important' : 'transparent',
        } }
        { ...{
          href: item.url ?? '#',
          target: item.target,
        } }
      >
        <MenuItemIcon
          icon={ item.icon }
          level={ level }
        />

        { !isSmallDrawer && (
          <ListItemText>
            <Typography
              color={ isSelected ? 'secondary.dark' : 'text.primary' }
              fontWeight={ isSelected ? 'bold' : 'normal' }
              variant="body1"
            >
              { item.title }
            </Typography>
          </ListItemText>
        ) }
      </ListItemButton>
    </Tooltip>
  )
}
