
"use strict";

const BUILTIN = {
 version:"2026-09-18-R4-fallback",
 sourceNote:"v0.4内蔵フォールバック（スキル名一覧は現行、装備は自動マスター生成前の一部）",
 elements:["無属性","火","水","雷","氷","龍","毒","麻痺","睡眠","爆破"],
 weapons:[
  {id:"custom",name:"カスタム武器",type:"任意",grade:"手入力",attack:1764,affinity:0,element:"無属性",elementValue:0,skills:{},source:""},
  {id:"astalos_ss_g10",name:"サルガナスレイピア+ 5",type:"片手剣",grade:"G10",attack:1138,affinity:20,element:"雷",elementValue:1156,skills:{"雷属性攻撃強化":1},source:"https://monsterhunternow.com/en/weapons/astalos_swordshield"},
  {id:"astalos_gs_g10",name:"啼剣ライゼクス改 5",type:"大剣",grade:"G10",attack:1138,affinity:20,element:"雷",elementValue:1156,skills:{"雷属性攻撃強化":1},source:"https://monsterhunternow.com/en/weapons/astalos_greatsword"},
  {id:"astalos_hbg_g10",name:"ワイバーンアサルト+ 5",type:"ヘビィボウガン",grade:"G10",attack:1138,affinity:20,element:"雷",elementValue:1156,skills:{"雷属性攻撃強化":1},source:"https://monsterhunternow.com/weapons/astalos_heavybowgun"},
  {id:"namielle_ig_g10",name:"ヒュドロスアーケーン 5",type:"操虫棍",grade:"G10",attack:1328,affinity:20,element:"水",elementValue:1074,skills:{"狩人の結束":1,"弱点特効":1},source:"https://monsterhunternow.com/weapons/namielle_insectglaive"},
  {id:"bishaten_hammer_g10",name:"大五光槌 5",type:"ハンマー",grade:"G10",attack:1764,affinity:0,element:"無属性",elementValue:0,skills:{"グループハント強化【攻撃】":2},source:"https://monsterhunternow.com/weapons/bishaten_hammer"}
 ],
 skills:{"攻撃":{"max":5,"category":"attack","fire":1},"防御":{"max":5,"category":"defense"},"毒耐性":{"max":5,"category":"defense"},"見切り":{"max":5,"category":"attack","fire":1},"体力増強":{"max":5,"category":"defense"},"水耐性":{"max":5,"category":"defense"},"雷耐性":{"max":5,"category":"defense"},"火耐性":{"max":5,"category":"defense"},"氷耐性":{"max":5,"category":"defense"},"麻痺耐性":{"max":5,"category":"defense"},"体幹強化":{"max":5,"category":"defense"},"尻上がり":{"max":5,"category":"attack"},"不屈":{"max":5,"category":"attack"},"火属性攻撃強化":{"max":5,"category":"element","fire":1},"水属性攻撃強化":{"max":5,"category":"element","fire":1},"氷属性攻撃強化":{"max":5,"category":"element","fire":1},"雷属性攻撃強化":{"max":5,"category":"element","fire":1},"龍属性攻撃強化":{"max":5,"category":"element","fire":1},"ロックオン":{"max":1,"category":"attack"},"根性":{"max":5,"category":"defense"},"背水防御":{"max":5,"category":"defense"},"回避距離UP":{"max":3,"category":"action"},"闇討ち":{"max":5,"category":"attack","fire":1},"集中":{"max":5,"category":"action"},"毒属性強化":{"max":5,"category":"element"},"麻痺属性強化":{"max":5,"category":"element"},"攻めの守勢":{"max":5,"category":"attack","fire":1},"ガード性能":{"max":5,"category":"defense"},"反動軽減":{"max":3,"category":"attack"},"耳栓":{"max":5,"category":"defense"},"装填速度":{"max":3,"category":"action"},"ジャスト回避強化":{"max":5,"category":"action"},"精霊の加護":{"max":5,"category":"defense"},"SPゲージ加速":{"max":3,"category":"action"},"睡眠耐性":{"max":5,"category":"defense"},"風圧耐性":{"max":5,"category":"defense"},"フルチャージ":{"max":5,"category":"attack"},"連撃":{"max":5,"category":"attack","fire":1},"睡眠属性強化":{"max":5,"category":"element"},"火事場力":{"max":5,"category":"attack","fire":1},"KO術":{"max":5,"category":"attack"},"破壊王":{"max":5,"category":"attack"},"弱点特効":{"max":5,"category":"attack","fire":1},"SPスキル威力UP":{"max":5,"category":"attack"},"逆恨み":{"max":5,"category":"attack"},"団結力【秋のかぼちゃ狩り】":{"max":1,"category":"other"},"耐震":{"max":5,"category":"defense"},"軽巧":{"max":5,"category":"attack"},"SPゲージ加速【ジャスト回避】":{"max":5,"category":"action"},"超会心":{"max":5,"category":"attack","fire":1},"闇討ち【状態異常】":{"max":5,"category":"attack"},"早業":{"max":5,"category":"action"},"裂傷耐性":{"max":5,"category":"defense"},"力の解放":{"max":5,"category":"attack","fire":1},"強化持続":{"max":5,"category":"action"},"砲術":{"max":5,"category":"attack"},"SPゲージ保険":{"max":3,"category":"action"},"鋼龍の凍風":{"max":3,"category":"element"},"泡沫の舞":{"max":5,"category":"attack"},"死中に活":{"max":5,"category":"attack"},"目覚めの一撃":{"max":5,"category":"attack"},"ジャスト巧撃":{"max":5,"category":"attack"},"炎王龍の爆塵":{"max":3,"category":"attack"},"爆破属性強化":{"max":5,"category":"element"},"爆破やられ耐性":{"max":5,"category":"defense"},"装填防御":{"max":5,"category":"defense"},"鬼火纏":{"max":5,"category":"attack"},"闘気活性":{"max":5,"category":"attack","fire":1},"追い打ち【毒】":{"max":5,"category":"attack"},"会心撃【属性】":{"max":5,"category":"element","fire":1},"滅尽龍の渇望":{"max":3,"category":"attack","fire":1},"凶会心":{"max":5,"category":"attack"},"グループハント強化【防御】":{"max":3,"category":"defense"},"チェンジブースト":{"max":5,"category":"action"},"回避装填":{"max":5,"category":"action"},"不退転":{"max":5,"category":"attack"},"邁進":{"max":5,"category":"attack"},"幻獣の疾雷":{"max":3,"category":"element"},"勇猛":{"max":5,"category":"attack"},"防御の備え":{"max":3,"category":"defense"},"グループハント強化【攻撃】":{"max":5,"category":"attack","fire":1},"力任せ":{"max":5,"category":"attack","fire":1},"破壊王【SPスキル】":{"max":5,"category":"attack"},"堅忍不抜":{"max":5,"category":"defense"},"霞龍の毒霧":{"max":3,"category":"element"},"災禍転福":{"max":5,"category":"attack"},"ラストバレット":{"max":5,"category":"attack"},"追い打ち【麻痺】":{"max":5,"category":"attack"},"溜打・響音強化":{"max":5,"category":"attack","fire":1},"状態異常蓄積時威力UP":{"max":5,"category":"attack"},"ジャスト巧撃【状態異常】":{"max":5,"category":"attack"},"ハッピーニューイヤー【2024】":{"max":1,"category":"other"},"ホットサマー【2025】":{"max":1,"category":"other"},"溟龍の波雷":{"max":3,"category":"element"},"ジャスト溜め解放":{"max":5,"category":"attack"},"ハイチャージ【雷】":{"max":5,"category":"element"},"弾導強化":{"max":5,"category":"action"},"果敢":{"max":3,"category":"attack","fire":1},"ハイチャージ【氷】":{"max":5,"category":"element"},"ガード強化":{"max":3,"category":"defense"},"追撃":{"max":5,"category":"attack","fire":1},"ハイチャージ【火】":{"max":5,"category":"element"},"ジャスト巧撃【持続】":{"max":5,"category":"attack","fire":1},"チャージマスター":{"max":5,"category":"action"},"攻撃・境地":{"max":2,"category":"attack","fire":1},"劫血纏":{"max":5,"category":"attack"},"ハイチャージ【龍】":{"max":5,"category":"element"},"爵銀龍の紅血":{"max":5,"category":"attack"},"SPゲージ加速【ガード】":{"max":3,"category":"action"},"通常弾・属性通常弾強化":{"max":3,"category":"attack","fire":1},"弾丸節約":{"max":5,"category":"action"},"氷属性攻撃強化・境地":{"max":2,"category":"element"},"雷属性攻撃強化・境地":{"max":2,"category":"element"},"変形攻撃強化":{"max":5,"category":"action","fire":1},"絶対回避【SP】":{"max":3,"category":"action"},"龍耐性":{"max":5,"category":"defense"},"適正距離威力UP":{"max":5,"category":"attack","fire":1},"反射":{"max":5,"category":"defense"},"連撃・境地":{"max":2,"category":"attack","fire":1},"攻撃活性":{"max":3,"category":"attack","fire":1},"攻撃増強【会心】":{"max":5,"category":"attack","fire":1},"本領発揮":{"max":5,"category":"attack","fire":1},"水属性攻撃強化・境地":{"max":2,"category":"element"},"斬裂弾・属性斬裂弾強化":{"max":3,"category":"attack","fire":1},"後の先":{"max":5,"category":"action"},"破壊王【尻尾】":{"max":5,"category":"attack"},"龍属性攻撃強化・境地":{"max":2,"category":"element"},"ハイチャージ【水】":{"max":5,"category":"element"},"属性攻撃増強【SP】":{"max":5,"category":"element"},"無心":{"max":5,"category":"attack","fire":1},"冰龍の冰纏":{"max":5,"category":"element"},"SPゲージ加速【受け流し】":{"max":3,"category":"action"},"ダブルインパクト":{"max":5,"category":"attack","fire":1}},
 armors:[
  {id:"kulu_head",slot:"head",name:"クルルヘルム",monster:"クルルヤック",grade:"G8",drift:1,skills:{"ロックオン":1,"見切り":1},source:"https://monsterhunternow.com/armor/kuluyaku_head",monsterSource:""},
  {id:"nerg_head",slot:"head",name:"オーグヘルム",monster:"ネルギガンテ",grade:"G8",drift:1,skills:{"滅尽龍の渇望":1,"見切り":2,"回避性能":1},source:"https://monsterhunternow.com/armor/nergigante_head",monsterSource:"https://monsterhunternow.com/monsters/nergigante"},
  {id:"kirin_head",slot:"head",name:"キリンホーン",monster:"キリン",grade:"G8",drift:1,skills:{"キリンの雷角":1,"ロックオン":1,"闘気活性":1},source:"https://monsterhunternow.com/armor/kirin_head",monsterSource:"https://monsterhunternow.com/monsters/kirin"},
  {id:"kaiser_head",slot:"head",name:"カイザークラウン",monster:"テオ・テスカトル",grade:"G8",drift:1,skills:{"炎王龍の爆塵":1,"力の解放":2,"根性":1},source:"https://monsterhunternow.com/armor/teostra_head",monsterSource:""},
  {id:"astalos_head",slot:"head",name:"ゼクスヘルム",monster:"ライゼクス",grade:"G8",drift:1,skills:{"雷属性攻撃強化・境地":1,"装填速度":1,"雷属性攻撃強化":1},source:"https://monsterhunternow.com/armor/astalos_head",monsterSource:"https://monsterhunternow.com/monsters/astalos"},
  {id:"mizu_head",slot:"head",name:"ミツネヘルム",monster:"タマミツネ",grade:"G8",drift:1,skills:{"水属性攻撃強化":2},source:"https://monsterhunternow.com/armor/mizutsune_head",monsterSource:""},

  {id:"rath_chest",slot:"chest",name:"レウスメイル",monster:"リオレウス",grade:"G8",drift:1,skills:{"弱点特効":2},source:"https://monsterhunternow.com/armor/rathalos_chest",monsterSource:""},
  {id:"kaiser_chest",slot:"chest",name:"カイザーメイル",monster:"テオ・テスカトル",grade:"G8",drift:1,skills:{"炎王龍の爆塵":1,"見切り":2,"回避性能":1},source:"https://monsterhunternow.com/armor/teostra_chest",monsterSource:""},
  {id:"kirin_chest",slot:"chest",name:"キリンジャケット",monster:"キリン",grade:"G8",drift:1,skills:{"キリンの雷角":1,"超会心":1,"見切り":1},source:"https://monsterhunternow.com/armor/kirin_chest",monsterSource:"https://monsterhunternow.com/monsters/kirin"},
  {id:"glav_chest",slot:"chest",name:"ディノメイル",monster:"ディノバルド",grade:"G8",drift:1,skills:{"ロックオン":1,"力任せ":2},source:"https://monsterhunternow.com/armor/glavenus_chest",monsterSource:""},
  {id:"narga_chest",slot:"chest",name:"ナルガメイル",monster:"ナルガクルガ",grade:"G8",drift:1,skills:{"超会心":2,"ロックオン":1},source:"https://monsterhunternow.com/en/armor/nargacuga_chest",monsterSource:""},
  {id:"nerg_chest",slot:"chest",name:"オーグメイル",monster:"ネルギガンテ",grade:"G8",drift:1,skills:{"滅尽龍の渇望":1,"闇討ち":2,"回避距離UP":1},source:"https://monsterhunternow.com/armor/nergigante_chest",monsterSource:"https://monsterhunternow.com/monsters/nergigante"},
  {id:"astalos_chest",slot:"chest",name:"ゼクスメイル",monster:"ライゼクス",grade:"G8",drift:1,skills:{"雷属性攻撃強化・境地":1,"絶対回避【SP】":2},source:"https://monsterhunternow.com/armor/astalos_chest",monsterSource:"https://monsterhunternow.com/monsters/astalos"},

  {id:"rathian_arms",slot:"arms",name:"レイアアーム",monster:"リオレイア",grade:"G8",drift:1,skills:{"ロックオン":1,"連撃":2},source:"https://monsterhunternow.com/armor/rathian_arms",monsterSource:""},
  {id:"glav_arms",slot:"arms",name:"ディノアーム",monster:"ディノバルド",grade:"G8",drift:1,skills:{"弱点特効":2},source:"https://monsterhunternow.com/armor/glavenus_arms",monsterSource:""},
  {id:"kaiser_arms",slot:"arms",name:"カイザーアーム",monster:"テオ・テスカトル",grade:"G8",drift:1,skills:{"炎王龍の爆塵":1,"砲術":2,"ガード性能":1},source:"https://monsterhunternow.com/armor/teostra_arms",monsterSource:""},
  {id:"kirin_arms",slot:"arms",name:"キリンアーム",monster:"キリン",grade:"G8",drift:1,skills:{"キリンの雷角":1,"超会心":1,"弱点特効":1},source:"https://monsterhunternow.com/armor/kirin_arms",monsterSource:"https://monsterhunternow.com/monsters/kirin"},
  {id:"azure_arms",slot:"arms",name:"リオソウルアーム",monster:"リオレウス亜種",grade:"G8",drift:1,skills:{"超会心":2},source:"https://monsterhunternow.com/armor/azure_rathalos_arms",monsterSource:""},
  {id:"nerg_arms",slot:"arms",name:"オーグアーム",monster:"ネルギガンテ",grade:"G8",drift:1,skills:{"滅尽龍の渇望":1,"攻めの守勢":1,"ガード性能":1},source:"https://monsterhunternow.com/armor/nergigante_arms",monsterSource:"https://monsterhunternow.com/monsters/nergigante"},
  {id:"astalos_arms",slot:"arms",name:"ゼクスアーム",monster:"ライゼクス",grade:"G8",drift:1,skills:{"雷属性攻撃強化・境地":1,"絶対回避【SP】":1,"ジャスト巧撃【持続】":1},source:"https://monsterhunternow.com/armor/astalos_arms",monsterSource:"https://monsterhunternow.com/monsters/astalos"},

  {id:"kaiser_waist",slot:"waist",name:"カイザーコイル",monster:"テオ・テスカトル",grade:"G8",drift:1,skills:{"炎王龍の爆塵":1,"連撃":2},source:"https://monsterhunternow.com/armor/teostra_waist",monsterSource:""},
  {id:"pink_waist",slot:"waist",name:"リオハートコイル",monster:"リオレイア亜種",grade:"G8",drift:1,skills:{"見切り":2},source:"https://monsterhunternow.com/armor/pink_rathian_waist",monsterSource:""},
  {id:"astalos_waist",slot:"waist",name:"ゼクスコイル",monster:"ライゼクス",grade:"G8",drift:1,skills:{"雷属性攻撃強化・境地":1,"会心撃【属性】":1,"見切り":1},source:"https://monsterhunternow.com/armor/astalos_waist",monsterSource:"https://monsterhunternow.com/monsters/astalos"},
  {id:"diablos_waist",slot:"waist",name:"ディアブロコイル",monster:"ディアブロス",grade:"G8",drift:1,skills:{"破壊王":1,"攻めの守勢":2},source:"https://monsterhunternow.com/armor/diablos_waist",monsterSource:""},
  {id:"nerg_waist",slot:"waist",name:"オーグコイル",monster:"ネルギガンテ",grade:"G8",drift:1,skills:{"滅尽龍の渇望":1,"攻撃":2,"破壊王":1},source:"https://monsterhunternow.com/armor/nergigante_waist",monsterSource:"https://monsterhunternow.com/monsters/nergigante"},
  {id:"kulu_waist",slot:"waist",name:"クルルコイル",monster:"クルルヤック",grade:"G8",drift:2,skills:{"背水防御":1,"回避距離UP":1},source:"https://monsterhunternow.com/armor/kuluyaku_waist",monsterSource:""},
  {id:"mizu_waist",slot:"waist",name:"ミツネコイル",monster:"タマミツネ",grade:"G8",drift:1,skills:{"SPゲージ加速":2},source:"https://monsterhunternow.com/en/armor/mizutsune_waist",monsterSource:""},

  {id:"kaiser_legs",slot:"legs",name:"カイザーグリーヴ",monster:"テオ・テスカトル",grade:"G8",drift:1,skills:{"炎王龍の爆塵":1,"超会心":2,"回避距離UP":1},source:"https://monsterhunternow.com/armor/teostra_legs",monsterSource:""},
  {id:"kulu_legs",slot:"legs",name:"クルルグリーヴ",monster:"クルルヤック",grade:"G8",drift:1,skills:{"見切り":2},source:"https://monsterhunternow.com/armor/kuluyaku_legs",monsterSource:""},
  {id:"silver_legs",slot:"legs",name:"シルバーソルグリーヴ",monster:"リオレウス希少種",grade:"G8",drift:1,skills:{"会心撃【属性】":1,"弱点特効":1},source:"https://monsterhunternow.com/armor/silver_rathalos_legs",monsterSource:""},
  {id:"fulgur_legs",slot:"legs",name:"ジャナールグリーヴ",monster:"アンジャナフ亜種",grade:"G8",drift:1,skills:{"SPゲージ加速":2,"力任せ":1},source:"https://monsterhunternow.com/armor/fulgur_anjanath_legs",monsterSource:""},
  {id:"astalos_legs",slot:"legs",name:"ゼクスグリーヴ",monster:"ライゼクス",grade:"G8",drift:1,skills:{"雷属性攻撃強化・境地":1,"雷属性攻撃強化":2},source:"https://monsterhunternow.com/armor/astalos_legs",monsterSource:"https://monsterhunternow.com/monsters/astalos"},
  {id:"rath_legs",slot:"legs",name:"レウスグリーヴ",monster:"リオレウス",grade:"G8",drift:1,skills:{"弱点特効":1},source:"https://monsterhunternow.com/armor/rathalos_legs",monsterSource:""}
 ],
 materialsCatalog:{
  "ライゼクス":[
   {name:"ライゼクスの鱗",rarity:1,source:"ライゼクス討伐"},{name:"ライゼクスの甲殻",rarity:1,source:"ライゼクス討伐"},
   {name:"ライゼクスの尻尾",rarity:2,source:"ライゼクス討伐"},{name:"ライゼクスの冠甲",rarity:3,source:"ライゼクス討伐"},
   {name:"ライゼクスの翼膜",rarity:4,source:"ライゼクス討伐"},{name:"ライゼクスの翼爪",rarity:5,source:"ライゼクス討伐"},
   {name:"ライゼクスの天鱗",rarity:6,source:"ライゼクス討伐"},{name:"竜玉系R6",rarity:6,source:"対象高難度モンスター"}
  ],
  "キリン":[{name:"キリンの雷角",rarity:3,source:"キリン討伐"},{name:"キリンの皮",rarity:3,source:"キリン討伐"},{name:"古龍の血",rarity:4,source:"古龍討伐"},{name:"キリンのたてがみ",rarity:5,source:"キリン討伐"},{name:"キリンの雷玉",rarity:6,source:"キリン討伐"}],
  "ネルギガンテ":[{name:"不滅の龍鱗",rarity:3,source:"ネルギガンテ討伐"},{name:"滅尽龍の甲殻",rarity:3,source:"ネルギガンテ討伐"},{name:"古龍の血",rarity:4,source:"古龍討伐"},{name:"滅尽龍の尻尾",rarity:5,source:"ネルギガンテ討伐"},{name:"滅尽龍の大角",rarity:6,source:"ネルギガンテ討伐"}]
 }
};

