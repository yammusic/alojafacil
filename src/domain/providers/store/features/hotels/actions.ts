'use client'

import { createAction } from '@reduxjs/toolkit'
import type { Hotel } from '@/domain/db/features/Hotel/model'
import type { Room } from '@/domain/db/features/Room/model'

export const setHotels = createAction<Hotel[]>('@hotels/SET_HOTELS')
export const setRooms = createAction<Room[]>('@hotels/SET_ROOMS')
