'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AutocompleteElement, useForm, useWatch } from 'react-hook-form-mui'

import { appCountries, useAppActions, useAppState } from '@/domain/providers'
import type { Country } from '@/domain/db'

export function RegionField() {
  const [countryId, setCountryId] = useState<number | undefined>()
  const [stateId, setStateId] = useState<number | undefined>()
  const [cityId, setCityId] = useState<number | undefined>()
  const { countries, states, cities } = useAppState()
  const { getRegionData } = useAppActions()
  const { country } = useWatch()
  const { control } = useForm()
  console.info({ country, stateId, cityId, countries, states, cities })

  const countriesOptions = useMemo(() => (
    countries.map((c: Country) => (
      { label: c.name, value: c.id }
    ))
  ), [countries])

  useEffect(() => {
    getRegionData({
      countryId: country?.value,
    })
  }, [country?.value])

  return (
    <AutocompleteElement
      matchId
      required
      control={ control }
      label="Country"
      name="country"
      options={ countriesOptions }
      textFieldProps={ {
        fullWidth: true,
        margin: 'normal',
        // onChange: (value) => {
        //   console.info({ value })
        //   setCountryId(Number(value))
        // },
      } }
    />
  )
}
