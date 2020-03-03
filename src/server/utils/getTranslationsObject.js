import { PLATFORMS, LANGUAGES } from 'config/constants'
import { paths } from 'config/helper'

const messages = {}

PLATFORMS.forEach(platform => {
  messages[platform] = {}
  LANGUAGES.forEach(lang => {
    // eslint-disable-next-line no-undef
    messages[platform][lang] = __non_webpack_require__(
      `${paths.serverBuild}/translations/${platform}.${lang}.json`
    )
  })
})

export default messages
