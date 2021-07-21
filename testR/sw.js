const staticCacheName = 's-cache-v1';

const assetsCache = [
    'index.html',
    'app.js',
    'app.css'
]

// self.addEventListener('install', event => {
//     console.log('(SW) ==> install');
//     event.waitUntil(
//         caches.open(staticCacheName).then(cache => cache.addAll(assetsCache))
//     )
// })
// -- same func
self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetsCache);
})

self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys();

    await Promise.all(
        cacheNames
            .filter(name => name !== staticCacheName)
            .map(name => caches.delete(name))
    )

    console.log('(SW) ==> active', cacheNames);
})

self.addEventListener('fetch', event => {
    console.log('Fetch', event.request);

    event.respondWith(cacheFirst(event.request));
})


async function cacheFirst(request){
    const cached = await caches.match(request);
    
    console.log("cached: ", cached)

    return cached ?? await fetch(request);
}