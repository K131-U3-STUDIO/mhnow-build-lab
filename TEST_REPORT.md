# v0.6 RC2 Test Report

2026-09-18 / release `v06-rc2-83bf5b98d8b23c40`。**83シナリオ群 PASS（既存51 + 追加32）**。実機iPad/公開環境の合格ではありません。

## 実行済み

| 区分 | テスト | 件数 | 結果 |
|---|---|---:|---|
| 既存計算 | tests/engine.test.cjs | 22 | PASS |
| 既存pipeline | tests/test_pipeline.py | 14 | PASS |
| 既存UI | tests/ui.test.cjs | 15 | PASS |
| RC2関数回帰 B01〜B04 | tests/rc2.test.cjs | 11 | PASS |
| RC2 SW回帰 B05 | tests/sw-release.test.cjs | 8 | PASS |
| RC2 ID/公開経路 B06〜B07 | tests/test_rc2.py | 8 | PASS |
| RC2ブラウザ回帰 B01〜B03 | tests/rc2-ui.test.cjs | 5 | PASS |

一つの群に複数のassert/入力変種を含みます。assert個数を膨らませた数ではありません。既存3テストファイルは入力RCとbyte一致を検証。元プローブの「不具合再現成功」はこの83件に含めません。

## 環境・範囲

- Linux x86_64、Python 3.12.14、Node v24.19.0、Playwright 1.62.1、Chromium 153.0.8010.0 headless。
- 一時localhost origin、`/lab/`相対path、新規browser context。viewport 820×1180/touch、390×1180。公開サイト/本番storageは使用していません。
- 専用SWテストは実際のRC1/RC2 handlerとResponse/SHA-256に、memory Cache/network adapterを接続したNode VM。ブラウザのOS lifecycleそのものを再現する試験ではありません。
- GitHub workflowのB06はmain gate・job依存・artifact/deploy・権限の静的assertのみ。Actions実行、Pages公開、environment保護の動作は未実施。
- masterは入力RCのまま。721実武器/14種、366防具、139スキル、76漂移候補、355公式照合防具と11unknownを検証。ライブ全取得の再実行結果と混同しないでください。

## 実測（単回・この環境のシナリオ全体時間）

以下は描画・入力・待機・assertを含むPlaywright実行時間です。端末benchmarkや純粋な演算時間ではありません。キャッシュ状態やCPU負荷に依存します。

| シナリオ | 時間 |
|---|---:|
| startup / 721 weapons / 366 armors | 218 ms |
| bounded weapon list + 14 type filter + attribute + source search | 315 ms |
| skill checkbox / partial filter / level / selected only / clear | 551 ms |
| drift manager register / edit / ownership | 452 ms |
| no-drift Worker search + result weapon snapshot + save + compare | 5632 ms |
| backup roundtrip retains owned / mysets / preferences; malformed import atomic | 284 ms |
| materials show unknown quantities including weapon | 66 ms |
| exclusion persists | 211 ms |
| theory search cancel keeps UI responsive | 253 ms |
| owned drift search completes | 6989 ms |
| theory full Worker search | 7328 ms |
| requested skill UI search uses weapon skill | 6422 ms |
| drift delete | 331 ms |
| relative-path PWA / offline master / unrelated cache retained | 161 ms |
| 820 / 390 viewport no horizontal overflow | 414 ms |

初期起動、武器/スキル一覧、なし/所持/理論/要求検索を確認。武器DOMは最大80、スキル一覧は最大160を維持。Worker探索中の中止と画面操作を確認。820/390で横overflowなし。描画スクリーンショットを同梱しました。

## 追加回帰の要点

- B01: parts:[null]を含む不正なweapon/slot/ID/skills/漂移/統計/条件/preferences/schemaを拒否。永続exact bytes、メモリー、mysets表示の不変をassert。旧形式移行・unknown reference保持・破損起動停止・原本エクスポート・隔離復旧。
- B02: req/Grade/所持/manual/weapon/uptime/master版が探索中に変わっても開始時条件を保持。cancel後の遅いdone/errorが次のWorkerを終了しない。
- B03: quota/拒否で成功通知なし。未保存メモリーをJSON退避して再試行で保存。互換キーに書かないため旧キーの書込み拒否に影響されない。防具設定・除外・漂移追加/編集/削除も共通policy。
- B04: 攻撃活性10/15/25%、果敢5/10/20%、発動不可の巧撃を0。会心/属性/漂移bonus一回加算。既存22の期待値を維持。
- B05: content hash一致、待機/明示切替、install失敗/回線断、offline全依存、incompatible master fallback、RC1制御中のhash付き新app→worker→engine、旧cache/別scope保持。初回移行中の途切れは旧コードの制約が残るため実機試験必須。
- B07: 改名/翻訳/公式source正規化/legacy照合/同名の別装備/曖昧拒否/officialId重複/所有参照維持。

## 検証で修正したUI不具合

追加試験の途中で未保存バナーがモーダルを遮ること、入力blurでバナーのボタンDOMを交換するとclickが失われることを確認。通常フロー配置とボタンDOM維持へ修正し、最終5群はPASS。初回失敗を未実施として隠していません。

## 証跡

