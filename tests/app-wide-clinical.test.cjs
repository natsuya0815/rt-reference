const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
const html=read('index.html');
const data=JSON.parse(read('data.json')), evidence=JSON.parse(read('evidence.json'));
const seedById=Object.fromEntries(data.cancers.map(x=>[x.id,x]));
const nsclc=seedById.nsclc;
const es=html.indexOf('function escapeH(');
const escap=html.slice(es,html.indexOf('\n',es));
const mockSection={title:'具体的処方',text:'その処方にのみ対応',refs:[{label:'原典',url:'https://example.com/trial'}]};
const box=vm.createContext({seedById,EVIDENCE:evidence,window:{},URL});
vm.runInContext(escap+'\nconst en=v=>escapeH(v);\n'+html.slice(html.indexOf('function rtClinicalSite('),html.indexOf('function viewRegimens(')),box);

test('strict regimen and pathway bindings fail closed for clones, changed title/dose, cross-disease or duplicates',()=>{
 const r=nsclc.regimens[0],p=evidence.pathways.find(item=>item.cancer==='nsclc');
 const hit={match:{label:r.label,dose:r.dose,pathwayId:p.id,pathwayDose:p.dose,pathwayTitle:p.title},sections:[mockSection]};
 const site={regimens:[hit]};
 const check=(kind,row,x=nsclc)=>box.rtClinicalMatch(x,row,kind,site);
 assert.equal(check('regimen',r),hit);
 assert.equal(check('pathway',p),hit);
 assert.equal(check('regimen',{...r}),null);
 assert.equal(check('pathway',p,seedById.prostate),null);
 hit.match.dose+=' ';
 assert.equal(check('regimen',r),null);
 hit.match.dose=r.dose;
 hit.match.label+=' ';
 assert.equal(check('regimen',r),null);
 hit.match.label=r.label;
 hit.match.pathwayDose+=' ';
 assert.equal(check('pathway',p),null);
 hit.match.pathwayDose=p.dose;
 hit.match.pathwayTitle+=' ';
 assert.equal(check('pathway',p),null);
 site.regimens.push(hit);
 assert.equal(check('regimen',r),null);
 site.regimens.pop();
 hit.sections=[{title:'no evidence',refs:[{label:'invalid',url:'http://example.com'}]}];
 assert.equal(check('regimen',r),null);
});

test('all seeded regimens expose an explicit fallback and site context cannot become regimen evidence',()=>{
 const r=nsclc.regimens[0];
 box.window.RT_CLINICAL={nsclc:{context:{summary:'疾患レベルの内容',sections:[mockSection]}}};
 for(const x of data.cancers)for(const item of x.regimens)
  assert.match(box.renderRtClinical(x,item,'regimen'),/この個別処方の追加詳細は未確認・未収載/);
 const result=box.renderRtClinical(nsclc,r,'regimen');
 assert.match(result,/疾患全体の参考情報（個別処方の根拠・制約ではありません）/);
 assert.match(result,/疾患レベルの内容/);
 assert.doesNotMatch(box.renderRtClinical(seedById.prostate,seedById.prostate.regimens[0],'regimen'),/疾患レベルの内容/);
 assert.match(box.renderRtClinical(nsclc),/疾患全体の臨床情報/);
 assert.equal(box.renderRtClinical(seedById.prostate),'');
});

test('rendered labels, text, and citations are escaped, and links accept only HTTPS without credentials',()=>{
 const body=box.rtClinicalBody({summary:'<img src=x onerror=alert(1)>',sections:[{
  title:'<script>oops</script>',text:'\x22',
  items:['<iframe>'],
  refs:[{label:'<svg>',url:'https://example.com/trial?item=1&foo=2'},
   {label:'badScheme',url:'javascript:alert(1)'},{label:'badCred',url:'https://name:pass@example.com'},
   {label:'badRelative',url:'//example.com/path'},{label:'badPlain',url:'http://example.com'}]
 }]});
 assert.match(body,/&lt;img/);
 assert.match(body,/&lt;script&gt;/);
 assert.match(body,/&lt;iframe&gt;/);
 assert.match(body,/&lt;svg&gt;/);
 assert.match(body,/item=1&amp;foo=2/);
 assert.match(body,/noopener noreferrer/);
 assert.doesNotMatch(body,/<img|<iframe|<script|badScheme|badCred|badRelative|badPlain/);
});

