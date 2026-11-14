// User-requested hypothetical regression cases, not patient records.
const unknown={s:'mas',hist:'inv',ct:'unk',cn:'unk',cnExam:'unk',cnImaging:'unk',cnBiopsy:'unk',axUS:'unk',cnNodes:null,m0:'unk',t:'unk',micro:'unk',ax:'unk',slnTiming:'unk',n:null,exam:null,macroNodes:null,deposit:null,pathMethod:'unk',ene:'unk',gross:'unk',quality:'unk',slnN:null,slnExam:null,priorAx:'unk',margin:'unk',neo:'unk',neoType:'unk',ypn:'unk',chemoStandard:'unk',her2:'unk',antiHer2:'unk',senoTiming:'unk',age:null,site:'unk',strategy:'undecided',rt:'unk',wbi:'unk',rtPossible:'unk',systemic:'unk',imn:'unk',lowRisk:'unk'};
const A={...unknown,s:'mas',age:39,ct:'ct1c',cn:'c0',t:'t1c',micro:'macro',ax:'slnb',slnTiming:'upfront',n:1,exam:3,macroNodes:1,deposit:4,neo:'no',ypn:'na',margin:'neg'};
const raw={A,B:{...A,s:'bcs'},C:{...unknown,s:'bcs',cn:'c1',cnBiopsy:'pos',ax:'slnb',slnTiming:'upfront',n:1,neo:'no',ypn:'na'},D:{...unknown,s:'mas',ct:'ct2',cn:'c1',neo:'yes',ypn:'yp0',micro:'negative',n:0},E:{...unknown,s:'mas',t:'t2',micro:'negative',n:0,margin:'neg',lowRisk:'yes'},F:{...unknown,s:'mas',n:4,ax:'alnd'}};
// Explicit supplemental assumptions for testing successful pathways; not inferred from A–F.
const supplemental={cnExam:'neg',cnImaging:'neg',cnBiopsy:'notdone',axUS:'yes',m0:'yes',pathMethod:'he',ene:'no',gross:'no',priorAx:'no',systemic:'yes',rtPossible:'yes',site:'outer',imn:'no'};
const complete={
 A:{...A,...supplemental,strategy:'omit_rt',rt:'yes'},
 B:{...A,...supplemental,s:'bcs',strategy:'bcs_omit',wbi:'yes'},
 C:{...raw.C,...supplemental,ct:'ct2',t:'t2',cnBiopsy:'pos',cnNodes:1,cnImaging:'susp',micro:'macro',macroNodes:1,deposit:4,exam:3,age:39,wbi:'yes',margin:'neg',strategy:'bcs_omit'},
 D:{...raw.D,...supplemental,cnBiopsy:'pos',cnImaging:'susp',cnExam:'pos',neoType:'chemo',chemoStandard:'yes',age:50,ax:'slnb',slnTiming:'postNeo',exam:3,t:'t2',margin:'neg',her2:'neg'},
 E:{...raw.E,...supplemental,ct:'ct2',cn:'c0',neo:'no',ypn:'na',ax:'slnb',slnTiming:'upfront',exam:3,age:60,grade:'g1',lvi:'no'},
 F:{...raw.F,...supplemental,ct:'ct2',t:'t2',cn:'c0',neo:'no',ypn:'na',micro:'macro',exam:12,quality:'adequate',slnTiming:'notdone',margin:'neg',age:60}
};
module.exports={unknown,raw,complete};
