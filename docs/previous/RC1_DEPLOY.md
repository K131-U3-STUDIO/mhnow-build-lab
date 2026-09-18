# Deploy（レビュー承認後のみ）

この成果物作成時にはGitHubへcommit/pushもPages更新も行っていません。

1. 現行アプリからバックアップJSONを保存。現在のGitHubコミットも退避。
2. このsource treeを**別branch**へ配置し差分レビュー。既存repositoryを初期化・削除しない。
3. `pip install -r requirements.txt` → `python tools/build_engine.py` → `node tests/engine.test.cjs` → `python -m unittest discover -s tests -p 'test_*.py' -v`。
4. `npm install` → `npx playwright install chromium` → `npm run test:ui`。通常のChromiumがある場合はCHROMIUM_PATHで指定可能。
5. 別のHTTPS検証URLでiPad Safariとホーム画面起動を確認。既存版を使った端末でバックアップ・除外・漂移・マイセットの保持、旧SWから更新、オフライン起動を確認。
6. REVIEW_REPORTの未確認防具・汎用モデル制約を承認してから、ユーザー自身の通常PR手順でmainへ反映。Pages配信を確認。
7. 必要時のみActionsの「Update MHN master data」を手動実行。更新ガードが失敗した場合、閾値を下げて無理に通さずログを調査。

相対パス構成なので `/mhnow-build-lab/` 配下で動作。indexだけでなくjs/全ファイル、data、icons、manifest、service-workerをまとめて反映。

master生成は公式構造データを優先し、成功時のみatomic replaceします。ワークフローは既存の自動commit/pushを引き継いでいますが、今回は実行していません。導入後は通常のscheduleによりmasterが更新されます。

ロールバックは前コミットのファイル群へ戻し、SW cache名を**新しい別名**へ更新して再公開。localStorageを削除しない。v6ユーザーデータはbackupで保管。旧版はownedDrift/searchConditions等を完全には扱えないため、データ復元互換を別途確認してください。

SW cache: `mhn-build-lab-v06-rc1-20260918`。次の配信変更ではcache識別子も更新してください。
