# MH Now Build Lab v0.6.1

- スキル指定検索に「必須 / 除外 / 上限」を追加。
- 除外・上限は武器、防具、漂移を合算した最終スキルLvに適用。
- 探索途中でも上限超過状態を枝刈りし、不要な候補を抑制。
- 検索条件、マイセットの searchConditions、バックアップ/復元に skillLimits を追加。
- 旧 schemaVersion 6 バックアップは skillLimits={} として互換読込。
