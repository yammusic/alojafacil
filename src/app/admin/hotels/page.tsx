import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin/content/Content'
import { HotelsList } from '@/app/features/hotels/list/HotelsList'
import { useSession } from '@/domain/hooks/cookies'

export default function Hotels() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Hotels">
      <HotelsList />
    </Content>
  )
}
