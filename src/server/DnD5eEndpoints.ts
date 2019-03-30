import fetch from "node-fetch";
import {
	ClassName,
	Level,
	RaceName,
	NamedAPIResourceList,
	AbilityScore,
	Skill,
	Proficiency,
	Language,
	CharClass,
	CharSubClass,
	Feature,
	ClassLevel,
	SubClassName,
	Race,
	SubRace,
	Equipment,
	DamageType,
	MagicSchool
} from "@typings/DnD5e";
import { Condition } from "webpack";

export default class DnD5eEndpoints {
	public static abilityScores(): Promise<NamedAPIResourceList>;
	public static abilityScores(index: number): Promise<AbilityScore>;
	public static abilityScores(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/ability-scores/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}

	public static skills(): Promise<NamedAPIResourceList>;
	public static skills(index: number): Promise<Skill>;
	public static skills(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/skills/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}

	public static proficiencies(): Promise<NamedAPIResourceList>;
	public static proficiencies(index: number): Promise<Proficiency>;
	public static proficiencies(className: ClassName): Promise<Proficiency>;
	public static proficiencies(indexer?: number | ClassName): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/proficiencies/${typeof indexer !== "undefined" ? indexer : ""}`)
			.then(r => r.json());
	}

	public static languages(): Promise<NamedAPIResourceList>;
	public static languages(index: number): Promise<Language>;
	public static languages(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/languages/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}

	public static classes(): Promise<NamedAPIResourceList<ClassName>>;
	public static classes(index: number): Promise<CharClass>;
	public static classes(className: ClassName): Promise<CharClass>;
	public static classes(indexer?: number | ClassName): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/classes/${typeof indexer !== "undefined" ? indexer : ""}`)
			.then(r => r.json());
	}


	public static subClasses(): Promise<NamedAPIResourceList<SubClassName>>;
	public static subClasses(index: number): Promise<CharSubClass>;
	public static subClasses(className: ClassName): Promise<CharSubClass>;
	public static subClasses(indexer?: number | ClassName): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/subclasses/${typeof indexer !== "undefined" ? indexer : ""}`)
			.then(r => r.json());
	}

	public static features(): Promise<NamedAPIResourceList>;
	public static features(index: number): Promise<Feature>;
	public static features(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/features/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}

	public static classLevel(className: ClassName, level: Level): Promise<ClassLevel> {
		return fetch(`http://www.dnd5eapi.co/api/classes/${className}/level/${level}`)
			.then(r => r.json());
	}

	public static races(): Promise<NamedAPIResourceList<RaceName>>;
	public static races(index: number): Promise<Race>;
	public static races(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/races/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}

	public static subRaces(): Promise<NamedAPIResourceList>;
	public static subRaces(index: number): Promise<SubRace>;
	public static subRaces(race: RaceName): Promise<SubRace>;
	public static subRaces(indexer?: any): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/subraces/${typeof indexer !== "undefined" ? indexer : ""}`)
			.then(r => r.json());
	}

	public static equipment(): Promise<NamedAPIResourceList>;
	public static equipment(index: number): Promise<Equipment>;
	public static equipment(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/equipment/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}

	public static conditions(): Promise<NamedAPIResourceList>;
	public static conditions(index: number): Promise<Condition>;
	public static conditions(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/conditions/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}

	public static damageTypes(): Promise<NamedAPIResourceList>;
	public static damageTypes(index: number): Promise<DamageType>;
	public static damageTypes(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/damage-types/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}

	public static magicSchools(): Promise<NamedAPIResourceList>;
	public static magicSchools(index: number): Promise<MagicSchool>;
	public static magicSchools(index?: number): Promise<any> {
		return fetch(`http://www.dnd5eapi.co/api/magic-schools/${typeof index !== "undefined" ? index : ""}`)
			.then(r => r.json());
	}
}
