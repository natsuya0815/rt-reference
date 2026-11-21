const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const d=JSON.parse(read('data.json')), e=JSON.parse(read('evidence.json')), n=JSON.parse(read('clinical_notes.json'));
const parse=(p,prefix)=>JSON.parse(read(p).slice(prefix.length).trim().replace(/;$/,''));
test('JS/JSON data synchronization and prior notes',()=>{
 assert.deepEqual(parse('data.js','window.RT_SEED = '),d);
 assert.deepEqual(parse('evidence.js','window.RT_EVIDENCE = '),e);
 assert.deepEqual(d.clinicalNotes,n.clinicalNotes);
 assert.equal(n.count,n.clinicalNotes.length);
 assert.ok(n.clinicalNotes.find(x=>x.id==='n052'));
 assert.ok(n.clinicalNotes.find(x=>x.id==='n053'));
});
test('25fx constraints and labels remain distinct from existing 28fx',()=>{
 const x=e.oar.filter(o=>o.cancer==='rectal'&&o.fx===25);
 assert.ok(x.length>=20);
 assert.ok(e.oar.some(o=>o.cancer==='rectal'&&o.fx===28));
 const small=x.find(o=>o.organ==='小腸ループ（RCR）'&&o.metric==='D0.5cc');
 assert.ok(small&&small.limit.includes('52.5'));
 const bag=x.find(o=>o.organ==='Bowel cavity（eviQ方式）'&&o.metric==='V45 Gy');
 assert.ok(bag&&bag.limit.includes('195 cc'));
 assert.ok(bag.definition.includes('PTV頭側＋1 cm'));
 assert.ok(x.some(o=>o.organ==='Bowel cavity（RCR方式）'&&o.definition.includes('＋2 cm')));
});
test('article, sources and patient data key',()=>{
 const a=n.clinicalNotes.find(x=>x.id==='n053');
 assert.ok(a&&JSON.stringify(a).includes('GTVp_Boost'));
 assert.ok(JSON.stringify(a).includes('小腸'));
 const sources=new Set(d.sources.map(s=>s.id));
 for(const r of a.refs)assert.ok(sources.has(r));
 assert.ok(read('index.html').includes("const KEY='rt_reference_beta_v01'"));
 const sw=read('sw.js');
 assert.match(sw,/const CACHE_NAME='rt-reference-beta-v0\d+-[^']+'/);
 assert.match(sw,/\.\/evidence\.js/);
 assert.match(sw,/cache\.addAll\(ASSETS\)/);
});
