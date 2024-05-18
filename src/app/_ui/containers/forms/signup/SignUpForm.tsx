'use client'

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormContainer, useForm } from 'react-hook-form-mui'
import { Alert, Box } from '@mui/material'

import { authLogin } from '@/infra/services'
import {
  UsernameField,
  PasswordField,
  ActionsForm,
  NameField,
  DocumentField,
  EmailField,
  GenderBirthField,
  RegionField,
} from './components'

import type { SignUpFormValues } from './props-types'
import styles from './styles.module.scss'

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const formCtx = useForm<SignUpFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      documentType: '',
      documentNumber: '',
      email: '',
      password: '',
      username: '',
    },
  })

  const onSubmit = useCallback(async (data: SignUpFormValues) => {
    setError(null)
    setIsLoading(true)

    try {
      const { content: { message, user } } = await authLogin(data)
      console.info({ message, user })
      router.push('/')
    } catch (err: any) {
      const msg = err?.response?.data?.content?.message ?? err.message
      setError(msg ?? 'Unknown error')
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
      <Box className={ styles.formContainer }>
        { error ? (
          <Alert
            className={ styles.alert }
            severity="error"
          >
            { error }
          </Alert>
        ) : null }

        <NameField />

        <GenderBirthField />

        <DocumentField />

        <RegionField />

        <EmailField />

        <UsernameField />

        <PasswordField />

        <ActionsForm isLoading={ isLoading } />
      </Box>
    </FormContainer>
  )
}
