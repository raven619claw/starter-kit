const webpack = require('webpack')
const { server: serverLoaders } = require('./loaders')
const { resolvers } = require('./resolvers')
const { getFullPath, paths } = require('../helper')
const { sercver: serverOptimization } = require('./optimizations')
const { PROD, IGNORE_MODERN_BUILD } = require('../constants')
const config = {
  mode: PROD ? 'production' : 'development',
  devtool: PROD ? false : 'eval-source-map',
  name: 'server',
  target: 'node',
  entry: getFullPath(`src/server/index.js`),
  output: {
    path: paths.serverBuild,
    publicPath: `/assets/`,
    library: 'react-starter-kit',
    libraryTarget: 'commonjs2',
    filename: `server.js`,
    chunkFilename: !PROD ? `[name].server.js` : `[name].[contenthash].server.js`
  },
  resolve: {
    ...resolvers
  },
  module: {
    rules: serverLoaders({ PROD })
  },
  stats: {
    colors: true,
    warningsFilter: warning =>
      warning.indexOf('Conflicting order between:') === -1
  },
  plugins: [
    // given these are globals which would be directly accessible in webpack and node
    // adding __ to var name to denote the same
    new webpack.DefinePlugin({
      __SERVER__: true,
      __CLIENT__: false,
      __DEV__: !PROD,
      __BROWSER__: false,
      __PROD__: PROD,
      __IGNORE_MODERN_BUILD__: IGNORE_MODERN_BUILD
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  optimization: {
    ...serverOptimization
  }
}

module.exports = config
