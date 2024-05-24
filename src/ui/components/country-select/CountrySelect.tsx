'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AutocompleteElement, useForm, useWatch } from 'react-hook-form-mui'

import { useAppActions, useAppState } from '@/domain/providers/store'
import type { CountryAttributes } from '@/domain/db/features/Country/types'
import { fetchCountries } from '@/infra/services'
import { CountrySelectProps } from './props-types'

export function CountrySelect(props: Readonly<CountrySelectProps>) {
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null)
  const { options, name, ...rest } = props

  const { countries } = useAppState()
  const { setCountries } = useAppActions()
  // const { country } = useWatch()
  // const { control } = useForm()

  const countriesOptions = useMemo(() => (
    countries.map((c: CountryAttributes) => (
      { label: c.name, value: c.id }
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
      { ...rest }
    />
  )
}
