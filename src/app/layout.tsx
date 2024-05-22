import React from 'react'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
// import Dynamic from 'next/dynamic'

import { AppLayout } from '@/app/layouts'
import { TopLoader } from '@/app/containers'

// const DynamicAppLayout = Dynamic((() => import('@/app/layouts/app/AppLayout') as any), { ssr: false }) as any
// const TopLoader = Dynamic((() => import('@/app/containers/top-loader/TopLoader') as any), { ssr: false })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Aloja Fácil',
}

interface Props {
  children: ReactNode
}

export default function PageLayout({ children }: Readonly<Props>) {
  return (
    <AppLayout>
      <TopLoader />

      { children }
    </AppLayout>
  )
}