test('all four pages use an accessible primary type size; supplemental JS is precached',()=>{
 for(const f of ['index.html','breast-field-planner.html','clinical-calculators.html','dose-calculator.html']){
  const source=read(f);
  assert.match(source,/body\{font-size:1\.125rem;line-height:1\./);
  assert.match(source,/min-height:44px/);
 }
 assert.match(html,/<script src="rt-clinical-content.js"><\/script>/);
 assert.match(read('sw.js'),/'\.\/rt-clinical-content\.js'/);
});

test('full app renders every disease pathway and regimen, keeps data key, and distinguishes new sourced rows',()=>{
 const el=()=>({addEventListener(){},classList:{add(){},remove(){},toggle(){}},innerHTML:'',value:''});
 const els=new Map();
 const reads=[];
 const runtime=vm.createContext({
  document:{body:el(),getElementById(id){if(!els.has(id))els.set(id,el());return els.get(id)},addEventListener(){}},
  localStorage:{getItem(key){reads.push(key);return null},setItem(){throw Error('Rendering must not write user data')}},
  window:{addEventListener(){},RT_CLINICAL:Object.fromEntries(data.cancers.map(x=>[x.id,{context:{summary:'site '+x.id}}]))},
  location:{hash:'',protocol:'file:'},navigator:{},URL,console,structuredClone
 });
 vm.runInContext(read('data.js'),runtime);vm.runInContext(read('evidence.js'),runtime);
 const main=html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
 vm.runInContext(main,runtime);
 assert.deepEqual(reads,['rt_reference_beta_v01']);
 for(const x of data.cancers){
  const render=(tab)=>vm.runInContext(`current=${JSON.stringify(x.id)};tab=${JSON.stringify(tab)};renderContent();`,runtime);
  const count=(pattern)=>[...els.get('content').innerHTML.matchAll(pattern)].length;
  render('pathways');
  assert.equal(count(/<details class="(?:rt-clinical|rt60(?: rt-sib)?)"><summary>(?!疾患全体)/g),evidence.pathways.filter(r=>r.cancer===x.id).length,x.id);
  render('regimens');
  assert.equal(count(/<details class="(?:rt-clinical|rt60(?: rt-sib)?)"><summary>(?!疾患全体)/g),x.regimens.length,x.id);
  if(x.id!=='prostate')assert.match(els.get('content').innerHTML,new RegExp('site '+x.id));
  render('overview');
  assert.match(els.get('content').innerHTML,new RegExp('site '+x.id));
 }
 const sourced=vm.runInContext(`viewRegimens({id:'unit',regimens:[{label:'検証例',dose:'1 Gy / 1 fr',detail:'詳細',kind:'標準・文献',refs:['chhip16']}]})`,runtime);
 assert.match(sourced,/文献出典あり/);
 assert.doesNotMatch(sourced,/施設検討・未承認|class="regimen local"/);
});

test('actual clinical content covers every site and each exact regimen binds only to its registered disease and dose',()=>{
 const actual=vm.createContext({window:{}});
 vm.runInContext(read('rt-clinical-content.js'),actual);
 const entries=actual.window.RT_CLINICAL;
 assert.deepEqual(Object.keys(entries).sort(),Object.keys(seedById).sort());
 let exact=0;
 for(const x of data.cancers){
  const detail=entries[x.id], cards=detail.regimens;
  assert.ok(detail.context.summary,x.id);
  for(const row of x.regimens){
   if(x.id==='prostate'&&(row.dose==='60 Gy / 20 fr'||row.label==='骨盤SIB・院内臨床運用'))continue;
   const card=box.rtClinicalMatch(x,row,'regimen',detail);
   assert.ok(card,x.id+' '+row.label+' '+row.dose); exact++;
  }
  for(const card of cards)
   assert.equal(x.regimens.filter(r=>r.label===card.match.label&&r.dose===card.match.dose).length,1,x.id);
 }
 assert.equal(exact,27);
 assert.deepEqual(Array.from(entries.brainmets.regimens,r=>r.match.dose),['30 Gy / 5 fr']);
 assert.deepEqual(Array.from(entries.lymphoma.regimens,r=>r.match.dose),['30 Gy / 15 fr']);
});
