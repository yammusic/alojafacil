'use client'

import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

import { appCountries, useAppActions } from '@/domain/providers'
import { fetchCountries } from '@/infra/services'
import columns from './columns'

export function CountriesList() {
  const { setCountries } = useAppActions()
  const countries = appCountries()

  const loadCountries = async() => {
    if (!countries || !countries.length) {
      const { content: { data } } = await fetchCountries()
      setCountries(data as any)
    }
  }

  useEffect(() => { loadCountries() }, [])

  return (
    <Box sx={ { height: 400, width: '100%' } }>
      <DataGrid
        checkboxSelection
        disableColumnFilter
        disableRowSelectionOnClick
        autosizeOptions={ {
          columns: ['name', 'actions'],
        } }
        columns={ columns }
        initialState={ {
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        } }
        pageSizeOptions={ [25] }
        rows={ countries }
        slotProps={ {
          toolbar: {
            showQuickFilter: true,
          },
        } }
        slots={ { toolbar: GridToolbar } }
      />
    </Box>
  )
}
