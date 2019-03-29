import { Server } from "http";

import ConnectedUser from "./ConnectedUser";

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);

	io.on("connection", socket => {
		new ConnectedUser(socket);
	});
};
