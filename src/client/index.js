import React from 'react'
import { loadableReady } from '@loadable/component'
import { hydrate } from 'react-dom'
import App from 'client/App'
import { CacheProvider } from '@emotion/core'
import getEmotionCache from 'shared/getEmotionCache'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import createStore, { getHistory } from 'shared/store'
if (module.hot) {
  module.hot.accept()
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/assets/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
const initialState = __INITIAL_STATE__
const store = createStore(initialState)
const appRender = () => {
  hydrate(
    <Provider store={store}>
      <CacheProvider value={getEmotionCache(store.getState().deviceEnv.isRTL)}>
        <ConnectedRouter history={getHistory()}>
          <App />
        </ConnectedRouter>
      </CacheProvider>
    </Provider>,
    document.getElementById('root')
  )
}

loadableReady(() => {
  appRender()
})
