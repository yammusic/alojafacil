'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'

import { useAppActions, useAppState } from '@/domain/providers/store'
import type { CountryAttributes } from '@/domain/db/features/Country/types'
import { fetchCountries } from '@/infra/services'
import type { CountrySelectProps } from './props-types'

export function CountrySelect(props: Readonly<CountrySelectProps>) {
  const { options, name, ...rest } = props

  const { countries } = useAppState()
  const { setCountries } = useAppActions()

  const countriesOptions = useMemo(() => (
    countries.map((c: CountryAttributes) => (
      { label: c.name, id: c.id }
    ))
  ), [countries])

  const loadCountries = useCallback(async() => {
    if (!countries || countries.length === 0) {
      const { content: { data } } = await fetchCountries()
      setCountries(data as any)
    }
  }, [countries])

  useEffect(() => { loadCountries() }, [])

  return (
    <AutocompleteElement
      matchId
      label="Country"
      name={ name ?? 'country' }
      options={ options ?? countriesOptions }
      textFieldProps={ {
        margin: 'normal',
      } }
      { ...rest }
    />
  )
}
