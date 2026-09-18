import unittest,json,sys,tempfile,copy
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tools'))
import data_validation as dv,official_sources as official,build_master as legacy
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
class Pipeline(unittest.TestCase):
 def setUp(self):self.data=json.loads((ROOT/'data/mhn_master.json').read_text())
 def test_full_coverage(self):self.assertEqual(dv.validate(self.data,self.data)['types'],14)
 def test_drift_coverage(self):self.assertGreaterEqual(sum(s.get('drift',False) for s in self.data['skills'].values()),10);self.assertGreaterEqual(sum(bool(a.get('driftUnlockGrades')) for a in self.data['armors']),50)
 def test_equipment_misclassification(self):
  self.data['weapons'][1]['type']='防具'
  with self.assertRaises(ValueError):dv.validate(self.data)
 def test_relative_coverage(self):
  new=copy.deepcopy(self.data);new['weapons']=new['weapons'][:500]
  with self.assertRaises(ValueError):dv.validate(new,self.data)
 def test_failed_publish_preserves_bytes(self):
  with tempfile.TemporaryDirectory() as d:
   p=Path(d)/'master.json';p.write_text('unchanged');self.data['armors']=[]
   with self.assertRaises(ValueError):dv.atomic_publish(self.data,p)
   self.assertEqual(p.read_text(),'unchanged')
 def test_duplicate_ids(self):
  self.data['weapons'].append(self.data['weapons'][1])
  with self.assertRaises(ValueError):dv.validate(self.data)
 def test_slot_shape(self):
  self.data['armors'][0]['driftUnlockGrades']=[99]
  with self.assertRaises(ValueError):dv.validate(self.data)
 def test_weapon_skill_unlocks(self):
  w=next(w for w in self.data['weapons'] if w['id']=='weapon_AKNOSOM_DUALBLADES');self.assertEqual(w['skills'],{'ロックオン':1});self.assertIn({'grade':8,'skill':'ロックオン','level':1},w['skillUnlocks'])
 def test_official_payload_requires_structure(self):
  self.assertEqual(official.payload('<root-island props=\'{"skills":{"x":1}}\'></root-island>','skills')['skills']['x'],1)
  with self.assertRaises(ValueError):official.payload('<html>changed</html>','skills')
 def test_discovery_routes(self):
  self.assertIn('aknosom_dualblades',legacy._extract_weapon_slugs('<a href="/ja/weapons/aknosom_dualblades">x</a>'))
  self.assertEqual(legacy._canonical_type_from_slug('x_gunlance'),'ガンランス')
 def test_rowspan(self):
  t=BeautifulSoup('<table><tr><th>Grade</th><th>スロット</th></tr><tr><td rowspan="2">5</td><td>1</td></tr><tr><td>1</td></tr><tr><td>8</td><td>2</td></tr></table>','html.parser').table
  self.assertEqual(legacy.table_matrix(t),[['Grade','スロット'],['5','1'],['5','1'],['8','2']])
 def test_official_structured_parser_fixture(self):
  # Minimal source-shaped payload: cumulative slot totals and changing weapon skill levels.
  sp={'guideTranslations':{'SK_A':'攻撃','DRIFTSTONE_NAME_STONE':'漂流石【試験】'},'skills':{'ATK':{'name':'SK_A','maxLevel':5,'category':'ATTACK_BOOST','levels':[{'level':1,'effectAmount':[50],'description':'D'}]}},'driftstones':{'STONE':{'enabled':True,'skills':[{'skillKind':'ATK','skillLevel':1}]}}}
  ap={'guideTranslations':{'A':'試験ヘルム１'},'armor':{'TEST_HEAD':{'category':'HEAD','series':'SERIES_TEST','grades':[{'name':'A','grade':5,'driftsmeltSlots':1,'skills':[{'kind':'ATK','level':1}]},{'name':'A','grade':8,'driftsmeltSlots':2,'skills':[{'kind':'ATK','level':2}]}]}}}
  wp={'guideTranslations':{'W':'試験剣５'},'weapons':{'TEST_SWORDSHIELD':{'category':'SWORD_SHIELD','element':'NO_ELEMENT','series':'SERIES_TEST','grades':[{'name':'W','grade':5,'skills':[{'kind':'ATK','level':1}],'levels':[{'level':1,'attack':100,'critical':0,'elementAttack':0}]},{'name':'W','grade':8,'skills':[{'kind':'ATK','level':2}],'levels':[{'level':5,'attack':500,'critical':10,'elementAttack':0}]}]}}}
  prev={'weapons':[{'id':'custom'}],'armors':[{'id':'keep-me','name':'試験ヘルム','slot':'head'}]}
  out=official.build(sp,ap,wp,prev);a=out['armors'][0];w=out['weapons'][1]
  self.assertEqual(a['id'],'keep-me');self.assertEqual(a['driftUnlockGrades'],[5,8]);self.assertEqual(a['skills'],{'攻撃':2});self.assertEqual(w['skills'],{'攻撃':2});self.assertEqual(w['attack'],500);self.assertEqual(w['skillUnlocks'],[{'grade':5,'skill':'攻撃','level':1},{'grade':8,'skill':'攻撃','level':2}]);self.assertEqual(out['skills']['攻撃']['driftStones'],['漂流石【試験】'])
 def test_official_effect_values(self):
  levels=self.data['skills']['力任せ']['effects'];self.assertEqual(levels[4]['effectAmount'][2],30)
 def test_no_invented_material_quantities(self):
  for r in self.data['weapons']+self.data['armors']:self.assertFalse(r.get('upgradeMaterials',{}).get('steps'))
if __name__=='__main__':unittest.main()
