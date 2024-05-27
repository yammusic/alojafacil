'use client'

import React, { useCallback, useState } from 'react'
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'
import {
  Alert,
  Button,
  Grid,
  Stack,
} from '@mui/material'

import type { RoleFormProps, RoleFormValues } from './props-types'
import styles from './styles.module.scss'

export function RoleForm(props: Readonly<RoleFormProps>) {
  const [error, setError] = useState<string | null>(null)
  const { onCancel, onSubmit, role } = props ?? {}

  const formCtx = useForm<RoleFormValues>({
    defaultValues: {
      name: '',
    },
    values: role ?? {} as RoleFormValues,
  })

  const onSubmitHandler = useCallback(async (data: RoleFormValues) => {
    setError(null)

    try {
      onSubmit?.(data)
    } catch (err: any) {
      const msg = err?.response?.data?.content?.message ?? err.message
      setError(msg ?? 'Unknown error')
      throw err
    }
  }, [])

  return (
    <FormContainer
      FormProps={ { className: styles.form } }
      formContext={ formCtx }
      onSuccess={ onSubmitHandler }
    >
      <Grid container className={ styles.container }>
        <Grid item xs={ 12 }>
          { !!error && (
            <Alert
              className={ styles.alert }
              severity="error"
            >
              { error }
            </Alert>
          ) }

          {/* Name */}
          <TextFieldElement
            fullWidth
            required
            id="name"
            label="Name"
            margin="normal"
            name="name"
          />
        </Grid>

        <Grid item mt={ 4 } xs={ 12 }>
          <Stack className={ styles.actions } direction="row" spacing={ 2 }>
            <Button
              fullWidth
              color="secondary"
              onClick={ onCancel as any }
              size="large"
              variant="outlined"
            >
              Cancel
            </Button>

            <Button
              fullWidth
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormContainer>
  )
}
