const cacheName = 'motion-atlas-media-v1';
const prefix = 'motion-atlas-media-';
const limit = 256 * 1024 * 1024;
const workerRoot = new URL('.', self.location.href);
const media = /\.(?:png|jpe?g|webp|avif|gif|svg|ico|mp4|webm|mp3|wav|ogg|m4a|aac|flac|woff2?|otf|ttf|glb|gltf|bin|ply|hdr)$/i;
let writing = Promise.resolve();
let generation = 0;
const pendingWrites = new Set();

function allowed(value) {
  const url = new URL(value);
  if (url.origin !== workerRoot.origin || !url.pathname.startsWith(workerRoot.pathname)) return false;
  const path = decodeURIComponent(url.pathname.slice(workerRoot.pathname.length));
  if (/\.html?$/i.test(path)) return false;
  return path.startsWith('demos/') && media.test(path) ||
    path.startsWith('vendor/') || /^demos\/.*\/vendor\//.test(path);
}

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  try {
    for (const name of await caches.keys()) {
      if (name.startsWith(prefix) && name !== cacheName) await caches.delete(name);
    }
  } catch { /* Storage is optional; network loading remains available. */ }
  await self.clients.claim();
})()));

async function sized(response) {
  if (response.headers.has('Content-Length') && !response.headers.has('Content-Encoding')) return response;
  const body = await response.blob();
  const headers = new Headers(response.headers);
  headers.delete('Content-Encoding');
  headers.set('Content-Length', String(body.size));
  return new Response(body, {status:response.status, statusText:response.statusText, headers});
}

function save(url, response) {
  if (pendingWrites.has(url)) { response.body?.cancel().catch(() => {}); return Promise.resolve(); }
  pendingWrites.add(url);
  const requestedGeneration = generation;
  writing = writing.catch(() => {}).then(async () => {
    if (requestedGeneration !== generation) return;
    const bytes = Number(response.headers.get('Content-Length'));
    if (bytes > limit) { response.body?.cancel().catch(() => {}); return; }
    const cache = await caches.open(cacheName);
    const keys = await cache.keys(), responses = await cache.matchAll();
    if (requestedGeneration !== generation) return;
    let total = responses.reduce((sum, item) => sum + Number(item.headers.get('Content-Length')), 0);
    const previous = keys.findIndex(key => key.url === url);
    if (previous !== -1) {
      await cache.delete(url);
      total -= Number(responses[previous].headers.get('Content-Length'));
    }
    for (let i = 0; i < keys.length && total + bytes > limit; i++) {
      if (keys[i].url === url) continue;
      await cache.delete(keys[i]);
      total -= Number(responses[i].headers.get('Content-Length'));
    }
    if (requestedGeneration !== generation) return;
    await cache.put(url, response);
  });
  return writing.catch(() => {}).finally(() => pendingWrites.delete(url));
}

async function ranged(response, header) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return response;
  const blob = await response.blob();
  const size = blob.size;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
  if (start > end || start >= size) return new Response(null, {
    status:416, headers:{'Content-Range':`bytes */${size}`}
  });
  const headers = new Headers(response.headers);
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  return new Response(blob.slice(start, end + 1), {status:206, headers});
}

const filling = new Set();

async function remote(request, event) {
  const url = request.url;
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(url);
    if (cached) {
      event.waitUntil(save(url, cached.clone()));
      return request.headers.has('Range') ? ranged(cached, request.headers.get('Range')) : cached;
    }
  } catch { /* Use ordinary network loading when storage is unavailable. */ }
  const range = request.headers.get('Range');
  // Cold range requests stream the network 206 so media stays seekable; the complete file is fetched once in the background for the cache.
  if (range && !filling.has(url)) {
    filling.add(url);
    event.waitUntil((async () => {
      const response = await sized(await fetch(new Request(url, {
        mode:'cors', credentials:'omit', redirect:'follow'
      })));
      if (response.status === 200 && response.type !== 'opaque') await save(url, response);
    })().finally(() => filling.delete(url)));
  }
  const headers = new Headers();
  if (range) headers.set('Range', range);
  const response = await fetch(new Request(url, {
    mode:'cors', credentials:'omit', headers, redirect:'follow'
  }));
  if (range) return response;
  const full = await sized(response);
  if (full.status === 200 && full.type !== 'opaque') event.waitUntil(save(url, full.clone()));
  return full;
}

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET' && allowed(event.request.url)) event.respondWith(remote(event.request, event));
});

self.addEventListener('message', event => {
  if (event.data?.type === 'atlas-cache-remember') {
    const urls = [...new Set(event.data.urls)].filter(allowed);
    const requestedGeneration = generation;
    event.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      for (const url of urls) {
        if (requestedGeneration !== generation) return;
        if (pendingWrites.has(url) || await cache.match(url)) continue;
        try {
          const response = await sized(await fetch(new Request(url, {mode:'cors', credentials:'omit'})));
          if (requestedGeneration !== generation) { response.body?.cancel().catch(() => {}); return; }
          if (response.status === 200 && response.type !== 'opaque') await save(url, response);
        } catch { /* Warming never delays a page opening. */ }
      }
    })().catch(() => {}));
    return;
  }
  if (event.data?.type !== 'atlas-cache-status' && event.data?.type !== 'atlas-cache-clear') return;
  event.waitUntil((async () => {
    if (event.data.type === 'atlas-cache-clear') {
      generation++;
      await caches.delete(cacheName);
    }
    const cache = await caches.open(cacheName);
    const responses = await cache.matchAll();
    event.ports[0]?.postMessage({available:true, files:responses.length,
      bytes:responses.reduce((sum, response) => sum + Number(response.headers.get('Content-Length')), 0), limit});
  })().catch(() => event.ports[0]?.postMessage({available:false, files:0, bytes:0, limit})));
});
