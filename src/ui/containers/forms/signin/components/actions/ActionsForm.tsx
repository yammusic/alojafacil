import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material'

import type { ActionsFormProps } from './props-types'
import styles from '../../styles.module.scss'

export function ActionsForm(props: Readonly<ActionsFormProps>) {
  const { isLoading } = props

  return (
    <>
      <Box className={ styles.actions }>
        <FormControlLabel
          control={ <Checkbox color="primary" value="remember" /> }
          label={ <Typography variant="body2">Keep me logged in</Typography> }
        />
      </Box>

      <Button
        fullWidth
        className={ styles.submit }
        disabled={ isLoading }
        type="submit"
        variant="contained"
      >
        { isLoading ? (
          <CircularProgress color="inherit" size={ 24 } />
        ) : 'Sign In' }
      </Button>
    </>
  )
}
