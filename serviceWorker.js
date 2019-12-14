// const staticCacheName = 'OBS_2019_12_14_13_45'

// this.addEventListener('install', event => {
//     this.skipWaiting();

//     event.waitUntil(
//         caches.open(staticCacheName)
//         .then(cache => {
//             return cache.addAll([
//                 '/',
//                 '/index.html',
//                 '/index.js',
//                 '/manifest.json',
//                 '/imagens/sheet.png',
//                '/imagens/icons/icon-192x192.png',
//                '/imagens/icons/icon-144x144.png',  
//                '/imagens/icons/icon-144x144.png', 
//                '/imagens/icons/icon-96x96.png', 
//                '/imagens/icons/icon-77x77.png', 
//                '/imagens/icons/icon-152x152.png', 
//                '/imagens/icons/icon-384x384.png', 
//                '/imagens/icons/icon-512x512.png', 

//             ])
//         })
//     )
// })

// this.addEventListener('activate', event => {
//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.filter(cacheName => cacheName.startsWith('usd'))
//                 .filter(cacheName => cacheName !== staticCacheName)
//                 .map(cacheName => caches.delete(cacheName))
//             )
//         })
//     )
// })

// this.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request)
//         .then(response => {
//             return response || fetch(event.request)
//         })
//         .catch(() => {
//             return caches.match('/')
//         })
//     )
// })


var CACHE_NAME = 'OBS_2019_12_14_13_45';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        /*   DESNECESSÁRIO A QUANTIDADE DE IMAGENS, CUIDADO COM A QUANTIDADE DE ARQUIVOS QUE VOCÊ CACHEIA
             SE UM ARQUIVO FALHAR, VAI TER QUE CACHEAR TUDO DE NOVO
        */
            '/',
            '/index.html',
            '/index.js',
            '/style.css',
            '/game.js',
            //'/service-worker.js',
            '/manifest.json',
            '/imagens/sheet.png', 
            '/imagens/icons/icon-512x512.png', 
      ]);
    })
  )
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});