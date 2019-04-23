import ActiveGame from "./ActiveGame";
import gameDataUpdatedEmitType from "@shared/const/comm";
import GameUpdateData, { GameDataUpdateDataPath } from "@typings/comm";
import CommUtils from "@utils/CommUtils";

export default class ConnectedUser {
	private playerIndex: number;
	private playerName: string;
	private activeGame: ActiveGame;

	constructor(private socket: SocketIO.Socket) {
		console.log(`${this.getPlayerDisplayText()} connected`);

		socket.on(gameDataUpdatedEmitType, this.userChangeDataRequest);
	}

	public onDisconnect = () => {
		console.log(`${this.getPlayerDisplayText()} disconnected`);

		this.socket.removeAllListeners();
	};

	public setActiveGame(activeGame: ActiveGame): void {
		this.activeGame = activeGame;
	}

	public clearActiveGame(): void {
		this.activeGame = null;
	}

	public emitGameData(data: any, path?: GameDataUpdateDataPath): void {
		this.socket.emit(gameDataUpdatedEmitType, CommUtils.makeGameUpdateData(data, path));
	}

	private userChangeDataRequest = (data: GameUpdateData) => {
		if (this.activeGame) this.activeGame.userSetGameData(data.data, data.path);
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