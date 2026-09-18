# MH Now Build Lab v0.6 RC2 — 独立レビュー対応

2026-09-18。**本番投入は保留**。B01〜B07を修正した別成果物です。GitHub commit/push、Actions起動、Pages変更、公開プレビュー作成は実施していません。自動UI検証用の一時localhostサーバーだけを使用しました。

## 原本と基準

入力RC ZIPのSHA-256は `d7de43ce395e626d560f4e6c86f34cd1bab90e2435fc06934d3cf389e1a55e47` と一致。入力から別ディレクトリを作成し、元ZIP・元RCを保持しました。GitHubを別ディレクトリへread-only cloneし、HEAD `6d6fc9b5e1b8a767e862455b0913f24838532eba` が元RCの基準と一致することを確認。新canonical差分の混入はありません。master JSONは元RCの確認済み内容をそのまま使用（実武器721、14種、防具366、スキル139、漂移候補76）。

## 対応表

| 指摘 | 原因・修正 | 回帰テスト / 結果 |
|---|---|---|
| B01 高 | parts等の検証が浅く、描画前に壊れたsnapshotを書けた。`validateBackup`で深い構造、5部位・ID重複・数値・漂移・条件・preferencesを検証し、clone上で移行。検証後に単一書込み。起動破損時は書込み停止、原本退避、正常復元時の隔離を追加。 | `rc2.test.cjs` B01×5、`rc2-ui.test.cjs` B01×3 PASS。null等11変種の拒否でexact bytes/メモリー/画面不変。 |
| B02 高 | shallow参照のためWorker送信後の編集が結果条件へ混入。`searchSnapshot`でdeep clone+freeze。入力、返却条件、保存・比較は同じ開始時snapshot。検索token/settledで中止済み応答を無視。スキル検索のsort/ハイライトも開始時に固定。 | `rc2.test.cjs` B02×2、`rc2-ui.test.cjs` B02×1 PASS。武器入力/要求Lv/Grade/所持/稼働率/版を変更。 |
| B03 高 | persistの失敗が呼出元へ伝わらず成功通知。全保存を単一snapshotへ統一。失敗は未保存バナー、メモリー保持、再試行/JSON退避。成功通知は保存成功後だけ。旧互換キーは読取専用。 | `rc2.test.cjs` B03×2、`rc2-ui.test.cjs` B03×1 PASS。quota、拒否、互換キー拒否、登録/編集/削除/設定、回復。 |
| B04 高 | 攻撃活性未計算、果敢によるジャスト回避不可が未評価。公式10/15/25%攻撃増加、果敢5/10/20%ダメージ増加を実装。果敢時の持続巧撃は稼働率に関わらず0。内訳/チップ/参考順位に制約を表示。 | `rc2.test.cjs` B04×2 PASS。1000攻撃・果敢1+持続5は1050。攻撃活性3は1250。属性/会心/漂移bonusの一回加算も検証。 |
| B05 高 | 新HTMLとcache-first旧app.jsが混在。content hash付きapp/worker/engine、全shellハッシュ検証後install、版固定navigation、明示切替、schema互換master fallbackを実装。cacheはscope所有名、旧版を自動削除しない。 | `sw-release.test.cjs` 8群 PASS。RC1実コードの制御下、新hash依存列、待機、失敗/回線断、再読込相当、offline、不適合master、他scope保持。既存UIのoffline起動もPASS。 |
| B06 高 | bot commitからPages更新される保証がなかった。同一workflowの生成→build→test→commit→artifact→deployを明示。main限定、github-pages environment、jobごとの最小権限。 | `test_rc2.py::test_b06_workflow_explicit_deploy_gate` PASS（静的検証）。Actions/Pages実行は未実施。 |
| B07 中 | 表示名+部位だけの照合で改名が別ID化。officialId→正規化公式source→旧形式の一意な名前+部位へ変更。曖昧一致/officialId重複は失敗。 | `test_rc2.py` B07×7 PASS。改名/翻訳/URL/legacy/真正の別装備/曖昧/所有参照。 |

追加プローブは修正前の元RCで不具合を再現できました。これは品質PASSではありません。`tests/rc2_evidence/before-*`が再現記録、修正後は別の正しい期待値をassertする回帰テストです。既存22+14+15のテストファイルは原本とbyte一致し、削除・緩和していません。

## 保存とUIの方針

未知装備IDは消去・他装備への移し替えをせず、snapshot/owned/exclusionに保持。マイセットは旧マスター参照を表示。未知武器の条件読込は明示的に停止し、対応masterの読込を案内します。正常な旧形式は不足する任意フィールドを補ってv6へ移行します。

未保存の変更は当該ページのメモリーだけです。リロード前に再試行またはJSON退避が必要。破損した永続snapshotを自動で上書きせず、復元時には原本bytesを隔離キーへ保存します。隔離保存ができない場合は復元自体を停止します。

追加UIテストで、未保存バナーがモーダルを遮る問題と入力blur時の再描画でボタンのclickが失われる問題を発見。通常フロー内のバナーと、置換しないボタンDOMへ修正し再テストしました。

## 残課題と出荷条件

- **iPad Safari/WebKit/実機ホーム画面PWAは未検証**。`IPAD_ACCEPTANCE.md`を完了するまで本番不可。Chromium viewportやSW VMを実機の代用とは扱いません。
- 同名別IDの漂移結果: 現行FAQは20件・複数枠・他防具移動不可を明示。2024年告知の「既にセットしているスキル」の重複禁止は、結果identityとスキル名の区別を明記していません。RCの結果ID単位ロジックを維持し、同名別結果の実機装着可否を出荷前確認項目とします。曖昧な公式文言を根拠に許可/禁止を新しく断定していません。
- Generic指数は汎用スキルも未対応が残ります。全139スキルの計算対応表はDAMAGE_MODEL.mdから確認可能。武器固有DPS、SP制約、相互作用の実ゲーム検証、素材数量は未対応。
- 未照合11防具はunknown、理論漂移bonusは0、探索は候補制限付き近似。厳密最適性を保証しません。
- SWの待機/更新失敗経路はVMで検証。実端末OSのキャッシュ回収、旧RC1が更新途中でofflineになる初回移行までは保証しません。切替完了後にoffline確認が必要。
- 旧release cacheとimmutable assetsは開いたままの旧画面を壊さないため保持。自動cache清掃は未実装で、長期間の更新による容量増加は管理課題。
- GitHub workflowはコード/静的検証のみ。PagesをGitHub Actions sourceへ切替しenvironment保護を設定する将来作業が必要。既存UI fixtureは721/366/76等の期待値を固定しているため、将来公式件数変更時は意図的に公開を止め、データ差分とfixture更新をレビューします。

公式確認URL・確認日はSOURCE_PROVENANCE.jsonとDAMAGE_MODEL.md、実行環境とログはTEST_REPORT.mdに記録しました。
