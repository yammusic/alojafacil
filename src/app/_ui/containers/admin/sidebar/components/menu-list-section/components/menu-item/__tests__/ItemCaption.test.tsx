import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ItemCaption } from '../item-caption/MenuItemCaption'

describe('ItemCaption', () => {
  test('Must renders correctly with a caption', () => {
    const { getByText } = render(<ItemCaption caption="Test Caption" />)
    const captionElement = getByText('Test Caption')
    expect(captionElement).toBeInTheDocument()
  })

  test('Must returns null when caption is not provided', () => {
    const { container } = render(<ItemCaption caption={ undefined } />)
    expect(container.firstChild).toBeNull()
  })
})
