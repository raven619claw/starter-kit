import React from 'react'
import { hydrate } from 'react-dom'
import App from 'client/App'
import { BrowserRouter as Router } from 'react-router-dom'
import Loadable from 'react-loadable'
import { CacheProvider } from '@emotion/core'
import getEmotionCache from 'shared/getEmotionCache'
import { Provider } from 'react-redux'
import createStore from 'shared/store'

if (module.hot) {
  module.hot.accept()
}
const initialState = __INITIAL_STATE__
const {
  deviceEnv: { isRTL }
} = initialState
const store = createStore(initialState)
const appRender = async () => {
  await Loadable.preloadReady()
  hydrate(
    <Provider store={store}>
      <CacheProvider value={getEmotionCache(isRTL)}>
        <Router>
          <App />
        </Router>
      </CacheProvider>
    </Provider>,
    document.getElementById('root')
  )
}

appRender()
