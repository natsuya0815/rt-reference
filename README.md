# RT Reference β v0.2.0 — 診療プロジェクト知見統合版

放射線治療専門医向けの静的PWA（iPhone・PCブラウザ対応）。2026年11月12日データスナップショット。

## v0.2で追加したもの

- 既存15癌種に対し、過去の診療相談から**42件の匿名化・要約済み「診療ノート」**を追加。**39件の参考文献・原典**を登録し、35件のノートに参考文献を紐付けました。
- 各癌種の「概要」「処方・分割」「OAR」「併用薬物療法」「有害事象」「治療成績」「検討メモ」に関連ノートを表示（関連ノートのあるタブだけ表示）。
- サイドメニューに**「診療プロジェクト知見」**を追加。癌種・診療一般で絞り込み可能。トップの全文検索からもノートへ直接ジャンプします。
- 乳癌「有害事象」には**PMRT後の再建合併症**を追加。インプラントと自家組織、RT CHARM（16fr対25fr）、ASTRO/ASCO/SSO PMRT 2025などを要約。
- チャット内で検討した個別の処方や診断は「施設検討」「診療上の論点」として登録し、標準治療や安全制約の確定値として扱いません。
- 既存の検索、癌種追加、お気に入り、個人メモ、JSONバックアップ／復元、テーマ切替、PWA機能を維持。

## 収録範囲と重要な限界

この版は**参照可能なプロジェクト会話の情報・要約を人が読める臨床ノートに再構成**したものです。すべての過去チャットを機械的に一覧取得・全文検証したわけではなく、**全会話の漏れない取り込みは保証できません**。不足分は追加・更新できます。

医学的な事実確認と個別症例の論点は別物です。参考文献は論点を理解するためのもので、**患者ごとの判断の妥当性を保証するものではありません**。出典が未登録のノート7件は**「文献確認未完了」**として明示します。

診療記録や患者識別情報は収録しない方針ですが、個別症例の文脈を要約した箇所があります。公開前に `REVIEW_NOTES.md` と `data.json` を必ず確認し、**間接的な再識別の可能性がある情報、施設内限定情報は削除してください**。

## GitHub Pagesで v0.1 → v0.2 に更新

1. ZIPを解凍します。
2. すでに運用している `rt-reference` リポジトリのルートに、**`index.html`、`data.js`、`data.json`、`sw.js`、`manifest.webmanifest`、アイコン**などをアップロードして既存ファイルを上書き・コミットします（同名ファイルの置き換え）。ZIPそのものはアップロードしません。
3. `Settings` → `Pages` で GitHub Pages が有効であることを確認します。必要に応じてSafariを再読み込みします。
4. サイドメニューの「診療プロジェクト知見」を選択すると42件のノートを閲覧できます。乳癌 → 「有害事象」でも再建の関連情報を閲覧できます。
5. アプリ内で入力した**個人メモや癌種追加**は端末ローカル保存です。更新で消える設計にはしていませんが、**更新前にJSONバックアップを作成**してください。

単体HTML版 `RT_Reference_beta_v0.2_standalone.html` は、導入前にPCブラウザで動作を確認するための簡易配布版です。GitHub公開にはZIP内のPWA構成を使います。

## ZIP内のファイル

- `index.html`: 画面と動作
- `data.js`: Webアプリ用初期医学データ（オフライン読み込み）
- `data.json`: 同じ医学データの読みやすい整形版
- `clinical_notes.json`: 今回収録した診療ノート・出典の独立した書き出し
- `REVIEW_NOTES.md`: 42件のノートを一覧確認するための文書（公開前の監査推奨）
- `sw.js` / `manifest.webmanifest` / `icon*` / `apple-touch-icon.png`: PWA機能

**`data.js` と `data.json` は同じ内容を持たせています。** 医学データを編集する際は両方を再生成してください。`clinical_notes.json` は編集監査用の副本です。

## 重要な出典の例

- Jimenez RB, et al. Postmastectomy Radiation Therapy: ASTRO/ASCO/SSO Clinical Practice Guideline. *Practical Radiation Oncology*. 2025. https://pubmed.ncbi.nlm.nih.gov/40956255/
- Jagsi R, et al. Impact of Radiotherapy on Complications and Patient-Reported Outcomes After Breast Reconstruction. *JNCI*. 2018. https://pubmed.ncbi.nlm.nih.gov/28954300/
- RT CHARM / Alliance A221505. Randomized Trial of Hypofractionated Postmastectomy Radiation Therapy in Women With Breast Reconstruction. *JCO*. Published online October 12, 2026. https://pubmed.ncbi.nlm.nih.gov/42863096/

さらに詳細な出典・URLは `data.json` の `sources` と `REVIEW_NOTES.md` を確認してください。

## 医療安全・プライバシー

- 医師向けの参考資料であり、診療行為の指示・自動判定ソフトではありません。処方やOAR制約を使用するときは、分割回数、輪郭、測定指標、既照射歴、併用療法、対象集団、原典の最新版を確認してください。
- 日本・欧州・米国で推奨が異なる場合は出典を区別し、観察研究とRCTを混同しないでください。
- **GitHub Pagesの静的Webサイトは原則として全世界に公開されます。** 患者情報・病院内部文書・秘密情報は一切アップロードしないでください。必要なら認証付きのプライベート環境へ移行してください。
- 初期データは現在の自動更新に対応していません。新しい知見を入れるときは文献検証・承認の手順が必要です。
- 追加した個人メモは端末ブラウザの`localStorage`に保存され、GitHubのサーバーとは同期しません。定期的にJSONバックアップを取得してください。
