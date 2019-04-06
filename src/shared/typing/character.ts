import { ClassName, RaceName, SubRaceName, Level, AbilityScoreName, SkillName, ProficiencyName, LanguageName, EquipmentName, FeatureName, TraitName } from "dnd5e";

export type CharacterAlignmet = "Neutral" | string; // TODO: could be narrowed
export type CharacterBackground = "Criminal" | string; // TODO: could be narrowed

export type AbilityScoreMap<T> = { [abilityScore in AbilityScoreName]: T };
export type SkillMap<T> = { [skill in SkillName]: T };

export interface Character {
	name: string;
	class: ClassName;
	background: CharacterBackground;
	alignment: CharacterAlignmet;
	race: RaceName;
	subRace: SubRaceName;
	experiencePoints: number;
	level: Level;
	insperation: boolean;
	proficiencyBonus: number;
	savingThrows: AbilityScoreMap<number>;
	abilityScores: AbilityScoreMap<number>;
	armorClass: number;
	speed: number;
	hp: number;
	maxHp: number;
	hitDice: number;
	deathSaveFails: number;
	deathSaveSuccesses: number;
	proficiencies: ProficiencyName[];
	languages: LanguageName[];
	equipment: EquipmentName[];
	personality: string[];
	ideals: string[];
	bonds: string[];
	flaws: string[];
	features: FeatureName[];
	traits: TraitName[];
}