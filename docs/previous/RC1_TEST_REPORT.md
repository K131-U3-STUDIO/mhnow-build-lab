# v0.6 RC TEST_REPORT

実施日: 2026-09-18。全51テスト／シナリオ群がPASS（JS計算22、Python生成器14、ブラウザ操作15）。assertion総数ではありません。

## 環境

Linux / Node.js 24.19.0 / Python 3.12.14 / Playwright 1.62.1 / Chromium headless（@sparticuz/chromiumから取得）。
ブラウザのviewportは820×1180と390×1180、touch有効。CPU throttlingなし。iPad実機でもSafariでもありません。
標準PlaywrightのChromium/WebKitダウンロードはネットワークタイムアウトで失敗し、Chromiumのみ別の配布経路で実行しました。WebKit検証は未実施です。

## Data / generator — 14 PASS

- 全14武器種、実武器721、防具366、スキル139。
- 武器/防具の誤分類・ID重複・不正枠・件数急減の検出。
- 不正masterのpublish失敗後も旧ファイルbytesを保持。
- official payload抽出、discovery slug判定、table rowspan。
- 公式型fixtureによるG5+1/G8+2→解放[5,8]、武器スキルLv変化・解放履歴・既存防具ID維持。
- 実masterの武器スキル、漂移候補76、Grade情報のある防具355、公式効果値、架空素材数量なし。
- ライブの公式3ページから生成器を実行し別の一時masterへ安全に出力成功。GitHub Actionsは未実行。

## Search / model — 22 PASS

なし／理論／所持／簡易指定、要求スキル、武器スキル一回加算、上限、所有防具境界、同一ID二重禁止、同名別IDの複数枠、Grade解放、不明Grade、漂移bonus、正負会心、状態異常、未対応効果、力任せLv5、属性会心、会心撃の対象、条件会心のclamp、除外、結果の武器snapshot。

小さなfixtureによる期待値の検証です。全組合せの厳密最大値との同等性・ゲームの実測DPSを証明しません。

## UI / PWA — 15 PASS

|シナリオ|結果|実測（操作待機込み）|
|---|---|---|
|startup / 721 weapons / 366 armors|PASS|198 ms|
|bounded weapon list + 14 type filter + attribute + source search|PASS|306 ms|
|skill checkbox / partial filter / level / selected only / clear|PASS|536 ms|
|drift manager register / edit / ownership|PASS|455 ms|
|no-drift Worker search + result weapon snapshot + save + compare|PASS|4412 ms|
|backup roundtrip retains owned / mysets / preferences; malformed import atomic|PASS|283 ms|
|materials show unknown quantities including weapon|PASS|72 ms|
|exclusion persists|PASS|229 ms|
|theory search cancel keeps UI responsive|PASS|351 ms|
|owned drift search completes|PASS|6036 ms|
|theory full Worker search|PASS|6040 ms|
|requested skill UI search uses weapon skill|PASS|4913 ms|
|drift delete|PASS|369 ms|
|relative-path PWA / offline master / unrelated cache retained|PASS|193 ms|
|820 / 390 viewport no horizontal overflow|PASS|399 ms|

武器変更後も旧検索結果の武器名・武器スキルで詳細を表示し保存できることを確認。
「除外・データ」画面の診断表示も確認。
スクリーンショットを目視確認: `tests/results/viewport-820.png`, `viewport-390.png`。漂移候補一覧を300pxのスクロール枠に修正し、横はみ出しなし。

計測は一連の操作時間です。例えば「なし検索」は検索＋詳細＋保存＋比較を含み、検索単独の厳密benchmarkではありません。時間は端末・条件で変わります。

## 未検証

- iPad/iPhone実機Safari、WebKit、ホーム画面standalone、Safe Areaの実機。
- 本番HTTPS配信、既存v0.4.4のSWからの実機移行、長期間のstorage quota/OSによるcache削除。
- 未確認11防具、全装備のゲーム内照合、固有DPS、全バフ相関、Grade/Level別素材数量。
- fallbackの全ネットワーク障害パターン、数千マイセットの長期負荷。

## 再現

```sh
pip install -r requirements.txt
python tools/build_engine.py
node tests/engine.test.cjs
python -m unittest discover -s tests -p 'test_*.py' -v
npm install
npx playwright install chromium
npm run test:ui
```

ブラウザ実行環境でCHROMIUM_PATHを指定可能。UIテストは独自の一時localhostサーバーと分離browser contextを使い、本番や利用者の保存データを書き換えません。

ログ: engine-results.txt / pipeline-results.txt / ui-results.json / live-refresh.txt。

**判定: ローカルRC検証PASS。本番投入は実機確認・未確認事項のレビューまで保留。**
