const webpack = require('webpack');
const { server: serverLoaders } = require('./loaders');
const { resolvers } = require('./resolvers');
const { getFullPath, paths } = require('../helper');
const { PROD } = require('../constants');

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
    chunkFilename: PROD ? `[name].server.js` : `[name].[contenthash].server.js`
  },
  resolve: {
    ...resolvers
  },
  module: {
    rules: serverLoaders(PROD)
  },
  stats: {
    colors: true,
    warningsFilter: warning => warning.indexOf('Conflicting order between:') === -1
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER: true,
      CLIENT: false,
      DEV: !PROD,
      BROWSER: false
    })
  ],
  optimization: {
    minimize: false
  }
};

module.exports = config;
