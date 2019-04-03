import Immutalizer from "@typings/immutalizer";

export type TimerUnit = "years" | "days" | "hours" | "minutes" | "seconds";

export type TimerBreakdown = { [unit in TimerUnit]: number };

export type Increments = { [uid: string]: TimerBreakdown };

export default interface TimerData {
	running: boolean;
	seconds: number;
	increments: Increments;
	incrementOrder: string[];
	multiplier: number;
	daysPerYear: number;
	hoursPerDay: number;
}

export type ImmutableTimerBreakdown = Immutalizer<TimerBreakdown>;
export type ImmutableIncrements = Immutalizer<Increments>;
export type ImmutableTimerData = Immutalizer<TimerData>;