let DB = JSON.parse(JSON.stringify(BUILTIN));
const SLOT_ORDER=["head","chest","arms","waist","legs"];
const SLOT_JA={head:"頭",chest:"胴",arms:"腕",waist:"腰",legs:"脚"};
const STORAGE={ex:"mhnbl_v02_excluded",sets:"mhnbl_v02_sets",state:"mhnbl_v02_state",drift:"mhnbl_v05_owned_drift"};
let storageUsable=true;
function readStoredJson(key,fallback){try{const raw=localStorage.getItem(key);return raw===null?fallback:JSON.parse(raw)}catch(e){storageUsable=false;return fallback}}
function writeStoredJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));storageUsable=true;return true}catch(e){storageUsable=false;updatePwaStatus();return false}}
let excluded=new Set();
let mysets=[];
let requirements={};
let skillLimits={}; // 最終スキルLvの上限。0=完全除外
let manualDrift={};
let armorSettings={};
let ownedDrift={};
let driftManageArmorId="";let editingDriftId=null;
let lastPower=[],lastSkill=[],compareList=[];
let currentMaterialSetId="";
const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));

const UPTIMES=[
 {id:"wex",label:"弱点部位への攻撃率",value:100},
 {id:"burst",label:"連撃の稼働率",value:100},
 {id:"guard",label:"攻めの守勢の稼働率",value:0},
 {id:"spirit",label:"闘気活性の稼働率",value:40},
 {id:"dodger",label:"ジャスト巧撃【持続】の稼働率",value:25},
 {id:"sneak",label:"闇討ちの稼働率",value:0},
 {id:"latent",label:"力の解放の稼働率",value:40},
 {id:"heroics",label:"火事場力の稼働率",value:0}
];

function maxLv(name){return DB.skills[name]?.max??5}
function lv(tbl,l){return l>0?(tbl[Math.min(l,tbl.length)-1]??tbl[tbl.length-1]??0):0}
function getUptime(id){const e=$("up_"+id);return e?+e.value/100:0}
function elementSkill(el){return ["火","水","雷","氷","龍"].includes(el)?`${el}属性攻撃強化`:null}
function elementAdvanced(el){return ["火","水","雷","氷","龍"].includes(el)?`${el}属性攻撃強化・境地`:null}

function sumSkills(parts,weaponSkills={},drift={}){
 const s={};
 for(const src of [weaponSkills,...parts.map(x=>x.skills||{}),drift]){
  for(const [k,v] of Object.entries(src||{})) s[k]=(s[k]||0)+(+v||0);
 }
 for(const k of Object.keys(s))s[k]=Math.min(s[k],maxLv(k));
 return s;
}

function calcFromSkills(skills,weapon,statBonus={}){
 let raw=(+weapon.attack||0)+(+statBonus.attack||0), aff=(+weapon.affinity||0)+(+statBonus.affinity||0), elem=+weapon.elementValue||0;
 const baseAff=aff, b=[];
 if(+statBonus.attack)b.push(["漂移付加・攻撃力",`攻撃 +${+statBonus.attack}`]);if(+statBonus.affinity)b.push(["漂移付加・会心率",`会心 +${+statBonus.affinity}%`]);
 const atk=lv([50,100,150,200,300],skills["攻撃"]||0); if(atk){raw+=atk;b.push(["攻撃",`攻撃 +${atk}`])}
 if((skills["攻撃"]||0)>=5){const v=lv([150,350],skills["攻撃・境地"]||0);if(v){raw+=v;b.push(["攻撃・境地",`攻撃 +${v}`])}}

 const reckless=skills["力任せ"]||0;if(reckless){const attack=lv([100,200,300,400,500],reckless),penalty=lv([5,10,15,20,30],reckless);raw+=attack;aff-=penalty;b.push(["力任せ",`攻撃 +${attack} / 会心 -${penalty}%`])}
 const ce=lv([10,15,20,30,40],skills["見切り"]||0);if(ce){aff+=ce;b.push(["見切り",`会心 +${ce}%`])}
 const wex=lv([20,25,30,40,50],skills["弱点特効"]||0)*getUptime("wex");if(wex){aff+=wex;b.push(["弱点特効",`平均会心 +${wex.toFixed(1)}%`])}
 const latent=lv([20,30,40,50,60],skills["力の解放"]||0)*getUptime("latent");if(latent){aff+=latent;b.push(["力の解放",`平均会心 +${latent.toFixed(1)}%`])}

 if(skills["グループハント強化【攻撃】"] && $("groupHunt").checked){const v=80*skills["グループハント強化【攻撃】"];raw+=v;b.push(["グループハント強化【攻撃】",`グループ狩猟: 攻撃 +${v}`])}

 const elemName=elementSkill(weapon.element);
 if(elemName){const add=lv([50,100,200,350,500],skills[elemName]||0);if(add){elem+=add;b.push([elemName,`属性 +${add}`])}}
 const advName=elementAdvanced(weapon.element);
 if(advName && (skills[elemName]||0)>=5){const add=lv([200,400],skills[advName]||0);if(add){elem+=add;b.push([advName,`属性 +${add}`])}}


 const powerhouse=lv([.10,.15,.25],skills["攻撃活性"]||0);if(powerhouse){raw*=1+powerhouse;b.push(["攻撃活性",`物理 ×${1+powerhouse}`])}
 const burst=lv([.05,.10,.15,.20,.30],skills["連撃"]||0)*getUptime("burst");if(burst){raw*=1+burst;b.push(["連撃",`平均物理 ×${(1+burst).toFixed(3)}`])}
 const guard=lv([.10,.15,.20,.30,.40],skills["攻めの守勢"]||0)*getUptime("guard");if(guard){raw*=1+guard;b.push(["攻めの守勢",`平均物理 ×${(1+guard).toFixed(3)}`])}
 const hero=lv([.10,.20,.30,.40,.50],skills["火事場力"]||0)*getUptime("heroics");if(hero){raw*=1+hero;b.push(["火事場力",`平均物理 ×${(1+hero).toFixed(3)}`])}

 const critBoost=skills["超会心"]?lv([1.30,1.35,1.40,1.45,1.50],skills["超会心"]):1.25;
 // Integrate conditional affinity before clamping: average-then-clamp biases caps/negative affinity.
 const wexFull=lv([20,25,30,40,50],skills["弱点特効"]||0),latentFull=lv([20,30,40,50,60],skills["力の解放"]||0);
 const wp=getUptime("wex"),lp=getUptime("latent"),fixed=aff-wexFull*wp-latentFull*lp;
 let critMul=0,posCrit=0,effAff=0;
 for(const [onW,pw] of [[0,1-wp],[1,wp]])for(const [onL,pl] of [[0,1-lp],[1,lp]]){const probability=pw*pl,a=clamp(fixed+onW*wexFull+onL*latentFull,-100,100);effAff+=probability*a;critMul+=probability*(a>=0?1+a/100*(critBoost-1):1+(-a)/100*(.75-1));posCrit+=probability*Math.max(0,a)/100}
 let rawExp=raw*critMul;b.push(["会心期待値",`${effAff.toFixed(1)}% / 倍率 ${critBoost.toFixed(2)} → ×${critMul.toFixed(4)}`]);
 // Generic damage: critical affects elemental damage; critical-element increase applies to weapon element only.
 const inc=lv([.30,.40,.50,.60,.80],skills["会心撃【属性】"]||0);
 elem=elem*critMul+(+weapon.elementValue||0)*inc*posCrit*critBoost;
 if(inc)b.push(["会心撃【属性】",`武器属性値のみ +${(inc*100).toFixed(0)}%（会心時）`]);

 const nerg=lv([.10,.15,.20],skills["滅尽龍の渇望"]||0);if(nerg){rawExp*=1+nerg;elem*=1+nerg;b.push(["滅尽龍の渇望",`ダメージ ×${(1+nerg).toFixed(2)}`])}
 const fs=lv([.10,.15,.20,.25,.35],skills["闘気活性"]||0)*getUptime("spirit");if(fs){rawExp*=1+fs;elem*=1+fs;b.push(["闘気活性",`平均ダメージ ×${(1+fs).toFixed(3)}`])}
 const daring=lv([.05,.10,.20],skills["果敢"]||0);if(daring){rawExp*=1+daring;elem*=1+daring;b.push(["果敢",`ダメージ ×${1+daring} / ジャスト回避不可`])}
 if(daring&&skills["ジャスト巧撃【持続】"])b.push(["発動制約","果敢によりジャスト巧撃【持続】は発動不可（加点0）"]);
 const od=(daring?0:1)*lv([.10,.15,.20,.25,.35],skills["ジャスト巧撃【持続】"]||0)*getUptime("dodger");if(od){rawExp*=1+od;elem*=1+od;b.push(["ジャスト巧撃【持続】",`平均ダメージ ×${(1+od).toFixed(3)}`])}
 const sn=lv([.10,.15,.20,.25,.30],skills["闇討ち"]||0)*getUptime("sneak");if(sn){rawExp*=1+sn;elem*=1+sn;b.push(["闇討ち",`平均ダメージ ×${(1+sn).toFixed(3)}`])}

 const useElem=$("weakElement").checked && !["無属性","毒","麻痺","睡眠","爆破"].includes(weapon.element);
 const elemExp=useElem?elem:0;
 return {score:rawExp+elemExp,rawExpected:rawExp,elemExpected:elemExp,affinity:effAff,breakdown:b};
}


