const {chromium}=require('playwright'),assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const expectedWeapons=JSON.parse(fs.readFileSync(path.join(root,'data/mhn_master.json'),'utf8')).weapons.filter(w=>w.id!=='custom').length;
const server=http.createServer((req,res)=>{let f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(f.endsWith(path.sep))f=path.join(f,'index.html');try{res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.json')?'application/json':f.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end('missing')}});

(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
const context=await browser.newContext({viewport:{width:1024,height:900},hasTouch:true});const page=await context.newPage();
const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
const out=path.join(root,'tests/results/face-value-layout');fs.mkdirSync(out,{recursive:true});
try{
 await page.goto('http://127.0.0.1:'+server.address().port+'/');await page.waitForFunction(n=>document.querySelector('#covWeapons').textContent===String(n),expectedWeapons);
 for(const width of [390,430,820,960,961,1024,1366,1440]){
  await page.setViewportSize({width,height:900});
  const box=await page.evaluate(()=>{const a=document.querySelector('.layout > aside'),m=document.querySelector('.layout > main');if(!a||!m)return null;const ar=a.getBoundingClientRect(),mr=m.getBoundingClientRect();return {aside:{x:ar.x,y:ar.y,right:ar.right,bottom:ar.bottom},main:{x:mr.x,y:mr.y},scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}});
  assert(box,'aside/main must be layout siblings');assert(box.scroll<=box.client+1,JSON.stringify({width,box}));
  if(width<=960)assert(box.main.y>=box.aside.bottom-1);else{assert(box.main.x>=box.aside.right);assert(Math.abs(box.main.y-box.aside.y)<=1)}
  checks.push({width,...box});if([390,820,1024,1366].includes(width))await page.screenshot({path:path.join(out,'width-'+width+'.png'),fullPage:true});
 }
 await page.locator('#weaponPickerBtn').click();await page.locator('#weaponCustomBtn').click();
 await page.locator('#rawInput').fill('1000');await page.locator('#elementSelect').selectOption('火');await page.locator('#elemInput').fill('200');await page.locator('#affInput').fill('0');await page.locator('#driftMode').selectOption('none');
 await page.evaluate(()=>{document.querySelector('#powerSearch').click();document.querySelector('#cancelSearch').click()});
 await page.waitForFunction(()=>!document.querySelector('#powerSearch').disabled);assert.match(await page.locator('#powerResults').textContent(),/中止/);assert(await page.locator('#cancelSearch').isDisabled());
 await page.evaluate(()=>{DB.armors=['head','chest','arms','waist','legs'].map((slot,i)=>({id:'layoutfixture'+i,name:'fixture '+slot,slot,skills:{},grade:'G10',drift:0,driftUnlockGrades:[]}));rebuildFastIndexes()});
 for(const [mode,total] of [['normal','1200.0'],['sp3','1320.0']]){
  await page.locator('#attackMode').selectOption(mode);await page.locator('#powerSearch').click();await page.waitForFunction(()=>!document.querySelector('#powerSearch').disabled);
  assert((await page.locator('#powerResults .score').textContent()).startsWith(total));assert(await page.locator('#cancelSearch').isDisabled());assert.match(await page.locator('#searchProgress').textContent(),/完了/);
  await page.locator('#powerResults .cmp').click();await page.locator('#powerResults .result').click();
  assert((await page.locator('#modalBody').textContent()).includes('額面指数'));assert((await page.locator('#modalBody').textContent()).includes(mode));await page.locator('#modalClose').click();
 }
 assert.equal(await page.evaluate(()=>compareList.length),2);
 await page.setViewportSize({width:1024,height:900});await page.screenshot({path:path.join(out,'ipad-width-completed.png'),fullPage:true});
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({status:'PASS',emulation:'Edge Chromium viewport/touch; not physical iPad/iPhone',checks,search:'cancel/restart/normal/SP/compare/detail passed',errors},null,2));
 console.log('PASS 8 viewport boundaries, overflow, cancel/restart, normal/SP, comparison and detail');
}finally{await browser.close();await new Promise(r=>server.close(r))}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
