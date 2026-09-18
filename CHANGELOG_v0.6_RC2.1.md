# v0.6 RC2.1 — 2026-09-18

- memory Cache API mockをResponse/stream再利用からbody bytes・status・headersの保存へ変更し、matchごとにfresh Responseを生成。
- Node 22.16.0で元不具合を再現後、Python 3.12.14＋Node 22.16.0とNode 24.19.0で各83シナリオ群を全再実行しPASS。
- TEST_REPORT追記、Node別証跡・出典・SHA更新。アプリ/データ/配信assets/workflowはRC2とbyte一致。GitHub/Pagesは未変更。

アプリの表示版・モデル版・SW release IDはRC2を維持します。本番投入保留条件は継続。