const SKILL_CATEGORY_LABELS={all:"すべて",attack:"攻撃",element:"属性",affinity:"会心",weapon:"武器専用",sp:"SP",action:"アクション",defense:"防御・耐性",other:"その他"};
let skillCategory="all";
let skillCatalogReady=false;
let armorCatalogReady=false;
let weaponPickerIndexReady=false;
let weaponPickerRows=[];
let skillAvailabilityCache=new Map();
let armorSlotCache={head:[],chest:[],arms:[],waist:[],legs:[]};
const WEAPON_RENDER_LIMIT=80;
const SEARCH_BEAM_LIMIT=2600;
const SEARCH_FINAL_LIMIT=120;
const SEARCH_POWER_SLOT_LIMIT=22;
const SEARCH_SKILL_SLOT_LIMIT=34;
const CANON_WEAPON_TYPES=["片手剣","双剣","大剣","太刀","ハンマー","狩猟笛","ランス","ガンランス","スラッシュアックス","チャージアックス","操虫棍","ライトボウガン","ヘビィボウガン","弓"];
const WEAPON_SUFFIX_TYPE={swordshield:"片手剣",dualblades:"双剣",greatsword:"大剣",longsword:"太刀",hammer:"ハンマー",huntinghorn:"狩猟笛",lance:"ランス",gunlance:"ガンランス",switchaxe:"スラッシュアックス",chargeblade:"チャージアックス",insectglaive:"操虫棍",lightbowgun:"ライトボウガン",heavybowgun:"ヘビィボウガン",bow:"弓"};
const MODELED_POWER_SKILLS=["攻撃活性","果敢","力任せ","攻撃","攻撃・境地","見切り","弱点特効","力の解放","グループハント強化【攻撃】","連撃","攻めの守勢","火事場力","超会心","会心撃【属性】","滅尽龍の渇望","闘気活性","ジャスト巧撃【持続】","闇討ち"];

function normalizeWeaponType(w){
 let t=String(w?.type||"").normalize("NFKC").replace(/\s+/g,"");
 if(t==="チャージアックス")t="チャージアックス";
 if(CANON_WEAPON_TYPES.includes(t))return t;
 const src=String(w?.source||"").toLowerCase(),slug=(src.split("/").filter(Boolean).pop()||"").split("?")[0];
 for(const [suffix,ja] of Object.entries(WEAPON_SUFFIX_TYPE))if(slug===suffix||slug.endsWith("_"+suffix))return ja;
 return "";
}
function rebuildFastIndexes(){
 armorSlotCache={head:[],chest:[],arms:[],waist:[],legs:[]};
 for(const a of DB.armors)if(armorSlotCache[a.slot])armorSlotCache[a.slot].push(a);
 weaponPickerRows=DB.weapons.filter(w=>w.id!=="custom").map(w=>({w,search:[w.name,w.type,w.element,w.monster,w.sourceMaterial,w.source].filter(Boolean).join(" ").toLowerCase()}));
 skillAvailabilityCache=new Map();
 for(const a of DB.armors)for(const k of Object.keys(a.skills||{})){const x=skillAvailabilityCache.get(k)||{a:0,w:0};x.a++;skillAvailabilityCache.set(k,x)}
 for(const w of DB.weapons)for(const k of Object.keys(w.skills||{})){const x=skillAvailabilityCache.get(k)||{a:0,w:0};x.w++;skillAvailabilityCache.set(k,x)}
 weaponPickerIndexReady=true;skillCatalogReady=false;armorCatalogReady=false;
}
function nextPaint(){return new Promise(resolve=>requestAnimationFrame(()=>resolve()));}

function normalizeMaster(o){
 if(!o.elements)o.elements=BUILTIN.elements;
 if(!o.skills)o.skills={};
 for(const [k,v] of Object.entries(BUILTIN.skills))if(!o.skills[k])o.skills[k]={...v,drift:false,confidence:"builtin-unverified"};
 if(!Array.isArray(o.weapons))o.weapons=[];if(!Array.isArray(o.armors))o.armors=[];
 const cleaned=[];
 for(const w0 of o.weapons){
  const w={...w0};
  if(w.id==="custom"){cleaned.push(w);continue}
  const t=normalizeWeaponType(w);
  if(!t)continue;
  w.type=t;cleaned.push(w);
 }
 o.weapons=cleaned;
 if(!o.weapons.some(w=>w.id==="custom"))o.weapons.unshift(JSON.parse(JSON.stringify(BUILTIN.weapons[0])));
 for(const a of o.armors){a.drift=Math.max(0,+a.drift||0);if(!Array.isArray(a.driftUnlockGrades))a.driftUnlockGrades=[];a.driftStatus=a.driftStatus||(a.driftUnlockGrades.length?"source-parsed":"unknown")}
 for(const [name,d] of Object.entries(o.skills||{})){if(/見切り|弱点特効|超会心|会心撃/.test(name))d.category="affinity";else if(/砲術|弾|集中|変形|チャージ/.test(name))d.category="weapon";else if(/SP/.test(name))d.category="sp";if(!Array.isArray(d.driftStones))d.driftStones=[];if(d.driftStones.length)d.drift=true}
 if(!o.materialsCatalog)o.materialsCatalog={};
 return o;
}
async function tryLoadBundledMaster(){
 try{
  const r=await fetch("./data/mhn_master.json",{cache:"no-store"});if(!r.ok)return false;
  const o=normalizeMaster(await r.json());validateMaster(o);DB=o;return true;
 }catch(e){return false}
}
function updateDataCoverage(){
 if($("covWeapons"))$("covWeapons").textContent=Math.max(0,DB.weapons.filter(w=>w.id!=="custom").length).toLocaleString();
 if($("covArmors"))$("covArmors").textContent=DB.armors.length.toLocaleString();
 if($("covSkills"))$("covSkills").textContent=Object.keys(DB.skills).length.toLocaleString();
 if($("dataSourceNote"))$("dataSourceNote").textContent=DB.sourceNote||"内蔵フォールバックデータ";
}
function updateWeaponSummary(w){
 if(!w||!$("weaponSummary"))return;
 const sk=Object.entries(w.skills||{}).filter(([,v])=>+v>0).map(([k,v])=>`${esc(k)} Lv${v}`).join(" / ");
 $("weaponSummary").innerHTML=`<b>${esc(w.type||"任意")}｜${esc(w.name)}</b><div class="meta">${esc(w.element||"無属性")} ${w.elementValue||0} / 攻撃 ${w.attack||0} / 会心 ${w.affinity||0}%${w.monster?` / ${esc(w.monster)}`:""}</div>${sk?`<div class="weapon-skill-box"><div class="weapon-skill-label">武器装備スキル（構成計算へ反映）</div><div class="chips">${chipHtml(w.skills||{})}</div></div>`:""}`;
}
function renderWeaponPicker(){
 if(!weaponPickerIndexReady)rebuildFastIndexes();
 const q=($("weaponSearch")?.value||"").trim().toLowerCase(),ty=$("weaponTypeFilter")?.value||"",el=$("weaponElementFilter")?.value||"";
 const current=$("weaponSelect").value;
 let rows=weaponPickerRows;
 if(ty)rows=rows.filter(x=>x.w.type===ty);if(el)rows=rows.filter(x=>x.w.element===el);if(q)rows=rows.filter(x=>x.search.includes(q));
 rows=[...rows].sort((a,b)=>(a.w.type||"").localeCompare(b.w.type||"","ja")||(a.w.element||"").localeCompare(b.w.element||"","ja")||(a.w.name||"").localeCompare(b.w.name||"","ja"));
 const total=rows.length,shown=rows.slice(0,WEAPON_RENDER_LIMIT);
 $("weaponMatchCount").textContent=total>WEAPON_RENDER_LIMIT?`${total.toLocaleString()}件 / 先頭${WEAPON_RENDER_LIMIT}件表示（絞り込み推奨）`:`${total.toLocaleString()}件 / 全${Math.max(0,DB.weapons.length-1).toLocaleString()}件`;
 $("weaponPickerList").innerHTML=shown.length?shown.map(x=>{const w=x.w;return `<button class="weapon-row ${w.id===current?"active":""}" data-id="${esc(w.id)}"><div><div class="wname">${esc(w.name)}</div><div class="wmeta">${esc(w.type||"")} / ${esc(w.element||"無属性")}${w.monster?` / ${esc(w.monster)}`:""}<br>武器装備スキル: ${esc(Object.entries(w.skills||{}).map(([k,v])=>k+" Lv"+v).join(" / ")||"なし")}</div></div><div class="wstat">攻 ${w.attack||0}<br>会 ${w.affinity||0}% / 属 ${w.elementValue||0}</div></button>`}).join(""):`<div class="empty">該当武器がありません。</div>`;
 document.querySelectorAll("#weaponPickerList .weapon-row").forEach(b=>b.onclick=()=>{const w=DB.weapons.find(x=>x.id===b.dataset.id);if(!w)return;$("weaponSelect").innerHTML=`<option value="${esc(w.id)}">${esc(w.name)}</option>`;$("weaponSelect").value=w.id;setWeapon(w);$("weaponModal").classList.remove("open");persist()});
}
function openWeaponPicker(){
 const present=new Set(DB.weapons.filter(w=>w.id!=="custom").map(w=>w.type).filter(Boolean));
 const types=CANON_WEAPON_TYPES.filter(x=>present.has(x));
 const els=[...new Set(DB.weapons.filter(w=>w.id!=="custom").map(w=>w.element||"無属性"))];
 $("weaponTypeFilter").innerHTML='<option value="">全武器種</option>'+types.map(x=>`<option>${esc(x)}</option>`).join("");
 $("weaponElementFilter").innerHTML='<option value="">全属性</option>'+els.map(x=>`<option>${esc(x)}</option>`).join("");
 $("weaponSearch").value="";$("weaponTypeFilter").value="";$("weaponElementFilter").value="";
 $("weaponModal").classList.add("open");renderWeaponPicker();
}
function skillAvailability(k){return skillAvailabilityCache.get(k)||{a:0,w:0};}
function renderSkillCategories(){
 $("skillCats").innerHTML=Object.entries(SKILL_CATEGORY_LABELS).map(([k,v])=>`<button class="skill-cat ${skillCategory===k?"active":""}" data-cat="${k}">${v}</button>`).join("");
 document.querySelectorAll("#skillCats .skill-cat").forEach(b=>b.onclick=()=>{skillCategory=b.dataset.cat;renderSkillCategories();renderSkillCatalog();persist()});
}
function skillConditionMode(k){if(Object.prototype.hasOwnProperty.call(requirements,k))return "required";if(Object.prototype.hasOwnProperty.call(skillLimits,k))return skillLimits[k]===0?"exclude":"max";return ""}
function setSkillCondition(k,mode,level=1){delete requirements[k];delete skillLimits[k];if(mode==="required")requirements[k]=clamp(+level||1,1,maxLv(k));else if(mode==="exclude")skillLimits[k]=0;else if(mode==="max")skillLimits[k]=clamp(+level||1,1,maxLv(k))}
function renderSkillCatalog(){
 if(!$('skillCheckList'))return;
 const q=($('skillSearchText').value||'').trim().toLowerCase(),only=$('skillSelectedOnly').checked;
 let names=Object.keys(DB.skills).sort((a,b)=>a.localeCompare(b,'ja'));
 if(skillCategory!=='all')names=names.filter(k=>(DB.skills[k]?.category||'other')===skillCategory);
 if(q)names=names.filter(k=>k.toLowerCase().includes(q));if(only)names=names.filter(k=>skillConditionMode(k));
 names.sort((a,b)=>(skillConditionMode(b)?1:0)-(skillConditionMode(a)?1:0)||a.localeCompare(b,'ja'));
 const requiredCount=Object.keys(requirements).length,excludedCount=Object.values(skillLimits).filter(v=>v===0).length,maxCount=Object.values(skillLimits).filter(v=>v>0).length;
 $('skillSelectedCount').textContent=`必須 ${requiredCount} / 除外 ${excludedCount} / 上限 ${maxCount} / 表示 ${names.length}件`;
 $('skillCheckList').innerHTML=names.slice(0,160).map(k=>{const d=DB.skills[k]||{},max=d.max||5,mode=skillConditionMode(k),active=!!mode,sel=mode==='required'?requirements[k]:mode==='max'?skillLimits[k]:1,av=skillAvailability(k);let opts='';for(let n=1;n<=max;n++)opts+=`<option value="${n}" ${sel===n?'selected':''}>Lv${n}</option>`;return `<div class="skill-row ${active?'selected':''} ${mode==='exclude'?'excluded':''} ${mode==='max'?'maxed':''}" data-skill="${esc(k)}"><input class="skill-check" type="checkbox" ${active?'checked':''}><div><div class="sname">${esc(k)}</div><div class="smeta">防具 ${av.a} / 武器 ${av.w}${d.drift?' / 漂移可':''}</div></div><select class="skill-mode"><option value="required" ${mode==='required'||!mode?'selected':''}>必須</option><option value="exclude" ${mode==='exclude'?'selected':''}>除外</option><option value="max" ${mode==='max'?'selected':''}>上限</option></select><select class="skill-lv" ${mode==='exclude'?'disabled':''}>${opts}</select></div>`}).join('');
 document.querySelectorAll('#skillCheckList .skill-row').forEach(row=>{const k=row.dataset.skill,cb=row.querySelector('.skill-check'),modeSel=row.querySelector('.skill-mode'),lvsel=row.querySelector('.skill-lv');const apply=()=>{if(!cb.checked){delete requirements[k];delete skillLimits[k]}else setSkillCondition(k,modeSel.value,+lvsel.value||1);renderReq();persist();renderSkillCatalog()};cb.onchange=apply;modeSel.onchange=()=>{cb.checked=true;lvsel.disabled=modeSel.value==='exclude';apply()};lvsel.onchange=()=>{if(cb.checked)apply()}});
}
function relevantSkills(req,weapon,limits=skillLimits){
 const set=new Set([...MODELED_POWER_SKILLS,...Object.keys(req||{}),...Object.keys(limits||{}),...Object.keys(weapon.skills||{})]);
 const es=elementSkill(weapon.element),ea=elementAdvanced(weapon.element);if(es)set.add(es);if(ea)set.add(ea);
 if($("driftMode").value==="theory")for(const k of theoreticalCandidateSkills(weapon,req,limits))set.add(k);
 return [...set].filter(k=>DB.skills[k]||Object.prototype.hasOwnProperty.call(req||{},k)||Object.prototype.hasOwnProperty.call(limits||{},k)||Object.prototype.hasOwnProperty.call(weapon.skills||{},k));
}
function stateKey(skills,rel,slots,parts=[]){const mode=$("driftMode").value,tail=mode==="owned"?"#"+parts.map(p=>p.id).join("|"):"";return rel.map(k=>Math.min(skills[k]||0,maxLv(k))).join(",")+"#"+Math.min(slots,10)+tail}
function reqDeficit(skills,req){let d=0;for(const [k,v] of Object.entries(req||{}))d+=Math.max(0,v-(skills[k]||0));return d}
function reqProgress(skills,req){let p=0;for(const [k,v] of Object.entries(req||{}))p+=Math.min(v,skills[k]||0);return p}
function limitsMet(skills,limits=skillLimits){for(const [k,v] of Object.entries(limits||{}))if((skills[k]||0)>v)return false;return true}
function driftableSkill(k){return DB.skills[k]?.drift===true || (Array.isArray(DB.skills[k]?.driftStones)&&DB.skills[k].driftStones.length>0)}
function theoreticalCandidateSkills(weapon,req={},limits=skillLimits){
 if(theoryCandidateCache)return theoryCandidateCache;
 const base=sumSkills([],weapon.skills,{}),must=Object.keys(req||{}).filter(driftableSkill),selected=selectedDriftCandidates(weapon);
 const all=Object.keys(DB.skills).filter(k=>driftableSkill(k)&&(DB.skills[k]?.fire||must.includes(k)||selected.includes(k)));
 const es=elementSkill(weapon.element);if(es&&driftableSkill(es))all.push(es);
 const uniq=[...new Set([...must,...selected,...all])].filter(k=>!Object.prototype.hasOwnProperty.call(limits||{},k)||(base[k]||0)<limits[k]),baseScore=calcFromSkills(base,weapon).score;
 const scored=uniq.map(k=>{const s=combine(base,{[k]:1});return {k,q:calcFromSkills(s,weapon).score-baseScore+(must.includes(k)?1e7:0)+(selected.includes(k)?1e5:0)}}).sort((a,b)=>b.q-a.q);
 return theoryCandidateCache=scored.slice(0,12).map(x=>x.k);
}
function aggregateDrift(byArmor){const out={};for(const arr of Object.values(byArmor||{}))for(const r of arr||[])out[r.skill]=(out[r.skill]||0)+(r.level||1);return out}
function armorDriftLabel(a){if(a.driftStatus==="unknown")return "漂移情報未確認";const gs=Array.isArray(a.driftUnlockGrades)?a.driftUnlockGrades:[];return a.drift?`漂移${a.drift}${gs.length?` (G${gs.join("/G")})`:""}`:"漂移なし"}
function ownedForArmor(id){const x=ownedDrift[id];return Array.isArray(x)?x:[]}
function comboOptions(items,maxPick){const out=[[]];function rec(start,cur){if(cur.length>=maxPick)return;for(let i=start;i<items.length;i++){cur.push(items[i]);out.push([...cur]);rec(i+1,cur);cur.pop()}}rec(0,[]);return out}
function candidateOwnedRecords(part,weapon,req,base){
 const seen=new Set();return ownedForArmor(part.id).filter(r=>r&&r.id&&r.skill&&!seen.has(r.id)&&(seen.add(r.id),true)).slice(0,20);
}
function optimizeDrift(parts,base,weapon,req,mode,limits=skillLimits){
 let states=[{skills:base,byArmor:{},bonus:{attack:0,affinity:0,defense:0},q:calcFromSkills(base,weapon).score}];
 const rel=relevantSkills(req,weapon);
 const theory=mode==="theory"?theoreticalCandidateSkills(weapon,req,limits):[];
 for(const part of parts){
  const slots=availableDriftSlots(part);if(!slots)continue;
  let items=[];
  if(mode==="theory")items=theory.flatMap(k=>Array.from({length:slots},(_,i)=>({id:`theory:${part.id}:${k}:${i}`,skill:k,level:1,attack:0,affinity:0,defense:0,stone:(DB.skills[k]?.driftStones||[]).join(" / ")})));
  else items=candidateOwnedRecords(part,weapon,req,base);
  const options=comboOptions(items,Math.min(slots,3)),map=new Map();
  for(const st of states){for(const opt of options){let add={};for(const r of opt)add[r.skill]=(add[r.skill]||0)+(r.level||1);const skills=combine(st.skills,add);if(!limitsMet(skills,limits))continue;const bonus={attack:st.bonus.attack,affinity:st.bonus.affinity,defense:st.bonus.defense};for(const r of opt){bonus.attack+=+r.attack||0;bonus.affinity+=+r.affinity||0;bonus.defense+=+r.defense||0}const byArmor={...st.byArmor};if(opt.length)byArmor[part.id]=opt.map(x=>({...x}));const score=calcFromSkills(skills,weapon,bonus).score,def=reqDeficit(skills,req),q=score-def*1e7;const key=rel.map(k=>skills[k]||0).join(",")+`#${bonus.attack}#${bonus.affinity.toFixed(2)}`;const old=map.get(key);if(!old||q>old.q)map.set(key,{skills,byArmor,bonus,q})}}
  states=[...map.values()].sort((a,b)=>b.q-a.q).slice(0,64);
 }
 const valid=states.filter(x=>reqMet(x.skills,req)).sort((a,b)=>calcFromSkills(b.skills,weapon,b.bonus).score-calcFromSkills(a.skills,weapon,a.bonus).score);return valid[0]||null;
}
function assignManualToArmors(parts){
 const byArmor={},capacity=new Map(parts.map(p=>[p.id,availableDriftSlots(p)]));
 for(const [skill,count0] of Object.entries(manualDrift)){let count=+count0||0;if(!driftableSkill(skill))return null;for(const p of parts){while(count>0&&(capacity.get(p.id)||0)>0){const arr=byArmor[p.id]||[];arr.push({id:`manual:${p.id}:${skill}:${arr.length}`,level:1,skill,attack:0,affinity:0,defense:0,stone:"manual"});byArmor[p.id]=arr;capacity.set(p.id,capacity.get(p.id)-1);count--}}if(count>0)return null}
 return byArmor;
}

