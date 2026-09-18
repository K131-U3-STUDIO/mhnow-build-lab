# v0.6 Release Candidate — 2026-09-18

- v0.4.4 canonicalを基にv0.5漂移パッチを統合。既存UI・PWA・アイコンを維持。
- 公式guideの構造化データ取得を新設。武器721/防具366/スキル139。漂移候補76・石37。
- 武器装備スキル161件、属性区分16件、防具枠198件を公式照合で更新。全詳細はdata-diff.json。
- Grade別スキル・漂移枠・武器skillUnlocks・provenanceを保持。
- 漂移管理: 防具専用20件、結果IDによる一意性、編集/削除、Grade確認入力、検索radio UI。
- 所持漂移の同名別結果を保持。二重ID装着を防止。Grade未確認をG8扱いしない。
- Worker探索、スナップショット化、進捗・中止、UI描画上限。
- 汎用指数を明示。力任せLv5、属性会心、会心撃対象、条件会心上限を修正。未対応効果を可視化。
- 武器変更後の詳細・比較・マイセットの不整合を修正。
- backup schema v6、旧版migration、単一snapshot、入力検証。
- master network-firstの固定cache key、Worker/データ事前cache、自己cacheのみ削除。
- 公式優先＋旧discovery fallback、相対coverage・型検証・atomic publication。
- 素材は武器も対象。未知数量を0埋めしない。Grade/Level材料schemaを定義。
- データ診断・自動テスト・実行ログ・mobile viewport画像を追加。

未対応: iPad実機受入、旧防具11件、固有DPS、素材数量、理論漂移bonusの上限最適化。詳細はREVIEW_REPORT。
