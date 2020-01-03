const webpack = require('webpack')
const webpackConfig = require('../config/webpack')
const { logMessage, compilerPromise } = require('../config/helper')
const {
  PROD,
  WATCH,
  HOT_RELOAD,
  DEVSERVER_HOST,
  WEBPACK_PORT,
  CDN_PATH,
  IGNORE_MODERN_BUILD
} = require('../config/constants')

const [[clientConfig, clientModernConfig], serverConfig] = webpackConfig

if (HOT_RELOAD) {
  clientConfig.entry.main = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    clientConfig.entry.main
  ]
  const { publicPath } = clientConfig.output
  clientConfig.output.publicPath = [
    `${DEVSERVER_HOST}:${WEBPACK_PORT}`,
    publicPath
  ]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/')

  serverConfig.output.publicPath = [
    `${DEVSERVER_HOST}:${WEBPACK_PORT}`,
    publicPath
  ]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/')
}
if (PROD) {
  const { publicPath } = clientConfig.output
  clientConfig.output.publicPath = [CDN_PATH, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/')
  const { publicPath: publicPathModern } = clientModernConfig.output
  clientModernConfig.output.publicPath = [CDN_PATH, publicPathModern]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/')
}
const multiCompiler = webpack([clientConfig, serverConfig, clientModernConfig])

const clientCompiler = multiCompiler.compilers.find(
  compiler => compiler.name === 'client'
)
const clientModernCompiler = multiCompiler.compilers.find(
  compiler => compiler.name === 'clientModern'
)
const serverCompiler = multiCompiler.compilers.find(
  compiler => compiler.name === 'server'
)

const build = async () => {
  ;[
    serverCompiler,
    (!IGNORE_MODERN_BUILD && clientModernCompiler) || undefined,
    // TODO:check if this is needed as the watch is handled by devserver
    clientCompiler
  ].map(compiler => {
    if (!compiler) {
      return
    }
    // this is added here as we dont want to watch the client compiler manually
    // the watch is handled by webpack dev server which runs HMR and watch itself
    // if you want to debug clientModern with hotreload replace compiler here
    if (HOT_RELOAD && compiler.name === 'client') {
      return
    }
    compiler.watch({}, (error, stats) => {
      const info = stats.toJson()
      if (!error && !stats.hasErrors()) {
        logMessage(stats.toString(serverConfig.stats))
        return
      }
      if (error) {
        logMessage(error, 'error')
      }

      if (stats.hasErrors()) {
        logMessage(info.errors.toString(), 'error')
      }

      if (stats.hasWarnings()) {
        logMessage(info.warnings.toString(), 'warning')
      }
    })
  })

  // wait until client and server is compiled
  try {
    await Promise.all([
      compilerPromise('client', clientCompiler),
      compilerPromise('server', serverCompiler),
      (!IGNORE_MODERN_BUILD &&
        compilerPromise('clientModern', clientModernCompiler)) ||
        null
    ])

    logMessage('Done!', 'info')
    if (PROD || !WATCH) {
      process.exit()
    }
  } catch (error) {
    logMessage(error, 'error')
    process.exit()
  }
}
module.exports = {
  clientConfig,
  clientModernConfig,
  serverConfig,
  clientCompiler,
  clientModernCompiler,
  serverCompiler,
  build
}
