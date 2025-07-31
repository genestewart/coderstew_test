// Service Worker for CoderStew LLC Website
// Provides caching strategy for better performance

const CACHE_NAME = 'coderstew-v1';
const STATIC_ASSETS = [
    '/',
    '/contact',
    '/assets/CoderStew_Logo.svg',
    '/images/projects/ecommerce-mockup.jpg',
    '/images/projects/placeholder.svg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch((error) => {
                console.error('Service Worker: Error caching static assets', error);
            })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip API requests and form submissions
    if (event.request.url.includes('/api/') || 
        event.request.url.includes('/contact') && event.request.method === 'POST') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response for caching
                        const responseToCache = response.clone();

                        // Cache static assets and images
                        if (event.request.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|ico)$/)) {
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }

                        return response;
                    });
            })
            .catch(() => {
                // Fallback for offline pages
                if (event.request.mode === 'navigate') {
                    return caches.match('/');
                }
            })
    );
});

// Background sync for form submissions (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(
            // Handle offline form submissions
            handleOfflineFormSubmissions()
        );
    }
});

async function handleOfflineFormSubmissions() {
    // This would handle queued form submissions when back online
    console.log('Service Worker: Handling offline form submissions');
}