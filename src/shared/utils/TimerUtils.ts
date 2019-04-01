import { ImmutableTimerData } from "@typings/timer";

export default class TimerUtils {
	public static addSeconds(timerData: ImmutableTimerData, seconds: number): ImmutableTimerData {
		const s = timerData.get("seconds");
		return timerData.set("seconds", s + seconds);
	}
}