function currentWeapon(){
 const preset=DB.weapons.find(w=>w.id===$("weaponSelect").value)||DB.weapons[0];
 return {...preset,attack:+$("rawInput").value||0,affinity:+$("affInput").value||0,element:$("elementSelect").value,elementValue:+$("elemInput").value||0};
}
function setWeapon(w){if(!w)return;$("rawInput").value=w.attack||0;$("affInput").value=w.affinity||0;$("elementSelect").value=w.element||"無属性";$("elemInput").value=w.elementValue||0;updateWeaponSummary(w)}
function effectiveArmor(a){const setting=armorSettings[a.id];if(!setting||!a.skillsByGrade)return a;const grades=Object.keys(a.skillsByGrade).map(Number).filter(g=>g<=setting.grade).sort((a,b)=>b-a);if(!grades.length)return null;return {...a,grade:`G${setting.grade}`,skills:a.skillsByGrade[grades[0]]}}
function usable(slot){return (armorSlotCache[slot]||[]).filter(a=>!excluded.has(a.id)).map(effectiveArmor).filter(Boolean)}
function driftSlots(parts){return parts.reduce((n,p)=>n+availableDriftSlots(p),0)}
function armorLocalPriority(p,weapon,req,base,limits=skillLimits){
 const ps=p.skills||{};let reqScore=0;
 for(const [k,v] of Object.entries(req||{}))reqScore+=Math.min(v,ps[k]||0)*10000000;
 const merged=combine(base,ps);if(!limitsMet(merged,limits))return -1e15;const power=calcFromSkills(merged,weapon).score;
 const rows=$("driftMode").value==="owned"&&availableDriftSlots(p)?ownedForArmor(p.id):[];
 const own=Math.max(0,...rows.map(r=>calcFromSkills(combine(merged,{[r.skill]:r.level||1}),weapon,r).score-power+(req[r.skill]?1e7:0)));
 return reqScore+power+availableDriftSlots(p)*25+own;
}
function candidateArmors(slot,weapon,req,base,limits=skillLimits){
 const all=usable(slot).filter(p=>limitsMet(combine(base,p.skills||{}),limits));if(all.length<=SEARCH_SKILL_SLOT_LIMIT)return all;
 const limit=Object.keys(req||{}).length?SEARCH_SKILL_SLOT_LIMIT:SEARCH_POWER_SLOT_LIMIT;
 const scored=all.map(p=>({p,q:armorLocalPriority(p,weapon,req,base,limits)})).sort((a,b)=>b.q-a.q);
 const keep=new Map(scored.slice(0,limit).map(x=>[x.p.id,x.p]));
 if(Object.keys(req||{}).length){
  for(const k of Object.keys(req)){
   let n=0;
   for(const x of scored){if((x.p.skills?.[k]||0)>0){keep.set(x.p.id,x.p);if(++n>=10)break}}
  }
 }
 return [...keep.values()].sort((a,b)=>armorLocalPriority(b,weapon,req,base,limits)-armorLocalPriority(a,weapon,req,base,limits)).slice(0,Math.max(limit,40));
}
function searchPriority(st,weapon,req){
 const target=Object.values(req||{}).reduce((a,b)=>a+(+b||0),0);
 const progress=target?reqProgress(st.skills,req)/target:0;
 const deficit=reqDeficit(st.skills,req);
 return progress*1e9-deficit*1e7+calcFromSkills(st.skills,weapon).score+(st.slots||0)*10;
}
function canMeetAfterDrift(st,req,limits=skillLimits){
 if(!limitsMet(st.skills,limits))return false;if(!Object.keys(req||{}).length)return true;const mode=$("driftMode").value;if(mode==="none")return reqMet(st.skills,req);if(mode==="manual")return true;
 for(const [k,v] of Object.entries(req)){if((st.skills[k]||0)>=v)continue;if(mode!=="owned"&&!driftableSkill(k))return false}return true;
}

function selectedDriftCandidates(weapon){
 const nodes=[...document.querySelectorAll("#driftPool input:checked")].map(x=>x.value);
 return nodes.map(x=>x==="__ELEMENT__"?(elementSkill(weapon.element)||"攻撃"):x).filter((x,i,a)=>x&&driftableSkill(x)&&a.indexOf(x)===i);
}
function combine(base,add){const s={...base};for(const [k,v]of Object.entries(add||{}))s[k]=Math.min((s[k]||0)+v,maxLv(k));return s}
function reqMet(skills,req){for(const [k,v]of Object.entries(req||{}))if((skills[k]||0)<v)return false;return true}


function evaluate(parts,weapon,req={},limits=skillLimits){
 const base=sumSkills(parts,weapon.skills,{}),slots=driftSlots(parts),mode=$("driftMode").value;if(!limitsMet(base,limits))return null;
 if(mode==="none"){if(!reqMet(base,req)||!limitsMet(base,limits))return null;return {...calcFromSkills(base,weapon),skills:base,drift:{},driftByArmor:{},driftStats:{attack:0,affinity:0,defense:0},slots,usedDrift:0}}
 if(mode==="manual"){const byArmor=assignManualToArmors(parts);if(!byArmor)return null;const drift=aggregateDrift(byArmor),skills=combine(base,drift);if(!reqMet(skills,req)||!limitsMet(skills,limits))return null;const c=calcFromSkills(skills,weapon);return {...c,skills,drift,driftByArmor:byArmor,driftStats:{attack:0,affinity:0,defense:0},slots,usedDrift:Object.values(drift).reduce((a,b)=>a+b,0)}}
 const best=optimizeDrift(parts,base,weapon,req,mode,limits);if(!best)return null;const drift=aggregateDrift(best.byArmor),stats=best.bonus;if(!limitsMet(best.skills,limits))return null;const c=calcFromSkills(best.skills,weapon,stats);return {...c,skills:best.skills,drift,driftByArmor:best.byArmor,driftStats:stats,slots,usedDrift:Object.values(drift).reduce((a,b)=>a+b,0)}
}

async function enumerateLocal(req={},progressCb=null){
 theoryCandidateCache=null;const weapon=currentWeapon(),base=sumSkills([],weapon.skills,{});if(!limitsMet(base,skillLimits))return [];const rel=relevantSkills(req,weapon,skillLimits);
 const lists=SLOT_ORDER.map(slot=>candidateArmors(slot,weapon,req,base,skillLimits));if(lists.some(x=>x.length===0))return [];
 let states=[{parts:[],skills:base,slots:0}];
 for(let si=0;si<lists.length;si++){
  const list=lists[si],map=new Map();
  for(const st of states){
   for(const p of list){
    const skills=combine(st.skills,p.skills||{});if(!limitsMet(skills,skillLimits))continue;const slots=st.slots+availableDriftSlots(p),key=stateKey(skills,rel,slots,[...st.parts,p]);
    if(!map.has(key))map.set(key,{parts:[...st.parts,p],skills,slots});
   }
  }
  states=[...map.values()];
  if(states.length>SEARCH_BEAM_LIMIT){states.sort((a,b)=>searchPriority(b,weapon,req)-searchPriority(a,weapon,req));states=states.slice(0,SEARCH_BEAM_LIMIT)}
  if(progressCb)progressCb(`検索中… ${SLOT_JA[SLOT_ORDER[si]]} ${states.length.toLocaleString()}候補`);
  await nextPaint();
 }
 states=states.filter(st=>canMeetAfterDrift(st,req,skillLimits)).sort((a,b)=>searchPriority(b,weapon,req)-searchPriority(a,weapon,req)).slice(0,SEARCH_FINAL_LIMIT);
 const out=[];
 for(let i=0;i<states.length;i++){
  const st=states[i],ev=evaluate(st.parts,weapon,req,skillLimits);if(ev)out.push({parts:st.parts,weapon:{...weapon},modelVersion:MODEL_VERSION,...ev});
  if(i%5===4){if(progressCb)progressCb(`最終評価中… ${i+1}/${states.length}`);await nextPaint()}
 }
 if(progressCb)progressCb(`最終評価中… ${states.length}/${states.length}`);return out;
}

function chipHtml(skills,drift={},req={},limits={}){
 return Object.entries(skills).filter(([,v])=>v>0).sort((a,b)=>a[0].localeCompare(b[0],"ja")).map(([k,v])=>{
  const cls=drift[k]?"drift":req[k]?"req":Object.prototype.hasOwnProperty.call(limits,k)?"limit":DB.skills[k]?.fire?"fire":"";
  const d=drift[k]?` <span style="opacity:.75">(+${drift[k]})</span>`:"";
  return `<span class="chip ${cls}">${esc(k)} Lv${v}${d}${skills["果敢"]&&k==="ジャスト巧撃【持続】"?" <small>果敢により発動不可・加点0</small>":isModeled(k)?"":" <small>Lv反映済・指数未対応</small>"}</span>`;
 }).join("");
}
function resultHtml(r,i,req={},limits={}){
 const eq=r.parts.map(p=>`${SLOT_JA[p.slot]}:${p.name}`).join(" / ");
 return `<div class="result" data-i="${i}"><div class="rank">#${i+1}</div><div>
 <div class="equip"><b>${esc(eq)}</b></div><div class="note">未対応効果を除外した参考順位${r.skills["果敢"]&&r.skills["ジャスト巧撃【持続】"]?" / 果敢: ジャスト巧撃【持続】は発動不可・加点0":""}</div><div class="chips">${chipHtml(r.skills,r.drift,req,limits)}</div>
 <div class="result-actions"><button class="btn small cmp" data-i="${i}">比較+</button></div></div>
 <div class="score">${r.score.toFixed(1)}<small>火力指数 / 漂移 ${r.usedDrift}/${r.slots}</small></div></div>`;
}


