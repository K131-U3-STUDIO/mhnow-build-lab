// Independent, offline function-level regression probes. NOT browser/UI tests.
// Usage: node extra_checks.cjs /path/to/MHNow_Build_Lab_v0.6_RC
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'js/app.js'),'utf8').replace(/\binit\(\);\s*$/,'');
const master=JSON.parse(fs.readFileSync(path.join(root,'data/mhn_master.json'),'utf8'));
const results=[];
function makeApp(initial={}) {
 const elements=new Map(),stored=new Map(Object.entries(initial)),alerts=[];
 const element=id=>{if(!elements.has(id))elements.set(id,{value:'',checked:false,disabled:false,textContent:'',innerHTML:'',classList:{toggle(){},add(){},remove(){}},append(){}});return elements.get(id)};
 let worker=null,denyWrites=false,denyPattern=null;
 class FakeWorker {constructor(){worker=this}postMessage(m){this.message=structuredClone(m)}terminate(){this.terminated=true}}
 const sandbox={console,setTimeout,clearTimeout,setInterval,clearInterval,performance,URL,crypto:require('node:crypto').webcrypto,structuredClone,
 document:{getElementById:element,querySelectorAll(){return []},addEventListener(){},createElement(){return element('generated')},body:{appendChild(){}}},
 location:{protocol:'https:',href:'https://audit.invalid/lab/'},navigator:{userAgent:'offline-test',platform:'Linux',onLine:true},window:{addEventListener(){},matchMedia(){return {matches:false}},innerWidth:1000,scrollTo(){}},
 localStorage:{getItem:k=>stored.get(k)??null,setItem(k,v){if(denyWrites||denyPattern?.test(k))throw new Error('QuotaExceededError');stored.set(k,v)}},
 alert:m=>alerts.push(m),prompt:()=> 'audit set',confirm:()=>true,Worker:FakeWorker};
 vm.createContext(sandbox);vm.runInContext(source,sandbox,{filename:'js/app.js'});sandbox.master=structuredClone(master);vm.runInContext('DB=normalizeMaster(master);rebuildFastIndexes();',sandbox);
 for(const id of ['wex','burst','guard','spirit','dodger','sneak','latent','heroics'])element('up_'+id).value='0';
 element('weaponSelect').value='custom';element('rawInput').value='1000';element('affInput').value='0';element('elementSelect').value='無属性';element('elemInput').value='0';element('driftMode').value='none';
 return {sandbox,stored,alerts,element,run:code=>vm.runInContext(code,sandbox),worker:()=>worker,deny:()=>denyWrites=true,allow:()=>denyWrites=false,denyKeys:r=>denyPattern=r};
}

module.exports={makeApp,master,root};
