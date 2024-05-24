import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin'
import { CountriesList } from '@/app/features'
import { useSession } from '@/domain/hooks'

export default function Countries() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Countries">
      <CountriesList />
    </Content>
  )
}
