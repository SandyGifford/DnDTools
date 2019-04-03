import * as Immutable from "immutable";
import { ImmutableTimerData, TimerBreakdown } from "@typings/timer";
import UidUtils from "./UidUtils";

export default class TimerUtils {
	private static readonly SECONDS_PER_MINUTE = 60;
	private static readonly MINUTES_PER_HOUR = 60;
	private static readonly SECONDS_PER_HOUR = TimerUtils.SECONDS_PER_MINUTE * TimerUtils.MINUTES_PER_HOUR;

	public static addSeconds(timerData: ImmutableTimerData, seconds: number): ImmutableTimerData {
		const s = timerData.get("seconds");
		return timerData.set("seconds", s + seconds);
	}

	public static breakdownTimer(timerData: ImmutableTimerData, seconds = timerData.get("seconds")): TimerBreakdown {
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

		return {
			years: wholeYears,
			days: wholeDays,
			hours: wholeHours,
			minutes: wholeMinutes,
			seconds: seconds,
		};
	}

	public static debreak(timerData: ImmutableTimerData, breakdown: Partial<TimerBreakdown>): number {
		const { years, days, hours, minutes, seconds } = breakdown;

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

	public static addIncrement(timerData: ImmutableTimerData, increment: number | Partial<TimerBreakdown>): ImmutableTimerData {
		const breakdownIncrement = typeof increment === "number" ? this.breakdownTimer(timerData, increment) : increment;
		const uid = UidUtils.generate();
		let increments = timerData.get("increments");
		let incrementOrder = timerData.get("incrementOrder");

		increments = increments.set(uid, Immutable.fromJS(this.completeBreakdown(breakdownIncrement)));
		incrementOrder = incrementOrder.push(uid);

		return timerData
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
}