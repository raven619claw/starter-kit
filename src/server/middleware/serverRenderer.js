import React from 'react'
import { renderToString } from 'react-dom/server'
import App from 'client/App'
import { generateScriptTags } from 'server/utils/generateScriptTags'

const serverRenderer = () => (req, res) => {
  res.write(`
    <html>
      <head>
        ${generateScriptTags({
          manifest: res.locals.getManifest()
        })}
    </head>`)
  const content = renderToString(<App />)
  res.end(`
    <body>
      <div id='root'>
        ${content}
      </div>
    </body>
    </html>
  `)
}

export default serverRenderer
