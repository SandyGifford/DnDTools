import * as Immutable from "immutable";
import TimerUtils from "@utils/TimerUtils";
import ConnectedUser, { UserSetGameData } from "./ConnectedUser";
import { Game, ImmutableGame } from "@typings/game";
import emitTypes from "@shared/emitTypes";

const { fromServer } = emitTypes;

export default class ActiveGame {
	private static readonly DEFAULT_GAME_DATA: Game = {
		seconds: 0,
		timerRunning: false,
		timerData: {
			increments: {},
			incrementOrder: [],
			multiplier: 1,
			daysPerYear: 365,
			hoursPerDay: 24,
		},
	};

	private static readonly TICK_LENGTH = 100;
	private readonly connectedUsers: ConnectedUser[] = [];
	private gameData: ImmutableGame = Immutable.fromJS(ActiveGame.DEFAULT_GAME_DATA);
	private msSinceLastSecond = 0;
	private lastTime = this.getTime();

	constructor(private io: SocketIO.Server) {
		console.log(`game started`);

		let timerData = this.gameData.get("timerData");
		timerData = TimerUtils.addIncrement(timerData, { days: 1 });
		timerData = TimerUtils.addIncrement(timerData, { hours: 6 });
		timerData = TimerUtils.addIncrement(timerData, { minutes: 15 });
		timerData = TimerUtils.addIncrement(timerData, { seconds: 30 });

		this.gameData = this.gameData.set("timerData", timerData);

		io.on("connection", socket => {
			const user = new ConnectedUser(socket, this.userSetGameData);
			this.connectedUsers.push(user);
			user.sendGameData(this.gameData);

			socket.on("disconnect", () => {
				const index = this.connectedUsers.indexOf(user);
				this.connectedUsers.splice(index, 1);
				user.onDisconnect();
			});
		});
	}

	private userSetGameData: UserSetGameData = gameData => {
		let newGameData = this.gameData;
		const keys = Object.keys(gameData) as (keyof Game)[];

		keys.forEach(key => {
			newGameData = newGameData.set(key, Immutable.fromJS(gameData[key]) as any)
		});

		this.updateGameData(newGameData);
	};

	private updateGameData(gameData: ImmutableGame): void {
		const newRunning = gameData.get("timerRunning");
		const oldRunning = this.gameData.get("timerRunning");
		this.gameData = gameData;

		this.io.emit(fromServer.gameDataChanged, gameData.toJS());

		if (newRunning && !oldRunning) {
			this.lastTime = this.getTime();
			setTimeout(this.timerFrame, ActiveGame.TICK_LENGTH);
		}
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

			this.io.emit(fromServer.secondsChanged, this.gameData.get("seconds"));
		}

		if (this.gameData.get("timerRunning")) setTimeout(this.timerFrame, ActiveGame.TICK_LENGTH);
	};

	private getTime(): number {
		return (new Date()).getTime();
	}
}