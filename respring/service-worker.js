const CACHE = "respring-gh-v1";

// auto base path ("/" OR "/webrespring/")
const BASE = self.location.pathname.replace(/service-worker\.js$/, '');

const ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "app.js",
  BASE + "app.css",
  BASE + "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;

  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then(res => {
      if (res) return res;

      return fetch(req).then(fetchRes => {
        // avoid redirect caching (GitHub Pages issue)
        if (!fetchRes || fetchRes.status !== 200 || fetchRes.type === "opaqueredirect") {
          return fetchRes;
        }

        const clone = fetchRes.clone();
        caches.open(CACHE).then(cache => cache.put(req, clone));

        return fetchRes;
      }).catch(() => caches.match(BASE + "index.html"));
    })
  );
});