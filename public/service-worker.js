importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
    })
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style',
    new workbox.strategies.CacheFirst({
        cacheName: 'style-cache',
    })
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script',
    new workbox.strategies.NetworkFirst({
        cacheName: 'scripts-cache',
    })
);

// Chaching documents with Network first
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.NetworkFirst({
        cacheName: 'documents-cache',
    })
);
