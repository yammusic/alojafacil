'use client'

import React, { useCallback, useState } from 'react'
import { AutocompleteElement, FormContainer, TextFieldElement, useForm, useWatch } from 'react-hook-form-mui'
import { Alert, Button, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, Stack, Typography } from '@mui/material'
import { IoClose } from 'react-icons/io5'

import type { HotelFormProps, HotelFormValues } from './props-types'
import styles from './styles.module.scss'

export function HotelForm(props: Readonly<HotelFormProps>) {
  const { onCloseModal } = props ?? {}
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formCtx = useForm<HotelFormValues>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
      latitude: '',
      longitude: '',
      postalCode: '',
      images: [],
      amenities: [],
      policies: [],
      features: [],
      payments: [],
      available: true,
    },
  })
  const {
    images,
    amenities,
    policies,
    features,
    payments,
  } = useWatch({ control: formCtx.control })

  const onSubmit = useCallback(async (data: HotelFormValues) => {
    setError(null)
    setIsLoading(true)

    try {
      console.info('hotel', { data })
    } catch (err: any) {
      // const msg = err?.response?.data?.content?.message ?? err.message
      // setError(msg ?? 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <FormContainer
      FormProps={ { className: styles.form } }
      formContext={ formCtx }
      onSuccess={ onSubmit }
    >
      <Grid container className={ styles.container }>
        <Grid item className={ styles.header } xs={ 12 }>
          <Typography variant="h4">Add Hotel</Typography>

          <Stack>
            <IconButton onClick={ onCloseModal as any }>
              <IoClose />
            </IconButton>
          </Stack>
        </Grid>

        <Grid item xs={ 12 }>
          { error ? (
            <Alert
              className={ styles.alert }
              severity="error"
            >
              { error }
            </Alert>
        ) : null }

          <TextFieldElement
            fullWidth
            required
            id="name"
            label="Name"
            margin="normal"
            name="name"
          />

          <TextFieldElement
            fullWidth
            multiline
            id="description"
            label="Description"
            margin="normal"
            name="description"
            rows={ 4 }
          />

          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="address"
              label="Address"
              margin="normal"
              name="address"
            />

            <TextFieldElement
              fullWidth
              required
              id="postalCode"
              label="Postal Code"
              margin="normal"
              name="postalCode"
              style={ {
                maxWidth: '190px',
              } }
            />
          </Stack>

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

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Images"
            name="images"
            options={ images as string[] }
            textFieldProps={ {
              margin: 'normal',
            } }
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Amenities"
            name="amenities"
            options={ amenities as string[] }
            textFieldProps={ {
              margin: 'normal',
            } }
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Policies"
            name="policies"
            options={ policies as string[] }
            textFieldProps={ {
              margin: 'normal',
            } }
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Features"
            name="features"
            options={ features as string[] }
            textFieldProps={ {
              margin: 'normal',
            } }
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Payments"
            name="payments"
            options={ payments as string[] }
            textFieldProps={ {
              margin: 'normal',
            } }
          />

          <FormControlLabel
            control={ <Checkbox color="primary" value="remember" /> }
            id="available"
            // label={ <Typography variant="body2">Available</Typography> }
            label="Available"
            name="available"
            sx={ { mb: 2, mt: 1 } }
          />

          <Stack className={ styles.actions } direction="row" spacing={ 2 }>
            <Button
              fullWidth
              color="inherit"
              onClick={ onCloseModal as any }
              size="large"
              variant="outlined"
            >
              Cancel
            </Button>

            <Button
              fullWidth
              color="primary"
              disabled={ isLoading }
              size="large"
              type="submit"
              variant="contained"
            >
              { (isLoading
                ? <CircularProgress size={ 24 } />
                : 'Save'
              ) }
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormContainer>
  )
}
