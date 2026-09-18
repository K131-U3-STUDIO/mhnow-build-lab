#!/usr/bin/env python3
"""Build MH Now master JSON from public equipment/skill pages.
Sources: mhnow.wiki-db.com (skills/armor) and monsterhunternow.com (weapons).
Designed for GitHub Actions. It is intentionally rate-limited and records source URLs.
"""
from __future__ import annotations
import argparse, concurrent.futures, datetime as dt, json, re, sys, time, unicodedata
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
import requests
from bs4 import BeautifulSoup

UA="MHNow-Build-Lab/0.4 (+personal noncommercial data refresh; GitHub Pages)"
HEADERS={"User-Agent":UA,"Accept-Language":"ja-JP,ja;q=0.9,en;q=0.5"}
SKILL_INDEX="https://mhnow.wiki-db.com/skills/"
ARMOR_INDEX="https://mhnow.wiki-db.com/armors/"
WEAPON_INDEX="https://monsterhunternow.com/weapons"
JA_WEAPON_BASE="https://monsterhunternow.com/ja/weapons/"
WEAPON_SUFFIX_TYPE={
 "swordshield":"片手剣","dualblades":"双剣","greatsword":"大剣","longsword":"太刀",
 "hammer":"ハンマー","huntinghorn":"狩猟笛","lance":"ランス","gunlance":"ガンランス",
 "switchaxe":"スラッシュアックス","chargeblade":"チャージアックス","insectglaive":"操虫棍",
 "lightbowgun":"ライトボウガン","heavybowgun":"ヘビィボウガン","bow":"弓"
}
CANON_WEAPON_TYPES=list(WEAPON_SUFFIX_TYPE.values())
ELEMENTS=["無属性","火","水","雷","氷","龍","毒","麻痺","睡眠","爆破"]

ALIASES={"会心撃〖属性〗":"会心撃【属性】","団結力〖秋のかぼちゃ狩り〗":"団結力【秋のかぼちゃ狩り】","SPゲージ加速〖ジャスト回避〗":"SPゲージ加速【ジャスト回避】","闇討ち〖状態異常〗":"闇討ち【状態異常】","グループハント強化〖防御〗":"グループハント強化【防御】","グループハント強化〖攻撃〗":"グループハント強化【攻撃】","破壊王〖SPスキル〗":"破壊王【SPスキル】","追い打ち〖毒〗":"追い打ち【毒】","追い打ち〖麻痺〗":"追い打ち【麻痺】","ジャスト巧撃〖状態異常〗":"ジャスト巧撃【状態異常】","ジャスト巧撃〖持続〗":"ジャスト巧撃【持続】","絶対回避〖SP〗":"絶対回避【SP】","攻撃増強〖会心〗":"攻撃増強【会心】","破壊王〖尻尾〗":"破壊王【尻尾】","属性攻撃増強〖SP〗":"属性攻撃増強【SP】","SPゲージ加速〖ガード〗":"SPゲージ加速【ガード】","SPゲージ加速〖受け流し〗":"SPゲージ加速【受け流し】"}
def norm(s:str)->str:
 s=unicodedata.normalize("NFKC",s or "")
 s=re.sub(r"\s+"," ",s).strip()
 return ALIASES.get(s,s)
def get(url,timeout=30):
 r=requests.get(url,headers=HEADERS,timeout=timeout);r.raise_for_status();return r.text

def cat(n):
 if any(x in n for x in ["属性攻撃強化","会心撃【属性】","ハイチャージ","属性攻撃増強","鋼龍の凍風","幻獣の疾雷","溟龍の波雷","霞龍の毒霧","冰龍の冰纏","爆破属性強化","毒属性強化","麻痺属性強化","睡眠属性強化"]):return "element"
 if any(x in n for x in ["耐性","防御","ガード性能","ガード強化","精霊の加護","根性","背水防御","体力増強","体幹強化","耳栓","風圧耐性","耐震","堅忍不抜","反射"]):return "defense"
 if any(x in n for x in ["回避","装填","集中","早業","強化持続","SPゲージ","弾導","弾丸節約","チェンジブースト","変形攻撃強化","後の先","チャージマスター"]):return "action"
 if any(x in n for x in ["団結力","ハッピーニューイヤー","ホットサマー"]):return "other"
 return "attack"
