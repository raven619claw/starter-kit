import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-relativetimeformat/polyfill'

// load all the locale and messages data here
// can also dynamically load polyfills based on browser

// in the promise call the messages as well as the polyfill for each locales
// eg. '@formatjs/intl-pluralrules/dist/locale-data/de'
// @formatjs/intl-relativetimeformat/dist/locale-data/de
// this does not need to be done on server as full-icu has already been added
export default async () => new Promise(resolve => resolve())
