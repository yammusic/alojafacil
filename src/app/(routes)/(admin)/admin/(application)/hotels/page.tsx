import React from 'react'
import { Content } from '@/app/containers/admin'
import { HotelsList } from '@/app/features'

export default function Hotels() {
  return (
    <Content p={ 0 } title="Hotels">
      <HotelsList />
    </Content>
  )
}
