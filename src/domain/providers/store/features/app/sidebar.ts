import { MdDashboard } from 'react-icons/md'
import type { SidebarMenuItem } from './types'

export const sidebarMenu: SidebarMenuItem[] = [
  {
    caption: 'Dashboard',
    children: [
      {
        title: 'Dashboard',
        url: '/admin',
        icon: MdDashboard,
        id: 'dashboard__item',
        type: 'item',
      }, {
        id: 'analytics__item',
        type: 'collapse',
        title: 'Analytics',
        url: '/admin/analytics',
        icon: MdDashboard,
      },
    ],
    id: 'dashboard__menu',
    title: 'Dashboard',
    type: 'group',
  },
]
