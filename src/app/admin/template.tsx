import React from 'react'
import type { Metadata } from 'next'

import { AdminLayout } from '@/app/layouts/admin'

export const metadata: Metadata = {
  title: 'Aloja Fácil > Admin Dashboard',
}

interface Props {
  children: React.ReactNode
}

export default function AdminTemplate({ children }: Readonly<Props>) {
  return (
    <AdminLayout>
      { children }
    </AdminLayout>
  )
}
