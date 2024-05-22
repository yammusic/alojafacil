'use client'

import { createAction } from '@reduxjs/toolkit'
import type { Hotel } from '@/domain/db'

export const setHotels = createAction<Hotel[]>('@hotels/SET_HOTELS')
