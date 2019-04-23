import { Game } from "@typings/game";

const defaultGame: Game = {
	seconds: 0,
	timerRunning: false,
	timerData: {
		increments: {},
		incrementOrder: [],
		multiplier: 1,
		daysPerYear: 365,
		hoursPerDay: 24,
	},
};

export default defaultGame;
