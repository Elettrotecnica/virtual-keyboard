const CACHE_NAME = "keyboard-pwa-v3";
const FILES_TO_CACHE = [
    "./",
    "./src/index.js",
    "./src/index.css",
    "./index.html",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon.ico",
    "https://cdn.jsdelivr.net/npm/simple-keyboard@3.8.89/build/css/index.min.css",
    "https://cdn.jsdelivr.net/npm/simple-keyboard@3.8.89/build/index.min.js"
];

// Install SW
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate SW
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch (Cache-first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
