/* eslint-disable no-nested-ternary */
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { PROD } = require('./constants')

const baseAppPath = fs.realpathSync(process.cwd())
const processManifestOutput = assets => {
  // Modifying assetsManifest file
  Object.values(assets).map(value => {
    const assetObject = value
    if (assetObject.css) {
      assetObject.rtlcss =
        assetObject.css[0].indexOf('.rtl.css') !== -1
          ? assetObject.css[0]
          : assetObject.css[1]
      assetObject.css =
        assetObject.css[0].indexOf('.rtl.css') === -1
          ? assetObject.css[0]
          : assetObject.css[1]
    }
  })
  return JSON.stringify(assets)
}

const getFullPath = pathToAppend => path.resolve(baseAppPath, pathToAppend)

const paths = {
  baseAppPath,
  clientBuild: getFullPath(`${PROD ? '.build' : '.dev'}/client`),
  serverBuild: getFullPath(`${PROD ? '.build' : '.dev'}/server`),
  publicPath: '/assets/'
}
const logMessage = (message, level = 'info') => {
  const color =
    level === 'error'
      ? 'red'
      : level === 'warning'
      ? 'yellow'
      : level === 'info'
      ? 'blue'
      : 'white'
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}]`, chalk[color](message.toString()))
}

const compilerPromise = (name, compiler) => {
  if (!compiler) {
    return null
  }
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `)
    })
    compiler.hooks.done.tap(name, stats => {
      const info = stats.toJson()
      if (!stats.hasErrors()) {
        return resolve()
      }
      if (stats.hasErrors()) {
        logMessage(info.errors.toString(), 'error')
      }

      if (stats.hasWarnings()) {
        logMessage(info.warnings.toString(), 'warning')
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject(`Failed to compile ${name}`)
    })
  })
}

module.exports = {
  getFullPath,
  logMessage,
  compilerPromise,
  paths,
  processManifestOutput
}
