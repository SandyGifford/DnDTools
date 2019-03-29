export default class ConnectedUser {
	private playerIndex: number;
	private playerName: string;

	constructor(private socket: SocketIO.Socket) {
		console.log(`${this.getPlayerDisplayText()} connected`);
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