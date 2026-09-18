"""Produce immutable release assets and an atomic SW shell. Run after build_engine.py."""
from pathlib import Path
import hashlib,json,re
ROOT=Path(__file__).resolve().parents[1]
assets=ROOT/'assets';assets.mkdir(exist_ok=True)
def sha(data):return hashlib.sha256(data).hexdigest()
def asset(kind,text):
    name=f'{kind}.{sha(text.encode())[:16]}.js';(assets/name).write_text(text);return name
engine=asset('engine',(ROOT/'js/engine.js').read_text())
worker=asset('search-worker',(ROOT/'js/search-worker.js').read_text().replace('./engine.js','./'+engine))
app=asset('app',(ROOT/'js/app.js').read_text().replace('./js/search-worker.js','./assets/'+worker))
p=ROOT/'index.html';s=p.read_text();s=re.sub(r'src="\./(?:js/app\.js|assets/app\.[a-f0-9]+\.js)"',f'src="./assets/{app}"',s);p.write_text(s)
files=['index.html','manifest.webmanifest','data/mhn_master.json','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png']+['assets/'+x for x in (engine,worker,app)]
hashes={x:sha((ROOT/x).read_bytes()) for x in files};release='v061-'+sha(json.dumps(hashes,sort_keys=True).encode())[:16]
s=(ROOT/'tools/service-worker.template.js').read_text().replace('__RELEASE__',json.dumps(release)).replace('__ASSETS__',json.dumps(hashes,sort_keys=True))
(ROOT/'service-worker.js').write_text(s);(ROOT/'release-manifest.json').write_text(json.dumps({'release':release,'schemaVersion':6,'assets':hashes},indent=2)+'\n')
# Retain historical immutable assets for clients open across a deployment.
print(release)
