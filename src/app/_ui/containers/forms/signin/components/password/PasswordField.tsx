import React, { useCallback, useMemo, useState } from 'react'
import { TextFieldElement } from 'react-hook-form-mui'
import { IconButton, InputAdornment } from '@mui/material'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

export function PasswordField() {
  const [showPassword, setShowPassword] = useState(false)
  const onTogglePassword = useCallback(() => setShowPassword(!showPassword), [showPassword])

  const endAdornment = useMemo(() => (
    <InputAdornment position="end">
      <IconButton onClick={ onTogglePassword }>
        { showPassword ? (
          <FaRegEyeSlash size={ 20 } />
        ) : (
          <FaRegEye size={ 20 } />
        ) }
      </IconButton>
    </InputAdornment>
  ), [showPassword])

  return (
    <TextFieldElement
      fullWidth
      required
      InputProps={ { endAdornment } }
      id="password"
      label="Password"
      margin="normal"
      name="password"
      type={ showPassword ? 'text' : 'password' }
    />
  )
}
