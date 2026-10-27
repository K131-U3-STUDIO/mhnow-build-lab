const {chromium}=require('playwright'),assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const expectedWeapons=JSON.parse(fs.readFileSync(path.join(root,'data/mhn_master.json'),'utf8')).weapons.filter(w=>w.id!=='custom').length;
const server=http.createServer((req,res)=>{let f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(f.endsWith(path.sep))f=path.join(f,'index.html');try{res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.json')?'application/json':f.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end('missing')}});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.type()==='prompt'?d.accept('index fixture'):d.accept());
try{
 await page.goto(`http://127.0.0.1:${server.address().port}/`);await page.waitForFunction(n=>document.querySelector('#covWeapons').textContent===String(n),expectedWeapons);
 await page.locator('#weaponPickerBtn').click();await page.locator('#weaponCustomBtn').click();
 await page.locator('#rawInput').fill('1000');await page.locator('#affInput').fill('0');await page.locator('#elementSelect').selectOption('火');await page.locator('#elemInput').fill('200');
 assert.match(await page.locator('#weaponSummary').textContent(),/火 200 \/ 攻撃 1000 \/ 会心 0%/);console.log('PASS manual edits update weapon summary immediately');
 await page.locator('#elementMultiplier').fill('1.5');await page.locator('#rawInput').focus();await page.reload();await page.waitForFunction(n=>document.querySelector('#covWeapons').textContent===String(n),expectedWeapons);
 assert.equal(await page.locator('#elementMultiplier').inputValue(),'1.5');assert.match(await page.locator('#weaponSummary').textContent(),/火 200 \/ 攻撃 1000/);console.log('PASS reload restores multiplier and edited summary');
 // Controlled five-slot equipment makes browser/Worker expected values independent of optimizer choices.
 await page.evaluate(()=>{DB.armors=['head','chest','arms','waist','legs'].map((slot,i)=>({id:'fixture'+i,name:'fixture '+slot,slot,skills:{},grade:'G10',drift:0,driftUnlockGrades:[]}));rebuildFastIndexes()});
 await page.locator('#driftMode').selectOption('none');
 for(const [factor,total,element]of [['0','1000.0','0.0'],['1','1200.0','200.0'],['1.5','1300.0','300.0']]){
  await page.locator('#elementMultiplier').fill(factor);await page.locator('#powerSearch').click();await page.waitForFunction(()=>!document.querySelector('#powerSearch').disabled);assert.equal(await page.locator('#powerResults .result').count(),1);
  const score=await page.locator('#powerResults .score').textContent();assert(score.startsWith(total));assert(score.includes(`物理 1000.0 / 属性 ${element}`));
 }
 console.log('PASS real Worker ranking factors 0 / 1 / 1.5 retain physical contribution');
 await page.locator('#powerResults .result').click();assert.match(await page.locator('#modalBody').textContent(),/属性倍率1.5倍/);assert.match(await page.locator('#modalBody').textContent(),/実ダメージ・DPSではありません/);await page.locator('#saveDetail').click();await page.locator('#modalClose').click();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('mhnbl_v06_snapshot')));assert.equal(saved.mysets[0].score,1300);assert.equal(saved.mysets[0].searchConditions.values.elementMultiplier.value,'1.5');assert.equal(saved.mysets[0].modelVersion,'generic-0.6-style-r4');console.log('PASS detail and saved snapshot identify factor and model');
 await page.locator('#elementMultiplier').fill('0');await page.locator('#rawInput').focus();
 await page.locator('#importFile').setInputFiles({name:'fixture.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});assert.equal(await page.locator('#elementMultiplier').inputValue(),'1.5');console.log('PASS backup import restores factor');
 const legacy=structuredClone(saved);delete legacy.preferences.values.elementMultiplier;delete legacy.mysets[0].searchConditions.values.elementMultiplier;
 await page.locator('#importFile').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy))});assert.equal(await page.locator('#elementMultiplier').inputValue(),'1');console.log('PASS old backup without factor defaults to 1');
 assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:6,browser:'existing Edge'}));
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
