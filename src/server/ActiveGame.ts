import * as Immutable from "immutable";
import TimerUtils from "@utils/TimerUtils";
import ConnectedUser from "./ConnectedUser";
import { Game, ImmutableGame } from "@typings/game";

export default class ActiveGame {
	private static readonly DEFAULT_GAME_DATA: Game = {
		timerData: {
			seconds: 0,
			running: false,
			increments: {},
			incrementOrder: [],
			selectedIncrementUid: null,
			multiplier: 1,
			daysPerYear: 365,
			hoursPerDay: 24,
		},
	};

	private readonly connectedUsers: ConnectedUser[] = [];
	private gameData: ImmutableGame = Immutable.fromJS(ActiveGame.DEFAULT_GAME_DATA);
	private prevGameRunning = false;
	private msSinceLastSecond = 0;
	private lastTime = this.getTime();

	constructor(io: SocketIO.Server) {
		console.log(`game started`);

		let timerData = this.gameData.get("timerData");
		timerData = TimerUtils.addIncrement(timerData, { days: 1 });
		timerData = TimerUtils.addIncrement(timerData, { hours: 6 });
		timerData = TimerUtils.addIncrement(timerData, { minutes: 15 });
		timerData = TimerUtils.addIncrement(timerData, { seconds: 30 });
		timerData = timerData.set("selectedIncrementUid", timerData.get("incrementOrder").first());
		this.gameData.set("timerData", timerData);

		io.on("connection", socket => {
			console.log("connection")
			const user = new ConnectedUser(socket);
			this.connectedUsers.push(user);
			user.sendGameData(this.gameData);
		});
	}

	private updateGameData(gameData: ImmutableGame): void {
		const running = gameData.get("timerData").get("running");

		if (running && !this.prevGameRunning) {
			this.lastTime = this.getTime();
			requestAnimationFrame(this.timerFrame);
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

			this.gameData = this.gameData.set("timerData", TimerUtils.addSeconds(timerData, wholeSeconds));
		}

		if (this.timerRunning()) requestAnimationFrame(this.timerFrame);
	};

	private timerRunning(): boolean {
		return this.gameData.get("timerData").get("running");
	}

	private getTime(): number {
		return (new Date()).getTime();
	}
}