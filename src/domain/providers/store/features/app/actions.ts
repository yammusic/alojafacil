'use client'

import { createAction } from '@reduxjs/toolkit'
import type { SidebarMenuItem, UserResource } from './types'
import type { City } from '@/domain/db/features/City/model'
import type { Country } from '@/domain/db/features/Country/model'
import type { Role } from '@/domain/db/features/Role/model'
import type { Session } from '@/domain/db/features/Session/model'
import type { State } from '@/domain/db/features/State/model'
import type { User } from '@/domain/db/features/User/model'

export const setReady = createAction<boolean>('@app/SET_READY')
export const setCurrentUser = createAction<UserResource | null>('@app/SET_CURRENT_USER')
export const setUsers = createAction<User[]>('@app/SET_USERS')
export const setRoles = createAction<Role[]>('@app/SET_ROLES')
export const setSessions = createAction<Session[]>('@app/SET_SESSIONS')
export const setCountries = createAction<Country[]>('@app/SET_COUNTRIES')
export const setStates = createAction<State[]>('@app/SET_STATES')
export const setCities = createAction<City[]>('@app/SET_CITIES')
export const setSidebarMenu = createAction<SidebarMenuItem[]>('@app/SET_SIDEBAR_MENU')
export const setSidebarMenuActive = createAction<string[]>('@app/SET_SIDEBAR_MENU_ACTIVE')
export const appStart = createAction('@app/START')
export const getRegionData = createAction<{ countryId?: number, stateId?: number } | undefined>('@app/GET_REGION_DATA')
