import { Server } from "http";

import ActiveGame from "./ActiveGame";

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);

	new ActiveGame(io);
};
