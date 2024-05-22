export interface SignInFormProps {
  action?: string
  onSubmit?: (data: SignInFormValues) => void
}

export interface SignInFormValues {
  password: string
  username: string
}
