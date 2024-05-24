import React from 'react'
import type { GridColDef } from '@mui/x-data-grid'
import Flag from 'react-world-flags'
import { Stack } from '@mui/material'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 200,
    renderCell: ({ row }) => (
      <Stack alignItems="center" direction="row" gap={ 1 }>
        <Flag code={ row.iso2 } height={ 16 }  />

        { `${row.name} ${row.emoji}` }
      </Stack>
    ),
  },
  {
    field: 'iso2',
    headerName: 'ISO',
    width: 80,
  },
  {
    field: 'region',
    headerName: 'Region',
    width: 110,
  },
  {
    field: 'currency',
    headerName: 'Currency',
    width: 110,
    valueGetter: (_, row) => `${row.currency} (${row.currency_symbol})`,
  },
  {
    field: 'phone_code',
    headerName: 'Phone code',
    type: 'number',
    width: 110,
  },
]

export default columns
