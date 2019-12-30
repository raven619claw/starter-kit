import { configure, addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from './deviceViewPorts'

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})
// automatically import all files ending in *.stories.js
configure(require.context('../src/client', true, /\.story\.js$/), module)
