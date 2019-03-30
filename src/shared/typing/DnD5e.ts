// GENERAL

export type ClassName = string;
export type SubClassName = string;
export type RaceName = string;
export type Level = number; // level 1-20
export type AbilityScoreName = string;
export type SkillName = string;
export type ProficiencyName = string;
export type LanguageName = string;
export type FeatureName = string;
export type SubRaceName = string;
export type EquipmentName = string;
export type ConditionName = string;
export type DamageTypeName = string;
export type MagicSchoolName = string;
export type FetureName = string;
export type TraitName = string;

export type ProficiencyType = string;
export type LanguageType = string;
export type EquipmentType = string;
export type EquipmentSubType = string;

export type EquipmentProperty = string;
export type LanguageScript = string;
export type WeaponCategory = string;
export type Size = string; // Medium
export type WeaponRange = "Melee" | "Ranged";
export type DieSides = 4 | 6 | 8 | 10 | 12 | 20;
export type CoinType = "gp" | "sp" | "cp";

export type APIResource = NamedAPIResource<string> | ClassAPIResource;

export interface NamedAPIResource<NAME extends string> {
	name: NAME;
	url: string;
}

export interface NamedResource<NAME extends string> {
	name: NAME;
}

export interface ClassAPIResource {
	class: ClassName;
	url: string;
}

export interface Choice<RESOURCE extends APIResource> {
	choose: number;
	type: string; // TODO: can this be narrowed?
	from: RESOURCE[]; // TODO: let generics trickle through
}

export interface Cost {
	quantity: number;
	unit: CoinType;
}

export interface NamedAPIResourceList<NAME extends string> {
	count: number;
	results: NamedAPIResource<NAME>[];
}

export interface ClassAPIResourceList {
	count: number;
	results: ClassAPIResource[];
}



// SPECIFIC

export interface AbilityScore {
	_id: string;
	index: number;
	name: AbilityScoreName;
	full_name: string;
	desc: string[];
	skills: NamedAPIResource<SkillName>[];
	url: string;
}

export interface Skill {
	_id: string;
	index: number;
	name: SkillName;
	desc: string[];
	ability_score: NamedAPIResource<AbilityScoreName>[];
	url: string;
}

export interface Proficiency {
	_id: string;
	index: number;
	type: ProficiencyType;
	name: ProficiencyName;
	classes: NamedAPIResource<ClassName>[];
	races: NamedAPIResource<RaceName>[];
	url: string;
}

export interface Language {
	_id: string;
	index: number;
	name: LanguageName;
	type: LanguageType;
	typical_speakers: RaceName[];
	script: LanguageScript;
	url: string;
}

export interface CharClass {
	_id: string;
	index: number;
	name: ClassName;
	hit_die: number;
	proficiency_choices: Choice<NamedAPIResource<ProficiencyName>>[];
	proficiencies: NamedAPIResource<ProficiencyName>[];
	saving_throws: NamedAPIResource<AbilityScoreName>[];
	starting_equipment: ClassAPIResource;
	class_levels: ClassAPIResource;
	subclasses: NamedAPIResource<SubClassName>[];
	spellcasting: ClassAPIResource;
	url: string;
}

export interface CharSubClass {
	_id: string;
	index: number;
	class: NamedAPIResource<ClassName>;
	name: SubClassName;
	subclass_flavor: string;
	desc: string[];
	features: NamedAPIResource<FeatureName>[];
	url: string[];
}

export interface Feature {
	_id: string;
	index: number;
	name: FeatureName;
	level: Level;
	url: string;
	desc: string[];
	class: NamedAPIResource<ClassName>;
}

export interface LevelSpellcasting {
	cantrips_known: number;
	spells_known: number;
	spell_slots_level_1: number;
	spell_slots_level_2: number;
	spell_slots_level_3: number;
	spell_slots_level_4: number;
	spell_slots_level_5: number;
	spell_slots_level_6: number;
	spell_slots_level_7: number;
	spell_slots_level_8: number;
	spell_slots_level_9: number;
}

export interface LevelClassSpecific {
	channel_divinity_charges: number;
	destroy_undead_cr: number
}

export interface ClassLevel {
	_id: string;
	level: number;
	ability_score_bonuses: number;
	prof_bonus: number;
	feature_choices: NamedAPIResource<FeatureName>[];
	features: NamedAPIResource<FeatureName>[];
	spellcasting: LevelSpellcasting;
	class_specific: LevelClassSpecific;
	index: number;
	class: ClassAPIResource;
	url: string;
}

export interface Trait {
	_id: string;
	index: number;
	races: NamedResource<RaceName>[];
	name: TraitName;
	desc: string[];
	url: string;
}

export interface Race {
	_id: string;
	index: number;
	name: RaceName;
	speed: number;
	ability_bonuses: number[];
	alignment: string;
	age: string;
	size: Size;
	size_description: string;
	starting_proficiencies: NamedAPIResource<ProficiencyName>[];
	languages: NamedAPIResource<LanguageName>[];
	language_desc: string;
	traits: NamedAPIResource<TraitName>[];
	subraces: NamedAPIResource<SubRaceName>[];
	url: string;
}

export interface SubRace {
	_id: string;
	index: number;
	name: SubRaceName;
	race: NamedAPIResource<ClassName>;
	desc: string;
	ability_bonuses: number[];
	starting_proficiencies: NamedAPIResource<ProficiencyName>[];
	languages: NamedAPIResource<LanguageName>[];
	racial_traits: NamedAPIResource<TraitName>[];
	url: string;
}

export interface Damage {
	dice_count: number;
	dice_value: DieSides;
	damage_type: NamedAPIResource<DamageTypeName>;
}

export interface Equipment {
	_id: string;
	index: number;
	name: EquipmentName;
	type: EquipmentType;
	subtype: EquipmentSubType;
	weapon_category: WeaponCategory;
	weapon_range: WeaponRange;
	cost: Cost;
	damage: Damage;
	weight: number;
	properties: EquipmentProperty[];
	url: string;
}

export interface Condition {
	_id: string;
	index: number;
	name: ConditionName;
	desc: string[];
	url: string;
}

export interface DamageType {
	_id: string;
	index: number;
	name: DamageTypeName;
	desc: string[];
	url: string;
}

export interface MagicSchool {
	_id: string;
	index: number;
	name: MagicSchoolName;
	url: string;
}
