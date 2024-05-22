import React from 'react'
import { redirect } from 'next/navigation'
import { useSession } from '@/domain/hooks'

export default function Dashboard() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <div>Dashboard page</div>
  )
}