- `tests/results/ui-results.json`、`rc2-ui-results.json`: 最終UI全結果・時間・pageerror（いずれも空配列）。stdoutテキストの保存が一部だけの場合も、final JSONが全シナリオの完了記録です。
- `tests/results/viewport-820.png`, `viewport-390.png`: 最終UI画面。
- `tests/rc2_evidence/`: 元RC再現(before)、修正後engine/regression/SW/Pythonログ、環境、artifact整合検証。
- 旧RCの取得ログ・テスト報告は`docs/previous/`に明確に分離。RC2の新規実行とは数えていません。

## 未実施と判定

iPad Safari実機、WebKit、実機ホーム画面PWA、OSによるcache回収、ゲーム内の同名別結果漂移の同時装着、全スキル相互作用の実戦計測、GitHub Actions/本番公開は未実施。独立レビューで報告されたERR_BLOCKED_BY_ADMINISTRATORを突破する手段は使っていません。この環境の既存Chromiumでlocalhost試験が動作した範囲だけを報告しています。

**本番投入保留。** `IPAD_ACCEPTANCE.md`と`DEPLOY.md`の将来確認を完了してから判断してください。コード/ローカル自動試験完了を本番保証へ読み替えないでください。


---

# RC2.1 追記 — Node 22互換のテストmock修正

検証日: 2026-09-18。上記本文はRC2作成時の履歴です。この追記と `tests/rc21_evidence/` がRC2.1の新規検証結果です。

## 再現と変更範囲

元RC2 ZIP（SHA-256 `0fc911a198ec0fdc1f993748786c76851c6e1e87bfa62a459453c3c3c9c9c510`）を保持し、別ツリーへ展開。元RC2をNode **22.16.0**で `npm test` すると、`B05 whole-release switch retains assets for older clients` で `TypeError: Response.clone: Body has already been consumed`、exit 1を再現しました。RC2のNode 24での成功だけではNode 22対応を確認できていませんでした。

実行コードの変更は `tests/sw-release.test.cjs` のmemory Cache API mockと、その契約を検証するassertのみです。

- `put`: Response自体を保持せず、bodyを一度読み取り、独立したバイト列・status・statusText・headersを保存。null bodyも保持。
- `match`: 保存バイト列とheadersを複製し、毎回新しいResponseを生成。未登録keyはundefined。
- 既存B05群内に、本文を読み切った後の3回連続取得、binary bytes、201/statusText/headers、headers変更の非共有、204/null body、未登録keyのassertを追加。
- 既存83シナリオ群を削除・緩和せず維持。mock修正はプロダクションのCache APIやService Workerの変更ではありません。

**アプリ本体、JS/Worker/engine、master、HTML、hash assets、manifest、Service Worker、生成器、package.json、GitHub workflowは元RC2とbyte一致**を確認。したがってアプリ内版表示/モデル版/package版/SW release IDはRC2のままです。RC2.1は検証mockと報告を修正した配布物の版です。元RC2、GitHub、Pagesは変更していません。

## 全件再実行結果

| シナリオ群 | Python 3.12.14 + Node 22.16.0 | Python 3.12.14 + Node 24.19.0 |
|---|---:|---:|
| 既存計算 | 22 PASS | 22 PASS |
| 既存Python | 14 PASS | 14 PASS |
| 既存UI | 15 PASS | 15 PASS |
| RC2関数回帰 | 11 PASS | 11 PASS |
| RC2 SW回帰 | 8 PASS | 8 PASS |
| RC2 Python回帰 | 8 PASS | 8 PASS |
| RC2 UI回帰 | 5 PASS | 5 PASS |
| 合計 | **83 / 83 PASS** | **83 / 83 PASS** |

両環境で以下3コマンドを全実行。すべてexit 0です。

```sh
python -m unittest discover -s tests -p 'test_*.py' -v
npm test
npm run test:ui
```

共通環境: Linux x86_64 / Python 3.12.14 / npm 11.9.0 / Playwright 1.62.1 / Chromium 153.0.8010.0 headless。Node実行ファイルのディレクトリをPATH先頭へ設定し、npmから起動されるテストもそれぞれのNode版で実行しました。npm自体は両版で共通です。

UIは新規context、一時localhost originの `/lab/`、820×1180 touchおよび390×1180。Node 22/24それぞれ既存UI15・追加UI5が完了しpageerrorは0。UI結果JSONとスクリーンショットを各Node別に保存しました。iPad Safari/WebKit実機の合格を意味しません。

## 証跡と残課題

- `tests/rc21_evidence/before-node22-npm-test.txt`: 元RC2の再現ログ。
- `tests/rc21_evidence/node22/`, `node24/`: 各環境のPython/npm test/npm run test:uiの完全ログ、最終UI JSON、820/390スクリーンショット。
- `tests/rc21_evidence/summary.json`: バージョン、コマンド、exit code、実行時間、件数。
- `tests/rc21_evidence/runtime-unchanged.json`: 元RC2と照合した非変更ファイルとrelease ID。
- `SHA256SUMS.txt`: RC2.1配布内容を再生成。ZIP内全エントリも元ファイルと一致確認。

今回で指定Node 22.16.0のmock不具合は解消しました。Node 22の全patch版、GitHub Actions上での実行、実機iPad/PWA、同名別結果漂移のゲーム内確認は未実施です。既存の本番投入保留条件は継続します。
