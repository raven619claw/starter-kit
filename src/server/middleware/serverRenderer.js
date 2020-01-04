import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
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
const { paths } = require('config/helper')

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
  routes
    .map(route => {
      const match = matchPath(req.path, route)
      return match && route.component.needs && needs.push(route.component.needs)
    })
    .filter(item => item)
  try {
    const context = {}
    const store = createStore(initialState)
    await fetchComponentData({ needs, store }) // maybe pass store here in future and other stuf
    const content = renderToString(
      extractor.collectChunks(
        <Provider store={store}>
          <CacheProvider
            value={getEmotionCache(store.getState().deviceEnv.isRTL)}
          >
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </CacheProvider>
        </Provider>
      )
    )
    // TODO: currently modern extractor does not give script tags
    // so that breaks
    const scriptTags = extractor.getScriptTags().split('\n')
    const linkTags = extractor.getLinkTags().split('\n')
    const styleTags = extractor.getStyleTags().split('\n')

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      })
      res.end()
    }
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
    // send err page here
    res.end(err)
  }
}

export default serverRenderer
