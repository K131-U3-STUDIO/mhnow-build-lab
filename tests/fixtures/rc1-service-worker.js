const PREFIX="mhn-build-lab-",CACHE=PREFIX+"v06-rc1-20260918";
const CORE=["./","./index.html","./js/app.js","./js/engine.js","./js/search-worker.js","./data/mhn_master.json","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("message",e=>{if(e.data?.type==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==self.location.origin)return;
 const master=u.pathname.endsWith("/data/mhn_master.json");
 if(master||e.request.mode==="navigate"){
  const key=master?new URL("./data/mhn_master.json",self.registration.scope).href:new URL("./index.html",self.registration.scope).href;
  e.respondWith((async()=>{const cache=await caches.open(CACHE);try{const r=await fetch(e.request);if(!r.ok)throw new Error("HTTP "+r.status);if(master){const d=await r.clone().json();if(!d.weapons?.length||!d.armors?.length||!d.skills)throw new Error("invalid master")}await cache.put(key,r.clone());return r}catch(err){return await cache.match(key)||new Response("Offline resource unavailable",{status:503})}})());return;
 }
 // Application assets are a versioned set installed together.
 e.respondWith(caches.open(CACHE).then(async c=>(await c.match(e.request))||fetch(e.request)));
});
