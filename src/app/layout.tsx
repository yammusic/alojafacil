import React from 'react'
import type { Metadata } from 'next'

import { AppLayout } from '@/app/layouts'
import { TopLoader } from '@/app/containers'

export const metadata: Metadata = {
  title: 'Aloja Fácil',
}

interface Props {
  children: React.ReactNode
}

export default function PageLayout({ children }: Readonly<Props>) {
  return (
    <AppLayout>
      <TopLoader />

      { children }
    </AppLayout>
  )
}
