import type { GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'user',
    headerName: 'User',
    flex: 1,
    minWidth: 200,
    renderCell: ({ row }) => `${row.user?.username} (${row.user?.email})`,
  },
  {
    field: 'accessToken',
    headerName: 'Access token',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 100,
    maxWidth: 140,
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    flex: 1,
    minWidth: 200,
  },
]

export default columns
