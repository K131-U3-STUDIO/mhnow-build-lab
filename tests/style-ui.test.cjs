const {chromium}=require('playwright'),assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),master=require('../data/mhn_master.json'),oracle=require('./style-condition-oracle.json');
const server=http.createServer((req,res)=>{let f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(f.endsWith(path.sep))f=path.join(f,'index.html');try{res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.json')?'application/json':f.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end('missing')}});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept('style fixture'));
try{
 await page.goto(`http://127.0.0.1:${server.address().port}/`);await page.waitForFunction(n=>document.querySelector('#covWeapons').textContent===String(n),master.weapons.length-1);
 const select=async id=>page.evaluate(id=>{const w=DB.weapons.find(w=>w.id===id);document.querySelector('#weaponSelect').innerHTML=`<option value="${id}">${w.name}</option>`;setWeapon(w)},id);
 const fixture=async()=>page.evaluate(()=>{DB.armors=['head','chest','arms','waist','legs'].map((slot,i)=>({id:'fixture'+i,name:slot,slot,skills:{},grade:'G10',drift:0,driftUnlockGrades:[]}));rebuildFastIndexes()});
 await fixture();await page.locator('#driftMode').selectOption('none');
 let searches=0;
 for(const o of oracle){
  const item=master.weapons.find(x=>x.id==='weapon_'+o.officialId);await select(item.id);
  assert.match(await page.locator('#weaponSummary').textContent(),/未解放（未指定の初期値）/);
  assert.match(await page.locator('#weaponSummary').textContent(),/通常強化: G10.5/);
  for(const state of [undefined,'locked','unlocked']){
   if(state){await page.locator('#styleSkillInput').selectOption(state)}
   const active=state==='unlocked';
   const result=await page.evaluate(async({skill})=>({required:(await enumerate({[skill]:1})).length,excluded:(await enumerate({},null,{[skill]:0})).length,weapon:currentWeapon()}),o);searches+=2;
   assert.equal(result.required,active?1:0);assert.equal(result.excluded,active?0:1);
   for(const [k,v]of Object.entries(item.skills))assert.equal(result.weapon.skills[k],v);
   for(const k of ['attack','affinity','elementValue'])assert.equal(result.weapon[k],item[k]);
  }
 }
 console.log('PASS all 17 weapons x unspecified/locked/unlocked; '+searches+' real Worker required/excluded searches; normal stats/skills');
 const w=master.weapons.find(w=>w.id==='weapon_'+oracle[0].officialId);await select(w.id);
 await page.locator('#powerSearch').click();await page.waitForFunction(()=>!document.querySelector('#powerSearch').disabled);assert.equal(await page.locator('#powerResults .result').count(),1);
 await page.locator('#powerResults .result').click();assert.match(await page.locator('#modalBody').textContent(),/解放済み/);assert.match(await page.locator('#modalBody').textContent(),/能力値加算は未反映/);await page.locator('#saveDetail').click();await page.locator('#modalClose').click();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('mhnbl_v06_snapshot')));assert.equal(saved.mysets[0].searchConditions.styleSkillStates[w.id],true);assert.equal(saved.mysets[0].modelVersion,'generic-0.6-style-r4');
 await page.locator('#styleSkillInput').selectOption('locked');await page.reload();await page.waitForFunction(()=>document.querySelector('#styleSkillNote').textContent.includes('未解放'));assert.equal(await page.locator('#styleSkillInput').inputValue(),'locked');
 await page.locator('#importFile').setInputFiles({name:'restore.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});assert.equal(await page.locator('#styleSkillInput').inputValue(),'unlocked');
 await page.evaluate(()=>styleSkillStates={});await select(w.id);await page.locator('#styleSkillInput').selectOption('locked');const other=master.weapons.find(x=>x.id==='weapon_'+oracle[1].officialId);await select(other.id);assert.match(await page.locator('#weaponSummary').textContent(),/未指定の初期値/);await select(w.id);assert.match(await page.locator('#weaponSummary').textContent(),/スタイルLv10技能: 未解放 \/ /);
 console.log('PASS ranking, detail, saved set snapshot, reload, backup, equipment switching');
 const legacy=structuredClone(saved);delete legacy.preferences.styleSkillStates;for(const set of legacy.mysets)delete set.searchConditions.styleSkillStates;legacy.preferences.weaponEnhancements={[w.id]:20};
 await page.locator('#importFile').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy))});assert.equal(await page.locator('#styleSkillInput').inputValue(),'locked');assert.match(await page.locator('#weaponSummary').textContent(),/未指定の初期値/);
 await page.evaluate(()=>{loadSetWeapon(mysets[0])});assert.equal(await page.locator('#styleSkillInput').inputValue(),'locked');assert.equal((await page.evaluate(()=>currentWeapon())).skills[oracle[0].skill]||0,0);
 assert.match(await page.locator('#mysetsGrid').textContent(),/解放状態は未記録/);
 await page.locator('#styleSkillInput').selectOption('unlocked');await page.evaluate(()=>{delete mysets[0].searchConditions;loadSetWeapon(mysets[0])});assert.equal(await page.locator('#styleSkillInput').inputValue(),'locked');assert.equal((await page.evaluate(()=>currentWeapon())).skills[oracle[0].skill]||0,0);
 console.log('PASS unknown old state including rejected MAX20 never unlocks; missing searchConditions resets unlocked selection; old set reuse safe');assert.deepEqual(errors,[]);
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
