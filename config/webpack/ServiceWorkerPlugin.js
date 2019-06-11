const workboxPlugin = require('workbox-webpack-plugin');

/* Glob patterns are chunks/filenames that are precached by the service worker.
 * Usually you'd want to resolve your static assets through glob patterns
 * Glob directory tells workbox plugin from where to begin lookup of glob patterns
 */
module.exports = new workboxPlugin.InjectManifest({
  swSrc: 'workbox-config.js',
  swDest: 'service-worker.js',
  globPatterns: ['offline.html', 'manifest.json'],
  globDirectory: '.'
});
