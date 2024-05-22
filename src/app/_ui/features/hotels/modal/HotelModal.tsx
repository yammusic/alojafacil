import React from 'react'
import { Box, Modal } from '@mui/material'

import { HotelForm } from '../form'
import type { HotelModalProps } from './props-types'
import styles from './styles.module.scss'

export function HotelModal(props: Readonly<HotelModalProps>) {
  const { onClose, open } = props

  return (
    <Modal
      aria-describedby="hotel-modal-description"
      aria-labelledby="hotel-modal-title"
      onClose={ onClose }
      open={ open }
    >
      <Box
        className={ styles.container }
        sx={ {
          bgcolor: 'background.paper',
          maxHeight: { xs: '90vh', md: '90vw', lg: '80vh' },
          width: { xs: '80vw', md: '70vw' },
          maxWidth: { lg: '50vw' },
        } }
      >
        <HotelForm onCloseModal={ onClose } />
      </Box>
    </Modal>
  )
}
