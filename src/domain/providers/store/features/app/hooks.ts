'use client'

import { useSelector } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import merge from 'deepmerge'

import { useAppDispatch } from '../../shared/hooks'
import type { RootState } from '../../shared'
import {
  appStart,
  getRegionData,
  setCities,
  setCountries,
  setCurrentUser,
  setReady,
  setRoles,
  setSessions,
  setSidebarMenu,
  setSidebarMenuActive,
  setStates,
  setUsers,
} from './actions'
import { sidebarMenu } from './sidebar'

/* Selectors */
export const useAppState = () => (
  useSelector(({ app }: RootState) => app)
)

export const appCurrentUser = () => useAppState().currentUser
export const appUsers = () => useAppState().users
export const appRoles = () => useAppState().roles
export const appSessions = () => useAppState().sessions
export const appCities = () => useAppState().cities
export const appCountries = () => useAppState().countries
export const appStates = () => useAppState().states
export const appIsReady = () => useAppState().isReady
export const appSidebarMenu = () => useAppState().sidebarMenu
export const appSidebarMenuActive = () => useAppState().sidebarMenuActive

/* Actions */
export const useAppActions = () => ({
  ...bindActionCreators({
    appStart,
    setCurrentUser,
    getRegionData,
    setCities,
    setCountries,
    setStates,
    setReady,
    setSidebarMenu,
    setSidebarMenuActive,
    setUsers,
    setRoles,
    setSessions,
  }, useAppDispatch())
})

/* Sidebar */
export const useSidebarMenu = (custom: typeof sidebarMenu) => (
  merge(custom, sidebarMenu)
)
