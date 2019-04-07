import * as Immutable from "immutable";
import io from "socket.io-client";

import emitTypes from "@shared/emitTypes";
import EventDelegate, { GenericEventListener } from "@utils/EvevntDelegate";
import { ImmutableGame, Game } from "@typings/game";
import TimerData, { ImmutableTimerData } from "@typings/timer";
const { fromServer } = emitTypes;

export type GameDataChangedListener = GenericEventListener<ImmutableGame>;

export default class SocketEndpoints {
	private static gameData: ImmutableGame;
	private static gameChangedDelegate = new EventDelegate<ImmutableGame>();
	private static socket = io();

	public static init() {
		console.log("connected?", this.socket.connected)
		this.socket.on(fromServer.gameDataChanged, (newGameData: Game) => this.setGameData(Immutable.fromJS(newGameData)));
		this.socket.on(fromServer.timerDataChanged, (timerData: TimerData) => this.setTimerData(Immutable.fromJS(timerData)));
		this.socket.on(fromServer.timeChanged, (seconds: number) => this.setSeconds(seconds));
	}

	public static addDataChangedListener(listener: GameDataChangedListener) {
		this.gameChangedDelegate.addEventListener(listener);
	}

	public static removeDataChangedListener(listener: GameDataChangedListener) {
		this.gameChangedDelegate.removeEventListener(listener);
	}

	private static setSeconds(seconds: number): void {
		let timerData = this.gameData.get("timerData");
		this.setTimerData(timerData.set("seconds", seconds));
	}

	private static setTimerData(timerData: ImmutableTimerData): void {
		this.setGameData(this.gameData.set("timerData", timerData));
	}

	private static setGameData(gameData: ImmutableGame): void {
		this.gameData = gameData;
		this.gameChangedDelegate.trigger(this.gameData);
	}
}

SocketEndpoints.init();
