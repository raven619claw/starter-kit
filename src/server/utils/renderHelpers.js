import {
  generateScriptTags,
  getScriptHtmlLine,
  getStyleHtmlLine,
  generateScriptsHeader,
  generateLinkTags,
  getMainScript
} from 'server/utils/generateScriptTags'
import { TABLET, MOBILE, DESKTOP } from 'shared/constants'

export const setServerPreloadHeaderForScripts = ({ res }) => {
  const Link = generateScriptsHeader({
    manifest: res.locals.getManifest()
  })
  res.set({
    Link
  })
}

export const fetchComponentData = (needs, appData) => {
  const needsPromises = needs.map(need => need(appData))
  return Promise.all(needsPromises)
}

export const getHTMLHead = ({ res, styles, isRTL }) => `
  <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0">
    ${generateLinkTags({
      manifest: res.locals.getManifest()
    })}
    ${styles
      .filter(style => style.file.indexOf('rtl') > -1 === !!isRTL)
      .map(style => getStyleHtmlLine({ linkName: style.publicPath }))
      .join('\n')}
  </head>`

const getHTMLScriptObjects = ({ isRTL, initialState }) => `
  <script>
    document.dir = '${isRTL ? 'rtl' : 'ltr'}'
    var __INITIAL_STATE__ = ${JSON.stringify(initialState)}
  </script>`

const getHTMLPostBodyTags = ({
  res,
  scripts,
  moduleScripts
}) => `${generateScriptTags({ manifest: res.locals.getManifest() })}
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
</html>`

const getHTMLBody = ({ content }) => `
    <body>
      <div id='root'>${content}</div>
    </body>`

export const getHTML = ({
  res,
  content,
  scripts,
  moduleScripts,
  deviceType,
  styles,
  isRTL,
  initialState
}) =>
  `${getHTMLHead({ res, styles, isRTL })}
  ${getHTMLBody({ content })}
  ${getHTMLScriptObjects({ deviceType, isRTL, initialState })}
  ${getHTMLPostBodyTags({ res, scripts, moduleScripts })}`

export const getDeviceType = ua => {
  let deviceType = DESKTOP
  if (ua.device.type === MOBILE) {
    deviceType = MOBILE
  }
  if (ua.device.type === TABLET) {
    deviceType = TABLET // this can be tablet if we start having different templates for tabs
  }
  return deviceType
}
