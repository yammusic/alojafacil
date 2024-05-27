import type { GridColDef } from '@mui/x-data-grid'

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
    renderCell: ({ row }) => `${row.name.humanize()}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 200,
  },
]

export default columns
