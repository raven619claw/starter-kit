import {
  generateScriptTags,
  getScriptHtmlLine,
  getStyleHtmlLine,
  generateScriptsHeader,
  generateLinkTags,
  getMainScript
} from 'server/utils/generateScriptTags'

export const setServerPushHeaderForScripts = ({ res }) => {
  const Link = generateScriptsHeader({
    manifest: res.locals.getManifest()
  })
  res.set({
    Link
  })
}

export const fetchComponentData = (needs, appData) => {
  const needsPromises = needs.map(need => need(appData))
  return Promise.all([needsPromises]).then(
    data =>
      // do something w/ the data so the client
      // can access it then render the app
      data
  )
}

export const getHTMLHead = ({ res, styles }) => `
  <html>
    <head>
    ${generateLinkTags({
      manifest: res.locals.getManifest()
    })}
    ${styles
      .map(style => getStyleHtmlLine({ linkName: style.publicPath }))
      .join('\n')}
  </head>`

export const getHTMLBody = ({ res, content, scripts, moduleScripts }) => `
    <body>
      <div id='root'>${content}</div>
    </body>
      ${generateScriptTags({
        manifest: res.locals.getManifest()
      })}
    ${scripts
      .map(script => getScriptHtmlLine({ scriptName: script.publicPath }))
      .join('\n')}
    ${moduleScripts
      .map(moduleScript =>
        getScriptHtmlLine({
          scriptName: moduleScript.publicPath,
          type: 'module'
        })
      )
      .join('\n')}
      ${getMainScript({
        manifest: res.locals.getManifest()
      })}
    </html>
  `
