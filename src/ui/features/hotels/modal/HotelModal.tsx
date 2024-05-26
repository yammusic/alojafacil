import React from 'react'
import {
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import { IoClose } from 'react-icons/io5'

import { HotelForm } from '../form'
import type { HotelModalProps } from './props-types'
import styles from './styles.module.scss'
import { HotelView } from '../view'

export function HotelModal(props: Readonly<HotelModalProps>) {
  const { hotel, mode, onClose, onSubmit, ...rest } = props

  return (
    <Modal
      aria-describedby="hotel-modal-description"
      aria-labelledby="hotel-modal-title"
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
            { mode === 'add' && 'Add hotel' }

            { mode === 'edit' && 'Edit hotel' }

            { mode === 'view' && 'Hotel details' }
          </Typography>

          <Stack>
            <IconButton onClick={ onClose as any }>
              <IoClose />
            </IconButton>
          </Stack>
        </Grid>

        <Grid item xs={ 12 }>
          { (mode === 'view') && (
            <HotelView hotel={ hotel as any } />
          ) }

          { (mode === 'edit' || mode === 'add') && (
            <HotelForm
              hotel={ hotel }
              onCancel={ onClose }
              onSubmit={ onSubmit }
            />
          ) }
        </Grid>
      </Grid>
    </Modal>
  )
}
