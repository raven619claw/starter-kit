import {
  getLinkTagsFilteredOnRTL,
  getStyleTagsFilteredOnRTL,
  getPreloadHeaderLine
} from 'server/utils/generateScriptTags'
import { TABLET, MOBILE, DESKTOP } from 'shared/constants'

export const setServerPreloadHeaderForScripts = ({ extractor, res, isRTL }) => {
  const { publicPath } = extractor.stats
  const mainChunkLinks = extractor.stats.namedChunkGroups.main.assets
    .map(link => ({
      linkName: publicPath + link,
      type: link.indexOf('.css') > -1 ? 'style' : 'script'
    }))
    .filter(({ type, linkName }) => {
      if (type === 'style') {
        if (isRTL) {
          return linkName.indexOf('rtl.css') > -1
        }
        return linkName.indexOf('rtl.css') === -1
      }
      return true
    })
  const Link = mainChunkLinks.map(link => getPreloadHeaderLine(link)).join(',')
  res.set({
    Link
  })
}

export const fetchComponentData = ({ needs, store }) => {
  const needsPromises = needs.map(need => need({ store }))
  return Promise.all(needsPromises)
}
// add react helmet here
export const getHTMLHead = ({ styleTags, isRTL, linkTags }) => `
  <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0">
    ${getLinkTagsFilteredOnRTL({ linkTags, isRTL })}
    ${getStyleTagsFilteredOnRTL({
      styleTags,
      isRTL
    })}
  </head>`

const getHTMLScriptObjects = ({ isRTL, initialState }) => `
  <script>
    document.dir = '${isRTL ? 'rtl' : 'ltr'}'
    var __INITIAL_STATE__ = ${JSON.stringify(initialState)}
  </script>`

const getHTMLPostBodyTags = ({ scriptTags }) => `${scriptTags.join('')}</html>`

const getHTMLBody = ({ content }) => `
    <body>
      <div id='root'>${content}</div>
    </body>`

export const getHTML = ({
  res,
  content,
  scriptTags,
  linkTags,
  styleTags,
  isRTL,
  initialState
}) =>
  `${getHTMLHead({ res, styleTags, isRTL, linkTags })}
  ${getHTMLBody({ content })}
  ${getHTMLScriptObjects({ isRTL, initialState })}
  ${getHTMLPostBodyTags({ res, scriptTags })}`

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
