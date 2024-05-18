import React from 'react'
import { Chip, Stack } from '@mui/material'

export function VersionSection() {
  return (
    <Stack direction="row" justifyContent="center" sx={ { mb: 2 } }>
      <Chip
        disabled
        color="secondary"
        label="v1.0.0"
        size="small"
        sx={ { cursor: 'pointer' } }
      />
    </Stack>
  )
}
