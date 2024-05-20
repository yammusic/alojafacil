import type { ReactElement } from 'react'
import type { ChipProps } from '@mui/material'
import type { UrlObject } from 'url'

import type { City, Country, State, User } from '@/domain/db'

/* App State */
export interface AppState {
  cities: City[]
  countries: Country[]
  currentUser: User | null
  isReady: boolean
  sidebarMenu: SidebarMenuItem[]
  sidebarMenuActive: string[]
  states: State[]
}


/* App Sidebar */
export type SidebarMenuItemType = 'item' | 'group' | 'collapse'
export type SidebarMenuItemTarget = '_blank' | '_self' | '_parent' | '_top'

export interface SidebarMenuItemChip {
  avatar?: ReactElement | string
  color: ChipProps['color']
  label: ChipProps['label']
  size?: ChipProps['size']
  variant?: ChipProps['variant']
}

export interface SidebarMenuItem {
  caption?: string
  children?: SidebarMenuItem[]
  chip?: SidebarMenuItemChip
  disabled?: boolean
  icon?: any
  id: string
  target?: SidebarMenuItemTarget
  title: string
  type: SidebarMenuItemType
  url?: string | UrlObject
}
