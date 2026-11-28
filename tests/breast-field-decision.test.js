// node tests/breast-field-decision.test.js
'use strict';
const assert=require('node:assert/strict');
const {decide}=require('../breast-field-decision.js');
const base={
 surgery:'mas',hist:'inv',neo:'no',mstatus:'m0',t:'t1',margin:'neg',
 ax:'alnd',nodes:0,exam:16,deposit:'neg',axPlan:'unknown',
 alndQuality:'adequate',ct:'ct1',cn:'c0',ypn:'unknown',site:'outer',
 imn:'no',age:60,grade:'g1',lvi:'no',subtype:'hr',ene:'no',gross:'no',
 side:'right',recon:'none',systemic:'yes',cnExam:'neg'
};
const keys=['wbi','chest','scv','axilla','imn','boost'];
const cases=[
 ['BCS N0', {surgery:'bcs',ax:'slnb',exam:3},['include','omit','omit','omit','omit','consider']],
 ['BCS SLN 1 macro Z0011', {surgery:'bcs',ax:'slnb',nodes:1,exam:3,deposit:'macro'},['include','omit','omit','omit','consider','consider']],
 ['BCS SLN 1 macro no systemic', {surgery:'bcs',ax:'slnb',nodes:1,exam:3,deposit:'macro',systemic:'unknown'},['include','omit','consider','consider','consider','consider']],
 ['BCS ALND 1 macro', {surgery:'bcs',nodes:1,deposit:'macro'},['include','omit','consider','omit','consider','consider']],
 ['Mastectomy N0',{},['omit','omit','omit','omit','omit','omit']],
 ['Mastectomy N1 after ALND',{nodes:1,deposit:'macro'},['omit','consider','consider','omit','consider','omit']],
 ['Mastectomy N4 inner',{nodes:4,deposit:'macro',site:'inner'},['omit','include','include','omit','include','omit']],
 ['Mastectomy SLN+ no ax plan',{ax:'slnb',nodes:1,deposit:'macro',exam:3},['omit','hold','hold','hold','consider','omit']],
 ['Mastectomy SLN+ RNI',{ax:'slnb',nodes:1,deposit:'macro',exam:3,axPlan:'rni'},['omit','include','include','include','consider','omit']],
 ['Mastectomy SLN+ inner RNI',{ax:'slnb',nodes:1,deposit:'macro',exam:3,axPlan:'rni',site:'inner'},['omit','include','include','include','include','omit']],
 ['SLN micromet (not macro)',{ax:'slnb',nodes:1,deposit:'micro',exam:3},['omit','consider','omit','omit','omit','omit']],
 ['Mastectomy N0 + positive margin',{margin:'pos'},['omit','include','omit','omit','omit','consider']],
 ['Mastectomy T3N0',{t:'t3'},['omit','include','omit','omit','omit','omit']],
 ['Mastectomy T4N0',{t:'t4'},['omit','include','include','omit','omit','omit']],
 ['BCS margin positive',{surgery:'bcs',ax:'slnb',exam:3,margin:'pos'},['include','omit','omit','omit','omit','hold']],
 ['NAC cN1 to ypN0',{neo:'yes',ct:'ct2',cn:'c1',t:'t0',ypn:'yp0'},['omit','consider','consider','omit','omit','omit']],
 ['NAC cN2 to ypN0',{neo:'yes',ct:'ct2',cn:'c23',t:'t0',ypn:'yp0'},['omit','include','include','omit','consider','omit']],
 ['NAC cN2 to ypN0 SLNB only',{neo:'yes',ct:'ct2',cn:'c23',t:'t0',ypn:'yp0',ax:'slnb'},['omit','include','include','include','consider','omit']],
 ['Pure DCIS after mastectomy',{hist:'dcis',t:'tis'},['omit','omit','omit','omit','omit','omit']],
 ['Involved IMN despite pN0',{imn:'pos'},['omit','include','include','omit','include','omit']],
 ['M1 out of scope',{mstatus:'m1'},['hold','hold','hold','hold','hold','hold']],
 ['N unknown should not be N0',{nodes:null,deposit:'unknown'},['omit','hold','hold','hold','hold','omit']]
];
for(const [name,overrides,states] of cases){
 const r=decide({...base,...overrides});
 assert.deepEqual(keys.map(k=>r.fields[k].state),states,name);
}
const conflicts=[
 {...base, nodes:2,deposit:'neg'},
 {...base, nodes:0,deposit:'macro'},
 {...base, hist:'dcis',cn:'c1',t:'tis'},
 {...base, neo:'yes',ypn:'yp0',nodes:1,deposit:'macro',ct:'ct1'},
 {...base, neo:'no',ypn:'yp0'}
];
for(const c of conflicts)assert.equal(decide(c).status,'error','Contradictions must be rejected');
assert.equal(decide({...base,imn:'unknown'}).fields.imn.state,'hold','Unknown IMN not automatically negative');
assert.equal(decide({...base,neo:'unknown'}).status,'incomplete','NAC unknown must remain provisional');
assert.equal(decide({...base,ax:'alnd',alndQuality:'unknown'}).fields.axilla.state,'hold','ALND status alone does not prove field omission');
assert.equal(decide({...base,surgery:'bcs',ax:'slnb',nodes:1,exam:3,deposit:'macro',gross:'unknown'}).fields.axilla.state,'consider','Z0011 requires absence of gross residual');
assert.equal(decide({...base,surgery:'bcs',ax:'slnb',nodes:1,exam:3,deposit:'macro',ct:'unknown'}).fields.axilla.state,'consider','Z0011 requires clinical T1-2');
assert.equal(decide({...base,surgery:'bcs',ax:'slnb',nodes:1,exam:null,deposit:'macro'}).fields.axilla.state,'consider','Unknown SLN examined count must not be assumed');
for(const nodes of [1,2,3,4,5]){
 for(const surgery of ['bcs','mas']){
  const r=decide({...base,nodes,deposit:'macro',surgery,site:'inner'});
  const ref=surgery==='bcs'?'J26BQ6':'J26BQ7';
  assert.equal(r.fields.scv.state,nodes<4?'consider':'include');
  assert(r.fields.scv.refs.includes(ref));
  assert.equal(r.fields.chest.state,surgery==='bcs'?'omit':nodes<4?'consider':'include');
  assert.equal(r.fields.imn.state,nodes<4?'consider':'include');
  if(nodes<4){
   assert(!r.selected.includes('鎖骨上・鎖骨下（Level III）'));
   assert.match(r.summary,/個別検討/);
  }
  if(surgery==='mas')assert(r.fields.scv.refs.includes('J26BQ8'));
 }
}
const n1={...base,nodes:2,deposit:'macro'};
assert.equal(decide({...n1,neo:'unknown'}).fields.chest.state,'hold');
assert.equal(decide({...n1,t:'t4'}).fields.chest.state,'include');
assert.equal(decide({...n1,t:'t4'}).fields.scv.state,'include');
assert.equal(decide({...n1,imn:'pos'}).fields.imn.state,'include');
assert.equal(decide({...n1,imn:'pos'}).fields.chest.state,'include');
assert(!decide({...n1,ax:'slnb',axPlan:'rni'}).fields.chest.refs.includes('J26BQ7'));
assert(!decide({...n1,neo:'yes',ypn:'ypp'}).fields.chest.refs.includes('J26BQ7'));
console.log('Breast field decision tests passed: '+cases.length+' clinical scenarios, '+conflicts.length+' contradictions, and missing-data safety cases');

