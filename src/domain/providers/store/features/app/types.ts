import type { ReactElement } from 'react'
import type { ChipProps } from '@mui/material'
import type { UrlObject } from 'url'

import type { City } from '@/domain/db/features/City/model'
import type { Country } from '@/domain/db/features/Country/model'
import type { Role } from '@/domain/db/features/Role/model'
import type { Session } from '@/domain/db/features/Session/model'
import type { State } from '@/domain/db/features/State/model'
import type { User } from '@/domain/db/features/User/model'

export interface UserResource {
  id: number
  accessToken: string
  email: string
  roles: string[]
  username: string
}

/* App State */
export interface AppState {
  cities: City[]
  countries: Country[]
  currentUser: UserResource | null
  isReady: boolean
  roles: Role[]
  sessions: Session[]
  sidebarMenu: SidebarMenuItem[]
  sidebarMenuActive: string[]
  states: State[]
  users: User[]
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
