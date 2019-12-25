import stylisRTL from 'stylis-rtl'
import createCache from '@emotion/cache'

export const myCacheRTL = () =>
  createCache({
    key: 'c',
    stylisPlugins: [stylisRTL]
  })
export const myCacheLTR = () =>
  createCache({
    key: 'c'
  })

export default isRTL => (isRTL ? myCacheRTL() : myCacheLTR())
