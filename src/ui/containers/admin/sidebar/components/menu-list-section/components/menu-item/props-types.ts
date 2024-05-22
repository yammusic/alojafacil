import type { ReactElement } from 'react'
import type { SidebarMenuItem, SidebarMenuItemChip } from '@/domain/providers'

export interface MenuItemProps {
  item: SidebarMenuItem
  level: number
}

export interface ItemIconProps {
  icon?: ReactElement | any
  level: number
}

export interface ItemTitleProps {
  selected?: boolean
  title: string
}

export interface ItemCaptionProps {
  caption?: string
}

export interface ItemChipProps {
  chip?: SidebarMenuItemChip
}
