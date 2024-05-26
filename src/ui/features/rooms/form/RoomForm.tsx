'use client'

import React, { useCallback, useState } from 'react'
import { AutocompleteElement, CheckboxElement, FormContainer, TextFieldElement, useForm, useWatch } from 'react-hook-form-mui'
import { Alert, Button, Grid, Stack } from '@mui/material'

// import { HotelSelect } from '@/app/components'
import { mapRoomToValues, mapValuesToRoom } from './utils'
import type { RoomFormProps, RoomFormValues } from './props-types'
import styles from './styles.module.scss'
import { HotelSelect } from '@/app/components'

export function RoomForm(props: Readonly<RoomFormProps>) {
  const [error, setError] = useState<string | null>(null)
  const { onCancel, onSubmit, room } = props ?? {}
  const values = mapRoomToValues(room as any)

  const formCtx = useForm<RoomFormValues>({
    defaultValues: {
      type: '',
      description: '',
      location: '',
      picture: '',
      // images: [],
      // amenities: [],
      // features: [],
      // payments: [],
      available: true,
    },
    values,
  })
  const {
    hotelId = values.hotelId,
    images = values.images,
    amenities = values.amenities,
    features = values.features,
    payments = values.payments,
  } = useWatch({ control: formCtx.control })
  console.info('HotelForm', { hotelId, room, images })

  const onSubmitHandler = useCallback(async (data: RoomFormValues) => {
    setError(null)

    try {
      console.info('room', { data }, mapValuesToRoom(data))
      onSubmit?.(mapValuesToRoom(data))
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

          <HotelSelect
            required
            label="Hotel"
            name="hotelId"
          />

          <TextFieldElement
            fullWidth
            required
            id="type"
            label="Type"
            margin="normal"
            name="type"
          />

          <TextFieldElement
            fullWidth
            multiline
            id="description"
            label="Description"
            margin="normal"
            name="description"
            rows={ 3 }
          />

          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="basePrice"
              label="Base Price"
              margin="normal"
              name="basePrice"
              type="number"
            />

            <TextFieldElement
              fullWidth
              required
              id="location"
              label="Location"
              margin="normal"
              name="location"
            />
          </Stack>

          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="taxes"
              label="Taxes"
              margin="normal"
              name="taxes"
              type="number"
            />

            <TextFieldElement
              fullWidth
              id="discount"
              label="Discount"
              margin="normal"
              name="discount"
              type="number"
            />
          </Stack>

          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="beds"
              label="Beds"
              margin="normal"
              name="beds"
              type="number"
            />

            <TextFieldElement
              fullWidth
              required
              id="capacity"
              label="Bed Capacity"
              margin="normal"
              name="capacity"
              type="number"
            />

            <TextFieldElement
              fullWidth
              required
              id="bathrooms"
              label="Bathrooms"
              margin="normal"
              name="bathrooms"
              type="number"
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
