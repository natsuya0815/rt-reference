/* Experimental decision support. Source mapping: BREAST_LOGIC_REVIEW.md.
 * No storage, network requests, or patient identifiers. */
(function(root){
'use strict';
const REFERENCES={
 JC1:['日本乳癌学会2022 外科CQ1','2022','日本','https://jbcs.xsrv.jp/guideline/2022/g_index/cq1/'],
 JF3:['日本乳癌学会2022 放射線FRQ3','2022','日本','https://jbcs.xsrv.jp/guideline/2022/h_index/frq3/'],
 JB6:['日本乳癌学会2022 放射線BQ6','2022','日本','https://jbcs.xsrv.jp/guideline/2022/h_index/bq6/'],
 ASLN25:['ASCO 2025 SLNB：Table 1, Recommendations 4.1–4.3','2025','米国','https://ascopubs.org/doi/10.1200/JCO-25-00099'],
 APM25:['ASTRO/ASCO/SSO 2025 PMRT：KQ3, Recommendation 1と解説','2025','米国','https://ascopubs.org/doi/10.1200/JCO-25-01747'],
 APOCKET:['ASTRO 2025 PMRT公式掲載ポケットカード（治療体積）','2025','米国','https://www.astro.org/ASTRO/media/ASTRO/Patient%20Care%20and%20Research/PDFs/PMRT_Pocketcard.pdf']
};
const COMPARISON=[
 {topic:'全摘・SLNマクロ転移／ALND省略',jp:'外科CQ1b-3：T1–2、照射・適切な薬物療法を前提に弱く推奨（エビデンス：弱）。無照射ではCQ1b-2でALNDを強く推奨。',us:'ASCO 2025 Rec 4.1：初回手術、cN0、浸潤癌≤5 cm、SLN陽性1–2個にPMRT＋RNIとALND省略を提示可能（強い推奨、質：高）。',refs:['JC1','ASLN25']},
 {topic:'照射の位置付け',jp:'FRQ3：SLN個数だけでは照射を決めず総合判断。BQ6：PMRTの基本は胸壁＋鎖骨上。',us:'PMRT 2025：胸壁／再建乳房＋領域リンパ節。SLN陽性・郭清省略では腋窩全領域をカバー。',refs:['JF3','JB6','APM25']},
 {topic:'郭清後・内胸（IMN）',jp:'BQ6：適切な郭清後は郭清部への予防的重複照射を通常避ける。CQ6：高リスクでIMNを弱く推奨。',us:'郭清後のLevel I–IIは通常追加しない。IMNは腫瘍部位・大きさ・節転移範囲で個別判断。',refs:['JB6','J6','APM25','APOCKET']}
];
function imnAssessment(p){
 const refs=['J6','APM25','APOCKET'];
 if(p.imn==='yes')return {l:'review',title:'転移疑い／確認あり：治療標的を個別確定',desc:'診断の確度・範囲を確認し、予防照射と区別してIMNの治療方針を検討します。',why:'画像、必要に応じた病理、心肺線量と標的範囲を確認。',refs};
 if(p.imn!=='no'||p.site==='unk')return {l:'review',title:'IMNの評価・部位を確認',desc:'IMNの臨床的評価または腫瘍部位が不明です。省略・追加を自動確定しません。',why:'ALND省略やRNIの選択だけを理由に、IMNを一律に追加しません。',refs};
 const risk=['inner','central'].includes(p.site)||p.n>=4;
 return {l:'consider',title:risk?'高リスク要因あり：IMN追加を検討':'IMNは独立した個別適応',desc:risk?'内側／中央かつ節陽性、または転移4個以上は日本CQ6の高リスク例に該当します。':'外側・少数転移でもIMNを自動省略せず、利益と毒性を比較します。',why:'腫瘍径、節転移範囲、心・肺線量、DIBH、既照射歴を確認。左側という理由だけで省略しません。',refs};
}
function combinedPlan(p){
 if(p.s!=='mas'||p.hist!=='inv'||p.n<=0||!['slnb','alnd'].includes(p.ax))return null;
 const refs=['JC1','JF3','JB6','ASLN25','APM25'];
 const checks=[];
 const add=(condition,text)=>{if(condition)checks.push(text)};
 add(p.neo!=='no','術前薬物療法あり／不明：初回手術のALND省略基準を適用しません。治療前cT/cN、ypN、腋窩手術法を別途検討。');
 add(p.cn==='unk','治療前cNを確認。');
 add(p.t==='unk'||p.margin==='unk','病理病期・断端を確認。');
 add(p.micro!=='macro','微小転移のみ／転移径不明：マクロ転移経路と分けて病理・薬物療法・PMRT適応を確認。日本CQ1aのALND省略推奨とPMRT適応は別です。');
 add(p.gross!=='no','肉眼的残存病変・癒合節・肉眼的節外進展の有無を確認（ありなら個別の局所制御方針が必要）。');
 add(p.exam===null||!Number.isInteger(p.exam)||p.exam<p.n,'摘出／検索数と陽性数、病理報告を確認。SLN数は総腋窩転移数ではありません。');
 let status='review',title='治療方針未確定：多職種で再検討',reason='PMRT＋RNIによる郭清省略と、ALND追加後の照射再評価を比較します。';
 if(p.ax==='slnb'){
  add(p.cn!=='c0','初回手術前cN0を確認。cN陽性／不明へRec 4.1を外挿しません。');
  add(!['ct1','ct2'].includes(p.ct)||!['t1','t2'].includes(p.t),'治療前cT1–2・浸潤径≤5 cmとpT1–2を確認。T3/T4・不明は少数SLN陽性の自動省略経路の対象外。');
  add(p.n>2,'SLN陽性3個以上：1–2個の郭清省略基準の対象外。ASCO 2025原著Rec 4.3と最新版を確認しALND＋PMRTを検討。');
  add(p.systemic!=='yes','適切な術後薬物療法の計画・実施可能性を確認（日本CQ1の前提）。');
  if(p.strategy==='add_alnd'){
   status='planned-alnd';title='ALND追加を検討：術後情報で照射を再判定';reason='現在はSLNBのみです。ALNDが完了したと仮定して腋窩照射を省略しません。最終転移個数・郭清範囲・残存病変を確認後、PMRTの適応と体積を再評価します。';
  }else if(p.n>2&&p.neo==='no'&&p.micro==='macro'){
   status='outside';title='少数SLN陽性の省略経路の対象外';reason='ASCO 2025原著Rec 4.3では全摘・陽性3個以上にALND後PMRTを推奨。3個の扱いは後続資料との表記差もあり原著・最新版を確認します。照射だけでALND省略を確定しません。';
  }else if(p.neo==='no'&&p.micro==='macro'&&p.rt==='no'){
   status='alnd-needed';title='PMRT＋RNIを行わない方針：ALND追加を検討';reason='ALNDと照射の両方を省略する方針を支持しません。日本CQ1b-2、米国Rec 4.2の対象条件を照合します。胸壁単独照射もRec 4.1の代替ではありません。';
  }else{
   add(p.rt!=='yes','PMRT＋RNIの実施可能性・本人の意向・治療チームの合意を確認。未定は実施予定と扱いません。');
   add(p.strategy!=='omit_rt','検討方針を選択し、ALND省略とPMRT＋RNIを一体として合意。');
   if(checks.length===0){status='combined';title='ALND省略＋PMRT・RNIを一体として検討可能';reason='入力は少数SLN陽性の主要条件に合致します。これは選択肢の提示であり、適応・照射野の確定には専門医と本人の合意が必要です。';}
  }
 }else{
  add(p.quality!=='adequate','ALNDの十分性・郭清Level・残存病変を確認。個数だけでは適切な郭清と判定しません。');
  if(p.strategy==='omit_rt')checks.push('ALND実施済みと「ALND省略」の検討方針が矛盾しています。方針を選び直してください。');
  if(checks.length===0){status='post-alnd';title='ALND実施後：PMRT適応と郭清範囲を再評価';reason='ALNDを行ってもPMRTが自動的に不要になるわけではありません。日本CQ5と米国PMRT 2025のpN陽性推奨・省略を検討できる良好リスク例を照合します。';}
 }
 const selected=status==='combined';
 const completed=status==='post-alnd';
 const held={l:'review',title:'治療方針と併せて判定保留',desc:'下の条件付き照射範囲を参照し、腋窩手術とPMRT＋RNIの方針を先に確定してください。',why:'胸壁・鎖骨上・腋窩を独立に選択して郭清省略の条件を失わないようにします。',refs};
 const fields={chest:{...held},scv:{...held},axilla:{...held},imn:imnAssessment(p)};
 if(selected){
  fields.chest={l:'strong',title:'この治療方針では胸壁／再建乳房を含める',desc:'ALND省略＋PMRT・RNIの一部として評価します。胸壁単独照射に置き換えません。',why:'PMRTを選択した場合の体積であり、無条件の処方推奨ではありません。',refs:['JB6','APM25']};
  fields.scv={l:'strong',title:'この治療方針では鎖骨上・下／Level IIIを含める',desc:'未郭清腋窩と連続した領域をCT治療計画で評価します。',why:'胸壁と腋窩の治療を一体で計画。',refs:['JF3','APM25']};
  fields.axilla={l:'strong',title:'この治療方針では未郭清腋窩Level I–IIを含める',desc:'Level IIIと併せて腋窩全領域を標的として検討します。接線野の偶発線量だけで代替しません。',why:'ALND省略を支えるRNIの範囲。残存病変・輪郭・線量は別途確認。',refs:['JF3','APM25']};
 }else if(completed){
  fields.chest={l:'consider',title:'PMRTを行うなら胸壁／再建乳房',desc:'最終病理とリスクからPMRT適応を判断したうえで含めます。',why:'ALND追加＝PMRT不要ではありません。',refs:['J5','JB6','APM25']};
  fields.scv={l:'consider',title:'PMRTを行うなら鎖骨上・下／未郭清Level III',desc:'郭清範囲を確認して領域照射を計画します。',why:'切除済み領域と未郭清領域を区別。',refs:['JB6','APM25']};
  fields.axilla={l:'omit',title:'十分に郭清済みのLevel I–IIは通常重複しない',desc:'肉眼的残存なし・十分な郭清を確認した場合。郭清不十分や残存があれば追加評価。',why:'リンパ浮腫等のリスクと局所制御を比較。',refs:['JB6','APM25']};
 }
 if(p.ene==='yes')checks.push('節外進展の範囲を確認。顕微鏡的所見だけで省略可否を一律に決めず、肉眼的進展・残存とは区別。');
 checks.push('術後薬物療法への病期情報の影響、既照射歴、心肺線量・DIBH、再建、本人の意向を確認しカンファレンスで確定。');
 return {status,title,reason,checks,fields,refs,comparison:COMPARISON};
}
const api={combinedPlan,REFERENCES,COMPARISON};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
else root.BreastFieldLogic=api;
})(typeof window==='undefined'?globalThis:window);
