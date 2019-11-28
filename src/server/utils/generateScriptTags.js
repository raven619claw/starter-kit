import { getValue } from 'shared/utils/helpers'

const scriptsToSendInHeaders = ['runtime', 'vendor', 'externalvendor', 'main']

const scriptsToSendInHTML = ['runtime', 'vendor', 'externalvendor']

const mainScript = ['main']

const getScriptArray = ({ manifest, type = 'js', scriptsArray }) =>
  scriptsArray.map(scriptName =>
    getValue(manifest, `${scriptName}.${type}`, '')
  )

const getLinkArray = ({ manifest, type = 'css', direction = '' }) => {
  const linksArray = ['main']
  return linksArray.map(scriptName =>
    getValue(manifest, `${scriptName}${direction}.${type}`, '')
  )
}

export const getScriptHtmlLine = ({
  scriptName,
  type = 'text/javascript',
  defer = ''
}) => {
  if (!scriptName) {
    return ''
  }
  return `<script ${defer} type="${type}" src=${scriptName}></script>`
}

export const getStyleHtmlLine = ({ linkName }) => {
  if (!linkName) {
    return ''
  }
  return `<link href="${linkName}" rel="stylesheet" type="text/css"></link>`
}

export const getPreloadScriptHtmlLine = ({ scriptName, type = 'preload' }) => {
  if (!scriptName) {
    return ''
  }
  return `<link rel="${type}" as="script" href=${scriptName} /></link>`
}

export const getPreloadStyleHtmlLine = ({ linkName }) => {
  if (!linkName) {
    return ''
  }
  return `<link rel="preload" as="style" href=${linkName} /></link>`
}

export const getPreloadHeaderLine = ({ linkName, type = 'script' }) => {
  if (!linkName) {
    return ''
  }
  return `<${linkName}>; rel=preload; as=${type}`
}

export const generateScriptsHeader = ({ manifest, scriptsArray }) =>
  `${getLinkArray({ manifest })
    .map(linkName => getPreloadHeaderLine({ linkName, type: 'style' }))
    .join(',')},${getScriptArray({
    manifest,
    scriptsArray: scriptsArray || scriptsToSendInHeaders
  })
    .map(linkName => getPreloadHeaderLine({ linkName, type: 'script' }))
    .join(',')}`

export const generateScriptTags = ({ manifest, scriptsArray }) =>
  getScriptArray({
    manifest,
    scriptsArray: scriptsArray || scriptsToSendInHTML
  })
    .map(scriptName => getScriptHtmlLine({ scriptName }))
    .join('\n')

export const generateLinkTags = ({ manifest }) =>
  getLinkArray({ manifest })
    .map(linkName => getStyleHtmlLine({ linkName }))
    .join('\n')

export const getMainScript = ({ manifest }) =>
  getScriptArray({
    manifest,
    scriptsArray: mainScript
  })
    .map(scriptName => getScriptHtmlLine({ scriptName }))
    .join('\n')
