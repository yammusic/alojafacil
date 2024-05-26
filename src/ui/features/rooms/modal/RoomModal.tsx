import React from 'react'
import {
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import { IoClose } from 'react-icons/io5'

import { RoomForm } from '../form'
import { RoomView } from '../view'
import type { RoomModalProps } from './props-types'
import styles from './styles.module.scss'

export function RoomModal(props: Readonly<RoomModalProps>) {
  const { room, mode, onClose, onSubmit, ...rest } = props

  return (
    <Modal
      aria-describedby="room-modal-description"
      aria-labelledby="room-modal-title"
      onClose={ onClose }
      { ...rest }
    >
      <Grid
        container
        className={ styles.container }
        sx={ {
          bgcolor: 'background.paper',
          maxHeight: { xs: '90vh', md: '90vw', lg: '80vh' },
          width: { xs: '80vw', md: '70vw' },
          maxWidth: { lg: '50vw' },
        } }
      >
        <Grid item className={ styles.header } xs={ 12 }>
          <Typography variant="h4">
            { mode === 'add' && 'Add room' }

            { mode === 'edit' && 'Edit room' }

            { mode === 'view' && 'Room details' }
          </Typography>

          <Stack>
            <IconButton onClick={ onClose as any }>
              <IoClose />
            </IconButton>
          </Stack>
        </Grid>

        <Grid item xs={ 12 }>
          { (mode === 'view') && (
            <RoomView room={ room as any } />
          ) }

          { (mode === 'edit' || mode === 'add') && (
            <RoomForm
              onCancel={ onClose }
              onSubmit={ onSubmit }
              room={ room }
            />
          ) }
        </Grid>
      </Grid>
    </Modal>
  )
}
