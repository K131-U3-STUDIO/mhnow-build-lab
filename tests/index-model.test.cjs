const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const context={setTimeout,console};vm.createContext(context);vm.runInContext(fs.readFileSync(process.env.ENGINE_FILE||path.join(__dirname,'../js/engine.js'),'utf8'),context);
const E=context.MHNEngine,w={id:'w',name:'fixture',attack:1000,affinity:0,element:'火',elementValue:200,skills:{}};
const master=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/mhn_master.json'),'utf8'));
let passed=0;const test=(name,f)=>{f();console.log('PASS',name);passed++},near=(a,b)=>assert(Math.abs(a-b)<1e-8,`${a} != ${b}`);
function setup(factor,weak=true,extra={}){const values={weakElement:{checked:weak},groupHunt:{checked:false},...extra};if(factor!==undefined)values.elementMultiplier={value:String(factor)};E.configure({db:master,config:{values,driftPool:[]}})}
test('legacy monster factors do not alter face value',()=>{for(const [f,score]of [[0,1200],[1,1200],[1.5,1200]]){setup(f);const r=E.calcFromSkills({},w);near(r.rawExpected,1000);near(r.elemExpected,score-1000);near(r.score,score)}});
test('legacy absent multiplier and OFF retain elemental face value',()=>{setup();near(E.calcFromSkills({},w).score,1200);setup(undefined,false);near(E.calcFromSkills({},w).score,1200);setup(1.5,false);near(E.calcFromSkills({},w).score,1200)});
test('status buildup never becomes elemental damage at 1.5',()=>{setup(1.5);for(const element of ['毒','麻痺','睡眠','爆破','無属性'])near(E.calcFromSkills({},{...w,element}).score,1000)});
test('fire boost and CE correct branch weighting then element-only factor',()=>{setup(1.5);const r=E.calcFromSkills({'火属性攻撃強化':5,'会心撃【属性】':1},{...w,affinity:50});near(r.rawExpected,1000);near(r.elemExpected,(.5*700+.5*760));near(r.score,1730);near(r.calculation.baseElement,200);near(r.calculation.elementAdded,500);near(r.calculation.branches.reduce((n,x)=>n+x.probability,0),1)});
test('positive zero negative affinity with critical element and supercrit',()=>{setup(1);for(const [aff,expected]of [[0,1700],[100,1760],[-100,1700]])near(E.calcFromSkills({'火属性攻撃強化':5,'会心撃【属性】':1,'超会心':1},{...w,affinity:aff}).score,expected)});
test('conditional affinity branches clamp before averaging',()=>{setup(1,true,{up_wex:{value:50}});near(E.calcFromSkills({'弱点特効':5},{...w,affinity:90}).score,1200)});
test('attack rate category adds before additive attack and condition OFF visible',()=>{setup(1,true,{up_burst:{value:100},up_guard:{value:100},up_heroics:{value:0}});const r=E.calcFromSkills({'攻撃':5,'連撃':1,'攻めの守勢':1,'火事場力':1},{...w,elementValue:0});near(r.score,1450);assert(r.breakdown.some(([k,v])=>k==='火事場力 条件'&&v==='0%'))});
test('unmodeled effects remain disclosed and do not invent score',()=>{setup(1);const r=E.calcFromSkills({'チャージマスター':5,'ハイチャージ【火】':2},w);near(r.score,1200);assert(r.breakdown.some(([k,v])=>k==='チャージマスター'&&v.includes('未対応')))});
test('unused legacy multiplier does not affect face value',()=>{for(const bad of [-1,11,'NaN','Infinity']){setup(bad);near(E.calcFromSkills({},w).score,1200)}});
console.log(JSON.stringify({passed}));
