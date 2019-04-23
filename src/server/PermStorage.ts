import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import { Game } from "@typings/game";
import defaultGame from "@shared/defaults/defaultGame";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const fileExists = promisify(fs.exists);

export default class PermStorage {
	private static readonly STORAGE_PATH = path.resolve(__dirname, "../storage");
	private static readonly GAME_FILENAME = "activeGame.ddt";

	public static saveGame(gameData: Game): Promise<void> {
		return this.saveJSONFile(this.GAME_FILENAME, gameData);
	}

	public static readGame(): Promise<Game> {
		return this.touchJSONFile(this.GAME_FILENAME, defaultGame);
	}

	private static saveJSONFile<T extends {}>(fileName: string, data: T): Promise<void> {
		return this.saveFile(fileName, JSON.stringify(data));
	}

	private static saveFile(fileName: string, data: string): Promise<void> {
		const filePath = path.resolve(this.STORAGE_PATH, fileName);
		return writeFile(filePath, data);
	}

	private static touchJSONFile<T extends {}>(fileName: string, defatultContents: T = {} as T): Promise<T> {
		return this.touchFile(fileName, JSON.stringify(defatultContents))
			.then(contents => JSON.parse(contents));
	}

	private static touchFile<T extends string>(fileName: string, defatultContents: T = "" as T): Promise<T> {
		return this.touchStorageDir()
			.then(() => fileExists(this.STORAGE_PATH))
			.then(exists => {
				const filePath = path.resolve(this.STORAGE_PATH, fileName);

				if (!exists)
					return writeFile(filePath, defatultContents)
						.then(() => readFile(filePath, { encoding: "utf-8" })) as Promise<T>;

				return readFile(filePath, { encoding: "utf-8" }) as Promise<T>;
			});
	}

	private static touchStorageDir(): Promise<void> {
		return fileExists(this.STORAGE_PATH)
			.then(exists => {
				if (!exists) mkdir(this.STORAGE_PATH)
			});
	}
}