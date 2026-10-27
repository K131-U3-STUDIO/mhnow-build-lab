"""Validate exact candidate bytes; generate only in an independent git archive."""
from pathlib import Path
import argparse, hashlib, io, json, os, shutil, subprocess, sys, tarfile
ROOT=Path(__file__).resolve().parents[1]
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def run(args,cwd):
    print('+ '+' '.join(map(str,args)),flush=True)
    subprocess.run(args,cwd=cwd,check=True)
def release(root):
    m=json.loads((root/'release-manifest.json').read_text(encoding='utf8'))
    names=sorted(set(m['assets'])|{'release-manifest.json','service-worker.js','js/engine.js','DAMAGE_MODEL.md'})
    for n in names:
        p=(root/n).resolve()
        if not p.is_relative_to(root.resolve()) or not p.is_file(): raise ValueError('invalid release path '+n)
    for n,h in m['assets'].items():
        if digest(root/n)!=h: raise ValueError('release hash mismatch '+n)
    if m['release'] not in (root/'service-worker.js').read_text(encoding='utf8'): raise ValueError('SW mismatch')
    return m,{n:digest(root/n) for n in names}
def provenance(root,manifest,hashes):
    p=root/'ci/generated-provenance.json'
    if not p.exists(): return 'initial',None
    a=json.loads(p.read_text(encoding='utf8'))
    if a.get('files')!=hashes or a.get('release')!=manifest['release']: raise ValueError('fixed artifact provenance mismatch')
    for k in ('sourceCommit','runId','runAttempt'):
        if not a.get(k): raise ValueError('missing provenance '+k)
    return 'fixed-artifact',a
def archive(sha,dest):
    dest.mkdir(parents=True,exist_ok=False)
    data=subprocess.check_output(['git','archive','--format=tar',sha],cwd=ROOT)
    with tarfile.open(fileobj=io.BytesIO(data)) as t:
        if any(m.issym() or m.islnk() for m in t.getmembers()): raise ValueError('archive links prohibited')
        t.extractall(dest,filter='data')
def suite(root,engine):
    engine.mkdir(parents=True,exist_ok=False)
    for n in ('js/app.js','js/engine-prefix.txt','js/engine-suffix.txt','tools/build_engine.py'):
        p=engine/n;p.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(root/n,p)
    run([sys.executable,'tools/build_engine.py'],engine)
    if (engine/'js/engine.js').read_bytes()!=(root/'js/engine.js').read_bytes(): raise ValueError('engine regeneration differs')
    before=release(root)[1]
    run([sys.executable,'tools/data_validation.py','data/mhn_master.json'],root)
    run(['node','--check','js/app.js'],root)
    run([sys.executable,'-m','unittest','discover','-s','tests','-p','test_*.py','-v'],root)
    npm='npm.cmd' if os.name=='nt' else 'npm'
    run([npm,'test'],root)
    run([npm,'run','test:ui'],root)
    if release(root)[1]!=before: raise ValueError('tests changed release bytes')
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--work-dir',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);a=ap.parse_args()
    work,out=a.work_dir.resolve(),a.output.resolve()
    if work.is_relative_to(ROOT) or out.is_relative_to(ROOT) or work.is_relative_to(out) or out.is_relative_to(work): raise ValueError('work/output must be disjoint and outside checkout')
    if work.exists() or out.exists(): raise ValueError('fresh work/output paths required')
    sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
    if sha!=os.environ['CANDIDATE_SHA']: raise ValueError('HEAD is not candidate SHA')
    names=subprocess.check_output(['git','ls-files','-z'],cwd=ROOT).decode().split('\0')[:-1]
    before={n:digest(ROOT/n) for n in names}
    run(['git','diff','--exit-code','HEAD','--'],ROOT)
    committed,generated=work/'committed',work/'generated'
    archive(sha,committed);archive(sha,generated)
    m,hashes=release(committed);kind,prov=provenance(committed,m,hashes)
    print('Candidate kind: '+kind,flush=True)
    suite(committed,work/'committed-engine-check')
    for tool in ('build_master.py','build_engine.py','build_model_coverage.py','build_release.py'): run([sys.executable,'tools/'+tool],generated)
    suite(generated,work/'generated-engine-check')
    if release(committed)[1]!=hashes: raise ValueError('generation changed committed release')
    if {n:digest(ROOT/n) for n in names}!=before: raise ValueError('checkout modified')
    gm,gh=release(generated);out.mkdir(parents=True,exist_ok=False)
    for n in gh:
        p=out/'bundle'/n;p.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(generated/n,p)
    att={'sourceCommit':sha,'runId':os.environ['GITHUB_RUN_ID'],'runAttempt':os.environ['GITHUB_RUN_ATTEMPT'],'release':gm['release'],'files':gh}
    receipt={'candidateSHA':sha,'candidateKind':kind,'committedRelease':m['release'],'committedFiles':hashes,'fixedArtifactProvenance':prov,'checkoutUnchanged':True,'committedSuitePassed':True,'generatedSuitePassed':True,'generatedRelease':gm['release']}
    for n,d in (('attestation.json',att),('verification.json',receipt)): (out/n).write_text(json.dumps(d,indent=2)+'\n',encoding='utf8')
    print(json.dumps(receipt),flush=True)
if __name__=='__main__': main()
