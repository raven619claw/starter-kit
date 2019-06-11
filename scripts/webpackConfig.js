const webpack = require('webpack');
const webpackConfig = require('../config/webpack');
const { logMessage, compilerPromise } = require('../config/helper');
const { PROD, WATCH, HOT_RELOAD, DEVSERVER_HOST, WEBPACK_PORT } = require('../config/constants');

const [[clientConfig, clientModernConfig], serverConfig] = webpackConfig;
if (HOT_RELOAD) {
  clientConfig.entry.main = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    clientConfig.entry.main
  ];
}
const multiCompiler = webpack([clientConfig, serverConfig, clientModernConfig]);

const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');
const clientModernCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'clientModern');
const serverCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'server');

const clientPromise = compilerPromise('client', clientCompiler);
const clientModernPromise = compilerPromise('clientModern', clientCompiler);
const serverPromise = compilerPromise('server', serverCompiler);

const build = async () => {
  [serverCompiler, clientModernCompiler, clientCompiler].map(compiler => {
    if (HOT_RELOAD && compiler.name === 'client') {
      return;
    }
    compiler.watch({}, (error, stats) => {
      const info = stats.toJson();
      if (!error && !stats.hasErrors()) {
        logMessage(stats.toString(serverConfig.stats));
        return;
      }
      if (error) {
        logMessage(error, 'error');
      }

      if (stats.hasErrors()) {
        logMessage(info.errors.toString(), 'error');
      }

      if (stats.hasWarnings()) {
        logMessage(info.warnings.toString(), 'warning');
      }
    });
  });

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
    await clientModernPromise;
    logMessage('Done!', 'info');
    if (PROD || !WATCH) {
      process.exit();
    }
  } catch (error) {
    logMessage(error, 'error');
    process.exit();
  }
};
module.exports = {
  clientConfig,
  clientModernConfig,
  serverConfig,
  clientCompiler,
  clientModernCompiler,
  serverCompiler,
  build
};
