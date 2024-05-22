import React from 'react'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import { AppLayout } from '@/app/layouts'

export const metadata: Metadata = {
  title: 'Aloja Fácil',
}

interface Props {
  children: ReactNode
}

export default function PageLayout({ children }: Readonly<Props>) {
  return (
    <AppLayout>
      { children }
    </AppLayout>
  )
}
