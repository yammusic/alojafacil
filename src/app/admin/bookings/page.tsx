import { Content } from '@/app/containers/admin'
import { useSession } from '@/domain/hooks'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Reservations() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Hotels">
      {/* <BookingsList /> */}
    </Content>
  )
}
