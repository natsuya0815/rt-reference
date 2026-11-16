(function(root){
'use strict';
/* Pure calculation functions are exposed for independent regression tests.
   No entered laboratory or patient data are persisted or transmitted. */
function valid(value,min,max){
  return typeof value==='number' && Number.isFinite(value) && value>=min && value<=max;
}
function calcCcr(age,weight,creatinine,sex){
  if(!valid(age,18,120)||!valid(weight,1,500)||!valid(creatinine,0.1,30)||(sex!=='male'&&sex!=='female'))return null;
  return ((140-age)*weight)/(72*creatinine)*(sex==='female'?0.85:1);
}
function calcBsa(height,weight){
  if(!valid(height,50,250)||!valid(weight,1,500))return null;
  return Math.sqrt(height*weight/3600);
}
function calcChild(bilirubin,albumin,coag,mode,ascites,encephalopathy){
  if(!valid(bilirubin,0,100)||!valid(albumin,0.1,10)||
     ![1,2,3].includes(ascites)||![1,2,3].includes(encephalopathy))return null;
  var coagScore;
  if(mode==='pt'){
    if(!valid(coag,0,150))return null;
    coagScore=coag>70?1:coag>=40?2:3;
  }else if(mode==='inr'){
    if(!valid(coag,0.1,20))return null;
    coagScore=coag<1.7?1:coag<=2.3?2:3;
  }else return null;
  var scores={
    bilirubin:bilirubin<2?1:bilirubin<=3?2:3,
    albumin:albumin>3.5?1:albumin>=2.8?2:3,
    coag:coagScore,
    ascites:ascites,
    encephalopathy:encephalopathy
  };
  var total=Object.values(scores).reduce(function(a,b){return a+b;},0);
  return {scores:scores,total:total,className:total<=6?'A':total<=9?'B':'C'};
}
var API={calcCcr:calcCcr,calcBsa:calcBsa,calcChild:calcChild};
root.RT_CALCULATORS=API;
if(typeof module!=='undefined'&&module.exports)module.exports=API;
if(typeof document==='undefined')return;

function el(id){return document.getElementById(id);}
function number(id){
  var raw=el(id).value.trim();
  return raw===''?null:Number(raw);
}
function show(id,html){el(id).innerHTML=html;}
function feedback(id,message){show(id,'<span class="placeholder">'+message+'</span>');}
function calculateCcr(){
  var result=calcCcr(number('ccrAge'),number('ccrWeight'),number('ccrScr'),el('ccrSex').value);
  if(result===null){feedback('ccrResult','性別・年齢・体重・血清Crを入力してください。');return;}
  show('ccrResult','<strong>'+result.toFixed(1)+'</strong><span class="unit"> mL/min</span><div class="result-sub">Cockcroft–Gault 推定CCr（体重は入力値を使用）</div>');
}
function calculateBsa(){
  var result=calcBsa(number('bsaHeight'),number('bsaWeight'));
  if(result===null){feedback('bsaResult','身長と体重を入力してください。');return;}
  show('bsaResult','<strong>'+result.toFixed(2)+'</strong><span class="unit"> m²</span><div class="result-sub">Mosteller式（小数第3位を四捨五入）</div>');
}
function calculateChild(){
  var ascites=el('cpAscites').value,enceph=el('cpEnceph').value;
  var result=calcChild(number('cpBili'),number('cpAlb'),number('cpCoag'),el('cpCoagMode').value,
    ascites===''?null:Number(ascites),enceph===''?null:Number(enceph));
  if(result===null){
    feedback('cpResult','総ビリルビン・アルブミン・凝固能・腹水・肝性脳症の5項目をすべて入力してください。');
    show('cpDetails','');return;
  }
  show('cpResult','<strong>'+result.total+'点　Child–Pugh '+result.className+'</strong><div class="result-sub">Class A：5–6点 ／ B：7–9点 ／ C：10–15点</div>');
  var names=[['bilirubin','総ビリルビン'],['albumin','アルブミン'],['coag','凝固能'],['ascites','腹水'],['encephalopathy','肝性脳症']];
  show('cpDetails','<div class="score-grid">'+names.map(function(entry){
    return '<div><span>'+entry[1]+'</span><b>'+result.scores[entry[0]]+'点</b></div>';
  }).join('')+'</div>');
}
function updateAll(){calculateCcr();calculateBsa();calculateChild();}
function updateCoag(){
  var mode=el('cpCoagMode').value;
  el('cpCoagLabel').textContent=mode==='pt'?'PT活性（%）':'PT-INR';
  el('cpCoagUnit').textContent=mode==='pt'?'%':'INR';
  el('cpCoag').value='';
  el('cpCoag').min=mode==='pt'?'0':'0.1';
  el('cpCoag').max=mode==='pt'?'150':'20';
  el('coagCriteria').textContent=mode==='pt'?
    'PT活性：>70% = 1点、40–70% = 2点、<40% = 3点':
    'PT-INR：<1.7 = 1点、1.7–2.3 = 2点、>2.3 = 3点';
  calculateChild();
}
document.querySelectorAll('[data-tab-target]').forEach(function(btn){
  btn.addEventListener('click',function(){
    var target=btn.getAttribute('data-tab-target');
    document.querySelectorAll('[data-tab-target]').forEach(function(t){
      var selected=t===btn;
      t.setAttribute('aria-selected',String(selected));t.classList.toggle('active',selected);
    });
    document.querySelectorAll('[data-calc-panel]').forEach(function(panel){
      panel.hidden=panel.id!==target;
    });
    if(history.replaceState)history.replaceState(null,'','#'+target);
  });
});
document.querySelectorAll('.calc-input').forEach(function(field){
  field.addEventListener('input',updateAll);
  field.addEventListener('change',updateAll);
});
el('cpCoagMode').addEventListener('change',updateCoag);
document.querySelectorAll('[data-reset]').forEach(function(btn){
  btn.addEventListener('click',function(){
    var panel=el(btn.getAttribute('data-reset'));
    panel.querySelectorAll('input').forEach(function(x){x.value='';});
    panel.querySelectorAll('select').forEach(function(x){x.value=x.id==='cpCoagMode'?'pt':'';});
    if(panel.id==='child')updateCoag();
    updateAll();
  });
});
try{
  var saved=JSON.parse(localStorage.getItem('rt_reference_beta_v01')||'null');
  if(saved&&saved.theme==='dark')document.body.classList.add('dark');
}catch(_){}
var initial=location.hash.substring(1);
if(['ccr','bsa','child'].includes(initial)){
  var tab=document.querySelector('[data-tab-target="'+initial+'"]');
  if(tab)tab.click();
}
updateAll();
})(typeof window!=='undefined'?window:globalThis);
