import { generateScriptTags } from 'server/utils/generateScriptTags'

export const fetchComponentData = (needs, appData) => {
  const needsPromises = needs.map(need => need(appData))
  return Promise.all([needsPromises]).then(
    data =>
      // do something w/ the data so the client
      // can access it then render the app
      data
  )
}

export const getHTMLHead = res => `
  <html>
    <head>
      ${generateScriptTags({
        manifest: res.locals.getManifest()
      })}
  </head>`

export const getHTMLBody = content => `
    <body>
      <div id='root'>${content}</div>
    </body>
    </html>
  `
