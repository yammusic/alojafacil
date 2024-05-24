'use client'

import React, { useCallback, useState } from 'react'
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'
import { Alert, Button, Grid, Stack } from '@mui/material'

import type { StateFormProps, StateFormValues } from './props-types'
import styles from './styles.module.scss'

export function StateForm(props: Readonly<StateFormProps>) {
  const [error, setError] = useState<string | null>(null)
  const { onCancel, onSubmit, state } = props ?? {}

  const formCtx = useForm<StateFormValues>({
    defaultValues: {
      name: '',
      countryId: 0,
      state_code: '',
    },
    values: state ?? {} as StateFormValues,
  })

  const onSubmitHandler = useCallback(async (data: StateFormValues) => {
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

          {/* ISO */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="iso3"
              label="ISO3"
              margin="normal"
              name="iso3"
            />

            <TextFieldElement
              fullWidth
              required
              id="iso2"
              label="ISO2"
              margin="normal"
              name="iso2"
            />
          </Stack>

          {/* Numeric/Phone Code */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="numeric_code"
              label="Numeric Code"
              margin="normal"
              name="numeric_code"
            />

            <TextFieldElement
              fullWidth
              required
              id="phone_code"
              label="Postal Code"
              margin="normal"
              name="phone_code"
              type="number"
            />
          </Stack>

          {/* Capital/Currency */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="capital"
              label="Capital"
              margin="normal"
              name="capital"
            />

            <TextFieldElement
              fullWidth
              required
              id="currency"
              label="Currency"
              margin="normal"
              name="currency"
            />
          </Stack>

          {/* Currency */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="currency_name"
              label="Currency Name"
              margin="normal"
              name="currency_name"
            />

            <TextFieldElement
              fullWidth
              required
              id="currency_symbol"
              label="Currency Symbol"
              margin="normal"
              name="currency_symbol"
            />
          </Stack>

          {/* TLD/Native */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="tld"
              label="TLD"
              margin="normal"
              name="tld"
            />

            <TextFieldElement
              fullWidth
              id="native"
              label="Native Name"
              margin="normal"
              name="native"
            />
          </Stack>

          {/* Region/Subregion */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="region"
              label="Region"
              margin="normal"
              name="region"
            />

            <TextFieldElement
              fullWidth
              required
              id="subregion"
              label="Subregion"
              margin="normal"
              name="subregion"
            />
          </Stack>

          {/* Latitude/Longitude */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="latitude"
              label="Latitude"
              margin="normal"
              name="latitude"
            />

            <TextFieldElement
              fullWidth
              required
              id="longitude"
              label="Longitude"
              margin="normal"
              name="longitude"
            />
          </Stack>

          {/* Emoji */}
          <TextFieldElement
            required
            id="emoji"
            label="Emoji"
            margin="normal"
            name="emoji"
            sx={ { mb: 4 } }
          />
        </Grid>

        <Grid item xs={ 12 }>
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
