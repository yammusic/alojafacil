/* eslint-disable react/prop-types */
import React from 'react'
import { SelectElement } from 'react-hook-form-mui'
import type { GenderSelectProps } from './props-types'

const GENDER_OPTIONS = [
  { label: 'Male', id: 'MALE' },
  { label: 'Female', id: 'FEMALE' },
  { label: 'Other', id: 'OTHER' },
]

export function GenderSelect(props: Readonly<GenderSelectProps>) {
  return (
    <SelectElement
      fullWidth
      required
      id="gender"
      label="Gender"
      margin="normal"
      name="gender"
      options={ GENDER_OPTIONS }
      { ...props }
    />
  )
}
