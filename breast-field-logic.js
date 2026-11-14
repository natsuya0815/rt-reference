/* Experimental decision support. Source mapping: BREAST_LOGIC_REVIEW.md.
 * No storage, network requests, or patient identifiers. */
(function(root){
'use strict';
const REFERENCES={
 J22:['日本乳癌学会2022 放射線療法','2022','日本','https://jbcs.xsrv.jp/guideline/2022/h_index/'],
 J5:['日本2022 放射線CQ5（全摘・ALND後1–3個）','2022','日本','https://jbcs.xsrv.jp/guideline/2022/h_index/cq5/'],
 J6:['日本2022 放射線CQ6（IMN）','2022','日本','https://jbcs.xsrv.jp/guideline/2022/h_index/cq6/'],
 JPATH:['日本2022 病理BQ6（ITC・微小・マクロ転移）','2022','日本','https://jbcs.xsrv.jp/guideline/2022/b_index/bq6/'],
 Z11:['ACOSOG Z0011：10年成績・Methods','2017','米国RCT','https://pmc.ncbi.nlm.nih.gov/articles/PMC5672806/'],
 AMAROS:['AMAROS：Methods（2008改訂を含む）','2014','欧州RCT','https://pmc.ncbi.nlm.nih.gov/articles/PMC4291166/'],
 S24:['SENOMAC：NEJM主要報告','2024','欧州RCT','https://www.nejm.org/doi/full/10.1056/NEJMoa2313487'],
 SPROT:['SENOMAC protocol v8.2 §5','2023','欧州試験計画','https://cdn.clinicaltrials.gov/large-docs/72/NCT02240472/Prot_000.pdf'],
 I23:['IBCSG 23-01：Methods','2013','国際RCT','https://pmc.ncbi.nlm.nih.gov/articles/PMC3935346/'],
 B51:['NSABP B-51/RTOG 1304：Methods','2025','米国RCT','https://pmc.ncbi.nlm.nih.gov/articles/PMC12269788/'],
 BPROT:['B-51 protocol 2016 §5.2','2016','米国試験計画','https://med.uc.edu/docs/default-source/cancercenter/all-protocols/breast/nsabp_b51_randomized-phase-iii-clinical-trial-evaluating-post-mastectomy-chestwall.pdf'],
 AGO24:['AGO 2024：Adjuvant Radiotherapy','2024','欧州・ドイツ','https://pmc.ncbi.nlm.nih.gov/articles/PMC11182637/'],
 JC1:['日本乳癌学会2022 外科CQ1','2022','日本','https://jbcs.xsrv.jp/guideline/2022/g_index/cq1/'],
 JF3:['日本乳癌学会2022 放射線FRQ3','2022','日本','https://jbcs.xsrv.jp/guideline/2022/h_index/frq3/'],
 JB6:['日本乳癌学会2022 放射線BQ6','2022','日本','https://jbcs.xsrv.jp/guideline/2022/h_index/bq6/'],
 ASLN25:['ASCO 2025 SLNB：Table 1, Recommendations 4.1–4.3','2025','米国','https://ascopubs.org/doi/10.1200/JCO-25-00099'],
 APM25:['ASTRO/ASCO/SSO 2025 PMRT：KQ3, Recommendation 1と解説','2025','米国','https://ascopubs.org/doi/10.1200/JCO-25-01747'],
 APOCKET:['ASTRO 2025 PMRT公式掲載ポケットカード（治療体積）','2025','米国','https://www.astro.org/ASTRO/media/ASTRO/Patient%20Care%20and%20Research/PDFs/PMRT_Pocketcard.pdf']
};
const GUIDELINES=[
 {name:'日本2022 外科CQ1',population:'初回手術・SLN陽性。微小／マクロ、BCS／全摘、照射あり／なしを区別。',recommendation:'マクロ転移の郭清省略は照射・薬物療法等の条件付き。全摘無照射では郭清を勧める。',certainty:'BCSマクロ：弱い推奨・確実性中。全摘＋照射：弱い推奨・確実性弱。微小転移：省略を強く推奨・確実性中。',refs:['JC1']},
 {name:'日本2022 放射線FRQ3・BQ6/CQ6',population:'SLN陽性・郭清省略と、ALND後のPMRTを区別。',recommendation:'FRQ3だけで専用腋窩照射を全例必須としない。PMRT選択時は胸壁＋鎖骨上を基本に未郭清部を評価。IMNは別途個別適応。',certainty:'FRQは未解決課題。BQは標準の解説。CQ6は高リスク例への弱い推奨・確実性弱。',refs:['JF3','JB6','J6']},
 {name:'ASCO 2025 SLNB',population:'初回手術、cN0、浸潤癌≤5 cm、全摘・SLN陽性1–2個。BCSは別のRec 3.1。',recommendation:'全摘ではPMRT＋RNIを伴う郭清省略の選択肢。BCS＋全乳房照射では少数SLN陽性のALND省略を支持。',certainty:'Rec 3.1/4.1/4.2：推奨強・質高。3個はRec 4.3の版間表記を原典確認。',refs:['ASLN25']},
 {name:'ASTRO/ASCO/SSO 2025 PMRT',population:'全摘後（初回手術／術前治療後）。BCSの照射省略規則ではない。',recommendation:'適応があるPMRTでは胸壁＋領域。SLN陽性・ALND省略のPMRT経路では未郭清腋窩をカバー。IMNは個別化。',certainty:'体積：推奨強・質高。cT1–3N1→ypN0等：条件付き推奨。対象箇所のみ照合。',refs:['APM25','APOCKET']},
 {name:'欧州補足：AGO 2024（ドイツ）',population:'初回手術・SLNマクロ転移／ALND省略、またはALND後。欧州全体の統一見解ではない。',recommendation:'Level I–IIをCTVに含めることを支持する記載があり、Z0011の「専用照射必須ではない」と区別して施設方針を検討。',certainty:'Z0011条件内：LoE 2b/B/AGO+。郭清後の通常のI–II重複照射は避ける。',refs:['AGO24']}
];
const unknown=v=>v===undefined||v===null||v===''||v==='unk'||v==='notdone';
const groupT=v=>typeof v==='string'?v.replace(/(t[1-4])[a-d]$/,'$1'):v;
const yes=v=>unknown(v)?null:v==='yes';
const oneOf=(v,values)=>unknown(v)?null:values.includes(v);
const num=(v,predicate)=>v===null||v===undefined||v===''?null:predicate(Number(v));
const knownNo=v=>unknown(v)?null:v==='no';
const histLabels={negative:'陰性',itc:'ITCのみ：N0(i+)',micro:'微小転移のみ：N1mi',macro:'マクロ転移あり（N分類は病理報告で確認）',notdone:'未評価',unk:'不明'};
function slnCounts(p){return p.ax==='slnb'?{n:p.n,exam:p.exam}:{n:p.slnN,exam:p.slnExam};}
function validate(p){
 const e=[];
 if(p.n!==null&&p.n!==undefined&&(!Number.isInteger(p.n)||p.n<0))e.push('陽性数は0以上の整数で入力。未評価を0としないでください。');
 if(p.exam!==null&&p.exam!==undefined&&(!Number.isInteger(p.exam)||p.exam<0||p.n>p.exam))e.push('陽性数と検索数が矛盾しています。');
 if(['negative','itc'].includes(p.micro)&&p.n>0)e.push('陰性／ITCのみでは転移陽性数は0です。ITCを転移陽性節に数えません。');
 if(['micro','macro'].includes(p.micro)&&p.n===0)e.push('微小／マクロ転移と陽性0個が矛盾しています。');
 if(p.macroNodes!=null&&(p.macroNodes>p.n||(p.micro==='macro'&&p.macroNodes<1)))e.push('マクロ転移SLN個数を再確認してください。');
 if(p.deposit!=null&&p.micro==='macro'&&p.deposit<=2)e.push('マクロ転移の最大径は2 mm超です。病理報告を確認。');
 if(p.deposit!=null&&p.micro==='micro'&&p.deposit>2)e.push('微小転移のみと2 mm超が矛盾しています。');
 if(p.deposit!=null&&p.micro==='itc'&&p.deposit>0.2)e.push('ITCのみと0.2 mm超が矛盾しています。細胞数を含め原典確認が必要です。');
 if(p.cn==='c0'&&(p.cnBiopsy==='pos'||p.cnExam==='pos'))e.push('術前cN0と術前針生検陽性／触知所見が整合しません。cNを自動変更せず評価時点・報告を確認。');
 if(p.neo==='no'&&!['na','unk',undefined].includes(p.ypn))e.push('術前治療なしの場合、ypNは該当なしを選択。pNと区別してください。');
 if(p.neo==='yes'&&p.ypn==='yp0'&&(!['negative','unk','notdone'].includes(p.micro)||p.n>0))e.push('ypN0と術後病理所見が矛盾しています。');
 if(p.neo==='yes'&&p.ypn==='yp0i'&&p.micro!=='itc')e.push('ypN0(i+)と病理ITCのみの入力を確認。');
 if(p.neo==='yes'&&p.ypn==='ypmi'&&p.micro!=='micro')e.push('ypN1miと病理微小転移のみの入力を確認。');
 if(p.neo==='yes'&&p.ypn==='ypp'&&p.micro!=='macro')e.push('ypNマクロ陽性と病理所見を確認。');
 if(p.rt==='yes'&&p.rtPossible==='no')e.push('PMRT＋RNI実施可能と照射困難が矛盾しています。');
 if(p.ax==='alnd'&&p.strategy==='omit_rt')e.push('ALND実施済みとALND省略方針を区別してください。');
 if(p.s==='bcs'&&p.strategy==='omit_rt'||p.s==='mas'&&p.strategy==='bcs_omit')e.push('術式と検討方針が一致しません。全摘と部分切除を分けて選択。');
 if(p.ax==='slnb'&&!['unk','notdone',undefined].includes(p.quality))e.push('SLNBのみの場合、実施済みALNDは未施行を選択。');
 if(p.hist==='dcis'&&(p.n>0||!['tis','unk','notdone'].includes(p.t)))e.push('純粋DCISと浸潤病期／節転移が矛盾しています。');
 if(p.hist==='inv'&&p.t==='tis'&&p.neo!=='yes')e.push('浸潤癌とpTisが矛盾しています。');
 return e;
}
function assessTrials(p){
 const counts=slnCounts(p),ct=groupT(p.ct),pt=groupT(p.t);
 const items=[];
 function trial(id,name,refs,note,fn){
  const conditions=[];const c=(state,text)=>conditions.push({state:state===undefined?null:state,text});
  c(oneOf(p.hist,['inv']),'浸潤癌');c(yes(p.m0),'M0を確認');
  fn(c);
  const excluded=conditions.filter(x=>x.state===false).map(x=>x.text),missing=conditions.filter(x=>x.state===null).map(x=>x.text);
  items.push({id,name,status:excluded.length?'適用対象外':missing.length?'情報不足':'主要条件に合致',conditions,excluded,missing,note,refs});
 }
 const timed=(v,allowed)=>v==='notdone'?false:oneOf(v,allowed);
 const upfront=c=>{c(knownNo(p.neo),'術前薬物療法なし');c(timed(p.slnTiming,['upfront']),'初回手術時のSLNB');};
 const noPalp=c=>c(oneOf(p.cnExam,['neg']),'治療前診察で腋窩転移を触知しない');
 const cN0=c=>c(oneOf(p.cn,['c0']),'術前cN0（SLNB陽性からcN1に変更しない）');
 const positive=c=>{c(num(counts.n,n=>n>=1),'SLN転移陽性を確認');c(oneOf(p.micro,['macro','micro']),'マクロ／微小転移（ITCのみと区別）');};
 trial('Z0011','ACOSOG Z0011',['Z11','JF3'],'BCS＋全乳房照射の試験。郭清省略を専用Level I–II照射必須と読み替えません。',c=>{
  upfront(c);cN0(c);noPalp(c);c(oneOf(ct,['ct1','ct2']),'cT1–2');c(oneOf(p.s,['bcs']),'乳房部分切除');positive(c);c(num(counts.n,n=>n<=2),'SLN陽性1–2個');c(yes(p.wbi),'全乳房照射を予定');c(yes(p.systemic),'適切な術後薬物療法');c(knownNo(p.gross),'癒合節・肉眼的節外進展／残存なし');c(oneOf(p.pathMethod,['he']),'HEで転移確認（IHCのみ・OSNAへの外挿は原典確認）');c(num(p.age,n=>n>=18),'18歳以上');
 });
 trial('AMAROS','AMAROS',['AMAROS'],'2008改訂後≤5 cmを評価。腋窩照射とALNDの比較であり、両者を省略した試験ではありません。',c=>{
  upfront(c);cN0(c);noPalp(c);c(oneOf(ct,['ct1','ct2']),'cT1–2（≤5 cm）');c(oneOf(p.s,['bcs','mas']),'部分切除または全摘');positive(c);c(knownNo(p.priorAx),'当該治療前の同側腋窩手術・照射歴なし');if(p.s==='bcs')c(yes(p.wbi),'BCS後の全乳房照射');
 });
 trial('SENOMAC','SENOMAC',['S24','SPROT'],'プロトコルv8.2：非触知の画像・生検陽性1–2個も許容。大多数が領域照射を受けたため、無照射での郭清省略へは直結しません。',c=>{
  c(oneOf(ct,['ct1','ct2','ct3']),'cT1–3');noPalp(c);c(yes(p.axUS),'治療前腋窩超音波を実施');c(oneOf(p.s,['bcs','mas']),'部分切除または全摘');c(oneOf(p.neo==='yes'&&p.slnTiming==='preNeo'?p.preSlnMicro:p.micro,['macro']),'SLNB時点にマクロ転移あり（術前治療後所見と区別）');c(num(p.neo==='yes'&&p.slnTiming==='preNeo'?p.preSlnMacroNodes:p.macroNodes,n=>n>=1&&n<=2),'マクロ転移SLNが1–2個（追加微小転移・ITCと区別）');c(num(p.age,n=>n>=18),'18歳以上');c(yes(p.systemic),'薬物療法可能');c(yes(p.rtPossible),'照射可能');
  if(p.imn==='yes')c(null,'腋窩外の領域転移の有無を原典確認（IMN疑い／確認所見）');
  if(p.cn==='c23')c(false,'cN2–3は本簡易照合の対象外・原典確認が必要');
  else if(unknown(p.cn))c(null,'術前cNと評価根拠');
  if(p.cn==='c1'||p.cnImaging==='susp'){c(p.cn==='c1'?oneOf(p.cnBiopsy,['pos']):oneOf(p.cnBiopsy,['pos','neg']),'疑わしい節を針生検で評価（cN1は転移証明）');c(num(p.cnNodes,n=>n<=2),'画像・細胞診で確認された転移が2個以下');}
  if(p.neo==='no')c(timed(p.slnTiming,['upfront']),'初回手術時SLNB');
  else if(p.neo==='yes'){
   c(timed(p.slnTiming,['preNeo']),'SLNBを術前治療開始前に実施');
   c(yes(p.senoTiming),'SENOMACの登録時期・治療中非進行条件を原典で確認');
  }else c(null,'術前治療の有無');
 });
 trial('IBCSG23','IBCSG 23-01',['I23','JC1'],'ITCも当時の微小転移定義に含まれました。全摘例は少数であり、合致しても全摘後RT省略を証明しません。',c=>{
  upfront(c);cN0(c);noPalp(c);c(oneOf(pt,['t1','t2']),'病理腫瘍最大径≤5 cm');c(oneOf(p.s,['bcs','mas']),'部分切除または全摘');c(oneOf(p.micro,['micro','itc']),'SLNに≤2 mmの微小転移またはITCのみ・マクロ転移なし');if(p.micro!=='itc')c(num(counts.n,n=>n>=1),'微小転移SLNあり');c(knownNo(p.ene),'節外進展なし');
 });
 trial('B51','NSABP B-51/RTOG 1304',['B51','BPROT'],'全摘では胸壁＋RNI対無照射、BCSでは全乳房＋RNI対全乳房。追跡約5年の結果であり、合致だけで省略を確定しません。ITC単独の利益は未確定です。',c=>{
  c(yes(p.neo),'術前薬物療法あり');c(oneOf(p.neoType,['chemo']),'術前化学療法（内分泌療法のみではない）');c(yes(p.chemoStandard),'アンスラサイクリン／タキサン系を含む8週以上の標準術前化学療法');c(oneOf(ct,['ct1','ct2','ct3']),'治療前cT1–3');c(oneOf(p.cn,['c1']),'治療前cN1（cN0/cN2–3は対象外）');c(p.cnBiopsy==='notdone'?false:oneOf(p.cnBiopsy,['pos']),'治療前のFNA／針生検で腋窩転移を証明');c(num(p.n,n=>n===0),'術後転移陽性数0（ITC除く）');c(oneOf(p.micro,['negative','itc']),'術後病理は陰性／ITCのみを確認');c(oneOf(p.ypn,['yp0','yp0i']),'術前治療後ypN0またはypN0(i+)（微小／マクロ転移残存は除外）');c(oneOf(p.s,['bcs','mas']),'部分切除または全摘');c(oneOf(p.margin,['neg']),'切除断端陰性');c(num(p.age,n=>n>=18),'18歳以上');
  if(p.ax==='slnb'){c(timed(p.slnTiming,['postNeo']),'術前治療後SLNB');c(num(p.exam,n=>n>=2),'術前治療後にSLNを2個以上検索');}
  else c(p.ax==='alnd'?oneOf(p.quality,['adequate']):unknown(p.ax)?null:false,'術前治療後のALNDまたは規定SLNBで病理評価');
  if(p.her2==='pos')c(p.antiHer2==='contra'?null:yes(p.antiHer2),'HER2陽性：術前抗HER2療法あり（禁忌例は原典の例外条件を確認）');else c(p.her2==='neg'?true:null,'HER2状態と必要な術前抗HER2療法');
 });
 return items;
}
const getTrial=(trials,id)=>trials.find(x=>x.id===id);
const matches=(trials,id)=>getTrial(trials,id)?.status==='主要条件に合致';
function imnAssessment(p){
 const refs=['J6','APM25','APOCKET'];
 if(p.imn==='yes')return {l:'review',title:'IMN転移疑い／確認：治療標的を個別確定',desc:'予防照射と区別して診断の確度・範囲を確認。',refs};
 if(p.imn!=='no'||unknown(p.site))return {l:'review',title:'IMN所見・腫瘍部位を確認',desc:'未評価・不明を陰性として省略しません。原典確認が必要。',refs};
 if(p.micro==='negative'||p.micro==='itc')return {l:'consider',title:'IMNを追加する根拠を別途確認',desc:'陰性／ITCのみを通常の節陽性と同一視しません。内側病変だけでも一律必須とはしません。',refs};
 return {l:'consider',title:p.n>=4||['inner','central'].includes(p.site)?'高リスク要因あり：IMN追加を検討':'IMNは独立した個別適応',desc:'部位・径・節転移範囲と心肺線量、DIBH、既照射歴を比較。ALND省略やRNIだけを理由に一律追加／省略しません。',refs};
}
function combinedPlan(p,trials=assessTrials(p)){
 if(p.hist!=='inv'||!(p.n>0||p.neo==='yes'||p.micro==='itc'))return null;
 const checks=[],refs=['JC1','JF3','ASLN25'];
 let status='review',title='腋窩手術と照射の方針を比較',reason='郭清省略の可否と、専用腋窩照射の要否は別の問いです。';
 if(p.cn==='c1'||p.cn==='c23'){
  checks.push('術前cN陽性の診察・画像・針生検結果を確認。術後pNからの逆算は行いません。');
  if(p.cnBiopsy!=='pos')checks.push('術前cN1以上ですが針生検による転移証明が未確認／陰性／未施行です。臨床的疑いと病理確認を区別。');
 }
 if(p.neo==='yes'){
  title='術前治療後：治療前病期とypNで評価';refs.push('B51','APM25');
  reason=matches(trials,'B51')?'B-51主要条件に合致。PMRT／RNIの省略を含め個別検討。米国PMRT 2025の条件付き推奨と時点差・追跡期間を確認。':'B-51を一律適用しません。不一致・不足条件と初期cT/cN、術後病理を確認。';
  checks.push(...getTrial(trials,'B51').missing,...getTrial(trials,'B51').excluded);
 }else if(p.ax==='alnd'){
  status='post-alnd';title='ALND実施後の照射を再評価';reason='十分な郭清部は通常重複照射を避けます。ALND実施だけでPMRT不要とはしません。';
  if(p.quality!=='adequate'||p.gross!=='no')checks.push('郭清の十分性・Level・肉眼的残存を確認。');
 }else if(p.strategy==='add_alnd'){
  status='planned-alnd';title='追加ALND後に照射を再評価';reason='予定を実施済みと扱いません。最終病理・郭清範囲で再判定。';
 }else if(p.s==='mas'){
  const needed=[['初回手術',p.neo==='no'],['cT1–2・pT1–2',['ct1','ct2'].includes(groupT(p.ct))&&['t1','t2'].includes(groupT(p.t))],['術前cN0と診察評価',p.cn==='c0'&&p.cnExam==='neg'],['SLNマクロ転移1–2個',p.ax==='slnb'&&p.micro==='macro'&&p.n>=1&&p.n<=2],['検索数',p.exam!=null&&p.exam>=p.n],['M0',p.m0==='yes'],['肉眼的残存なし',p.gross==='no'],['薬物療法計画',p.systemic==='yes'],['断端評価',!unknown(p.margin)]];
  checks.push(...needed.filter(x=>!x[1]).map(x=>x[0]+'を確認'));refs.push('APM25','JB6');
  if(needed.every(x=>x[1])&&p.rt==='yes'&&p.strategy==='omit_rt'){status='combined';title='全摘：ALND省略＋PMRT・RNIの選択肢';reason='このPMRT経路を選ぶ場合に胸壁＋領域（未郭清腋窩を含む）を一体計画。郭清省略一般を専用照射必須とはしません。';}
  else if(p.micro==='macro'&&p.rt==='no'&&p.neo==='no'){status='alnd-needed';title='PMRT＋RNIなし：追加ALNDを含め検討';}
  else if(p.n>=3&&p.micro==='macro'){status='outside';title='少数SLN陽性1–2個の経路の対象外';checks.push('ASCO Rec 4.3の陽性3個の版間表記は原典確認が必要。');}
  else checks.push('PMRT＋RNIの実施可能性・合意と検討方針を確認。未定を実施予定と扱いません。');
 }else if(p.s==='bcs'){
  refs.push('Z11','AGO24');
  if(matches(trials,'Z0011')){status='bcs-z0011';title='BCS：Z0011条件でALND省略を検討可能';reason='全乳房照射を前提に、専用Level I–II照射は自動的に必須としません。欧州AGOのより積極的な腋窩CTV方針との違いも個別検討。';}
  else if(matches(trials,'IBCSG23')){status='bcs-micro';title='BCS：微小転移／ITCの郭清省略を検討';reason='専用腋窩照射を自動追加しません。薬物療法と全乳房照射の適応を別確認。';}
  else{checks.push(...getTrial(trials,'Z0011').missing,...getTrial(trials,'Z0011').excluded);if(p.cn!=='c0')checks.push('術前cN1へZ0011を無条件に外挿しません。追加ALNDまたは領域照射の適応を多職種検討。');}
 }
 const options=p.s==='mas'?[
  {title:'ALND省略＋PMRT・RNIを選ぶ場合',text:'胸壁／再建乳房＋鎖骨上・下／Level III＋未郭清Level I–II。IMNは別途個別判断。胸壁単独照射を同じ方針としません。'},
  {title:'追加ALNDを行う場合',text:'追加手術後の転移数・郭清範囲でPMRT適応を再評価。十分な郭清I–IIは通常重複しない。残存病変・不十分郭清は個別化。'}
 ]:[
  {title:'BCS＋全乳房照射・郭清省略を選ぶ場合',text:'Z0011／IBCSG条件を照合。専用I–II照射は一律必須ではない。AMAROS型の腋窩照射を選ぶならI–III＋鎖骨上を明示して計画。'},
  {title:'追加ALNDを行う場合',text:'全乳房照射を基本に、最終病理からRNIを再評価。郭清済みI–IIと未郭清領域を区別する。'}
 ];
 checks.push('試験の主要条件一致は正式な登録適格性・最適処方の確定ではありません。既往、性別、PS、その他除外項目・照射QA・本人の意向は原典確認が必要。');
 return {status,title,reason,checks:[...new Set(checks)],refs,options};
}
function assessFields(p,trials,plan){
 const f=(l,title,desc,refs)=>({l,title,desc,refs});
 const pending=()=>f('review','情報不足：原典確認が必要','病期・病理・治療経過を確認して判定。',['J22']);
 const fields={wbi:p.s==='bcs'?f('strong','全乳房照射を基本に検討','省略・部分照射の条件は別途確認。',['J22','Z11']):f('omit','全摘後の全乳房照射は該当なし','胸壁／再建乳房の項目で評価。',['JB6']),chest:p.s==='bcs'?f('omit','部分切除：胸壁PMRTは該当なし','全乳房照射と区別。',['JB6']):pending(),scv:pending(),axilla:pending(),imn:imnAssessment(p),boost:pending()};
 const nodalKnown=['negative','itc','micro','macro'].includes(p.micro)&&p.n!=null&&['slnb','alnd'].includes(p.ax);
 const high=p.micro==='macro'&&p.n>=4||groupT(p.t)==='t4'||p.neo==='yes'&&(p.cn==='c23'||groupT(p.ct)==='ct4'||['ypp','ypmi'].includes(p.ypn));
 if(p.hist==='dcis'){
  if(p.s==='mas')fields.chest=p.margin==='neg'?f('omit','純粋DCIS・全摘・断端陰性なら通常対象外','DCISの適応条件は原典確認が必要。',['J22']):pending();
  fields.scv=f('omit','純粋DCISでは通常RNI対象外','浸潤癌の併存を確認。',['J22']);
  fields.axilla=f('omit','純粋DCISでは通常専用照射対象外','手術・病理評価は別途確認。',['J22']);
 }else if(p.neo==='yes'){
  if(high){if(p.s==='mas')fields.chest=f('strong','術前治療後高リスク：PMRTを検討','初期病期・残存ypNを確認。',['APOCKET']);fields.scv=f('strong','領域照射を検討','B-51のypN0省略経路へ外挿しません。',['APOCKET']);}
  else if(matches(trials,'B51')){
   if(p.s==='mas')fields.chest=f('consider','胸壁＋RNI省略も含め個別検討','B-51の全摘比較は胸壁＋RNI対無照射。米国2025条件付き推奨・長期不確実性を併記。',['B51','APOCKET']);
   fields.scv=f('consider','B-51条件：RNI省略も検討','BCSでは全乳房照射は継続する比較。',['B51']);
  }
 }else if(high){
  if(p.s==='mas')fields.chest=f('strong','高リスク節転移／T4：胸壁PMRTを検討','初回手術・最終病理を確認。',['JB6','APOCKET']);
  fields.scv=f('strong','鎖骨上・Level IIIを含むRNIを検討','郭清範囲・IMN適応・心肺線量を別確認。',['JB6','APOCKET']);
 }else if(p.neo==='no'&&nodalKnown&&['negative','itc'].includes(p.micro)&&p.n===0){
  if(p.s==='mas')fields.chest=['t1','t2'].includes(groupT(p.t))&&p.margin==='neg'&&p.lowRisk==='yes'?f('omit','低リスクpT1–2N0全摘後は通常PMRT対象外','ITCはマクロ転移陽性と数えません。病理pN0・低リスク評価の信頼性と既照射歴を確認。',['APOCKET']):f('consider','N0でも局所リスクを個別評価','T3、断端、LVI等を確認。陰性のみで省略確定しません。',['APOCKET']);
  fields.scv=f('consider','節陰性／ITC：RNIは自動追加しない','部位・生物学的リスクを確認。',['J22']);
 }else if(p.neo==='no'&&p.micro==='macro'&&p.n>0){
  if(p.s==='mas')fields.chest=f('consider','節陽性全摘：PMRTと腋窩方針を併せて検討','SLNBのみの転移個数を総腋窩負荷と同一視しません。',['JF3','ASLN25','APOCKET']);
  fields.scv=f('consider','少数節陽性：RNIを個別検討','郭清省略だけを専用照射必須の理由にしません。',['JF3']);
 }
 if(p.ax==='alnd')fields.axilla=p.quality==='adequate'&&p.gross==='no'?f('omit','十分に郭清済みI–IIは通常重複しない','残存病変・広範な節外進展なら個別確認。',['JB6','AGO24']):pending();
 else if(plan?.status==='bcs-z0011'||plan?.status==='bcs-micro')fields.axilla=f('consider','郭清省略≠専用I–II照射必須','Z0011／IBCSGでは専用腋窩照射を一律追加する根拠ではありません。AGO 2024との方針差も確認。',['Z11','I23','JF3','AGO24']);
 else if(p.ax==='slnb'&&nodalKnown&&p.micro==='negative'&&p.neo==='no')fields.axilla=f('omit','適切なSLNB陰性なら通常専用照射なし','術前治療後・病理未評価は同じ扱いにしません。',['J22']);
 else if(matches(trials,'B51'))fields.axilla=f('consider','B-51条件：腋窩RNI省略も検討','郭清省略一般の専用照射規則ではなく術前治療後試験の結果。',['B51']);
 if(plan?.status==='combined'){
  fields.chest=f('strong','このPMRT経路では胸壁／再建乳房を含む','ALND省略＋PMRT・RNIを一体評価。',['JB6','APM25']);
  fields.scv=f('strong','この経路では鎖骨上・下／Level IIIを含む','未郭清I–IIと一体計画。',['APM25']);
  fields.axilla=f('strong','このPMRT経路では未郭清I–IIを含む','接線野偶発線量を代替としません。郭清省略一般への一律必須表示ではありません。',['APM25']);
 }
 if(p.s==='bcs')fields.boost=p.margin==='pos'?f('review','断端陽性：再切除を先に検討','ブーストだけで代替しません。原典確認が必要。',['J22']):p.age==null||unknown(p.margin)?pending():f('consider',p.age<=50?'若年等：腫瘍床ブーストを検討':'腫瘍床ブーストの利益を個別検討','断端・grade・整容性を確認。年齢だけで処方確定せず原典確認が必要。',['J22','AGO24']);
 else fields.boost=['pos','close'].includes(p.margin)||groupT(p.t)==='t4'?f('consider','胸壁高リスク部位のブーストを検討','PMRTを実施する場合。断端位置・残存・再建と原典を確認。',['APOCKET']):p.margin==='neg'?f('omit','断端陰性低リスク部位への一律ブーストは行わない','局所高リスクがなければ通常不要。原典確認が必要。',['APOCKET']):pending();
 if(unknown(p.micro)||p.ax==='none')for(const k of ['chest','scv','axilla'])if(!(k==='chest'&&p.s==='bcs'))fields[k]=pending();
 if(p.m0!=='yes')for(const k of ['wbi','chest','scv','axilla'])if(fields[k].l==='strong')fields[k]=f('review','非転移性治療の前提を確認','M0の評価が未確定／対象外です。原典確認が必要。',fields[k].refs);
 return fields;
}
function assess(p){
 const errors=validate(p);if(errors.length)return {errors};
 const trials=assessTrials(p),plan=combinedPlan(p,trials),fields=assessFields(p,trials,plan);
 const warnings=['試験版：主要条件一致は正式登録適格性・診療方針の確定ではありません。原典確認が必要です。'];
 if(p.cn==='c0'&&p.n>0)warnings.push('術前cN0と術後SLN陽性は両立します。cNを自動的にcN1へ変更しません。');
 if(p.cn==='c1'||p.cn==='c23')if(p.cnBiopsy!=='pos')warnings.push('術前cN陽性の針生検による転移確認が未確定です。');
 if(p.micro==='itc')warnings.push('ITCのみはN0(i+)。摘出数には含むが転移陽性数には含めません。');
 if(p.micro==='notdone'||p.micro==='unk'||p.n==null)warnings.push('術後病理の未評価・不明をpN0／ypN0と扱いません。');
 if(p.neo==='yes'&&p.ypn==='yp0i')warnings.push('B-51のITC単独例の独立した利益・長期結果は原典確認が必要。省略を自動確定しません。');
 if(p.ene==='yes')warnings.push('顕微鏡的節外進展と肉眼的進展を区別し、残存・範囲を確認。');
 const prefix=p.neo==='yes'?'ypN':'pN';
 const cnLabel={c0:'cN0',c1:'cN1',c23:'cN2–3',notdone:'cNX（未評価）',unk:'不明'};
 const evalLabel={neg:'陰性／所見なし',pos:'陽性／転移確認',susp:'疑わしい所見',unk:'不明',notdone:'未評価・未施行'};
 const ypLabel={yp0:'ypN0',yp0i:'ypN0(i+)',ypmi:'ypN1mi',ypp:'ypNマクロ転移陽性',na:'該当なし',unk:'不明',notdone:'未評価'};
 const ctLabel=unknown(p.ct)?(p.ct==='notdone'?'未評価':'不明'):p.ct.replace('ct','cT');
 const ptLabel=unknown(p.t)?(p.t==='notdone'?'未評価':'不明'):p.t.replace('t',p.neo==='yes'?'ypT':'pT');
 return {errors:[],trials,plan,fields,warnings,guidelines:GUIDELINES,staging:`治療前：${ctLabel} / ${cnLabel[p.cn]||'不明'}（診察:${evalLabel[p.cnExam]||'不明'}、画像:${evalLabel[p.cnImaging]||'不明'}、針生検:${evalLabel[p.cnBiopsy]||'不明'}）\n術後：${ptLabel}、${prefix}所見：${histLabels[p.micro]||'不明'}、転移陽性=${p.n??'未評価'}／検索=${p.exam??'不明'}。${p.neo==='yes'?'ypN入力：'+(ypLabel[p.ypn]||'不明'):''}`};
}
// Presentation helpers leave the strict assessment and five trial checks unchanged.
function followUpQuestions(p){
 if(!['mas','bcs'].includes(p.s))return [];
 const groups=[];
 const group=(title,reason,ids)=>groups.push({title,reason,ids});
 group('病理・治療の前提','未確認の病理やM0を陰性として扱わず、候補の前提を確認します。',['hist','m0']);
 if(p.neo==='yes'){
  group('術前治療後の重要情報','初期病期とypNで照射方針が変わります。ypN0だけでB-51に合致とはしません。',['ct','ypn',...(['c1','c23'].includes(p.cn)?['cnBiopsy']:[])]);
 }else if(['c1','c23'].includes(p.cn)||p.cnBiopsy==='pos'||p.cnExam==='pos'){
  group('術前cNの根拠','術後SLNBとは別の時点の診察・画像・針生検を確認します。',['cnExam','cnImaging','cnBiopsy']);
 }
 const nodePositive=p.n>0||['micro','macro','itc'].includes(p.micro);
 if(p.ax==='slnb'&&nodePositive&&p.neo==='no'){
  group('郭清省略を検討する条件','基本情報だけで郭清省略や専用腋窩照射を確定しません。',['ct','cnExam','examined','gross']);
  group('手術と照射の方針','追加ALNDと照射による管理を比較します。未定のままでも候補は確認できます。',['strategy',p.s==='mas'?'rt':'wbi','systemic']);
 }
 if(p.ax==='alnd')group('郭清範囲と残存病変','Level I–IIの重複照射を避けられるか判断するために必要です。',['quality','gross']);
 if(p.neo==='no'&&p.s==='mas'&&p.n===0&&['negative','itc'].includes(p.micro))group('低リスクの確認','節陰性だけでPMRT省略を確定せず、総合的な低リスク評価を確認します。',['lowRisk']);
 if(nodePositive)group('内胸照射の個別適応','ALND省略やRNIを選んだだけで内胸照射を自動追加しません。',['imn']);
 const correction=[];
 if(p.neo==='no'&&!['na','unk',undefined].includes(p.ypn))correction.push('ypn');
 if(p.ax!=='alnd'&&!['unk','notdone',undefined].includes(p.quality))correction.push('quality');
 if(p.rt==='yes'&&p.rtPossible==='no')correction.push('rt','rtPossible');
 if(p.s==='bcs'&&p.strategy==='omit_rt'||p.s==='mas'&&p.strategy==='bcs_omit')correction.push('strategy');
 if(correction.length)groups.unshift({title:'入力の整合性を確認',reason:'以前の詳細入力を保持しています。現在の基本情報との矛盾を修正してください。',ids:correction});
 const seen=new Set();
 return groups.map(g=>({...g,ids:g.ids.filter(id=>!seen.has(id)&&seen.add(id))})).filter(g=>g.ids.length);
}
function assessForDisplay(p){
 const result=assess(p),questions=followUpQuestions(p);
 if(result.errors.length)return {...result,questions};
 const displayFields=Object.fromEntries(Object.entries(result.fields).map(([k,x])=>[k,{...x}]));
 const provisional=(key,title,desc,refs)=>{displayFields[key]={l:'consider',title,desc,refs,provisional:true};};
 const m0Unknown=unknown(p.m0),histUnknown=unknown(p.hist);
 if(p.s==='bcs'&&m0Unknown)provisional('wbi','全乳房照射が暫定候補','病理・M0・局所条件を確認して適応を確定します。未確認を陰性と仮定した判定ではありません。',['J22']);
 if(p.s==='mas'&&p.neo==='no'&&p.micro==='macro'&&p.n>0&&m0Unknown&&result.fields.chest.l==='review'){
  provisional('chest','胸壁＋領域照射が暫定候補','転移負荷等からの候補です。M0・病理・腋窩治療方針を確認するまで実施を確定しません。',['JB6','APOCKET']);
  provisional('scv','鎖骨上・Level IIIを含むRNIが暫定候補','M0・郭清範囲・残存病変と照射の利益を確認します。',['JB6','APOCKET']);
 }
 if(p.s==='mas'&&p.neo==='no'&&p.ax==='slnb'&&p.micro==='macro'&&p.n>0&&result.fields.axilla.l==='review')displayFields.axilla={l:'review',title:'追加ALND／照射による腋窩管理を比較',desc:'専用I–II照射の要否は基本情報だけでは確定しません。PMRT＋RNIの経路を選ぶ場合の範囲と区別します。',refs:['JF3','ASLN25'],provisional:true};
 if(p.s==='bcs'&&p.neo==='no'&&p.ax==='slnb'&&p.n>0&&result.fields.axilla.l==='review')displayFields.axilla={l:'review',title:'専用腋窩照射は条件確認後に判断',desc:'全乳房照射・郭清省略の条件と追加ALNDを比較。郭清省略を専用I–II照射必須と同一視しません。',refs:['Z11','JF3'],provisional:true};
 if(p.neo==='yes'&&unknown(p.ypn))for(const key of ['chest','scv','axilla'])if(result.fields[key].l==='review')displayFields[key]={...result.fields[key],title:'ypN・治療前病期を確認するまで保留',desc:'術前治療後の主要情報が不足しています。追加質問のcT・ypN等を確認してください。'};
 if(histUnknown)for(const [key,x] of Object.entries(displayFields))if(x.l==='strong')provisional(key,'暫定候補：'+x.title,'病理診断が未確認です。浸潤癌／DCISを確認し、元の適用条件に照合してください。',x.refs);
 if(p.m0==='no')for(const [key,x] of Object.entries(displayFields))if(x.l!=='omit')displayFields[key]={...x,l:'review',title:'M1：本候補の適用範囲を確認',desc:'非転移性乳癌を対象とした候補をそのまま適用せず、治療目的を個別確認してください。',provisional:false};
 const important=[];
 const need=(condition,id,text)=>{if(condition)important.push({id,text});};
 need(histUnknown,'hist','浸潤癌／純粋DCISの病理診断');
 need(p.m0==='no','m0','M1：治療目的と本ツールの適用範囲を個別確認');
 need(m0Unknown,'m0','M0の評価（未評価・不明を陰性としない）');
 need(unknown(p.neo),'neo','術前薬物療法の有無');
 need(unknown(p.cn),'cn','術前の臨床的cN（術後SLNBとは別）');
 need(p.s==='bcs'&&p.age==null,'age','ブースト検討に関わる年齢');
 need(unknown(p.t),'tstage','術後T分類');
 need(unknown(p.micro)||p.n==null,'micro','転移分類と陽性数（未評価を0としない）');
 need(unknown(p.margin),'margin','断端所見');
 need(p.neo==='yes'&&unknown(p.ct),'ct','治療前cT分類');
 need(p.neo==='yes'&&unknown(p.ypn),'ypn','術前治療後ypN');
 need(['c1','c23'].includes(p.cn)&&p.cnBiopsy!=='pos','cnBiopsy','術前cN陽性の針生検による転移確認');
 need(p.ax==='alnd'&&(p.quality!=='adequate'||p.gross!=='no'),'quality','実施済みALNDの範囲・十分性と肉眼的残存');
 need(p.ax==='slnb'&&p.n>0&&p.neo==='no'&&(p.cnExam!=='neg'||unknown(p.ct)||p.exam==null||p.gross!=='no'),'cnExam','郭清省略に関わる治療前cT・診察所見、検索数、肉眼的残存');
 need(p.ax==='slnb'&&p.n>0&&p.neo==='no'&&(p.strategy==='undecided'||p.s==='mas'&&p.rt!=='yes'||p.s==='bcs'&&p.wbi!=='yes'),'strategy','追加ALND／照射による管理方針と照射予定');
 need(p.s==='mas'&&p.neo==='no'&&p.n===0&&p.micro==='negative'&&p.lowRisk!=='yes','lowRisk','PMRT省略を検討するための総合的な低リスク評価');
 need(p.n>0&&(p.imn!=='no'||unknown(p.site)),'imn','内胸リンパ節の所見と個別適応');
 return {...result,displayFields,questions,important};
}

const api={assessForDisplay,followUpQuestions,assess,assessTrials,validate,combinedPlan,imnAssessment,GUIDELINES,REFERENCES};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BreastFieldLogic=api;
})(typeof window==='undefined'?globalThis:window);
