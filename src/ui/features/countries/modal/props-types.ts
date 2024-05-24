import type { ModalProps } from '@mui/material'
import type { CountryAttributes } from '@/domain/db/features/Country/types'

export interface CountryModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  country?: CountryAttributes | null
  mode: 'view' | 'edit' | 'add'
  onSubmit?: (data: CountryAttributes) => void
}
