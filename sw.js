var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
//  '/css/main.css',
//  '/dist/main.js',
//  '/fonts/1cXxaUPXBpj2rGoU7C9WiHGFq8Kk1Q.woff2',
//  '/fonts/DPEuYwWHyAYGVTSmalsRcd3emkUrFQ.woff2',
//  '/fonts/TwMO-IAHRlkbx940YnYXSCiN9uc.woff2',
//  '/fonts/RrQUbo9-9DV7b06QHgSWsahHT4ICGcWB.woff2',
//  '/fonts/I_uuMpWdvgLdNxVLXbNakwKso5c.woff2',
//  '/fonts/wEO_EBrAnc9BLjLQAUk1VvoK_kgXiQ.woff2',
//  '/fonts/u-4x0qWljRw-Pd8w__1ImSRu.woff2',
//  '/fonts/fontawesome-webfont.woff?v=4.5.0',
//  '/images/400x250.gif',
//  '/images/amith-bio-300x300.jpg',
//  '/images/once-upon-a-time.jpg',
//  '/images/joao-silas.jpg',
//  '/images/office.jpg',
//  '/images/about-me.jpg',
  '/articles/',
  '/portfolio/',
  '/about/',
  '/terms/',
//  '/404/',
//  '/images/dotnet-700x350.jpg',
//  '/images/website-design-700x350.jpg',
//  '/images/web-designer-700x350.jpg',
//  '/images/writer-700x350.jpg',
//  '/images/editor-700x350.jpg',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {

  // Use this to delete previous caches!
  // Whitelists caches to keep.
  var cacheWhitelist = ['my-site-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in Cache - fetch from Server
        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              // response is invalid
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
