import Immutalizer from "@typings/immutalizer";
import { ImmutableGame } from "./game";

export type TimerUnit = "years" | "days" | "hours" | "minutes" | "seconds";
export type TimerPeriod = "AM" | "PM";

export type SetTimerData = (timerData: ImmutableTimerData) => void;
export type SetGameData = (gameData: ImmutableGame) => void;

export type TimerBreakdown = { [unit in TimerUnit]: number };

export type Increments = { [uid: string]: TimerBreakdown };

export default interface TimerData {
	running: boolean;
	seconds: number;
	increments: Increments;
	incrementOrder: string[];
	selectedIncrementUid: string;
	multiplier: number;
	daysPerYear: number;
	hoursPerDay: number;
}

export type ImmutableTimerBreakdown = Immutalizer<TimerBreakdown>;
export type ImmutableIncrements = Immutalizer<Increments>;
export type ImmutableTimerData = Immutalizer<TimerData>;