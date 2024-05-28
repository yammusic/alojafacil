import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin/content/Content'
import { SessionsList } from '@/app/features/sessions/list/SessionsList'
import { useSession } from '@/domain/hooks/cookies'

export default function Sessions() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Sessions">
      <SessionsList />
    </Content>
  )
}
