import * as Immutable from "immutable";
import { ImmutableTimerData, TimerBreakdown, TimerUnit, ImmutableTimerBreakdown } from "@typings/timer";
import UidUtils from "./UidUtils";
import { ImmutalizerObject } from "@typings/immutalizer";
import { ImmutableGame } from "@typings/game";

export type ForEachTimerUnitCallback = (unit: TimerUnit) => void;
export type MapTimerUnitsCallback<R> = (unit: TimerUnit) => R;
export type ReduceTimerUnitsCallback<R> = (accumulated: R, unit: TimerUnit) => R;
export type TimerUnitMap<T> = { [unit in TimerUnit]: T };
export type ImmutableTimerUnitMap<T> = ImmutalizerObject<{ [unit in TimerUnit]: T }>;

export default class TimerUtils {
	private static readonly SECONDS_PER_MINUTE = 60;
	private static readonly MINUTES_PER_HOUR = 60;
	private static readonly SECONDS_PER_HOUR = TimerUtils.SECONDS_PER_MINUTE * TimerUtils.MINUTES_PER_HOUR;
	private static readonly UNITS: TimerUnit[] = ["years", "days", "hours", "minutes", "seconds"];

	// TODO: this should probs be in a diff file
	public static addSeconds(gameData: ImmutableGame, seconds: number): ImmutableGame {
		const s = gameData.get("seconds");
		return gameData.set("seconds", s + seconds);
	}

	public static breakdownTimer(timerData: ImmutableTimerData, seconds: number): ImmutableTimerBreakdown {
		const daysPerYear = timerData.get("daysPerYear");
		const hoursPerDay = timerData.get("hoursPerDay");
		const secondsPerDay = this.SECONDS_PER_HOUR * hoursPerDay;
		const secondsPerYear = secondsPerDay * daysPerYear;

		const years = seconds / secondsPerYear;
		const wholeYears = Math.floor(years);
		seconds -= wholeYears * secondsPerYear;

		const days = seconds / secondsPerDay;
		const wholeDays = Math.floor(days);
		seconds -= wholeDays * secondsPerDay;

		const hours = seconds / this.SECONDS_PER_HOUR;
		const wholeHours = Math.floor(hours);
		seconds -= wholeHours * this.SECONDS_PER_HOUR;

		const minutes = seconds / this.SECONDS_PER_MINUTE;
		const wholeMinutes = Math.floor(minutes);
		seconds -= wholeMinutes * this.SECONDS_PER_MINUTE;

		return Immutable.fromJS({
			years: wholeYears,
			days: wholeDays,
			hours: wholeHours,
			minutes: wholeMinutes,
			seconds: seconds,
		});
	}

	public static debreak(timerData: ImmutableTimerData, breakdown: ImmutableTimerBreakdown): number {
		const years = breakdown.get("years");
		const days = breakdown.get("days");
		const hours = breakdown.get("hours");
		const minutes = breakdown.get("minutes");
		const seconds = breakdown.get("seconds");

		const daysPerYear = timerData.get("daysPerYear");
		const hoursPerDay = timerData.get("hoursPerDay");
		const secondsPerDay = this.SECONDS_PER_HOUR * hoursPerDay;
		const secondsPerYear = secondsPerDay * daysPerYear;

		return (
			(years || 0) * secondsPerYear +
			(days || 0) * secondsPerDay +
			(hours || 0) * this.SECONDS_PER_HOUR +
			(minutes || 0) * this.SECONDS_PER_MINUTE +
			(seconds || 0)
		);
	}

	public static completeBreakdown(breakdown: Partial<TimerBreakdown>): TimerBreakdown {
		return {
			years: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			...breakdown,
		};
	}

	public static addTime(gameData: ImmutableGame, time: ImmutableTimerBreakdown): ImmutableGame {
		const timerData = gameData.get("timerData");
		const additionalSeconds = this.debreak(timerData, time);
		return this.addSeconds(gameData, additionalSeconds);
	}

	public static addIncrement(timerData: ImmutableTimerData, increment: Partial<TimerBreakdown>): ImmutableTimerData {
		const uid = UidUtils.generate();

		let increments = timerData.get("increments");
		let incrementOrder = timerData.get("incrementOrder");

		increments = increments.set(uid, Immutable.fromJS(this.completeBreakdown(increment)));
		incrementOrder = incrementOrder.push(uid);

		return timerData = timerData
			.set("increments", increments)
			.set("incrementOrder", incrementOrder);
	}

	public static removeIncrement(timerData: ImmutableTimerData, uid: string): ImmutableTimerData {
		let increments = timerData.get("increments");
		let incrementOrder = timerData.get("incrementOrder");

		increments = increments.delete(uid);
		incrementOrder = incrementOrder.delete(incrementOrder.indexOf(uid));

		return timerData
			.set("increments", increments)
			.set("incrementOrder", incrementOrder);
	}

	public static forEachUnit(act: ForEachTimerUnitCallback): void {
		this.UNITS.forEach(unit => act(unit));
	}

	public static mapUnits<T>(act: MapTimerUnitsCallback<T>): T[] {
		return this.UNITS.map(unit => act(unit));
	}

	public static objectMapUnits<T>(act: MapTimerUnitsCallback<T>): TimerUnitMap<T> {
		return this.reduceUnits((obj, unit) => {
			obj[unit] = act(unit);
			return obj;
		}, {} as TimerUnitMap<T>);
	}

	public static immutableObjectMapUnits<T>(act: MapTimerUnitsCallback<T>): ImmutableTimerUnitMap<T> {
		return this.reduceUnits((obj, unit) => {
			obj.set(unit, act(unit) as any);
			return obj;
		}, Immutable.fromJS({} as TimerUnitMap<T>));
	}

	public static reduceUnits<R>(act: ReduceTimerUnitsCallback<R>, initialValue: R): R {
		return this.UNITS.reduce((accumulated, unit) => act(accumulated, unit), initialValue);
	}
}