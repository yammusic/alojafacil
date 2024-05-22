import { redirect } from 'next/navigation'
import { useSession } from '@/domain/hooks'

export default function Admin() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')
  return redirect('/admin/dashboard')
}
