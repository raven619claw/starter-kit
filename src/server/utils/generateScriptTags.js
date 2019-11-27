import { getValue } from 'shared/utils/helpers'

const getScriptArray = ({ manifest, type = 'js' }) => {
  const scriptsArray = ['runtime', 'vendor', 'externalvendor', 'main']
  return scriptsArray.map(scriptName =>
    getValue(manifest, `${scriptName}.${type}`, '')
  )
}

const getLinkArray = ({ manifest, type = 'css', direction = '' }) => {
  const linksArray = ['main']
  return linksArray.map(scriptName =>
    getValue(manifest, `${scriptName}${direction}.${type}`, '')
  )
}

const getScriptHtmlLine = ({ scriptName, type = 'text/javascript' }) => {
  if (!scriptName) {
    return ''
  }
  return `<script defer type="${type}" src=${scriptName}></script>`
}

const getStyleHtmlLine = ({ linkName }) => {
  if (!linkName) {
    return ''
  }
  return `<link href="${linkName}" rel="stylesheet" type="text/css">`
}

const getPreloadScriptHtmlLine = ({ scriptName, type = 'preload' }) => {
  if (!scriptName) {
    return ''
  }
  return `<link rel="${type}" as="script" href=${scriptName} />`
}

const getPreloadStyleHtmlLine = ({ linkName }) => {
  if (!linkName) {
    return ''
  }
  return `<link rel="preload" as="style" href=${linkName} />`
}

export const generateScriptTags = ({ manifest }) => `
  ${getLinkArray({ manifest })
    .map(linkName => getPreloadStyleHtmlLine({ linkName }))
    .join('')}
  ${getScriptArray({ manifest })
    .map(scriptName => getPreloadScriptHtmlLine({ scriptName }))
    .join('')}
  ${getScriptArray({ manifest })
    .map(scriptName => getScriptHtmlLine({ scriptName }))
    .join('')}
  ${getLinkArray({ manifest })
    .map(linkName => getStyleHtmlLine({ linkName }))
    .join('')}
  `
