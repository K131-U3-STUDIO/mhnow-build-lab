const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const master=require('../data/mhn_master.json'),oracle=require('./style-condition-oracle.json');
const c={console,setTimeout};vm.createContext(c);vm.runInContext(fs.readFileSync(require.resolve('../js/engine.js'),'utf8'),c);const E=c.MHNEngine;
assert.equal(oracle.length,17);let cases=0;
for(const o of oracle){
 const w=master.weapons.find(w=>w.id==='weapon_'+o.officialId);assert(w);assert(!w.skills[o.skill]);assert(!('customEnhancementMax'in w));
 for(const state of [undefined,false,true]){
  const r=E.resolveStyleSkills(w,state===undefined?{}:{[w.id]:state});assert.equal(r.skills[o.skill]||0,state===true?o.level:0);assert.equal(r.styleState.explicit,state!==undefined);
  for(const [k,v]of Object.entries(w.skills))assert.equal(r.skills[k],v);
  for(const k of ['attack','affinity','elementValue'])assert.equal(r[k],w[k]);
  assert.equal(E.resolveStyleSkills(r,{}).skills[o.skill]||0,0);cases++;
 }
 for(const state of [0,10,20,'true',null])assert.throws(()=>E.resolveStyleSkills(w,{[w.id]:state}));
}
for(const condition of [9,11,20,21])assert.throws(()=>E.resolveStyleSkills({id:'x',skills:{},conditionalSkills:[{skill:'x',level:1,requiredCustomEnhancementLevel:condition}]}));
console.log('PASS',cases,'official-oracle style state cases; normal skills/stats preserved; stale numeric states rejected; unknown conditions guarded');
