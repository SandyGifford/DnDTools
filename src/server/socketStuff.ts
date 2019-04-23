import { Server } from "http";

import ActiveGame from "./ActiveGame";
import ConnectedUser from "./ConnectedUser";
import PermStorage from "./storage";
import defaultGame from "@shared/defaults/defaultGame";

const connectedUsers: ConnectedUser[] = [];
let activeGame: ActiveGame;

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);

	PermStorage.readGame()
		.catch(e => {
			console.log("Problem readin game data from perm storage, using temporary game", e);
			return defaultGame;
		})
		.then(gameData => {
			activeGame = new ActiveGame(gameData);
			connectedUsers.forEach(user => activeGame.addUser(user));
		});

	io.on("connection", socket => {
		const user = new ConnectedUser(socket);

		connectedUsers.push(user);
		if (activeGame) activeGame.addUser(user);

		socket.on("disconnect", () => {
			const index = connectedUsers.indexOf(user);
			if (activeGame) activeGame.removeUser(user);
			connectedUsers.splice(index, 1);
			user.onDisconnect();
		});
	});
};
