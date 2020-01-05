const { LEGACY } = require('../constants')

const statsClient = {
  cached: false,
  cachedAssets: false,
  chunks: false,
  chunkModules: false,
  colors: true,
  children: false,
  hash: false,
  modules: false,
  reasons: false,
  timings: true,
  version: false,
  warningsFilter: warning => warning.indexOf('Conflicting order') === -1
}

const statsServer = {
  colors: true,
  warningsFilter: warning =>
    warning.indexOf('Conflicting order between:') === -1
}

const statsMinimal = 'errors-only'

const webpackBarClient = type => ({
  color: (type === LEGACY && '#f7db3c ') || '#0092f8',
  name: (type === LEGACY && 'client       ') || 'modern-Client'
})

const webpackBarServer = { color: '#87c000', name: 'server       ' }
module.exports = {
  webpackBarClient,
  webpackBarServer,
  statsServer,
  statsMinimal,
  statsClient
}
