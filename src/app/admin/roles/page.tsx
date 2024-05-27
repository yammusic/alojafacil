import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin'
import { RolesList } from '@/app/features'
import { useSession } from '@/domain/hooks'

export default function Roles() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Roles">
      <RolesList />
    </Content>
  )
}
