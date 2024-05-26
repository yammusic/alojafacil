'use client'

import { AiOutlineDashboard } from 'react-icons/ai'
import { BsJournalBookmarkFill } from 'react-icons/bs'
import { FaHotel, FaKey, FaUsers } from 'react-icons/fa6'
import { GrDocumentUser } from 'react-icons/gr'
import { IoMdGlobe } from 'react-icons/io'
import { MdLocalHotel } from 'react-icons/md'

import type { SidebarMenuItem } from './types'

export const sidebarMenu: SidebarMenuItem[] = [
  {
    title: 'Dashboard',
    id: 'dashboard__menu',
    type: 'group',
    children: [
      {
        title: 'Default',
        url: '/admin/dashboard',
        icon: AiOutlineDashboard,
        id: 'dashboard__item',
        type: 'item',
      },
    ],
  },
  {
    title: 'Application',
    id: 'application__menu',
    type: 'group',
    children: [
      {
        title: 'Hotels',
        url: '/admin/hotels',
        icon: FaHotel,
        id: 'hotels__item',
        type: 'item',
      },
      {
        title: 'Rooms',
        url: '/admin/rooms',
        icon: MdLocalHotel,
        id: 'rooms__item',
        type: 'item',
      },
      {
        title: 'Bookings',
        url: '/admin/bookings',
        icon: BsJournalBookmarkFill,
        id: 'bookings__item',
        type: 'item',
      },
    ],
  },
  {
    title: 'Users',
    id: 'users__menu',
    type: 'group',
    children: [
      {
        title: 'Users',
        url: '/admin/users',
        icon: FaUsers,
        id: 'users__item',
        type: 'item',
      },
      {
        title: 'Roles',
        url: '/admin/roles',
        icon: GrDocumentUser,
        id: 'roles__item',
        type: 'item',
      },
      {
        title: 'Sessions',
        url: '/admin/sessions',
        icon: FaKey,
        id: 'sessions__item',
        type: 'item',
      },
    ],
  },
  {
    title: 'Configuration',
    id: 'configuration__menu',
    type: 'group',
    children: [
      {
        title: 'Countries',
        url: '/admin/countries',
        icon: IoMdGlobe,
        id: 'countries__item',
        type: 'item',
      },
      // {
      //   title: 'States',
      //   url: '/admin/states',
      //   icon: GiMountainRoad,
      //   id: 'states__item',
      //   type: 'item',
      // },
      // {
      //   title: 'Cities',
      //   url: '/admin/cities',
      //   icon: GiModernCity,
      //   id: 'cities__item',
      //   type: 'item',
      // },
    ],
  },
]
