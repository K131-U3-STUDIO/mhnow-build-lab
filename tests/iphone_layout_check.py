"""Phone skill-pane layout regression using mounted HTML/CSS + real app handlers.

Run: python tests/iphone_layout_check.py --chromium /usr/bin/chromium
Requires the Python playwright package and a permitted Chromium executable.
No HTTP navigation: page.set_content renders the local artifact. fetch and
localStorage use explicit in-memory fixtures; full Worker/PWA lifecycle is NOT
exercised. Worker/calculation regressions are covered separately by npm test.
"""
from pathlib import Path
import argparse
import json
import re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--chromium', default='/usr/bin/chromium')
parser.add_argument('--output', type=Path, default=ROOT / 'tests' / 'iphone-width-results')
args = parser.parse_args()
args.output.mkdir(parents=True, exist_ok=True)
html = (ROOT / 'index.html').read_text(encoding='utf-8')
html = re.sub(r'<script\s+src="[^\"]+"[^>]*></script>', '', html)
master = json.loads((ROOT / 'data/mhn_master.json').read_text(encoding='utf-8'))
viewports = [(320,568),(360,780),(375,667),(390,844),(393,852),(414,896),
             (430,932),(480,854),(600,960),(760,1024),(768,1024),(820,1180),
             (960,768),(961,768),(1024,768),(1366,900),(844,390),(390,360)]
report = {'method':'local rendered HTML/CSS + real app.js; fixture fetch/storage; not an iPhone device or PWA lifecycle',
          'layout_checks':[], 'interaction_checks':[], 'errors':[]}
metrics_js = '''() => {
 const width=document.documentElement.clientWidth;
 const selectors=['#pane-skill','#pane-skill .layout','#pane-skill .layout > aside',
  '#pane-skill .layout > main','#skillCats','#skillCheckList','.skill-row',
  '.skill-mode','.skill-lv','#skillSearchText','#skillSort','#skillSearch',
  '#reqList','#skillResults .result','#skillResults .chip'];
 const problems=[];
 for(const selector of selectors)for(const el of document.querySelectorAll(selector)){
  if(!el.getClientRects().length)continue;
  const r=el.getBoundingClientRect();
  if(r.left < -1 || r.right > width+1)problems.push({selector,left:r.left,right:r.right,width:r.width});
 }
 const font=[...document.querySelectorAll('.skill-row select')].map(el=>parseFloat(getComputedStyle(el).fontSize));
 const height=[...document.querySelectorAll('.skill-row select')].map(el=>el.getBoundingClientRect().height);
 const aside=document.querySelector('#pane-skill .layout > aside').getBoundingClientRect();
 return {client:width,scroll:document.documentElement.scrollWidth,inner:innerWidth,
  asideWidth:aside.width,problems,fontMin:font.length?Math.min(...font):null,
  selectHeightMin:height.length?Math.min(...height):null};
}'''

