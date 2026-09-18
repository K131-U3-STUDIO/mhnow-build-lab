MH Now Build Lab v0.3 PWA - 導入と操作

【重要】
PWA（ホーム画面アプリ・オフライン起動）として使うには、index.html を file:// で直接開かず、HTTPSのWebサーバーへフォルダ構成のまま配置してください。

■ iPhone / iPad
1. 公開したURLをSafariで開く
2. 共有ボタン（□に↑）をタップ
3. 「ホーム画面に追加」
4. 「追加」
5. ホーム画面の「MHN Build Lab」から起動

初回はオンラインで起動してください。service-worker.js が主要ファイルを保存し、その後は主要画面をオフラインでも起動できます。

■ 基本操作
1. 「最大威力」で武器を選択
2. 弱点属性、スキル発動率、漂移錬成条件を設定
3. 「最大威力構成を検索」
4. 構成をタップして詳細確認
5. 必要なら「比較に追加」「除外」「マイセット登録」

■ スキル指定
「スキル」→欲しいスキルとLvを追加→検索。武器スキルと漂移錬成も合算します。

■ 素材
構成をマイセット登録→「素材」→対象セット→集計。数量登録済み素材は合算し、未登録は関連モンスター/公式参照先を表示します。

■ バックアップ
iOS等でWeb Shareのファイル共有に対応している場合、「バックアップ」で共有シートが開きます。「ファイルに保存」等を選択してください。非対応環境はJSONダウンロードへ自動切替します。

■ データ保存
マイセット・除外・検索条件はブラウザのlocalStorageに保存します。Safariのサイトデータ削除等で消える可能性があるため、大切な設定はバックアップしてください。

■ 配置ファイル
index.html
manifest.webmanifest
service-worker.js
icons/icon-192.png
icons/icon-512.png
icons/apple-touch-icon.png
MHNow_Build_Lab_data_template.json

■ 更新時
フォルダ内ファイルを差し替え、service-worker.js の CACHE_NAME を更新すると確実です。v0.3では mhn-build-lab-v0.3.0 を使用しています。