FIRE_WORDS=["攻撃","見切り","弱点特効","超会心","連撃","守勢","力任せ","会心撃","属性攻撃強化","渇望","闘気活性","巧撃","闇討ち","火事場力","力の解放","果敢","適正距離","変形攻撃強化","通常弾","斬裂弾","追撃","無心","ダブルインパクト"]

def fetch_skills():
 soup=BeautifulSoup(get(SKILL_INDEX),"html.parser");links=[]
 for a in soup.select('a[href*="/skills/"]'):
  href=urljoin(SKILL_INDEX,a.get("href",""));name=norm(a.get_text(" ",strip=True))
  if href.rstrip("/")==SKILL_INDEX.rstrip("/") or not name:continue
  if href not in [x[1] for x in links]:links.append((name,href))
 out={}
 for i,(fallback,url) in enumerate(links,1):
  try:
   sp=BeautifulSoup(get(url),"html.parser");name=norm(sp.find("h1").get_text(" ",strip=True) if sp.find("h1") else fallback);txt=sp.get_text("\n",strip=True)
   levels=[int(x) for x in re.findall(r"(?:^|\n)\+(\d+)\s*-",txt)];mx=max(levels) if levels else 5
   drift=False
   if "## 漂流石" in txt or "漂流石" in txt:
    after=txt.split("漂流石",1)[-1];drift=not any(x in after[:120] for x in ["Please enable","コンテンツ"])
   out[name]={"max":mx,"category":cat(name),"fire":1 if any(x in name for x in FIRE_WORDS) else 0,"drift":drift,"source":url}
  except Exception as e:print(f"skill warn {url}: {e}",file=sys.stderr)
  time.sleep(.035)
 return out

HEAD_PAT=["ヘルム","ヘッド","クラウン","アンク","ホーン","烏帽子","兜","添髪","面","ゴーグル","ゲヒル"]
CHEST_PAT=["メイル","ベスト","ジャケット","ディール","胸当て","羽織","ムスケル"]
ARMS_PAT=["アーム","グラブ","ハトゥー","篭手","大袖","フォアスト"]
WAIST_PAT=["コイル","ベルト","アンダ","腰当て","帯","フープ","丸帯","ナーベル","フォールド"]
LEGS_PAT=["グリーヴ","パンツ","ペイル","具足","袴","レガース","フェルゼ","フィン"]
def infer_slot(name):
 for slot,pats in [("head",HEAD_PAT),("chest",CHEST_PAT),("arms",ARMS_PAT),("waist",WAIST_PAT),("legs",LEGS_PAT)]:
  if any(x in name for x in pats):return slot
 return None

def fetch_armors(skills):
 soup=BeautifulSoup(get(ARMOR_INDEX),"html.parser");links=[]
 for a in soup.select('a[href*="/armors/"]'):
  href=urljoin(ARMOR_INDEX,a.get("href",""));name=norm(a.get_text(" ",strip=True))
  if href.rstrip("/")==ARMOR_INDEX.rstrip("/") or not name:continue
  if href not in [x[1] for x in links]:links.append((name,href))
 skill_names=sorted(skills,key=len,reverse=True)
 def one(item):
  fallback,url=item
  try:
   sp=BeautifulSoup(get(url),"html.parser");name=norm(sp.find("h1").get_text(" ",strip=True) if sp.find("h1") else fallback);txt=sp.get_text("\n",strip=True);slot=infer_slot(name)
   if not slot:return None
   sd={}
   for k in skill_names:
    vals=[int(x) for x in re.findall(re.escape(k).replace("【","[【〖]").replace("】","[】〗]")+r"\s*\+(\d+)",txt)]
    if vals:sd[k]=max(vals)
   drift=0
   m=re.search(r"(?:^|\n)8\s*\+(\d+)(?:\n|$)",txt);drift=int(m.group(1)) if m else 0
   return {"id":"armor_"+url.rstrip('/').split('/')[-1],"slot":slot,"name":name,"monster":"","grade":"G8","drift":drift,"skills":sd,"source":url,"monsterSource":""}
  except Exception as e:print(f"armor warn {url}: {e}",file=sys.stderr);return None
 out=[]
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
  for x in ex.map(one,links):
   if x:out.append(x)
 return out

def cell_text(td):
 bits=[td.get_text(" ",strip=True)]
 for img in td.find_all("img"):
  bits += [img.get("alt","") or "",img.get("title","") or "",img.get("src","") or ""]
 return " ".join(x for x in bits if x).strip()
