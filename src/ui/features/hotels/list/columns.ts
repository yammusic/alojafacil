import type { GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 3,
    minWidth: 180,
  },
  {
    field: 'cityId',
    headerName: 'City',
    flex: 1,
    minWidth: 100,
    maxWidth: 160,
    valueGetter: (_, row) => `${row.city?.name}`,
  },
  {
    field: 'stateId',
    headerName: 'State',
    flex: 1,
    minWidth: 100,
    maxWidth: 160,
    valueGetter: (_, row) => `${row.state?.name}`,
  },
  {
    field: 'countryId',
    headerName: 'Country',
    flex: 1,
    minWidth: 100,
    maxWidth: 160,
    valueGetter: (_, row) => `${row.country?.name}`,
  },
  {
    field: 'postalCode',
    headerName: 'Postal code',
    flex: 1,
    minWidth: 110,
    maxWidth: 160,
  },
  {
    field: 'available',
    headerName: 'Available',
    type: 'boolean',
    width: 110,
  },
]

export default columns
