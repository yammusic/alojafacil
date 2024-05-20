import React from 'react'
import { Content } from '@/app/containers/admin'
import { CountriesList } from '@/app/features'

export default function Countries() {
  return (
    <Content title="Countries">
      <CountriesList />
    </Content>
  )
}
