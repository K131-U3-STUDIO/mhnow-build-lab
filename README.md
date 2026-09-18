# MH Now Build Lab v0.6 RC2

動作済みGitHub版を基準に作られたRCへの修正版です。全面再設計ではありません。**本番投入保留 / iPad実機・公開経路の確認待ち**。

- [独立レビュー対応](RC2_REVIEW_RESPONSE.md)
- [テスト結果](TEST_REPORT.md)
- [データ定義](DATA_SCHEMA.md) / [火力モデル](DAMAGE_MODEL.md)
- [導入手順](DEPLOY.md) / [iPad受入](IPAD_ACCEPTANCE.md)
- [変更履歴](CHANGELOG_v0.6_RC2.md) / [入力・出典](SOURCE_PROVENANCE.json)

GitHub/Pagesは未更新。ソース編集後は `python tools/build_engine.py`、`python tools/build_model_coverage.py`、`python tools/build_release.py` の順に生成し、テストしてください。hash付きassetsを含む配信一式が必要です。3ファイルだけの上書きは不可。

元RCのレポートはdocs/previousへ区別して保持。仕様の未確定値や素材数量を推測で追加していません。
