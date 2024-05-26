import type { GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },
  {
    field: 'hotelId',
    headerName: 'Hotel',
    flex: 2,
    minWidth: 160,
    maxWidth: 200,
    valueGetter: (_, row) => `${row.hotel?.name}`,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 2,
    minWidth: 160,
    maxWidth: 200,
  },
  {
    field: 'basePrice',
    headerName: 'Base price',
    flex: 1,
    minWidth: 100,
    maxWidth: 140,
    type: 'number',
    valueGetter: (_, row) => `$${row.basePrice.toFixed(2)}`,
  },
  {
    field: 'taxes',
    headerName: 'Taxes',
    flex: 1,
    minWidth: 80,
    maxWidth: 100,
    type: 'number',
    valueGetter: (_, row) => `${row.taxes}%`,
  },
  {
    field: 'discount',
    headerName: 'Discount',
    flex: 1,
    minWidth: 80,
    maxWidth: 100,
    type: 'number',
    valueGetter: (_, row) => `${row.discount}%`,
  },
  {
    field: 'beds',
    headerName: 'Beds',
    flex: 1,
    minWidth: 80,
    maxWidth: 100,
    type: 'number',
  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    flex: 1,
    minWidth: 80,
    maxWidth: 100,
    type: 'number',
  },
  {
    field: 'bathrooms',
    headerName: 'Bathrooms',
    flex: 1,
    minWidth: 80,
    maxWidth: 100,
    type: 'number',
  },
  {
    field: 'available',
    headerName: 'Available',
    type: 'boolean',
    width: 110,
  },
]

export default columns
