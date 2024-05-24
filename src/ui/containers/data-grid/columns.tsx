/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { IconButton, Stack, Tooltip } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { MdOutlineDeleteForever, MdOutlineModeEdit } from 'react-icons/md'
import { BiShowAlt } from 'react-icons/bi'

interface ActionColumnProps {
  onDelete?: (row: any) => void
  onEdit?: (row: any) => void
  onView?: (row: any) => void
}

export const useActionColumn = (props: ActionColumnProps = {}): GridColDef => {
  const { onDelete, onEdit, onView } = props

  return {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    flex: 1,
    minWidth: 160,
    maxWidth: 220,
    renderCell: ({ row }) => (
      <Stack direction="row" gap={ 1 }>
        <Tooltip title="View">
          <IconButton color="primary" onClick={ () => !!onView && onView(row) }>
            <BiShowAlt />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit">
          <IconButton color="secondary" onClick={ () => !!onEdit && onEdit(row) }>
            <MdOutlineModeEdit />
          </IconButton>
        </Tooltip>

        <Tooltip title="Remove">
          <IconButton color="error" onClick={ () => !!onDelete && onDelete(row) }>
            <MdOutlineDeleteForever />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }
}