const afterNAC={...base,neo:'yes',ct:'ct3',t:'t1',ypn:'yp0'};
const b51Fields=r=>Object.entries(r.fields).filter(([,f])=>f.refs.includes('B51')).map(([key])=>key);
const cT3N0=decide({...afterNAC,cn:'c0'});
assert.equal(cT3N0.fields.chest.state,'consider');
assert.deepEqual(b51Fields(cT3N0),[]);
assert.match(cT3N0.fields.chest.reason,/cN0はB-51の登録対象外/);
const cT3N1=decide({...afterNAC,cn:'c1'});
assert.deepEqual(b51Fields(cT3N1),['chest','scv']);
assert.match(cT3N1.fields.chest.reason,/胸壁＋領域照射と無照射.*針生検/);
const unknownCN=decide({...afterNAC,cn:'unknown'});
assert.equal(unknownCN.fields.chest.state,'hold');
assert.deepEqual(b51Fields(unknownCN),[]);
assert.deepEqual(b51Fields(decide({...afterNAC,cn:'c1',mstatus:'unknown'})),[]);
assert.deepEqual(b51Fields(decide({...afterNAC,cn:'c1',ct:'unknown'})),[]);
const highN=decide({...afterNAC,cn:'c23'});
assert.equal(highN.fields.chest.state,'include');
assert.deepEqual(b51Fields(highN),[]);
assert.deepEqual(b51Fields(decide({...afterNAC,cn:'c0',ax:'slnb'})),[]);
console.log('B-51 citation boundary checks passed');
