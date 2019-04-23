import * as Immutable from "immutable";
import TimerUtils from "@utils/TimerUtils";
import ConnectedUser from "./ConnectedUser";
import { Game, ImmutableGame } from "@typings/game";
import { GameDataChangeCommHandler, GameDataUpdateDataPath } from "@typings/comm";

export default class ActiveGame {
	private static readonly TICK_LENGTH = 100;
	private connectedUsers: ConnectedUser[] = [];
	private gameData: ImmutableGame;
	private msSinceLastSecond = 0;
	private lastTime = this.getTime();

	constructor(gameData: Game) {
		console.log(`game started`);

		this.gameData = Immutable.fromJS(gameData)

		let timerData = this.gameData.get("timerData");
		timerData = TimerUtils.addIncrement(timerData, { days: 1 });
		timerData = TimerUtils.addIncrement(timerData, { hours: 6 });
		timerData = TimerUtils.addIncrement(timerData, { minutes: 15 });
		timerData = TimerUtils.addIncrement(timerData, { seconds: 30 });

		this.gameData = this.gameData.set("timerData", timerData);
	}

	public addUser(user: ConnectedUser): void {
		const index = this.connectedUsers.indexOf(user);
		if (index === -1) {
			this.connectedUsers.push(user);
			user.setActiveGame(this);
			user.emitGameData(this.gameData);
		}
		else console.log("user is already connected");
	}

	public removeUser(user: ConnectedUser): void {
		const index = this.connectedUsers.indexOf(user);
		if (index !== -1) {
			const user = this.connectedUsers[index];
			user.clearActiveGame();
			this.connectedUsers.splice(index, 1);
		} else console.log("user isn't connected");
	}

	public userSetGameData: GameDataChangeCommHandler = (data, path = "root") => {
		let newGameData = this.gameData;
		data = Immutable.fromJS(data);

		if (path === "root")
			newGameData = data;
		else
			newGameData = newGameData.setIn(path, data);

		const newRunning = newGameData.get("timerRunning");
		const oldRunning = this.gameData.get("timerRunning");
		this.gameData = newGameData;

		this.emitToAllPlayers(data, path);

		if (newRunning && !oldRunning) {
			this.lastTime = this.getTime();
			setTimeout(this.timerFrame, ActiveGame.TICK_LENGTH);
		}
	};

	private emitToAllPlayers(data: any, path?: GameDataUpdateDataPath): void {
		this.connectedUsers.forEach(user => user.emitGameData(data, path));
	}

	private timerFrame: FrameRequestCallback = () => {
		const timerData = this.gameData.get("timerData");
		const time = this.getTime();

		const dt = (time - this.lastTime) * timerData.get("multiplier", 1);
		this.lastTime = time;
		this.msSinceLastSecond += dt;

		if (this.msSinceLastSecond >= 1000) {
			const wholeSeconds = Math.floor(this.msSinceLastSecond / 1000);
			this.msSinceLastSecond = this.msSinceLastSecond % 1000;

			this.gameData = TimerUtils.addSeconds(this.gameData, wholeSeconds);

			this.userSetGameData(this.gameData.get("seconds"), ["seconds"]);
		}

		if (this.gameData.get("timerRunning")) setTimeout(this.timerFrame, ActiveGame.TICK_LENGTH);
	};

	private getTime(): number {
		return (new Date()).getTime();
	}
}