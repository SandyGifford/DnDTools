import TimerData from "./timer";
import Immutalizer from "./immutalizer";

export interface Game {
	timerRunning: boolean;
	seconds: number;
	timerData: TimerData;
}

export type ImmutableGame = Immutalizer<Game>;
