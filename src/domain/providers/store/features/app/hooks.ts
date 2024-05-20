/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import merge from 'deepmerge'

import { useAppDispatch } from '@/domain/providers'
import type { RootState } from '../../shared'
import {
  appStart,
  getRegionData,
  setCities,
  setCountries,
  setCurrentUser,
  setReady,
  setSidebarMenu,
  setSidebarMenuActive,
  setStates,
} from './actions'
import { sidebarMenu } from './sidebar'

/* Selectors */
export const useAppState = () => (
  useSelector(({ app }: RootState) => app)
)

export const appCurrentUser = () => useAppState().currentUser
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
  }, useAppDispatch())
})

/* Sidebar */
export const useSidebarMenu = (custom: typeof sidebarMenu) => (
  merge(custom, sidebarMenu)
)
