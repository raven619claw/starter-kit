import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// add the theme and translations object and store here
const AllTheProviders = ({ children }) => children

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
