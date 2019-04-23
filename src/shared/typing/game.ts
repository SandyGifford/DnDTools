import TimerData from "./timer";
import Immutalizer from "./immutalizer";

export interface Game {
	timerRunning: boolean;
	seconds: number;
	timerData: TimerData;
	timelineEvents: TimelineEvent[];
}


export interface TimelineEvent {
	uid: string;
	start: number;
	duration?: number;
}

export type TimelineEventList = Immutalizer<TimelineEvent[]>;

export type ImmutableGame = Immutalizer<Game>;
export type ImmutableTimelineEvent = Immutalizer<TimelineEvent>;
