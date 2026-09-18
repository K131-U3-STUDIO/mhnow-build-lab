const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto').webcrypto;
const root=path.resolve(__dirname,'..'),scope='https://test.invalid/lab/',key=x=>typeof x==='string'?x:x.url;
const manifest=JSON.parse(fs.readFileSync(root+'/release-manifest.json')),code=fs.readFileSync(root+'/service-worker.js','utf8');
let count=0;async function check(n,f){await f();console.log('PASS',n);count++}
function env(source=code,shared=new Map(),base=scope){let offline=false,broken=null,master=null,skips=0;const handlers={};
// Cache entries are stored data, never reusable Response/body streams.
// Cache.put consumes its input; every Cache.match owns fresh bytes and headers.
const caches={
 open:async name=>{
  if(!shared.has(name))shared.set(name,new Map());const rows=shared.get(name);
  return {
   match:async q=>{
    const entry=rows.get(key(q));if(!entry)return undefined;
    return new Response(entry.body===null?null:entry.body.slice(),{status:entry.status,statusText:entry.statusText,headers:entry.headers.map(pair=>pair.slice())});
   },
   put:async(q,r)=>{
    const status=r.status,statusText=r.statusText,headers=[...r.headers.entries()];
    const body=r.body===null?null:new Uint8Array(await r.arrayBuffer());
    rows.set(key(q),{body,status,statusText,headers});
   }
  };
 },
 keys:async()=>[...shared.keys()],delete:async n=>shared.delete(n)
};
async function fetch(req){if(offline)throw Error('offline');const rel=key(req).slice(base.length).split('?')[0]||'index.html';if(rel===broken)return new Response('broken',{status:404});if(rel==='data/mhn_master.json'&&master)return new Response(JSON.stringify(master));try{return new Response(fs.readFileSync(path.join(root,rel)))}catch{return new Response('missing',{status:404})}}
const sandbox={URL,Response,crypto,console,fetch,caches,self:{location:{origin:new URL(base).origin},registration:{scope:base},clients:{claim:async()=>{}},skipWaiting:async()=>{skips++},addEventListener:(n,f)=>handlers[n]=f}};vm.createContext(sandbox);vm.runInContext(source,sandbox);
return {shared,caches,handlers,offline:v=>offline=v,broken:v=>broken=v,master:v=>master=v,skips:()=>skips,async event(n){let p;handlers[n]({waitUntil:v=>p=v});await p},async request(rel,mode='cors'){const request={url:base+rel,method:'GET',mode};let p;handlers.fetch({request,respondWith:v=>p=v});return p?await p:fetch(request)}}}
(async()=>{
await check('B05 content hashes and Worker chain match manifest',async()=>{for(const [p,hash]of Object.entries(manifest.assets))assert.equal(require('node:crypto').createHash('sha256').update(fs.readFileSync(root+'/'+p)).digest('hex'),hash);assert.match(fs.readFileSync(root+'/index.html','utf8'),/assets\/app\.[a-f0-9]{16}\.js/);
 // Independent mock contract: repeated consumed matches must preserve bytes/metadata.
 const fixture=env(),cache=await fixture.caches.open('mock-contract'),url=scope+'binary';
 const original=new Response(new Uint8Array([0,255,17,128]),{status:201,statusText:'Created',headers:{'Content-Type':'application/octet-stream','X-Fixture':'original'}});
 await cache.put(url,original);assert.equal(original.bodyUsed,true);assert.equal(await cache.match(scope+'missing'),undefined);
 for(let i=0;i<3;i++){const hit=await cache.match(url);assert.equal(hit.status,201);assert.equal(hit.statusText,'Created');assert.equal(hit.headers.get('x-fixture'),'original');assert.equal(hit.headers.get('content-type'),'application/octet-stream');hit.headers.set('x-fixture','changed');assert.deepEqual([...new Uint8Array(await hit.arrayBuffer())],[0,255,17,128]);assert.equal(hit.bodyUsed,true)}
 await cache.put(scope+'empty',new Response(null,{status:204}));assert.equal((await cache.match(scope+'empty')).body,null);
});
const e=env();await check('B05 verified install waits for explicit activation',async()=>{await e.event('install');assert.equal(e.skips(),0);e.handlers.message({data:{type:'SKIP_WAITING'}});assert.equal(e.skips(),1);await e.event('activate')});
await check('B05 offline navigation and complete release assets',async()=>{e.offline(true);assert.match(await (await e.request('','navigate')).text(),/assets\/app/);for(const p of Object.keys(manifest.assets))assert.equal((await e.request(p)).status,200);e.offline(false)});
await check('B05 failed install and connection loss retain existing cache',async()=>{const failed=env(code,e.shared);failed.broken(Object.keys(manifest.assets).find(k=>k.startsWith('assets/engine')));const before=[...e.shared.keys()];await assert.rejects(failed.event('install'));assert.deepEqual([...e.shared.keys()],before);failed.offline(true);await assert.rejects(failed.event('install'));assert.equal((await e.request('','navigate')).status,200)});
await check('B05 incompatible network master retains compatible cached bytes',async()=>{const before=await (await e.request('data/mhn_master.json')).text();e.master({schemaVersion:7,weapons:[{}],armors:[{}],skills:{}});assert.equal(await (await e.request('data/mhn_master.json')).text(),before);e.master(null);e.offline(true);assert.equal(await (await e.request('data/mhn_master.json')).text(),before);e.offline(false)});
await check('B05 original RC1 controller uses complete hashed RC2 dependency chain',async()=>{const old=env(fs.readFileSync(__dirname+'/fixtures/rc1-service-worker.js','utf8'));const c=await old.caches.open('mhn-build-lab-v06-rc1-20260918');await c.put(scope+'js/app.js',new Response('RC1 stale app'));const html=await (await old.request('','navigate')).text();const app=html.match(/src="\.\/(assets\/app\.[a-f0-9]+\.js)"/)[1];const body=await (await old.request(app)).text();assert.notEqual(body,'RC1 stale app');const worker=body.match(/new Worker\("\.\/(assets\/search-worker\.[a-f0-9]+\.js)"/)[1];const workerBody=await (await old.request(worker)).text();const engine='assets/'+workerBody.match(/importScripts\("\.\/(engine\.[a-f0-9]+\.js)"/)[1];assert.equal((await old.request(engine)).status,200);old.broken(engine);assert.equal((await old.request(engine)).status,404)});
await check('B05 whole-release switch retains assets for older clients',async()=>{const next=env(code.replace(manifest.release,manifest.release+'-next'),e.shared);await next.event('install');assert.equal(next.skips(),0);const n=e.shared.size;await next.event('activate');assert.equal(e.shared.size,n);next.offline(true);assert.match(await (await next.request('','navigate')).text(),/assets\/app/);e.offline(true);for(const p of Object.keys(manifest.assets))assert.equal((await e.request(p)).status,200)});
await check('B05 unrelated caches and local data never deleted',async()=>{e.shared.set('other-app',new Map());e.shared.set('mhnbl:https://test.invalid/preview/:old',new Map());await e.event('activate');assert(e.shared.has('other-app'));assert(e.shared.has('mhnbl:https://test.invalid/preview/:old'));assert(!/localStorage|indexedDB\.deleteDatabase/.test(code))});
console.log(JSON.stringify({passed:count,environment:'SW handler VM / memory Cache API, not iOS lifecycle'}));
})().catch(e=>{console.error(e);process.exitCode=1});
