// ── HTiSA Service Worker ──
// Versienummer = huidige datum/tijd van upload → elke nieuwe upload = automatische update
const CACHE_NAME = 'htisa-v20260430-1149' + '20250428-1645';
const BASE = '/htisa-app';

self.addEventListener('install', event => {
  self.skipWaiting(); // activeer meteen zonder wachten
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // HTML: altijd netwerk-first zodat je altijd de nieuwste versie krijgt
  if(event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone()));
          return response;
        })
        .catch(() => caches.match(event.request) || caches.match(BASE + '/index.html'))
    );
    return;
  }
  // Andere bestanden: cache maar update op achtergrond
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        var net = fetch(event.request).then(r => {
          if(r && r.status === 200) cache.put(event.request, r.clone());
          return r;
        }).catch(() => null);
        return cached || net;
      })
    )
  );
});

self.addEventListener('message', event => {
  if(event.data === 'skipWaiting') self.skipWaiting();
});
