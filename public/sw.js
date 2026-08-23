const CACHE_PREFIX = 'kids-games-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const PRECACHE_URLS = ['/manifest.json', '/offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    const networkResponse = fetch(event.request);
    event.waitUntil(
      networkResponse
        .then((response) => {
          if (!response.ok) return undefined;
          return caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, response.clone()));
        })
        .catch(() => undefined)
    );
    event.respondWith(
      networkResponse
        .catch(async () => (
          (await caches.match(event.request)) || caches.match('/offline.html')
        ))
    );
    return;
  }

  let finishCacheWrite;
  const cacheWrite = new Promise((resolve) => { finishCacheWrite = resolve; });
  event.waitUntil(cacheWrite);
  event.respondWith(caches.match(event.request).then((cached) => {
    if (cached) {
      finishCacheWrite();
      return cached;
    }

    return fetch(event.request).then(async (response) => {
      if (response.ok && new URL(event.request.url).origin === self.location.origin) {
        await caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, response.clone()));
      }
      finishCacheWrite();
      return response;
    }).catch((error) => {
      finishCacheWrite();
      throw error;
    });
  }));
});
