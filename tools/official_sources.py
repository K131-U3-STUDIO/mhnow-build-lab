"""Parse structured data published in the official guide's HTML island props.
No private endpoints or reference simulator implementation are used.
"""
import json,re,unicodedata,datetime as dt
from urllib.parse import urlsplit
from bs4 import BeautifulSoup
BASE='https://monsterhunternow.com/ja/'
TYPE_MAP=dict(zip(['SWORD_SHIELD','DUAL_BLADES','GREAT_SWORD','LONG_SWORD','HAMMER','HUNTING_HORN','LANCE','GUNLANCE','SWITCH_AXE','CHARGE_BLADE','INSECT_GLAIVE','LIGHT_BOWGUN','HEAVY_BOWGUN','BOW'],['片手剣','双剣','大剣','太刀','ハンマー','狩猟笛','ランス','ガンランス','スラッシュアックス','チャージアックス','操虫棍','ライトボウガン','ヘビィボウガン','弓']))
ELEMENT_MAP={'NO_ELEMENT':'無属性','FIRE':'火','WATER':'水','THUNDER':'雷','ICE':'氷','DRAGON':'龍','POISON':'毒','PARALYSIS':'麻痺','SLEEP':'睡眠','BLAST':'爆破'}
def payload(html,key):
    for tag in BeautifulSoup(html,'html.parser').select('[props]'):
        try:p=json.loads(tag['props'])
        except (ValueError,TypeError):continue
        if isinstance(p.get(key),dict) and p[key]:return p
    raise ValueError('official guide payload missing: '+key)
