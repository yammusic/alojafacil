import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ItemIcon } from '../item-icon/MenuItemIcon'
import type { ItemIconProps } from '../props-types'

describe('ItemIcon', () => {
  const props: ItemIconProps = {
    icon: () => <div>Mock Icon</div>,
    level: 0,
  }

  it('Must render the provided icon', () => {
    const { getByText } = render(<ItemIcon { ...props } />)
    expect(getByText('Mock Icon')).toBeInTheDocument()
  })

  it('Must render the default icon when isn\'t provided', () => {
    const { getByTestId } = render(<ItemIcon { ...props } icon={ undefined } />)
    expect(getByTestId('default-icon')).toBeInTheDocument()
  })

  it('Sets the correct font size for the default icon', () => {
    const { getByTestId } = render(<ItemIcon icon={ undefined } level={ 1 } />)
    expect(getByTestId('default-icon')).toHaveStyle({ fontSize: 'inherit' })
  })
})
