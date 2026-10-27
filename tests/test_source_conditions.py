import copy
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'tools'))
import official_sources as official
import build_master
import data_validation


class SourceConditions(unittest.TestCase):
    def setUp(self):
        self.skills = {'guideTranslations': {'S': '破壊王・境地'},
                       'skills': {'PART_BREAKER_SECRET': {'name': 'S', 'maxLevel': 2,
                                   'category': 'ATTACK_BOOST', 'levels': []}}, 'driftstones': {}}
        self.armor = {'guideTranslations': {'A': 'Fixture'}, 'armor': {'TEST_HEAD': {
            'category': 'HEAD', 'series': 'SERIES_TEST', 'grades': [
                {'name': 'A', 'grade': 8, 'driftsmeltSlots': 1, 'skills': []}]}}}
        self.weapons = {'guideTranslations': {'W': 'Fixture'}, 'weapons': {'BLACK_DIABLOS_HAMMER': {
            'category': 'HAMMER', 'element': 'NO_ELEMENT', 'series': 'SERIES_TEST', 'grades': [
                {'name': 'W', 'grade': 8, 'skills': [{'kind': 'PART_BREAKER_SECRET', 'level': 1,
                  'requiredCustomEnhancementLevel': 10}],
                 'levels': [{'level': 5, 'attack': 1551, 'critical': -30, 'elementAttack': 0}]}]}}}
        self.previous = {'weapons': [{'id': 'custom'}], 'armors': [], 'skills': {}}

    def build(self):
        return official.build(self.skills, self.armor, self.weapons, self.previous)

    def test_supported_condition_preserved_separately(self):
        self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['customizationSpec']={'customizable':True}
        w=self.build()['weapons'][1]
        self.assertEqual(w['skills'], {})
        self.assertNotIn('customEnhancementMax',w)
        self.assertEqual(w['normalUpgrade'],{'grade':8,'level':5})
        self.assertEqual(w['conditionalSkills'],[{'skill':'破壊王・境地','level':1,'requiredCustomEnhancementLevel':10}])
        self.assertEqual(w['skillUnlocks'][0]['requiredCustomEnhancementLevel'],10)

    def test_unknown_condition_still_rejected(self):
        self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['customizationSpec']={'customizable':True}
        self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['grades'][0]['skills'][0]['unknownCondition']=1
        with self.assertRaises(data_validation.UnsupportedSkillCondition):self.build()

    def test_supported_weapon_rejects_invalid_threshold(self):
        self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['customizationSpec']={'customizable':True}
        row=self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['grades'][0]['skills'][0]
        for value in [0,9,11,20,21,None,False,'10']:
            row['requiredCustomEnhancementLevel']=value
            with self.assertRaises(data_validation.UnsupportedSkillCondition):self.build()

    def test_enabled_weapon_condition_cannot_be_flattened(self):
        with self.assertRaisesRegex(ValueError, r'unsupported.*BLACK_DIABLOS_HAMMER.*requiredCustomEnhancementLevel'):
            self.build()

    def test_condition_in_earlier_grade_also_rejected(self):
        grades = self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['grades']
        last = copy.deepcopy(grades[0]); last['grade'] = 10
        del last['skills'][0]['requiredCustomEnhancementLevel']
        grades.append(last)
        with self.assertRaisesRegex(ValueError, 'requiredCustomEnhancementLevel'):
            self.build()

    def test_armor_condition_cannot_be_flattened(self):
        row = self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['grades'][0]['skills'].pop()
        self.armor['armor']['TEST_HEAD']['grades'][0]['skills'] = [row]
        with self.assertRaisesRegex(ValueError, r'armor.*TEST_HEAD.*requiredCustomEnhancementLevel'):
            self.build()

    def test_present_condition_is_not_assumed_inactive(self):
        row = self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['grades'][0]['skills'][0]
        for value in [0, None, False, '10']:
            with self.subTest(value=value):
                row['requiredCustomEnhancementLevel'] = value
                with self.assertRaisesRegex(ValueError, 'requiredCustomEnhancementLevel'):
                    self.build()

    def test_disabled_weapon_not_consumed(self):
        self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['enabled'] = False
        self.assertEqual(self.build()['weapons'], [{'id': 'custom'}])

    def test_unconditional_skills_keep_existing_mapping(self):
        del self.weapons['weapons']['BLACK_DIABLOS_HAMMER']['grades'][0]['skills'][0]['requiredCustomEnhancementLevel']
        weapon = self.build()['weapons'][1]
        self.assertEqual(weapon['skills'], {'破壊王・境地': 1})
        self.assertEqual(weapon['skillUnlocks'], [{'grade': 8, 'skill': '破壊王・境地', 'level': 1}])

    def test_cli_stops_before_fallback_and_preserves_exact_previous_bytes(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'master.json'
            before = json.dumps(self.previous, ensure_ascii=False).encode('utf8')
            target.write_bytes(before)
            with patch.object(sys, 'argv', ['build_master.py', '--output', str(target)]), \
                 patch.object(official, 'fetch', side_effect=lambda get, prev: self.build()), \
                 patch.object(build_master, 'fetch_skills') as fallback, \
                 patch.object(build_master, 'atomic_publish') as publish:
                with self.assertRaisesRegex(SystemExit, 'fallback disabled'):
                    build_master.main()
                fallback.assert_not_called()
                publish.assert_not_called()
            self.assertEqual(target.read_bytes(), before)
            self.assertEqual(list(Path(tmp).iterdir()), [target])

    def test_cli_condition_rejection_does_not_create_new_output(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'new.json'
            with patch.object(sys, 'argv', ['build_master.py', '--output', str(target)]), \
                 patch.object(official, 'fetch', side_effect=lambda get, prev: self.build()), \
                 patch.object(build_master, 'fetch_skills') as fallback, \
                 patch.object(build_master, 'atomic_publish') as publish:
                with self.assertRaisesRegex(SystemExit, 'fallback disabled'):
                    build_master.main()
                fallback.assert_not_called()
                publish.assert_not_called()
            self.assertFalse(target.exists())


if __name__ == '__main__':
    unittest.main()
