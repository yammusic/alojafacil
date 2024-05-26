import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import type { DeleteAlertProps } from './props-types'

export function DeleteAlert(props: Readonly<DeleteAlertProps>) {
  const { title, message, onClose, onConfirm, open } = props

  return (
    <Dialog
      aria-describedby="delete-alert-description"
      aria-labelledby="delete-alert-title"
      onClose={ onClose }
      open={ open }
    >
      <DialogTitle color="error" id="delete-alert-title">
        { title ?? 'Delete alert' }
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="delete-alert-description">
          { message ?? 'Are you sure you want to delete this item?' }
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={ onClose } variant="outlined">
          Cancel
        </Button>

        <Button color="error" onClick={ onConfirm } variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
