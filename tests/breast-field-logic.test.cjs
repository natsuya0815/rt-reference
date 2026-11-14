const {test}=require('node:test');
const assert=require('node:assert/strict');
const {combinedPlan}=require('../breast-field-logic.js');
const base={s:'mas',hist:'inv',n:1,exam:2,ax:'slnb',neo:'no',t:'t2',ct:'ct2',cn:'c0',margin:'neg',micro:'macro',ene:'no',gross:'no',strategy:'omit_rt',rt:'yes',systemic:'yes',quality:'unk',site:'outer',imn:'no'};
const plan=patch=>combinedPlan({...base,...patch});
test('1–2 positive SLNs: RT-based omission links chest, SCV, and undissected axilla',()=>{
 for(const n of [1,2]){const r=plan({n});assert.equal(r.status,'combined');for(const k of ['chest','scv','axilla'])assert.equal(r.fields[k].l,'strong');assert.match(r.fields.axilla.desc,/偶発線量だけで代替しません/);assert.equal(r.fields.imn.l,'consider');}
});
for(const [name,patch,reason] of [
 ['unknown clinical T',{ct:'unk'},/cT1/],['T3',{ct:'ct3',t:'t3'},/T3/],['T4',{ct:'ct4',t:'t4'},/T3\/T4/],
 ['cN1',{cn:'c1'},/cN0/],['cN2–3',{cn:'c23'},/cN0/],['cN unknown',{cn:'unk'},/cN/],
 ['neoadjuvant therapy',{neo:'yes',ypn:'ypp'},/術前薬物/],['neoadjuvant ypN0',{neo:'yes',ypn:'yp0'},/術前薬物/],
 ['micrometastasis only',{micro:'micro'},/微小転移/],['unknown deposit size',{micro:'unk'},/転移径不明/],
 ['unknown gross disease',{gross:'unk'},/肉眼的/],['gross disease present',{gross:'yes'},/肉眼的/],
 ['RT undecided',{rt:'unk'},/実施可能性/],['strategy undecided',{strategy:'undecided'},/検討方針/],
 ['systemic plan unknown',{systemic:'unk'},/薬物/],['systemic plan unavailable',{systemic:'no'},/薬物/],
 ['examined count missing',{exam:null},/検索数/],['counts inconsistent',{exam:0},/検索数/],
 ['unknown pathology T',{t:'unk'},/病理病期/],['unknown margin',{margin:'unk'},/断端/]
])test(name+' cannot silently authorize RT-based omission',()=>{const r=plan(patch);assert.equal(r.status,'review');for(const k of ['chest','scv','axilla'])assert.equal(r.fields[k].l,'review');assert(r.checks.some(s=>reason.test(s)));});
test('3 and 4 positive SLNs do not inherit the 1–2-node omission route',()=>{for(const n of [3,4]){const r=plan({n,exam:n});assert.equal(r.status,'outside');assert.match(r.reason,/Rec 4.3/);assert.equal(r.fields.axilla.l,'review');}});
test('no PMRT+RNI prompts ALND review, never dual omission',()=>{const r=plan({rt:'no'});assert.equal(r.status,'alnd-needed');assert.match(r.reason,/両方を省略/);assert.equal(r.fields.axilla.l,'review');});
test('planned ALND is not completed ALND',()=>{const r=plan({strategy:'add_alnd'});assert.equal(r.status,'planned-alnd');assert.equal(r.fields.axilla.l,'review');assert.match(r.reason,/完了したと仮定/);});
test('adequate completed ALND changes axillary volume but does not automatically omit PMRT',()=>{const r=plan({ax:'alnd',strategy:'undecided',quality:'adequate'});assert.equal(r.status,'post-alnd');assert.equal(r.fields.axilla.l,'omit');assert.equal(r.fields.chest.l,'consider');assert.equal(r.fields.scv.l,'consider');assert.match(r.reason,/自動的に不要/);});
for(const [name,patch] of [['unknown adequacy',{quality:'unk'}],['inadequate dissection',{quality:'inadequate'}],['residual disease',{gross:'yes'}],['unknown residual disease',{gross:'unk'}],['unknown cN',{cn:'unk'}],['mismatched omission strategy',{strategy:'omit_rt'}]])test('completed ALND: '+name+' prevents automatic axillary omission',()=>{const r=plan({ax:'alnd',strategy:'undecided',quality:'adequate',...patch});assert.equal(r.status,'review');assert.equal(r.fields.axilla.l,'review');});
test('microscopic ENE is distinguished from gross disease',()=>{const r=plan({ene:'yes',gross:'no'});assert.equal(r.status,'combined');assert(r.checks.some(s=>s.includes('顕微鏡的')));});
test('IMN decision is independent of ALND strategy',()=>{for(const strategy of ['omit_rt','add_alnd','undecided']){for(const site of ['inner','central','outer']){const r=plan({strategy,site});assert.equal(r.fields.imn.l,'consider');assert.notEqual(r.fields.imn.l,'strong');}}});
test('unknown/suspected IMN and unknown site require further evaluation',()=>{for(const patch of [{imn:'unk'},{imn:'yes'},{site:'unk'}])assert.equal(plan(patch).fields.imn.l,'review');assert.match(plan({imn:'yes'}).fields.imn.title,/治療標的/);});
test('BCS, DCIS, node-negative, and unstaged axilla retain existing noncombined flow',()=>{for(const patch of [{s:'bcs'},{hist:'dcis'},{n:0},{ax:'none'}])assert.equal(plan(patch),null);});
test('country comparison and primary references accompany every combined result',()=>{for(const patch of [{},{rt:'no'},{n:3,exam:3},{ct:'unk'},{strategy:'add_alnd'}]){const r=plan(patch);assert.equal(r.comparison.length,3);for(const ref of ['JC1','JF3','JB6','ASLN25','APM25'])assert(r.refs.includes(ref));}});
