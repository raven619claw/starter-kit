const stats = {
  cached: false,
  cachedAssets: false,
  chunks: false,
  chunkModules: false,
  colors: true,
  children: false,
  hash: false,
  modules: false,
  reasons: false,
  timings: true,
  version: false,
  warningsFilter: warning => warning.indexOf('Conflicting order') === -1
};

module.exports = stats;
