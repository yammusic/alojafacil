import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ItemTitle } from '../item-title/MenuItemTitle'

describe('ItemTitle', () => {
  test('Must renders title with "body1" variant when selected is false', () => {
    const { getByText } = render(<ItemTitle selected={ false } title="Test Title" />)
    const titleElement = getByText('Test Title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveStyle('font-size: 1rem')
  })

  test('Must renders title with "h5" variant when selected is true', () => {
    const { getByText } = render(<ItemTitle selected title="Test Title" />)
    const titleElement = getByText('Test Title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveStyle('font-size: 1.5rem')
  })
})
