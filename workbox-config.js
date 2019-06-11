if (workbox) {
  // precaching strategy, serve precached assets without waiting for service worker to update.
  workbox.skipWaiting();

  // sync service-workers if opened in simulatenous tabs
  workbox.clientsClaim();

  // registerRoute watches the url being hit by the browser in worker thread, and parses it, if it matches the regex, and applies strategy accordingly

  // networkOnly strategy for index pages, in case network fails, serve offline.html
  workbox.routing.registerRoute(/(.+)\?utm_source=homescreen$/, async ({ event }) => {
    try {
      return await workbox.strategies.networkOnly().handle({ event });
    } catch (error) {
      return caches.match('/offline.html');
    }
  });

  // precaching the assets
  workbox.precaching.precacheAndRoute(self.__precacheManifest || [], {
    directoryIndex: null,
    cleanUrls: false
  });

  // ------------------  runtime caching starts ---------------------

  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.networkFirst({
      cacheName: 'api-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 12 // 12 Hours
        })
      ]
    })
  );
  workbox.routing.registerRoute(/\//, async ({ event }) => {
    try {
      return await workbox.strategies.networkOnly().handle({ event });
    } catch (error) {
      return caches.match('/offline.html');
    }
  });

  // ----------- runtime caching ends ---------------
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
