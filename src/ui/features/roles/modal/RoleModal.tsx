import React from 'react'
import { Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import { IoClose } from 'react-icons/io5'

import { RoleForm } from '../form'
import { RoleView } from '../view'
import type { RoleModalProps } from './props-types'
import styles from './styles.module.scss'

export function RoleModal(props: Readonly<RoleModalProps>) {
  const { role, mode, onClose, onSubmit, ...rest } = props

  return (
    <Modal
      aria-describedby="role-modal-description"
      aria-labelledby="role-modal-title"
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
            { mode === 'add' && 'Add Role' }

            { mode === 'edit' && 'Edit Role' }

            { mode === 'view' && 'Role details' }
          </Typography>

          <Stack>
            <IconButton onClick={ onClose as any }>
              <IoClose />
            </IconButton>
          </Stack>
        </Grid>

        <Grid item xs={ 12 }>
          { (mode === 'view') && (
            <RoleView role={ role as any } />
          ) }

          { (mode === 'edit' || mode === 'add') && (
            <RoleForm
              onCancel={ onClose }
              onSubmit={ onSubmit as any }
              role={ role }
            />
          ) }
        </Grid>
      </Grid>
    </Modal>
  )
}
