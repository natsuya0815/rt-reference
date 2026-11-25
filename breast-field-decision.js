/* Breast RT field decision v2.0
 * Japanese source baseline: publicly accessible JBCS 2022 (2024 web update).
 * JBCS 2026 was published but full recommendations are not verified here.
 * Supplemental only: ASTRO/ASCO/SSO 2025 PMRT, NSABP B-51, Z0011.
 * Clinical decision support, not a prescription or substitute for review.
 * Pure core without personal data persistence or network requests. */
(function(root){
'use strict';
const REFERENCES={
 J2026:{title:'日本乳癌学会 乳癌診療ガイドライン2026（刊行情報・推奨本文未照合）',url:'https://www.jbcs.gr.jp/modules/journals/index.php?content_id=3',year:2026,role:'存在確認のみ'},
 JB1:{title:'日本2022 放射線BQ1/BQ2（全乳房照射）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/',year:2022,role:'日本本文'},
 JC4:{title:'日本2022 放射線CQ4（BCS・ALND後1–3個 RNI）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/cq4/',year:2022,role:'日本本文'},
 JC5:{title:'日本2022 放射線CQ5（全摘・ALND後1–3個 PMRT）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/cq5/',year:2022,role:'日本本文'},
 JB5:{title:'日本2022 放射線BQ5（全摘4個以上）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/bq5/',year:2022,role:'日本本文'},
 JB6:{title:'日本2022 放射線BQ6（PMRT胸壁・鎖骨上）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/bq6/',year:2022,role:'日本本文'},
 JB7:{title:'日本2022 放射線BQ7（T3–4N0・断端陽性）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/bq7/',year:2022,role:'日本本文'},
 JIMN:{title:'日本2022 放射線CQ6（内胸領域）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/cq6/',year:2022,role:'日本本文'},
 JFRQ:{title:'日本2022 放射線FRQ3（SLNB陽性・ALND省略）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/frq3/',year:2022,role:'日本本文'},
 JBOOST:{title:'日本2022 放射線CQ2（腫瘍床ブースト）',url:'https://jbcs.xsrv.jp/guideline/2022/h_index/cq2/',year:2022,role:'日本本文'},
 ASTRO:{title:'ASTRO/ASCO/SSO 2025 PMRT（補助）',url:'https://www.astro.org/provider-resources/guidelines/clinical-practice-guidelines/postmastectomy-radiation-therapy',year:2025,role:'海外補助'},
 B51:{title:'NSABP B-51/RTOG 1304（術前化学療法後ypN0、補助）',url:'https://pubmed.ncbi.nlm.nih.gov/40466065/',year:2025,role:'海外RCT'},
 Z0011:{title:'ACOSOG Z0011（BCS＋SLN少数陽性、補助）',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC5672806/',year:2017,role:'海外RCT'}
};
const NAMES={
 wbi:'全乳房',chest:'胸壁／再建乳房',scv:'鎖骨上・鎖骨下（Level III）',
 axilla:'腋窩Level I–II（専用照射）',imn:'内胸リンパ節',boost:'腫瘍床／局所ブースト'
};
const make=(state,reason,refs,defaultAction)=>({state,reason,refs:refs||[],defaultAction:defaultAction||null});
const base=()=>({
 wbi:make('hold','術式と病理を入力してください。'),
 chest:make('hold','術式と病理を入力してください。'),
 scv:make('hold','リンパ節情報を入力してください。'),
 axilla:make('hold','腋窩手術とリンパ節情報を入力してください。'),
 imn:make('hold','内胸リンパ節所見と腫瘍部位を入力してください。'),
 boost:make('hold','術式・断端・年齢を入力してください。')
});
const yes=v=>v==='yes';
const known=v=>v!==''&&v!=null&&v!=='unknown';
const number=v=>v===null||v===''||v===undefined?null:typeof v==='number'?v:Number(v);
const tHigh=v=>['t3','t4'].includes(v);
const nPos=p=>p.nodes!=null&&p.nodes>0&&['micro','macro'].includes(p.deposit);
const nNeg=p=>p.nodes===0&&['neg','itc'].includes(p.deposit);
const highRisk=p=>{
 const list=[];
 if(p.age!=null&&p.age<40)list.push('若年（40歳未満）');
 if(p.grade==='g3')list.push('Grade 3');
 if(p.lvi==='yes')list.push('LVI陽性');
 if(p.subtype==='tn')list.push('TNBC');
 if(p.ene==='yes')list.push('節外進展');
 if(tHigh(p.t))list.push('T3–4');
 if(p.margin==='close'||p.margin==='pos')list.push('断端近接／陽性');
 return list;
};
function decide(raw){
 const p={...raw,age:number(raw.age),nodes:number(raw.nodes),exam:number(raw.exam)};
 const fields=base(),errors=[],missing=[],notes=[],override=[],risks=highRisk(p);
 const need=(flag,text)=>{if(flag&&!missing.includes(text))missing.push(text);};
 const check=(flag,text)=>{if(flag)errors.push(text);};
 check(p.nodes!=null&&(!Number.isInteger(p.nodes)||p.nodes<0),'転移陽性数は0以上の整数で指定してください。');
 check(p.exam!=null&&(!Number.isInteger(p.exam)||p.exam<0||(p.nodes!=null&&p.nodes>p.exam)),'検索数が転移陽性数より少ない、または無効です。');
 check(nPos(p)===false&&p.nodes>0&&['neg','itc'].includes(p.deposit),'リンパ節陰性／ITCのみと転移陽性数が矛盾しています。');
 check(p.nodes===0&&['micro','macro'].includes(p.deposit),'微小／マクロ転移ありと陽性0個が矛盾しています。');
 check(p.hist==='dcis'&&(p.nodes>0||p.deposit==='macro'||p.deposit==='micro'||p.cn==='c1'||p.cn==='c23'),'純粋DCISと臨床的・病理学的リンパ節転移ありの入力が矛盾しています（浸潤成分の再評価が必要）。');
 check(p.neo==='yes'&&p.ypn==='yp0'&&p.nodes>0,'ypN0と術後転移陽性数が矛盾しています。');
 check(p.neo==='no'&&known(p.ypn),'術前治療なしの症例にypNを指定しています。');
 check(p.age!=null&&(!Number.isFinite(p.age)||p.age<18||p.age>110),'年齢を確認してください（18～110歳）。');
 check(p.surgery==='bcs'&&p.recon!=='none'&&known(p.recon),'温存手術と再建乳房の入力を確認してください。');
 need(!known(p.surgery),'術式');
 need(!known(p.hist),'病理（浸潤癌／DCIS）');
 need(!known(p.mstatus),'M0評価');
 need(!known(p.neo),'術前薬物療法の有無');
 need(!known(p.t),'pT／ypT');
 need(!known(p.margin),'断端');
 need(!known(p.ax),'腋窩手術（ALND／SLNB）');
 need(p.nodes===null||!known(p.deposit),'術後リンパ節所見・陽性数');
 need(p.neo==='yes'&&!known(p.ct),'術前cT');
 need(p.neo==='no'&&p.surgery==='bcs'&&p.ax==='slnb'&&p.deposit==='macro'&&p.nodes>0&&!['ct1','ct2'].includes(p.ct),'Z0011：治療前cT1–2を確認');
 need(p.neo==='yes'&&!known(p.cn),'術前cN');
 need(p.neo==='yes'&&!known(p.ypn),'治療後ypN');
 need(p.surgery==='bcs'&&p.age===null,'年齢（ブースト）');
 need(!known(p.imn),'内胸リンパ節の画像・病理評価');
 need(p.imn==='suspected','内胸リンパ節転移疑いの追加評価');
 need(!known(p.site),'腫瘍部位（内側／中央／外側）');
 need(p.neo==='no'&&p.surgery==='bcs'&&p.ax==='slnb'&&p.deposit==='macro'&&p.nodes>0&&p.systemic!=='yes','SLNBマクロ転移の郭清省略：術後薬物療法計画');
 need(p.neo==='no'&&p.surgery==='bcs'&&p.ax==='slnb'&&p.deposit==='macro'&&p.nodes>0&&p.cnExam!=='neg','SLNBマクロ転移の郭清省略：術前腋窩非触知の確認');
 const out={fields,errors,missing,notes,override,risks,status:'review',primary:'照射範囲は未確定です',selected:[],skipped:[],pending:[],sources:REFERENCES,model:'日本2022公開本文（2026版本文未照合）'};
 if(errors.length){out.status='error';out.primary='入力内容に矛盾があります。修正後に判定してください。';return out;}
 if(!known(p.surgery)||!known(p.hist)){return out;}
 if(p.mstatus==='m1'){out.status='outside';out.primary='M1：術後M0用の照射範囲判定は適用外';out.notes.push('局所制御・症状緩和など治療目的から個別に判断してください。');return out;}
 const neo=p.neo==='yes',bcs=p.surgery==='bcs',mas=p.surgery==='mas';
 const nodeKnown=nPos(p)||nNeg(p);
 const macroPos=p.deposit==='macro'&&p.nodes>0;
 const microPos=p.deposit==='micro'&&p.nodes>0;
 const node4=macroPos&&p.nodes>=4,node13=macroPos&&p.nodes>=1&&p.nodes<=3;
 const noNode=nNeg(p);
 const axDissected=p.ax==='alnd';
 const axLimited=p.ax==='slnb'||p.ax==='none';
 const highTumor=tHigh(p.t);
 const gross=p.gross==='yes';
 // Primary breast/chest region
 fields.wbi=bcs?make('include',p.hist==='dcis'?'純粋DCISの部分切除後は全乳房照射を原則とします。':'乳房部分切除後は全乳房照射を基本とします。術前治療後のpCRでも省略の根拠にはなりません。',['JB1']):make('omit','全摘後は全乳房照射ではなく胸壁／再建乳房を評価します。',['JB6']);
 fields.chest=bcs?make('omit','部分切除後は胸壁照射ではなく全乳房照射です。',['JB1']):make('hold','PMRTの適応を評価中です。');
 if(mas){
  if(p.hist==='dcis'){
   fields.chest=p.margin==='pos'?make('consider','純粋DCIS全摘後の断端陽性は再切除の可否と局所照射を個別検討。通常の侵襲癌PMRT規則を使いません。',['JB7'],'照射検討'):make('omit','純粋DCISの全摘・断端陰性では通常胸壁照射を行いません。',['JB1']);
  }else if(neo){
   if(['c23'].includes(p.cn)||p.ct==='ct4'||p.t==='t4'||p.ypn==='ypp'||p.ypn==='ypmi'||nPos(p)){
    fields.chest=make('include','術前cN2–3/cT4またはypN陽性では、反応にかかわらずPMRTを支持します。',['ASTRO']);
   }else if((p.cn==='c1'||p.ct==='ct3')&&p.ypn==='yp0'){
    fields.chest=make('consider','治療前cN1／cT3 → ypN0。ASTRO 2025は条件付きPMRT、B-51は一部で省略を支持。日本2026の記載未照合のため個別決定。',['ASTRO','B51'],'照射を基本候補');
   }else if(p.cn==='c0'&&p.ypn==='yp0'&&['t0','t1','t2'].includes(p.t)){
    fields.chest=make('omit','治療前cN0、治療後ypN0・ypT0–2で他の高リスク因子がなければPMRTを通常省略します。',['ASTRO']);
   }else fields.chest=make('hold','術前cT/cN・治療後ypT/ypNの関係を確認してください。',['ASTRO','B51']);
  }else if(p.hist==='inv'){
   if(node4||p.t==='t4'){
    fields.chest=make('include',node4?'ALND後4個以上のリンパ節転移はPMRTの標準適応。':'pT4はPMRTの標準適応です。',['JB5','JB6']);
   }else if(node13){
    fields.chest=make('include','pN1（1–3個）でもPMRTを実施する方向を基本とします。日本2022 CQ5はALND後で弱い推奨。SLNBのみでは手術との組み合わせを確認。',['JC5','JFRQ','ASTRO']);
   }else if(microPos){
    fields.chest=make('consider','pN1miのみの全摘例はマクロ転移1–3個のCQ5を一律に適用しません。T分類・他の再発リスクとともにPMRTを個別評価。',['JFRQ','ASTRO'],'通常省略寄り');
   }else if(highTumor){
    fields.chest=make('include','pT3–4N0はPMRTを基本候補とします。pT3N0低リスク例は胸壁単独や省略の余地を個別検討。',['JB7']);
   }else if(p.margin==='pos'){
    fields.chest=make('include','全摘後断端陽性。再切除の可否を確認し、胸壁局所照射を基本候補とします（節陰性なら領域は別判定）。',['JB7','ASTRO']);
   }else if(noNode&&['t1','t2','tis'].includes(p.t)&&p.margin==='neg'){
    fields.chest=make('omit','pT1–2N0・断端陰性の全摘後は原則PMRTを行いません。複数の不良因子がある場合は再評価。',['ASTRO']);
    if(risks.filter(x=>x!=='若年（40歳未満）').length>=2){
      fields.chest=make('consider','pT1–2N0ですが不良因子が複数あります。PMRTの例外適応を個別検討。',['ASTRO'],'省略寄り');
    }
   }else fields.chest=make('hold','断端・pT・pNが確定していません。PMRT適応を確定しません。',['JB7','JC5']);
  }
 }
 // RNI supraclavicular / infraclavicular field
 if(p.hist==='dcis'){
   fields.scv=make('omit','純粋DCISでは予防的RNIを通常行いません。',['JB1']);
 }else if(neo){
   if(['c23'].includes(p.cn)||p.ct==='ct4'||p.t==='t4'||p.ypn==='ypp'||p.ypn==='ypmi'||nPos(p)){
     fields.scv=make('include','術前高病期またはypN陽性：鎖骨上／Level IIIをRNIに含める方針。',['ASTRO']);
   }else if(p.cn==='c1'&&p.ypn==='yp0'){
     fields.scv=make('consider','cN1→ypN0はB-51による省略選択肢があります。治療前針生検・術前化学療法・術後節検索の条件を確認。',['B51','ASTRO'],'省略も選択可');
   }else if(p.cn==='c0'&&p.ypn==='yp0')fields.scv=make('omit','cN0→ypN0では通常、専用RNIは行いません。',['ASTRO']);
   else fields.scv=make('hold','治療前cNと術後ypNを確定してください。',['ASTRO']);
 }else if(node4||mas&&p.t==='t4'){
   fields.scv=make('include',node4?'4個以上の節転移：鎖骨上／Level IIIを照射範囲へ。':'pT4N0：PMRTの領域照射を基本候補として検討。',['JB5','JB6','JB7']);
 }else if(node13){
   if(mas)fields.scv=make('include','PMRTを選ぶ場合、胸壁＋鎖骨上／Level IIIが標準的照射体積。SLNBのみでALND省略なら腋窩管理も同時に決定。',['JB6','JC5','JFRQ']);
   else if(axDissected){
     fields.scv=make('include','BCS・ALND後1–3個陽性。日本2022 CQ4の弱い推奨を採用し鎖骨上RNIを基本候補。低負荷・良好背景なら省略も個別協議。',['JC4']);
   }else if(p.cn==='c0'&&p.nodes<=2&&['ct1','ct2'].includes(p.ct)&&['t1','t2'].includes(p.t)&&p.exam!=null&&p.exam>=p.nodes&&p.gross==='no'&&p.systemic==='yes'&&p.cnExam==='neg'){
     fields.scv=risks.length>=2?make('consider','Z0011型の郭清省略例。ただし再発リスクが複数あり、鎖骨上RNIを追加するか個別協議。',['JFRQ','Z0011'],'省略を基本候補'):make('omit','cN0・T1–2・SLN1–2個陽性の温存照射では、Z0011型の条件確認のうえ専用鎖骨上照射は必須ではありません。',['JFRQ','Z0011']);
   }else fields.scv=make('consider','ALND省略でZ0011適格性が明確でないため、鎖骨上RNIを個別検討。',['JFRQ'],'追加照射寄り');
 }else if(microPos){
   fields.scv=make('omit','微小転移のみでは専用鎖骨上照射を通常追加しません。高リスク背景は別評価。',['JFRQ']);
 }else if(noNode){
   if(bcs&&highTumor&&risks.length>=2)fields.scv=make('consider','pN0でもT3・高リスク因子がありRNI追加を検討。',['JC4'],'省略を基本候補');
   else fields.scv=make('omit','病理節陰性で通常は予防的鎖骨上照射を行いません。',['JB1','JB7']);
 }else fields.scv=make('hold','リンパ節所見が不明です。専用RNIの適否は決められません。');
 // Axillary Level I–II. Dedicated field, NOT tangent incidental coverage.
 if(p.hist==='dcis')fields.axilla=make('omit','DCISに予防的腋窩照射は通常行いません。',['JB1']);
 else if(gross)fields.axilla=make('include','肉眼的腋窩残存があるため病変部の治療範囲を別途設計。',['ASTRO']);
 else if(axDissected){
   fields.axilla=p.alndQuality==='inadequate'?make('consider','不十分な郭清範囲／残存リスクがあるため未郭清部の補完照射を検討。',['JB6','ASTRO'],'追加照射寄り'):p.alndQuality==='adequate'?make('omit','十分に郭清済みのLevel I–IIは通常専用再照射しません（浮腫リスク）。',['JB6']):make('hold','ALND範囲が不明です。郭清済みLevel I–IIを自動で照射しないでください。',['JB6']);
 }else if(neo){
   if(p.ypn==='ypp'||p.ypn==='ypmi'){
     fields.axilla=make('consider','術前治療後に残存節転移あり。追加ALNDと未郭清腋窩照射の扱いを多職種で決定。',['ASTRO'],'治療必要');
   }else if(p.ypn==='yp0'&&p.cn==='c23'&&axLimited)fields.axilla=make('include','初期cN2–3でALND未施行：ypN0でも未郭清Level I–IIを含むRNIを基本候補。腋窩手術の質と標的範囲を要確認。',['ASTRO']);
   else if(p.ypn==='yp0')fields.axilla=make('omit','ypN0なら専用Level I–IIは通常省略。ただし初期高病期・検索手技の信頼性を別確認。',['B51','ASTRO']);
   else fields.axilla=make('hold','術後ypN・腋窩治療方針を確認。',['ASTRO']);
 }else if(nPos(p)&&p.deposit==='macro'&&mas&&axLimited){
   if(p.axPlan==='rni')fields.axilla=make('include','全摘・SLNマクロ転移・ALND省略でPMRT＋RNIを選択：未郭清Level I–IIを照射標的として検討。',['JFRQ','ASTRO']);
   else if(p.axPlan==='alnd')fields.axilla=make('hold','追加ALNDの最終病理を待ち、未郭清領域を再判定。',['JFRQ']);
   else fields.axilla=make('hold','先に「ALND省略＋RNI」または「追加ALND」を選択してください。単なるALND省略と腋窩治療省略は別です。',['JFRQ']);
 }else if(nPos(p)&&p.deposit==='macro'&&bcs&&axLimited){
   if(p.cn==='c0'&&p.nodes<=2&&['t1','t2'].includes(p.t)&&['ct1','ct2'].includes(p.ct)&&p.exam!=null&&p.exam>=p.nodes&&p.gross==='no'&&p.systemic==='yes'&&p.cnExam==='neg'){
     fields.axilla=make('omit','Z0011に近い条件では専用Level I–II照射は自動追加しません。通常接線野による偶発的線量を専用照射と区別。',['JFRQ','Z0011']);
   }else fields.axilla=make('consider','Z0011の条件外／未確認（術前cN0・非触知・薬物療法・T1–2・残存なし等）のため未郭清Level I–IIの補完照射または追加ALNDを検討。',['JFRQ'],'照射・手術を検討');
 }else if(p.deposit==='micro'||p.deposit==='itc'){
   fields.axilla=make('omit','ITC／微小転移のみで、専用腋窩照射を機械的に追加しません。残余リスクの個別判断。',['JFRQ']);
 }else if(noNode)fields.axilla=make('omit','転移陰性：専用Level I–II照射なし。',['JB1']);
 else fields.axilla=make('hold','腋窩病理・手術内容を確認してください。');
 // Internal mammary
 if(p.imn==='pos')fields.imn=make('include','内胸リンパ節転移が確認済み。予防照射ではなく病変を含む治療標的として範囲・線量を確定。',['JIMN']);
 else if(p.imn==='suspected')fields.imn=make('hold','内胸リンパ節転移疑い。画像・必要時病理で確証を得てから治療標的を確定。',['JIMN']);
 else if(!known(p.imn))fields.imn=make('hold','内胸リンパ節所見が未評価です。',['JIMN']);
 else if(p.hist==='dcis')fields.imn=make('omit','DCISの予防的IMN照射は通常不要。',['JB1']);
 else if(neo&&(p.cn==='c23'||p.ct==='ct4'))fields.imn=make('consider','術前高病期のRNI。内胸照射の利益と心肺DVHを評価。',['JIMN','ASTRO'],'追加照射寄り');
 else if(node4)fields.imn=make('include','節転移4個以上は日本2022 CQ6に記載されたIMN照射の高リスク群。心肺線量を確認。',['JIMN']);
 else if(macroPos&&['inner','central'].includes(p.site))fields.imn=make('include','内側／中央原発＋節転移陽性は、日本2022 CQ6のIMN照射高リスク群（弱い推奨）。',['JIMN']);
 else if(macroPos&&p.site==='outer')fields.imn=make('consider','外側原発・転移1–3個ではIMN追加による利益は限定的な可能性。照射体積と心肺DVHで検討。',['JIMN'],'通常省略');
 else if(microPos)fields.imn=make('omit','微小転移のみではIMNを自動追加しません（臨床画像陽性は別）。',['JIMN']);
 else if(noNode)fields.imn=make('omit','IMN転移陰性かつ腋窩節陰性で、通常は予防的IMN照射を行いません。',['JIMN']);
 else fields.imn=make('hold','腋窩節の評価を確認してください。',['JIMN']);
 // Boost
 if(mas){
   fields.boost=(p.margin==='pos'||gross)?make('consider','全摘断端陽性・肉眼的残存などで追加局所ブーストを個別検討。通常の全摘には自動追加しません。',['JB7','ASTRO'],'追加局所照射を検討'):make('omit','全摘後の通常PMRTに腫瘍床ブーストは自動追加しません。',['JB6']);
 }else if(p.margin==='pos'){
   fields.boost=make('hold','温存断端陽性は再切除の適否を先に検討。ブーストを再切除の代替としません。',['JBOOST']);
 }else if(p.hist==='dcis'){
   if(p.age!=null&&p.age<50||p.margin==='close'||p.grade==='g3')fields.boost=make('consider','DCISで若年・近接断端・高gradeなど再発リスクあり。腫瘍床ブーストを積極検討。',['JBOOST'],'追加照射寄り');
   else fields.boost=make('omit','低リスクDCISではブーストの上乗せ利益と整容性を比較して原則省略。',['JBOOST']);
 }else if(p.hist==='inv'){
   if(p.age!=null&&p.age<50||p.margin==='close'||p.grade==='g3'){
     fields.boost=make('include','若年または局所再発リスクあり。腫瘍床ブーストを基本候補。日本2022 CQ2は断端陰性浸潤癌で弱い推奨。',['JBOOST']);
   }else if(p.margin==='neg')fields.boost=make('consider','断端陰性浸潤癌へのブーストは日本2022 CQ2で弱い推奨。年齢・局所リスク・整容性を比較。',['JBOOST'],'省略も許容');
   else fields.boost=make('hold','断端状態・年齢・局所リスクを確認。',['JBOOST']);
 }
 if(!known(p.margin)&&bcs)fields.boost=make('hold','断端所見を確認してください。',['JBOOST']);
 // Clinically involved IMN changes RNI consideration regardless of axillary pathologic pN.
 if(p.imn==='pos'&&p.hist==='inv'){
   fields.scv=make('include','内胸リンパ節転移確認：領域リンパ節照射の治療計画を検討（臨床N病期を再評価）。',['JIMN','ASTRO']);
   if(mas)fields.chest=make('include','IMN転移があるため胸壁と領域の包括的PMRTを検討。腋窩pN0だけで省略しません。',['JIMN','ASTRO']);
 }
 // Safety: incomplete prerequisites make associated decisions provisional; never silently assume negative
 if(!nodeKnown){
   for(const key of ['scv','axilla'])fields[key]=make('hold','転移陽性数と節転移分類（陰性／ITC／微小／マクロ）を確認してください。');
   if(mas&&p.hist==='inv'&&!highTumor&&p.margin!=='pos')fields.chest=make('hold','術後リンパ節所見が未確定です。');
 }
 if(neo&&(!known(p.cn)||!known(p.ct)||!known(p.ypn))){
   for(const key of ['chest','scv','axilla'])if(key!=='chest'||mas)fields[key]=make('hold','術前cT/cNと術後ypNが揃っていません。日本2022を術前治療後にそのまま外挿しません。',['ASTRO','B51']);
 }
 if(p.mstatus!=='m0'){
   out.notes.push('M0未確認のため、以下は候補にとどめます。');
 }
 if(mas&&p.hist==='inv'&&!neo&&node13&&axLimited&&p.deposit==='macro'&&p.axPlan!=='rni'){
   fields.chest=make('hold','全摘・SLNBマクロ転移・ALND省略：PMRT＋RNI経路と追加ALND経路の選択が先決です。',['JFRQ','ASTRO']);
   fields.scv=make('hold','追加ALNDかPMRT＋RNIかを選択後、鎖骨上領域を確定します。',['JFRQ','ASTRO']);
   need(true,'腋窩管理方針（ALND追加／PMRT＋RNI）');
 }
 if(bcs&&p.margin==='pos')out.notes.push('断端陽性は外科的再切除の可否を先行検討してください。');
 if(p.imn==='pos'&&p.site==='outer')out.notes.push('IMN陽性病変は原発巣の内外側にかかわらず診断・照射体積を確認。');
 if(p.imn==='no'&&p.site==='outer'&&node13)out.notes.push('外側原発のIMN省略は施設で個別調整可能。');
 if(p.recon==='implant'&&mas&&fields.chest.state!=='omit')out.notes.push('人工物再建あり：PMRTに伴う被膜拘縮・再建合併症を事前説明。');
 if(p.side==='left'&&fields.imn.state!=='omit')out.notes.push('左側：DIBHやIMRT/VMATを含む心臓・肺の線量最適化が重要。');
 if(p.gross==='yes')out.notes.push('肉眼的残存は別途GTV/CTVと追加線量を決める必要があります。');
 if(p.neo==='yes')out.notes.push('術前治療後例は日本2022の初回手術群から直接外挿不可。ASTRO 2025とB-51を補助資料として利用。');
 // Determine output confidence
 const essential=['術式','病理（浸潤癌／DCIS）','M0評価','術前薬物療法の有無','pT／ypT','断端','腋窩手術（ALND／SLNB）','術後リンパ節所見・陽性数'];
 if(missing.length||Object.values(fields).some(x=>x.state==='hold')||p.mstatus!=='m0'){
   out.status='incomplete';out.primary='暫定の照射範囲です。必須項目を確認してください。';
 }else{
   out.status='assessed';out.primary='照射範囲の推奨案';
 }
 out.selected=Object.entries(fields).filter(([k,v])=>v.state==='include').map(([k])=>NAMES[k]);
 out.skipped=Object.entries(fields).filter(([k,v])=>v.state==='omit').map(([k])=>NAMES[k]);
 out.pending=Object.entries(fields).filter(([k,v])=>v.state==='hold'||v.state==='consider').map(([k])=>NAMES[k]);
 if(fields.wbi.state==='include'||fields.chest.state==='include'){
   out.summary=[fields.wbi.state==='include'?'全乳房':null,fields.chest.state==='include'?'胸壁／再建乳房':null,fields.scv.state==='include'?'鎖骨上＋Level III':null,fields.axilla.state==='include'?'未郭清腋窩I–II':null,fields.imn.state==='include'?'内胸':null].filter(Boolean).join(' ＋ ');
 }else out.summary=out.selected.length?out.selected.join(' ＋ '):'照射対象の確定待ち';
 return out;
}
const api={decide,NAMES,REFERENCES,highRisk};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
else root.BreastFieldDecision=api;
})(typeof window==='undefined'?globalThis:window);
