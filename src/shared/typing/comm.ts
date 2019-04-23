import { ImmutalizerKeyPath } from "./immutalizer";
import { Game } from "./game";

export type GameDataChangeCommHandler = (data: any, path?: GameDataUpdateDataPath) => void;
export type GameDataUpdateDataPath = ImmutalizerKeyPath<Game> | "root";
export default interface GameUpdateData {
	path: GameDataUpdateDataPath;
	data: any;
}