// in the promise call the messages as well as the polyfill for each locales
// eg. '@formatjs/intl-pluralrules/dist/locale-data/de'
// @formatjs/intl-relativetimeformat/dist/locale-data/de
// this does not need to be done on server as full-icu has already been added
// can also dynamically load polyfills based on browser
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-relativetimeformat/polyfill'
import axios from 'axios'

// load all the locale and messages data here
const prod = true // __PROD__ dev does not work without VPN
export default async ({ locale }) =>
  axios
    .get(
      `https://${
        prod ? 'www' : 'dev'
        // extend the API to handle platform logic to support oyodir
      }.belvilla.com/api/v1/translations/${locale}`
    )
    .then(result => {
      const map = {}
      result.data.forEach(row => {
        map[row.code] = row.content
      })
      return map
    })
