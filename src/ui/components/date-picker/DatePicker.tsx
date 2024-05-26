/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import { Controller } from 'react-hook-form-mui'

import type { DatePickerProps } from './props-types'

export function DatePicker(props: Readonly<DatePickerProps>) {
  const { datePickerProps, name, render, required, ...rest } = props
  return (
    <Controller
      name={ name ?? 'date' }
      render={ ({ field }) => {
        if (render) return (render as any)({ field })
        console.log('field', { field })
        return (
          <MuiDatePicker
            format='dd/MM/yyyy'
            inputRef={ field.ref }
            label="Date"
            onChange={ field.onChange }
            slotProps={ {
              textField: {
                fullWidth: true,
                margin: 'normal',
              },
            } }
            value={ field.value }
            { ...datePickerProps }
          />
        )
      } }
      rules={ { required } }
      { ...rest }
    />
  )
}
