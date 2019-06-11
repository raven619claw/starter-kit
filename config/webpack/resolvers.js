const { getFullPath } = require('../helper');

const resolvers = {
  extensions: ['.js', '.mjs', '.json', '.jsx'],
  modules: ['node_modules', getFullPath('client'), getFullPath('server/node_modules')],
  alias: {
    utils: getFullPath('client/utils'),
    constants: getFullPath('client/constants'),
    actions: getFullPath('client/actions'),
    assets: getFullPath('client/assets'),
    icons: getFullPath('client/assets/images/icons'),
    'common-components': getFullPath('client/common-components'),
    'desktop-components': getFullPath('client/desktop-components'),
    'mobile-components': getFullPath('client/mobile-components'),
    styles: getFullPath('client/styles'),
    emotion: getFullPath('shared/custom-emotion'),
    'desktop-containers': getFullPath('client/desktop-containers'),
    'mobile-containers': getFullPath('client/mobile-containers')
  }
};
module.exports = {
  resolvers
};
