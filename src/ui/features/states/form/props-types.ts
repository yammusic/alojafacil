import type { SyntheticEvent } from 'react'
import type { StateAttributes } from '@/domain/db/features/State/types'

export interface StateFormProps {
  onCancel?: (e: SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => void
  onSubmit?: (data: StateFormValues) => void
  state?: StateAttributes | null
}

export interface StateFormValues {
  id: number
  name: string
  countryId: number
  state_code: string
}
