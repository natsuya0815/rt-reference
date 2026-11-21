const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
const d=JSON.parse(read('data.json')), e=JSON.parse(read('evidence.json')), html=read('index.html');
const prostate=d.cancers.find(row=>row.id==='prostate');
const anorectum='直腸肛門（anorectum）';
const normalize=(readFilter=>vm.runInNewContext('('+readFilter+')'))(html.match(/function normalize\([^\n]+/)[0]);
const context=vm.createContext({
 prostate, seedById:{prostate}, EVIDENCE:e, store:{knowledgeEntries:[]}, RT60_WILKINS_IDS:['o009','o010','o011','o012','o013'],
 oarRegime:'60 Gy / 20 fr', oarOrgan:'all',
 globalOarCancer:'prostate', globalOarFx:'20', globalOarIntent:'根治', globalOarOrgan:'all', globalOarQuery:'',
 escapeH:String, en:String, refsHtml:()=>'', button:()=>'', cancers:()=>d.cancers, recordMeta:()=>'', normalize
});
function getFunction(name,next){
 const start=html.indexOf('function '+name+'('),end=html.indexOf('function '+next+'(',start);
 assert.ok(start>=0&&end>start);
 return html.slice(start,end);
}
vm.runInContext(getFunction('viewOAR','viewSimple')+getFunction('renderOARGlobal','viewKnowledge'),context);
function tableRows(out){
 const tbody=out.match(/<tbody>([\s\S]*?)<\/tbody>/)[1];
 return [...tbody.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(match=>match[1]);
}
function organNames(rows,idx){
 return rows.map(row=>[...row.matchAll(/<td>([\s\S]*?)<\/td>/g)][idx][1].replace(/<[^>]+>/g,''));
}
function checkOrganFilters(render, organIndex, field){
 context[field]='直腸';
 let rows=tableRows(render());
 assert.deepEqual(organNames(rows,organIndex),Array(5).fill('直腸'));
 assert.ok(rows.some(row=>row.includes('V60 Gy')&&row.includes('< 3%')));
 assert.ok(!rows.some(row=>row.includes('< 0.01%')));
 context[field]=anorectum;
 rows=tableRows(render());
 assert.deepEqual(organNames(rows,organIndex),Array(5).fill(anorectum));
 assert.ok(rows.some(row=>row.includes('V60 Gy')&&row.includes('< 0.01%')));
 assert.ok(!rows.some(row=>row.includes('< 3%')));
 context[field]='all';
 const organs=organNames(tableRows(render()),organIndex);
 assert.ok(organs.includes('直腸')&&organs.includes(anorectum)&&organs.includes('直腸壁'));
}
test('disease OAR dropdown separates CHHiP rectum and Wilkins anorectum',()=>{
 checkOrganFilters(()=>context.viewOAR(prostate),0,'oarOrgan');
});
test('global OAR dropdown is exact; free-text remains broad',()=>{
 const render=()=>context.renderOARGlobal();
 checkOrganFilters(render,1,'globalOarOrgan');
 context.globalOarQuery='直腸';
 const found=organNames(tableRows(render()),1);
 assert.ok(found.includes('直腸')&&found.includes(anorectum)&&found.includes('直腸壁'));
 context.globalOarOrgan='直腸';
 assert.deepEqual(organNames(tableRows(render()),1),Array(5).fill('直腸'));
});
