import TimerData from "./timer";
import Immutalizer from "./immutalizer";

export interface Game {
	timerData: TimerData;
}

export type ImmutableGame = Immutalizer<Game>;
