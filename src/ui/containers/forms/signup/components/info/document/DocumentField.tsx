import type { SyntheticEvent } from 'react'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import { SelectElement, TextFieldElement } from 'react-hook-form-mui'

import styles from './styles.module.scss'

const DOCUMENT_TYPES = [
  { label: 'Identity Card', id: 'ID' },
  { label: 'Passport', id: 'PASSPORT' },
  { label: 'Driver License', id: 'DRIVER' },
  { label: 'Other', id: 'OTHER' },
]

export function DocumentField() {
  const [idNumber, setIdNumber] = useState('')

  const onIdNumberChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLInputElement
    setIdNumber(value.replace(/\D/g, ''))
  }

  return (
    <Box className={ styles.container }>
      <SelectElement
        fullWidth
        required
        className={ styles.idType }
        id="idType"
        label="Document Type"
        margin="normal"
        name="idType"
        options={ DOCUMENT_TYPES }
      />

      <TextFieldElement
        fullWidth
        required
        InputProps={ {
          inputMode: 'numeric',
          value: idNumber,
        } }
        className={ styles.idNumber }
        id="idNumber"
        label="Document Number"
        margin="normal"
        name="idNumber"
        onChange={ onIdNumberChange }
      />
    </Box>
  )
}
