const TerserWebpackPlugin = require('terser-webpack-plugin')

const clientOptimization = {
  namedModules: false,
  noEmitOnErrors: true, // not to generate falsy bundles.
  runtimeChunk: 'single', // generate a manifest which will work the magic of webpack for sewing the bundles on runtime.
  // adding these two params sets the correct import names in files and are accessible with same name
  // downside is it also slows the build
  minimize: true,
  concatenateModules: true,
  //
  minimizer: [
    new TerserWebpackPlugin({
      test: /\.m?js$/i,
      terserOptions: {
        ecma: 6 // This can be set to 7 or 8, too.
      }
    })
  ],
  splitChunks: {
    cacheGroups: {
      default: false,
      vendors: false,
      commons: {
        name: 'externalvendor',
        chunks: 'all',
        priority: 20,
        // TODO: check if relevant anymore
        test: /[\\/]node_modules[\\/]/ // stripping all node_modules in a single chunk
      },
      inhouseLibraries: {
        name: 'vendor',
        chunks: 'all',
        priority: 25,
        test: /[\\/]node_modules[\\/]/
      },
      common: {
        name: 'common',
        minChunks: 2,
        chunks: 'all',
        priority: 10,
        reuseExistingChunk: true,
        enforce: true,
        test: /\.js|jsx|mjs|.svg$/
      },
      commoncss: {
        name: 'commoncss',
        minChunks: 3,
        chunks: 'all',
        priority: 10,
        reuseExistingChunk: true,
        enforce: true,
        test: /\.css|scss$/
      }
    }
  }
}

const serverOptimization = {
  namedModules: false,
  // adding these two params sets the correct import names in files and are accessible with same name
  // downside is it also slows the build
  minimize: true,
  concatenateModules: true,
  //
  splitChunks: {
    cacheGroups: {
      default: false,
      vendors: false,
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor.server',
        chunks: 'all'
      }
    }
  }
}

module.exports = {
  client: clientOptimization,
  server: serverOptimization
}
