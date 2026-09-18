MH Now Build Lab v0.6.1 skill constraints patch

前提: main に v0.6 RC2.1 の完全ソースが入っていること。

追加機能:
- スキル条件: 必須 / 除外 / 上限
- 除外 = 最終Lv 0のみ許容
- 上限 = 指定Lv以下
- 武器 + 防具 + 有効な漂移錬成を合算した最終スキルに適用
- 最大威力検索はスキル指定条件の影響を受けない
- 条件はbackup / searchConditions / myset snapshotに保存

このPATCHの階層を崩さず main の同名ファイルへ上書き/追加してください。
その後:
1) Actions -> RC checks を確認
2) Settings -> Pages の Source が GitHub Actions であることを確認
3) Actions -> Generate, validate and publish MHN master -> Run workflow (main)
4) 全jobが緑になってから本番Safari/PWA確認

GitHub Actionsで予定する総シナリオ数: 94
ローカル確認済み: Python 22 + Node non-UI 51 = 73 PASS
UI 21件はローカル環境にPlaywright packageがないためActionsで実行予定。
