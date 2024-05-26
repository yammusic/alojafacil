'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'

import { useHotelsActions, useHotelsState } from '@/domain/providers/store'
import type { HotelAttributes } from '@/domain/db/features/Hotel/types'
import { fetchHotels } from '@/infra/services'
import type { HotelSelectProps } from './props-types'

export function HotelSelect(props: Readonly<HotelSelectProps>) {
  const { options, name, ...rest } = props

  const { hotels } = useHotelsState()
  const { setHotels } = useHotelsActions()

  const countriesOptions = useMemo(() => (
    hotels.map((c: HotelAttributes) => (
      { label: c.name, id: c.id }
    ))
  ), [hotels])

  const loadHotels = useCallback(async() => {
    if (!hotels || hotels.length === 0) {
      const { content: { data } } = await fetchHotels()
      setHotels(data as any)
    }
  }, [hotels])

  useEffect(() => { loadHotels() }, [])

  return (
    <AutocompleteElement
      matchId
      autocompleteProps={ {
        disabled: !hotels || hotels.length === 0,
      } }
      label="Hotel"
      name={ name ?? 'hotel' }
      options={ options ?? countriesOptions }
      textFieldProps={ {
        margin: 'normal',
      } }
      { ...rest }
    />
  )
}
