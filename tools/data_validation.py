"""Offline validation and atomic publication. No network required."""
import json, math, os, tempfile
from pathlib import Path
TYPES={'片手剣','双剣','大剣','太刀','ハンマー','狩猟笛','ランス','ガンランス','スラッシュアックス','チャージアックス','操虫棍','ライトボウガン','ヘビィボウガン','弓'}
SLOTS={'head','chest','arms','waist','legs'}
def validate(data, previous=None, require_drift=True):
    official_ids=[a['officialId'] for a in data.get('armors',[]) if a.get('officialId')]
    if len(official_ids)!=len(set(official_ids)):raise ValueError('duplicate armor officialId')
    errors=[]
    weapons=[w for w in data.get('weapons',[]) if w.get('id')!='custom']
    armors=data.get('armors',[]);skills=data.get('skills',{})
    if len(weapons)<100 or len(armors)<100 or len(skills)<80:errors.append('absolute coverage too low')
    if {w.get('type') for w in weapons}!=TYPES:errors.append('14 weapon type coverage failed')
    if {a.get('slot') for a in armors}!=SLOTS:errors.append('armor slot coverage failed')
    for kind,rows in [('weapons',weapons),('armors',armors)]:
        ids=[r.get('id') for r in rows]
        if None in ids or len(ids)!=len(set(ids)):errors.append(kind+' duplicate/missing IDs')
        for r in rows:
            if not r.get('name'):errors.append('missing name')
            if kind=='weapons' and (r.get('slot') in SLOTS or '/armors/' in r.get('source','') or r.get('type') not in TYPES):errors.append('armor classified as weapon')
            if kind=='armors' and ('/weapons/' in r.get('source','') or r.get('type') in TYPES):errors.append('weapon classified as armor')
            if not isinstance(r.get('skills'),dict):errors.append('invalid equipment skills');continue
            for k,v in r['skills'].items():
                if k not in skills or not isinstance(v,int) or isinstance(v,bool) or not 1<=v<=skills[k].get('max',0):errors.append('invalid equipment skill '+k)
    for w in weapons:
        for k in ['attack','affinity','elementValue']:
            v=w.get(k)
            if not isinstance(v,(int,float)) or not math.isfinite(v):errors.append('invalid weapon stat '+k)
        if w.get('attack',0)<=0:errors.append('nonpositive weapon attack')
    if previous:
        for key in ['weapons','armors','skills']:
            if len(data.get(key,[]))<len(previous.get(key,[]))*.9:errors.append(key+' dropped more than 10%')
            if len(previous.get(key,[]))>50 and len(data.get(key,[]))>len(previous[key])*1.5:errors.append(key+' increased more than 50%')
        for t in TYPES:
            old=sum(w.get('type')==t for w in previous.get('weapons',[]))
            new=sum(w.get('type')==t for w in weapons)
            if new<old*.9:errors.append(t+' dropped more than 10%')
    if require_drift:
        if sum(bool(v.get('driftStones')) and v.get('drift') is True for v in skills.values())<10:errors.append('verified drift skill coverage <10')
        if sum(bool(a.get('driftUnlockGrades')) for a in armors)<50:errors.append('drift unlock coverage <50')
        for a in armors:
            if a.get('driftStatus')=='unknown' and a.get('provenance',{}).get('confidence')=='stale-fallback' and (not previous or any(old.get('id')==a.get('id') and old.get('drift')==a.get('drift') for old in previous.get('armors',[]))):continue
            gs=a.get('driftUnlockGrades')
            if not isinstance(gs,list) or len(gs)!=a.get('drift') or len(gs)>3 or any(not isinstance(g,int) or not 1<=g<=10 for g in gs):errors.append('invalid drift unlocks '+a.get('id','?'))
    if errors:raise ValueError('; '.join(dict.fromkeys(errors)))
    return {'weapons':len(weapons),'armors':len(armors),'skills':len(skills),'types':len(TYPES)}
def atomic_publish(data, output, previous=None):
    validate(data,previous)
    output=Path(output);output.parent.mkdir(parents=True,exist_ok=True)
    tmp=None
    try:
        with tempfile.NamedTemporaryFile('w',encoding='utf-8',dir=output.parent,delete=False) as f:
            tmp=f.name;json.dump(data,f,ensure_ascii=False,indent=2);f.flush();os.fsync(f.fileno())
        os.replace(tmp,output)
    finally:
        if tmp and os.path.exists(tmp):os.unlink(tmp)
if __name__=='__main__':
    import argparse
    ap=argparse.ArgumentParser();ap.add_argument('master');ap.add_argument('--allow-legacy',action='store_true');a=ap.parse_args()
    print(json.dumps(validate(json.loads(Path(a.master).read_text()),require_drift=not a.allow_legacy),ensure_ascii=False))
