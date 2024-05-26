/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AutocompleteElement, useForm, useWatch } from 'react-hook-form-mui'

import { useAppActions, useAppState } from '@/domain/providers/store'
import type { StateAttributes } from '@/domain/db/features/State/types'
import { fetchStates } from '@/infra/services'
import type { StateSelectProps } from './props-types'

export function StateSelect(props: Readonly<StateSelectProps>) {
  const [loading, setLoading] = useState(false)
  const { countryId, options, name, ...rest } = props

  const { states } = useAppState()
  const { setStates } = useAppActions()
  // const { country } = useWatch()
  // const { control } = useForm()

  const countriesOptions = useMemo(() => (
    states.map((c: StateAttributes) => (
      { label: c.name, id: c.id }
    ))
  ), [states])

  const loadStates = useCallback(async() => {
    if (countryId) {
      setLoading(true)
      const { content: { data } } = await fetchStates(countryId)
      setStates(data as any)
      setLoading(false)
    }
  }, [states, countryId])

  useEffect(() => {
    loadStates()
  }, [countryId])

  return (
    <AutocompleteElement
      matchId
      autocompleteProps={ {
        disabled: loading || !countryId,
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
