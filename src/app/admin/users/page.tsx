import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin'
import { UsersList } from '@/app/features'
import { useSession } from '@/domain/hooks'

export default function Users() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Users">
      <UsersList />
    </Content>
  )
}
