const webpack = require('webpack')
const {
  client: clientLoaders,
  modernClient: modernClientLoaders
} = require('./loaders')
const { resolvers } = require('./resolvers')
const { client: clientOptimization } = require('./optimizations')
const { clientPlugins } = require('./plugins')
const { getFullPath, paths } = require('../helper')
const { statsMinimal: stats } = require('./stats')
const { LEGACY, PROD, MODERN } = require('../constants')

const getPlugin = ({ type }) => {
  const plugins = clientPlugins({ type })
  if (!PROD) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  return plugins
}
const config = {
  mode: PROD ? 'production' : 'development',
  devtool: PROD ? false : 'eval-source-map',
  name: 'client',
  target: 'web',
  entry: {
    main: getFullPath(`src/client/index.js`)
  },
  output: {
    path: paths.clientBuild,
    publicPath: paths.publicPath,
    chunkFilename: !PROD ? '[name].js' : '[name].[contenthash].js',
    filename: !PROD ? '[name].js' : '[name].[contenthash].js'
  },
  module: {
    rules: clientLoaders({ PROD })
  },
  resolve: {
    ...resolvers
  },
  optimization: {
    ...clientOptimization
  },
  plugins: getPlugin({ type: LEGACY }),
  stats
}

const modernConfig = {
  ...config,
  plugins: getPlugin({ type: MODERN }),
  name: 'clientModern',
  module: {
    rules: modernClientLoaders({ PROD })
  },
  output: {
    ...config.output,
    chunkFilename: !PROD ? '[name].mjs' : '[name].[contenthash].mjs',
    filename: !PROD ? '[name].mjs' : '[name].[contenthash].mjs'
  },
  optimization: {
    ...config.optimization,
    runtimeChunk: false // generate a manifest which will work the magic of webpack for sewing the bundles on runtime.
  }
}
module.exports = [config, modernConfig]