let activeSearch=null,searchSequence=0;
function deepSnapshot(x){const out=JSON.parse(JSON.stringify(x));const freeze=v=>{if(v&&typeof v==="object"){Object.values(v).forEach(freeze);Object.freeze(v)}return v};return freeze(out)}
function searchSnapshot(req={},limits=skillLimits){const prefs=capturePreferences();return deepSnapshot({db:DB,ownedDrift,manualDrift,armorSettings,requirements:req,skillLimits:limits,excluded:[...excluded],weapon:currentWeapon(),config:{values:{...prefs.values,weaponSelect:{value:prefs.weaponId}},driftPool:prefs.driftPool},preferences:prefs})}
function enumerate(req={},progressCb=null,limits=skillLimits){
 if(typeof Worker==="undefined")return Promise.reject(new Error("このブラウザはWeb Worker非対応です。Safariを更新してください。"));
 activeSearch?.cancel();const input=searchSnapshot(req,limits),mode=input.config.values.driftMode.value;
 if(mode==="theory"&&!Object.keys(input.db.skills).some(driftableSkill))return Promise.reject(new Error("漂移候補データが0件のため理論探索を開始できません。"));
 const started=performance.now(),id=++searchSequence;$("cancelSearch").disabled=false;
 return new Promise((resolve,reject)=>{
  const worker=new Worker("./js/search-worker.js");let timer,settled=false;
  const current=()=>!settled&&activeSearch?.id===id;
  const finish=()=>{settled=true;clearInterval(timer);worker.terminate();if(activeSearch?.id===id){activeSearch=null;$("cancelSearch").disabled=true}};
  activeSearch={id,cancel:()=>{if(!current())return;finish();reject(new Error("検索を中止しました"))}};
  timer=setInterval(()=>{if(current())$("searchProgress").textContent=`探索中 ${(performance.now()-started)/1000|0}秒`},500);
  worker.onmessage=({data})=>{if(!current())return;if(data.type==="progress"){progressCb?.(data.message);return}if(data.type!=="done"&&data.type!=="error")return;finish();if(data.type==="error")return reject(new Error(data.message));const conditions=deepSnapshot({...input.preferences,requirements:input.requirements,skillLimits:input.skillLimits,manualDrift:input.manualDrift,ownedDrift:input.ownedDrift,weapon:input.weapon,driftPool:input.config.driftPool,excluded:input.excluded,armorSettings:input.armorSettings,masterVersion:input.db.version,masterSchemaVersion:input.db.schemaVersion||6});for(const r of data.results)r.searchConditions=conditions;$("searchProgress").textContent=`完了 ${data.evaluated}構成評価 / ${((performance.now()-started)/1000).toFixed(2)}秒（近似）`;resolve(data.results)};
  worker.onerror=e=>{if(!current())return;finish();reject(new Error(e.message||"Worker起動失敗"))};worker.postMessage({input,req:input.requirements});
 });
}

let searchBusy=false;
async function runPower(){
 if(searchBusy)return;searchBusy=true;$("powerSearch").disabled=true;$("skillSearch").disabled=true;
 const status=t=>$("powerResults").innerHTML=`<div class="empty">${esc(t)}</div>`;
 try{
  status("検索準備中…");const all=await enumerate({},status,{});all.sort((a,b)=>b.score-a.score);lastPower=all.slice(0,50);
  $("powerResults").innerHTML=lastPower.length?lastPower.map((r,i)=>resultHtml(r,i)).join(""):`<div class="empty">候補がありません。除外装備や漂移指定を確認してください。</div>`;
  $("stEvaluated").textContent=all.length.toLocaleString();$("stBest").textContent=lastPower[0]?lastPower[0].score.toFixed(1):"-";$("stDrift").textContent=lastPower[0]?lastPower[0].slots:"0";
  bindResults("powerResults",lastPower);updateStats();
 }catch(e){$("powerResults").innerHTML=`<div class="diag">検索エラー: ${esc(e.message||e)}</div>`}
 finally{searchBusy=false;$("powerSearch").disabled=false;$("skillSearch").disabled=false}
}
async function runSkill(){
 if(searchBusy)return;
 if(Object.keys(requirements).length===0&&Object.keys(skillLimits).length===0){$("skillCount").textContent="0件";$("skillResults").innerHTML=`<div class="diag">スキル条件を1つ以上指定してください。必須・除外・上限を一覧から選べます。</div>`;return}
 searchBusy=true;$("powerSearch").disabled=true;$("skillSearch").disabled=true;
 const status=t=>$("skillResults").innerHTML=`<div class="empty">${esc(t)}</div>`;
 try{
  const startReq=deepSnapshot(requirements),startLimits=deepSnapshot(skillLimits),sort=$("skillSort").value;status("検索準備中…");const all=await enumerate(startReq,status,startLimits),target=Object.values(startReq).reduce((a,b)=>a+b,0);
  if(sort==="score")all.sort((a,b)=>b.score-a.score);
  else if(sort==="slots")all.sort((a,b)=>(b.slots-b.usedDrift)-(a.slots-a.usedDrift)||b.score-a.score);
  else all.sort((a,b)=>{
   const ea=Object.values(a.skills).reduce((x,y)=>x+y,0)-target,eb=Object.values(b.skills).reduce((x,y)=>x+y,0)-target;
   return ea-eb||b.score-a.score;
  });
  lastSkill=all.slice(0,50);$("skillCount").textContent=`${all.length}件`;
  $("skillResults").innerHTML=lastSkill.length?lastSkill.map((r,i)=>resultHtml(r,i,r.searchConditions.requirements,r.searchConditions.skillLimits)).join(""):`<div class="empty">この近似探索では条件を満たす構成が見つかりませんでした。存在しないことは保証しません。</div>`;
  bindResults("skillResults",lastSkill);
 }catch(e){$("skillResults").innerHTML=`<div class="diag">検索エラー: ${esc(e.message||e)}</div>`}
 finally{searchBusy=false;$("powerSearch").disabled=false;$("skillSearch").disabled=false}
}
function bindResults(container,arr){
 document.querySelectorAll(`#${container} .result`).forEach(el=>el.addEventListener("click",e=>{
  const i=+el.dataset.i;if(e.target.classList.contains("cmp")){e.stopPropagation();addCompare(arr[i]);return}openDetail(arr[i]);
 }));
}

