// ── HTiSA Service Worker ──
// Versienummer automatisch op huidige datum/tijd — elke upload is een nieuwe versie
const CACHE_NAME = 'htisa-rescue-v' + '20250428';
const BASE = '/htisa-app';

// Network-first strategie: altijd proberen de nieuwste versie te laden
// Cache enkel als fallback bij geen internet
self.addEventListener('install', event => {
  self.skipWaiting(); // activeer meteen, wacht niet op oud tabblad
});

self.addEventListener('activate', event => {
  // Verwijder alle oude caches
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => {
        console.log('[SW] Oude cache verwijderd:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim()) // claim alle open tabs meteen
  );
});

self.addEventListener('fetch', event => {
  // HTML pagina's: altijd netwerk-first (nieuwste versie)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Sla nieuwe versie op in cache
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // Geen internet? Gebruik gecachte versie
          return caches.match(event.request) || caches.match(BASE + '/index.html');
        })
    );
    return;
  }

  // Alle andere bestanden (CSS, JS, afbeeldingen): cache-first maar update op achtergrond
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cached => {
        const networkFetch = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => null);

        return cached || networkFetch;
      });
    })
  );
});

// Stuur bericht naar app als nieuwe versie beschikbaar is
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
