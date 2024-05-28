import React from 'react'
import { redirect } from 'next/navigation'

import { Content } from '@/app/containers/admin/content/Content'
import { CountriesList } from '@/app/features/countries/list/CountriesList'
import { useSession } from '@/domain/hooks/cookies'

export default function Countries() {
  const session = useSession()
  if (!session) return redirect('/auth/sign-in')

  return (
    <Content title="Countries">
      <CountriesList />
    </Content>
  )
}
