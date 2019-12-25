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

const getHTMLScriptObjects = ({ deviceType, isRTL }) => `<script>
  var deviceType = '${deviceType}'
  var isRTL = !!${isRTL}
  document.dir = '${isRTL ? 'rtl' : 'ltr'}'
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
  `${getHTMLHead({ res, styles, isRTL })}
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
