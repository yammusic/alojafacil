import React from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

export function EmailField() {
  return (
    <TextFieldElement
      fullWidth
      required
      id="email"
      label="Email"
      margin="normal"
      name="email"
      type="email"
    />
  )
}
