importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// Caching images
workbox.routing.registerRoute(({ request }) => request.destination === 'image', new workbox.strategies.CacheFirst());

// Caching styles
workbox.routing.registerRoute(({ request }) => request.destination === 'style', new workbox.strategies.CacheFirst());

//Caching scripts external to this origin
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' && !request.url.includes(origin),
    new workbox.strategies.CacheFirst()
);
