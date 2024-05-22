import type { SyntheticEvent } from 'react'

export interface HotelModalProps {
  onClose: (e: SyntheticEvent, reason: string) => void
  open: boolean
}
