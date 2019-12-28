const webpack = require('webpack')
const Visualizer = require('webpack-visualizer-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const {
  client: clientLoaders,
  modernClient: modernClientLoaders
} = require('./loaders')
const { resolvers } = require('./resolvers')
const { client: clientOptimization } = require('./optimizations')
const { client: clientPlugins } = require('./plugins')
const { getFullPath, processManifestOutput, paths } = require('../helper')
const stats = require('./stats')
const { PROD } = require('../constants')
const assetsPluginInstance = new AssetsPlugin({
  processOutput(assets) {
    return processManifestOutput(assets)
  },
  filename: 'assetsManifest.json',
  useCompilerPath: true,
  prettyPrint: true
})
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
  plugins: [
    ...clientPlugins,
    new WriteFilePlugin(),
    assetsPluginInstance,
    new webpack.DefinePlugin({
      __BROWSER__: true,
      __DEV__: !PROD,
      __SERVER__: false,
      __CLIENT__: true,
      __PROD__: PROD
    }),
    new Visualizer({
      filename: './statistics.html'
    }),
    new OptimizeCssAssetsPlugin()
  ],
  stats
}

const modernConfig = {
  ...config,
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
