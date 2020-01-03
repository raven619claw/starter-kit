import React from 'react'
import { loadableReady } from '@loadable/component'
import { hydrate } from 'react-dom'
import App from 'client/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { CacheProvider } from '@emotion/core'
import getEmotionCache from 'shared/getEmotionCache'
import { Provider } from 'react-redux'
import createStore from 'shared/store'

if (module.hot) {
  module.hot.accept()
}
const initialState = __INITIAL_STATE__
const store = createStore(initialState)
const appRender = () => {
  hydrate(
    <Provider store={store}>
      <CacheProvider value={getEmotionCache(store.getState().deviceEnv.isRTL)}>
        <Router>
          <App />
        </Router>
      </CacheProvider>
    </Provider>,
    document.getElementById('root')
  )
}

loadableReady(() => {
  appRender()
})
