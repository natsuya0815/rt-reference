window.RT_SEED = {
  "version": "0.1.0",
  "asof": "2026-11-12",
  "sources": [
    {
      "id": "jastro24",
      "region": "日本",
      "type": "ガイドライン",
      "title": "JASTRO 放射線治療計画ガイドライン2024年版",
      "year": "2024（公式サイト2026年更新）",
      "url": "https://www.jastro.or.jp/medicalpersonnel/guideline/jastro/2024.html",
      "note": "癌種別の記載は各章の原文確認が必要。"
    },
    {
      "id": "jastro-index",
      "region": "日本",
      "type": "ガイドライン",
      "title": "JASTRO ガイドライン一覧",
      "year": "閲覧時確認",
      "url": "https://www.jastro.or.jp/medicalpersonnel/guideline/jastro/",
      "note": "新規版の確認先。"
    },
    {
      "id": "astro-prostate26",
      "region": "米国",
      "type": "ガイドライン",
      "title": "ASTRO/ASCO/AUA/ESTROほか 局所限局前立腺癌 寡分割RTガイドライン",
      "year": "2026年10月27日",
      "url": "https://www.astro.org/provider-resources/guidelines/clinical-practice-guidelines/astro-s-guideline-on-hypofractionation-for-localized-prostate-cancer",
      "note": "N0M0に適用。骨盤LN elective UHFには別途注意。"
    },
    {
      "id": "chhip16",
      "region": "欧州",
      "type": "原著論文",
      "title": "CHHiP：60 Gy/20 frの非劣性を検証したRCT（Lancet Oncology）",
      "year": "2016",
      "url": "https://pubmed.ncbi.nlm.nih.gov/27339115/",
      "doi": "10.1016/S1470-2045(16)30102-4",
      "note": "局所限局癌。試験集団の治療成績であり病期別一般予後ではない。"
    },
    {
      "id": "chhip-constraints20",
      "region": "欧州",
      "type": "原著論文",
      "title": "CHHiP試験プロトコールに由来するOAR制約の比較研究",
      "year": "2020",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7336059/",
      "note": "Table 3にRectum/BladderのCHHiP trial protocol v8.0制約を掲載。"
    },
    {
      "id": "chhip-anorectum20",
      "region": "欧州",
      "type": "原著論文",
      "title": "Wilkins et al. CHHiP直腸毒性に基づくDVH制約提案（Red Journal）",
      "year": "2020",
      "url": "https://pubmed.ncbi.nlm.nih.gov/31987974/",
      "doi": "10.1016/j.ijrobp.2020.01.003",
      "note": "臨床家評価の有害事象から導出した提案。CHHiPプロトコールの制約と混同しない。"
    },
    {
      "id": "japan-prostate25",
      "region": "日本",
      "type": "原著論文",
      "title": "60 Gy/20 fr前立腺癌におけるDVHと毒性の前向き観察研究（Journal of Radiation Research）",
      "year": "2025",
      "url": "https://academic.oup.com/jrr/article/66/6/673/8263183",
      "note": "壁（rectal wall / bladder wall）の制約と全臓器の制約を混同しない。"
    },
    {
      "id": "quantec-lung10",
      "region": "米国",
      "type": "総説・コンセンサス",
      "title": "QUANTEC: Radiation Dose–Volume Effects in the Lung（Red Journal）",
      "year": "2010",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3576042/",
      "doi": "10.1016/j.ijrobp.2009.06.091",
      "note": "通常分割での参考目安。線量反応に絶対閾値なし。ILD合併には単純外挿不可。"
    },
    {
      "id": "rtog0617",
      "region": "米国",
      "type": "第III相試験",
      "title": "RTOG 0617 長期成績（Journal of Clinical Oncology）",
      "year": "2020",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7048161/",
      "doi": "10.1200/JCO.19.01162",
      "note": "Stage IIIのCRT 60 Gy vs 74 Gy。治療成績は試験集団依存。"
    },
    {
      "id": "astro-sbrt17",
      "region": "米国",
      "type": "ガイドライン",
      "title": "ASTRO 早期NSCLC SBRTガイドライン",
      "year": "2017",
      "url": "https://www.astro.org/provider-resources/guidelines/astro-s-guideline-on-sbrt-for-early-stage-nsclc",
      "note": "中枢型・大型病変・高リスク症例の検討が重要。"
    },
    {
      "id": "astro-sclc20",
      "region": "米国",
      "type": "ガイドライン",
      "title": "ASTRO 小細胞肺癌 放射線治療ガイドライン",
      "year": "2020",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10915746/",
      "note": "LD-SCLCの45 Gy/30 fr BID、1日1回代替治療、PCIなど。"
    },
    {
      "id": "estro-sclc26",
      "region": "欧州",
      "type": "ガイドライン",
      "title": "ESTRO–EORTC Stage I–III SCLC標的体積・RT詳細ガイドライン",
      "year": "2026",
      "url": "https://www.thegreenjournal.com/article/S0167-8140%2826%2900155-6/fulltext",
      "note": "45 Gy BIDの位置付けと標的体積の考え方。"
    },
    {
      "id": "astro-brain22",
      "region": "米国",
      "type": "ガイドライン",
      "title": "ASTRO 脳転移放射線治療ガイドライン",
      "year": "2022",
      "url": "https://www.astro.org/provider-resources/guidelines/clinical-practice-guidelines/rt-for-brain-metastases",
      "note": "SRS/FSRT選択、WBRT、手術後など。"
    },
    {
      "id": "asco-brain22",
      "region": "米国",
      "type": "ガイドライン",
      "title": "ASCOによるASTRO脳転移ガイドライン支持（JCO）",
      "year": "2022",
      "url": "https://ascopubs.org/doi/10.1200/JCO.22.00333",
      "note": "1回照射 V12Gy ≤10 cc 条件付き推奨を収録。"
    },
    {
      "id": "astro-bone24",
      "region": "米国",
      "type": "ガイドライン",
      "title": "ASTRO 症候性骨転移 緩和照射ガイドライン",
      "year": "2024",
      "url": "https://pubmed.ncbi.nlm.nih.gov/38788923/",
      "doi": "10.1016/j.prro.2024.04.018",
      "note": "症候性病変の疼痛緩和に対する照射。無症状の予防照射へ直接適用しない。"
    },
    {
      "id": "estro-bone22",
      "region": "欧州",
      "type": "ガイドライン",
      "title": "ESTRO ACROP 複雑な骨転移のRTガイドライン",
      "year": "2022",
      "url": "https://www.thegreenjournal.com/article/S0167-8140%2822%2904147-0/fulltext",
      "note": "病的骨折リスク・脊髄圧迫など。"
    }
  ],
  "cancers": [
    {
      "id": "prostate",
      "name": "前立腺癌",
      "group": "泌尿器",
      "aliases": [
        "prostate",
        "IMRT",
        "VMAT",
        "ADT",
        "CHHiP",
        "60/20"
      ],
      "status": "expanded",
      "summary": "局所限局癌の中寡分割・線量制約を中心に掲載。骨盤SIBは独立した施設検討として区別。",
      "topics": [
        "局所限局",
        "中寡分割",
        "骨盤リンパ節",
        "直腸",
        "ADT"
      ],
      "regimens": [
        {
          "label": "局所限局癌・根治EBRT",
          "dose": "60 Gy / 20 fr",
          "detail": "3.0 Gy/fr、IMRT/VMAT。局所限局N0M0での中寡分割。",
          "refs": [
            "astro-prostate26",
            "chhip16"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "局所限局癌・根治EBRT",
          "dose": "70 Gy / 28 fr",
          "detail": "2.5 Gy/fr。2026年ASTROガイドラインの選択肢。",
          "refs": [
            "astro-prostate26"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "局所限局癌・根治EBRT（UHF）",
          "dose": "36.25–40 Gy / 5 fr",
          "detail": "適応、IGRT、motion management、制約条件に注意。",
          "refs": [
            "astro-prostate26"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "骨盤SIB・院内検討案",
          "dose": "前立腺 60 Gy / 20 fr ＋ 骨盤LN 44–47 Gy / 20 fr",
          "detail": "超高リスク・一部高リスク・N1で検討した施設案。照射範囲・線量制約・エビデンスを別途確認。",
          "refs": [],
          "kind": "院内検討・未承認",
          "note": "陽性リンパ節51 Gy/20 fr案も検討歴あり。正式な院内承認プロトコールではない。"
        }
      ],
      "oar": [
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V40.8 Gy",
          "goal": "< 60%",
          "level": "CHHiPプロトコール",
          "refs": [
            "chhip-constraints20"
          ],
          "note": ""
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V48.6 Gy",
          "goal": "< 50%",
          "level": "CHHiPプロトコール",
          "refs": [
            "chhip-constraints20"
          ],
          "note": ""
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V52.8 Gy",
          "goal": "< 30%",
          "level": "CHHiPプロトコール",
          "refs": [
            "chhip-constraints20"
          ],
          "note": ""
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V57 Gy",
          "goal": "< 15%",
          "level": "CHHiPプロトコール",
          "refs": [
            "chhip-constraints20"
          ],
          "note": ""
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V60 Gy",
          "goal": "< 3%",
          "level": "CHHiPプロトコール",
          "refs": [
            "chhip-constraints20"
          ],
          "note": ""
        },
        {
          "organ": "膀胱",
          "regime": "60 Gy / 20 fr",
          "metric": "V40.8 Gy",
          "goal": "< 50%",
          "level": "CHHiPプロトコール",
          "refs": [
            "chhip-constraints20"
          ],
          "note": ""
        },
        {
          "organ": "膀胱",
          "regime": "60 Gy / 20 fr",
          "metric": "V48.6 Gy",
          "goal": "< 25%",
          "level": "CHHiPプロトコール",
          "refs": [
            "chhip-constraints20"
          ],
          "note": ""
        },
        {
          "organ": "膀胱",
          "regime": "60 Gy / 20 fr",
          "metric": "V60 Gy",
          "goal": "< 5%",
          "level": "CHHiPプロトコール",
          "refs": [
            "chhip-constraints20"
          ],
          "note": ""
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V20 Gy",
          "goal": "< 85%",
          "level": "CHHiP毒性解析由来の提案",
          "refs": [
            "chhip-anorectum20"
          ],
          "note": "プロトコール採用制約とは別の提案。"
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V30 Gy",
          "goal": "< 57%",
          "level": "CHHiP毒性解析由来の提案",
          "refs": [
            "chhip-anorectum20"
          ],
          "note": ""
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V40 Gy",
          "goal": "< 38%",
          "level": "CHHiP毒性解析由来の提案",
          "refs": [
            "chhip-anorectum20"
          ],
          "note": ""
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V50 Gy",
          "goal": "< 22%",
          "level": "CHHiP毒性解析由来の提案",
          "refs": [
            "chhip-anorectum20"
          ],
          "note": ""
        },
        {
          "organ": "直腸",
          "regime": "60 Gy / 20 fr",
          "metric": "V60 Gy",
          "goal": "< 0.01%",
          "level": "CHHiP毒性解析由来の提案",
          "refs": [
            "chhip-anorectum20"
          ],
          "note": "厳格な提案値。採用の是非は施設判断。"
        },
        {
          "organ": "直腸壁",
          "regime": "60 Gy / 20 fr",
          "metric": "V50 Gy",
          "goal": "≤ 30%（mandatory）",
          "level": "日本の前向き観察研究",
          "refs": [
            "japan-prostate25"
          ],
          "note": "直腸「壁」の値。直腸全体と混同しない。"
        },
        {
          "organ": "膀胱壁",
          "regime": "60 Gy / 20 fr",
          "metric": "V60 Gy",
          "goal": "≤ 15%（mandatory）",
          "level": "日本の前向き観察研究",
          "refs": [
            "japan-prostate25"
          ],
          "note": "膀胱「壁」の値。"
        }
      ],
      "systemic": [
        "ADT併用期間・ARPI追加の適応はリスク群、N病期、治療時期、国内承認を含めて個別に確認する。現ベータではレジメン詳細は未登録。"
      ],
      "toxicity": [
        "急性期：頻尿、排尿時痛、排便回数増加、直腸炎。晩期：血尿、直腸出血、尿路狭窄など。",
        "CTCAE gradeと鑑別疾患を確認し、薬剤・処置の選択は別途根拠確認する（治療アルゴリズム未登録）。"
      ],
      "outcomes": [
        {
          "title": "CHHiP 5年 biochemical/clinical failure-free",
          "value": "60 Gy/20 fr：90.6% / 74 Gy/37 fr：88.3%",
          "detail": "無作為化第III相試験集団（局所限局癌）。病期・リスク別一般予後ではない。",
          "refs": [
            "chhip16"
          ]
        }
      ],
      "guidance": [
        "2026 ASTRO/ASCO/AUA/ESTROの寡分割ガイドラインは局所限局N0M0対象。",
        "局所60 Gy/20 frと骨盤LN同時照射のエビデンスは同一視しない。",
        "直腸スペーサー・IGRT条件、各施設のCTV/PTV定義を確認。"
      ],
      "local": "当科の検討履歴：76 Gy/38 frから60 Gy/20 frへの移行。SpaceOAR→治療計画CT→約1週で開始の運用案。院内正式承認・日付は別途管理する。"
    },
    {
      "id": "nsclc",
      "name": "非小細胞肺癌",
      "group": "胸部",
      "aliases": [
        "NSCLC",
        "肺癌",
        "肺 SBRT",
        "肺臓炎",
        "ILD",
        "IPF"
      ],
      "status": "expanded",
      "summary": "根治CRT、早期SBRT、正常肺の通常分割制約を収録。ILD/IPF合併症例は特別なリスク評価が必要。",
      "topics": [
        "CRT",
        "SBRT",
        "肺臓炎",
        "V20",
        "IPF"
      ],
      "regimens": [
        {
          "label": "切除不能Stage III・根治CRT",
          "dose": "60 Gy / 30 fr",
          "detail": "2 Gy/fr、プラチナ併用CRT（適応選択）。RTOG 0617長期結果。",
          "refs": [
            "rtog0617"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "早期NSCLC・SBRT",
          "dose": "分割と線量は部位別に決定",
          "detail": "中枢型・超中枢型、胸壁近接、腫瘍径、呼吸移動などで別途検討。ベータでは処方値を一律登録しない。",
          "refs": [
            "astro-sbrt17"
          ],
          "kind": "標準・文献",
          "note": ""
        }
      ],
      "oar": [
        {
          "organ": "正常肺（両肺－GTV等）",
          "regime": "通常分割CRT",
          "metric": "V20 Gy",
          "goal": "≤ 30–35%（参考）",
          "level": "QUANTEC線量反応の参考目安",
          "refs": [
            "quantec-lung10"
          ],
          "note": "固定された安全閾値ではない。GTV差し引き等の定義も確認。"
        },
        {
          "organ": "正常肺（両肺－GTV等）",
          "regime": "通常分割CRT",
          "metric": "Mean lung dose",
          "goal": "≤ 20–23 Gy（参考）",
          "level": "QUANTEC線量反応の参考目安",
          "refs": [
            "quantec-lung10"
          ],
          "note": "RPリスク≤20%を意図した目安。"
        }
      ],
      "systemic": [
        "同時併用化学療法（例：プラチナ製剤＋他剤）は組織型・PS・腎機能等に応じ選択。",
        "CRT後の免疫療法については病期・分子異常・国内適応を最新ガイドラインで確認。具体的レジメンは未登録。"
      ],
      "toxicity": [
        "放射線肺臓炎：照射野、時期、感染症・薬剤性肺障害・腫瘍進展との鑑別が重要。",
        "ILD/IPF（蜂巣肺）では重篤・致死的肺障害のリスクが高く、一般的なV20等の制約を満たしても安全性は保証されない。"
      ],
      "outcomes": [
        {
          "title": "RTOG 0617・標準線量群の5年OS",
          "value": "32.1%（試験集団）",
          "detail": "切除不能Stage III、同時CRT試験。患者背景・後治療・時代によって異なるため個別予後に転用しない。",
          "refs": [
            "rtog0617"
          ]
        }
      ],
      "guidance": [
        "ILD/IPF合併例では「通常の肺DVH制約を満たす」ことだけで適応を判断しない。",
        "SBRTの中枢型と末梢型ではリスクが異なり、同じOAR制約・分割を適用しない。"
      ],
      "local": "検討履歴：蜂巣肺を伴うIPF合併肺癌に対する無症状時の予防的照射。照射利益と肺障害リスクの慎重な比較が必要。正式な院内プロトコールではない。"
    },
    {
      "id": "sclc",
      "name": "小細胞肺癌",
      "group": "胸部",
      "aliases": [
        "SCLC",
        "LD-SCLC",
        "PCI",
        "BID"
      ],
      "status": "partial",
      "summary": "限局型の胸部CRTを中心に収録。",
      "topics": [
        "限局型",
        "BID",
        "PCI"
      ],
      "regimens": [
        {
          "label": "限局型・胸部RT",
          "dose": "45 Gy / 30 fr（BID）",
          "detail": "1.5 Gy/frを1日2回、照射間隔は6時間以上、通常3週間。",
          "refs": [
            "astro-sclc20",
            "estro-sclc26"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "限局型・1日1回代替",
          "dose": "60–70 Gy / 30–35 fr",
          "detail": "2 Gy/fr。BID実施困難時の条件付き代替。",
          "refs": [
            "astro-sclc20"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "PCI（適応症例）",
          "dose": "25 Gy / 10 fr",
          "detail": "年齢、PS、MRIサーベイランスとの比較を含め適応決定。",
          "refs": [
            "astro-sclc20"
          ],
          "kind": "標準・文献",
          "note": ""
        }
      ],
      "oar": [],
      "systemic": [
        "プラチナ＋エトポシドを基盤とする集学的治療。時期・回数・免疫療法適応は最新情報との照合が必要。"
      ],
      "toxicity": [
        "食道炎・肺臓炎・血液毒性への注意。具体的な対処アルゴリズムは未登録。"
      ],
      "outcomes": [],
      "guidance": [
        "胸部照射は原則早期に開始し、照射期間延長を避ける。"
      ],
      "local": "過去検討：LD-SCLC 45 Gy/30 fr BID。"
    },
    {
      "id": "breast",
      "name": "乳癌",
      "group": "乳腺",
      "aliases": [
        "乳房",
        "WBI",
        "PMRT",
        "RNI"
      ],
      "status": "partial",
      "summary": "温存後・全摘後・領域リンパ節照射のメニュー。分割や適応の詳細は継続整備。",
      "topics": [
        "WBI",
        "PMRT",
        "RNI",
        "再建"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [
        "再建予定・ALND省略・断端陽性・RNIの適応を分けて検討。"
      ],
      "local": "検討履歴：温存後42.56 Gy/16 fr＋boost 10 Gy/5 fr、胸壁・傍鎖骨50.4 Gy/28 fr。これらは院内での利用歴であり一般推奨値として未登録。"
    },
    {
      "id": "brainmets",
      "name": "脳転移",
      "group": "中枢神経",
      "aliases": [
        "SRS",
        "FSRT",
        "定位照射",
        "WBRT"
      ],
      "status": "partial",
      "summary": "SRS/FSRT、WBRT、手術後照射。OAR制約は分割ごとに別表で整備予定。",
      "topics": [
        "SRS",
        "FSRT",
        "V12"
      ],
      "regimens": [],
      "oar": [
        {
          "organ": "脳組織（正常脳＋標的）",
          "regime": "SRS 1 fr",
          "metric": "V12 Gy",
          "goal": "≤ 10 cc（条件付き推奨）",
          "level": "ガイドライン",
          "refs": [
            "asco-brain22"
          ],
          "note": "出典の脳組織定義を要確認。5分割の制約ではない。"
        }
      ],
      "systemic": [],
      "toxicity": [
        "放射線壊死のリスク評価では照射体積・既照射・併用療法などを考慮。"
      ],
      "outcomes": [],
      "guidance": [
        "病変径・個数・部位・全身治療・予後を加味してSRS/FSRT/WBRTを選択。"
      ],
      "local": "検討履歴：脳転移30 Gy/5 frの症例。一般的推奨線量・OAR制約としては未登録。"
    },
    {
      "id": "glioma",
      "name": "原発性脳腫瘍",
      "group": "中枢神経",
      "aliases": [
        "膠芽腫",
        "GBM",
        "glioblastoma"
      ],
      "status": "skeleton",
      "summary": "膠芽腫など。",
      "topics": [
        "膠芽腫",
        "SIB"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [],
      "local": "検討履歴：膠芽腫Radixact SIB 30回、FLAIR high領域を含む計画。"
    },
    {
      "id": "hcc",
      "name": "肝細胞癌",
      "group": "消化器",
      "aliases": [
        "HCC",
        "肝癌",
        "Child Pugh",
        "VMAT"
      ],
      "status": "partial",
      "summary": "肝予備能を重視したRT、SBRT、15分割などを整備予定。",
      "topics": [
        "Child-Pugh",
        "SBRT",
        "VMAT",
        "肝臓"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [
        "Child-Pugh、非腫瘍肝の平均線量・残存肝体積、既治療歴が重要。"
      ],
      "outcomes": [],
      "guidance": [
        "正常肝の制約は分割・照射体積・肝予備能別に整理する（現在数値未登録）。"
      ],
      "local": "検討履歴：Child-Pugh AのHCCに対してVMAT 60 Gy/15 fr（均一D95）を検討。個別の検討案であり一般化しない。"
    },
    {
      "id": "pancreas",
      "name": "膵癌",
      "group": "消化器",
      "aliases": [
        "膵臓癌",
        "膵臓",
        "GEM",
        "S-1"
      ],
      "status": "skeleton",
      "summary": "CRT、SBRT、術前/術後RT。",
      "topics": [
        "CRT",
        "GEM",
        "S-1"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [],
      "local": "過去検討：膵癌CRTのGEM併用レジメン。"
    },
    {
      "id": "esophagus",
      "name": "食道癌",
      "group": "消化器",
      "aliases": [
        "ESCC",
        "食道"
      ],
      "status": "skeleton",
      "summary": "根治CRT、術前治療、緩和照射。",
      "topics": [
        "CRT"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [],
      "local": ""
    },
    {
      "id": "rectal",
      "name": "直腸癌",
      "group": "消化器",
      "aliases": [
        "直腸",
        "TNT",
        "SIB",
        "TS1"
      ],
      "status": "skeleton",
      "summary": "術前CRT、TNT、IMRT/SIB。",
      "topics": [
        "CRT",
        "SIB"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [],
      "local": "検討履歴：TS-1併用術前CRT、IMRT SIB。"
    },
    {
      "id": "headneck",
      "name": "頭頸部癌",
      "group": "頭頸部",
      "aliases": [
        "HNC",
        "HNSCC",
        "咽頭",
        "喉頭"
      ],
      "status": "skeleton",
      "summary": "根治CRT、術後照射、臓器温存。",
      "topics": [
        "CRT",
        "IMRT"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [],
      "local": ""
    },
    {
      "id": "cervix",
      "name": "子宮頸癌",
      "group": "婦人科",
      "aliases": [
        "頸癌",
        "CCRT",
        "IGBT"
      ],
      "status": "skeleton",
      "summary": "骨盤外照射・小線源治療。",
      "topics": [
        "CCRT",
        "IGBT"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [],
      "local": ""
    },
    {
      "id": "bladder",
      "name": "膀胱癌",
      "group": "泌尿器",
      "aliases": [
        "MIBC",
        "膀胱"
      ],
      "status": "skeleton",
      "summary": "膀胱温存CRT、局所緩和。",
      "topics": [
        "CRT"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [],
      "local": ""
    },
    {
      "id": "lymphoma",
      "name": "悪性リンパ腫",
      "group": "血液",
      "aliases": [
        "DLBCL",
        "HL",
        "ISRT"
      ],
      "status": "skeleton",
      "summary": "ISRT、病型別の照射。",
      "topics": [
        "ISRT",
        "DLBCL"
      ],
      "regimens": [],
      "oar": [],
      "systemic": [],
      "toxicity": [],
      "outcomes": [],
      "guidance": [],
      "local": "検討履歴：上顎洞DLBCL 45 Gy/25 fr症例。"
    },
    {
      "id": "bone",
      "name": "骨転移・緩和照射",
      "group": "転移・緩和",
      "aliases": [
        "骨転移",
        "疼痛",
        "脊髄圧迫",
        "8Gy"
      ],
      "status": "partial",
      "summary": "症候性骨転移の疼痛緩和照射。予防的照射とは区別。",
      "topics": [
        "疼痛",
        "緩和",
        "単回照射"
      ],
      "regimens": [
        {
          "label": "症候性骨転移・従来照射",
          "dose": "8 Gy / 1 fr",
          "detail": "症候性骨転移の緩和照射の選択肢。",
          "refs": [
            "astro-bone24"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "症候性骨転移・従来照射",
          "dose": "20 Gy / 5 fr",
          "detail": "症候性骨転移の緩和照射の選択肢。",
          "refs": [
            "astro-bone24"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "症候性骨転移・従来照射",
          "dose": "24 Gy / 6 fr",
          "detail": "症候性骨転移の緩和照射の選択肢。",
          "refs": [
            "astro-bone24"
          ],
          "kind": "標準・文献",
          "note": ""
        },
        {
          "label": "症候性骨転移・従来照射",
          "dose": "30 Gy / 10 fr",
          "detail": "症候性骨転移の緩和照射の選択肢。",
          "refs": [
            "astro-bone24"
          ],
          "kind": "標準・文献",
          "note": ""
        }
      ],
      "oar": [],
      "systemic": [],
      "toxicity": [
        "再照射・脊髄圧迫・病的骨折リスクは別個に評価。"
      ],
      "outcomes": [],
      "guidance": [
        "疼痛のない肺腫瘍等の「疼痛予防」照射にASTRO症候性骨転移の推奨をそのまま適用しない。"
      ],
      "local": ""
    }
  ],
  "schemaVersion": 1,
  "disclaimer": "ベータ版・診療支援用の個人リファレンス。実際の処方、線量制約、薬物選択では原典・施設プロトコール・患者固有条件を必ず確認すること。医学的助言の自動更新・患者情報の保存は行わない。"
};
