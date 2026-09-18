const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/../js/engine.js','utf8'));
const E=globalThis.MHNEngine;let passed=0;
const skills=Object.fromEntries(['攻撃','見切り','防御'].map(k=>[k,{max:5,drift:true,driftStones:['fixture'],fire:k!=='防御'}]));
const w={id:'w',name:'test',attack:1000,affinity:0,element:'無属性',elementValue:0,skills:{'攻撃':1}};
const parts=['head','chest','arms','waist','legs'].map((slot,i)=>({id:'a'+i,name:slot,slot,grade:'G10',skills:i===0?{'見切り':1}:{},drift:i===0?2:0,driftUnlockGrades:i===0?[5,8]:[]}));
function input(mode='none',limits={},owned={}){return {db:{skills,weapons:[w],armors:parts},ownedDrift:owned,excluded:[],armorSettings:{},skillLimits:limits,manualDrift:{},config:{values:{weaponSelect:{value:'w'},rawInput:{value:1000},affInput:{value:0},elementSelect:{value:'無属性'},elemInput:{value:0},driftMode:{value:mode},weakElement:{checked:true},groupHunt:{checked:false}},driftPool:['攻撃','見切り']}}}
const rec=(id,skill)=>({id,skill,level:1,attack:0,defense:0,affinity:0,stone:'fixture'});
async function check(name,fn){await fn();passed++;console.log('PASS',name)}
(async()=>{
 await check('exclude armor skill removes result',async()=>{E.configure(input('none',{'見切り':0}));assert.equal((await E.enumerate()).length,0)});
 await check('exclude weapon skill removes result',async()=>{E.configure(input('none',{'攻撃':0}));assert.equal((await E.enumerate()).length,0)});
 await check('max level accepts equal and rejects excess',async()=>{E.configure(input('none',{'見切り':1}));assert.equal((await E.enumerate()).length,1);E.configure(input('none',{'見切り':0}));assert.equal((await E.enumerate()).length,0)});
 await check('owned drift cannot violate exclusion',async()=>{const clean=parts.map((p,i)=>({...p,skills:{}}));const i=input('owned',{'見切り':0},{a0:[rec('x','見切り')]});i.db={skills,weapons:[w],armors:clean};E.configure(i);const r=await E.enumerate();assert.equal(r.length,1);assert.equal(r[0].skills['見切り']||0,0)});
 await check('theory drift respects max',async()=>{const clean=parts.map(p=>({...p,skills:{}}));const i=input('theory',{'攻撃':1});i.db={skills,weapons:[w],armors:clean};E.configure(i);const r=await E.enumerate({'攻撃':1});assert.equal(r.length,1);assert.equal(r[0].skills['攻撃'],1)});
 console.log(JSON.stringify({passed}));
})().catch(e=>{console.error(e);process.exitCode=1});
