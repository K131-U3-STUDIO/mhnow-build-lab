# 導入手順 — RC2レビューと実機確認の承認後のみ

今回GitHub書込み、Actions起動、Pages設定変更、公開プレビュー作成はしていません。ここからは将来の管理者作業です。

## 1. 分離して検証

1. 現行アプリからバックアップJSONを退避し、現在のGitHub commitと配信一式を保管。
2. 本成果物の完全ソースを別作業branch/checkoutへ置き、差分レビュー。**以前の3ファイルだけ上書きは禁止**。`js/app.js`, `js/engine.js`, `js/search-worker.js`, `assets/`, `data/`, `icons/`, HTML/manifest/SW、`tools/official_sources.py`・`data_validation.py`等の追加モジュール、テスト、workflowを含めます。
3. 検証先は**本番と異なるorigin**を使用。同じ `owner.github.io` の別リポジトリpathは同一originでlocalStorageを共用するため不可。このRC2は本番キー名を継続し、pathだけでユーザー保存領域を分離しません。ローカル自動テストは新規ブラウザcontextと一時portを使用。
4. 将来の検証URL作成自体も別承認後。SW scope/cacheは配信pathを含めて分離していますが、storage分離の代用にはなりません。

## 2. 完全ビルドと検証

Python 3.12、Node 22以上を想定。依存取得が組織制限で拒否される場合は迂回せず記録してください。

```sh
pip install -r requirements.txt
npm install
npx playwright install chromium
python tools/build_engine.py
python tools/build_model_coverage.py
python tools/build_release.py
python -m unittest discover -s tests -p 'test_*.py' -v
npm test
npm run test:ui
```

`app.js`が計算関数の編集正本、`build_engine.py`がWorker共通engineを生成します。`build_release.py`がengine→worker→appの順にhash名を決め、HTML参照・release-manifest・SWを生成。生成後にHTML/JS/masterを手作業で変更しないこと。変更した場合は全buildとテストを再実行。

`assets/`の過去の公開済みhashファイルは、旧画面が開いたままWorkerを起動する場合に必要なため残してください。RC2初回ZIPには今回の最終ビルドだけを同梱。将来の生成器は既存hash assetsを削除しません。

配信用artifactに含めるもの:

- `index.html`, `service-worker.js`, `manifest.webmanifest`, `release-manifest.json`
- `assets/`, `data/`, `icons/`, `.nojekyll`

ソースbranchには上記に加えて`js/`, `tools/`, `tests/`, docs/依存定義を保管します。ランタイムはhash assetsを読み、Pythonやテストファイルの公開は不要です。相対path配信を維持します。

## 3. master更新からPagesまで

[GitHub公式の公開元設定説明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) の通り、GITHUB_TOKENのcommitだけではbranch-source Pages buildは起動しません。

このRC2の `update-master.yml` は**同一workflow内で**次を実施する導入案です。

1. mainだけで生成。coverage guardが異常なら既存masterを維持し失敗。
2. engine/coverage/hash shellをbuildしてPython・計算・追加回帰・UIを実行。
3. 成功した同一ファイルをbot commit/push。失敗ならartifact/upload/deployへ進まない。
4. 配信ファイルだけをPages artifactとしてupload。
5. `needs: prepare` の別deploy jobで、同じartifactを明示的にdeploy。

生成成功、commit成功、deploy成功は別のステータスです。commitだけの成功を本番反映と呼ばないでください。別のpush-trigger workflowの起動に依存せず、広権限PATも不要です。

管理者による将来設定:

- Settings → Pages → Source を **GitHub Actions** に変更。
- `github-pages` environmentのdeployment branchをmainに制限し、必要なreviewer保護を設定。
- 既存Pages系workflowと競合しないよう `pages-main` concurrencyを共通化。
- prepare jobのcontents:write、deploy jobのpages:write/id-token:writeを許可。他はcontents:read。
- 初回は手動dispatchの全job結果と公開artifactを照合。今回この操作は未実施。

現在のUI回帰は入力RCマスターの件数を固定して検証します。公式データ件数変更で失敗したら、fixtureと新データをレビューして更新し、ガードを無条件に緩めないこと。

## 4. 更新・本番確認・ロールバック

`IPAD_ACCEPTANCE.md`を独立originで実施し、承認後に本番導入。利用者は未保存データを保存/JSON退避してから「更新確認」を押します。全release検証が成功したSWだけが待機し、明示切替で再読み込みします。install失敗は現在版を保持。初回RC1→RC2移行はオンラインで切替を完了してからoffline再起動を確認してください。

masterはnetwork-firstですがschema6・型・件数・14種などの互換検証に失敗した応答はキャッシュを上書きしません。shell navigationはインストールされた版を維持。旧release cacheの自動削除はせず、別scopeや他アプリのcacheも消しません。

ロールバックも一式を再buildして新しいreleaseとして公開します。localStorage/IndexedDBを消去しないこと。旧RC1は新snapshotから旧互換キーへの書戻しを理解しません。コードだけ旧RC1へ戻して古い互換キーを最新データと扱うのは不可。先にv6 JSONを退避し、互換復元を分離環境で確認してください。
