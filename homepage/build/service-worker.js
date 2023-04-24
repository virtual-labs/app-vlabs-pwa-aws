const CACHE_NAME = "pwa-assets";
const CACHE_URL =
  "https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items";
const DAYS_TO_CACHE = 10;

const urls = [
  "/",
  "/asset-manifest.json",
  "/favicon.ico",
  "/icons/apple-icon-180.png        ",
  "/icons/apple-splash-1125-2436.jpg",
  "/icons/apple-splash-1136-640.jpg ",
  "/icons/apple-splash-1170-2532.jpg",
  "/icons/apple-splash-1179-2556.jpg",
  "/icons/apple-splash-1242-2208.jpg",
  "/icons/apple-splash-1242-2688.jpg",
  "/icons/apple-splash-1284-2778.jpg",
  "/icons/apple-splash-1290-2796.jpg",
  "/icons/apple-splash-1334-750.jpg ",
  "/icons/apple-splash-1536-2048.jpg",
  "/icons/apple-splash-1620-2160.jpg",
  "/icons/apple-splash-1668-2224.jpg",
  "/icons/apple-splash-1668-2388.jpg",
  "/icons/apple-splash-1792-828.jpg ",
  "/icons/apple-splash-2048-1536.jpg",
  "/icons/apple-splash-2048-2732.jpg",
  "/icons/apple-splash-2160-1620.jpg",
  "/icons/apple-splash-2208-1242.jpg",
  "/icons/apple-splash-2224-1668.jpg",
  "/icons/apple-splash-2388-1668.jpg",
  "/icons/apple-splash-2436-1125.jpg",
  "/icons/apple-splash-2532-1170.jpg",
  "/icons/apple-splash-2556-1179.jpg",
  "/icons/apple-splash-2688-1242.jpg",
  "/icons/apple-splash-2732-2048.jpg",
  "/icons/apple-splash-2778-1284.jpg",
  "/icons/apple-splash-2796-1290.jpg",
  "/icons/apple-splash-640-1136.jpg",
  "/icons/apple-splash-750-1334.jpg",
  "/icons/apple-splash-828-1792.jpg",
  "/icons/manifest-icon-192.maskable.png",
  "/icons/manifest-icon-512.maskable.png",
  "/index.html",
  "/logo-vlabs.webp",
  "/manifest.json",
  "/service-worker.js",
  "/static/css/main.da5111ee.css",
  "/static/css/main.da5111ee.css.map",
  "/static/js/main.7e11db3b.js",
  "/static/js/main.7e11db3b.js.LICENSE.txt",
  "/static/js/main.7e11db3b.js.map",
  CACHE_URL,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urls);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("service-worker activated");
});

self.addEventListener("fetch", (event) => {
  // Only handle requests to the specific URL we're interested in
  if (event.request.url === CACHE_URL) {
    event.respondWith(
      // Check the cache first
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(CACHE_URL).then((response) => {
          if (response) {
            // Check the time since the last request
            const lastRequested = response.headers.get("last-requested");
            if (lastRequested) {
              const timeSinceLastRequest = new Date() - new Date(lastRequested);
              if (timeSinceLastRequest < DAYS_TO_CACHE * 24 * 60 * 60 * 1000) {
                // If less than DAYS_TO_CACHE days, return cached response
                return response;
              }
            }
          }

          // If the cached response is older than DAYS_TO_CACHE days, make a network request
          return fetch(event.request).then((networkResponse) => {
            // Clone the response before using it to construct a new response
            const clonedResponse = networkResponse.clone();
            // Cache the network response and store the timestamp of the last request
            const headers = new Headers(clonedResponse.headers);
            headers.set("last-requested", new Date().toISOString());
            const responseToCache = new Response(clonedResponse.body, {
              status: clonedResponse.status,
              statusText: clonedResponse.statusText,
              headers: headers,
            });
            cache.put(CACHE_URL, responseToCache);
            return networkResponse;
          });
        });
      })
    );

    // Extend the lifetime of the event handler until the cache is updated
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(CACHE_URL).then((response) => {
          // Only update the cache if the response is from the network
          if (response && response.type === "basic") {
            const headers = new Headers(response.headers);
            headers.set("last-requested", new Date().toISOString());
            const responseToCache = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: headers,
            });
            return cache.put(CACHE_URL, responseToCache);
          }
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
