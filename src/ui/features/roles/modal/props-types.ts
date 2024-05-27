import type { ModalProps } from '@mui/material'
import type { RoleAttributes } from '@/domain/db/features/Role/types'

export interface RoleModalProps extends Omit<ModalProps, 'children' | 'onSubmit' | 'role'> {
  role?: RoleAttributes | null
  mode: 'view' | 'edit' | 'add'
  onSubmit?: (data: RoleAttributes) => void
}
