import * as Immutable from "immutable";
import io from "socket.io-client";

import EventDelegate, { GenericEventListener } from "@utils/EvevntDelegate";
import { ImmutableGame } from "@typings/game";
import { ImmutableTimerData } from "@typings/timer";
import gameDataUpdatedEmitType from "@shared/const/comm";
import GameUpdateData, { GameDataUpdateDataPath } from "@typings/comm";
import CommUtils from "@utils/CommUtils";

export type GameDataChangedListener = GenericEventListener<ImmutableGame>;

export default class SocketEndpoints {
	private static gameData: ImmutableGame;
	private static gameChangedDelegate = new EventDelegate<ImmutableGame>();
	private static socket = io();

	public static init = () => {
		SocketEndpoints.socket.on(gameDataUpdatedEmitType, SocketEndpoints.gameDataChanged);
	};

	public static addDataChangedListener = (listener: GameDataChangedListener) => {
		SocketEndpoints.gameChangedDelegate.addEventListener(listener);
	};

	public static removeDataChangedListener = (listener: GameDataChangedListener) => {
		SocketEndpoints.gameChangedDelegate.removeEventListener(listener);
	};

	public static setTimerRunning = (timerRunning: boolean) => {
		SocketEndpoints.changeGameData(timerRunning, ["timerRunning"]);
	};

	public static setSeconds = (seconds: number): void => {
		SocketEndpoints.changeGameData(seconds, ["seconds"]);
	};

	public static setTimerData = (timerData: ImmutableTimerData): void => {
		SocketEndpoints.changeGameData(timerData.toJS(), ["timerData"]);
	};

	private static changeGameData = (gameData: any, path?: GameDataUpdateDataPath): void => {
		SocketEndpoints.socket.emit(gameDataUpdatedEmitType, CommUtils.makeGameUpdateData(gameData, path));
	};

	private static gameDataChanged = (commData: GameUpdateData): void => {
		const data = Immutable.fromJS(commData.data);

		if (commData.path === "root")
			SocketEndpoints.gameData = data as ImmutableGame;
		else
			SocketEndpoints.gameData = SocketEndpoints.gameData.setIn(commData.path, data);

		SocketEndpoints.gameChangedDelegate.trigger(SocketEndpoints.gameData);
	};
}

SocketEndpoints.init();
