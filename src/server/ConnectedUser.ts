import emitTypes from "@shared/emitTypes";
import { ImmutableGame } from "@typings/game";
const { fromServer } = emitTypes;

export default class ConnectedUser {
	private playerIndex: number;
	private playerName: string;

	constructor(private socket: SocketIO.Socket) {
		console.log(`${this.getPlayerDisplayText()} connected`);
	}

	public sendGameData(gameData: ImmutableGame): void {
		this.socket.emit(fromServer.gameDataChanged, gameData.toJS());
	}

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