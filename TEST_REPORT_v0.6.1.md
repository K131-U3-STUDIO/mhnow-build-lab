# MH Now Build Lab v0.6.1 Test Report

Date: 2026-09-18

## Added feature

スキル指定検索に「必須 / 除外 / 上限」を追加。除外は `skillLimits[skill]=0`、上限は `skillLimits[skill]=N` として、武器・防具・漂移錬成を合算した最終Lvに適用する。最大威力タブの検索にはスキル指定条件を持ち込まない。

## Local validation

- Python unittest: 22 PASS
- Existing engine tests: 22 PASS
- New engine skill-constraint tests: 5 PASS
- New snapshot / backup constraint tests: 5 PASS
- RC2 regression tests: 11 PASS
- Service Worker release tests: 8 PASS
- Total non-UI: **73 PASS**
- JavaScript syntax checks: PASS

## UI suite

`tests/ui.test.cjs` に「除外 / 上限」UIシナリオを1件追加。既存15件 + 追加1件 = 16件。`tests/rc2-ui.test.cjs` は5件で、CI上のUI予定数は合計21件。

ローカル検証コンテナには Playwright package が無いためUIテストは未実行。`.github/workflows/update-master.yml` は Playwright 1.62.1 と Chromium をインストールし、21件を実行する。

## Expected total in GitHub Actions

Python 22 + non-UI Node 51 + UI 21 = **94 scenarios**。

## Key cases

- 防具由来スキルの完全除外
- 武器固有スキルの完全除外
- 上限Lvちょうどは許容、超過は除外
- 所持漂移が除外スキルでも空スロットを選び条件を守る
- 理論漂移が上限を超えない
- skillLimits のバックアップ互換・凍結snapshot
- 最大威力検索はスキル指定条件を意図的に無視
