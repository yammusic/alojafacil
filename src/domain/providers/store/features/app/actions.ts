import { createAction } from '@reduxjs/toolkit'
import type { SidebarMenuItem } from './types'
import type { City, Country, State, User } from '@/domain/db'

export const setReady = createAction<boolean>('@app/SET_READY')
export const setCurrentUser = createAction<User | null>('@app/SET_CURRENT_USER')
export const setCountries = createAction<Country[]>('@app/SET_COUNTRIES')
export const setStates = createAction<State[]>('@app/SET_STATES')
export const setCities = createAction<City[]>('@app/SET_CITIES')
export const setSidebarMenu = createAction<SidebarMenuItem[]>('@app/SET_SIDEBAR_MENU')
export const setSidebarMenuActive = createAction<string[]>('@app/SET_SIDEBAR_MENU_ACTIVE')
export const appStart = createAction('@app/START')
export const getRegionData = createAction<{ countryId?: number, stateId?: number } | undefined>('@app/GET_REGION_DATA')
