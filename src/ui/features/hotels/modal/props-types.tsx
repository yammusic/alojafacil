import type { ModalProps } from '@mui/material'
import type { HotelAttributes } from '@/domain/db/features/Hotel/types'

export interface HotelModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  hotel?: HotelAttributes | null
  mode: 'view' | 'edit' | 'add'
  onSubmit?: (data: HotelAttributes) => void
}
