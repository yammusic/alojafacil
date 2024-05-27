import type { SyntheticEvent } from 'react'
import type { RoleAttributes } from '@/domain/db/features/Role/types'

export interface RoleFormProps {
  onCancel?: (e: SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => void
  onSubmit?: (data: RoleFormValues) => void
  role?: RoleAttributes | null
}

export interface RoleFormValues {
  id?: number
  name: string
}
