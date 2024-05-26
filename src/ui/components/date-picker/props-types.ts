import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers'
import type { DateTime } from 'luxon'
import type { ControllerProps } from 'react-hook-form-mui'

export interface DatePickerProps extends Partial<ControllerProps> {
  required?: boolean
  datePickerProps?: MuiDatePickerProps<DateTime, true>
}
