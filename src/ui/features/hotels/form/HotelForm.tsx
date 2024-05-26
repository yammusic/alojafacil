'use client'

import React, { useCallback, useState } from 'react'
import { AutocompleteElement, CheckboxElement, FormContainer, TextFieldElement, useForm, useWatch } from 'react-hook-form-mui'
import { Alert, Button, Grid, Stack } from '@mui/material'

import type { HotelFormProps, HotelFormValues } from './props-types'
import styles from './styles.module.scss'
import { CitySelect, CountrySelect, StateSelect } from '@/app/components'
import { mapHotelToValues, mapValuesToHotel } from './utils'

export function HotelForm(props: Readonly<HotelFormProps>) {
  const [error, setError] = useState<string | null>(null)
  const { onCancel, onSubmit, hotel } = props ?? {}
  const values = mapHotelToValues(hotel as any)

  const formCtx = useForm<HotelFormValues>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
      latitude: '',
      longitude: '',
      postalCode: '',
      picture: '',
      images: [],
      amenities: [],
      policies: [],
      features: [],
      payments: [],
      available: true,
    },
    values,
  })
  const {
    countryId = values.countryId,
    stateId = values.stateId,
    images = values.images,
    amenities = values.amenities,
    policies = values.policies,
    features = values.features,
    payments = values.payments,
  } = useWatch({ control: formCtx.control })

  const onSubmitHandler = useCallback(async (data: HotelFormValues) => {
    setError(null)

    try {
      onSubmit?.(mapValuesToHotel(data))
    } catch (err: any) {
      const msg = err?.response?.data?.content?.message ?? err.message
      setError(msg ?? 'Unknown error')
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
            rows={ 2 }
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

          <CountrySelect
            required
            label="Country"
            name="countryId"
          />

          <StateSelect
            required
            countryId={ countryId }
            label="State"
            name="stateId"
          />

          <CitySelect
            required
            label="City"
            name="cityId"
            stateId={ stateId }
          />

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

          <TextFieldElement
            fullWidth
            required
            id="picture"
            label="Picture"
            margin="normal"
            name="picture"
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Images"
            name="images"
            options={ images.length > 0 ? images : values.images }
            textFieldProps={ {
              margin: 'normal',
              helperText: 'Write image URL and press Enter to add',
            } }
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Amenities"
            name="amenities"
            options={ amenities.length > 0 ? amenities : values.amenities }
            textFieldProps={ {
              margin: 'normal',
              helperText: 'Write the amenity and press Enter to add',
            } }
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Policies"
            name="policies"
            options={ policies.length > 0 ? policies : values.policies }
            textFieldProps={ {
              margin: 'normal',
              helperText: 'Write the policy and press Enter to add',
            } }
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Features"
            name="features"
            options={ features.length > 0 ? features : values.features }
            textFieldProps={ {
              margin: 'normal',
              helperText: 'Write the feature and press Enter to add',
            } }
          />

          <AutocompleteElement
            multiple
            autocompleteProps={ {
              freeSolo: true,
            } }
            label="Payments"
            name="payments"
            options={ payments.length > 0 ? payments : values.payments }
            textFieldProps={ {
              margin: 'normal',
              helperText: 'Write the payment and press Enter to add',
            } }
          />

          <Stack direction="row" sx={ { gap: 2, mb: 3 } }>
            <CheckboxElement
              id="available"
              label="Available"
              name="available"
            />
          </Stack>

          <Stack
            className={ styles.actions }
            direction="row"
            spacing={ 2 }
          >
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
