import unittest,sys,json,copy
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
import official_sources as off, data_validation as dv
sp={'guideTranslations':{'SK':'攻撃'},'skills':{'ATK':{'name':'SK','maxLevel':5,'category':'ATTACK_BOOST','levels':[{'level':1,'effectAmount':[50],'description':'D'}]}},'driftstones':{}}
ap={'guideTranslations':{'A':'試験ヘルム1'},'armor':{'TEST_HEAD':{'category':'HEAD','series':'SERIES_TEST','grades':[{'name':'A','grade':8,'driftsmeltSlots':1,'skills':[{'kind':'ATK','level':1}]}]}}}
wp={'guideTranslations':{'W':'試験剣'},'weapons':{'TEST_SWORDSHIELD':{'category':'SWORD_SHIELD','element':'NO_ELEMENT','series':'SERIES_TEST','grades':[{'name':'W','grade':10,'skills':[{'kind':'ATK','level':1}],'levels':[{'level':5,'attack':1000,'critical':0,'elementAttack':0}]}]}}}

class RC2(unittest.TestCase):
 def old(self):return {'weapons':[{'id':'custom'}],'armors':[{'id':'keep-me','name':'試験ヘルム','slot':'head'}]}
 def test_b07_rename_translation_keeps_id(self):
  first=off.build(sp,ap,wp,self.old()); changed=copy.deepcopy(ap);changed['guideTranslations']['A']='Translated Name 1'
  second=off.build(sp,changed,wp,first)
  self.assertEqual([a['id'] for a in second['armors'] if a.get('officialId')=='TEST_HEAD'],['keep-me'])
 def test_b07_normalized_official_source(self):
  old=self.old();old['armors'][0].update(name='Old name',source='https://monsterhunternow.com/en/armor/test_head/?foo=1')
  self.assertEqual(off.build(sp,ap,wp,old)['armors'][0]['id'],'keep-me')
 def test_b07_legacy_name_auxiliary(self):self.assertEqual(off.build(sp,ap,wp,self.old())['armors'][0]['id'],'keep-me')
 def test_b07_truly_distinct_armor_not_merged(self):
  old=self.old();old['armors'][0]['officialId']='OTHER_HEAD'
  out=off.build(sp,ap,wp,old)
  self.assertEqual({a['id'] for a in out['armors']},{'keep-me','official_armor_TEST_HEAD'})
  old=self.old();old['armors'][0]['source']='https://monsterhunternow.com/ja/armor/OTHER_HEAD'
  self.assertEqual({a['id'] for a in off.build(sp,ap,wp,old)['armors']},{'keep-me','official_armor_TEST_HEAD'})
 def test_b07_ambiguous_legacy_match_fails_closed(self):
  old=self.old();old['armors'].append({**old['armors'][0],'id':'another'})
  with self.assertRaisesRegex(ValueError,'ambiguous'):off.build(sp,ap,wp,old)
 def test_b07_duplicate_official_id_rejected(self):
  data=json.loads((ROOT/'data/mhn_master.json').read_text());a=next(a for a in data['armors'] if a.get('officialId'));data['armors'].append({**a,'id':'duplicate'})
  with self.assertRaisesRegex(ValueError,'officialId'):dv.validate(data)
 def test_b07_ownership_reference_id_stays_stable(self):
  first=off.build(sp,ap,wp,self.old());changed=copy.deepcopy(ap);changed['guideTranslations']['A']='Changed'
  second=off.build(sp,changed,wp,first);refs={'ownedDrift':{'keep-me':[{'id':'result'}]},'excluded':['keep-me'],'parts':['keep-me']}
  self.assertIn(refs['parts'][0],{a['id'] for a in second['armors']});self.assertIn('keep-me',refs['ownedDrift'])
 def test_b06_workflow_explicit_deploy_gate(self):
  s=(ROOT/'.github/workflows/update-master.yml').read_text()
  for text in ["github.ref == 'refs/heads/main'",'needs: prepare','name: github-pages','pages: write','id-token: write','actions/upload-pages-artifact@v3','actions/deploy-pages@v4','node tests/rc2.test.cjs','python tools/build_release.py']:
   self.assertIn(text,s)
  self.assertLess(s.index('Validate the exact artifact'),s.index('Commit generated source'));self.assertLess(s.index('git push'),s.index('actions/upload-pages-artifact'))
if __name__=='__main__':unittest.main()
