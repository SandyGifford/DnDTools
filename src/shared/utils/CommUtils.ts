import GameUpdateData, { GameDataUpdateDataPath } from "@typings/comm";

export default class CommUtils {
	public static makeGameUpdateData(data: any, path?: GameDataUpdateDataPath): GameUpdateData {
		return {
			data,
			path: path || "root",
		};
	}
}