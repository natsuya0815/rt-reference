window.RT_CLINICAL = {
  "hcc": {
    "context": {
      "summary": "肝機能・消化管近接・呼吸性移動を分けて評価します。",
      "sections": [
        {
          "title": "適応",
          "text": "肝内限局で他の根治的治療の候補にならない場合、また局所治療後の不完全奏効・局所再発などで外照射を検討します。大血管浸潤や多発では他治療との順序を含め多職種で判断します。",
          "refs": [
            {
              "label": "ASTRO 原発性肝癌外照射ガイドライン KQ3・表6/7（2022）",
              "url": "https://doi.org/10.1016/j.prro.2021.09.004"
            }
          ],
          "items": []
        },
        {
          "title": "用語",
          "text": "GTV：肉眼的腫瘍体積。CTV：微小進展のリスクを含めた臨床標的体積。ITV：位置や形の内部変動を考慮した体積。PTV：標的を確実に覆うための計画上の体積。OAR：リスク臓器。",
          "refs": [],
          "items": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "肝細胞癌・中等度寡分割外照射",
          "dose": "45–67.5 Gy / 15 fr"
        },
        "summary": "ASTRO表6の報告線量範囲。個別症例の標準処方ではありません。",
        "sections": [
          {
            "title": "適応と処方",
            "text": "15回は肝機能や消化管近接を踏まえた選択肢。線量範囲を全例に適用しません。",
            "refs": [
              {
                "label": "ASTRO 原発性肝癌外照射ガイドライン KQ3・表6/7（2022）",
                "url": "https://doi.org/10.1016/j.prro.2021.09.004"
              }
            ],
            "items": []
          },
          {
            "title": "標的とマージン",
            "text": "多相造影CTやMRIでGTVと腫瘍栓の範囲を同定し、呼吸移動を計測して管理法を決めます。CTVの追加範囲・ITV/PTVマージンは病変、画像誘導、呼吸管理で異なるため、固定値にしません。",
            "refs": [
              {
                "label": "ASTRO 原発性肝癌外照射ガイドライン KQ3・表6/7（2022）",
                "url": "https://doi.org/10.1016/j.prro.2021.09.004"
              }
            ],
            "items": []
          },
          {
            "title": "OAR：15回、ASTRO表7のみ",
            "text": "非腫瘍肝は全肝からGTVを除いた体積。表7はエビデンスと専門家意見による出発点で、個別判断が必要です。",
            "refs": [
              {
                "label": "ASTRO 原発性肝癌外照射ガイドライン KQ3・表6/7（2022）",
                "url": "https://doi.org/10.1016/j.prro.2021.09.004"
              }
            ],
            "items": [
              "非腫瘍肝の平均線量：非肝硬変 <24 Gy、Child–Pugh A <20 Gy、Child–Pugh B7 <16 Gy。",
              "胃 D0.03 cc <42 Gy、十二指腸・小腸・大腸 それぞれ D0.03 cc <45 Gy。",
              "中心胆管・肺・腎の15回数値はこの表にはありません。別分割から自動換算しません。"
            ]
          },
          {
            "title": "用語",
            "text": "GTV：肉眼的腫瘍体積。CTV：微小進展のリスクを含めた臨床標的体積。ITV：位置や形の内部変動を考慮した体積。PTV：標的を確実に覆うための計画上の体積。OAR：リスク臓器。",
            "refs": [],
            "items": []
          }
        ]
      }
    ]
  },
  "pancreas": {
    "context": {
      "summary": "切除可能性と治療時期を分けて参照します。",
      "sections": [
        {
          "title": "適応",
          "text": "ASTRO 2026は、局所進行膵管腺癌で多剤併用化学療法後の根治目的RT/CRTを推奨しています。切除境界例、術後、緩和では適応と標的が異なります。",
          "refs": [
            {
              "label": "ASTRO 膵癌放射線治療ガイドライン（2026）",
              "url": "https://www.astro.org/provider-resources/guidelines/clinical-practice-guidelines/pancreatic-cancer-gl"
            }
          ],
          "items": []
        },
        {
          "title": "用語",
          "text": "GTV：肉眼的腫瘍体積。CTV：微小進展のリスクを含めた臨床標的体積。ITV：位置や形の内部変動を考慮した体積。PTV：標的を確実に覆うための計画上の体積。OAR：リスク臓器。",
          "refs": [],
          "items": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "局所進行・根治的通常分割CRT",
          "dose": "50.4–54 Gy / 28–30 fr"
        },
        "summary": "切除不能・局所進行の通常分割CRT。1.8 Gy/回。",
        "sections": [
          {
            "title": "適応・出典",
            "text": "線量はeviQの切除不能例用通常分割プロトコル。適応の判断にはASTRO 2026も参照し、予防領域の考え方など各文書の違いを区別します。術後、PREOPANCの短期術前照射、SBRTには適用しません。",
            "refs": [
              {
                "label": "ASTRO 膵癌放射線治療ガイドライン（2026）",
                "url": "https://www.astro.org/provider-resources/guidelines/clinical-practice-guidelines/pancreatic-cancer-gl"
              },
              {
                "label": "eviQ 3581：膵癌の根治・術前化学放射線療法",
                "url": "https://www.eviq.org.au/radiation-oncology/upper-gastrointestinal/3581-pancreas-definitive-neoadjuvant-ebrt-chemorad"
              }
            ],
            "items": []
          },
          {
            "title": "GTV・標的マージン（eviQ例）",
            "text": "GTVは画像上の原発と病的リンパ節。4DCTのiGTVを用いる経路ではiGTV＋5 mmをITV、ITV＋5–10 mmをPTVとするeviQ例があります。固定値ではなく、用いる呼吸管理・施設のセットアップ精度を確認します。微小進展の被覆は適応と採用プロトコルの原典に従います。",
            "refs": [
              {
                "label": "eviQ 3581：膵癌の根治・術前化学放射線療法",
                "url": "https://www.eviq.org.au/radiation-oncology/upper-gastrointestinal/3581-pancreas-definitive-neoadjuvant-ebrt-chemorad"
              },
              {
                "label": "ASTRO 膵癌放射線治療ガイドライン（2026）",
                "url": "https://www.astro.org/provider-resources/guidelines/clinical-practice-guidelines/pancreatic-cancer-gl"
              }
            ],
            "items": []
          },
          {
            "title": "OAR：eviQ 3581 通常分割",
            "text": "小腸ループと腸管腔は別構造です。胃・十二指腸・小腸ループの輪郭はeviQが参照するRTOG上腹部コンセンサスを確認してください。",
            "refs": [
              {
                "label": "eviQ 3581：膵癌の根治・術前化学放射線療法",
                "url": "https://www.eviq.org.au/radiation-oncology/upper-gastrointestinal/3581-pancreas-definitive-neoadjuvant-ebrt-chemorad"
              }
            ],
            "items": [
              "Bowel cavity：可能なら V45 Gy <195 cc。小腸ループ：V15 Gy <120 cc。",
              "十二指腸：V55 Gy <15 cc、D15% <45 Gyはリスクと便益を踏まえて検討。胃は高線量域を回避。",
              "脊髄（脊柱管ではない）：最大線量 ≤45 Gy。加速寡分割やSBRTへ流用しません。"
            ]
          },
          {
            "title": "用語",
            "text": "GTV：肉眼的腫瘍体積。CTV：微小進展のリスクを含めた臨床標的体積。ITV：位置や形の内部変動を考慮した体積。PTV：標的を確実に覆うための計画上の体積。OAR：リスク臓器。",
            "refs": [],
            "items": []
          }
        ]
      }
    ]
  },
  "bladder": {
    "context": {
      "summary": "筋層浸潤性膀胱癌の膀胱温存照射と、緩和照射を区別します。",
      "sections": [
        {
          "title": "適応",
          "text": "選択した局所例で最大限のTURBT、同時化学療法、外照射を組み合わせ、治療後も膀胱鏡を含め追跡します。膀胱温存と膀胱全摘の適否を多職種で検討します。",
          "refs": [
            {
              "label": "eviQ 1025：膀胱癌の根治的外照射",
              "url": "https://www.eviq.org.au/radiation-oncology/urogenital/bladder/1025-bladder-carcinoma-definitive-ebrt-with-or-wit"
            },
            {
              "label": "BC2001：化学放射線療法の10年追跡",
              "url": "https://pubmed.ncbi.nlm.nih.gov/35577644/"
            }
          ],
          "items": []
        },
        {
          "title": "用語",
          "text": "GTV：肉眼的腫瘍体積。CTV：微小進展のリスクを含めた臨床標的体積。ITV：位置や形の内部変動を考慮した体積。PTV：標的を確実に覆うための計画上の体積。OAR：リスク臓器。",
          "refs": [],
          "items": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "筋層浸潤性膀胱癌・全膀胱温存照射",
          "dose": "55 Gy / 20 fr"
        },
        "summary": "N0M0の膀胱単独照射の選択肢。予防骨盤リンパ節照射・SIBとは別。",
        "sections": [
          {
            "title": "適応と処方",
            "text": "BC2001・BCONの個人データ統合解析では、55 Gy/20回と64 Gy/32回を比較。分割は患者単位で無作為化していません。BC2001の同時併用薬は5-FU＋マイトマイシンCです。",
            "refs": [
              {
                "label": "BC2001・BCON：個人データ統合解析（2021）",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7851111/"
              },
              {
                "label": "BC2001：化学放射線療法の10年追跡",
                "url": "https://pubmed.ncbi.nlm.nih.gov/35577644/"
              },
              {
                "label": "eviQ 1025：膀胱癌の根治的外照射",
                "url": "https://www.eviq.org.au/radiation-oncology/urogenital/bladder/1025-bladder-carcinoma-definitive-ebrt-with-or-wit"
              }
            ],
            "items": []
          },
          {
            "title": "GTV・CTV・PTV（eviQ・単一線量レベル）",
            "text": "GTVはTURBT後の残存病変・膀胱外浸潤（完全切除なら既知の腫瘍部位）。CTVは全膀胱と、肉眼的膀胱外浸潤がある場合はそこに5 mmを加えた範囲を含めます。膀胱頸部・尿管口などは別途確認。PTVは膀胱の充満変化、方向、画像誘導に応じる異方性マージンで、原典と施設基準を参照します。",
            "refs": [
              {
                "label": "eviQ 1025：膀胱癌の根治的外照射",
                "url": "https://www.eviq.org.au/radiation-oncology/urogenital/bladder/1025-bladder-carcinoma-definitive-ebrt-with-or-wit"
              }
            ],
            "items": []
          },
          {
            "title": "OAR：eviQ 1025・20回欄",
            "text": "小腸はALARA（合理的に達成可能な限り低く）としホットスポットを避けます。RAIDER適応照射の表とは別です。",
            "refs": [
              {
                "label": "eviQ 1025：膀胱癌の根治的外照射",
                "url": "https://www.eviq.org.au/radiation-oncology/urogenital/bladder/1025-bladder-carcinoma-definitive-ebrt-with-or-wit"
              }
            ],
            "items": [
              "直腸 V44 Gy <50%。直腸外壁は直腸S状結腸移行からCTV下縁より1.5 cm尾側まで（近位PTV端を少なくとも0.5 cm超えるよう頭側範囲も確認）。",
              "大腿骨頭 V44 Gy <10%。原典では寛骨臼から照射野下端まで大腿骨を輪郭化。"
            ]
          },
          {
            "title": "用語",
            "text": "TURBT：経尿道的膀胱腫瘍切除。TMT：TURBT、照射、同時増感療法を組み合わせる温存治療。",
            "refs": [],
            "items": []
          },
          {
            "title": "用語",
            "text": "GTV：肉眼的腫瘍体積。CTV：微小進展のリスクを含めた臨床標的体積。ITV：位置や形の内部変動を考慮した体積。PTV：標的を確実に覆うための計画上の体積。OAR：リスク臓器。",
            "refs": [],
            "items": []
          }
        ]
      }
    ]
  },
  "esophagus": {
    "context": {
      "summary": "胸部食道・食道胃接合部の根治CRTと術前CRTは、照射線量・治療目的を区別する。",
      "sections": [
        {
          "title": "適応と線量の参照例",
          "text": "根治同時CRTのeviQ例は50.4 Gy/28回（別の選択肢に50 Gy/25回）。手術を予定する術前CRTは41.4 Gy/23回の別プロトコール。頸部食道はこの胸部プロトコールを流用しない。",
          "refs": [
            {
              "label": "eviQ 1865：食道癌根治CRT",
              "url": "https://www.eviq.org.au/p/1865"
            },
            {
              "label": "eviQ 1861：食道癌術前CRT",
              "url": "https://www.eviq.org.au/p/1861"
            }
          ]
        },
        {
          "title": "胸部食道の標的：根治eviQ",
          "text": "GTVpは原発、GTVnは病的リンパ節。原発CTVは長軸側3 cm（解剖に沿い調整）、全周0.5–1 cm、GTVnは0.5–1 cm（解剖学的境界を考慮）。下部／接合部病変では胃噴門側2–3 cmを含める考え方。選択的リンパ節照射は論点で、全例に同一範囲ではない。PTVはeviQではCTV＋0.5–1 cmを参考とし、施設の設定誤差評価に従う。",
          "refs": [
            {
              "label": "eviQ 1865：食道癌根治CRT",
              "url": "https://www.eviq.org.au/p/1865"
            }
          ]
        },
        {
          "title": "OAR：別治療への外挿を避ける",
          "text": "肺、心臓、脊髄を確認し、下部病変では腎・肝なども照射野に応じて評価する。臓器の輪郭、照射目的、分割数が一致する原表を参照し、頸部食道や再照射には流用しない。",
          "refs": [
            {
              "label": "eviQ 1865：食道癌根治CRT",
              "url": "https://www.eviq.org.au/p/1865"
            }
          ]
        },
        {
          "title": "用語",
          "text": "GTV：肉眼的病変。CTV：病変と臨床的に治療対象とする潜在的進展域。PTV：位置・設定の不確実性を含める計画用体積。OAR：リスク臓器。Vx：x Gy以上を受ける体積。%とccは区別する。",
          "refs": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "胸部食道癌・根治的同時CRT",
          "dose": "50.4 Gy / 28 fr",
          "pathwayId": "p026",
          "pathwayDose": "50.4 Gy/28回",
          "pathwayTitle": "根治的CRT（欧米の典型）"
        },
        "summary": "胸部食道の根治的CRT。術前CRT、頸部病変や再照射と区別。",
        "sections": [
          {
            "title": "適応と線量の参照例",
            "text": "根治同時CRTのeviQ例は50.4 Gy/28回（別の選択肢に50 Gy/25回）。手術を予定する術前CRTは41.4 Gy/23回の別プロトコール。頸部食道はこの胸部プロトコールを流用しない。",
            "refs": [
              {
                "label": "eviQ 1865：食道癌根治CRT",
                "url": "https://www.eviq.org.au/p/1865"
              },
              {
                "label": "eviQ 1861：食道癌術前CRT",
                "url": "https://www.eviq.org.au/p/1861"
              }
            ]
          },
          {
            "title": "胸部食道の標的：根治eviQ",
            "text": "GTVpは原発、GTVnは病的リンパ節。原発CTVは長軸側3 cm（解剖に沿い調整）、全周0.5–1 cm、GTVnは0.5–1 cm（解剖学的境界を考慮）。下部／接合部病変では胃噴門側2–3 cmを含める考え方。選択的リンパ節照射は論点で、全例に同一範囲ではない。PTVはeviQではCTV＋0.5–1 cmを参考とし、施設の設定誤差評価に従う。",
            "refs": [
              {
                "label": "eviQ 1865：食道癌根治CRT",
                "url": "https://www.eviq.org.au/p/1865"
              }
            ]
          },
          {
            "title": "OAR：別治療への外挿を避ける",
            "text": "肺、心臓、脊髄を確認し、下部病変では腎・肝なども照射野に応じて評価する。臓器の輪郭、照射目的、分割数が一致する原表を参照し、頸部食道や再照射には流用しない。",
            "refs": [
              {
                "label": "eviQ 1865：食道癌根治CRT",
                "url": "https://www.eviq.org.au/p/1865"
              }
            ]
          },
          {
            "title": "OAR：根治CRTのeviQプロトコル",
            "text": "左右合計の肺：V20 Gy <30%、平均 <20 Gy、V5 Gy <60%（V20低減を優先）。心臓 V40 Gy <30%。脊髄最大 <45 Gy。小腸ループは最大 <50 Gy・高線量域を回避。輪郭は原典の胸部・上腹部アトラスを参照し、心臓と心膜、脊髄と脊髄PRVを同一に扱わない。",
            "refs": [
              {
                "label": "eviQ 1865：Organs at risk",
                "url": "https://www.eviq.org.au/p/1865"
              }
            ]
          },
          {
            "title": "用語",
            "text": "GTV：肉眼的病変。CTV：病変と臨床的に治療対象とする潜在的進展域。PTV：位置・設定の不確実性を含める計画用体積。OAR：リスク臓器。Vx：x Gy以上を受ける体積。%とccは区別する。",
            "refs": []
          }
        ]
      }
    ]
  },
  "rectal": {
    "context": {
      "summary": "局所進行直腸癌の術前治療ではMRIリスク、TNT、切除断端や臓器温存目標を踏まえて短期照射・長期CRT・選択的省略を区別する。",
      "sections": [
        {
          "title": "適応・手順",
          "text": "長期CRTはとくに腫瘍縮小を重視する条件で検討する。TNTでは放射線と全身治療の順序をMDTで判断する。全症例にSIBを適用しない。",
          "refs": [
            {
              "label": "ASTRO：直腸癌ガイドライン改訂",
              "url": "https://www.astro.org/provider-resources/guidelines/clinical-practice-guidelines/rectal-cancer-guideline"
            },
            {
              "label": "eviQ 1863：直腸癌術前長期CRT",
              "url": "https://www.eviq.org.au/p/1863"
            }
          ]
        },
        {
          "title": "輪郭の原則",
          "text": "GTVpは画像・診察による原発巣、GTVnは肉眼的リンパ節病変。RCR術前予防域は直腸間膜・仙骨前・内腸骨・閉鎖領域を基本とし、進展部位に応じ下方や他のリンパ節域を追加検討。ICTVは臓器移動を見込むCTVで、別のCTV定義・PTVマージンと混用しない。",
          "refs": [
            {
              "label": "RCR 2021：直腸癌IMRT技術指針",
              "url": "https://www.rcr.ac.uk/media/bl5bwedb/rcr-publications_national-rectal-cancer-intensity-modulated-radiotherapy-imrt-guidance_january-2021.pdf"
            }
          ]
        },
        {
          "title": "用語",
          "text": "GTV：肉眼的病変。CTV：病変と臨床的に治療対象とする潜在的進展域。PTV：位置・設定の不確実性を含める計画用体積。OAR：リスク臓器。Vx：x Gy以上を受ける体積。%とccは区別する。",
          "refs": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "術前CRT：IMRT-SIB＋カペシタビンD法",
          "dose": "骨盤45 Gy/25 fr＋原発巣50 Gy/25 fr"
        },
        "summary": "45 Gy/25回の選択領域と50 Gy/25回の高線量標的を同時照射する術前の処方例。",
        "sections": [
          {
            "title": "高線量標的：RCR方式",
            "text": "GTVp_Boost＋10 mm（前方可動性が大きい場合は前方15 mmを検討）、GTVn_Boost＋5 mmを合わせてICTV_highとする。対象とする転移節の選択は治療計画上の判断。PTV設定はRCRのIGRT条件と施設プロトコールを確認する。",
            "refs": [
              {
                "label": "RCR 2021：直腸癌IMRT技術指針",
                "url": "https://www.rcr.ac.uk/media/bl5bwedb/rcr-publications_national-rectal-cancer-intensity-modulated-radiotherapy-imrt-guidance_january-2021.pdf"
              }
            ]
          },
          {
            "title": "OAR：RCR長期IMRTの小腸ループ",
            "text": "個々の小腸ループを描出してまとめたBowel_Loops輪郭に対し、RCR長期IMRT表のD0.5ccは＜52.5 Gy。D0.5ccは線量の高い0.5 ccにおける最小線量の指標。Bowel cavity（腸管が移動し得る腹腔内領域）と小腸ループは別輪郭のため、この数値を相互に流用しない。",
            "refs": [
              {
                "label": "RCR 2021：直腸癌IMRT技術指針",
                "url": "https://www.rcr.ac.uk/media/bl5bwedb/rcr-publications_national-rectal-cancer-intensity-modulated-radiotherapy-imrt-guidance_january-2021.pdf"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "術前CRT：逐次boost＋カペシタビンD法",
          "dose": "45 Gy/25 fr＋5.4 Gy/3 fr（合計50.4 Gy/28 fr）"
        },
        "summary": "術前長期CRTで45 Gy/25回の初期照射後、原発周囲の標的に5.4 Gy/3回を追加する例。SIBとは別。",
        "sections": [
          {
            "title": "初期照射と追加照射",
            "text": "初期相と追加相のCTV/PTVは別に定義する。eviQでは追加相GTVは肉眼病変および腫瘍領域に対応する仙骨前域を記載。臨床病期、位置、TNT計画を確認し、MRI・初診時画像も参照する。",
            "refs": [
              {
                "label": "eviQ 1863：直腸癌術前長期CRT",
                "url": "https://www.eviq.org.au/p/1863"
              },
              {
                "label": "ASTRO：直腸癌ガイドライン改訂",
                "url": "https://www.astro.org/provider-resources/guidelines/clinical-practice-guidelines/rectal-cancer-guideline"
              }
            ]
          },
          {
            "title": "OARの確認",
            "text": "小腸、膀胱、大腿骨頭などは両相を合成したDVHで評価する。25回SIB由来の制約を28回逐次法に自動コピーしない。",
            "refs": [
              {
                "label": "eviQ 1863：直腸癌術前長期CRT",
                "url": "https://www.eviq.org.au/p/1863"
              }
            ]
          }
        ]
      }
    ]
  },
  "headneck": {
    "context": {
      "summary": "頭頸部癌は部位と治療目的を明示してから個別プロトコールを参照する。以下は中咽頭扁平上皮癌の根治照射例。",
      "sections": [
        {
          "title": "適応と処方を分ける",
          "text": "中咽頭扁平上皮癌根治のeviQ例は高線量PTVに70 Gy/35回のSIB。原発亜部位、病期、HPV関連性、手術歴、薬物療法適応で方針が変わる。上咽頭・喉頭・術後等の別部位／別目的へは流用しない。",
          "refs": [
            {
              "label": "eviQ 5049：中咽頭扁平上皮癌根治照射",
              "url": "https://www.eviq.org.au/p/5049"
            }
          ]
        },
        {
          "title": "中咽頭根治の標的例",
          "text": "GTVpは診察・画像・内視鏡による原発肉眼病変、GTVnは肉眼的節病変。eviQ高線量CTVはそれぞれGTV＋5 mmを解剖学的境界で調整。高線量PTVは同プロトコールでCTV＋3–5 mm（施設の条件による）。中・低線量CTVの適応や片側／両側頸部の選択は別に判定。",
          "refs": [
            {
              "label": "eviQ 5049：中咽頭扁平上皮癌根治照射",
              "url": "https://www.eviq.org.au/p/5049"
            }
          ]
        },
        {
          "title": "OARと用語",
          "text": "脊髄、脳幹、耳下腺、口腔・嚥下関連臓器などを対象に、部位別の原表を用いる。PRVは臓器位置などの不確実性を考慮した計画上の補助輪郭で、OAR本体と区別する。",
          "refs": [
            {
              "label": "eviQ 5049：中咽頭扁平上皮癌根治照射",
              "url": "https://www.eviq.org.au/p/5049"
            }
          ]
        },
        {
          "title": "用語",
          "text": "GTV：肉眼的病変。CTV：病変と臨床的に治療対象とする潜在的進展域。PTV：位置・設定の不確実性を含める計画用体積。OAR：リスク臓器。Vx：x Gy以上を受ける体積。%とccは区別する。",
          "refs": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "中咽頭扁平上皮癌・根治照射 SIB",
          "dose": "高線量PTV 70 Gy / 35 fr"
        },
        "summary": "中咽頭扁平上皮癌の代表的な高線量PTV処方。",
        "sections": [
          {
            "title": "適応と処方を分ける",
            "text": "中咽頭扁平上皮癌根治のeviQ例は高線量PTVに70 Gy/35回のSIB。原発亜部位、病期、HPV関連性、手術歴、薬物療法適応で方針が変わる。上咽頭・喉頭・術後等の別部位／別目的へは流用しない。",
            "refs": [
              {
                "label": "eviQ 5049：中咽頭扁平上皮癌根治照射",
                "url": "https://www.eviq.org.au/p/5049"
              }
            ]
          },
          {
            "title": "中咽頭根治の標的例",
            "text": "GTVpは診察・画像・内視鏡による原発肉眼病変、GTVnは肉眼的節病変。eviQ高線量CTVはそれぞれGTV＋5 mmを解剖学的境界で調整。高線量PTVは同プロトコールでCTV＋3–5 mm（施設の条件による）。中・低線量CTVの適応や片側／両側頸部の選択は別に判定。",
            "refs": [
              {
                "label": "eviQ 5049：中咽頭扁平上皮癌根治照射",
                "url": "https://www.eviq.org.au/p/5049"
              }
            ]
          },
          {
            "title": "OARと用語",
            "text": "脊髄、脳幹、耳下腺、口腔・嚥下関連臓器などを対象に、部位別の原表を用いる。PRVは臓器位置などの不確実性を考慮した計画上の補助輪郭で、OAR本体と区別する。",
            "refs": [
              {
                "label": "eviQ 5049：中咽頭扁平上皮癌根治照射",
                "url": "https://www.eviq.org.au/p/5049"
              }
            ]
          },
          {
            "title": "OAR：通常分割の計画目標",
            "text": "eviQ表：脊髄本体は理想最大 ≤45 Gy。耳下腺は左右を別々に輪郭化し少なくとも片側の平均 ≤26 Gyを目標（両側とも低減）。咽頭収縮筋群の平均 ≤50 Gyを目標。PRVに同じ数値を置き換えず、個別筋の指標と群全体を区別。",
            "refs": [
              {
                "label": "eviQ 5049：通常分割のOAR表",
                "url": "https://www.eviq.org.au/p/5049"
              }
            ]
          },
          {
            "title": "用語",
            "text": "GTV：肉眼的病変。CTV：病変と臨床的に治療対象とする潜在的進展域。PTV：位置・設定の不確実性を含める計画用体積。OAR：リスク臓器。Vx：x Gy以上を受ける体積。%とccは区別する。",
            "refs": []
          }
        ]
      }
    ]
  },
  "cervix": {
    "context": {
      "summary": "局所進行子宮頸癌の根治治療は外照射＋同時プラチナ製剤＋画像誘導小線源治療が基本。術後や中央遮蔽を用いる枠組みとは分ける。",
      "sections": [
        {
          "title": "根治外照射の位置づけ",
          "text": "ESGO/ESTRO/ESPでは骨盤IMRT/VMATとして45 Gy/25回または46 Gy/23回を示す。画像誘導小線源治療は根治コースの構成要素で、原発への外照射ブーストで代用しない。画像陽性リンパ節への追加照射は原発部とは別に判断。",
          "refs": [
            {
              "label": "ESGO/ESTRO/ESP 2023：子宮頸癌",
              "url": "https://link.springer.com/article/10.1007/s00428-023-03552-3"
            }
          ]
        },
        {
          "title": "外照射と小線源で標的名を分離",
          "text": "外照射は原発肉眼病変と子宮頸部・子宮・傍子宮組織、浸潤に応じた腟およびリスクに応じる領域リンパ節を評価。CTV→PTVでは子宮・頸部の膀胱充満による移動と日々の位置合わせを考慮する。小線源のGTV-Tresは治療時の残存肉眼病変、CTV-T HRは子宮頸部全体と残存進展、CTV-T IRは初診時進展を考慮した中間リスク標的。",
          "refs": [
            {
              "label": "ESGO/ESTRO/ESP 2023：子宮頸癌",
              "url": "https://link.springer.com/article/10.1007/s00428-023-03552-3"
            },
            {
              "label": "ASTRO：子宮頸癌放射線治療ガイドライン",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8802172/"
            }
          ]
        },
        {
          "title": "小線源のOAR：累積評価",
          "text": "膀胱・直腸・S状結腸・腸管は輪郭ごとに外照射と小線源の線量を累積EQD2で評価する。D2cc（最も高線量の2 ccにおける最小線量）と標的D90を区別し、外照射単独のGy表に混ぜない。",
          "refs": [
            {
              "label": "ESGO/ESTRO/ESP 2023：子宮頸癌",
              "url": "https://link.springer.com/article/10.1007/s00428-023-03552-3"
            },
            {
              "label": "ASTRO：子宮頸癌放射線治療ガイドライン",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8802172/"
            }
          ]
        },
        {
          "title": "用語",
          "text": "GTV：肉眼的病変。CTV：病変と臨床的に治療対象とする潜在的進展域。PTV：位置・設定の不確実性を含める計画用体積。OAR：リスク臓器。Vx：x Gy以上を受ける体積。%とccは区別する。",
          "refs": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "子宮頸癌・根治的骨盤外照射（小線源併用）",
          "dose": "45 Gy / 25 fr"
        },
        "summary": "根治コースの骨盤外照射部分。小線源分の線量は含めません。",
        "sections": [
          {
            "title": "根治外照射の位置づけ",
            "text": "ESGO/ESTRO/ESPでは骨盤IMRT/VMATとして45 Gy/25回または46 Gy/23回を示す。画像誘導小線源治療は根治コースの構成要素で、原発への外照射ブーストで代用しない。画像陽性リンパ節への追加照射は原発部とは別に判断。",
            "refs": [
              {
                "label": "ESGO/ESTRO/ESP 2023：子宮頸癌",
                "url": "https://link.springer.com/article/10.1007/s00428-023-03552-3"
              }
            ]
          },
          {
            "title": "外照射と小線源で標的名を分離",
            "text": "外照射は原発肉眼病変と子宮頸部・子宮・傍子宮組織、浸潤に応じた腟およびリスクに応じる領域リンパ節を評価。CTV→PTVでは子宮・頸部の膀胱充満による移動と日々の位置合わせを考慮する。小線源のGTV-Tresは治療時の残存肉眼病変、CTV-T HRは子宮頸部全体と残存進展、CTV-T IRは初診時進展を考慮した中間リスク標的。",
            "refs": [
              {
                "label": "ESGO/ESTRO/ESP 2023：子宮頸癌",
                "url": "https://link.springer.com/article/10.1007/s00428-023-03552-3"
              },
              {
                "label": "ASTRO：子宮頸癌放射線治療ガイドライン",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8802172/"
              }
            ]
          },
          {
            "title": "小線源のOAR：累積評価",
            "text": "膀胱・直腸・S状結腸・腸管は輪郭ごとに外照射と小線源の線量を累積EQD2で評価する。D2cc（最も高線量の2 ccにおける最小線量）と標的D90を区別し、外照射単独のGy表に混ぜない。",
            "refs": [
              {
                "label": "ESGO/ESTRO/ESP 2023：子宮頸癌",
                "url": "https://link.springer.com/article/10.1007/s00428-023-03552-3"
              },
              {
                "label": "ASTRO：子宮頸癌放射線治療ガイドライン",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8802172/"
              }
            ]
          },
          {
            "title": "OAR：外照射と小線源を区別",
            "text": "骨盤外照射では直腸、膀胱、S状結腸、小腸などの照射範囲を評価。小線源加算後のD2cc目標を、この45 Gy/25回単独のDVH制約として使いません。外照射単独の制約は採用プロトコールと輪郭の一致を確認してください。",
            "refs": [
              {
                "label": "ESGO/ESTRO/ESP 2023：原文ガイドライン",
                "url": "https://link.springer.com/article/10.1007/s00428-023-03552-3"
              }
            ]
          },
          {
            "title": "用語",
            "text": "GTV：肉眼的病変。CTV：病変と臨床的に治療対象とする潜在的進展域。PTV：位置・設定の不確実性を含める計画用体積。OAR：リスク臓器。Vx：x Gy以上を受ける体積。%とccは区別する。",
            "refs": []
          }
        ]
      }
    ]
  },
  "brainmets": {
    "context": {
      "summary": "未切除脳転移に対する5分割定位照射（30 Gy / 5 frは選択肢）の計画情報。術後腔・全脳照射・再照射は別に判断。",
      "sections": [
        {
          "title": "適応：30 Gy / 5 fr",
          "text": "ASTROのASCO承認勧告では、未切除病変の最大径2 cm以上3 cm未満で単回18 Gyまたは3～5分割定位照射（例：27 Gy / 3 fr、30 Gy / 5 fr）を条件付き推奨。病変径・個数に加えて総体積、重要構造への近接と手術適応を確認する。",
          "refs": [
            {
              "label": "ASCOによるASTRO脳転移ガイドラインの承認（2022）",
              "url": "https://ascopubs.org/doi/10.1200/JCO.22.00333"
            }
          ]
        },
        {
          "title": "標的：未切除病変",
          "text": "GTV＝画像で同定した転移巣。eviQの非侵襲固定では独立したCTVを設けず、PTV＝GTV＋0～2 mm。装置・固定・画像照合の精度に合わせる。術後腔の定義には転用しない。",
          "refs": [
            {
              "label": "eviQ 3253：Target volumes",
              "url": "https://www.eviq.org.au/radiation-oncology/palliative/3253-brain-metastases-palliative-ebrt-stereotactic"
            }
          ]
        },
        {
          "title": "OAR：eviQ 3253の5分割欄",
          "text": "標的を含む脳はV24 Gy ≤20 cc。別定義の脳−GTVではV25 Gy <16 cc、V30 Gy <10 cc。脳幹（中脳・橋、延髄別）はD0.035 cc ≤23 Gy（理想）／≤31 Gy（許容）。視交叉・視神経はD0.035 cc ≤22.5 Gy（理想）／≤25 Gy（必須）。水晶体はALARA（同表に固定値なし）。単回V12や別輪郭の数値とは置換不可。既照射ではそのまま適用しない。",
          "refs": [
            {
              "label": "eviQ 3253：Organs at risk",
              "url": "https://www.eviq.org.au/radiation-oncology/palliative/3253-brain-metastases-palliative-ebrt-stereotactic"
            }
          ]
        },
        {
          "title": "用語",
          "text": "SRS＝定位放射線照射、FSRT＝分割定位放射線治療。Vx Gy＝x Gy以上を受ける体積。D0.035 cc＝最高線量側0.035 ccの線量指標で、単一ボクセルDmaxとは異なる。ALARA＝合理的に達成可能な限り低く。",
          "refs": [
            {
              "label": "eviQ 3253：OAR notes",
              "url": "https://www.eviq.org.au/radiation-oncology/palliative/3253-brain-metastases-palliative-ebrt-stereotactic"
            }
          ]
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "未切除脳転移・5分割定位照射",
          "dose": "30 Gy / 5 fr"
        },
        "summary": "最大径2 cm以上3 cm未満の未切除脳転移に対するASTROの条件付き選択肢。術後腔・再照射には転用しない。",
        "sections": [
          {
            "title": "適応：30 Gy / 5 fr",
            "text": "ASTROのASCO承認勧告では、未切除病変の最大径2 cm以上3 cm未満で単回18 Gyまたは3～5分割定位照射（例：27 Gy / 3 fr、30 Gy / 5 fr）を条件付き推奨。病変径・個数に加えて総体積、重要構造への近接と手術適応を確認する。",
            "refs": [
              {
                "label": "ASCOによるASTRO脳転移ガイドラインの承認（2022）",
                "url": "https://ascopubs.org/doi/10.1200/JCO.22.00333"
              }
            ]
          },
          {
            "title": "標的：未切除病変",
            "text": "GTV＝画像で同定した転移巣。eviQの非侵襲固定では独立したCTVを設けず、PTV＝GTV＋0～2 mm。装置・固定・画像照合の精度に合わせる。術後腔の定義には転用しない。",
            "refs": [
              {
                "label": "eviQ 3253：Target volumes",
                "url": "https://www.eviq.org.au/radiation-oncology/palliative/3253-brain-metastases-palliative-ebrt-stereotactic"
              }
            ]
          },
          {
            "title": "OAR：eviQ 3253の5分割欄",
            "text": "標的を含む脳はV24 Gy ≤20 cc。別定義の脳−GTVではV25 Gy <16 cc、V30 Gy <10 cc。脳幹（中脳・橋、延髄別）はD0.035 cc ≤23 Gy（理想）／≤31 Gy（許容）。視交叉・視神経はD0.035 cc ≤22.5 Gy（理想）／≤25 Gy（必須）。水晶体はALARA（同表に固定値なし）。単回V12や別輪郭の数値とは置換不可。既照射ではそのまま適用しない。",
            "refs": [
              {
                "label": "eviQ 3253：Organs at risk",
                "url": "https://www.eviq.org.au/radiation-oncology/palliative/3253-brain-metastases-palliative-ebrt-stereotactic"
              }
            ]
          }
        ]
      }
    ]
  },
  "gbm": {
    "context": {
      "summary": "病理・年齢・KPSに応じて通常分割と短期照射を選択。標的はESTRO-EANO単相法と別のboost法を混用しない。",
      "sections": [
        {
          "title": "用語",
          "text": "TMZ＝テモゾロミド、KPS＝Karnofsky Performance Status、FLAIR＝脳脊髄液信号を抑制したMRI撮像法、SIB＝同時統合ブースト。IDH野生型膠芽腫とIDH変異型星細胞腫Grade 4を病理上区別。",
          "refs": [
            {
              "label": "ASTRO Grade 4成人型びまん性神経膠腫（2025）",
              "url": "https://www.sciencedirect.com/science/article/pii/S1879850025001638"
            }
          ]
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "初発・全身状態良好のGrade 4成人型びまん性神経膠腫",
          "dose": "60 Gy / 30 fr",
          "pathwayId": "p014",
          "pathwayDose": "60 Gy/30回",
          "pathwayTitle": "標準RT＋TMZ"
        },
        "summary": "ASTRO：生検または切除後、70歳未満かつKPS≥60で部分脳60 Gy / 30 fr＋同時・維持TMZを推奨。",
        "sections": [
          {
            "title": "適応",
            "text": "WHO Grade 4成人型びまん性神経膠腫の初回治療。原ガイドラインの患者背景と年齢・KPSを確認。",
            "refs": [
              {
                "label": "ASTRO 2025：KQ2",
                "url": "https://www.sciencedirect.com/science/article/pii/S1879850025001638"
              }
            ]
          },
          {
            "title": "標的：ESTRO-EANO 2023の膠芽腫単相法",
            "text": "GTV＝切除腔＋造影T1残存病変。血管原性浮腫は含めず、腫瘍性非造影FLAIRは個別に含める。CTV＝GTV＋15 mmを解剖学的障壁で修正。PTVはIGRT精度を踏まえ、同指針は3 mmを目安とする。別の二相法や院内SIBのマージンではない。",
            "refs": [
              {
                "label": "ESTRO-EANO 2023：Fig. 3／Table 3",
                "url": "https://pure.eur.nl/ws/portalfiles/portal/89698270/1_s2.0_S0167814023002013_main.pdf"
              }
            ]
          },
          {
            "title": "OAR：ESTRO-EANO通常分割の参考値",
            "text": "Table 2の例：視交叉Dmax <55 Gy、視神経Dmax ≤54 Gy、水晶体は理想 <6 Gy・最大10 Gy。脳幹は全体照射の目安54 Gyで、同表の辺縁・内部および近最大線量の条件は別定義。ここでは併記された異なる根拠・指標を統合しない。短期照射への転用不可。",
            "refs": [
              {
                "label": "ESTRO-EANO 2023：Table 2（通常分割）",
                "url": "https://pure.eur.nl/ws/portalfiles/portal/89698270/1_s2.0_S0167814023002013_main.pdf"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "高齢で全身状態が保たれた患者の選択肢",
          "dose": "40.05 Gy / 15 fr",
          "pathwayId": "p015",
          "pathwayDose": "40.05 Gy/15回",
          "pathwayTitle": "短期RT＋TMZ"
        },
        "summary": "生検または切除後の70歳以上かつKPS≥50で、部分脳40.05 Gy / 15 fr＋同時・維持TMZを条件付き推奨。",
        "sections": [
          {
            "title": "適応と適用外",
            "text": "ASTRO 2025の条件付き推奨。通常分割用OAR値は転用せず、このカードには15分割の数値を登録していない。",
            "refs": [
              {
                "label": "ASTRO 2025：KQ2",
                "url": "https://www.sciencedirect.com/science/article/pii/S1879850025001638"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "フレイルな患者の短期照射例",
          "dose": "34 Gy / 10 fr または25 Gy / 5 fr",
          "pathwayId": "p016",
          "pathwayDose": "34 Gy/10回 または25 Gy/5回",
          "pathwayTitle": "RT単独の短期選択肢"
        },
        "summary": "生検・切除後のフレイル患者では部分脳RT単独として34 Gy / 10 frまたは25 Gy / 5 frが条件付き選択肢。",
        "sections": [
          {
            "title": "適応と適用外",
            "text": "ASTRO 2025の条件付き推奨。TMZ併用を前提とせず、通常分割のOAR値も転用しない。",
            "refs": [
              {
                "label": "ASTRO 2025：KQ2",
                "url": "https://www.sciencedirect.com/science/article/pii/S1879850025001638"
              }
            ]
          }
        ]
      }
    ]
  },
  "meningioma": {
    "context": {
      "summary": "NRG/RTOG 0539の中間・高リスク群は別プロトコルとして参照。試験時のWHO病理分類と現行分類は同一ではない。",
      "sections": [
        {
          "title": "用語",
          "text": "GTR＝肉眼的全摘、STR＝亜全摘、PRV＝危険臓器計画体積、SIB＝同時統合ブースト。試験のRisk Group II/IIIはWHO Grade 2/3と同義ではない。",
          "refs": [
            {
              "label": "RTOG 0539プロトコル",
              "url": "https://rpc.mdanderson.org/rpc/CREDENTIALING/files/0539.pdf"
            }
          ]
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "中間リスク髄膜腫・NRG/RTOG 0539",
          "dose": "54 Gy / 30 fr"
        },
        "summary": "Group II：新規WHO Grade 2の全摘後、または再発WHO Grade 1。施設標準ではなく試験条件。",
        "sections": [
          {
            "title": "標的",
            "text": "GTV＝腫瘍／切除床（再発・進行Grade 1では結節状造影も含む）。浮腫・dural tailは除外し、過骨症・明らかな浸潤骨は含めた。CTV＝GTV＋10 mm（未浸潤骨など自然障壁付近では5 mmまで縮小可）、PTV＝CTV＋3～5 mm。",
            "refs": [
              {
                "label": "RTOG 0539 Group II原著：Radiation Therapy",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5889346/"
              }
            ]
          },
          {
            "title": "OAR：Group II試験上限",
            "text": "試験のpoint dose（原著表記：>0.03 cc）：水晶体5 Gy、網膜45 Gy、視神経50 Gy、視交叉54 Gy、脳幹55 Gy。Group III・SRS・再照射には転用しない。",
            "refs": [
              {
                "label": "RTOG 0539 Group II原著",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5889346/"
              },
              {
                "label": "RTOG 0539プロトコル §6.5",
                "url": "https://rpc.mdanderson.org/rpc/CREDENTIALING/files/0539.pdf"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "高リスク髄膜腫・NRG/RTOG 0539",
          "dose": "60 / 54 Gy SIB / 30 fr"
        },
        "summary": "Group III：新規Grade 2の亜全摘後、再発Grade 2、または新規・再発Grade 3。施設標準ではなく試験条件。",
        "sections": [
          {
            "title": "標的",
            "text": "術後MRIの腫瘍床・結節状造影をGTVとし、脳浮腫・dural tailは含めない。CTV60＝GTV＋10 mm、CTV54＝GTV＋20 mm（自然障壁付近は10 mmまで縮小可。過骨症・浸潤骨はGTV）。PTV＝各CTV＋3～5 mm。",
            "refs": [
              {
                "label": "RTOG 0539 Group III原著：Radiation Therapy",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7117785/"
              }
            ]
          },
          {
            "title": "OAR：Group III試験上限",
            "text": "試験プロトコルのpoint dose上限：水晶体7 Gy、網膜50 Gy、視神経55 Gy、視交叉56 Gy、脳幹60 Gy。プロトコルの輪郭・PRV/PTV重複時の手順と一体で読む。Group II、他分割、再照射への転用不可。",
            "refs": [
              {
                "label": "RTOG 0539プロトコル §6.5、Group III列",
                "url": "https://rpc.mdanderson.org/rpc/CREDENTIALING/files/0539.pdf"
              }
            ]
          }
        ]
      }
    ]
  },
  "bone": {
    "context": {
      "summary": "症候性骨転移に対する通常の緩和照射。神経圧迫、骨の不安定性、術後、再照射、SBRTは別条件。",
      "sections": [
        {
          "title": "適応",
          "text": "鎮痛目的の有症状骨転移に対し、ASTRO 2024は8 Gy / 1 fr、20 Gy / 5 fr、24 Gy / 6 fr、30 Gy / 10 frを選択肢とする。脊髄／馬尾圧迫、切迫骨折、術後、再照射は同一条件ではない。",
          "refs": [
            {
              "label": "ASTRO症候性骨転移緩和RT（2024）",
              "url": "https://pubmed.ncbi.nlm.nih.gov/38788923/"
            }
          ]
        },
        {
          "title": "標的・OAR：eviQ 268で照合できた処方",
          "text": "8 Gy / 1 fr、20 Gy / 5 fr、30 Gy / 10 fr：画像上の病変をGTV、CTV＝GTV＋5～10 mmを隣接重要臓器で個別調整、PTV＝CTV＋5～10 mmを固定・IGRTに合わせる。OARは部位・処方別とし一律値なし。eviQ 268に24 Gy / 6 frの掲載はなく、その処方へのマージン転用は示さない。",
          "refs": [
            {
              "label": "eviQ 268：Dose prescription／Target volumes／Organs at risk",
              "url": "https://www.eviq.org.au/radiation-oncology/palliative/268-bone-metastases-palliative-ebrt"
            }
          ]
        },
        {
          "title": "用語",
          "text": "GTV＝肉眼的腫瘍体積、CTV＝臨床標的体積、PTV＝計画標的体積、SBRT＝体幹部定位放射線治療、IGRT＝画像誘導放射線治療。",
          "refs": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "症候性骨転移・従来照射",
          "dose": "8 Gy / 1 fr"
        },
        "summary": "ASTRO 2024の症候性骨転移に対する従来照射の選択肢。",
        "sections": [
          {
            "title": "適用条件",
            "text": "予後、患者の希望、既照射とOARを確認する。脊髄／馬尾圧迫や術後は該当項目を原典で確認。",
            "refs": [
              {
                "label": "ASTRO症候性骨転移緩和RT（2024）",
                "url": "https://pubmed.ncbi.nlm.nih.gov/38788923/"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "症候性骨転移・従来照射",
          "dose": "20 Gy / 5 fr"
        },
        "summary": "ASTRO 2024の症候性骨転移に対する従来照射の選択肢。",
        "sections": [
          {
            "title": "適用条件",
            "text": "予後、患者の希望、既照射とOARを確認する。脊髄／馬尾圧迫や術後は該当項目を原典で確認。",
            "refs": [
              {
                "label": "ASTRO症候性骨転移緩和RT（2024）",
                "url": "https://pubmed.ncbi.nlm.nih.gov/38788923/"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "症候性骨転移・従来照射",
          "dose": "24 Gy / 6 fr"
        },
        "summary": "ASTRO 2024の症候性骨転移に対する従来照射の選択肢。",
        "sections": [
          {
            "title": "適用条件",
            "text": "予後、患者の希望、既照射とOARを確認する。脊髄／馬尾圧迫や術後は該当項目を原典で確認。",
            "refs": [
              {
                "label": "ASTRO症候性骨転移緩和RT（2024）",
                "url": "https://pubmed.ncbi.nlm.nih.gov/38788923/"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "症候性骨転移・従来照射",
          "dose": "30 Gy / 10 fr"
        },
        "summary": "ASTRO 2024の症候性骨転移に対する従来照射の選択肢。",
        "sections": [
          {
            "title": "適用条件",
            "text": "予後、患者の希望、既照射とOARを確認する。脊髄／馬尾圧迫や術後は該当項目を原典で確認。",
            "refs": [
              {
                "label": "ASTRO症候性骨転移緩和RT（2024）",
                "url": "https://pubmed.ncbi.nlm.nih.gov/38788923/"
              }
            ]
          }
        ]
      }
    ]
  },
  "lymphoma": {
    "context": {
      "summary": "初発限局期DLBCL/LBCLに対する全身治療後ISRTの例。上顎洞DLBCLの院内検討45 Gy / 25 frとは別枠。",
      "sections": [
        {
          "title": "適応：ISRT 30 Gy / 15 fr",
          "text": "BSH：他の選択群に該当しない80歳未満、Stage I–II・IPI 0–1ではR-CHOP 3～4コース後のISRT 30 Gy / 15 frを考慮できる（2B）。低リスク群や十分な薬物療法・反応を得た患者に一律追加しない。上顎洞45 Gy / 25 frを裏付ける症例固有条件は確認していない。",
          "refs": [
            {
              "label": "BSH初発LBCLガイドライン：Stage I/II Recommendations",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7616447/"
            }
          ]
        },
        {
          "title": "標的・OAR",
          "text": "ISRTは治療前PET/CT等の病変部位を計画画像に参照し、初期浸潤部位、治療後残存、臓器変位、画像位置合わせの不確実性を考慮する。節外病変のCTVは部位・浸潤体積・顕微鏡的残存可能性で個別化。一律のCTV/PTVマージン、上顎洞向けOAR数値は登録しない。",
          "refs": [
            {
              "label": "ILROG ISRT概要",
              "url": "https://www.redjournal.org/article/S0360301620309433/pdf"
            },
            {
              "label": "BSH：Primary extra-nodal LBCL",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7616447/"
            }
          ]
        },
        {
          "title": "用語",
          "text": "DLBCL＝びまん性大細胞型B細胞リンパ腫、LBCL＝大細胞型B細胞リンパ腫、ISRT＝病変部位照射、IPI＝国際予後指標、R-CHOP＝リツキシマブ＋CHOP化学療法。",
          "refs": []
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "限局期DLBCL・薬物療法後ISRT",
          "dose": "30 Gy / 15 fr"
        },
        "summary": "BSH：他の選択群に該当しない80歳未満のStage I–II・IPI 0–1では、R-CHOP 3～4コース後に考慮（2B）。上顎洞45 Gy / 25 frの院内症例とは別。",
        "sections": [
          {
            "title": "適応：ISRT 30 Gy / 15 fr",
            "text": "BSH：他の選択群に該当しない80歳未満、Stage I–II・IPI 0–1ではR-CHOP 3～4コース後のISRT 30 Gy / 15 frを考慮できる（2B）。低リスク群や十分な薬物療法・反応を得た患者に一律追加しない。上顎洞45 Gy / 25 frを裏付ける症例固有条件は確認していない。",
            "refs": [
              {
                "label": "BSH初発LBCLガイドライン：Stage I/II Recommendations",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7616447/"
              }
            ]
          },
          {
            "title": "標的・OAR",
            "text": "ISRTは治療前PET/CT等の病変部位を計画画像に参照し、初期浸潤部位、治療後残存、臓器変位、画像位置合わせの不確実性を考慮する。節外病変のCTVは部位・浸潤体積・顕微鏡的残存可能性で個別化。一律のCTV/PTVマージン、上顎洞向けOAR数値は登録しない。",
            "refs": [
              {
                "label": "ILROG ISRT概要",
                "url": "https://www.redjournal.org/article/S0360301620309433/pdf"
              },
              {
                "label": "BSH：Primary extra-nodal LBCL",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7616447/"
              }
            ]
          }
        ]
      }
    ]
  },
  "prostate": {
    "context": {
      "summary": "同じ20回でも局所照射と骨盤SIBは分けて参照する。",
      "sections": [
        {
          "title": "適用条件",
          "text": "局所照射の試験プロトコール、毒性解析からの提案、院内骨盤SIB運用は別。骨盤SIBの線量制約に局所照射のDVH制約を自動流用しない。",
          "refs": [
            {
              "label": "CHHiP原著",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4961874/"
            },
            {
              "label": "POP-RT原著",
              "url": "https://pubmed.ncbi.nlm.nih.gov/33497252/"
            }
          ]
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "局所限局癌・根治EBRT",
          "dose": "70 Gy / 28 fr"
        },
        "summary": "1回2.5 Gyの中寡分割。適応とADT併用はリスク群に応じて判断。",
        "sections": [
          {
            "title": "適応と標的の確認",
            "text": "この資料はN0M0の初回根治外照射が対象。前立腺とリスクに応じた精嚢の範囲を採用する原典で確認する。術後・骨盤リンパ節併用は別扱い。",
            "refs": [
              {
                "label": "ASTRO/ASCO/AUA：限局性前立腺癌の寡分割（2026）",
                "url": "https://pubmed.ncbi.nlm.nih.gov/42946126/"
              }
            ]
          },
          {
            "title": "PTV・OAR",
            "text": "PTVマージンと直腸・膀胱などのDVH制約は該当分割と計画法の原典を確認。この詳細には一律の数値を収載せず、20回の制約を流用しない。",
            "refs": [
              {
                "label": "ASTRO/ASCO/AUA：限局性前立腺癌の寡分割（2026）",
                "url": "https://pubmed.ncbi.nlm.nih.gov/42946126/"
              }
            ]
          },
          {
            "title": "用語",
            "text": "MHF：中寡分割。UHF：超寡分割。ADT：アンドロゲン除去療法。"
          }
        ]
      },
      {
        "match": {
          "label": "局所限局癌・根治EBRT（UHF）",
          "dose": "36.25–40 Gy / 5 fr"
        },
        "summary": "超寡分割とし、各原著で標的・処方の定義が異なるため、範囲内を同一処方として扱わない。",
        "sections": [
          {
            "title": "適応と標的の確認",
            "text": "この資料はN0M0の初回根治外照射が対象。前立腺とリスクに応じた精嚢の範囲を採用する原典で確認する。術後・骨盤リンパ節併用は別扱い。",
            "refs": [
              {
                "label": "ASTRO/ASCO/AUA：限局性前立腺癌の寡分割（2026）",
                "url": "https://pubmed.ncbi.nlm.nih.gov/42946126/"
              }
            ]
          },
          {
            "title": "PTV・OAR",
            "text": "PTVマージンと直腸・膀胱などのDVH制約は該当分割と計画法の原典を確認。この詳細には一律の数値を収載せず、20回の制約を流用しない。",
            "refs": [
              {
                "label": "ASTRO/ASCO/AUA：限局性前立腺癌の寡分割（2026）",
                "url": "https://pubmed.ncbi.nlm.nih.gov/42946126/"
              }
            ]
          },
          {
            "title": "用語",
            "text": "MHF：中寡分割。UHF：超寡分割。ADT：アンドロゲン除去療法。"
          }
        ]
      }
    ]
  },
  "nsclc": {
    "context": {
      "summary": "根治通常分割CRTと早期肺SBRTは別々の計画・OAR条件で評価する。",
      "sections": [
        {
          "title": "線量制約の適用範囲",
          "text": "通常分割の肺V20・MLDをSBRTへ流用しない。中枢・超中枢と胸壁近接は末梢小病変の3回法と分ける。ILD/IPFでは一般的な肺DVH目標を満たしても安全性を保証しない。",
          "refs": [
            {
              "label": "QUANTEC 肺",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3576042/"
            },
            {
              "label": "ASTRO 早期NSCLC SBRT",
              "url": "https://pubmed.ncbi.nlm.nih.gov/28596092/"
            }
          ]
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "切除不能Stage III・根治CRT",
          "dose": "60 Gy / 30 fr",
          "pathwayId": "p005",
          "pathwayDose": "60 Gy/30回",
          "pathwayTitle": "根治同時化学放射線療法"
        },
        "summary": "切除不能Stage IIIの根治同時化学放射線療法。以下はRTOG 0617の計画例および通常分割肺DVHの参考値。",
        "sections": [
          {
            "title": "標的とマージン：RTOG 0617",
            "items": [
              "GTV：原発と画像上の領域陽性リンパ節。試験では選択的リンパ節照射なし。",
              "ITV：GTVの呼吸性移動を含む包絡。CTVは試験でITV＋5–10 mm、PTVはCTV＋5–15 mm（4D-CT・IGRTの使用に応じた試験設定）。現行施設の一律値ではない。"
            ],
            "refs": [
              {
                "label": "RTOG 0617 原著・Methods",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4419359/"
              }
            ]
          },
          {
            "title": "OAR：通常分割の肺DVH",
            "items": [
              "肺：QUANTECの参考値はV20 ≤30–35%、平均肺線量 ≤20–23 Gy。根治通常分割NSCLCで症候性肺臓炎をおおむね20%以下に抑える目的の目安で、単一の安全閾値ではない。",
              "正常肺は両肺からGTVを除くことが多い。試験間で肺の定義は同一とは限らないため、計画の差し引き体積と原典のDVH定義を照合する。心臓・食道・脊髄の制約は採用プロトコールで個別に照合し、この欄では共通閾値を提示しない。"
            ],
            "refs": [
              {
                "label": "QUANTEC 肺—輪郭・限界・推奨",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3576042/"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "早期NSCLC・SBRT",
          "dose": "分割と線量は部位別に決定"
        },
        "summary": "早期N0例の局所照射。代表例の54 Gy/3回は末梢病変の試験条件で、中枢・超中枢や5回法の代わりではない。",
        "sections": [
          {
            "title": "標的・処方の条件",
            "items": [
              "原発のGTVを描出し、4D-CTなど実際に用いる呼吸管理に合わせてITVとPTVを決める。中枢・超中枢や胸壁近接では臓器距離と制約を先に確認する。",
              "CHISELのSABR群：54 Gy/3回、胸壁から2 cm未満では48 Gy/4回。試験の部位別条件であり、中枢病変や別の線量処方への外挿はしない。"
            ],
            "refs": [
              {
                "label": "TROG 09.02 CHISEL 原著",
                "url": "https://pubmed.ncbi.nlm.nih.gov/30770291/"
              },
              {
                "label": "ASTRO 早期NSCLC SBRT",
                "url": "https://pubmed.ncbi.nlm.nih.gov/28596092/"
              }
            ]
          },
          {
            "title": "OAR・未収載",
            "text": "両肺、近位気管支樹、食道、脊髄、心臓、大血管、胸壁・肋骨等を部位に応じ評価。最大点線量とD0.03 cc等は同義としない。分割数と計算・輪郭法を特定しない汎用SBRTカードには数値を設けない。"
          }
        ]
      }
    ]
  },
  "sclc": {
    "context": {
      "summary": "限局型胸部CRTでは化学療法前の陽性リンパ節情報を確保し、胸部照射とPCIを混同しない。",
      "sections": [
        {
          "title": "標的定義と用語",
          "text": "縮小例では診断時の陽性リンパ節ステーションを照射範囲に含め、肺実質の原発GTVは化学療法後の体積に合わせられる。BIDは1日2回、QDは1日1回、PCIは予防的全脳照射。",
          "refs": [
            {
              "label": "ASTRO SCLCガイドライン・KQ1／KQ3",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10915746/"
            },
            {
              "label": "ESTRO–EORTC Stage I–III SCLC輪郭ガイドライン",
              "url": "https://www.sciencedirect.com/science/article/abs/pii/S0167814026001556"
            }
          ]
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "限局型・胸部RT",
          "dose": "45 Gy / 30 fr（BID）",
          "pathwayId": "p007",
          "pathwayDose": "45 Gy/30回（1日2回、1回1.5 Gy）",
          "pathwayTitle": "胸部照射：BID標準レジメン"
        },
        "summary": "限局型SCLCの根治同時CRT。1.5 Gy、1日2回、照射間隔6時間以上、約3週間。",
        "sections": [
          {
            "title": "標的・マージン",
            "text": "診断時造影CT・PETも参照して陽性リンパ節を同定。縮小例では化学療法後の原発肺病変をGTVに、診断時陽性リンパ節ステーションをCTV計画に反映する。予防的リンパ節照射は原則行わない。呼吸移動とIGRT精度に合わせITV/PTVを設計し、単一マージンを共通値にしない。",
            "refs": [
              {
                "label": "ASTRO SCLCガイドライン・KQ1",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10915746/"
              },
              {
                "label": "ESTRO–EORTC 胸部標的定義",
                "url": "https://www.sciencedirect.com/science/article/abs/pii/S0167814026001556"
              }
            ]
          },
          {
            "title": "OAR・成績",
            "text": "肺・食道・心臓・脊髄をBID計画として個別に評価。輪郭・分割が一致する数値表はここでは未収載。CONVERT（シスプラチン＋エトポシド併用優越性試験）でBID群の2年OS 56%、66 Gy/33回QD群51%；QDの優越性は示されず、同等性の証明でもない。",
            "refs": [
              {
                "label": "CONVERT プロトコール",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4735219/"
              },
              {
                "label": "CONVERT 原著",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5555437/"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "限局型・1日1回代替",
          "dose": "60–70 Gy / 30–35 fr"
        },
        "summary": "ASTROの1日1回代替は2 Gy/回、60–70 Gy。BIDが実施しにくい場合の条件付き選択肢。",
        "sections": [
          {
            "title": "標的・分割別OAR",
            "text": "肺実質原発と診断時の陽性リンパ節ステーションを区別するinvolved-field。固定法・画像誘導・呼吸管理に合わせITV/PTVを設定。肺・心臓・食道・脊髄は実際に選択した総線量と臨床プロトコールで照合し、BID制約を流用しない。CONVERTのQD試験処方は範囲全体ではなく66 Gy/33回。",
            "refs": [
              {
                "label": "ASTRO SCLCガイドライン・KQ1",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10915746/"
              },
              {
                "label": "CONVERT 原著",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5555437/"
              }
            ]
          }
        ]
      },
      {
        "match": {
          "label": "PCI（適応症例）",
          "dose": "25 Gy / 10 fr"
        },
        "summary": "予防的全脳照射。限局型の胸部治療反応例で病期・再評価MRI・年齢/PS等を踏まえて判断する。",
        "sections": [
          {
            "title": "適応と線量",
            "text": "根治治療に反応した適格な限局型II–III期例では再評価脳MRIを行い、転移なしの場合のPCIを検討する。限局型I期に一律実施しない。明らかな脳転移の治療とは別で、通常PCIと海馬回避PCIの標的・OAR表は分ける。手技別輪郭・OAR値はこのカードでは未収載。",
            "refs": [
              {
                "label": "ASTRO SCLCガイドライン・KQ3",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10915746/"
              }
            ]
          }
        ]
      }
    ]
  },
  "breast": {
    "context": {
      "summary": "温存乳房全体照射（WBI）と乳房全摘後照射（PMRT）／領域リンパ節照射（RNI）は、標的もOAR条件も別。",
      "sections": [
        {
          "title": "WBI：温存乳房・腫瘍床",
          "items": [
            "ASTRO WBIの中寡分割例：40 Gy/15回または42.5 Gy/16回（低位腋窩を含む場合を含めた浸潤癌の推奨）。施設処方の40.05/15・42.56/16と出典の表記は区別する。",
            "術後CTVは残存乳腺を対象とし、boost適応時の腫瘍床は画像、術前情報、手術所見・クリップを統合。肉眼病変残存のない術後例に肉眼GTVを機械追加しない。PTVマージンは固定・IGRT、体表での評価用PTV定義に依存。",
            "乳房内105%超の体積を減らし、腫瘍床は処方の95%以上での被覆を目標とする（ASTRO WBI）。心臓・患側肺・対側乳房などの線量を最小化。PMRT/RNI用数値はこのWBIに自動適用しない。"
          ],
          "refs": [
            {
              "label": "ASTRO WBIガイドライン",
              "url": "https://pubmed.ncbi.nlm.nih.gov/29545124/"
            },
            {
              "label": "ESTRO 早期乳癌CTV輪郭アトラス",
              "url": "https://pubmed.ncbi.nlm.nih.gov/25630428/"
            },
            {
              "label": "Whelan 42.5 Gy/16回 RCT・10年報告",
              "url": "https://pubmed.ncbi.nlm.nih.gov/20147717/"
            }
          ]
        },
        {
          "title": "PMRT/RNI：胸壁・再建乳房",
          "text": "PMRTの適応例で患側胸壁／再建乳房と領域リンパ節を評価する。腋窩、鎖骨上、内胸の選択は病期・腋窩手術・リスクによる。中寡分割優先、通常分割も選択例で可。左側ではDIBH等で心線量を低減し、個別の再建形態に合う輪郭を使用する。普遍的なPTVマージンは提示しない。",
          "refs": [
            {
              "label": "ASTRO–ASCO–SSO 2025 PMRTガイドライン",
              "url": "https://pubmed.ncbi.nlm.nih.gov/40955654/"
            }
          ]
        },
        {
          "title": "PMRTのOAR：分割別の目標例",
          "items": [
            "40–42.56 Gy／15–16回：患側肺V17 ≤25%（理想）、≤35%（許容）；左側心臓Dmean ≤2.4 Gy（理想）、≤4 Gy（許容）。",
            "50–50.4 Gy／25–28回：患側肺V20 ≤35%（理想）、≤40%（許容）；左側心臓Dmean ≤3 Gy（理想）、≤5 Gy（許容）。",
            "ASTRO–ASCO–SSOのルーチンPMRT（胸壁／再建乳房と、適応に応じて照射する領域リンパ節を含む計画）の目標で、肉眼／残存リンパ節へのboostなし。中寡分割の理想肺V17と心臓値は通常分割データからの外挿。ガイドラインは相対体積（%）と平均線量を区別し、心臓は可能な限り減らす。全心臓とLADの指標は代用不可。"
          ],
          "refs": [
            {
              "label": "ASTRO 2025 PMRT公式ポケットカード Table 2（本ガイドライン Table 4）",
              "url": "https://www.astro.org/ASTRO/media/ASTRO/Patient%20Care%20and%20Research/PDFs/PMRT_Pocketcard.pdf"
            }
          ]
        }
      ]
    },
    "regimens": [
      {
        "match": {
          "label": "乳房温存術後・全乳房照射（WBI）",
          "dose": "40 Gy / 15 fr"
        },
        "summary": "乳房温存術後、全乳房に40 Gyを15回（約3週）。腫瘍床boostと包括的RNIは適応を別に判断する。",
        "sections": [
          {
            "title": "適応・標的",
            "items": [
              "浸潤癌の乳房温存術後WBIでASTROが推奨する中寡分割の一つ（低位腋窩を含む場合も対象）。包括的RNI用OAR値をこのカードに紐付けない。",
              "肉眼残存のない術後例にGTVは通常設けず、CTVは残存乳腺。Boostを行う場合は術前画像・手術所見・クリップ・術後変化を統合して腫瘍床を描出する。PTVは固定・画像誘導・評価用輪郭の定義に応じて設定し、共通mm値は示さない。"
            ],
            "refs": [
              {
                "label": "ASTRO WBI ガイドライン",
                "url": "https://pubmed.ncbi.nlm.nih.gov/29545124/"
              },
              {
                "label": "ESTRO 早期乳癌CTV輪郭アトラス",
                "url": "https://pubmed.ncbi.nlm.nih.gov/25630428/"
              }
            ]
          },
          {
            "title": "計画・OAR",
            "text": "乳房の処方105%超の体積を抑え、腫瘍床に処方の95%以上が届くようにする（ASTRO WBI）。心臓・患側肺・対側乳房線量を低く保つ。左側でDIBHを検討。ここではWBIの定量OARの独立した照合が不足しており、有効性が確認されたPMRT/RNI数値で代用しない。",
            "refs": [
              {
                "label": "ASTRO WBI ガイドライン・計画",
                "url": "https://pubmed.ncbi.nlm.nih.gov/29545124/"
              }
            ]
          },
          {
            "title": "試験成績",
            "text": "START-Bの術後早期浸潤乳癌集団（温存術後主体、全摘術後も一部含む）で、10年局所領域再発率は40 Gy/15回 4.3%（95% CI 3.2–5.9）対50 Gy/25回 5.5%（95% CI 4.2–7.2）。病期別の一般予後ではない。",
            "refs": [
              {
                "label": "START-B 原著",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2277488/"
              },
              {
                "label": "START 10年追跡",
                "url": "https://pubmed.ncbi.nlm.nih.gov/24055415/"
              }
            ]
          }
        ]
      }
    ]
  }
};
