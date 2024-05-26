export interface DeleteAlertProps {
  title?: string
  message?: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
}
