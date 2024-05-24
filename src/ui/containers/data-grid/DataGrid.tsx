'use client'

import React, { useMemo } from 'react'
import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid'

import { Toolbar } from './Toolbar'
import type { DataGridProps } from './props-types'
import styles from './styles.module.scss'
import { useActionColumn } from './columns'

export function DataGrid(props: Readonly<DataGridProps>) {
  const {
    columns,
    rows = [],
    onAddClick,
    onDeleteClick,
    onEditClick,
    onViewClick,
    useActions,
    useAddButton,
    ...rest
  } = props

  const cols: GridColDef[] = useMemo(() => {
    const res = [...columns]

    if (useActions) {
      res.push(useActionColumn({
        onDelete: onDeleteClick,
        onEdit: onEditClick,
        onView: onViewClick,
      }))
    }

    return res
  }, [
    columns,
    useActions,
    onEditClick,
    onDeleteClick,
    onViewClick,
  ])

  return (
    <MuiDataGrid
      autoHeight
      className={ styles.dataGrid }
      columns={ cols }
      initialState={ {
        pagination: {
          paginationModel: {
            pageSize: 15,
          },
        },
      } }
      pageSizeOptions={ [15, 25, 50, 100] }
      rows={ rows }
      slotProps={ {
        toolbar: {
          showQuickFilter: true,
          onAddClick,
          useAddButton,
        },
      } }
      slots={ { toolbar: Toolbar } }
      { ...rest }
    />
  )
}
