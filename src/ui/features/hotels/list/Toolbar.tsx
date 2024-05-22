import React from 'react'
import type { GridToolbarProps } from '@mui/x-data-grid'
import { Fab, Stack, Tooltip } from '@mui/material'
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { MdAdd } from 'react-icons/md'

export function Toolbar(props: Readonly<GridToolbarProps>) {
  const { onAddClick } = props

  return (
    <GridToolbarContainer sx={ { p: 2, display: 'flex', justifyContent: 'space-between' } }>
      <GridToolbarQuickFilter variant="outlined" />

      <Stack direction="row" sx={ { gap: 1, alignItems: 'center' } }>
        <GridToolbarExport />

        <GridToolbarDensitySelector />

        <Tooltip title="Add">
          <Fab
            aria-label="add"
            color="primary"
            onClick={ onAddClick }
            style={ { width: 32, minHeight: 32, height: 32 } }
          >
            <MdAdd size={ 20 } />
          </Fab>
        </Tooltip>
      </Stack>
    </GridToolbarContainer>
  )
}
