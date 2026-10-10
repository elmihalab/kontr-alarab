// كونتر العرب — يخلي اللعبة تشتغل بلا نت
const CACHE='kontr-alarab-1.4.0';
const FILES=["./", "index.html", "three.min.js", "mqtt.min.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "fonts/baloo-bhaijaan-2-arabic-500-normal.woff2", "fonts/baloo-bhaijaan-2-arabic-700-normal.woff2", "fonts/baloo-bhaijaan-2-arabic-800-normal.woff2", "fonts/baloo-bhaijaan-2-latin-500-normal.woff2", "fonts/baloo-bhaijaan-2-latin-700-normal.woff2", "fonts/baloo-bhaijaan-2-latin-800-normal.woff2", "fonts/lalezar-arabic-400-normal.woff2", "fonts/lalezar-latin-400-normal.woff2"];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(r=>{ if(r.ok && new URL(e.request.url).origin===location.origin){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); } return r; }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html')))); });
