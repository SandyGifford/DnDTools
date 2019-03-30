// GENERAL

export type ClassName = string;
export type SubClassName = string;
export type RaceName = string;
export type Level = number; // level 1-20
export type Size = string; // Medium
export type WeaponRange = "Melee" | "Ranged";
export type DieSides = 4 | 6 | 8 | 10 | 12 | 20;

export type CoinType = "gp" | "sp" | "cp";

export type APIResource = NamedAPIResource | ClassAPIResource;

export interface NamedAPIResource<NAME extends string = string> {
	name: NAME;
	url: string;
}

export interface ClassAPIResource {
	class: ClassName;
	url: string;
}

export interface Choice {
	choose: number;
	type: string; // TODO: can this be narrowed?
	from: APIResource[]; // TODO: let generics trickle through
}

export interface Cost {
	quantity: number;
	unit: CoinType;
}

export interface NamedAPIResourceList<NAME extends string = string> {
	count: number;
	results: NamedAPIResource<NAME>[];
}

export interface ClassAPIResourceList<CLASSNAME extends string = string> {
	count: number;
	results: ClassAPIResource[];
}



// SPECIFIC

export interface AbilityScore {
	_id: string;
	index: number;
	name: string;
	full_name: string;
	desc: string[];
	skills: NamedAPIResource[];
	url: string;
}

export interface Skill {
	_id: string;
	index: number;
	name: string;
	desc: string[];
	ability_score: NamedAPIResource[];
	url: string;
}

export interface Proficiency {
	_id: string;
	index: number;
	type: string;
	name: string;
	classes: NamedAPIResource[];
	races: [];
	url: string;
}

export interface Language {
	_id: string;
	index: number;
	name: string;
	type: string;
	typical_speakers: RaceName[];
	script: string;
	url: string;
}

export interface InitialProficiencies {
	from: NamedAPIResource[];
	type: string;
	choose: number;
}

export interface CharClass {
	_id: string;
	index: number;
	name: ClassName;
	hit_die: number;
	proficiency_choices: Choice[];
	proficiencies: NamedAPIResource[];
	saving_throws: NamedAPIResource[];
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
	features: string[];
	url: string[];
}

export interface Feature {
	_id: string;
	index: number;
	name: string;
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
	feature_choices: NamedAPIResource[];
	features: NamedAPIResource[];
	spellcasting: LevelSpellcasting;
	class_specific: LevelClassSpecific;
	index: number;
	class: ClassAPIResource;
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
	starting_proficiencies: NamedAPIResource[];
	languages: NamedAPIResource[];
	language_desc: string;
	traits: NamedAPIResource[];
	subraces: NamedAPIResource[];
	url: string;
}

export interface SubRace {
	_id: string;
	index: number;
	name: string;
	race: NamedAPIResource<ClassName>;
	desc: string;
	ability_bonuses: number[];
	starting_proficiencies: NamedAPIResource[];
	languages: NamedAPIResource[];
	racial_traits: NamedAPIResource[];
	url: string;
}

export interface Damage {
	dice_count: number;
	dice_value: DieSides;
	damage_type: NamedAPIResource;
}

export interface Equipment {
	_id: string[];
	index: number;
	name: string;
	type: string;
	subtype: string;
	weapon_range: WeaponRange;
	weapon_category: string;
	cost: Cost;
	damage: Damage;
	weight: number;
	properties: string[];
	url: string;
}

export interface Condition {
	_id: string;
	index: number;
	name: string;
	desc: string[];
	url: string;
}

export interface DamageType {
	_id: string;
	index: number;
	name: string;
	desc: string[];
	url: string;
}

export interface MagicSchool {
	_id: string;
	index: number;
	name: string;
	url: string;
}
