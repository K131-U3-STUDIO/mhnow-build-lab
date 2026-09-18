# Data schema v6 / RC2 writerRevision

## Master

`schemaVersion: 6`, `version`, `generatedAt` (UTC ISO), `sourceNote`, `canonicalCommit`, `validationStatus`, `elements`, `weapons[]`, `armors[]`, `skills{}`, `driftstones{}`, `materialsCatalog{}`。

provenance: `{sourceURL, retrievedAt, confidence}`。confidenceは `official-structured` / `official-parsed` / `community-parsed` / `stale-fallback` / `legacy-unverified` / `user-entered` / `user-confirmed`。取得不明日時はnull。更新実行時刻で古い行の取得日時を偽装しません。

### weapon

`id`, `name`, `type`（14種類・customのみ任意）, `grade`（例G10.5）, `attack`, `affinity`（百分率）, `element`, `elementValue`, `skills{name: level}`, `skillUnlocks[{grade, skill, level}]`, `monster`, `source`, `provenance`, `upgradeMaterials`。
武器`skills`はマスター行の最終Gradeでの装備スキル。SP技レベルを装備スキルとして混ぜません。

### armor

`id`（既存値維持）, `officialId`, `slot`（head/chest/arms/waist/legs）, `name`, `grade`, `skills`, `skillsByGrade{grade: skills}`, `skillUnlocks`, `drift`（累積最大枠数）, `driftUnlockGrades[]`（枠ごとの解放Grade）, `driftStatus`, `monster`, `source`, `provenance`, `upgradeMaterials`。
例: G5で1枠・G8で2枠なら `drift:2, driftUnlockGrades:[5,8]`。1+2=3とはしません。
解放情報不明は空配列＋unknown。**G8を補完しません。**

### skill / driftstone

skill: `max, category, fire, drift, driftStones[], officialKind, effects[{level, effectAmount[], conditionAmount[], description}], source, provenance`。
`fire`は火力に関係する候補分類であり、計算対応フラグではありません。計算対応はMODELとisModeledで区別します。
`description`は公式のパラメータtemplateで、effectAmountとともに保存。
driftstone: `name, skills[{skill,level}], source, provenance`。提供中の石を構造データで判定。過去イベントの入手可否は保証しません。

## User backup / snapshot

`app:"MH Now Build Lab", schemaVersion:6, writerRevision:"0.6-RC2", version, exportedAt, excluded[], mysets[], requirements{}, manualDrift{}, ownedDrift{}, armorSettings{}, preferences{}`。
永続正本: localStorage `mhnbl_v06_snapshot`。初回は既存v02/v05キーを読み、以後v6を優先。旧キーは移行用の読取専用アーカイブとして保持し、書き戻しません。正本はsnapshotの1キーだけです。
バックアップにschemaVersionがない旧版はv6へ移行。未来の版、未知形式、重複結果ID、21件以上の漂移、複数bonus種、無効数値は拒否。

### ownedDrift

`{ armorId: [ {id, skill, level:1, stone, attack, defense, affinity, provenance} ] }`。
各防具最大20件。idは防具内の錬成結果identity。同名skillの別IDは別結果として保持。同じIDは複数枠に装着できません。他防具の結果は使用不可。
追加パラメータは攻撃/防御/会心のうち一種類。未入力はすべて0。ゲーム内上限が未確認のため入力値は自己申告であり、理論最大値として再利用しません。

### armorSettings

`{armorId:{grade:1..10,unlocks:[grade,...],confidence:"user-confirmed",retrievedAt}}`。
ユーザーがゲーム内で確認したoverride。公式skillsByGradeがある防具はスキルLvも使用Gradeへ連動。

### myset

`id,name,weapon,parts[],skills,drift,driftByArmor,driftStats,score,modelVersion,searchConditions,rawExpected,elemExpected,affinity,slots,created`。
武器、防具、漂移結果は保存時snapshot。旧マイセットのスコアは再計算せず旧モデルとして表示。
searchConditionsには開始時のrequirements、manualDrift、ownedDrift、driftPool、excluded、armorSettings、masterVersion、masterSchemaVersion、weapon snapshot、values（入力値/稼働率）、weaponId、skillCategoryを含めます。全体をdeep clone/freezeし、計算送信元と保存元を一致させます。
「武器条件を読込」は現在masterに同じ武器IDがある場合に入力条件を復元します。未知IDは保持・表示し、読込を止めて対応masterを案内します。旧構成を現在モデルの最適結果とみなしません。

## Materials extension

`upgradeMaterials:{status:"unavailable"|"verified",steps:[{from:{grade,level},to:{grade,level},requirements:[{materialId,name,quantity,sourceType,sourceId,sourceURL}],provenance}]}`。
未確認のquantityは0で埋めず、step未収録またはnull（将来実装）として扱います。現在step集計は未実装。既存materials[]の確認済み数値集計のみを維持し、武器も含めます。

## RC2 validation / recovery

検証と移行はclone上で完了してから永続化。要求は整数Lv1〜20、武器攻撃/属性値0〜100000、会心-100〜100、各稼働率0〜100、Grade1〜10。追加パラメータは攻撃/防御0〜1000、会心0〜100の入力安全境界であり、ゲーム内上限の確定値ではありません。所持結果は防具ごと20件、選択結果は防具ごと3枠までで同ID重複を拒否。5部位のslot/IDは重複不可。score/統計は有限数。未知schema、prototype系キー、25階層超/30万node超、25MB超のimportを拒否。

legacy schemaなしはv6へ移行し任意mapを補完。欠落・未知装備IDはsnapshotに `referenceStatus:"unknown-reference"` を付けて保持（所有/除外キーを変更しない）。既存の `officialId` を優先してマスターを照合し、source URLは言語prefix・query・末尾slashを除いて比較。名前照合はofficialIdも公式装備sourceもない旧行だけ。安定sourceが別装備を指す場合は同名でも統合しません。曖昧一致は生成失敗とし、古い正常masterを残します。

失敗時のメモリー変更は `pendingSave` として未保存表示、再試行/JSON退避可能。再読込で未保存メモリーは失われるため更新SWの切替を止めます。snapshot破損起動は `recoveryLocked` で自動書込み停止、原本bytesをJSON退避可能。正常復元時は `mhnbl_v06_snapshot_quarantine_<timestamp>` に原本を隔離後、新snapshotを一回書込み。隔離に失敗すれば復元しません。読み取り失敗した旧キーも消しません。

同名別IDの漂移結果はRCのidentity modelを維持。公式FAQ/旧告知だけでは同名別結果の同時装着可否を断定できないため、IPAD_ACCEPTANCEのゲーム内確認を必須としています。
