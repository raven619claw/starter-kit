import React from 'react'
import { hydrate } from 'react-dom'
import App from 'client/App'
import { BrowserRouter as Router } from 'react-router-dom'
import Loadable from 'react-loadable'
import parser from 'ua-parser-js'
import {
  tabletThreshold,
  mobileThreshold,
  mobile,
  tablet,
  desktop
} from 'shared/constants'

let { deviceType } = window
deviceType =
  deviceType || parser(window.navigator.userAgent).device.type || 'desktop'

if (module.hot) {
  module.hot.accept()
}

const appRender = () =>
  Loadable.preloadReady().then(() => {
    hydrate(
      <Router>
        <App deviceType={deviceType} />
      </Router>,
      document.getElementById('root')
    )
  })
appRender()
window.addEventListener('resize', () => {
  const { innerWidth } = window
  let updatedDeviceType =
    parser(window.navigator.userAgent).device.type || desktop
  if (updatedDeviceType === desktop) {
    if (innerWidth <= tabletThreshold) {
      updatedDeviceType = tablet
    }
    if (innerWidth <= mobileThreshold) {
      updatedDeviceType = mobile
    }
  }
  if (updatedDeviceType !== deviceType) {
    deviceType = updatedDeviceType
    appRender()
  }
})
