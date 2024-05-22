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
    width: 200,
    valueGetter: (_, row) => `${row.name} (${row.emoji})`,
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
