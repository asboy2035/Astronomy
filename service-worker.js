// Cache name
const CACHE_NAME = 'astronomer-cache-v1.1';

// Files to cache
const FILES_TO_CACHE = [
  '/Images',
  '/app.js',
  'styles.css',
  'mobile.css',
  'planets.json',
  'index.html',
  'check-pwa.js'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first with proper fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            if (!networkResponse || !networkResponse.ok) {
              throw new Error('Network response was not ok');
            }
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
      })
      .catch(() => {
        // Optionally return a fallback offline page or asset
        return caches.match('offline.html');
      })
  );
});
