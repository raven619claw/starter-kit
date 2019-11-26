const { getFullPath } = require('../helper');

const resolvers = {
  extensions: ['.js', '.mjs', '.json', '.jsx'],
  modules: ['node_modules', getFullPath('src/client'), getFullPath('src/server/node_modules')],
  alias: {
    client: getFullPath('src/client'),
    server: getFullPath('src/server'),
    shared: getFullPath('src/shared'),
    config: getFullPath('config')
  }
};
module.exports = {
  resolvers
};
