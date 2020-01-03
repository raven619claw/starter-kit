export const getPreloadHeaderLine = ({ linkName, type }) => {
  if (!linkName) {
    return ''
  }
  return `<${linkName}>; rel=preload; as=${type}`
}

export const getLinkTagsFilteredOnRTL = ({ linkTags = [], isRTL = false }) =>
  linkTags
    .filter(item => {
      if (item.indexOf('as="style"') > -1) {
        if (isRTL) {
          return item.indexOf('rtl.css') > -1
        }
        return item.indexOf('rtl.css') === -1
      }
      return true
    })
    .join('')

export const getStyleTagsFilteredOnRTL = ({ styleTags = [], isRTL = false }) =>
  styleTags
    .filter(item => {
      if (isRTL) {
        return item.indexOf('rtl.css') > -1
      }
      return item.indexOf('rtl.css') === -1
    })
    .join('')
