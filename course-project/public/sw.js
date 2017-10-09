const STATIC_CACHE_KEY = 'static-v2';
const DYNAMIC_CACHE_KEY = 'dynamic';
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE_KEY) // Add versioning to force a refresh of the cached elements
            .then(cache => {
                console.log('[Service worker] Precaching App Shell');
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/promise.js',
                    '/src/js/fetch.js',
                    '/src/js/material.min.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/images/main-image.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700', // CORS headers are required for this to work
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',

                ]);
                // Individual caching
                // cache.add('/');
                // cache.add('/index.html');
                // cache.add('/src/js/app.js');

            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keylist => Promise.all( // Take an array of promises and wait for all to finish
                keylist
                    .filter(key => key !== STATIC_CACHE_KEY && key !==DYNAMIC_CACHE_KEY)
                    .map(key => caches.delete(key))))
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cacheResponse => cacheResponse ? cacheResponse :
                fetch(event.request)
                    .then(fetchResponse => caches.open(DYNAMIC_CACHE_KEY).then( // Dynamic cache fetch requests
                        cache => {
                            cache.put(event.request.url, fetchResponse.clone()); // Clone because put consumes the response
                            return fetchResponse
                        }))
                    .catch(error =>{})
            )
    );
});
