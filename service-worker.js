'use strict';
const RELEASE="v061-0d8d198fa5c341c7",ASSETS={"assets/app.d6411f1ea432b409.js": "d6411f1ea432b4096fb1edf380460fc9cb7b1f1f4fa4c12d89d0b440f72799ec", "assets/engine.0515cb14bc98f3ea.js": "0515cb14bc98f3eae6dd30724df4121fda00592c0eac15b55eac2f6bd1b3baa1", "assets/search-worker.08071eb90b7f33e9.js": "08071eb90b7f33e905d9c81baa19206ecb5ebdf47c88dbcf56410c7803b32b59", "data/mhn_master.json": "bb7183a98dda6def82b14272c9016b07b1941363e0d2371755d9093263d70978", "icons/apple-touch-icon.png": "0d0789e624cdcc036f59d58b6b0aa9176e9fbec23ce00d7f99a62497726b5ac2", "icons/icon-192.png": "b60767894e83bb97b88138fda8f84b857d99ade7fc32f78a4346fb93dcc19145", "icons/icon-512.png": "42c85a596a5ff574b906d1668e787467d7dcea00998e69373ac0d9a20abbbd6e", "index.html": "b8b7907ac47c7261bd9951171bb8b460eb39829b74d1ffbcff27b68cc4c09d7e", "manifest.webmanifest": "3bed13344198b08500241e9acf6277b569613dfeae5436693ee1512fe4642ffe"};
const SCOPE=self.registration.scope,PREFIX='mhnbl:'+SCOPE+':',CACHE=PREFIX+RELEASE;
const absolute=p=>new URL(p,SCOPE).href;
async function digest(response){const bytes=await response.clone().arrayBuffer();return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('')}
function compatible(d){
 const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x),skills=x=>object(x)&&Object.entries(x).every(([k,v])=>k&&Number.isInteger(v)&&v>0&&v<=20),unique=rows=>new Set(rows.map(x=>x.id)).size===rows.length;
 const types=['片手剣','双剣','大剣','太刀','ハンマー','狩猟笛','ランス','ガンランス','スラッシュアックス','チャージアックス','操虫棍','ライトボウガン','ヘビィボウガン','弓'];
 return d?.schemaVersion===6&&typeof d.version==='string'&&Array.isArray(d.weapons)&&d.weapons.length>=100&&unique(d.weapons)&&d.weapons.every(w=>typeof w.id==='string'&&typeof w.name==='string'&&!w.slot&&(w.id==='custom'||types.includes(w.type))&&Number.isFinite(w.attack)&&Number.isFinite(w.affinity)&&Number.isFinite(w.elementValue)&&skills(w.skills))&&types.every(t=>d.weapons.some(w=>w.type===t))&&Array.isArray(d.armors)&&d.armors.length>=100&&unique(d.armors)&&d.armors.every(a=>typeof a.id==='string'&&typeof a.name==='string'&&['head','chest','arms','waist','legs'].includes(a.slot)&&skills(a.skills))&&object(d.skills)&&Object.keys(d.skills).length>=80&&Object.values(d.skills).every(s=>object(s)&&Number.isInteger(s.max)&&s.max>0&&s.max<=20);
}

self.addEventListener('install',e=>e.waitUntil((async()=>{
 // Download and verify the complete release before publishing its cache.
 const rows=await Promise.all(Object.entries(ASSETS).map(async([p,hash])=>{const response=await fetch(absolute(p),{cache:'reload'});if(!response.ok||await digest(response)!==hash)throw new Error('Incomplete release: '+p);if(p==='data/mhn_master.json'&&!compatible(await response.clone().json()))throw new Error('Incompatible master');return [absolute(p),response]}));
 const cache=await caches.open(CACHE);try{for(const [url,response]of rows)await cache.put(url,response)}catch(err){await caches.delete(CACHE);throw err}
 // An existing app must explicitly accept a waiting release. No automatic skipWaiting.
})()));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
// Keep older release caches for already-open clients. Never delete another scope's cache.
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||!u.href.startsWith(SCOPE))return;
 const relative=u.href.slice(SCOPE.length).split('?')[0];
 if(e.request.mode==='navigate'){e.respondWith(caches.open(CACHE).then(c=>c.match(absolute('index.html'))).then(r=>r||new Response('Release unavailable',{status:503})));return}
 if(relative==='data/mhn_master.json'){e.respondWith((async()=>{const c=await caches.open(CACHE);try{const r=await fetch(e.request);if(!r.ok||!compatible(await r.clone().json()))throw new Error('Incompatible master');await c.put(absolute(relative),r.clone());return r}catch(err){return await c.match(absolute(relative))||new Response('Compatible master unavailable',{status:503})}})());return}
 if(/^assets\/(app|engine|search-worker)\.[a-f0-9]{16}\.js$/.test(relative)&&!Object.hasOwn(ASSETS,relative)){
  e.respondWith((async()=>{for(const name of (await caches.keys()).filter(k=>k.startsWith(PREFIX))){const hit=await (await caches.open(name)).match(absolute(relative));if(hit)return hit}try{const r=await fetch(e.request),hash=relative.split('.').at(-2);if(!r.ok||!(await digest(r)).startsWith(hash))throw new Error('Old asset missing');return r}catch(err){return new Response('Older release asset unavailable',{status:503})}})());return
 }
 if(Object.hasOwn(ASSETS,relative)){e.respondWith((async()=>{const c=await caches.open(CACHE),hit=await c.match(absolute(relative));if(hit)return hit;try{const r=await fetch(e.request);if(!r.ok||await digest(r)!==ASSETS[relative])throw new Error('Asset mismatch');return r}catch(err){return new Response('Release asset unavailable',{status:503})}})())}
});
