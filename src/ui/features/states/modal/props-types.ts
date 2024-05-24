import type { ModalProps } from '@mui/material'
import type { StateAttributes } from '@/domain/db/features/State/types'

export interface StateModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  state?: StateAttributes | null
  mode: 'view' | 'edit' | 'add'
  onSubmit?: (data: StateAttributes) => void
}
