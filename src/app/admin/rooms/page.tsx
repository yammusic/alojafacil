import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin'
import { useSession } from '@/domain/hooks'
import { RoomsList } from '@/app/features'

export default function Rooms() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Rooms">
      <RoomsList />
    </Content>
  )
}
