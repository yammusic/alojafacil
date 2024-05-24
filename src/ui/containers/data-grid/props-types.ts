import type { DataGridProps as MuiDataGridProps } from '@mui/x-data-grid'

export interface DataGridProps extends MuiDataGridProps {
  onAddClick?: () => void
  onDeleteClick?: (item: any) => void
  onEditClick?: (item: any) => void
  onViewClick?: (item: any) => void
  useActions?: boolean
  useAddButton?: boolean
}
