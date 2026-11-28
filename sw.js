const CACHE_NAME='rt-reference-beta-v054-breast-bq678-20261128';
const ASSETS=['./','./index.html','./data.js?v=0.5.4','./evidence.js?v=0.5.4','./rt-clinical-content.js?v=0.5.4','./rt-jastro-content.js?v=1','./breast-field-planner.html','./breast-field-decision.js','./breast-field-logic.js','./clinical-calculators.html','./clinical-calculators.js','./dose-calculator.html','./dose-calculator.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./icon.svg'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith(fetch(event.request).then(res=>{
    if(res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));}
    return res;
  }).catch(()=>caches.match(event.request).then(c=>c||caches.match('./index.html'))));
});
