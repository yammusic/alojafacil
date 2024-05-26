import React from 'react'
import { SelectElement } from 'react-hook-form-mui'

import type { DocumentSelectProps } from './props-types'

const DOCUMENT_TYPES = [
  { label: 'Identity Card', id: 'ID' },
  { label: 'Passport', id: 'PASSPORT' },
  { label: 'Driver License', id: 'DRIVER' },
  { label: 'Other', id: 'OTHER' },
]

export function DocumentSelect(props: Readonly<DocumentSelectProps>) {
  const { options, name, label, ...rest } = props

  return (
    <SelectElement
      label={ label ?? 'Document Type' }
      margin="normal"
      name={ name ?? 'documentType' }
      options={ options ?? DOCUMENT_TYPES }
      { ...rest }
    />
  )
}
