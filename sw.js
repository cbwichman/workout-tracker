// PulseSheet service worker — offline app shell.
// Bump CACHE_VERSION whenever index.html / styles.css / vendor files change.
const CACHE_VERSION = "pulsesheet-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./vendor/lucide.min.js",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];
const FONT_CACHE = "pulsesheet-fonts";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((c) => c.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION && k !== FONT_CACHE).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return; // never intercept Sheets sync POSTs
  const url = new URL(req.url);

  // Google Fonts: cache-first (fonts are immutable)
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
      })
    );
    return;
  }

  // Only handle our own origin; let Apps Script / other requests hit the network
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first so updates arrive, fall back to cache offline.
  // Query strings (e.g. Watch Shortcut ?avg_hr=...) map to the cached index.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});
