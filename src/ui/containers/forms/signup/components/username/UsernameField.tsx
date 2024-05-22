import React from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

export function UsernameField() {
  return (
    <TextFieldElement
      fullWidth
      required
      id="username"
      label="Username"
      margin="normal"
      name="username"
    />
  )
}
