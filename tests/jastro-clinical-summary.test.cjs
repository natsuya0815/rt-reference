const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
const html=read('index.html');
const x=JSON.parse(read('data.json')).cancers;
const seedById=Object.fromEntries(x.map(c=>[c.id,c]));
const el=()=>({addEventListener(){},classList:{add(){},remove(){},toggle(){}},innerHTML:'',value:''});
const els=new Map();
const box=vm.createContext({
 document:{body:el(),getElementById(id){if(!els.has(id))els.set(id,el());return els.get(id)},addEventListener(){}},
 localStorage:{getItem(){return null},setItem(){throw Error('Rendering must not write user data')}},
 window:{addEventListener(){}},location:{hash:'',protocol:'file:'},navigator:{},URL,console,structuredClone
});
vm.runInContext(read('data.js'),box);vm.runInContext(read('evidence.js'),box);
vm.runInContext(html.match(/<script>\s*([\s\S]*?)<\/script>/)[1],box);
const ref={label:'JASTRO 2024 p.100',url:'https://www.jastro.or.jp/medicalpersonnel/guideline/radiotherapy_treatment_planning/2024/#page=100'};
const run=s=>vm.runInContext(s,box);
const source=(id,p)=>{box.window.RT_JASTRO={[id]:p};};
test('JASTRO sourced settings render after the tabs for each of the 16 existing disease IDs',()=>{
 assert.equal(x.length,16);
 box.window.RT_JASTRO=Object.fromEntries(x.map(c=>[c.id,[{setting:'setting '+c.id,indication:'exact indication',dose:'exact dose',gtv:'exact GTV',ctv:'exact CTV',ptv:'exact PTV',oar:'exact OAR',notes:'do not extrapolate',sources:[ref]}]]));
 for(const c of x){
  run(`current=${JSON.stringify(c.id)};tab='pathways';renderContent();`);
  const out=els.get('content').innerHTML;
  assert.match(out,/<\/nav><details class="jastro-clinical"><summary>診療要点｜JASTRO 2024/);
  assert.match(out,new RegExp('setting '+c.id));
  assert.equal((out.match(/<article class="jastro-plan">/g)||[]).length,1);
  assert.match(out,/<dt>線量・分割<\/dt><dd>exact dose/);
  assert.match(out,/<dt>OAR<\/dt><dd>exact OAR/);
  assert.match(out,/#page=100/);
 }
});
test('missing and malformed settings are omitted with no unsafe link, injection, or cross-disease fallback',()=>{
 assert.equal(run('renderRtJastro({...seedById.prostate})'),'');
 delete box.window.RT_JASTRO;
 assert.equal(run('renderRtJastro(seedById.prostate)'),'');
 source('prostate',[
  {setting:'Incomplete',sources:[ref]},
  {setting:'No link',dose:'fallback forbidden',sources:[]},
  {setting:'Wrong host',dose:'fallback forbidden',sources:[{label:'Other',url:'https://www.jastro.or.jp.example.com/'}]},
  {setting:'Bad link',dose:'fallback forbidden',sources:[{label:'Other',url:'javascript:alert(1)'}]},
  {setting:'Bad link',dose:'fallback forbidden',sources:[{label:'Other',url:'https://user:pass@www.jastro.or.jp/'}]},
  {setting:'<b>safe</b>',dose:'<img onerror=alert(1)>',sources:[{...ref,label:'<svg>'}]}
 ]);
 const out=run('renderRtJastro(seedById.prostate)');
 assert.equal(run('renderRtJastro(seedById.breast)'),'');
 assert.match(out,/&lt;b&gt;safe/);assert.match(out,/&lt;img/);assert.match(out,/&lt;svg&gt;/);
 assert.doesNotMatch(out,/Wrong host|Incomplete|No link|Bad link|fallback forbidden|<svg|<img|<h3><b>/);
});
test('guideline is a versioned local script included in the PWA asset list',()=>{
 assert.match(html,/<script src="rt-jastro-content\.js\?v=1"><\/script>/);
 assert.match(read('sw.js'),/'\.\/rt-jastro-content\.js\?v=1'/);
});

test('all actual JASTRO cards have complete distinct target fields and exact official page sources',()=>{
 vm.runInContext(read('rt-jastro-content.js'),box);
 const content=box.window.RT_JASTRO;
 assert.deepEqual(Object.keys(content).sort(),Object.keys(seedById).sort());
 assert.equal(Object.values(content).flat().length>=34,true);
 for(const c of x){
  for(const rec of content[c.id]){
   for(const f of ['setting','indication','dose','gtv','ctv','ptv','oar','notes'])
    assert.ok(typeof rec[f]==='string'&&rec[f].trim(),c.id+'/'+f);
   assert.ok(rec.sources.length>0);
   for(const ref of rec.sources)assert.match(ref.url,/^https:\/\/www\.jastro\.or\.jp\/medicalpersonnel\/guideline\/radiotherapy_treatment_planning\/2024\/pageindices\/index\d+\.html$/);
  }
  run(`current=${JSON.stringify(c.id)};tab='pathways';renderContent();`);
  const out=els.get('content').innerHTML;
  assert.equal((out.match(/<article class="jastro-plan">/g)||[]).length,content[c.id].length,c.id);
  assert.match(out,/<dt>GTV<\/dt>.*<dt>CTV<\/dt>.*<dt>PTV<\/dt>/);
  if(content[c.id].some(r=>r.supplementSources.length))assert.match(out,/別資料による補足/);
 }
});
