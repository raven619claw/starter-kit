import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Routes } from 'client/Router'
import App from 'client/App'
import {
  getHTMLHead,
  fetchComponentData,
  getHTMLBody
} from 'server/utils/renderHelpers'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
const { paths } = require('config/helper')

// eslint-disable-next-line no-undef
const stats = __non_webpack_require__(
  `${paths.clientBuild}/react-loadable.json`
)
const serverRenderer = () => (req, res) => {
  res.write(getHTMLHead(res))
  const needs = []
  const deviceType = 'desktop'
  Routes(deviceType).some(route => {
    // use `matchPath` here
    const match = matchPath(req.path, route)
    if (match && route.component.needs) {
      needs.push(route.component.needs)
    }
  })
  const context = {}

  fetchComponentData(needs, {}) // maybe pass store here in future and other stuff
    .then(() => {
      const modules = []
      const content = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Loadable.Capture>
      )

      const bundles = getBundles(stats, modules)
      const styles = bundles.filter(bundle => bundle.file.endsWith('.css'))
      const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'))
      const moduleScripts = bundles.filter(bundle =>
        bundle.file.endsWith('.mjs')
      )

      if (context.url) {
        res.writeHead(301, {
          Location: context.url
        })
        res.end()
      }
      res.end(getHTMLBody({ content, styles, scripts, moduleScripts }))
    })
    .catch(() => {})
}

export default serverRenderer
