const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    './index.html',
    './styles.css',
    './script.js',
    './images/w-logo-circle.png',
    './images/My profile.jpg',
    './videos/hacker_bg.mp4'
];

console.log('Service Worker: Installing...');

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files');
                return cache.addAll(CACHE_ASSETS);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
