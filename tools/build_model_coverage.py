"""Generate the documentation table from the same predicate used by UI/engine."""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1]
s=(ROOT/'js/app.js').read_text();modeled=set(json.loads(re.search(r'const MODELED_POWER_SKILLS=(\[.*?\]);',s).group(1)))
for e in ['火','水','雷','氷','龍']:modeled.update([e+'属性攻撃強化',e+'属性攻撃強化・境地'])
master=json.loads((ROOT/'data/mhn_master.json').read_text())
rows=['<!-- COVERAGE:BEGIN -->','以下は `MODELED_POWER_SKILLS` と `isModeled` の属性規則から自動生成（`tools/build_model_coverage.py`）。「未対応」には汎用攻撃スキルも含まれます。','', '| スキル | Generic指数の効果 |','|---|---|']
for k in sorted(master['skills']):rows.append(f'| {k} | '+('対応（条件・近似制限あり）' if k in modeled else 'Lv反映済・指数未対応')+' |')
rows.append('<!-- COVERAGE:END -->');section='\n'.join(rows)
p=ROOT/'DAMAGE_MODEL.md';text=p.read_text();text=re.sub(r'<!-- COVERAGE:BEGIN -->.*?<!-- COVERAGE:END -->',lambda _:section,text,flags=re.S) if '<!-- COVERAGE:BEGIN -->' in text else text+'\n## スキル対応一覧\n\n'+section+'\n';p.write_text(text)
