import type { ModalProps } from '@mui/material'
import type { RoomAttributes } from '@/domain/db/features/Room/types'

export interface RoomModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  room?: RoomAttributes | null
  mode: 'view' | 'edit' | 'add'
  onSubmit?: (data: RoomAttributes) => void
}
