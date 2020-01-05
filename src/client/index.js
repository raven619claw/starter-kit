import React from 'react'
import { loadableReady } from '@loadable/component'
import { hydrate } from 'react-dom'
import App from 'client/App'
import { CacheProvider } from '@emotion/core'
import getEmotionCache from 'shared/getEmotionCache'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import createStore, { getHistory } from 'shared/store'

const initialState = __INITIAL_STATE__
const store = createStore(initialState)
const appHistory = getHistory()

const appRender = AppComponent => {
  hydrate(
    <Provider store={store}>
      <CacheProvider value={getEmotionCache(store.getState().deviceEnv.isRTL)}>
        <ConnectedRouter history={appHistory}>
          <AppComponent />
        </ConnectedRouter>
      </CacheProvider>
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('client/App', () => {
    // Require the new version and render it instead
    // eslint-disable-next-line global-require
    import('client/App').then(({ default: NextApp }) => {
      appRender(NextApp)
    })
  })
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

loadableReady(() => {
  appRender(App)
})
