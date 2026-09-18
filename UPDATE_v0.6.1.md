# v0.6.1 update

## New UI

スキル指定タブで、各スキルをチェック後に条件種別を選択します。

- 必須: 指定Lv以上
- 除外: 最終Lv 0のみ許容（1以上を含む構成を除外）
- 上限: 指定Lv以下

判定対象は武器スキル・防具スキル・実際に装着される漂移スキルの合計です。

## Deploy

現在mainがv0.6 RC2.1なら、このパッケージの同名ファイル/フォルダをmainへ反映します。反映後は `RC checks` を確認し、次に `Generate, validate and publish MHN master` をmainで実行してください。GitHub Pages SourceはGitHub Actionsを使用します。

本番公開前にActionsで新規テストを含む全検証が緑になることを確認してください。
