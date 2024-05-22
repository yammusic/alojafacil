export interface SignUpFormProps {
  action?: string
  onSubmit?: (data: SignUpFormValues) => void
}

export interface SignUpFormValues {
  firstName: string
  lastName: string
  gender: string
  birthDate: string
  documentType: string
  documentNumber: string
  email: string
  password: string
  username: string
}
