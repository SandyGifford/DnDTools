import * as os from "os";

export default (port: number) => {
	const interfaces = os.networkInterfaces();
	const addresses = [];

	for (var k in interfaces) {
		for (var k2 in interfaces[k]) {
			var address = interfaces[k][k2];
			if (address.family === 'IPv4' && !address.internal) {
				addresses.push(address.address);
			}
		}
	}

	console.log(`server running, connect to http://${addresses[0]}:${port}`);
};