def clean(s):return unicodedata.normalize('NFKC',s).strip()
def build(skillp,armorp,weaponp,previous):
    now=dt.datetime.now(dt.timezone.utc).isoformat()
    def prov(route):return {'sourceURL':BASE+route,'retrievedAt':now,'confidence':'official-structured'}
    tr=skillp['guideTranslations'];sk=skillp['skills'];names={k:clean(tr[v['name']]) for k,v in sk.items()}
    skills={k:{**v,'drift':False,'driftStones':[],'driftStatus':'unknown'} for k,v in previous.get('skills',{}).items()}
    cats={'ATTACK_BOOST':'attack','ELEMENT_BOOST':'element','DEFENCE_BOOST':'defense','BATTLE_ACTION':'action','OTHERS':'other'}
    for kind,v in sk.items():
        skills[names[kind]]={'max':v['maxLevel'],'category':cats.get(v['category'],'other'),'fire':int(v['category'] in ['ATTACK_BOOST','ELEMENT_BOOST']),'drift':False,'driftStones':[],'source':BASE+'skills','provenance':prov('skills'),'officialKind':kind,'effects':[{'level':l['level'],'effectAmount':l['effectAmount'],'conditionAmount':l.get('conditionAmount',[]),'description':tr.get(l['description'],l['description'])} for l in v['levels']]}
    stones={}
    for kind,v in skillp['driftstones'].items():
        if not v.get('enabled'):continue
        stone=tr.get('DRIFTSTONE_NAME_'+kind)
        if not stone:raise ValueError('missing driftstone translation '+kind)
        stones[kind]={'name':stone,'skills':[],'source':BASE+'skills','provenance':prov('skills')}
        for row in v['skills']:
            if row['skillKind'] not in names:raise ValueError('unknown drift skill kind')
            name=names[row['skillKind']];skills[name]['drift']=True;skills[name]['driftStones'].append(stone);skills[name]['driftStatus']='official-structured';stones[kind]['skills'].append({'skill':name,'level':row['skillLevel']})
    def skillmap(rows):
        out={}
        for r in rows:
            if r['kind'] not in names:raise ValueError('unresolved skill '+r['kind'])
            out[names[r['kind']]]=r['level']
        return out
    def source_key(source):
        u=urlsplit(source or '')
        if u.hostname != 'monsterhunternow.com': return None
        m=re.fullmatch(r'/(?:[a-z]{2}/)?armor/([^/]+)/?',u.path)
        return m[1].casefold() if m else None
    by_official={};by_source={};by_name={}
    for a in previous.get('armors',[]):
        if a.get('officialId'):
            if a['officialId'] in by_official: raise ValueError('duplicate officialId: '+a['officialId'])
            by_official[a['officialId']]=a
        src=source_key(a.get('source'))
        if src: by_source.setdefault(src,[]).append(a)
        if not a.get('officialId') and not src:by_name.setdefault((clean(a['name']),a['slot']),[]).append(a)
    def match_prior(key,name,slot):
        a=by_official.get(key)
        if a:
            if a['slot']!=slot:raise ValueError('officialId slot changed: '+key)
            return a
        candidates=by_source.get(key.casefold(),[])
        if not candidates:candidates=by_name.get((name,slot),[])
        if len(candidates)>1:raise ValueError('ambiguous legacy armor match: '+key)
        if candidates:
            a=candidates[0]
            if a.get('officialId') and a['officialId']!=key:raise ValueError('conflicting official armor ID')
            if a['slot']!=slot:raise ValueError('source slot mismatch')
            return a
        return None
    armor=[];matched=set();at=armorp['guideTranslations']
    for key,v in armorp['armor'].items():
        grades=sorted(v['grades'],key=lambda g:g['grade']);g=grades[-1];slot={'TORSO':'waist'}.get(v['category'],v['category'].lower())
        name=clean(at[grades[0]['name']]);name=re.sub(r'\s*[0-9]+$','',name)
        prior=match_prior(key,name,slot);aid=prior['id'] if prior else 'official_armor_'+key
        if aid in matched:raise ValueError('legacy armor matched twice: '+aid)
        if prior:matched.add(aid)
        unlocks=[];total=0;unlocks_sk=[];last={}
        for row in grades:
            n=row['driftsmeltSlots']
            if n<total:raise ValueError('decreasing slot total')
            unlocks.extend([row['grade']]*(n-total));total=n
            sm=skillmap(row['skills'])
            for k,level in sm.items():
                if last.get(k)!=level:unlocks_sk.append({'grade':row['grade'],'skill':k,'level':level})
            last=sm
        mon=at.get('MONSTER_NAME_'+v['series'].removeprefix('SERIES_'),'')
        armor.append({'id':aid,'officialId':key,'name':name,'slot':slot,'grade':f"G{g['grade']}.5",'skills':skillmap(g['skills']),'skillUnlocks':unlocks_sk,'skillsByGrade':{str(row['grade']):skillmap(row['skills']) for row in grades},'drift':total,'driftUnlockGrades':unlocks,'driftStatus':'official-structured','monster':mon,'source':BASE+'armor/'+key,'provenance':prov('armor'),'upgradeMaterials':{'status':'unavailable','steps':[]}})
    # Preserve unmatched canonical IDs for user ownership, visibly unverified. Do not invent mapping.
    for a in previous.get('armors',[]):
        if a['id'] not in matched:
            armor.append({**a,'driftUnlockGrades':a.get('driftUnlockGrades',[]),'driftStatus':a.get('driftStatus','unknown'),'provenance':{**a.get('provenance',{}),'confidence':'stale-fallback'}})
    wt=weaponp['guideTranslations'];weapons=[]
    for key,v in weaponp['weapons'].items():
        if not v.get('enabled',True):continue
        grades=sorted(v['grades'],key=lambda g:g['grade']);g=grades[-1];level=max(g['levels'],key=lambda l:l['level']);unlocks=[];last={}
        for row in grades:
            sm=skillmap(row['skills'])
            for k,n in sm.items():
                if last.get(k)!=n:unlocks.append({'grade':row['grade'],'skill':k,'level':n})
            last=sm
        if v['element'] not in ELEMENT_MAP:raise ValueError('unknown element '+v['element'])
        weapons.append({'id':'weapon_'+key,'name':clean(wt[g['name']]),'type':TYPE_MAP[v['category']],'grade':f"G{g['grade']}.{level['level']}",'attack':level['attack'],'affinity':level['critical'],'element':ELEMENT_MAP[v['element']],'elementValue':level['elementAttack'],'skills':skillmap(g['skills']),'skillUnlocks':unlocks,'monster':wt.get('MONSTER_NAME_'+v['series'].removeprefix('SERIES_'),''),'source':BASE+'weapons/'+key,'provenance':prov('weapons'),'upgradeMaterials':{'status':'unavailable','steps':[]}})
    custom=next(w for w in previous['weapons'] if w['id']=='custom')
    return {'schemaVersion':6,'version':'0.6-RC-official-'+now,'generatedAt':now,'sourceNote':f'公式構造データ: 武器{len(weapons)} / 防具{len(armor)}（旧データ保持 {len(armor)-len(armorp["armor"])}） / スキル{len(skills)}','elements':list(ELEMENT_MAP.values()),'weapons':[custom]+weapons,'armors':armor,'skills':skills,'driftstones':stones,'materialsCatalog':{},'validationStatus':'parsed-not-gameplay-verified','canonicalCommit':previous.get('canonicalCommit')}
def fetch(get,previous):
    return build(payload(get(BASE+'skills'),'driftstones'),payload(get(BASE+'armor'),'armor'),payload(get(BASE+'weapons'),'weapons'),previous)
