import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { Routes } from 'client/Router'
import App from 'client/App'
import {
  getHTML,
  fetchComponentData,
  setServerPreloadHeaderForScripts
} from 'server/utils/renderHelpers'
import { ChunkExtractor } from '@loadable/server'
import { CacheProvider } from '@emotion/core'
import getEmotionCache from 'shared/getEmotionCache'
import { Provider } from 'react-redux'
import createStore from 'shared/store'
import setInitialState from 'server/utils/setInitialState'
import { getTheme } from 'server/utils/theme'
import getProxyHeaders from 'server/utils/generateHeaders'
// TODO: remove this logger and use winston for async logging
import { paths, logMessage } from 'config/helper'
import messagesObject from 'server/utils/getTranslationsObject'
// eslint-disable-next-line no-undef
const statsLegacy = __non_webpack_require__(
  `${paths.clientBuild}/loadable-legacy-stats.json`
)

const statsModern =
  !__IGNORE_MODERN_BUILD__ &&
  // eslint-disable-next-line no-undef
  __non_webpack_require__(`${paths.clientBuild}/loadable-modern-stats.json`)

const extractorLegacy = new ChunkExtractor({ stats: statsLegacy })
const extractorModern =
  !__IGNORE_MODERN_BUILD__ && new ChunkExtractor({ stats: statsModern })
const serverRenderer = async (req, res) => {
  // set theme based on cookies or session or something
  const theme = getTheme({ req })
  const initialState = setInitialState({ req, res, theme })
  const {
    deviceEnv: { isRTL, deviceType, deviceSupportsES6 }
  } = initialState
  // add logic to handle this
  const extractor = (deviceSupportsES6 && extractorModern) || extractorLegacy
  setServerPreloadHeaderForScripts({ extractor, res, isRTL, deviceSupportsES6 })
  res.write('<!DOCTYPE html>')
  const needs = []
  const routes = Routes(deviceType)
  // this is a fix for now
  // this is find a way to do this in sync
  const routeComponents = await Promise.all(
    routes
      .map(route => {
        const match = matchPath(req.path, route)
        if (!match) {
          return
        }
        // eslint-disable-next-line consistent-return
        return route.component.load()
      })
      .filter(item => item)
  )
  routeComponents.map(
    ({ default: route }) => route.needs && needs.push(route.needs)
  )
  try {
    const context = {}
    const proxyHeaders = getProxyHeaders({
      cookie: req.headers.cookie
    })
    const locale = 'en'
    const platform = 'bvdir'
    const messages = messagesObject[platform][locale]
    const store = createStore(initialState)
    await fetchComponentData({ needs, store, proxyHeaders })
    const content = renderToString(
      extractor.collectChunks(
        <Provider store={store}>
          <CacheProvider
            value={getEmotionCache(store.getState().deviceEnv.isRTL)}
          >
            <StaticRouter location={req.url} context={context}>
              <IntlProvider locale={locale} messages={messages}>
                <App />
              </IntlProvider>
            </StaticRouter>
          </CacheProvider>
        </Provider>
      )
    )
    // TODO: currently modern extractor does not give mjs script tags
    // so that breaks
    const scriptTags = extractor.getScriptTags().split('\n')
    const linkTags = extractor.getLinkTags().split('\n')
    const styleTags = extractor.getStyleTags().split('\n')

    // TODO: figure out correct redirect handling
    // if (context.url) {
    //   return res.redirect(301, context.url)
    // }
    res.end(
      getHTML({
        scriptTags,
        linkTags,
        styleTags,
        initialState: store.getState(),
        isRTL,
        res,
        content
      })
    )
  } catch (err) {
    logMessage(err.stack, 'error')
    // send 500 err page here
    res.end(err.stack)
  }
}

export default serverRenderer
