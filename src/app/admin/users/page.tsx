import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin/content/Content'
import { UsersList } from '@/app/features/users/list/UsersList'
import { useSession } from '@/domain/hooks/cookies'

export default function Users() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Users">
      <UsersList />
    </Content>
  )
}
