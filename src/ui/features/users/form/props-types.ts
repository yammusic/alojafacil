import type { SyntheticEvent } from 'react'
import type { DateTime } from 'luxon'

import type { User } from '@/domain/db/features/User/model'

export interface UserFormProps {
  mode: 'edit' | 'add'
  onCancel?: (e: SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => void
  onSubmit?: (data: User) => void
  user?: User | null
}

export interface UserFormValues {
  id?: number
  username: string
  email: string
  password?: string
  firstName: string
  lastName: string
  avatar?: string
  documentType: string
  documentNumber: string
  dateOfBirth: DateTime | Date | string
  gender: string
  phoneNumber: string
  roles: number[]
  countryId: number
  stateId?: number
  cityId: number
  address?: string
}
