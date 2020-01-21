import 'react-hot-loader'
import React, { StrictMode } from 'react'
import { loadableReady } from '@loadable/component'
import { hydrate } from 'react-dom'
import App from 'client/App'
import { CacheProvider } from '@emotion/core'
import getEmotionCache from 'shared/getEmotionCache'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { IntlProvider } from 'react-intl'
import createStore, { getHistory } from 'shared/store'
import loadIntl from 'client/utils/setupClientIntl'
const initialState = __INITIAL_STATE__
const store = createStore(initialState)
const history = getHistory()

// get both these values from initial store
const locale = 'en'
const platform = 'bvdir'
const appRender = ({ AppComponent, messages }) => {
  hydrate(
    <StrictMode>
      <Provider store={store}>
        <CacheProvider
          value={getEmotionCache(store.getState().deviceEnv.isRTL)}
        >
          <ConnectedRouter history={history}>
            <IntlProvider locale={locale} messages={messages}>
              <AppComponent />
            </IntlProvider>
          </ConnectedRouter>
        </CacheProvider>
      </Provider>
    </StrictMode>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('client/App', () => {
    // Require the new version and render it instead
    // eslint-disable-next-line global-require
    import('client/App').then(({ default: NextApp }) => {
      appRender({ AppComponent: NextApp })
    })
  })
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      // returns a promise
      .register('/assets/service-worker.js')
  })
}

loadableReady(async () => {
  const polyfillRequired = true
  // add logic to load all localization data inside this
  const messages = await loadIntl({ locale, platform, polyfillRequired })
  appRender({ AppComponent: App, messages })
})
