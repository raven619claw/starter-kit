import React from 'react'
import { render, cleanup } from 'test-utils'
import List from './index'

afterEach(cleanup)

test('matches List route snapshot', () => {
  const { asFragment } = render(<List />)
  expect(asFragment()).toMatchSnapshot()
})
