// GENERAL

// TODO: Many of the following type = string types
// are just placeholders, waiting to be filled out.  They ARE,
// however, correctly used throughout the code so filling them
// in should automatically have beneficial effects throughout
// the program.
// When filling them in, please leave " | string" at the end
// of each union unless you are 100% sure all possibilities
// have been listed.
// TODO: Some of these unions are quite large and contain
// things that should just be looked at as strings.
export type ClassName = "Barbarian" | "Bard" | "Cleric" | "Druid" | "Fighter" | "Monk" | "Paladin" | "Ranger" | "Rogue" | "Sorcerer" | "Warlock" | "Wizard";
export type SubClassName = "Berserker" | "Lore" | "Life" | "Land" | "Champion" | "Open Hand" | "Devotion" | "Hunter" | "Thief" | "Draconic" | "Fiend" | "Evocation" | string;
export type RaceName = "Dwarf" | "Elf" | "Halfling" | "Human" | "Dragonborn" | "Gnome" | "Half-Elf" | "Half-Orc" | "Tiefling" | string;
export type SubRaceName = "Hill Dwarf" | "High Elf" | "Lightfoot Halfling" | "Mountain Dwarf" | "Wood Elf" | "Dark Elf (Drow)" | string;
export type AbilityScoreName = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";
export type SkillName = "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception" | "History" | "Insight" | "Intimidation" | "Investigation" | "Medicine" | "Nature" | "Perception" | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand" | "Stealth" | "Survival";
export type ProficiencyName = "Light armor" | "Medium armor" | "Heavy armor" | "All armor" | "Padded" | "Leather" | "Studded Leather" | "Hide" | "Chain Shirt" | "Scale Mail" | "Breastplate" | "Half Plate" | "Ring Mail" | "Chain Mail" | "Splint" | "Plate" | "Shield" | "Shields" | "Simple weapons" | "Martial weapons" | "Clubs" | "Daggers" | "Greatclubs" | "Handaxes" | "Javelins" | "Light hammers" | "Maces" | "Quarterstaffs" | "Sickles" | "Spears" | "Crossbows, light" | "Darts" | "Shortbows" | "Slings" | "Battleaxes" | "Flails" | "Glaives" | "Greataxes" | "Greatswords" | "Halberds" | "Lances" | "Longswords" | "Mauls" | "Morningstars" | "Pikes" | "Rapiers" | "Scimitars" | "Shortswords" | "Tridents" | "War picks" | "Warhammers" | "Whips" | "Blowguns" | "Crossbows, hand" | "Crossbows, heavy" | "Longbows" | "Nets" | "Alchemist's supplies" | "Brewer's supplies" | "Calligrapher's supplies" | "Carpenter's tools" | "Cartographer's tools" | "Cobbler's tools" | "Cook's utensils" | "Glassblower's tools" | "Jeweler's tools" | "Leatherworker's tools" | "Mason's tools" | "Painter's supplies" | "Potter's tools" | "Smith's tools" | "Tinker's tools" | "Weaver's tools" | "Woodcarver's tools" | "Disguise kit" | "Forgery kit" | "Dice Set" | "Dragonchess set" | "Playing card set" | "Three-Dragon Ante set" | "Bagpipes" | "Drum" | "Dulcimer" | "Flute" | "Lute" | "Lyre" | "Horn" | "Pan flute" | "Shawm" | "Viol" | "Disguise Kit" | "Forgery Kit" | "Herbalism Kit" | "Navigator's Tools" | "Poisoner's Kit" | "Thieves' Tools" | "Land Vehicles" | "Water Vehicles" | "Saving Throw: STR" | "Saving Throw: DEX" | "Saving Throw: CON" | "Saving Throw: INT" | "Saving Throw: WIS" | "Saving Throw: CHA" | "Skill: Acrobatics" | "Skill: Animal Handling" | "Skill: Arcana" | "Skill: Athletics" | "Skill: Deception" | "Skill: History" | "Skill: Insight" | "Skill: Intimidation" | "Skill: Investigation" | "Skill: Medicine" | "Skill: Nature" | "Skill: Perception" | "Skill: Performance" | "Skill: Persuasion" | "Skill: Religion" | "Skill: Sleight of Hand" | "Skill: Stealth" | "Skill: Survival" | string;
export type LanguageName = "Common" | "Dwarvish" | "Elvish" | "Giant" | "Gnomish" | "Goblin" | "Halfling" | "Orc" | "Abyssal" | "Celestial" | "Draconic" | "Deep Speech" | "Infernal" | "Primordial" | "Sylvan" | "Undercommon" | string;
export type FeatureName = "Rage" | "Unarmored Defense" | "Reckless Attack" | "Danger Sense" | "Primal Path" | "Frenzy" | "Ability Score Improvement 1" | "Extra Attack" | "Fast Movement" | "Mindless Rage" | "Feral Instinct" | "Ability Score Improvement 2" | "Brutal Critical (1 die)" | "Intimidating Presence" | "Relentless Rage" | "Ability Score Improvement 3" | "Brutal Critical (2 dice)" | "Retaliation" | "Persistent Rage" | "Ability Score Improvement 4" | "Brutal Critical (3 dice)" | "Indomitable Might" | "Ability Score Improvement 5" | "Fast Movement" | "Spellcasting" | "Bardic Inspiration (d6)" | "Jack of All Trades" | "Song of Rest (d6)" | "Bard College" | "Bonus Proficiencies" | "Cutting Words" | "Choose: Expertise 1" | "Expertise: Acrobatics" | "Expertise: Animal Handling" | "Expertise: Arcana" | "Expertise: Athletics" | "Expertise: Deception" | "Expertise: History" | "Expertise: Insight" | "Expertise: Intimidation" | "Expertise: Investigation" | "Expertise: Medicine" | "Expertise: Nature" | "Expertise: Perception" | "Expertise: Performance" | "Expertise: Persuasion" | "Expertise: Religion" | "Expertise: Sleight of Hand" | "Expertise: Stealth" | "Expertise: Survival" | "Ability Score Improvement 1" | "Bardic Inspiration (d8)" | "Font of Inspiration" | "Countercharm" | "Additional Magical Secrets" | "Ability Score Improvement 2" | "Song of Rest (d8)" | "Bardic Inspiration (d10)" | "Choose: Expertise 2" | "Magical Secrets 1" | "Ability Score Improvement 3" | "Song of Rest (d10)" | "Magical Secrets 2" | "Peerless Skill" | "Bardic Inspiration (d12)" | "Ability Score Improvement 4" | "Song of Rest (d12)" | "Magical Secrets 3" | "Ability Score Improvement 5" | "Superior Inspiration" | "Spellcasting" | "Divine Domain" | "Domain Spells 1" | "Bonus Proficiency" | "Disciple of Life" | "Channel Divinity (1/rest)" | "Channel Divinity: Turn Undead" | "Channel Divinity: Preserve Life" | "Domain Spells 2" | "Ability Score Improvement 1" | "Domain Spells 3" | "Destroy Undead (CR 1/2 or below)" | "Channel Divinity (2/rest)" | "Blessed Healer" | "Domain Spells 4" | "Ability Score Improvement 2" | "Destroy Undead (CR 1 or below)" | "Divine Strike" | "Domain Spells 5" | "Divine Intervention" | "Destroy Undead (CR 2 or below)" | "Ability Score Improvement 3" | "Destroy Undead (CR 3 or below)" | "Ability Score Improvement 4" | "Destroy Undead (CR 4 or below)" | "Supreme Healing" | "Channel Divinity (3/rest)" | "Ability Score Improvement 5" | "Divine Intervention Improvement" | "Spellcasting" | "Druidic" | "Wild Shape (CR 1/4 or below, no flying or swim speed)" | "Druid Circle" | "Choose: Circle of the Land" | "Circle of the Land: Arctic" | "Circle of the Land: Coast" | "Circle of the Land: Desert" | "Circle of the Land: Forest" | "Circle of the Land: Grassland" | "Circle of the Land: Mountain" | "Circle of the Land: Swamp" | "Bonus Cantrip" | "Natural Recovery" | "Circle Spells 1" | "Wild Shape (CR 1/2 or below, no flying speed)" | "Ability Score Improvement 1" | "Circle Spells 2" | "Land's Stride" | "Circle Spells 3" | "Wild Shape (CR 1 or below)" | "Ability Score Improvement 2" | "Circle Spells 4" | "Nature's Ward" | "Ability Score Improvement 3" | "Nature's Sanctuary" | "Ability Score Improvement 4" | "Timeless Body" | "Beast Spells" | "Ability Score Improvement 5" | "Archdruid" | "Choose: Fighting Style" | "Fighting Style: Archery" | "Fighting Style: Defense" | "Fighting Style: Dueling" | "Fighting Style: Great Weapon Fighting" | "Fighting Style: Protection" | "Fighting Style: Two-Weapon Fighting" | "Second Wind" | "Action Surge (1 use)" | "Martial Archetype" | "Improved Critical" | "Ability Score Improvement 1" | "Extra Attack (1)" | "Ability Score Improvement 2" | "Remarkable Athlete" | "Ability Score Improvement 3" | "Indomitable (1 use)" | "Choose: Additional Fighting Style" | "Extra Attack (2)" | "Ability Score Improvement 4" | "Indomitable (2 uses)" | "Ability Score Improvement 5" | "Superior Critical" | "Ability Score Improvement 6" | "Action Surge (2 uses)" | "Indomitable (3 uses)" | "Survivor" | "Ability Score Improvement 7" | "Extra Attack (3)" | "Unarmored Defense" | "Martial Arts" | "Ki" | "Flurry of Blows" | "Patient Defense" | "Step of the Wind" | "Unarmored Movement 1" | "Monastic Tradition" | "Deflect Missiles" | "Open Hand Technique" | "Ability Score Improvement 1" | "Slow Fall" | "Extra Attack" | "Stunning Strike" | "Ki Empowered Strikes" | "Wholeness of Body" | "Evasion" | "Stillness of Mind" | "Ability Score Improvement 2" | "Unarmored Movement 2" | "Purity of Body" | "Tranquility" | "Ability Score Improvement 3" | "Tongue of the Sun and Moon" | "Diamond Soul" | "Timeless Body" | "Ability Score Improvement 4" | "Quivering Palm" | "Empty Body" | "Ability Score Improvement 5" | "Perfect Self" | "Divine Sense" | "Lay on Hands" | "Choose: Fighting Style" | "Fighting Style: Defense" | "Fighting Style: Dueling" | "Fighting Style: Great Weapon Fighting" | "Fighting Style: Protection" | "Spellcasting" | "Divine Smite" | "Divine Health" | "Sacred Oath" | "Oath Spells" | "Channel Divinity" | "Channel Divinity: Sacred Weapon" | "Channel Divinity: Turn the Unholy" | "Ability Score Improvement 1" | "Extra Attack" | "Aura of Protection" | "Aura of Devotion" | "Ability Score Improvement 2" | "Aura of Courage" | "Improved Divine Smite" | "Ability Score Improvement 3" | "Cleansing Touch" | "Purity of Spirit" | "Ability Score Improvement 4" | "Aura improvements" | "Ability Score Improvement 5" | "Nimbus" | "Favored Enemy (1 type)" | "Natural Explorer (1 terrain type)" | "Choose: Fighting Style" | "Fighting Style: Archery" | "Fighting Style: Defense" | "Fighting Style: Dueling" | "Fighting Style: Two-Weapon Fighting" | "Spellcasting" | "Ranger Archetype" | "Choose: Hunter's Prey" | "Hunter's Prey: Colossus Slayer" | "Hunter's Prey: Giant Killer" | "Hunter's Prey: Horde Breaker" | "Primeval Awareness" | "Ability Score Improvement 1" | "Extra Attack" | "Favored Enemy (2 types)" | "Natural Explorer (2 terrain types)" | "Choose: Defensive Tactics" | "Defensive Tactics: Escape the Horde" | "Defensive Tactics: Multiattack Defense" | "Defensive Tactics: Steel Will" | "Ability Score Improvement 2" | "Land’s Stride" | "Natural Explorer (3 terrain types)" | "Hide in Plain Sight" | "Choose: Multiattack" | "Multiattack: Volley" | "Multiattack: Whirlwind Attack" | "Ability Score Improvement 4" | "Favored Enemy (3 enemies)" | "Vanish" | "Choose: Superior Hunter's Defense" | "Superior Hunter's Defense: Evasion" | "Superior Hunter's Defense: Stand Against the Tide" | "Superior Hunter's Defense: Uncanny Dodge" | "Ability Score Improvement 4" | "Feral Senses" | "Ability Score Improvement 5" | "Foe Slayer" | "Choose: Expertise 1" | "Expertise: Acrobatics" | "Expertise: Animal Handling" | "Expertise: Arcana" | "Expertise: Athletics" | "Expertise: Deception" | "Expertise: History" | "Expertise: Insight" | "Expertise: Intimidation" | "Expertise: Investigation" | "Expertise: Medicine" | "Expertise: Nature" | "Expertise: Perception" | "Expertise: Performance" | "Expertise: Persuasion" | "Expertise: Religion" | "Expertise: Sleight of Hand" | "Expertise: Stealth" | "Expertise: Survival" | "Expertise: Thieves' Tools" | "Sneak Attack" | "Thieves' Cant" | "Cunning Action" | "Roguish Archetype" | "Fast Hands" | "Second-Story Work" | "Ability Score Improvement 1" | "Uncanny Dodge" | "Choose: Expertise 2" | "Evasion" | "Ability Score Improvement 2" | "Supreme Sneak" | "Ability Score Improvement 3" | "Reliable Talent" | "Ability Score Improvement 4" | "Use Magic Device" | "Blindsense" | "Slippery Mind" | "Ability Score Improvement 5" | "Thief's Reflexes" | "Elusive" | "Ability Score Improvement 6" | "Stroke of Luck" | "Spellcasting" | "Sorcerous Origin" | "Choose: Dragon Ancestor" | "Dragon Ancestor: Black - Acid Damage" | "Dragon Ancestor: Blue - Lightning Damage" | "Dragon Ancestor: Brass - Fire Damage" | "Dragon Ancestor: Bronze - Lightning Damage" | "Dragon Ancestor: Copper - Acid Damage" | "Dragon Ancestor: Gold - Fire Damage" | "Dragon Ancestor: Green - Poison Damage" | "Dragon Ancestor: Red - Fire Damage" | "Dragon Ancestor: Silver - Cold Damage" | "Dragon Ancestor: White - Cold Damage" | "Draconic Resilience" | "Font of Magic" | "Flexible Casting: Creating Spell Slots" | "Flexible Casting: Converting Spell Slot" | "Choose: Metamagic" | "Metamagic: Careful Spell" | "Metamagic: Distant Spell" | "Metamagic: Empowered Spell" | "Metamagic: Extended Spell" | "Metamagic: Heightened Spell" | "Metamagic: Quickened Spell" | "Metamagic: Subtle Spell" | "Metamagic: Twinned Spell" | "Ability Score Improvement 1" | "Elemental Affinity" | "Ability Score Improvement 2" | "Choose: Additional Metamagic" | "Ability Score Improvement 3" | "Dragon Wings" | "Ability Score Improvement 4" | "Choose: Additional Metamagic" | "Draconic Presence" | "Ability Score Improvement 5" | "Sorcerous Restoration" | "Otherworldly Patron" | "Dark One's Blessing" | "Pact Magic" | "Choose: Eldritch Invocations" | "Eldritch Invocation: Agonizing Blast" | "Eldritch Invocation: Armor of Shadows" | "Eldritch Invocation: Beast Speech" | "Eldritch Invocation: Beguiling Influence" | "Eldritch Invocation: Book of Ancient Secrets" | "Eldritch Invocation: Devil’s Sight" | "Eldritch Invocation: Eldritch Sight" | "Eldritch Invocation: Eldritch Spear" | "Eldritch Invocation: Eyes of the Rune Keeper" | "Eldritch Invocation: Fiendish Vigor" | "Eldritch Invocation: Gaze of Two Minds" | "Eldritch Invocation: Mask of Many Faces" | "Eldritch Invocation: Misty Visions" | "Eldritch Invocation: Repelling Blast" | "Eldritch Invocation: Thief of Five Fates" | "Eldritch Invocation: Voice of the Chain Master" | "Eldritch Invocation: Mire the Mind" | "Eldritch Invocation: One with Shadows" | "Eldritch Invocation: Sign of Ill Omen" | "Eldritch Invocation: Thirsting Blade" | "Eldritch Invocation: Bewitching Whispers" | "Eldritch Invocation: Dreadful Word" | "Eldritch Invocation: Sculptor of Flesh" | "Eldritch Invocation: Ascendant Step" | "Eldritch Invocation: Minions of Chaos" | "Eldritch Invocation: Otherworldly Leap" | "Eldritch Invocation: Whispers of the Grave" | "Eldritch Invocation: Lifedrinker" | "Eldritch Invocation: Chains of Carceri" | "Eldritch Invocation: Master of Myriad Forms" | "Eldritch Invocation: Visions of Distant Realms" | "Eldritch Invocation: Witch Sight" | "Choose: Pact Boon" | "Pact of the Chain" | "Pact of the Blade" | "Pact of the Tome" | "Ability Score Improvement 1" | "Choose: Additional Eldritch Invocation" | "Dark One's Own Luck" | "Choose: Additional Eldritch Invocation" | "Ability Score Improvement 2" | "Choose: Additional Eldritch Invocation" | "Fiendish Resilience" | "Mystic Arcanum (6th level)" | "Ability Score Improvement 3" | "Choose: Additional Eldritch Invocation" | "Mystic Arcanum (7th level)" | "Hurl Through Hell" | "Mystic Arcanum (8th level)" | "Choose: Additional Eldritch Invocation" | "Ability Score Improvement 5" | "Mystic Arcanum (9th level)" | "Choose: Additional Eldritch Invocation" | "Ability Score Improvement 6" | "Eldritch Master" | "Choose: Additional Eldritch Invocation" | "Spellcasting" | "Arcane Recovery" | "Arcane Tradition" | "Evocation Savant" | "Sculpt Spells" | "Ability Score Improvement 1" | "Potent Cantrip" | "Ability Score Improvement 2" | "Empowered Evocation" | "Ability Score Improvement 3" | "Overchannel" | "Ability Score Improvement 4" | "Spell Mastery" | "Ability Score Improvement 5" | "Signature Spell" | string;
export type EquipmentName = "Club" | "Dagger" | "Greatclub" | "Handaxe" | "Javelin" | "Light hammer" | "Mace" | "Quarterstaff" | "Sickle" | "Spear" | "Crossbow, light" | "Dart" | "Shortbow" | "Sling" | "Battleaxe" | "Flail" | "Glaive" | "Greataxe" | "Greatsword" | "Halberd" | "Lance" | "Longsword" | "Maul" | "Morningstar" | "Pike" | "Rapier" | "Scimitar" | "Shortsword" | "Trident" | "War pick" | "Warhammer" | "Whip" | "Blowgun" | "Crossbow, hand" | "Crossbow, heavy" | "Longbow" | "Net" | "Padded" | "Leather" | "Studded Leather" | "Hide" | "Chain Shirt" | "Scale Mail" | "Breastplate" | "Half Plate" | "Ring Mail" | "Chain Mail" | "Splint" | "Plate" | "Shield" | "Abacus" | "Acid (vial)" | "Alchemist’s fire (flask)" | "Arrow" | "Blowgun needle" | "Crossbow bolt" | "Sling bullet" | "Amulet" | "Antitoxin (vial)" | "Crystal" | "Orb" | "Rod" | "Staff" | "Wand" | "Backpack" | "Ball bearings (bag of 1,000)" | "Barrel" | "Basket" | "Bedroll" | "Bell" | "Blanket" | "Block and tackle" | "Book" | "Bottle, glass" | "Bucket" | "Caltrops" | "Candle" | "Case, crossbow bolt" | "Case, map or scroll" | "Chain (10 feet)" | "Chalk (1 piece)" | "Chest" | "Clothes, common" | "Clothes, costume" | "Clothes, fine" | "Clothes, traveler’s" | "Component pouch" | "Crowbar" | "Sprig of mistletoe" | "Totem" | "Wooden staff" | "Yew wand" | "Emblem" | "Fishing tackle" | "Flask or tankard" | "Grappling hook" | "Hammer" | "Hammer, sledge" | "Holy water (flask)" | "Hourglass" | "Hunting trap" | "Ink (1 ounce bottle)" | "Ink pen" | "Jug or pitcher" | "Climber’s Kit" | "Disguise Kit" | "Forgery Kit" | "Herbalism Kit" | "Healer’s Kit" | "Mess Kit" | "Poisoner’s Kit" | "Ladder (10-foot)" | "Lamp" | "Lantern, bullseye" | "Lantern, hooded" | "Lock" | "Magnifying glass" | "Manacles" | "Mirror, steel" | "Oil (flask)" | "Paper (one sheet)" | "Parchment (one sheet)" | "Perfume (vial)" | "Pick, miner’s" | "Piton" | "Poison, basic (vial)" | "Pole (10-foot)" | "Pot, iron" | "Potion of healing" | "Pouch" | "Quiver" | "Ram, portable" | "Rations (1 day)" | "Reliquary" | "Robes" | "Rope, hempen (50 feet)" | "Rope, silk (50 feet)" | "Sack" | "Scale, merchant’s" | "Sealing wax" | "Shovel" | "Signal whistle" | "Signet ring" | "Soap" | "Spellbook" | "Spike, iron" | "Spyglass" | "Tent, two-person" | "Tinderbox" | "Torch" | "Vial" | "Waterskin" | "Whetstone" | "Burglar's Pack" | "Diplomat's Pack" | "Dungeoneer's Pack" | "Entertainer's Pack" | "Explorer's Pack" | "Priest's Pack" | "Scholar's Pack" | "Alchemist’s supplies" | "Brewer’s supplies" | "Calligrapher’s supplies" | "Carpenter’s tools" | "Cartographer’s tools" | "Cobbler’s tools" | "Cook’s utensils" | "Glassblower’s tools" | "Jeweler’s tools" | "Leatherworker’s tools" | "Mason’s tools" | "Painter’s supplies" | "Potter’s tools" | "Smith’s tools" | "Tinker’s tools" | "Weaver’s tools" | "Woodcarver’s tools" | "Dice set" | "Playing card set" | "Bagpipes" | "Drum" | "Dulcimer" | "Flute" | "Lute" | "Lyre" | "Horn" | "Pan flute" | "Shawm" | "Viol" | "Navigator’s tools" | "Thieves’ tools" | "Camel" | "Donkey" | "Mule" | "Elephant" | "Horse, draft" | "Horse, riding" | "Mastiff" | "Pony" | "Warhorse" | "Barding: Padded" | "Barding: Leather" | "Barding: Studded Leather" | "Barding: Hide" | "Barding: Chain shirt" | "Barding: Scale mail" | "Barding: Breastplate" | "Barding: Half plate" | "Barding: Ring mail" | "Barding: Chain mail" | "Barding: Splint" | "Barding: Plate" | "Bit and bridle" | "Carriage" | "Cart" | "Chariot" | "Animal Feed (1 day)" | "Saddle, Exotic" | "Saddle, Military" | "Saddle, Pack" | "Riding" | "Saddlebags" | "Sled" | "Stabling (1 day)" | "Wagon" | "Barding: Padded" | "Barding: Leather" | "Barding: Studded Leather" | "Barding: Hide" | "Barding: Chain shirt" | "Barding: Scale mail" | "Barding: Breastplate" | "Barding: Half plate" | "Barding: Ring mail" | "Barding: Chain mail" | "Barding: Splint" | "Barding: Plate" | "Bit and bridle" | "Carriage" | "Cart" | "Chariot" | "Animal Feed (1 day)" | "Saddle, Exotic" | "Saddle, Military" | "Saddle, Pack" | "Riding" | "Saddlebags" | "Sled" | "Stabling (1 day)" | "Wagon" | "Galley" | "Keelboat" | "Longship" | "Rowboat" | "Sailing ship" | "Warship" | string;
export type ConditionName = "Blinded" | "Charmed" | "Deafened" | "Frightened" | "Grappled" | "Incapacitated" | "Invisible" | "Paralyzed" | "Petrified" | "Poisoned" | "Prone" | "Restrained" | "Stunned" | "Unconscious" | string;
export type DamageTypeName = "Acid" | "Bludgeoning" | "Cold" | "Fire" | "Force" | "Lightning" | "Necrotic" | "Piercing" | "Poison" | "Psychic" | "Radiant" | "Slashing" | "Thunder" | string;
export type MagicSchoolName = "Abjuration" | "Conjuration" | "Divination" | "Enchantment" | "Evocation" | "Illusion" | "Necromancy" | "Transmutation" | string;
export type TraitName = "Darkvision" | "Dwarven Resilience" | "Dwarven Combat Training" | "Stonecunning" | "Dwarven Toughness" | "Keen Senses" | "Fey Ancestry" | "Trance" | "Elf Weapon Training" | "High Elf Cantrip" | "Extra Language" | "Lucky" | "Brave" | "Halfling Nimbleness" | "Naturally Stealthy" | "Draconic Ancestry" | "Breath Weapon" | "Damage Resistance" | "Gnome Cunning" | "Artificer's Lore" | "Tinker" | "Skill Versatility" | "Menacing" | "Relentless Endurance" | "Savage Attacks" | "Hellish Resistance" | "Internal Legacy" | string;

export type ProficiencyType = string;
export type LanguageType = string;
export type EquipmentType = string;
export type EquipmentSubType = string;

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type EquipmentProperty = string;
export type LanguageScript = string;
export type WeaponCategory = string;
export type Size = "Medium" | string;
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
