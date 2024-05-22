import { redirect } from 'next/navigation'
import { useSession } from '@/domain/hooks'
import React from 'react'

export default function Dashboard() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <div>Dashboard page</div>
  )
}
