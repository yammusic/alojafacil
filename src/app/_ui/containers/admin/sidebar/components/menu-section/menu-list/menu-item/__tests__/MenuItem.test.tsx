import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import type { SidebarMenuItem } from '@/store'
import { MenuItem } from '../MenuItem'

describe('MenuItem', () => {
  const item: SidebarMenuItem = {
    id: '1',
    url: '/',
    title: 'Item 1',
    icon: 'icon1',
    caption: 'Caption 1',
    chip: {
      color: 'primary',
      label: 'chip1',
    },
    type: 'item',
    disabled: false,
  }

  const level = 1

  test('renders the item title', () => {
    const { getByText } = render(<MenuItem item={ item } level={ level } />)
    expect(getByText('Item 1')).toBeInTheDocument()
  })

  test('renders the item caption', () => {
    const { getByText } = render(<MenuItem item={ item } level={ level } />)
    expect(getByText('Caption 1')).toBeInTheDocument()
  })

  test('renders the item chip', () => {
    const { getByText } = render(<MenuItem item={ item } level={ level } />)
    expect(getByText('chip1')).toBeInTheDocument()
  })

  test('calls onItemPress when clicked', () => {
    const onItemPress = jest.fn()
    const { getByRole } = render(
      <MenuItem item={ item } level={ level } onItemPress={ onItemPress } />
    )
    fireEvent.click(getByRole('button'))
    expect(onItemPress).toHaveBeenCalledWith('1')
  })

  test('disables the button when item.disabled is true', () => {
    const { getByRole } = render(
      <MenuItem item={ { ...item, disabled: true } } level={ level } />
    )
    expect(getByRole('button')).toBeDisabled()
  })

  test('sets selected state when item is active', () => {
    const { getByRole } = render(
      <MenuItem
        item={ item }
        itemsActive={ ['1'] }
        level={ level }
        setSidebarMenuActive={ jest.fn() }
      />
    )
    expect(getByRole('button')).toHaveClass('Mui-selected')
  })

  test('sets background color when level is greater than 1', () => {
    const { getByRole } = render(<MenuItem item={ item } level={ 2 } />)
    expect(getByRole('button')).toHaveStyle({ backgroundColor: 'transparent' })
  })

  test('sets padding when level is greater than 1', () => {
    const { getByRole } = render(<MenuItem item={ item } level={ 2 } />)
    expect(getByRole('button')).toHaveStyle({ paddingLeft: '48px' })
  })
})
