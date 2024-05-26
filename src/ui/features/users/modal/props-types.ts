import type { ModalProps } from '@mui/material'
import type { User } from '@/domain/db/features/User/model'

export interface UserModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  user?: User | null
  mode: 'view' | 'edit' | 'add'
  onSubmit?: (data: User) => void
}
