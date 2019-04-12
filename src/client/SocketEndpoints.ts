import * as Immutable from "immutable";
import io from "socket.io-client";

import emitTypes from "@shared/emitTypes";
import EventDelegate, { GenericEventListener } from "@utils/EvevntDelegate";
import { ImmutableGame, Game } from "@typings/game";
import TimerData, { ImmutableTimerData } from "@typings/timer";
const { fromServer, toServer } = emitTypes;

export type GameDataChangedListener = GenericEventListener<ImmutableGame>;

export default class SocketEndpoints {
	private static gameData: ImmutableGame;
	private static gameChangedDelegate = new EventDelegate<ImmutableGame>();
	private static socket = io();

	public static init = () => {
		SocketEndpoints.socket.on(fromServer.gameDataChanged, (newGameData: Game) => SocketEndpoints.gameDataChanged(Immutable.fromJS(newGameData)));
		SocketEndpoints.socket.on(fromServer.timerDataChanged, (timerData: TimerData) => SocketEndpoints.timerDataChanged(Immutable.fromJS(timerData)));
		SocketEndpoints.socket.on(fromServer.secondsChanged, SocketEndpoints.secondsChanged);
		SocketEndpoints.socket.on(fromServer.runningChanged, SocketEndpoints.timerRunningChanged);
	};

	public static addDataChangedListener = (listener: GameDataChangedListener) => {
		SocketEndpoints.gameChangedDelegate.addEventListener(listener);
	};

	public static removeDataChangedListener = (listener: GameDataChangedListener) => {
		SocketEndpoints.gameChangedDelegate.removeEventListener(listener);
	};

	public static toggleTimerRunning = () => {
		SocketEndpoints.socket.emit(toServer.toggleRunning);
	};

	public static setTimerData = (timerData: ImmutableTimerData): void => {
		SocketEndpoints.socket.emit(toServer.setTimerData, timerData.toJS());
	};

	private static secondsChanged = (seconds: number): void => {
		SocketEndpoints.gameDataChanged(SocketEndpoints.gameData.set("seconds", seconds));
	};

	private static timerRunningChanged = (timerRunning: boolean): void => {
		SocketEndpoints.gameDataChanged(SocketEndpoints.gameData.set("timerRunning", timerRunning));
	};

	private static timerDataChanged = (timerData: ImmutableTimerData): void => {
		SocketEndpoints.gameDataChanged(SocketEndpoints.gameData.set("timerData", timerData));
	};

	private static gameDataChanged = (gameData: ImmutableGame): void => {
		console.log("game changed", gameData.toJS());
		SocketEndpoints.gameData = gameData;
		SocketEndpoints.gameChangedDelegate.trigger(SocketEndpoints.gameData);
	};
}

SocketEndpoints.init();
