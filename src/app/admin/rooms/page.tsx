import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin/content/Content'
import { RoomsList } from '@/app/features/rooms/list/RoomsList'
import { useSession } from '@/domain/hooks/cookies'

export default function Rooms() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Rooms">
      <RoomsList />
    </Content>
  )
}
