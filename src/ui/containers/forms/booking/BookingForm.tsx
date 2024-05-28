'use client'

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, Button, Grid, Snackbar, Stack, Typography } from '@mui/material'
import { Controller, FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'
import { DatePicker } from '@mui/x-date-pickers'

import { DocumentSelect, GenderSelect } from '@/app/components'
import { appCurrentUser } from '@/domain/providers/store'
import type { BookingAttributes } from '@/domain/db/features/Booking/types'
import type { BookingFormProps, BookingFormValues } from './props-types'
import { createBooking } from '@/infra/services'
import { delay } from '@/domain/utils'

export function BookingForm(props: Readonly<BookingFormProps>) {
  const { booking } = props
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const router = useRouter()
  const currentUser = appCurrentUser()

  const formCtx = useForm<BookingFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      documentType: '',
      documentNumber: '',
      address: '',
      contactName: '',
      contactPhone: '',
    }
  })

  const onSubmit = useCallback(async (data: BookingFormValues) => {
    const { contactName, contactPhone, ...rest } = data

    try {
      const book: BookingAttributes = {
        roomId: booking.roomId,
        userId: Number(currentUser?.id),
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guestInfo: JSON.stringify({
          ...rest,
          adults: booking.adults,
          childrens: booking.childrens,
          dateOfBirth: data.dateOfBirth.toJSDate(),
        }),
        emergency: JSON.stringify({
          contactName,
          contactPhone,
        }),
      }

      const { content: { message } } =await createBooking(book)
      setNotification(message)
      setOpenSnackbar(true)

      await delay(2000)
      router.push('/')
    } catch (exception) {
      console.error(exception)
      setNotification('Unknown error')
      setOpenSnackbar(true)
    }
  }, [booking])

  const onCancel = useCallback(() => {
    router.back()
  }, [])

  const onSnackbarClose = useCallback(() => {
    setOpenSnackbar(false)
  }, [])

  return (
    <FormContainer formContext={ formCtx } onSuccess={ onSubmit }>
      <Grid container>
        <Grid item xs={ 12 }>
          <Typography gutterBottom variant="h6">Personal Information</Typography>
        </Grid>

        <Grid item mb={ 4 } xs={ 12 }>
          <Stack direction="row" gap={ 2 }>
            <TextFieldElement
              fullWidth
              required
              id="firstName"
              label="First Name"
              margin="normal"
              name="firstName"
            />

            <TextFieldElement
              fullWidth
              required
              id="lastName"
              label="Last Name"
              margin="normal"
              name="lastName"
            />
          </Stack>

          <Stack direction="row" gap={ 2 }>
            <TextFieldElement
              fullWidth
              required
              id="email"
              label="Email"
              margin="normal"
              name="email"
              type="email"
            />
          </Stack>

          <Stack direction="row" gap={ 2 }>
            <DocumentSelect
              fullWidth
              required
              id="documentType"
              label="Document Type"
              margin="normal"
              name="documentType"
            />

            <TextFieldElement
              fullWidth
              required
              id="documentNumber"
              label="Document Number"
              margin="normal"
              name="documentNumber"
              type="number"
            />
          </Stack>

          <Stack direction="row" gap={ 2 }>
            <GenderSelect
              required
              label="Gender"
              margin="normal"
              name="gender"
            />

            <Controller
              control={ formCtx.control }
              name="dateOfBirth"
              render={ ({ field }) => (
                <DatePicker
                  { ...field }
                  disableFuture
                  format="dd/MM/yyyy"
                  label="Date of Birth"
                  slotProps={ {
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                      required: true,
                    },
                  } }
                  value={ field.value ?? null }
                />
              ) }
              rules={ { required: true } }
            />
          </Stack>

          <Stack direction="row" gap={ 2 }>
            <TextFieldElement
              fullWidth
              required
              id="phone"
              label="Phone"
              margin="normal"
              name="phone"
              type="tel"
            />

            <TextFieldElement
              fullWidth
              id="address"
              label="Address"
              margin="normal"
              name="address"
            />
          </Stack>
        </Grid>

        <Grid item xs={ 12 }>
          <Typography gutterBottom variant="h6">Contact Information</Typography>
        </Grid>

        <Grid item mb={ 4 } xs={ 12 }>
          <Stack direction="row" gap={ 2 }>
            <TextFieldElement
              fullWidth
              required
              id="contactName"
              label="Contact Name"
              margin="normal"
              name="contactName"
            />

            <TextFieldElement
              fullWidth
              required
              id="contactPhone"
              label="Contact Phone"
              margin="normal"
              name="contactPhone"
              type="tel"
            />
          </Stack>
        </Grid>

        <Grid item xs={ 12 }>
          <Stack direction="row" gap={ 2 } justifyContent="flex-end">
            <Button color="secondary" onClick={ onCancel } variant="outlined">
              Cancel
            </Button>

            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
        autoHideDuration={ 3000 }
        onClose={ onSnackbarClose }
        open={ openSnackbar }
      >
        <Alert
          onClose={ onSnackbarClose }
          severity="success"
          sx={ { width: '100%' } }
          variant="filled"
        >
          { notification }
        </Alert>
      </Snackbar>
    </FormContainer>
  )
}
