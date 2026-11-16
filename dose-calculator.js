(function(root){
'use strict';
// Standard, uncorrected linear-quadratic model for equal dose fractions.
// No time, repopulation, repair, volume effect, or reirradiation correction.
var KEYS=['d','n','total','bedLate','eqd2Late','bedAcute','eqd2Acute'];
var TITLES={
  d:'1回線量',n:'分割回数',total:'総線量',
  bedLate:'BED（遅発性）',eqd2Late:'EQD2（遅発性）',
  bedAcute:'BED（急性）',eqd2Acute:'EQD2（急性）'
};
function positive(x){return typeof x==='number'&&Number.isFinite(x)&&x>0;}
function bed(d,n,alphaBeta){return n*d*(1+d/alphaBeta);}
function eqd2(d,n,alphaBeta){return bed(d,n,alphaBeta)/(1+2/alphaBeta);}
function parsePositive(text){
  var value=String(text==null?'':text).trim();
  if(!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(value))return null;
  var num=Number(value);
  return positive(num)?num:null;
}
function isIntegerLike(n){return Math.abs(n-Math.round(n))<=1e-9*Math.max(1,Math.abs(n));}
function measure(key,value,late,acute){
  if(key==='d'||key==='n'||key==='total')return {kind:key,value:value};
  var isLate=key==='bedLate'||key==='eqd2Late';
  var ab=isLate?late:acute;
  return {kind:'bio',ab:ab,value:(key==='eqd2Late'||key==='eqd2Acute')?value*(1+2/ab):value,key:key};
}
function failure(message){return {ok:false,message:message};}
function calculate(pair,late,acute){
  if(!positive(late)||!positive(acute))return failure('α/β値を2つとも0より大きい数値で入力してください。');
  if(!pair||typeof pair!=='object')return failure('計算条件を2項目指定してください。');
  var entries=Object.entries(pair);
  if(entries.length!==2||entries.some(function(entry){return !KEYS.includes(entry[0])||!positive(entry[1]);}))
    return failure('計算条件には異なる2項目の正の数値が必要です。');
  var items=entries.map(function(entry){return measure(entry[0],entry[1],late,acute);});
  var d,n,total;
  var direct=function(kind){return items.find(function(item){return item.kind===kind;});};
  var xD=direct('d'),xN=direct('n'),xTotal=direct('total');
  var b=items.filter(function(item){return item.kind==='bio';});
  if(xD&&xN){d=xD.value;n=xN.value;total=n*d;}
  else if(xD&&xTotal){d=xD.value;total=xTotal.value;n=total/d;}
  else if(xN&&xTotal){n=xN.value;total=xTotal.value;d=total/n;}
  else if(b.length===1){
    var bio=b[0];
    if(xD){
      d=xD.value;
      total=bio.value/(1+d/bio.ab);
      n=total/d;
    }else if(xN){
      n=xN.value;
      var perFraction=bio.value/n;
      d=2*perFraction/(1+Math.sqrt(1+4*perFraction/bio.ab));
      total=n*d;
    }else if(xTotal){
      total=xTotal.value;
      d=bio.ab*(bio.value/total-1);
      n=total/d;
    }else return failure('この組み合わせからは計算できません。');
  }else if(b.length===2){
    var inv1=1/b[0].ab,inv2=1/b[1].ab;
    if(Math.abs(inv1-inv2)<=1e-10*Math.max(inv1,inv2)){
      return failure('同じα/βに基づくBEDとEQD2は独立した2条件になりません。別の項目を1つ入力してください。');
    }
    var nTimesDSquared=(b[0].value-b[1].value)/(inv1-inv2);
    total=b[0].value-nTimesDSquared*inv1;
    d=nTimesDSquared/total;
    n=total/d;
  }else return failure('この組み合わせからは計算できません。');
  if(!positive(d)||!positive(n)||!positive(total)){
    return failure('入力した2条件に対応する、正の1回線量・分割回数は存在しません。');
  }
  var out={
    ok:true,d:d,n:n,total:total,
    bedLate:bed(d,n,late),eqd2Late:eqd2(d,n,late),
    bedAcute:bed(d,n,acute),eqd2Acute:eqd2(d,n,acute),
    fractionalN:!isIntegerLike(n),
    fractionLessThanOne:n<1
  };
  if(KEYS.some(function(k){return !positive(out[k]);}))return failure('計算結果が有効範囲外です。単位や入力値を確認してください。');
  return out;
}
var API={calculate:calculate,bed:bed,eqd2:eqd2,parsePositive:parsePositive,isIntegerLike:isIntegerLike,keys:KEYS};
root.RT_DOSE_MATH=API;
if(typeof module!=='undefined'&&module.exports)module.exports=API;
if(typeof document==='undefined')return;

var states={
  A:{anchors:[],raw:{},solution:null},
  B:{anchors:[],raw:{},solution:null}
};
function byId(id){return document.getElementById(id);}
function fmt(value,key){
  if(!positive(value))return '';
  if(key==='n'&&isIntegerLike(value))return String(Math.round(value));
  if(value<0.001||value>=1000000)return value.toPrecision(6);
  return String(Number(value.toFixed(key==='n'?4:3)));
}
function label(k){return TITLES[k]||k;}
function alphabeta(){
  return {
    late:parsePositive(byId('abLate').value),
    acute:parsePositive(byId('abAcute').value)
  };
}
function summary(state){
  if(state.anchors.length===0)return '編集した2項目を計算条件にします。';
  return '入力条件：'+state.anchors.map(label).join(' ＋ ')+(state.anchors.length<2?'（あと1項目入力）':'');
}
function drawCard(id){
  var state=states[id],ab=alphabeta(),solution=null;
  if(state.anchors.length===2){
    var pair={};
    state.anchors.forEach(function(key){pair[key]=parsePositive(state.raw[key]);});
    solution=calculate(pair,ab.late,ab.acute);
  }
  state.solution=solution&&solution.ok?solution:null;
  var panel=byId('plan'+id);
  panel.querySelectorAll('[data-field]').forEach(function(input){
    var key=input.dataset.field,driver=state.anchors.includes(key);
    var text=driver?(state.raw[key]||''):(state.solution?fmt(state.solution[key],key):'');
    if(input.value!==text)input.value=text;
    input.classList.toggle('is-driver',driver);
    input.setAttribute('aria-label',label(key)+(driver?'・入力条件':'・入力または計算値'));
    var marker=panel.querySelector('[data-marker="'+key+'"]');
    if(marker){marker.textContent=driver?'入力':state.solution?'計算':'入力可';marker.classList.toggle('active',driver);}
  });
  byId('drivers'+id).textContent=summary(state);
  var notice=byId('planNotice'+id);
  notice.textContent='';
  notice.className='plan-notice';
  if(state.anchors.length===2&&solution&&!solution.ok){
    notice.textContent=solution.message;
    notice.classList.add('warning');
  }else if(state.solution){
    if(state.solution.fractionalN){
      notice.textContent='逆算した回数は '+fmt(state.solution.n,'n')+' 回です。整数回ではないため、そのまま臨床処方に使用できません。回数・1回線量を調整してください。';
      notice.classList.add('warning');
    }else if(state.solution.fractionLessThanOne){
      notice.textContent='分割回数が1回未満です。実施可能な処方条件か確認してください。';
      notice.classList.add('warning');
    }
  }
}
function compare(){
  var a=states.A.solution,b=states.B.solution;
  var table=byId('comparisonBody'),status=byId('comparisonStatus');
  if(!a||!b){
    table.innerHTML='';
    status.textContent='AとBそれぞれに2項目ずつ入力すると、差分を表示します。';
    return;
  }
  status.textContent='差分はB − Aです。生物学的優劣や臨床的安全性を示すものではありません。';
  table.innerHTML=['d','n','total','bedLate','eqd2Late','bedAcute','eqd2Acute'].map(function(key){
    var delta=b[key]-a[key],deltaText=(delta>1e-10?'+':'')+fmt(Math.abs(delta)<1e-10?0:delta,key);
    return '<tr><th scope="row">'+label(key)+'</th><td>'+fmt(a[key],key)+'</td><td>'+fmt(b[key],key)+'</td><td>'+deltaText+'</td></tr>';
  }).join('');
}
function redraw(){drawCard('A');drawCard('B');compare();}
function handlePlanInput(id,key,raw){
  var state=states[id],anchors=state.anchors.filter(function(k){return k!==key;});
  if(raw.trim()!==''){
    anchors=anchors.slice(-1);
    anchors.push(key);
    state.raw[key]=raw;
  }else{
    delete state.raw[key];
  }
  state.anchors=anchors;
  redraw();
}
function setPlan(id,values){
  var state=states[id];
  state.raw=Object.assign({},values);
  state.anchors=Object.keys(values).slice(0,2);
  redraw();
}
document.querySelectorAll('[data-plan][data-field]').forEach(function(input){
  var id=input.dataset.plan,key=input.dataset.field;
  input.addEventListener('focus',function(){
    if(!states[id].anchors.includes(key)){
      try{input.select();}catch(_){}
    }
  });
  input.addEventListener('input',function(){handlePlanInput(id,key,input.value);});
});
byId('abLate').addEventListener('input',redraw);
byId('abAcute').addEventListener('input',redraw);
document.querySelectorAll('[data-reset-plan]').forEach(function(button){
  button.addEventListener('click',function(){setPlan(button.dataset.resetPlan,{});});
});
document.querySelectorAll('[data-example-plan]').forEach(function(button){
  button.addEventListener('click',function(){setPlan(button.dataset.examplePlan,{d:'4',n:'5'});});
});
byId('copyAtoB').addEventListener('click',function(){
  var s=states.A,copy={};
  s.anchors.forEach(function(key){copy[key]=s.raw[key];});
  setPlan('B',copy);
});
try{
  var old=JSON.parse(localStorage.getItem('rt_reference_beta_v01')||'null');
  if(old&&old.theme==='dark')document.body.classList.add('dark');
}catch(_){}
redraw();
})(typeof window!=='undefined'?window:globalThis);