def table_matrix(table):
 spans={};rows=[]
 for tr in table.find_all("tr"):
  cells=tr.find_all(["th","td"]);row=[];ci=0
  def fill_spans():
   nonlocal ci
   while ci in spans:
    remain,text=spans[ci];row.append(text);remain-=1
    if remain<=0:del spans[ci]
    else:spans[ci]=(remain,text)
    ci+=1
  fill_spans()
  for td in cells:
   fill_spans();text=cell_text(td);rs=int(td.get("rowspan",1) or 1);cs=int(td.get("colspan",1) or 1)
   for _ in range(cs):
    row.append(text)
    if rs>1:spans[ci]=(rs-1,text)
    ci+=1
  fill_spans();rows.append(row)
 return rows

def nearest_value_before(lines,anchor,candidates):
 try:i=lines.index(anchor)
 except ValueError:return ""
 for x in reversed(lines[max(0,i-12):i]):
  x=norm(x)
  if x in candidates:return x
 return ""

def parse_monster(lines):
 try:i=lines.index("関連するモンスター")
 except ValueError:return ""
 for x in lines[i+1:i+8]:
  x=norm(x)
  if x and x not in ["Image","ステータス","なし"]:return x
 return ""
def element_from(s):
 low=s.lower();maps=[("fire","火"),("water","水"),("thunder","雷"),("ice","氷"),("dragon","龍"),("poison","毒"),("paralysis","麻痺"),("sleep","睡眠"),("blast","爆破")]
 for token,ja in maps:
  if token in low or ja in s:return ja
 return "無属性"
def num(s,default=0):
 m=re.search(r"-?\d+(?:\.\d+)?",s.replace(",",""));return float(m.group()) if m else default

def _extract_weapon_slugs(text):
 """Extract official weapon-family slugs from HTML/XML/JSON/script text."""
 if not text:return set()
 raw=unquote(text.replace(r"\/","/"))
 out=set()
 # Normal / JSON-embedded detail routes.
 for m in re.finditer(r"/(?:ja/|en/)?weapons/([A-Za-z0-9_\-]+)",raw,re.I):
  slug=m.group(1).strip("/")
  if slug.lower() not in {"weapons","weapon"}:out.add(slug)
 # Next.js payload fallback. Accept current and older token spellings.
 suffix=(r"swordshield|sword_and_shield|dualblades|dual_blades|greatsword|great_sword|"
         r"longsword|long_sword|hammer|huntinghorn|hunting_horn|lance|gunlance|gun_lance|"
         r"switchaxe|switch_axe|chargeblade|charge_blade|insectglaive|insect_glaive|"
         r"lightbowgun|light_bowgun|heavybowgun|heavy_bowgun|bow")
 for m in re.finditer(rf"\b([a-z0-9][a-z0-9_\-]*_(?:{suffix}))\b",raw,re.I):out.add(m.group(1))
 return out

def _discover_from_sitemaps():
 """Best-effort discovery from sitemap / sitemap indexes."""
 slugs=set();bodies=[];seen=set()
 seeds=["https://monsterhunternow.com/sitemap.xml","https://monsterhunternow.com/sitemap_index.xml"]
 try:
  robots=get("https://monsterhunternow.com/robots.txt",20)
  seeds += re.findall(r"(?im)^\s*Sitemap:\s*(https?://\S+)",robots)
 except Exception as e:
  print(f"robots discovery warn: {e}",file=sys.stderr)
 for u in dict.fromkeys(seeds):
  try:bodies.append((u,get(u,30)))
  except Exception as e:print(f"sitemap warn {u}: {e}",file=sys.stderr)
 # Follow sitemap indexes up to two levels; do not recurse indefinitely.
 for _ in range(2):
  added=[]
  for _,body in list(bodies):
   slugs |= _extract_weapon_slugs(body)
   for loc in re.findall(r"<loc>\s*([^<]+\.xml(?:\?[^<]*)?)\s*</loc>",body,re.I):
    loc=loc.replace("&amp;","&").strip()
    if loc in seen:continue
    seen.add(loc)
    try:added.append((loc,get(loc,30)))
    except Exception as e:print(f"sitemap child warn {loc}: {e}",file=sys.stderr)
  if not added:break
  bodies.extend(added)
 return slugs

