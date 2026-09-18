const assert=require('node:assert/strict');
const {makeApp}=require('./app-harness.cjs');
let passed=0;function check(name,fn){fn();passed++;console.log('PASS',name)}
check('snapshot persists required exclude and max constraints',()=>{const a=makeApp();const o=a.run('requirements={攻撃:2};skillLimits={見切り:0,防御:1};currentSnapshot()');assert.equal(o.requirements.攻撃,2);assert.equal(o.skillLimits.見切り,0);assert.equal(o.skillLimits.防御,1)});
check('legacy backup without limits stays compatible',()=>{const a=makeApp();const o=a.sandbox.validateBackup({app:'MH Now Build Lab',schemaVersion:6,excluded:[],mysets:[],requirements:{攻撃:1},manualDrift:{},ownedDrift:{},armorSettings:{}});assert.equal(JSON.stringify(o.skillLimits),'{}')});
check('invalid overlapping min/max condition rejected',()=>{const a=makeApp();assert.throws(()=>a.sandbox.validateBackup({app:'MH Now Build Lab',schemaVersion:6,excluded:[],mysets:[],requirements:{攻撃:1},skillLimits:{攻撃:1},manualDrift:{},ownedDrift:{},armorSettings:{}}))});
check('power search snapshot can intentionally ignore skill filters',()=>{const a=makeApp();a.run('requirements={攻撃:2};skillLimits={見切り:0};');const o=a.run('searchSnapshot({}, {})');assert.equal(JSON.stringify(o.requirements),'{}');assert.equal(JSON.stringify(o.skillLimits),'{}')});
check('skill search snapshot freezes limits at start',()=>{const a=makeApp();a.run('requirements={攻撃:2};skillLimits={見切り:0};');const o=a.run('searchSnapshot(requirements,skillLimits)');a.run('requirements.攻撃=5;skillLimits.見切り=2');assert.equal(o.requirements.攻撃,2);assert.equal(o.skillLimits.見切り,0);assert(Object.isFrozen(o.skillLimits))});
console.log(JSON.stringify({passed}));
