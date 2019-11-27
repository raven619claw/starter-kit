import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { RoutesDesktop as Routes } from 'client/Routes/Desktop/Router'
import App from 'client/App'
import {
  getHTMLHead,
  fetchComponentData,
  getHTMLBody
} from 'server/utils/renderHelpers'

const serverRenderer = () => (req, res) => {
  res.write(getHTMLHead(res))
  const needs = []
  Routes.some(route => {
    // use `matchPath` here
    const match = matchPath(req.path, route)
    if (match && route.component.needs) {
      needs.push(route.component.needs)
    }
  })
  const context = {}

  fetchComponentData(needs, {}) // maybe pass store here in future and other stuff
    .then(() => {
      const content = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      )
      if (context.url) {
        res.writeHead(301, {
          Location: context.url
        })
        res.end()
      }
      res.end(getHTMLBody(content))
    })
    .catch(() => {})
}

export default serverRenderer
