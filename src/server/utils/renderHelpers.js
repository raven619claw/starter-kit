import {
  generateScriptTags,
  getScriptHtmlLine,
  getStyleHtmlLine,
  generateScriptsHeader,
  generateLinkTags,
  getMainScript
} from 'server/utils/generateScriptTags'
import { mobile, desktop, tablet } from 'shared/constants'

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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0">
    ${generateLinkTags({
      manifest: res.locals.getManifest()
    })}
    ${styles
      .map(style => getStyleHtmlLine({ linkName: style.publicPath }))
      .join('\n')}
  </head>`

const getHTMLScriptObjects = ({ deviceType, isRTL }) => `<script>
  var deviceType = '${deviceType}'
  var isRTL = !!${isRTL}
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
  isRTL
}) =>
  `${getHTMLHead({ res, styles })}
  ${getHTMLBody({ content })}
  ${getHTMLScriptObjects({ deviceType, isRTL })}
  ${getHTMLPostBodyTags({ res, scripts, moduleScripts })}`

export const getDeviceType = ua => {
  let deviceType = desktop
  if (ua.device.type === mobile) {
    deviceType = mobile
  }
  if (ua.device.type === tablet) {
    deviceType = tablet // this can be tablet if we start having different templates for tabs
  }
  return deviceType
}
