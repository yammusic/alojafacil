'use client'

import React, { useCallback, useState } from 'react'
import { Controller, FormContainer, TextFieldElement, useForm, useWatch,  } from 'react-hook-form-mui'
import { Alert, Button, Grid, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import type { User } from '@/domain/db/features/User/model'
import { CitySelect, CountrySelect, DocumentSelect, GenderSelect, RoleSelect, StateSelect } from '@/app/components'
import { mapUserToValues, mapValuesToUser } from './utils'
import type { UserFormProps, UserFormValues } from './props-types'
import styles from './styles.module.scss'

export function UserForm(props: Readonly<UserFormProps>) {
  const [error, setError] = useState<string | null>(null)
  const { onCancel, onSubmit, user, mode } = props ?? {}

  const formCtx = useForm<UserFormValues>({
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      avatar: '',
      documentType: '',
      documentNumber: '',
      gender: '',
      phoneNumber: '',
      address: '',
    },
    values: mapUserToValues(user as User),
  })
  const { countryId, stateId } = useWatch({ control: formCtx.control })

  const onSubmitHandler = useCallback(async (data: UserFormValues) => {
    setError(null)

    try {
      onSubmit?.(mapValuesToUser(data) as any)
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

          {/* Username */}
          <TextFieldElement
            fullWidth
            required
            id="username"
            label="Username"
            margin="normal"
            name="username"
          />

          {/* Email */}
          <TextFieldElement
            fullWidth
            required
            id="email"
            label="Email"
            margin="normal"
            name="email"
            type="email"
          />

          {/* Password */}
          { (mode === 'add') && (
            <TextFieldElement
              fullWidth
              required
              id="password"
              label="Password"
              margin="normal"
              name="password"
              type="password"
            />
          )}

          {/* Avatar */}
          <TextFieldElement
            fullWidth
            id="avatar"
            label="Avatar"
            margin="normal"
            name="avatar"
          />

          {/* Name */}
          <Stack direction="row" sx={ { gap: 2 } }>
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

          {/* Document */}
          <Stack direction="row" sx={ { gap: 2 } }>
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

          {/* Gender/Birth */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <GenderSelect
              label="Gender"
              name="gender"
            />

            <RoleSelect
              multiple
              required
              autocompleteProps={ {
                fullWidth: true,
              } }
              label="Roles"
              name="roles"
            />
          </Stack>

          {/* Gender/Birth */}
          <Stack direction="row" sx={ { gap: 2 } }>
            <TextFieldElement
              fullWidth
              required
              id="phoneNumber"
              label="Phone Number"
              margin="normal"
              name="phoneNumber"
              type="number"
            />

            <Controller
              control={ formCtx.control }
              name="dateOfBirth"
              render={ ({ field }) => (
                <DatePicker
                  { ...field }
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

          <CountrySelect
            required
            label="Country"
            name="countryId"
          />

          <StateSelect
            required
            countryId={ countryId as number }
            label="State"
            name="stateId"
          />

          <CitySelect
            required
            label="City"
            name="cityId"
            stateId={ stateId as number }
          />

          {/* Address */}
          <TextFieldElement
            fullWidth
            id="address"
            label="Address"
            margin="normal"
            name="address"
          />
        </Grid>

        <Grid item sx={ { mt: 4 } } xs={ 12 }>
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
