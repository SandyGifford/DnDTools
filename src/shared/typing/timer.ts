import Immutalizer from "@typings/immutalizer";

export default interface TimerData {
	running: boolean;
	seconds: number;
	increment: number;
	multiplier: number;
}

export type ImmutableTimerData = Immutalizer<TimerData>;