const nodemon = require('nodemon');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { paths, logMessage } = require('../config/helper');
const { clientConfig, clientCompiler, build } = require('./webpackConfig');
const { INSPECT, WEBPACK_PORT } = require('../config/constants');
console.log(process.argv);
const app = express();
const start = async () => {
  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats
  };

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  // if you want to debug clientModern with hotreload replace compiler here
  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      watchOptions
    })
  );

  app.use(webpackHotMiddleware(clientCompiler));

  app.use('/static', express.static(paths.clientBuild));

  app.listen(WEBPACK_PORT);

  // wait until client and server is compiled
  try {
    await build();
  } catch (error) {
    logMessage(error, 'error');
  } finally {
    const script = nodemon(`${INSPECT ? '--inspect' : ''} ${paths.serverBuild}/server.js`);
    script.on('restart', () => {
      logMessage('Server side app has been restarted.', 'warning');
    });

    script.on('quit', () => {
      logMessage('Process ended');
      process.exit();
    });

    script.on('error', () => {
      logMessage('An error occured. Exiting', 'error');
      process.exit(1);
    });
  }
};

start();
