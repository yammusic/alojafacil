import React from 'react'
import { Grid, IconButton, Modal, Stack, Typography } from '@mui/material'

import { CountryForm } from '../form'
import type { CountryModalProps } from './props-types'
import styles from './styles.module.scss'
import { IoClose } from 'react-icons/io5'
import { CountryView } from '../view'

export function CountryModal(props: Readonly<CountryModalProps>) {
  const { country, mode, onClose, onSubmit, ...rest } = props

  return (
    <Modal
      aria-describedby="country-modal-description"
      aria-labelledby="country-modal-title"
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
            { mode === 'add' && 'Add country' }

            { mode === 'edit' && 'Edit country' }

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
            <CountryView country={ country as any } />
          ) }

          { (mode === 'edit' || mode === 'add') && (
            <CountryForm
              country={ country }
              onCancel={ onClose }
              onSubmit={ onSubmit }
            />
          ) }
        </Grid>
      </Grid>
    </Modal>
  )
}