def _existing_weapon_slugs(output_path):
 """Use the last successful master as a discovery seed so site-DOM changes do not zero the catalog."""
 p=Path(output_path)
 if not p.exists():return set(),{}
 try:
  old=json.loads(p.read_text(encoding="utf-8"));by_slug={};slugs=set()
  for w in old.get("weapons",[]):
   if w.get("id")=="custom":continue
   slug=""
   src=w.get("source","") or ""
   m=re.search(r"/(?:ja/|en/)?weapons/([A-Za-z0-9_\-]+)",src,re.I)
   if m:slug=m.group(1)
   if not slug:
    wid=w.get("id","") or ""
    if wid.startswith("weapon_"):slug=wid[len("weapon_"):]
   if slug:
    slugs.add(slug);by_slug[slug]=w
  print("existing master weapon seeds",len(slugs))
  return slugs,by_slug
 except Exception as e:
  print(f"existing master seed warn: {e}",file=sys.stderr);return set(),{}

def _canonical_type_from_slug(slug):
 aliases={
  "sword_and_shield":"片手剣","swordshield":"片手剣",
  "dual_blades":"双剣","dualblades":"双剣",
  "great_sword":"大剣","greatsword":"大剣",
  "long_sword":"太刀","longsword":"太刀",
  "hammer":"ハンマー",
  "hunting_horn":"狩猟笛","huntinghorn":"狩猟笛",
  "lance":"ランス","gun_lance":"ガンランス","gunlance":"ガンランス",
  "switch_axe":"スラッシュアックス","switchaxe":"スラッシュアックス",
  "charge_blade":"チャージアックス","chargeblade":"チャージアックス",
  "insect_glaive":"操虫棍","insectglaive":"操虫棍",
  "light_bowgun":"ライトボウガン","lightbowgun":"ライトボウガン",
  "heavy_bowgun":"ヘビィボウガン","heavybowgun":"ヘビィボウガン",
  "bow":"弓"
 }
 # Longest token first so e.g. gunlance is never confused with lance.
 for token in sorted(aliases,key=len,reverse=True):
  if slug==token or slug.endswith("_"+token):return aliases[token]
 return ""

def discover_weapon_slugs(output_path):
 """Union multiple independent discovery routes plus the last successful master."""
 old_slugs,old_by_slug=_existing_weapon_slugs(output_path)
 slugs=set(old_slugs)
 sitemap_slugs=_discover_from_sitemaps();slugs |= sitemap_slugs
 print("sitemap weapon slugs",len(sitemap_slugs))
 for index in ["https://monsterhunternow.com/weapons","https://monsterhunternow.com/en/weapons","https://monsterhunternow.com/ja/weapons"]:
  try:
   body=get(index,60);sp=BeautifulSoup(body,"html.parser")
   slugs |= _extract_weapon_slugs(body)
   for a in sp.find_all("a",href=True):
    h=urljoin(index,a.get("href",""))
    m=re.search(r"/(?:ja/|en/)?weapons/([A-Za-z0-9_\-]+)",urlparse(h).path,re.I)
    if m:slugs.add(m.group(1))
  except Exception as e:print(f"weapon index discovery warn {index}: {e}",file=sys.stderr)
 # Do NOT discard slugs just because the URL suffix does not encode a weapon type.
 # The official detail page itself is the authority: it exposes a Japanese "武器種" field.
 # Older/current route shapes are allowed here and classified after fetching the detail page.
 slugs={s for s in slugs if s and s.lower() not in {"weapons","weapon"}}
 print("weapon slugs discovered",len(slugs))
 print("weapon slug sample",sorted(slugs)[:12])
 return sorted(slugs),old_by_slug

