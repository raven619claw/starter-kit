import React from 'react'
import { hydrate } from 'react-dom'
import App from 'client/App'
import { BrowserRouter as Router } from 'react-router-dom'
import Loadable from 'react-loadable'
import parser from 'ua-parser-js'
import { CacheProvider } from '@emotion/core'
import {
  TABLET_THRESHOLD,
  MOBILE_THRESHOLD,
  TABLET,
  MOBILE,
  DESKTOP
} from 'shared/constants'
import getEmotionCache from 'shared/getEmotionCache'
import { Provider } from 'react-redux'
import createStore from 'shared/store'

let { deviceType } = window
deviceType =
  deviceType || parser(window.navigator.userAgent).device.type || 'desktop'

const { isRTL } = window

if (module.hot) {
  module.hot.accept()
}
const store = createStore()
const appRender = async () => {
  await Loadable.preloadReady()
  hydrate(
    <Provider store={store}>
      <CacheProvider value={getEmotionCache(isRTL)}>
        <Router>
          <App deviceType={deviceType} />
        </Router>
      </CacheProvider>
    </Provider>,
    document.getElementById('root')
  )
}

appRender()
window.addEventListener('resize', () => {
  const { innerWidth } = window
  let updatedDeviceType =
    parser(window.navigator.userAgent).device.type || DESKTOP
  if (updatedDeviceType === DESKTOP) {
    if (innerWidth <= TABLET_THRESHOLD) {
      updatedDeviceType = TABLET
    }
    if (innerWidth <= MOBILE_THRESHOLD) {
      updatedDeviceType = MOBILE
    }
  }
  if (updatedDeviceType !== deviceType) {
    deviceType = updatedDeviceType
    appRender()
  }
})
