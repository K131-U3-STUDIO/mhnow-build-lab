from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
s=(ROOT/'js/app.js').read_text()
names=['maxLv', 'lv', 'getUptime', 'elementSkill', 'elementAdvanced', 'sumSkills', 'calcFromSkills', 'relevantSkills', 'stateKey', 'reqDeficit', 'reqProgress', 'limitsMet', 'driftableSkill', 'theoreticalCandidateSkills', 'aggregateDrift', 'ownedForArmor', 'comboOptions', 'candidateOwnedRecords', 'optimizeDrift', 'assignManualToArmors', 'currentWeapon', 'effectiveArmor', 'usable', 'driftSlots', 'armorLocalPriority', 'candidateArmors', 'searchPriority', 'canMeetAfterDrift', 'selectedDriftCandidates', 'combine', 'reqMet', 'evaluate', 'enumerate', 'availableDriftSlots', 'isModeled']
constants=['SLOT_ORDER', 'SLOT_JA', 'SEARCH_BEAM_LIMIT', 'SEARCH_FINAL_LIMIT', 'SEARCH_POWER_SLOT_LIMIT', 'SEARCH_SKILL_SLOT_LIMIT', 'MODELED_POWER_SKILLS', 'MODEL_VERSION']
out=[(ROOT/'js/engine-prefix.txt').read_text()]
for name in constants:out.append(re.search(r'^const '+name+r'=.*$',s,re.M).group())
for name in names:
 target='enumerateLocal' if name=='enumerate' else name
 m=re.search(r'^(?:async )?function '+target+r'\([^\n]*',s,re.M)
 end=m.end() if m.group().rstrip().endswith('}') else s.index('\n}',m.start())+2
 out.append(s[m.start():end])
out.append((ROOT/'js/engine-suffix.txt').read_text())
(ROOT/'js/engine.js').write_text('\n'.join(out))