def fetch_weapons(skills,output_path):
 slugs,old_by_slug=discover_weapon_slugs(output_path)
 if len(slugs)<20:
  print("weapon discovery sample",slugs[:20],file=sys.stderr)
  raise SystemExit(f"weapon discovery too low: {len(slugs)}")
 skill_names=sorted(skills,key=len,reverse=True)

 def pick_name(sp,slug):
  vals=[norm(h.get_text(" ",strip=True)) for h in sp.find_all("h1")]
  vals=[x for x in vals if x and x not in ["武器種","Weapons","Weapon Type"] and x not in CANON_WEAPON_TYPES]
  if vals:return vals[-1]
  title=norm(sp.title.get_text(" ",strip=True) if sp.title else "")
  title=re.sub(r"\s*[–|-]\s*Monster Hunter Now.*$","",title).strip()
  return title or slug

 def one(slug):
  url=urljoin(JA_WEAPON_BASE,slug)
  typ=_canonical_type_from_slug(slug)
  try:
   sp=BeautifulSoup(get(url,40),"html.parser")
   lines=[norm(x) for x in sp.stripped_strings]
   if "関連するモンスター" not in lines:raise ValueError("not a weapon detail page")
   page_type=nearest_value_before(lines,"関連するモンスター",set(CANON_WEAPON_TYPES))
   if page_type in CANON_WEAPON_TYPES:typ=page_type
   if typ not in CANON_WEAPON_TYPES:
    raise ValueError("weapon type could not be classified from detail page")
   name=pick_name(sp,slug);monster=parse_monster(lines)
   best=None
   for table in sp.find_all("table"):
    mat=table_matrix(table)
    if not mat:continue
    hdr=[norm(x) for x in mat[0]]
    if not any("攻撃力" in x for x in hdr):continue
    for row in mat[1:]:
     row=[norm(x) for x in row];text=" | ".join(row);attack=0;aff=0;elemval=0
     for j,h in enumerate(hdr):
      if j>=len(row):continue
      if "攻撃力" in h:attack=int(num(row[j],0))
      elif "会心率" in h:aff=float(num(row[j],0))
      elif "属性" in h:elemval=int(num(row[j],0))
     if attack>0 and (best is None or attack>best[2]):best=(row,text,attack,aff,elemval)
   if not best:raise ValueError("no weapon status table")
   row,text,attack,aff,elemval=best;el=element_from(text)
   if elemval<=0:el="無属性";elemval=0
   sd={};page_text=norm(sp.get_text(" ",strip=True))
   for k in skill_names:
    pat=re.escape(k).replace("【","[【〖]").replace("】","[】〗]")+r"\s*Lv\.?\s*(\d+)"
    vals=[int(x) for x in re.findall(pat,page_text)]
    if vals:sd[k]=max(vals)
   return {"id":"weapon_"+slug,"name":name,"type":typ,"grade":"G10.5","attack":int(attack),"affinity":aff,
           "element":el,"elementValue":int(elemval),"skills":sd,"monster":monster,"source":url}
  except Exception as e:
   # Preserve a prior record only when its weapon type is already one of the 14 canonical types.
   # This prevents legacy misclassified values such as "防具" from leaking back into the new master.
   old=old_by_slug.get(slug)
   if old and old.get("type") in CANON_WEAPON_TYPES:
    x=dict(old);x["source"]=url
    print(f"weapon fallback old {slug}: {e}",file=sys.stderr);return x
   print(f"weapon warn {url}: {e}",file=sys.stderr);return None

 out=[]
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
  for x in ex.map(one,slugs):
   if x:out.append(x)
 # De-duplicate by id and validate all 14 canonical types.
 by_id={w["id"]:w for w in out if w.get("id")}
 out=list(by_id.values())
 counts={t:0 for t in CANON_WEAPON_TYPES}
 for w in out:
  if w.get("type") in counts:counts[w["type"]]+=1
 print("weapon types",json.dumps(counts,ensure_ascii=False))
 missing=[t for t in CANON_WEAPON_TYPES if counts.get(t,0)==0]
 if missing:raise SystemExit("missing weapon types: "+", ".join(missing))
 return out

def main():
 ap=argparse.ArgumentParser();ap.add_argument("--output",default="data/mhn_master.json");args=ap.parse_args();print("Fetching skill index...")
 skills=fetch_skills();print("skills",len(skills));print("Fetching armors...");armors=fetch_armors(skills);print("armors",len(armors));print("Fetching weapons...");weapons=fetch_weapons(skills,args.output);print("weapons",len(weapons))
 custom={"id":"custom","name":"カスタム武器","type":"任意","grade":"手入力","attack":1764,"affinity":0,"element":"無属性","elementValue":0,"skills":{},"monster":"","source":""}
 data={"version":dt.datetime.now(dt.timezone(dt.timedelta(hours=9))).strftime("%Y-%m-%dT%H%M%S+09-auto"),"generatedAt":dt.datetime.now(dt.timezone.utc).isoformat(),"sourceNote":f"自動生成: official weapons {len(weapons)} / wiki-db armors {len(armors)} / skills {len(skills)}","elements":ELEMENTS,"weapons":[custom]+weapons,"skills":skills,"armors":armors,"materialsCatalog":{}}
 if len(skills)<80 or len(armors)<100 or len(weapons)<100:raise SystemExit(f"coverage too low: skills={len(skills)} armors={len(armors)} weapons={len(weapons)}")
 out=Path(args.output);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf-8");print("wrote",out)
if __name__=="__main__":main()
