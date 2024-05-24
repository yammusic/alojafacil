import React from 'react'
import { Grid, IconButton, Modal, Stack, Typography } from '@mui/material'

import { StateForm } from '../form'
import type { StateModalProps } from './props-types'
import styles from './styles.module.scss'
import { IoClose } from 'react-icons/io5'
import { StateView } from '../view'

export function StateModal(props: Readonly<StateModalProps>) {
  const { state, mode, onClose, onSubmit, ...rest } = props

  return (
    <Modal
      aria-describedby="state-modal-description"
      aria-labelledby="state-modal-title"
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
            { mode === 'add' && 'Add state' }

            { mode === 'edit' && 'Edit state' }

            { mode === 'view' && 'Country details' }
          </Typography>

          <Stack>
            <IconButton onClick={ onClose as any }>
              <IoClose />
            </IconButton>
          </Stack>
        </Grid>

        <Grid item xs={ 12 }>
          { (mode === 'view') && (
            <StateView state={ state as any } />
          ) }

          { (mode === 'edit' || mode === 'add') && (
            <StateForm
              onCancel={ onClose }
              onSubmit={ onSubmit }
              state={ state }
            />
          ) }
        </Grid>
      </Grid>
    </Modal>
  )
}
