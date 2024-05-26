/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AutocompleteElement, useForm, useWatch } from 'react-hook-form-mui'

import { useAppActions, useAppState } from '@/domain/providers/store'
import type { CityAttributes } from '@/domain/db/features/City/types'
import { fetchCities } from '@/infra/services'
import type { CitySelectProps } from './props-types'

export function CitySelect(props: Readonly<CitySelectProps>) {
  const [loading, setLoading] = useState(false)
  const { stateId, options, name, ...rest } = props

  const { cities } = useAppState()
  const { setCities } = useAppActions()

  const countriesOptions = useMemo(() => (
    cities.map((c: CityAttributes) => (
      { label: c.name, id: c.id }
    ))
  ), [cities])

  const loadCities = useCallback(async() => {
    if (stateId) {
      setLoading(true)
      const { content: { data } } = await fetchCities(stateId)
      setCities(data as any)
      setLoading(false)
    }
  }, [cities, stateId])

  useEffect(() => {
    loadCities()
  }, [stateId])

  return (
    <AutocompleteElement
      matchId
      autocompleteProps={ {
        disabled: loading || !stateId,
      } }
      label="State"
      name={ name ?? 'state' }
      options={ options ?? countriesOptions }
      textFieldProps={ {
        margin: 'normal',
      } }
      { ...rest }
    />
  )
}
