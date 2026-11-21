const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
const d=JSON.parse(read('data.json')), e=JSON.parse(read('evidence.json'));
const s=read('index.html');
const x=d.cancers.find(x=>x.id==='prostate');
const p001=e.pathways.find(r=>r.id==='p001'),p002=e.pathways.find(r=>r.id==='p002'),p003=e.pathways.find(r=>r.id==='p003');
const box=vm.createContext({seedById:{prostate:x},EVIDENCE:e,en:x=>String(x).replaceAll('<','&lt;')});
const start=s.indexOf('const RT60_WILKINS_IDS='),end=s.indexOf('function viewRegimens(x)',start);
assert.ok(start>0&&end>start);
vm.runInContext(s.slice(start,end),box);
test('local and SIB bind to exact curated regimen and pathway only',()=>{
 const eligible=x.regimens.filter(r=>box.isRt60Regimen(x,r));
 const sib=x.regimens.filter(r=>box.isRtSibRegimen(x,r));
 assert.equal(eligible.length,1); assert.equal(sib.length,1);
 assert.equal(eligible[0].dose,'60 Gy / 20 fr');
 assert.equal(box.isRt60Regimen(x,{...eligible[0]}),false);
 assert.equal(box.isRt60Regimen({...x},eligible[0]),false);
 assert.equal(box.isRt60Regimen(x,sib[0]),false);
 assert.equal(box.isRtSibRegimen(x,eligible[0]),false);
 assert.equal(box.isRt60Pathway(x,p001),true);
 assert.equal(box.isRt60Pathway(x,p002),false);
 assert.equal(box.isRt60Pathway(x,p003),false);
 assert.equal(box.isRtSibPathway(x,p003),true);
 assert.equal(box.isRtSibPathway(x,{...p003}),false);
 assert.equal(box.isRtSibPathway(x,p001),false);
});
test('Wilkins values, both OAR views, and published protocol rows remain distinct',()=>{
 const proposal=e.oar.filter(r=>r.refs.includes('chhip-anorectum20'));
 const legacy=x.oar.filter(r=>r.refs.includes('chhip-anorectum20'));
 const values=['< 85%','< 57%','< 38%','< 22%','< 0.01%'];
 assert.deepEqual(proposal.map(r=>r.limit),values);
 assert.deepEqual(legacy.map(r=>r.goal),values);
 for(const r of [...proposal,...legacy]){
  assert.equal(r.organ,'直腸肛門（anorectum）');
  assert.match(r.definition??r.note,/肛門縁から直腸S状結腸移行部/);
  assert.match(r.definition??r.note,/57 Gy／19回/);
 }
 const protocol=e.oar.filter(r=>r.refs.includes('chhip-constraints20'));
 assert.equal(protocol.length,8);
 assert.equal(protocol.filter(r=>r.organ==='直腸').length,5);
});
test('renderer reports the trial result only for local treatment and institution use only for SIB',()=>{
 const local=box.renderRt60Detail(),sib=box.renderRtSibDetail();
 assert.match(local,/90\.6%/);assert.match(local,/直腸側は0 mm/);
 assert.match(local,/V24\.6 Gy|V32\.4 Gy/); assert.match(local,/V40\.8 Gy/);
 assert.match(local,/mmc1\.pdf#page=2/); assert.match(local,/mmc1\.pdf#page=3/);
 assert.match(local,/&lt; 0\.01%/);
 assert.doesNotMatch(local,/rt-sib|陽性LN増量（候補）/);
 assert.match(sib,/院内で検討し臨床使用中/);assert.match(sib,/44–47 Gy/);assert.match(sib,/51 Gy/);
 assert.doesNotMatch(sib,/90\.6%|0\.01%|Wilkinsの直腸肛門/);
 assert.match(p003.context,/直接検証ではない/);
 const note=d.clinicalNotes.find(x=>x.id==='n007');
 assert.match(note.summary,/臨床使用中/);
 assert.doesNotMatch(JSON.stringify(note),/未承認/);
});

test('institutional 20-fraction pelvic SIB displays the three historical bowel objectives and limits only on its own card',()=>{
 const sib=box.renderRtSibDetail(), local=box.renderRt60Detail();
 assert.match(sib,/<th scope="row">V40 Gy<\/th><td>≤17 cc<\/td><td>≤70 cc<\/td>/);
 assert.match(sib,/<th scope="row">V48 Gy<\/th><td>≤0\.5 cc<\/td><td>≤6 cc<\/td>/);
 assert.match(sib,/<th scope="row">V52 Gy<\/th><td>0 cc<\/td><td>0 cc<\/td>/);
 assert.match(sib,/院内計画基準 · 骨盤SIB 20回/);
 assert.match(sib,/腸管腔（bowel bag）や小腸ループ単独に同値を流用しません/);
 assert.doesNotMatch(local,/院内腸管線量制約|≤17 cc/);
});
