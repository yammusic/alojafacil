import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ItemChip } from '../item-chip/MenuItemChip'
import type { ItemChipProps } from '../props-types'

describe('ItemChip', () => {
  test('Must renders nothing if chip is falsy', () => {
    const { queryByRole } = render(<ItemChip chip={ undefined } />)
    expect(queryByRole('button')).toBeNull()
  })

  test('Must renders a chip with avatar', () => {
    const chip: ItemChipProps['chip'] = {
      color: 'primary',
      label: 'Test Chip',
      size: 'small',
      variant: 'outlined',
      avatar: 'A',
    }

    const { getByText } = render(<ItemChip chip={ chip } />)
    expect(getByText('Test Chip')).toBeInTheDocument()
    expect(getByText('A')).toBeInTheDocument()
  })

  test('Must renders a chip without avatar', () => {
    const chip: ItemChipProps['chip'] = {
      color: 'primary',
      label: 'Test Chip',
      size: 'small',
      variant: 'outlined',
    }

    const { getByText } = render(<ItemChip chip={ chip } />)
    expect(getByText('Test Chip')).toBeInTheDocument()
  })
})
