import { Level, SkillName, AbilityScoreName } from "dnd5e";

export type CharacterAlignmet = "Neutral" | string; // TODO: could be narrowed
export type CharacterBackground = "Criminal" | string; // TODO: could be narrowed

export type AbilityScoreMap<T> = { [abilityScore in AbilityScoreName]: T };
export type SkillMap<T> = { [skill in SkillName]: T };

export interface Character {
	name: string;
	classIndex: number;
	background: CharacterBackground;
	alignment: CharacterAlignmet;
	raceIndex: number;
	subRaceIndex: number;
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
	proficiencyIndexes: number[];
	languageIndexes: number[];
	equipmentIndexes: number[];
	personality: string[];
	ideals: string[];
	bonds: string[];
	flaws: string[];
	featureIndexes: number[];
	traitIndexes: number[];
}