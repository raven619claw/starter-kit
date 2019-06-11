const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin-with-rtl');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const serviceWorker = require('./ServiceWorkerPlugin');
const { PROD } = require('../constants');

const clientPlugins = [
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
  serviceWorker
  // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb|id|es|ar|vi(?!-)/)
];
if (!PROD) {
  clientPlugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  client: clientPlugins
};
