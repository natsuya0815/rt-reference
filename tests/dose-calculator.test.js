// Run: node tests/dose-calculator.test.js
'use strict';
const assert=require('node:assert/strict');
const dose=require('../dose-calculator.js');
function close(a,b,label){
  const scale=Math.max(1,Math.abs(b));
  assert.ok(Number.isFinite(a)&&Math.abs(a-b)<1e-7*scale,(label||'')+': '+a+' != '+b);
}
const result=dose.calculate({d:4,n:5},3,10);
assert.equal(result.ok,true);
close(result.total,20,'D');
close(result.bedLate,46.6666666666667,'BED3');
close(result.eqd2Late,28,'EQD2_3');
close(result.bedAcute,28,'BED10');
close(result.eqd2Acute,23.33333333333,'EQD2_10');

let numPairs=0;
for(let i=0;i<dose.keys.length;i++)for(let j=i+1;j<dose.keys.length;j++){
  const a=dose.keys[i],b=dose.keys[j];
  const pair={[a]:result[a],[b]:result[b]};
  const reconstructed=dose.calculate(pair,3,10);
  const duplicate=(a.endsWith('Late')&&b.endsWith('Late'))||(a.endsWith('Acute')&&b.endsWith('Acute'));
  if(duplicate){
    assert.equal(reconstructed.ok,false,a+' + '+b+' should be underdetermined');
    continue;
  }
  assert.equal(reconstructed.ok,true,a+' + '+b+' should solve');
  close(reconstructed.d,4,a+' + '+b+' d');
  close(reconstructed.n,5,a+' + '+b+' n');
  numPairs++;
}
assert.equal(numPairs,19);
const cf=dose.calculate({d:4,total:21},3,10);
assert.equal(cf.ok,true);
close(cf.n,5.25);
assert.equal(cf.fractionalN,true);
assert.equal(dose.calculate({d:0,n:5},3,10).ok,false);
assert.equal(dose.calculate({d:4,n:-3},3,10).ok,false);
assert.equal(dose.calculate({d:4,n:5},0,10).ok,false);
assert.equal(dose.calculate({bedLate:28,bedAcute:28},3,3).ok,false);
assert.equal(dose.calculate({bedLate:20,total:20},3,10).ok,false);
assert.equal(dose.parsePositive('1.'),1);
assert.equal(dose.parsePositive('2.75'),2.75);
assert.equal(dose.parsePositive('not a number'),null);
const custom=dose.calculate({n:20,bedLate:52},2.5,8.7);
assert.equal(custom.ok,true);
close(dose.bed(custom.d,custom.n,2.5),52);
console.log('Dose calculator tests passed ('+numPairs+' solvable field-pairs, 2 underdetermined field-pairs)');
