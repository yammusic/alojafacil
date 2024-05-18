/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import React from 'react'
import { SelectElement } from 'react-hook-form-mui'
import { DatePicker } from '@mui/x-date-pickers'

import styles from './styles.module.scss'

const GENDER_OPTIONS = [
  { label: 'Male', id: 'MALE' },
  { label: 'Female', id: 'FEMALE' },
  { label: 'Other', id: 'OTHER' },
]

export function GenderBirthField() {
  return (
    <Box className={ styles.container }>
      <SelectElement
        fullWidth
        required
        id="gender"
        label="Gender"
        margin="normal"
        name="gender"
        options={ GENDER_OPTIONS }
      />

      <DatePicker
        className={ styles.birth }
        format="dd/MM/yyyy"
        label="Birth Date"
        name="birthDate"
      />
    </Box>
  )
}
