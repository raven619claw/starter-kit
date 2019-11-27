import React from 'react'
import { renderToString } from 'react-dom/server'
import App from 'client/App'

const serverRenderer = () => (req, res) => {
  res.write(`
  <html>
  <head>
  <link href="${
    res.locals.getManifest().main ? res.locals.getManifest().main.css : ''
  }" rel="stylesheet" type="text/css">
  <link href="${
    res.locals.getManifest().main ? res.locals.getManifest().main.rtlcss : ''
  }" rel="stylesheet" type="text/css">
  <script defer src=${res.locals.getManifest().runtime ? res.locals.getManifest().runtime.js : ''}></script>
  <script defer src=${res.locals.getManifest().vendor ? res.locals.getManifest().vendor.js : ''}></script>
  <script defer src=${res.locals.getManifest().main ? res.locals.getManifest().main.js : ''}></script>
  </head>`)
  const content = renderToString(<App />)
  res.write(`
  <body>
  <div id='root'>
  ${content}</div>
  </body>
  </html>
  `)
  res.end()
}

export default serverRenderer
