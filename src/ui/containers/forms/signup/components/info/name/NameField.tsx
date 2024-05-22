import { Box } from '@mui/material'
import React from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

export function NameField() {
  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
      } }
    >
      <TextFieldElement
        fullWidth
        required
        id="firstName"
        label="First Name"
        margin="normal"
        name="firstName"
      />

      <TextFieldElement
        fullWidth
        required
        id="lastName"
        label="Last Name"
        margin="normal"
        name="lastName"
      />
    </Box>
  )
}
