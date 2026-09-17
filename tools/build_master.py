#!/usr/bin/env python3
"""Build MH Now master JSON from public equipment/skill pages.
Sources: mhnow.wiki-db.com (skills/armor) and monsterhunternow.com (weapons).
Designed for GitHub Actions. It is intentionally rate-limited and records source URLs.
"""
from __future__ import annotations
import argparse, concurrent.futures, datetime as dt, json, re, sys, time
from pathlib import Path
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup

UA="MHNow-Build-Lab/0.4 (+personal noncommercial data refresh; GitHub Pages)"
HEADERS={"User-Agent":UA,"Accept-Language":"ja-JP,ja;q=0.9,en;q=0.5"}
SKILL_INDEX="https://mhnow.wiki-db.com/skills/"
ARMOR_INDEX="https://mhnow.wiki-db.com/armors/"
WEAPON_INDEX="https://monsterhunternow.com/ja/weapons"
ELEMENTS=["無属性","火","水","雷","氷","龍","毒","麻痺","睡眠","爆破"]

ALIASES={"会心撃〖属性〗":"会心撃【属性】","団結力〖秋のかぼちゃ狩り〗":"団結力【秋のかぼちゃ狩り】","SPゲージ加速〖ジャスト回避〗":"SPゲージ加速【ジャスト回避】","闇討ち〖状態異常〗":"闇討ち【状態異常】","グループハント強化〖防御〗":"グループハント強化【防御】","グループハント強化〖攻撃〗":"グループハント強化【攻撃】","破壊王〖SPスキル〗":"破壊王【SPスキル】","追い打ち〖毒〗":"追い打ち【毒】","追い打ち〖麻痺〗":"追い打ち【麻痺】","ジャスト巧撃〖状態異常〗":"ジャスト巧撃【状態異常】","ジャスト巧撃〖持続〗":"ジャスト巧撃【持続】","絶対回避〖SP〗":"絶対回避【SP】","攻撃増強〖会心〗":"攻撃増強【会心】","破壊王〖尻尾〗":"破壊王【尻尾】","属性攻撃増強〖SP〗":"属性攻撃増強【SP】","SPゲージ加速〖ガード〗":"SPゲージ加速【ガード】","SPゲージ加速〖受け流し〗":"SPゲージ加速【受け流し】"}
def norm(s:str)->str:
 s=re.sub(r"\s+"," ",s or "").strip();return ALIASES.get(s,s)
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

def parse_type(lines,label):
 try:
  i=lines.index(label)
  for x in lines[i+1:i+6]:
   if x and x not in ["Image","ステータス"]:return x
 except ValueError:pass
 return ""
def element_from(s):
 low=s.lower();maps=[("fire","火"),("water","水"),("thunder","雷"),("ice","氷"),("dragon","龍"),("poison","毒"),("paralysis","麻痺"),("sleep","睡眠"),("blast","爆破")]
 for token,ja in maps:
  if token in low or ja in s:return ja
 return "無属性"
def num(s,default=0):
 m=re.search(r"-?\d+(?:\.\d+)?",s.replace(",",""));return float(m.group()) if m else default

def fetch_weapons(skills):
 html=get(WEAPON_INDEX,60);soup=BeautifulSoup(html,"html.parser");urls=set()
 for a in soup.find_all("a",href=True):
  h=urljoin(WEAPON_INDEX,a["href"])
  if re.search(r"/ja/weapons/[^/?#]+/?$",h) and not h.rstrip('/').endswith('/weapons'):urls.add(h)
 if not urls:
  for h in re.findall(r'https?://monsterhunternow\.com/ja/weapons/[A-Za-z0-9_\-]+|/ja/weapons/[A-Za-z0-9_\-]+',html):urls.add(urljoin(WEAPON_INDEX,h))
 skill_names=sorted(skills,key=len,reverse=True)
 def one(url):
  try:
   sp=BeautifulSoup(get(url,40),"html.parser");h1=sp.find("h1");name=norm(h1.get_text(" ",strip=True) if h1 else url.split('/')[-1]);lines=[norm(x) for x in sp.stripped_strings];typ=parse_type(lines,"武器種");monster=parse_type(lines,"関連するモンスター")
   best=None
   for table in sp.find_all("table"):
    mat=table_matrix(table)
    if not mat:continue
    hdr=mat[0]
    if not any("攻撃力" in x for x in hdr):continue
    for row in mat[1:]:
     text=" | ".join(row);attack=0;aff=0;elemval=0
     # Column-based when headers align, otherwise numeric fallback.
     for j,h in enumerate(hdr):
      if j>=len(row):continue
      if "攻撃力" in h:attack=int(num(row[j],0))
      elif "会心率" in h:aff=float(num(row[j],0))
      elif "属性" in h:elemval=int(num(row[j],0))
     if attack>0:best=(row,text,attack,aff,elemval)
   if not best:return None
   row,text,attack,aff,elemval=best;el=element_from(text)
   if elemval<=0:el="無属性";elemval=0
   sd={};page_text=sp.get_text(" ",strip=True)
   for k in skill_names:
    vals=[int(x) for x in re.findall(re.escape(k).replace("【","[【〖]").replace("】","[】〗]")+r"\s*Lv\s*(\d+)",page_text)]
    if vals:sd[k]=max(vals)
   slug=url.rstrip('/').split('/')[-1]
   return {"id":"weapon_"+slug,"name":name,"type":typ or "不明","grade":"G10.5","attack":int(attack),"affinity":aff,"element":el,"elementValue":int(elemval),"skills":sd,"monster":monster,"source":url}
  except Exception as e:print(f"weapon warn {url}: {e}",file=sys.stderr);return None
 out=[]
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
  for x in ex.map(one,sorted(urls)):
   if x:out.append(x)
 return out

def main():
 ap=argparse.ArgumentParser();ap.add_argument("--output",default="data/mhn_master.json");args=ap.parse_args();print("Fetching skill index...")
 skills=fetch_skills();print("skills",len(skills));print("Fetching armors...");armors=fetch_armors(skills);print("armors",len(armors));print("Fetching weapons...");weapons=fetch_weapons(skills);print("weapons",len(weapons))
 custom={"id":"custom","name":"カスタム武器","type":"任意","grade":"手入力","attack":1764,"affinity":0,"element":"無属性","elementValue":0,"skills":{},"monster":"","source":""}
 data={"version":dt.datetime.now(dt.timezone(dt.timedelta(hours=9))).strftime("%Y-%m-%dT%H%M%S+09-auto"),"generatedAt":dt.datetime.now(dt.timezone.utc).isoformat(),"sourceNote":f"自動生成: official weapons {len(weapons)} / wiki-db armors {len(armors)} / skills {len(skills)}","elements":ELEMENTS,"weapons":[custom]+weapons,"skills":skills,"armors":armors,"materialsCatalog":{}}
 if len(skills)<80 or len(armors)<100 or len(weapons)<20:raise SystemExit(f"coverage too low: skills={len(skills)} armors={len(armors)} weapons={len(weapons)}")
 out=Path(args.output);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf-8");print("wrote",out)
if __name__=="__main__":main()
