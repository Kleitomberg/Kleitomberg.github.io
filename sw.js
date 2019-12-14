const staticCacheName = 'OBS_2019_12_14_13_45'

this.addEventListener('install', event => {
    this.skipWaiting();

    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.js',
                '/manifest.json',
                '/imagens/sheet.png',
               '/imagens/icons/icon-192x192.png',
               '/imagens/icons/icon-144x144.png',  
               '/imagens/icons/icon-144x144.png', 
               '/imagens/icons/icon-96x96.png', 
               '/imagens/icons/icon-77x77.png', 
               '/imagens/icons/icon-152x152.png', 
               '/imagens/icons/icon-384x384.png', 
               '/imagens/icons/icon-512x512.png', 

            ])
        })
    )
})

this.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName.startsWith('usd'))
                .filter(cacheName => cacheName !== staticCacheName)
                .map(cacheName => caches.delete(cacheName))
            )
        })
    )
})

this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request)
        })
        .catch(() => {
            return caches.match('/')
        })
    )
})
