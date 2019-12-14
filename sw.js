const staticCacheName = 'OBS_2019_12_14_13_45'

this.addEventListener('install', event => {
    this.skipWaiting();

    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll([
                '/',
                'manifest.json',
                'https://kleitomberg.github.io/',
                'https://kleitomberg.github.io/index.js',
                'https://kleitomberg.github.io/imagens/sheet.png',
                'https://kleitomberg.github.io/manifest.json',
              'https://kleitomberg.github.io/imagens/icons/icon-192x192.png',
                'chrome-extension://elicpjhcidhpjomhibiffojpinpmmpil/video/chromecastcheck.js',
               ' https://kleitomberg.github.io/imagens/icons/icon-144x144.png'         
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