function openDetail(r){
 const w=r.weapon||currentWeapon();$("modalTitle").textContent=`構成詳細 / ${r.score.toFixed(1)}`;
 const slots=r.parts.map(p=>{const ds=r.driftByArmor?.[p.id]||[],dt=ds.map(x=>`<span class="chip drift">${esc(x.skill)}${(+x.attack||+x.affinity||+x.defense)?` <small>攻+${+x.attack||0} 会+${+x.affinity||0}% 防+${+x.defense||0}</small>`:""}</span>`).join("");return `<div class="slot"><div class="slot-label">${SLOT_JA[p.slot]}</div><div><b>${esc(p.name)}</b> <span class="badge">${esc(armorDriftLabel(p))}</span><div class="chips">${chipHtml(p.skills)}</div>${dt?`<div class="weapon-skill-label" style="margin-top:5px">セット中の漂移</div><div class="chips">${dt}</div>`:""}<div class="note">${esc(p.monster)} / ${esc(p.grade)} ${p.source?`/ <a class="source-link" href="${esc(p.source)}" target="_blank" rel="noopener">出典</a>`:""}</div></div><button class="btn small danger excludeOne" data-id="${esc(p.id)}">除外</button></div>`}).join("");
 const bd=r.breakdown.map(([a,b])=>`<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("");
 const mat=r.parts.map(p=>`<div class="material-item"><div><b>${esc(p.name)}</b><div class="note">関連: ${esc(p.monster)}${p.monsterSource?` / <a class="source-link" href="${esc(p.monsterSource)}" target="_blank" rel="noopener">入手素材を公式確認</a>`:""}</div></div><div>${p.materials?.length?`${p.materials.length}項目`:"数量未登録"}</div></div>`).join("");
 $("modalBody").innerHTML=`<div class="stats"><div class="stat"><b>${r.score.toFixed(1)}</b><span>火力指数</span></div><div class="stat"><b>${r.rawExpected.toFixed(1)}</b><span>物理期待値</span></div>
 <div class="stat"><b>${r.elemExpected.toFixed(1)}</b><span>属性寄与</span></div><div class="stat"><b>${r.affinity.toFixed(1)}%</b><span>実効会心</span></div><div class="stat"><b>${r.usedDrift}/${r.slots}</b><span>漂移使用/枠</span></div><div class="stat"><b>+${r.driftStats?.attack||0} / +${r.driftStats?.affinity||0}%</b><span>漂移 攻撃/会心</span></div></div>
 <div class="detail-grid"><div>
  <div class="card"><div class="hd">装備構成</div><div class="bd"><div class="slot"><div class="slot-label">武器</div><div><b>${esc(w.name)}</b>
   <div class="note">${esc(w.type)} / 攻撃 ${w.attack} / ${esc(w.element)} ${w.elementValue} / 会心 ${w.affinity}% ${w.source?`/ <a class="source-link" href="${esc(w.source)}" target="_blank" rel="noopener">出典</a>`:""}</div>
   <div class="weapon-skill-label">武器装備スキル（合計スキルへ反映済み）</div><div class="chips">${chipHtml(w.skills||{})||`<span class="note">なし</span>`}</div></div><span></span></div>${slots}
   <div class="row" style="margin-top:10px"><button id="saveDetail" class="btn primary">マイセット登録</button><button id="compareDetail" class="btn">比較に追加</button></div>
  </div></div>
  <div class="card" style="margin-top:10px"><div class="hd">発動スキル</div><div class="bd"><div class="chips">${chipHtml(r.skills,r.drift)}</div></div></div>
 </div><div>
  <div class="card"><div class="hd">計算内訳</div><div class="bd"><table class="table">${bd}</table></div></div>
  <div class="card" style="margin-top:10px"><div class="hd">素材・入手先</div><div class="bd">${mat}</div></div>
 </div></div>`;
 $("modal").classList.add("open");
 document.querySelectorAll(".excludeOne").forEach(b=>b.onclick=()=>{excluded.add(b.dataset.id);persist();$("modal").classList.remove("open");renderArmorCatalog();updateStats()});
 $("saveDetail").onclick=()=>saveSet(r,w);$("compareDetail").onclick=()=>addCompare(r);
}
function saveSet(r,w){
 const name=prompt("マイセット名",`${w.name} / ${new Date().toLocaleDateString("ja-JP")}`);if(!name)return;
 mysets.unshift({id:(crypto.randomUUID?crypto.randomUUID():String(Date.now())),name,weapon:{...w},parts:JSON.parse(JSON.stringify(r.parts)),modelVersion:r.modelVersion||"legacy",searchConditions:r.searchConditions||{},skills:{...r.skills},drift:{...r.drift},driftByArmor:JSON.parse(JSON.stringify(r.driftByArmor||{})),driftStats:{...(r.driftStats||{})},score:r.score,rawExpected:r.rawExpected,elemExpected:r.elemExpected,affinity:r.affinity,slots:r.slots,created:new Date().toISOString()});
 const saved=persist();renderMysets();renderMaterialSetOptions();updateStats();if(saved)alert("マイセットに登録しました。");else alert("未保存です。画面の保存再試行またはJSON退避を利用してください。");
}
function addCompare(r){
 const sig=JSON.stringify(r.weapon||currentWeapon())+"#"+r.parts.map(p=>p.id).join("|")+"#"+JSON.stringify(r.driftByArmor||r.drift);if(compareList.some(x=>x.sig===sig))return;
 if(compareList.length>=3)compareList.shift();
 compareList.push({sig,r:JSON.parse(JSON.stringify(r)),weapon:{...(r.weapon||currentWeapon())}});renderCompare();alert("比較に追加しました。");
}
function renderCompare(){
 $("compareGrid").innerHTML=compareList.length?compareList.map((x,i)=>`<div class="card set"><h3>構成 ${i+1}</h3><div class="meta">${esc(x.weapon.name)} / 火力 ${x.r.score.toFixed(1)}</div>
 ${x.r.parts.map(p=>`<span class="pill">${SLOT_JA[p.slot]} ${esc(p.name)}</span>`).join("")}<div class="chips">${chipHtml(x.r.skills,x.r.drift)}</div>
 <button class="btn small danger delCmp" data-i="${i}" style="margin-top:8px">外す</button></div>`).join(""):`<div class="empty">ランキングまたは詳細画面から「比較+」で追加してください。</div>`;
 document.querySelectorAll(".delCmp").forEach(b=>b.onclick=()=>{compareList.splice(+b.dataset.i,1);renderCompare()});
 if(compareList.length<2){$("compareTableWrap").innerHTML="";return}
 const metrics=[["火力指数",x=>x.r.score.toFixed(1)],["物理期待値",x=>x.r.rawExpected.toFixed(1)],["属性寄与",x=>x.r.elemExpected.toFixed(1)],["実効会心",x=>x.r.affinity.toFixed(1)+"%"],["漂移",x=>`${x.r.usedDrift}/${x.r.slots}`]];
 $("compareTableWrap").innerHTML=`<div class="card"><div class="hd">数値比較</div><div class="bd"><table class="table"><tr><th>項目</th>${compareList.map((_,i)=>`<th>構成${i+1}</th>`).join("")}</tr>
 ${metrics.map(([n,f])=>`<tr><td>${n}</td>${compareList.map(x=>`<td>${f(x)}</td>`).join("")}</tr>`).join("")}</table></div></div>`;
}

function renderMysets(){
 $("mysetsGrid").innerHTML=mysets.length?mysets.map((s,i)=>`<div class="card set"><h3>${esc(s.name)}</h3><div class="meta">${esc(s.weapon.name)}${s.weapon.referenceStatus?"（旧マスター参照）":""} / 保存時指数 ${Number(s.score).toFixed(1)} (${esc(s.modelVersion||"旧モデル")}) / ${new Date(s.created).toLocaleDateString("ja-JP")}</div>
 <div>${s.parts.map(p=>`<span class="pill">${SLOT_JA[p.slot]} ${esc(p.name)}${p.referenceStatus?"（旧マスター参照）":""}</span>`).join("")}</div><div class="chips">${chipHtml(s.skills,s.drift)}</div>
 <div class="row" style="margin-top:9px"><button class="btn small loadSet" data-i="${i}">武器条件を読込</button><button class="btn small matSet" data-id="${esc(s.id)}">素材</button><button class="btn small danger delSet" data-i="${i}">削除</button></div></div>`).join(""):`<div class="empty">まだマイセットはありません。</div>`;
 document.querySelectorAll(".delSet").forEach(b=>b.onclick=()=>{mysets.splice(+b.dataset.i,1);persist();renderMysets();renderMaterialSetOptions();updateStats()});
 document.querySelectorAll(".loadSet").forEach(b=>b.onclick=()=>loadSetWeapon(mysets[+b.dataset.i]));
 document.querySelectorAll(".matSet").forEach(b=>b.onclick=()=>{currentMaterialSetId=b.dataset.id;showTab("materials");renderMaterialSetOptions();$("materialSet").value=currentMaterialSetId;calcMaterial()});
}
function loadSetWeapon(s){
 if(!DB.weapons.some(w=>w.id===s.weapon.id)){alert("この武器IDは現在のマスターにありません。保存済み構成は保持しています。対応マスターを読み込んでください。");return}
 let id=DB.weapons.find(w=>w.id===s.weapon.id)?.id||"custom";const w=DB.weapons.find(x=>x.id===id)||s.weapon;$("weaponSelect").innerHTML=`<option value="${esc(id)}">${esc(w.name||s.weapon.name)}</option>`;$("weaponSelect").value=id;setWeapon(s.weapon);applyPreferences(s.searchConditions);showTab("power");
}
function renderMaterialSetOptions(){
 $("materialSet").innerHTML=mysets.length?mysets.map(s=>`<option value="${esc(s.id)}">${esc(s.name)}</option>`).join(""):`<option value="">マイセットなし</option>`;
 if(currentMaterialSetId&&mysets.some(s=>s.id===currentMaterialSetId))$("materialSet").value=currentMaterialSetId;
}
function calcMaterial(){
 const s=mysets.find(x=>x.id===$("materialSet").value);if(!s){$("materialResults").innerHTML=`<div class="empty">マイセットがありません。</div>`;return}
 const exact=new Map(),unknown=[];
 for(const p of [s.weapon,...s.parts]){
  if(Array.isArray(p.materials)&&p.materials.length&&p.materials.every(m=>Number.isFinite(m.qty)&&m.qty>=0)){
   for(const m of p.materials){const key=m.name;const cur=exact.get(key)||{name:key,qty:0,source:m.source||p.monster,rarity:m.rarity||""};cur.qty+=(+m.qty||0);exact.set(key,cur)}
  }else unknown.push(p);
 }
 const byMonster={};for(const p of unknown)(byMonster[p.monster]??=[]).push(p);
 let h="";
 if(exact.size){h+=`<div class="material-group"><h3>必要個数登録済み</h3>${[...exact.values()].map(m=>`<div class="material-item"><div><b>${esc(m.name)}</b><div class="note">${esc(m.source)}</div></div><div>×${m.qty}</div></div>`).join("")}</div>`}
 h+=`<div class="material-group"><h3>数量未登録の装備</h3>`;
 h+=Object.keys(byMonster).length?Object.entries(byMonster).map(([mon,parts])=>{
  const catalog=DB.materialsCatalog?.[mon]||[],src=parts.find(p=>p.monsterSource)?.monsterSource||"";
  return `<div class="card" style="margin-bottom:8px"><div class="hd"><span>${esc(mon)}</span>${src?`<a class="source-link" href="${esc(src)}" target="_blank" rel="noopener">公式素材一覧</a>`:""}</div><div class="bd">
  <div class="note">対象装備: ${parts.map(p=>esc(p.name)).join(" / ")}</div>${catalog.length?`<div class="chips">${catalog.map(m=>`<span class="chip">${esc(m.name)} R${m.rarity}</span>`).join("")}</div>`:`<div class="note" style="margin-top:6px">素材カタログ未登録。装備詳細/ゲーム内で必要数を確認してください。</div>`}
  </div></div>`}).join(""):`<div class="ok">全装備の必要個数がマスター登録済みです。</div>`;
 h+="</div>";$("materialResults").innerHTML=h;
}

function driftStoneText(skill){const xs=DB.skills[skill]?.driftStones||[];return xs.length?xs.join(" / "):"漂移可否未確認"}
function allOwnedDriftCount(){return Object.values(ownedDrift||{}).reduce((n,a)=>n+(Array.isArray(a)?a.length:0),0)}
function renderDriftArmorList(){
 if(!$("driftArmorList"))return;const q=($("driftArmorSearch")?.value||"").trim().toLowerCase(),slot=$("driftArmorSlot")?.value||"";
 let arr=DB.armors.filter(a=>(!slot||a.slot===slot)&&(!q||(a.name+" "+(a.monster||"")).toLowerCase().includes(q)));arr=arr.sort((a,b)=>(+b.drift||0)-(+a.drift||0)||a.name.localeCompare(b.name,"ja"));
 if(!driftManageArmorId&&arr.length)driftManageArmorId=arr[0].id;$("ownedDriftTotal").textContent=allOwnedDriftCount().toLocaleString()+"件";
 $("driftArmorList").innerHTML=arr.slice(0,100).map(a=>`<button class="drift-armor-row ${a.id===driftManageArmorId?"active":""}" data-id="${esc(a.id)}"><div><b>${esc(a.name)}</b><div class="note">${SLOT_JA[a.slot]} / ${esc(a.monster||"")} / ${esc(armorDriftLabel(a))}</div></div><span class="badge">${ownedForArmor(a.id).length}/20</span></button>`).join("")||`<div class="empty">該当防具なし</div>`;
 document.querySelectorAll(".drift-armor-row").forEach(b=>b.onclick=()=>{driftManageArmorId=b.dataset.id;renderDriftArmorList();renderDriftEditor()});
}
function renderDriftSkillChoices(){
 if(!$("ownedDriftSkillSelect"))return;const q=$("ownedDriftSkillSearch").value.trim().toLowerCase();const names=Object.keys(DB.skills).filter(k=>!q||k.toLowerCase().includes(q)).sort((a,b)=>a.localeCompare(b,"ja"));
 $("ownedDriftSkillChoices").innerHTML=names.slice(0,60).map(k=>`<label class="check"><input type="radio" name="ownedSkill" value="${esc(k)}">${esc(k)} <small>${driftableSkill(k)?"候補データあり":"ゲーム内確認が必要"}</small></label>`).join("");
 $("ownedDriftSkillSelect").value="";document.querySelectorAll('[name="ownedSkill"]').forEach(e=>e.onchange=()=>{$("ownedDriftSkillSelect").value=e.value;updateOwnedStoneChoices()});updateOwnedStoneChoices();
}
function updateOwnedStoneChoices(){if(!$("ownedDriftStone"))return;const k=$("ownedDriftSkillSelect")?.value||"",xs=DB.skills[k]?.driftStones||[];$("ownedDriftStone").innerHTML=(xs.length?xs:["未指定"]).map(x=>`<option>${esc(x)}</option>`).join("")}
function addOwnedDriftRecord(){
 const a=DB.armors.find(x=>x.id===driftManageArmorId);if(!a)return;const arr=ownedForArmor(a.id);if(arr.length>=20&&!editingDriftId)return alert("この防具には最大20件まで保存できます。");const skill=$("ownedDriftSkillSelect").value;if(!skill||!DB.skills[skill])return alert("スキルを選択してください。");
 const bonusType=$("ownedDriftBonusType").value||"none",bonusValue=Number($("ownedDriftBonusValue").value);if(!Number.isFinite(bonusValue)||bonusValue<0||bonusValue>(bonusType==="affinity"?100:1000))return alert("追加値を確認してください");const rec={id:(crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random())),skill,level:1,provenance:{confidence:"user-entered",retrievedAt:new Date().toISOString()},attack:0,affinity:0,defense:0,stone:$("ownedDriftStone").value||""};if(bonusType==="attack")rec.attack=bonusValue;else if(bonusType==="affinity")rec.affinity=bonusValue;else if(bonusType==="defense")rec.defense=bonusValue;if(editingDriftId){const i=arr.findIndex(x=>x.id===editingDriftId);if(i<0)throw new Error("編集対象がありません");rec.id=editingDriftId;arr[i]=rec;editingDriftId=null}else arr.push(rec);ownedDrift[a.id]=arr;persist();renderDriftArmorList();renderDriftEditor();
}
function renderDriftEditor(){
 editingDriftId=null;
 if(!$("driftEditor"))return;const a=DB.armors.find(x=>x.id===driftManageArmorId);if(!a){$("driftEditor").innerHTML=`<div class="empty">左から防具を選択してください。</div>`;return}const arr=ownedForArmor(a.id);$("driftArmorSaved").textContent=`${arr.length} / 20`;
 const unlock=(a.driftUnlockGrades||[]).length?`G${a.driftUnlockGrades.join(" / G")}`:"-";
 $("driftEditor").innerHTML=`<div class="ok"><b>${esc(a.name)}</b> / ${SLOT_JA[a.slot]} / ${esc(a.monster||"")}<br>${esc(armorDriftLabel(a))} / 解放 ${esc(unlock)}<br><span class="note">錬成結果はこの防具専用です。他防具へ移し替えない前提で最適化します。</span></div>
 <div class="field"><label>使用Grade（公式データは装備スキルも連動）</label><input id="armorGrade" type="number" min="1" max="10" value="${armorSettings[a.id]?.grade||10}"><label>ゲーム内で確認した解放Grade（例 5,8 / 空欄は未確認）</label><input id="armorUnlocks" type="text" value="${esc((armorSettings[a.id]?.unlocks||a.driftUnlockGrades||[]).join(','))}"><button id="saveArmorSettings" class="btn small">Grade情報を保存</button></div><div class="field" style="margin-top:10px"><label>漂移スキルを検索</label><input id="ownedDriftSkillSearch" type="text" placeholder="見切り / 弱点特効 など"><div id="ownedDriftSkillChoices" class="drift-skill-select"></div><input id="ownedDriftSkillSelect" type="hidden"></div>
 <div class="drift-add-grid"><div class="field wide"><label>漂流石</label><select id="ownedDriftStone"></select></div><div class="field"><label>追加パラメータ</label><select id="ownedDriftBonusType"><option value="none">未入力</option><option value="attack">攻撃力</option><option value="affinity">会心率 %</option><option value="defense">防御力</option></select></div><div class="field"><label>追加値</label><input id="ownedDriftBonusValue" type="number" min="0" step="0.1" value="0"></div></div>
 <button id="addOwnedDrift" class="btn primary" style="width:100%" >この錬成結果を登録</button><div class="note" style="margin-top:6px">ゲーム内で保存できる錬成スキルは各防具最大20件。追加パラメータは1回の錬成につき攻撃力・防御力・会心率のいずれか1種類として登録します。複数漂移スロットでも同じ錬成結果IDを二重使用しないよう探索します。</div>
 <div class="drift-owned-list" style="margin-top:10px">${arr.length?arr.map((r,i)=>`<div class="drift-owned-item"><div><b>${esc(r.skill)} Lv${r.level||1}</b><div class="meta">${esc(r.stone||driftStoneText(r.skill))} / 攻+${+r.attack||0} 会+${+r.affinity||0}% 防+${+r.defense||0}</div></div><button class="btn small editOwnedDrift" data-i="${i}">編集</button><button class="btn small danger delOwnedDrift" data-i="${i}">削除</button></div>`).join(""):`<div class="empty">この防具の所持漂移は未登録です。</div>`}</div>`;
 renderDriftSkillChoices();bindDriftEdits(arr);$("saveArmorSettings").onclick=()=>saveArmorSettings(a);$("ownedDriftSkillSearch").oninput=renderDriftSkillChoices;$("ownedDriftSkillSelect").onchange=updateOwnedStoneChoices;$("addOwnedDrift").onclick=addOwnedDriftRecord;document.querySelectorAll(".delOwnedDrift").forEach(b=>b.onclick=()=>{arr.splice(+b.dataset.i,1);ownedDrift[a.id]=arr;persist();renderDriftArmorList();renderDriftEditor()});
}

function renderArmorCatalog(){
 const q=$("armorSearch").value.trim().toLowerCase(),slot=$("armorSlotFilter").value;
 const arr=DB.armors.filter(a=>(!slot||a.slot===slot)&&(!q||(a.name+a.monster).toLowerCase().includes(q)));
 $("armorCatalog").innerHTML=`<div class="note">${arr.length}件 / 最大100件表示。検索で絞り込めます。</div>`+arr.slice(0,100).map(a=>`<div class="ex"><div><b>${esc(a.name)}</b><div class="note">${SLOT_JA[a.slot]} / ${esc(a.monster)} / ${esc(armorDriftLabel(a))}</div></div>
 <button class="btn small ${excluded.has(a.id)?"good":"danger"} toggleEx" data-id="${a.id}">${excluded.has(a.id)?"解除":"除外"}</button></div>`).join("")||`<div class="empty">該当なし</div>`;
 document.querySelectorAll(".toggleEx").forEach(b=>b.onclick=()=>{excluded.has(b.dataset.id)?excluded.delete(b.dataset.id):excluded.add(b.dataset.id);persist();renderArmorCatalog();updateStats();updateComboBadge()});
}
function renderReq(){
 const rows=[];for(const [k,v] of Object.entries(requirements))rows.push(`<div class="req">必須: ${esc(k)} Lv${v}+<button data-k="${esc(k)}">×</button></div>`);for(const [k,v] of Object.entries(skillLimits))rows.push(`<div class="req ${v===0?'exclude':'max'}">${v===0?'除外':'上限'}: ${esc(k)}${v===0?'':` Lv${v}`}<button data-k="${esc(k)}">×</button></div>`);$('reqList').innerHTML=rows.join('');
 document.querySelectorAll('#reqList button').forEach(b=>b.onclick=()=>{delete requirements[b.dataset.k];delete skillLimits[b.dataset.k];renderReq();persist();renderSkillCatalog()});
}
function renderManualDrift(){
 $("manualDriftList").innerHTML=Object.entries(manualDrift).map(([k,v])=>`<div class="req">${esc(k)} +${v}<button data-k="${esc(k)}">×</button></div>`).join("");
 document.querySelectorAll("#manualDriftList button").forEach(b=>b.onclick=()=>{delete manualDrift[b.dataset.k];renderManualDrift();persist()});
}
function updateComboBadge(){const n=SLOT_ORDER.map(s=>usable(s).length).reduce((a,b)=>a*b,1);$("comboBadge").textContent=n.toLocaleString()+"構成"}
function updateStats(){$("stExcluded").textContent=excluded.size;$("stSaved").textContent=mysets.length;updateComboBadge()}
const SNAPSHOT_KEY="mhnbl_v06_snapshot";
let recoveryLocked=false,corruptSnapshot=null,pendingSave=false;
function currentSnapshot(){return {app:"MH Now Build Lab",schemaVersion:6,writerRevision:"0.6.1",excluded:[...excluded],mysets,requirements,skillLimits,manualDrift,ownedDrift,armorSettings,preferences:capturePreferences()}}
function storageNotice(message=""){
 const e=$("storageNotice");if(!e)return;e.hidden=!message;
 if(!e._initialized){e.innerHTML='<b id="storageMessage"></b> <button id="retrySave" class="btn small">保存を再試行</button> <button id="exportPending" class="btn small">JSON退避</button> <button id="exportCorrupt" class="btn small">元の破損データを退避</button>';e._initialized=true;$("retrySave").onclick=()=>persist();$("exportPending").onclick=exportBackup;$("exportCorrupt").onclick=()=>downloadJson(corruptSnapshot,"MHNow_recovery_original.json")}
 $("storageMessage").textContent=message;$("exportCorrupt").hidden=corruptSnapshot===null;
}
function downloadJson(text,name){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:"application/json"}));a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}

function persist(){
 pendingSave=true;
 if(recoveryLocked){storageNotice("未保存: 元の保存データに問題があります。元データを退避して正常なJSONを復元してください。");return false}
 try{const snapshot=validateBackup(currentSnapshot());if(!writeStoredJson(SNAPSHOT_KEY,snapshot))throw new Error("容量不足または端末による保存拒否");pendingSave=false;storageNotice();updatePwaStatus();return true}catch(e){storageNotice("未保存: "+e.message+"。変更はこの画面のメモリーに保持しています。");return false}
}
function applySnapshot(o){excluded=new Set(o.excluded);mysets=o.mysets;requirements=o.requirements;skillLimits=o.skillLimits||{};manualDrift=o.manualDrift;ownedDrift=o.ownedDrift;armorSettings=o.armorSettings}
function restoreStartup(){
 try{const raw=localStorage.getItem(SNAPSHOT_KEY);if(raw!==null){corruptSnapshot=raw;const o=validateBackup(JSON.parse(raw));corruptSnapshot=null;applySnapshot(o);return o}
 const legacyRaw={};const legacyRead=(key,fallback)=>{const raw=localStorage.getItem(key);if(raw===null)return fallback;legacyRaw[key]=raw;try{return JSON.parse(raw)}catch(e){corruptSnapshot=JSON.stringify(legacyRaw);throw e}};const state=legacyRead(STORAGE.state,{});const legacy={app:"MH Now Build Lab",excluded:legacyRead(STORAGE.ex,[]),mysets:legacyRead(STORAGE.sets,[]),ownedDrift:legacyRead(STORAGE.drift,{}),armorSettings:legacyRead("mhnbl_v06_armor_settings",{}),...state};const o=validateBackup(legacy);applySnapshot(o);return o;
 }catch(e){recoveryLocked=true;storageNotice("保存データの検証に失敗しました。原本を保持し、自動保存を停止しています: "+e.message);return {}}
}

function setupSelectors(){
 DB=normalizeMaster(DB);rebuildFastIndexes();$("elementSelect").innerHTML=DB.elements.map(x=>`<option>${esc(x)}</option>`).join("");
 // Hidden legacy selector keeps only the current item; hundreds of OPTION nodes are intentionally avoided on iOS.
 $("weaponSelect").innerHTML="";
 const skills=Object.keys(DB.skills).sort((a,b)=>a.localeCompare(b,"ja"));
 $("skillPicker").innerHTML="";
 
 const driftBase=[["見切り","見切り"],["弱点特効","弱点特効"],["超会心","超会心"],["__ELEMENT__","武器属性強化"],["連撃","連撃"],["攻撃","攻撃"]];$("driftPool").innerHTML=driftBase.filter(([v])=>v==="__ELEMENT__"||driftableSkill(v)).map(([v,t],i)=>`<label class="check"><input type="checkbox" value="${v}" ${i<5?"checked":""}>${t}</label>`).join("");
 $("dataVersion").textContent=DB.version||"custom";updateDataCoverage();renderSkillCategories();
 if($("skillCheckList"))$("skillCheckList").innerHTML=`<div class="empty">スキルタブを開くと一覧を表示します。</div>`;
}
function setupUptimes(){
 $("uptimeSliders").innerHTML=UPTIMES.map(u=>`<div class="field"><div class="slider-head"><span>${u.label}</span><span id="lbl_${u.id}">${u.value}%</span></div><input id="up_${u.id}" type="range" min="0" max="100" value="${u.value}"></div>`).join("");
 for(const u of UPTIMES)$("up_"+u.id).oninput=e=>$("lbl_"+u.id).textContent=e.target.value+"%";
}
function showTab(name){
 document.querySelectorAll(".tab,.bottom-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===name));document.querySelectorAll(".pane").forEach(p=>p.classList.add("hide"));$("pane-"+name).classList.remove("hide");
 if(name==="mysets")renderMysets();if(name==="compare")renderCompare();if(name==="materials")renderMaterialSetOptions();
 if(name==="skill"&&!skillCatalogReady){renderSkillCatalog();skillCatalogReady=true}
 if(name==="drift"){renderDriftArmorList();renderDriftEditor()}
 if(name==="data"&&!armorCatalogReady){renderArmorCatalog();armorCatalogReady=true}
 if(window.innerWidth<=760)window.scrollTo({top:0,behavior:"auto"});
}
async function exportBackup(){
 const data={...currentSnapshot(),exportedAt:new Date().toISOString()};
 const text=JSON.stringify(data,null,2),stamp=new Date().toISOString().slice(0,10),name=`MHNow_Build_Lab_backup_${stamp}.json`;
 let file=null;try{file=new File([text],name,{type:"application/json"})}catch(_e){}
 try{
  if(file && navigator.share && navigator.canShare && navigator.canShare({files:[file]})){await navigator.share({title:"MH Now Build Lab バックアップ",files:[file]});return}
 }catch(e){if(e && e.name==="AbortError")return}
 const blob=new Blob([text],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
async function importBackup(file){
 if(file.size>25*1024*1024)throw new Error("バックアップは25MB以下にしてください。");const text=await file.text();if(text.length>25*1024*1024)throw new Error("バックアップが大きすぎます。");const o=validateBackup(JSON.parse(text));
 // Quarantine corrupt bytes before a recovery import; never silently discard them.
 if(corruptSnapshot!==null){try{localStorage.setItem(SNAPSHOT_KEY+"_quarantine_"+Date.now(),corruptSnapshot)}catch(e){throw new Error("原本の隔離保存に失敗しました。先に原本JSONを退避し、保存領域を確保してください。")}}
 if(!writeStoredJson(SNAPSHOT_KEY,o))throw new Error("端末保存に失敗しました。以前のデータは維持されています。");
 applySnapshot(o);recoveryLocked=false;corruptSnapshot=null;pendingSave=false;storageNotice();
 applyPreferences(o.preferences);renderReq();renderManualDrift();renderSkillCatalog();renderMysets();renderArmorCatalog();renderDriftArmorList();renderDriftEditor();updateStats();
}
function validateBackup(input){
 const fail=m=>{throw new Error("バックアップ検証: "+m)},plain=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
 let nodes=0;function walk(x,depth=0){if(++nodes>300000||depth>25)fail("構造が大きすぎます");if(typeof x==="number"&&!Number.isFinite(x))fail("有限数が必要です");if(x&&typeof x==="object")for(const k of Object.keys(x)){if(["__proto__","constructor","prototype"].includes(k))fail("無効なキー");if(["source","sourceURL","monsterSource"].includes(k)&&x[k]!==""&&(typeof x[k]!=="string"||!/^https:\/\//.test(x[k])))fail("出典URL");walk(x[k],depth+1)}}walk(input);
 if(!plain(input)||input.app!=="MH Now Build Lab"||![undefined,6].includes(input.schemaVersion))fail("非対応形式");
 const o=JSON.parse(JSON.stringify(input)),str=(v,label)=>{if(typeof v!=="string"||!v.trim()||v.length>2000)fail(label+" は文字列が必要です")},num=(v,min,max,label)=>{if(!Number.isFinite(v)||v<min||v>max)fail(label+" の範囲が不正です")};
 const map=(v,label,max=20)=>{if(!plain(v))fail(label+" はobjectが必要です");for(const [k,n]of Object.entries(v)){str(k,label);num(n,1,max,label);if(!Number.isInteger(n))fail(label+" は整数です")}};
 const limitMap=(v,label)=>{if(!plain(v))fail(label+" はobjectが必要です");for(const [k,n]of Object.entries(v)){str(k,label);num(n,0,maxLv(k),label);if(!Number.isInteger(n))fail(label+" は整数です")}};
 const ids=(v,label)=>{if(!Array.isArray(v)||v.length>10000)fail(label+" は配列が必要です");v.forEach(x=>str(x,label));if(new Set(v).size!==v.length)fail(label+" が重複しています")};
 const armorConfig=v=>{if(!plain(v))fail("armorSettings");for(const x of Object.values(v)){if(!plain(x)||!Number.isInteger(x.grade)||x.grade<1||x.grade>10||!Array.isArray(x.unlocks)||x.unlocks.length>3||x.unlocks.some(g=>!Number.isInteger(g)||g<1||g>10))fail("解放Grade")}};
 const records=(v,limit)=>{if(!plain(v))fail("漂移対応表");for(const [id,rows]of Object.entries(v)){str(id,"防具ID");if(!Array.isArray(rows)||rows.length>limit)fail("漂移件数");const seen=new Set();for(const r of rows){if(!plain(r))fail("漂移結果");str(r.id,"錬成ID");str(r.skill,"スキル");if(seen.has(r.id))fail("錬成結果ID重複");seen.add(r.id);r.level??=1;if(r.level!==1)fail("錬成Lv");for(const k of ["attack","defense","affinity"]){r[k]??=0;num(r[k],0,k==="affinity"?100:1000,k)}if([r.attack,r.defense,r.affinity].filter(n=>n>0).length>1)fail("追加パラメータは1種類");for(const k of ["stone","driftstoneCategory"])if(r[k]!==undefined&&typeof r[k]!=="string")fail(k)}}};
 const prefs=v=>{if(!plain(v))fail("preferences");if(v.weaponId!==undefined)str(v.weaponId,"weaponId");if(v.skillCategory!==undefined&&!Object.hasOwn(SKILL_CATEGORY_LABELS,v.skillCategory))fail("skillCategory");if(v.driftPool!==undefined)ids(v.driftPool,"driftPool");if(v.values!==undefined){if(!plain(v.values))fail("preferences.values");for(const [id,x]of Object.entries(v.values)){if(!/^(driftMode|rawInput|affInput|elementSelect|elemInput|weakElement|groupHunt|up_\w+)$/.test(id)||!plain(x)||typeof x.value!=="string"||(id.startsWith("up_")&&!UPTIMES.some(u=>id==="up_"+u.id)))fail("preference value");if(x.checked!==undefined&&typeof x.checked!=="boolean")fail("checked");if(id==="driftMode"&&!["none","theory","owned","manual"].includes(x.value))fail("driftMode");if(id==="elementSelect"&&!BUILTIN.elements.includes(x.value))fail("element");if(/^(rawInput|affInput|elemInput|up_)/.test(id)){if(!x.value.trim())fail(id);num(Number(x.value),id==="affInput"?-100:0,id.startsWith("up_")||id==="affInput"?100:100000,id)}}}};
 const weapon=w=>{if(!plain(w))fail("weapon");str(w.id,"weapon.id");str(w.name,"weapon.name");for(const k of ["attack","affinity","elementValue"])num(w[k],k==="affinity"?-100:0,k==="affinity"?100:100000,k);map(w.skills??={},"weapon.skills");if(!DB.weapons.some(x=>x.id===w.id))w.referenceStatus="unknown-reference"};
 const conditions=v=>{prefs(v);if(v.requirements!==undefined)map(v.requirements,"requirements");if(v.skillLimits!==undefined)limitMap(v.skillLimits,"skillLimits");if(v.requirements&&v.skillLimits)for(const k of Object.keys(v.requirements))if(Object.prototype.hasOwnProperty.call(v.skillLimits,k))fail("同一スキルに必須と上限/除外を同時指定できません");if(v.manualDrift!==undefined)map(v.manualDrift,"manualDrift");if(v.armorSettings!==undefined)armorConfig(v.armorSettings);if(v.ownedDrift!==undefined)records(v.ownedDrift,20);if(v.excluded!==undefined)ids(v.excluded,"excluded");if(v.weapon!==undefined)weapon(v.weapon);if(v.masterVersion!==undefined)str(v.masterVersion,"masterVersion");if(v.masterSchemaVersion!==undefined&&v.masterSchemaVersion!==6)fail("master schema")};
 ids(o.excluded,"excluded");if(!Array.isArray(o.mysets)||o.mysets.length>10000)fail("mysets");const setids=new Set();
 for(const x of o.mysets){if(!plain(x))fail("myset");str(x.id,"myset.id");str(x.name,"myset.name");if(setids.has(x.id))fail("myset ID重複");setids.add(x.id);weapon(x.weapon);if(!Array.isArray(x.parts)||x.parts.length!==5)fail("防具5部位が必要です");const slots=new Set(),parts=new Set();for(const a of x.parts){if(!plain(a)||!SLOT_ORDER.includes(a.slot)||slots.has(a.slot))fail("防具slot");str(a.id,"armor.id");str(a.name,"armor.name");if(parts.has(a.id))fail("防具ID重複");slots.add(a.slot);parts.add(a.id);map(a.skills??={},"armor.skills");if(!DB.armors.some(z=>z.id===a.id))a.referenceStatus="unknown-reference"}map(x.skills,"skills");map(x.drift??={},"drift");records(x.driftByArmor??={},3);for(const id of Object.keys(x.driftByArmor))if(!parts.has(id))fail("漂移の防具境界");if(!plain(x.driftStats??={}))fail("driftStats");for(const [k,n]of Object.entries(x.driftStats)){if(!["attack","defense","affinity"].includes(k))fail("driftStats key");num(n,0,15000,k)}num(x.score,0,1e12,"score");for(const k of ["rawExpected","elemExpected","affinity","slots"])if(x[k]!==undefined)num(x[k],k==="affinity"?-100:0,k==="affinity"?100:k==="slots"?15:1e12,k);str(x.created,"created");if(!Number.isFinite(Date.parse(x.created)))fail("created date");conditions(x.searchConditions??={});if(x.stats!==undefined){if(!plain(x.stats))fail("stats");for(const n of Object.values(x.stats))num(n,-100,1e12,"stats")}}
 map(o.requirements??={},"requirements");limitMap(o.skillLimits??={},"skillLimits");for(const k of Object.keys(o.requirements??{}))if(Object.prototype.hasOwnProperty.call(o.skillLimits??{},k))fail("同一スキルに必須と上限/除外を同時指定できません");map(o.manualDrift??={},"manualDrift");records(o.ownedDrift??={},20);armorConfig(o.armorSettings??={});prefs(o.preferences??={});o.skillLimits??={};o.schemaVersion=6;o.writerRevision="0.6.1";return o;
}
function validateMaster(o){
 if(!o||(o.schemaVersion!==undefined&&o.schemaVersion!==6)||!Array.isArray(o.weapons)||!Array.isArray(o.armors)||!o.skills)throw new Error("weapons / armors / skills が必要です");
 if(!o.weapons.some(w=>w.id!=="custom")||!o.armors.length||!Object.keys(o.skills).length)throw new Error("空のマスターは使用できません");
 const ids=new Set();for(const a of o.armors){if(!a.id||!SLOT_ORDER.includes(a.slot)||!a.name||ids.has(a.id))throw new Error("armor の id / slot / name を確認してください");ids.add(a.id)}
 const wids=new Set();for(const w of o.weapons){if(!w.id||wids.has(w.id)||!Number.isFinite(w.attack)||!Number.isFinite(w.affinity)||!Number.isFinite(w.elementValue))throw new Error("武器データが不正です");wids.add(w.id)}
 for(const r of [...o.weapons,...o.armors])if(r.source&&!/^https:\/\//.test(r.source))throw new Error("出典URLはHTTPSが必要です");
 return true;
}
async function loadMaster(file){
 const o=normalizeMaster(JSON.parse(await file.text()));validateMaster(o);DB=o;setupSelectors();
 $("weaponSelect").innerHTML=`<option value="${esc(DB.weapons[0].id)}">${esc(DB.weapons[0].name)}</option>`;$("weaponSelect").value=DB.weapons[0].id;setWeapon(DB.weapons[0]);updateStats();alert("外部データマスターを読み込みました。");
}
function resetMaster(){DB=normalizeMaster(JSON.parse(JSON.stringify(BUILTIN)));setupSelectors();const w=DB.weapons.find(w=>w.id==="astalos_gs_g10")||DB.weapons[0];$("weaponSelect").innerHTML=`<option value="${esc(w.id)}">${esc(w.name)}</option>`;$("weaponSelect").value=w.id;setWeapon(w);updateStats()}


let deferredInstallPrompt=null;
function isIos(){return /iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)}
function isStandalone(){return window.matchMedia?.("(display-mode: standalone)").matches===true||navigator.standalone===true}
function updateNetwork(){const online=navigator.onLine!==false,b=$("networkBadge");if(!b)return;b.textContent=online?"オンライン":"オフライン";b.classList.toggle("online",online);b.classList.toggle("offline",!online)}
function updatePwaStatus(){
 if($("pwaMode"))$("pwaMode").textContent=isStandalone()?"ホーム画面アプリ":"Safari / ブラウザ";
 if($("storageStatus"))$("storageStatus").textContent=storageUsable?"localStorage 利用可":"端末保存を利用できません";
 if($("swStatus")){
  if(location.protocol!=="https:" && !["localhost","127.0.0.1","[::1]"].includes(location.hostname))$("swStatus").textContent="HTTPS配信が必要";
  else $("swStatus").textContent=navigator.serviceWorker?.controller?"有効":"初回登録/更新待ち";
 }
 document.querySelectorAll(".pwa-browser-only").forEach(e=>e.classList.toggle("hide",isStandalone()));
}
function openInstallHelp(){
 if(isStandalone())return alert("すでにホーム画面アプリとして起動しています。");
 if(deferredInstallPrompt){deferredInstallPrompt.prompt();deferredInstallPrompt.userChoice.finally(()=>{deferredInstallPrompt=null;updatePwaStatus()});return}
 $("installIosHelp").classList.toggle("hide",!isIos());$("installGenericHelp").classList.toggle("hide",isIos());$("installModal").classList.add("open");
}
async function registerPwa(){
 updateNetwork();updatePwaStatus();
 if(!("serviceWorker" in navigator)){$("swStatus")&&($("swStatus").textContent="非対応");return}
 if(location.protocol!=="https:" && !["localhost","127.0.0.1","[::1]"].includes(location.hostname)){updatePwaStatus();return}
 try{const reg=await navigator.serviceWorker.register("./service-worker.js",{scope:"./"});await navigator.serviceWorker.ready;updatePwaStatus();if(reg.waiting&&$("swStatus"))$("swStatus").textContent="新版準備完了 / 更新確認で切替";reg.addEventListener("updatefound",()=>{reg.installing?.addEventListener("statechange",()=>{if(reg.waiting&&$("swStatus"))$("swStatus").textContent="新版準備完了 / 更新確認で切替"})});return reg}catch(e){if($("swStatus"))$("swStatus").textContent="登録失敗"}
}
async function refreshPwaCache(){
 if(!("serviceWorker" in navigator))return alert("Service Worker非対応です。");
 try{const reg=await navigator.serviceWorker.getRegistration();if(!reg)return alert("まだPWAキャッシュが登録されていません。");await reg.update();if(reg.installing){alert("新版の全ファイルを検証しています。しばらく待ってから再度『更新確認』を押してください。");return}if(reg.waiting){if(pendingSave||recoveryLocked)return alert("未保存データがあります。保存またはJSON退避を済ませてから再読み込みしてください。");navigator.serviceWorker.addEventListener("controllerchange",()=>location.reload(),{once:true});reg.waiting.postMessage({type:"SKIP_WAITING"});alert("新版の準備が完了しました。再読み込みして切り替えます。")}else alert("更新確認が完了しました。準備済みの新版はありません。")}catch(e){alert("更新に失敗しました。現在版を保持しています: "+e.message)}
}

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstallPrompt=e;updatePwaStatus()});
window.addEventListener("appinstalled",()=>{deferredInstallPrompt=null;updatePwaStatus()});
window.addEventListener("online",updateNetwork);window.addEventListener("offline",updateNetwork);

async function init(){
 $("cancelSearch").onclick=()=>activeSearch?.cancel();$("diagnostics").onclick=showDiagnostics;setupUptimes();$("driftMode").value="none";const loaded=await tryLoadBundledMaster();setupSelectors();
 const saved=restoreStartup();
 const initial=DB.weapons.find(w=>w.id==="astalos_gs_g10")||DB.weapons.find(w=>w.id!=="custom")||DB.weapons[0];$("weaponSelect").innerHTML=`<option value="${esc(initial.id)}">${esc(initial.name)}</option>`;$("weaponSelect").value=initial.id;setWeapon(initial);
 await nextPaint();
 $("weaponSelect").onchange=()=>setWeapon(DB.weapons.find(w=>w.id===$("weaponSelect").value)||DB.weapons[0]);
 $("weaponPickerBtn").onclick=openWeaponPicker;$("weaponClose").onclick=()=>$("weaponModal").classList.remove("open");$("weaponModal").onclick=e=>{if(e.target===$("weaponModal"))$("weaponModal").classList.remove("open")};
 let weaponSearchTimer=0;$("weaponSearch").oninput=()=>{clearTimeout(weaponSearchTimer);weaponSearchTimer=setTimeout(renderWeaponPicker,120)};$("weaponTypeFilter").onchange=renderWeaponPicker;$("weaponElementFilter").onchange=renderWeaponPicker;$("weaponCustomBtn").onclick=()=>{const w=DB.weapons.find(w=>w.id==="custom")||DB.weapons[0];$("weaponSelect").innerHTML=`<option value="${esc(w.id)}">${esc(w.name)}</option>`;$("weaponSelect").value=w.id;setWeapon(w);$("weaponModal").classList.remove("open");persist()};
 let skillTextTimer=0;$("skillSearchText").oninput=()=>{clearTimeout(skillTextTimer);skillTextTimer=setTimeout(()=>{renderSkillCatalog();skillCatalogReady=true},120)};$("skillSelectedOnly").onchange=()=>{renderSkillCatalog();skillCatalogReady=true};$("clearReq").onclick=()=>{requirements={};skillLimits={};renderReq();persist();renderSkillCatalog();skillCatalogReady=true};
 $("powerSearch").onclick=runPower;$("skillSearch").onclick=runSkill;
 $("addSkill").onclick=()=>{};$("addManualDrift").onclick=()=>{const k=$("manualDriftSkill").value;manualDrift[k]=clamp(+$("manualDriftLevel").value||1,1,maxLv(k));renderManualDrift();persist()};
 $("driftMode").onchange=()=>{const m=$("driftMode").value;$("autoDriftBox").classList.toggle("hide",m!=="theory");$("ownedDriftBox").classList.toggle("hide",m!=="owned");$("manualDriftBox").classList.toggle("hide",m!=="manual")};$("openDriftManager").onclick=()=>showTab("drift");
 document.querySelectorAll(".tab,.bottom-tab").forEach(t=>t.onclick=()=>showTab(t.dataset.tab));
 $("modalClose").onclick=()=>$("modal").classList.remove("open");$("modal").onclick=e=>{if(e.target===$("modal"))$("modal").classList.remove("open")};
 $("clearCompare").onclick=()=>{compareList=[];renderCompare()};$("clearSets").onclick=()=>{if(confirm("マイセットを全削除しますか？")){mysets=[];persist();renderMysets();renderMaterialSetOptions();updateStats()}};
 $("clearExcluded").onclick=()=>{excluded.clear();persist();renderArmorCatalog();updateStats()};$("armorSearch").oninput=renderArmorCatalog;$("armorSlotFilter").onchange=renderArmorCatalog;let driftSearchTimer=0;$("driftArmorSearch").oninput=()=>{clearTimeout(driftSearchTimer);driftSearchTimer=setTimeout(renderDriftArmorList,120)};$("driftArmorSlot").onchange=renderDriftArmorList;
 $("calcMaterials").onclick=calcMaterial;$("materialSet").onchange=e=>currentMaterialSetId=e.target.value;$("exportBtn").onclick=exportBackup;$("importBtn").onclick=()=>$("importFile").click();
 $("installBtn").onclick=openInstallHelp;$("installBtn2").onclick=openInstallHelp;$("installClose").onclick=()=>$("installModal").classList.remove("open");$("installModal").onclick=e=>{if(e.target===$("installModal"))$("installModal").classList.remove("open")};$("refreshCache").onclick=refreshPwaCache;
 $("importFile").onchange=async e=>{if(e.target.files[0])try{await importBackup(e.target.files[0])}catch(err){alert("読込失敗: "+err.message)}e.target.value=""};$("masterFile").onchange=async e=>{if(e.target.files[0])try{await loadMaster(e.target.files[0])}catch(err){alert("マスター読込失敗: "+err.message)}e.target.value=""};$("resetMaster").onclick=resetMaster;
 applyPreferences(saved.preferences);$("driftMode").onchange();renderReq();renderManualDrift();renderMysets();renderMaterialSetOptions();renderDriftArmorList();updateStats();
 $("powerResults").innerHTML=`<div class="empty"><b>準備完了</b><br>武器と条件を選び「最大威力構成を検索」を押してください。<br><span class="note">全装備マスター読込後の自動全探索はiOS負荷を避けるため停止しました。</span></div>`;
 $("stEvaluated").textContent="-";$("stBest").textContent="-";$("stDrift").textContent="-";
 document.addEventListener("change",e=>{if(/^(driftMode|rawInput|affInput|elementSelect|elemInput|weakElement|groupHunt|up_\w+)$/.test(e.target.id)||e.target.closest?.("#driftPool"))persist()});await nextPaint();registerPwa();
 if(!Object.keys(DB.skills).some(driftableSkill))$("rcNotice").textContent="v0.6.1 / 漂移候補0件・解放Grade未確認。理論探索はデータ再取得まで停止。所持漂移はゲーム内確認情報を登録して利用可能。指数は暫定GenericモデルでDPSではありません。";
 if(loaded&&Object.keys(DB.skills).some(driftableSkill))$("rcNotice").textContent="v0.6.1 / Generic Power Index（DPSではありません）。候補制限付き近似探索。理論漂移はスキルのみ最適化・追加パラメータ0。旧防具11件は未確認扱い。";
 if(!loaded && $("dataSourceNote"))$("dataSourceNote").textContent="内蔵フォールバック。自動マスター未生成です。GitHub Actionsを実行してください。";
}

let theoryCandidateCache=null;
const MODEL_VERSION="generic-0.6-rc2-r1";
function isModeled(k){return MODELED_POWER_SKILLS.includes(k)||["火","水","雷","氷","龍"].some(e=>k===elementSkill(e)||k===elementAdvanced(e))}
function availableDriftSlots(a){
 const setting=armorSettings[a.id],gs=setting?.unlocks||a.driftUnlockGrades||[],grade=setting?.grade||parseInt(String(a.grade||"").replace("G",""),10)||10;
 return gs.filter(g=>Number.isInteger(g)&&g>=1&&g<=grade).length;
}
function saveArmorSettings(a){
 const raw=$("armorUnlocks").value.trim(),unlocks=raw?raw.split(",").map(Number):[],grade=Number($("armorGrade").value);
 if(!Number.isInteger(grade)||grade<1||grade>10||unlocks.length>3||unlocks.some(g=>!Number.isInteger(g)||g<1||g>10))return alert("Gradeは1〜10、解放枠は最大3個をカンマ区切りで入力してください。");
 armorSettings[a.id]={grade,unlocks,confidence:"user-confirmed",retrievedAt:new Date().toISOString()};persist();renderDriftEditor();
}
function bindDriftEdits(arr){document.querySelectorAll(".editOwnedDrift").forEach(b=>b.onclick=()=>{const r=arr[+b.dataset.i];editingDriftId=r.id;$("ownedDriftSkillSearch").value=r.skill;renderDriftSkillChoices();$("ownedDriftSkillSelect").value=r.skill;updateOwnedStoneChoices();const opt=document.createElement("option");opt.textContent=r.stone||"未指定";$("ownedDriftStone").append(opt);$("ownedDriftStone").value=opt.value;const type=["attack","defense","affinity"].find(k=>r[k]>0)||"none";$("ownedDriftBonusType").value=type;$("ownedDriftBonusValue").value=r[type]||0;$("addOwnedDrift").textContent="編集を保存"})}
function capturePreferences(){const ids=["driftMode","rawInput","affInput","elementSelect","elemInput","weakElement","groupHunt",...UPTIMES.map(u=>"up_"+u.id)];const values={};for(const id of ids){const e=$(id);if(e)values[id]={value:e.value,checked:e.checked}}return {weaponId:$("weaponSelect")?.value,values,skillCategory,driftPool:[...document.querySelectorAll("#driftPool input:checked")].map(e=>e.value)}}
function applyPreferences(p){if(!p)return;const w=DB.weapons.find(w=>w.id===p.weaponId);if(w){$("weaponSelect").innerHTML=`<option value="${esc(w.id)}">${esc(w.name)}</option>`;setWeapon(w)}for(const [id,v]of Object.entries(p.values||{})){const e=$(id);if(e&&/^(driftMode|rawInput|affInput|elementSelect|elemInput|weakElement|groupHunt|up_\w+)$/.test(id)){e.value=v.value;if(typeof v.checked==="boolean")e.checked=v.checked}}if(Array.isArray(p.driftPool))document.querySelectorAll("#driftPool input").forEach(e=>e.checked=p.driftPool.includes(e.value));if(SKILL_CATEGORY_LABELS[p.skillCategory])skillCategory=p.skillCategory;$("driftMode").onchange?.();for(const u of UPTIMES)$("lbl_"+u.id).textContent=$("up_"+u.id).value+"%";renderSkillCategories()}

function showDiagnostics(){
 const counts=CANON_WEAPON_TYPES.map(t=>[t,DB.weapons.filter(w=>w.type===t).length]);const unknown=DB.armors.filter(a=>a.driftStatus==="unknown");
 $("modalTitle").textContent="データ診断 / v0.6 RC";
 $("modalBody").innerHTML=`<p>モデル: ${MODEL_VERSION} / スキーマ: ${DB.schemaVersion||"legacy"}</p><p>漂移候補: ${Object.keys(DB.skills).filter(driftableSkill).length} / Grade情報のある防具: ${DB.armors.filter(a=>a.driftStatus!=="unknown").length} / 所持漂移: ${allOwnedDriftCount()}</p><table class="table"><tr><th>武器種</th><th>件数</th></tr>${counts.map(([t,n])=>`<tr><td>${esc(t)}</td><td>${n}</td></tr>`).join("")}</table><p>漂移情報未確認: ${unknown.map(a=>esc(a.name)).join(" / ")||"なし"}</p><p>取得版: ${esc(DB.version)}</p><p>火力指数に未対応の効果はスキルチップに表示します。素材数量・武器種固有DPSは未対応です。</p>`;$("modal").classList.add("open");
}
init();
