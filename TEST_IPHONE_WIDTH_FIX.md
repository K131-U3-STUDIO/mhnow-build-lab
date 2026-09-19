# v0.6.1 iPhone幅修正1 検証結果

## 対象と変更範囲
基準：MHNow_Build_Lab_v0.6.1_FULL_SOURCE_UI_FIXED.zip
基準ZIP SHA-256：d1ffc5cfc03eecfc40ad0e6d407b1272e39e9f0f8444d517ea7a0c865d4ced36

既存ファイルの内容変更は `index.html`、`release-manifest.json`、`service-worker.js` の3つ。
app/engine/Workerの編集用JS、全assets、master、Web Manifest、ビルド/取得ツール、ワークフローの23ファイルは基準とbyte一致。
修正はCSS（最小幅・折り返し・小画面入力表示）とUI修正識別子のみ。検索・計算ロジックは同一。
Service Workerのアルゴリズムは不変。HTMLハッシュ変更に合わせてリリースIDとハッシュを正規ビルドで再生成。

## 不具合再現
幅390 CSS pxのChromium mobile表示で、元版のスキル条件パネルが546.9375px、document.scrollWidthが556pxに拡張。
修正版ではパネル372px（左右余白あり）、document.clientWidth=scrollWidth=390px。
1frの自動最小幅と、min-width:autoのグリッド子要素が内容幅を確保しようとする挙動を抑制。
カテゴリの1行幅をスマートフォンで折り返し、max-widthとmin-widthの両方を指定。
body全体のoverflowを隠す処置は使用していません。

## 検証環境
- Node v22.16.0
- Python 3.13.5
- Python Playwright 1.57.0
- Chromium 144.0.7559.96
- OS: Linux、デスクトップブラウザのモバイル表示設定

## 実行結果
- npm test：51件PASS（engine 22、skill constraints 5、app constraints 5、RC2 11、SW 8）
- Python unittest：22件PASS
- ローカル画面幅検査：74検査PASS
- 実際のapp.jsのDOMイベントによる選択操作：6ケースPASS
- npm run build：PASS。繰り返しビルド後もリリースIDは同一。
- release-manifestの9資源ハッシュ：全一致
- 元のjs/、assets/、master等：23ファイルがbyte一致
- 実機iPhone / iOS Safari / standaloneの確認：未実施
- 既存HTTPナビゲーション型UIテスト一式：今回は再実行していません

### 画面幅検査
幅/高さ（CSS px）：320/568、360/780、375/667、390/844、393/852、414/896、430/932、480/854、600/960、760/1024、768/1024、820/1180、960/768、961/768、1024/768、1366/900、844/390、390/360。
各サイズで「全スキル」「爆破検索」「必須・除外・上限の複数選択」「固定構成結果の描画」を検査（72件）。
追加で操作後と選択解除後の2状態を検査。全74件で文書幅と条件カード/入力欄/結果チップが表示幅内。
端末幅判定はdocument.documentElement.clientWidthを使用。overflow発生時に拡張されるinnerWidthだけの判定はしていません。

### 6操作
追い打ち【爆破】必須Lv5、滅尽龍の渇望の除外とLv無効化、見切り上限Lv1、選択中だけ、選択中と会心カテゴリ併用、全解除。

## 検査方法と制限
この環境のChromiumではローカルHTTPへのPage.gotoがERR_BLOCKED_BY_ADMINISTRATORで停止しました。
その制限を変更せず、ユーザー提供のローカルHTML/CSSをpage.set_contentで描画し、実際のapp.jsを実行。
fetchは同梱masterを返すfixture、localStorageはMapベースのfixtureです。HTML/CSS・スキル描画・イベント処理は本体のままです。
結果欄は本体evaluate/resultHtmlで作った固定構成の描画検査です。UI経由のWorker検索完走テストではありません。
検索・保存・SWの自動検査は上記Node回帰テストの範囲。インストール、更新、ネットワーク、オフライン、iOSキーボードの実動作は証明しません。
390/360は表示領域が低い条件の検査であり、実機ソフトキーボードの検査ではありません。

## 再実行
Python playwrightと許可されたChromium実行ファイルを用意して、リポジトリルートから:

```sh
python tests/iphone_layout_check.py --chromium /usr/bin/chromium
npm test
python -m unittest discover -s tests -p 'test_*.py' -v
npm run build
```

検証ログとスクリーンショットは、別添MHNow_v0.6.1_IPHONE_WIDTH_EVIDENCE.zipに収録。
歴史的なRC/RC2の同梱テスト報告は今回の再実行証拠に置き換えず、そのまま保持しています。

## 技術参照
CSS自動最小幅：https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width
Safe Area：https://webkit.org/blog/7929/designing-websites-for-iphone-x/
