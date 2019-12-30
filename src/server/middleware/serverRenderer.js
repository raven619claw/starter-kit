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
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { CacheProvider } from '@emotion/core'
import getEmotionCache from 'shared/getEmotionCache'
import { Provider } from 'react-redux'
import createStore from 'shared/store'
import setInitialState from 'server/utils/setInitialState'

const { paths } = require('config/helper')

// eslint-disable-next-line no-undef
const stats = __non_webpack_require__(
  `${paths.clientBuild}/react-loadable.json`
)
const serverRenderer = async (req, res) => {
  setServerPreloadHeaderForScripts({ res })
  res.write('<!DOCTYPE html>')
  const needs = []
  const initialState = setInitialState({ req, res })
  const {
    deviceEnv: { isRTL, deviceType }
  } = initialState
  const routes = Routes(deviceType)
  const loadableComponentsPromiseArray = routes
    .map(route => {
      const match = matchPath(req.path, route)
      return match && route.component.preload()
    })
    .filter(item => item)
  try {
    const components = await Promise.all(loadableComponentsPromiseArray)
    components.map(component => {
      const {
        default: { needs: need }
      } = component
      need && needs.push(need)
    })

    const context = {}

    await fetchComponentData(needs, {}) // maybe pass store here in future and other stuff
    const modules = []
    const store = createStore(initialState)
    const content = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <CacheProvider value={getEmotionCache(isRTL)}>
            <StaticRouter location={req.url} context={context}>
              <App deviceType={deviceType} />
            </StaticRouter>
          </CacheProvider>
        </Provider>
      </Loadable.Capture>
    )

    const bundles = getBundles(stats, modules)
    const styles = bundles.filter(bundle => bundle.file.endsWith('.css'))
    const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'))
    const moduleScripts = bundles.filter(bundle => bundle.file.endsWith('.mjs'))

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      })
      res.end()
    }

    res.end(
      getHTML({
        initialState,
        isRTL,
        res,
        content,
        scripts,
        moduleScripts,
        deviceType,
        styles
      })
    )
  } catch (err) {
    // send err page here
    res.end(err)
  }
}

export default serverRenderer