with sync_playwright() as playwright:
 browser = playwright.chromium.launch(executable_path=args.chromium,
             args=['--no-sandbox','--disable-dev-shm-usage'])
 report['browser'] = browser.version
 context = browser.new_context(viewport={'width':390,'height':844},
              is_mobile=True,has_touch=True,device_scale_factor=1)
 page = context.new_page()
 page.on('pageerror', lambda error: report['errors'].append(str(error)))
 try:
  page.set_content(html,wait_until='domcontentloaded')
  page.evaluate('''master => {
   const values=new Map();
   Object.defineProperty(window,'localStorage',{value:{
    getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,String(v)),
    removeItem:k=>values.delete(k),clear:()=>values.clear()},configurable:true});
   window.fetch=async url=>{
    if(String(url)==='./data/mhn_master.json')return new Response(JSON.stringify(master),
     {status:200,headers:{'Content-Type':'application/json'}});
    throw Error('Unexpected fixture fetch: '+url);
   };
  }''',master)
  page.add_script_tag(content=(ROOT / 'js/app.js').read_text(encoding='utf-8'))
  page.wait_for_function("document.querySelector('#covWeapons').textContent==='721'")
  page.locator('.bottom-tab[data-tab="skill"]').click()
  def measure(label,width,height):
   data=page.evaluate(metrics_js)
   assert data['client']==width,(label,data)
   assert data['scroll']<=data['client']+1,(label,data)
   assert not data['problems'],(label,data)
   if width<=760 and data['fontMin'] is not None:
    assert data['fontMin']>=16,(label,data)
    assert data['selectHeightMin']>=44,(label,data)
   report['layout_checks'].append({'state':label,'width':width,'height':height,'status':'PASS',**data})
  for width,height in viewports:
   page.set_viewport_size({'width':width,'height':height})
   page.evaluate("window.scrollTo(0,0);$('skillSelectedOnly').checked=false;requirements={};skillLimits={};$('skillSearchText').value='';skillCategory='all';renderSkillCategories();renderReq();renderSkillCatalog();$('skillResults').innerHTML='';")
   measure('all_skills',width,height)
   page.evaluate("$('skillSearchText').value='爆破';renderSkillCatalog();")
   measure('blast_filter',width,height)
   page.evaluate("setSkillCondition('属性攻撃増強【SP】','required',5);setSkillCondition('追い打ち【爆破】','required',5);setSkillCondition('滅尽龍の渇望','exclude');setSkillCondition('見切り','max',1);$('skillSearchText').value='';$('skillSelectedOnly').checked=true;renderReq();renderSkillCatalog();")
   measure('required_excluded_capped',width,height)
   # Actual result renderer + a calculated fixed equipment combination. This is
   # a rendering fixture, not a test that this loadout meets the selected filters.
   page.evaluate("""() => {
    const prior=$('driftMode').value;$('driftMode').value='none';
    const parts=SLOT_ORDER.map(s=>DB.armors.find(a=>a.slot===s));
    const weapon=currentWeapon(),ev=evaluate(parts,weapon,{},{});
    const r={parts,weapon,...ev};
    $('skillResults').innerHTML=resultHtml(r,0,{},{});
    $('driftMode').value=prior;
   }""")
   measure('result_render',width,height)
   if (width,height) in [(390,844),(320,568),(430,932),(820,1180),(1366,900)]:
    page.evaluate("window.scrollTo(0,0)")
    page.screenshot(path=str(args.output/f'skill-{width}x{height}.png'),full_page=True)
  # Real DOM event handlers, no synthetic changes to app state for these checks.
  page.set_viewport_size({'width':390,'height':844})
  page.evaluate("$('skillSelectedOnly').checked=false;$('skillSearchText').value='';skillCategory='all';renderSkillCategories();renderSkillCatalog();")
  page.locator('#clearReq').click()
  def find_skill(name):
   page.locator('#skillSearchText').fill(name)
   page.wait_for_timeout(180)
   return page.locator(f'.skill-row[data-skill="{name}"]')
  row=find_skill('追い打ち【爆破】')
  row.locator('.skill-check').check()
  row.locator('.skill-lv').select_option('5')
  assert page.evaluate("requirements['追い打ち【爆破】']") == 5
  report['interaction_checks'].append('required level 5')
  row=find_skill('滅尽龍の渇望')
  row.locator('.skill-mode').select_option('exclude')
  assert page.evaluate("skillLimits['滅尽龍の渇望']") == 0
  assert row.locator('.skill-lv').is_disabled()
  report['interaction_checks'].append('exclude and disabled level')
  row=find_skill('見切り')
  row.locator('.skill-mode').select_option('max')
  row.locator('.skill-lv').select_option('1')
  assert page.evaluate("skillLimits['見切り']") == 1
  report['interaction_checks'].append('maximum level 1')
  page.locator('#skillSearchText').fill('');page.wait_for_timeout(180)
  page.locator('#skillSelectedOnly').check()
  assert page.locator('.skill-row').count()==3
  report['interaction_checks'].append('selected only')
  page.locator('.skill-cat[data-cat="affinity"]').click()
  assert page.locator('.skill-row').count()==1
  assert page.locator('.skill-row').get_attribute('data-skill')=='見切り'
  report['interaction_checks'].append('category with selected only')
  measure('interaction_state',390,844)
  page.locator('#clearReq').click()
  assert page.locator('.skill-row').count()==0
  assert page.evaluate('Object.keys(requirements).length+Object.keys(skillLimits).length')==0
  report['interaction_checks'].append('clear all conditions')
  measure('no_selected_skills',390,844)
  assert not report['errors'],report['errors']
  report['status']='PASS'
 except Exception as error:
  report['status']='FAIL';report['failure']=str(error)
  raise
 finally:
  (args.output/'layout-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
  browser.close()
print(json.dumps({'status':report['status'],'layout_checks':len(report['layout_checks']),
                  'interaction_checks':len(report['interaction_checks']),'browser':report['browser']}))
