const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin-with-rtl')
const WebpackRTLPlugin = require('webpack-rtl-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const WebpackBar = require('webpackbar')
const AssetsPlugin = require('assets-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const serviceWorker = require('./ServiceWorkerPlugin')
const { LEGACY, PROD, IGNORE_MODERN_BUILD } = require('../constants')
const { processManifestOutput } = require('../helper')
const { webpackBarClient } = require('./stats')
const assetsPluginInstance = new AssetsPlugin({
  processOutput(assets) {
    return processManifestOutput(assets)
  },
  filename: 'assetsManifest.json',
  useCompilerPath: true,
  prettyPrint: true
})
const clientPlugins = ({ type }) => [
  new WebpackBar(webpackBarClient(type)),
  new WriteFilePlugin(),
  assetsPluginInstance,
  // given these are globals which would be directly accessible in webpack and node
  // adding __ to var name to denote the same
  new webpack.DefinePlugin({
    __BROWSER__: true,
    __DEV__: !PROD,
    __SERVER__: false,
    __CLIENT__: true,
    __PROD__: PROD,
    __IGNORE_MODERN_BUILD__: IGNORE_MODERN_BUILD
  }),
  new Visualizer({
    filename: './statistics.html'
  }),
  new OptimizeCssAssetsPlugin(),
  new CaseSensitivePathsPlugin(),
  new MiniCssExtractPlugin({
    filename: PROD ? '[name].[contenthash].css' : '[name].css',
    stats: { warningFilter: 'none' },
    rtlEnabled: true
  }),
  new WebpackRTLPlugin({
    options: {},
    plugins: [],
    diffOnly: false,
    minify: true
  }),
  // run this only for the client build and not clientmodern build
  new LoadablePlugin({
    filename:
      (type === LEGACY && 'loadable-legacy-stats.json') ||
      'loadable-modern-stats.json'
  }),
  serviceWorker
  // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb|id|es|ar|vi(?!-)/)
]

module.exports = {
  clientPlugins
}
