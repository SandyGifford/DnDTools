const makeWebpack = require("./makeWebpack");

module.exports = {
	...makeWebpack(
		{
			client: "./src/client/index.tsx",
		}
	),
};