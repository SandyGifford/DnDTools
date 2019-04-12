import emitTypes from "@shared/emitTypes";
import { ImmutableGame, Game } from "@typings/game";
const { fromServer, toServer } = emitTypes;

export type UserSetGameData = (gameData: Partial<Game>) => void;

export default class ConnectedUser {
	private playerIndex: number;
	private playerName: string;

	constructor(private socket: SocketIO.Socket, private setGameData: UserSetGameData) {
		console.log(`${this.getPlayerDisplayText()} connected`);

		socket.on(toServer.setTimerRunning, this.setTimerRunning);
	}

	public sendGameData(gameData: ImmutableGame): void {
		this.socket.emit(fromServer.gameDataChanged, gameData.toJS());
	}

	private setTimerRunning = (timerRunning: boolean) => {
		this.setGameData({
			timerRunning,
		});
	};

	private getPlayerNumber(): number {
		return this.playerIndex + 1;
	}

	private getPlayerDisplayText(): string {
		return this.getNumberedPlayerText() + `(${typeof this.playerName === "string" ? `${this.playerName} @ ` : ""}${this.getAddress()})`
	}

	private getNumberedPlayerText(noTrailingSpace?: boolean): string {
		const playerNumber = this.getPlayerNumber();
		return playerNumber ? `player ${playerNumber}${noTrailingSpace ? "" : " "}` : ""
	}

	private getAddress(): string {
		return this.socket.handshake.address;
	}
}