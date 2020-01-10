const { getFullPath } = require('../helper')

const resolvers = {
  extensions: ['.js', '.mjs', '.json', '.jsx'],
  modules: [
    'node_modules',
    getFullPath('src/client'),
    getFullPath('src/server/node_modules')
  ],
  alias: {
    client: getFullPath('src/client'),
    server: getFullPath('src/server'),
    shared: getFullPath('src/shared'),
    assets: getFullPath('src/assets'),
    config: getFullPath('config'),
    'react-dom': '@hot-loader/react-dom',
    // this has be added to resolve canvas js used by jsdom for intl formatting on server
    // as this package is not needed resolve it to empty
    canvas: getFullPath('src/server/utils/canvas')
  }
}
module.exports = {
  resolvers
}
