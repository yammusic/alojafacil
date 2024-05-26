import React from 'react'
import { Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import { IoClose } from 'react-icons/io5'

import { UserForm } from '../form'
import { UserView } from '../view'
import type { UserModalProps } from './props-types'
import styles from './styles.module.scss'

export function UserModal(props: Readonly<UserModalProps>) {
  const { user, mode, onClose, onSubmit, ...rest } = props

  return (
    <Modal
      aria-describedby="user-modal-description"
      aria-labelledby="user-modal-title"
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
            { mode === 'add' && 'Add user' }

            { mode === 'edit' && 'Edit user' }

            { mode === 'view' && 'User details' }
          </Typography>

          <Stack>
            <IconButton onClick={ onClose as any }>
              <IoClose />
            </IconButton>
          </Stack>
        </Grid>

        <Grid item xs={ 12 }>
          { (mode === 'view') && (
            <UserView user={ user as any } />
          ) }

          { (mode === 'edit' || mode === 'add') && (
            <UserForm
              mode={ mode }
              onCancel={ onClose }
              onSubmit={ onSubmit }
              user={ user }
            />
          ) }
        </Grid>
      </Grid>
    </Modal>
  )
}
