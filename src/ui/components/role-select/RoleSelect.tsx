'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'

import { useAppActions, useAppState } from '@/domain/providers/store'
import type { RoleAttributes } from '@/domain/db/features/Role/types'
import { fetchRoles } from '@/infra/services'
import type { RoleSelectProps } from './props-types'

export function RoleSelect(props: Readonly<RoleSelectProps>) {
  const { options, name, ...rest } = props

  const { roles } = useAppState()
  const { setRoles } = useAppActions()

  const countriesOptions = useMemo(() => (
    roles.map((c: RoleAttributes) => (
      { label: c.name.humanize(), id: c.id }
    ))
  ), [roles])

  const loadRoles = useCallback(async() => {
    if (!roles || roles.length === 0) {
      const { content: { data } } = await fetchRoles()
      setRoles(data as any)
    }
  }, [roles])

  useEffect(() => { loadRoles() }, [])

  return (
    <AutocompleteElement
      matchId
      label="Role"
      name={ name ?? 'role' }
      options={ options ?? countriesOptions }
      textFieldProps={ {
        margin: 'normal',
      } }
      { ...rest as any }
    />
  )
}
