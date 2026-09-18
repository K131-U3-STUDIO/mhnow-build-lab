# v0.6.1 Skill Selection UI Fix

## 修正内容

スキル指定一覧のレイアウト崩れを修正しました。

- スキル一覧をサイドパネル内では1列表示に固定
- デスクトップのスキル条件ペインを 430〜500px に拡張
- 各スキルカードを「チェック＋名称」と「条件＋レベル」の2段構成へ変更
- 必須 / 除外 / 上限とレベル選択が横幅不足で潰れない構造へ変更
- 960px以下では結果ペインと縦積み、一覧は2列を許容
- 760px以下では1列へ戻す
- 430px以下では条件 / レベルも縦積み
- iOS Safariの16px入力拡大対策を維持
- スキル検索ロジック、除外/上限判定、Worker探索、バックアップ仕様は変更なし

## テスト

`npm test` を Node 22.16.0 で実行し、以下が全PASSしています。

- engine: 22
- skill constraints engine: 5
- skill constraints app: 5
- RC2 regression: 11
- service worker: 8

合計 51 非UIシナリオ PASS。
