'use client'

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

import styles from './styles.module.scss'

export function Toolbar(props: Readonly<GridToolbarProps>) {
  const { onAddClick, useAddButton } = props

  return (
    <GridToolbarContainer className={ styles.toolbar }>
      <GridToolbarQuickFilter variant="outlined" />

      <Stack className={ styles.stack } direction="row">
        <GridToolbarExport />

        <GridToolbarDensitySelector />

        { !!useAddButton && (
          <Tooltip title="Add">
            <Fab
              aria-label="add"
              className={ styles.addBtn }
              color="primary"
              onClick={ onAddClick }
            >
              <MdAdd size={ 20 } />
            </Fab>
          </Tooltip>
        ) }
      </Stack>
    </GridToolbarContainer>
  )
}
