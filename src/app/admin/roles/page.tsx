import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin/content/Content'
import { RolesList } from '@/app/features/roles/list/RolesList'
import { useSession } from '@/domain/hooks/cookies'

export default function Roles() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Roles">
      <RolesList />
    </Content>
  )
}
