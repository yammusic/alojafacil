import React from 'react'
import type { GridColDef } from '@mui/x-data-grid'
import { Avatar, Stack, Typography } from '@mui/material'

import type { RoleAttributes } from '@/domain/db/features/Role/types'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'username',
    headerName: 'Username',
    flex: 2,
    minWidth: 180,
    renderCell: ({ row }) => (
      <Stack direction="row" sx={ { alignItems: 'center', gap: 2, height: '100%' } }>
        <Avatar src={ row.info?.avatar } sx={ { height: 28, width: 28 } } />

        <Typography variant="body2">{row.username}</Typography>
      </Stack>
    )
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 180,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 160,
    renderCell: ({ row }) => `${row.info?.firstName} ${row.info?.lastName}`,
  },
  {
    field: 'document',
    headerName: 'Document',
    flex: 1,
    minWidth: 160,
    renderCell: ({ row }) => (
      `${row.info?.documentType === 'ID' ? 'CC' : row.info?.documentType} ${row.info?.documentNumber}`
    ),
  },
  {
    field: 'roles',
    headerName: 'Roles',
    flex: 1,
    width: 80,
    maxWidth: 120,
    renderCell: ({ row }) => (
      <Stack direction="row" sx={ { alignItems: 'center', gap: 2, height: '100%' } }>
        { row.roles?.map((role: RoleAttributes) => (
          <Typography key={ role.id } variant="body2">{ role.name.humanize() }</Typography>
        )) }
      </Stack>
    ),
  },
]

export default columns
