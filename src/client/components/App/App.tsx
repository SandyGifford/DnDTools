import * as React from "react";
import * as Immutable from "immutable";
import TimerData, { ImmutableTimerData } from "@typings/timer";
import TimerUtils from "@utils/TimerUtils";
import { CssBaseline, Typography } from "@material-ui/core";
import TimerPanel, { SetTimerData } from "@components/TimerPanel/TimerPanel";

export interface AppProps { }
export interface AppState {
	timerData: ImmutableTimerData;
}

export default class App extends React.PureComponent<AppProps, AppState> {
	// Recording in seconds to reduce udpates
	private msSinceLastSecond = 0;
	private lastTime = App.getTime();

	constructor(props: AppProps) {
		super(props);

		const timerData: TimerData = {
			seconds: 0,
			running: false,
			increments: {},
			incrementOrder: [],
			selectedIncrementUid: null,
			multiplier: 1,
			daysPerYear: 365,
			hoursPerDay: 24,
		};

		let immutableTimerData = Immutable.fromJS(timerData);

		immutableTimerData = TimerUtils.addIncrement(immutableTimerData, { days: 1 });
		immutableTimerData = TimerUtils.addIncrement(immutableTimerData, { hours: 6 });
		immutableTimerData = TimerUtils.addIncrement(immutableTimerData, { minutes: 15 });
		immutableTimerData = TimerUtils.addIncrement(immutableTimerData, { seconds: 30 });
		immutableTimerData = immutableTimerData.set("selectedIncrementUid", timerData.incrementOrder[0]);

		this.state = {
			timerData: immutableTimerData,
		};
	}

	public componentDidUpdate(prevProps: AppProps, prevState: AppState) {
		const { timerData } = this.state;
		const { timerData: prevTimerData } = prevState;
		const running = timerData.get("running");
		const prevRunning = prevTimerData.get("running");

		if (running && !prevRunning) {
			this.lastTime = App.getTime();
			requestAnimationFrame(this.timerFrame);
		}
	}

	public render(): React.ReactNode {
		const { timerData } = this.state;

		return (
			<Typography component="div" variant="body1">
				<CssBaseline />
				<TimerPanel
					timerData={timerData}
					setTimerData={this.setTimerData} />
			</Typography>
		);
	}

	private setTimerData: SetTimerData = timerData => {
		this.setState({ timerData });
	};

	private timerFrame: FrameRequestCallback = () => {
		const { timerData } = this.state;
		const time = App.getTime();

		const dt = (time - this.lastTime) * timerData.get("multiplier", 1);
		this.lastTime = time;
		this.msSinceLastSecond += dt;

		if (this.msSinceLastSecond >= 1000) {
			const wholeSeconds = Math.floor(this.msSinceLastSecond / 1000);
			this.msSinceLastSecond = this.msSinceLastSecond % 1000;
			this.setState({
				timerData: TimerUtils.addSeconds(timerData, wholeSeconds),
			});
		}

		if (this.timerRunning()) requestAnimationFrame(this.timerFrame);
	};

	private timerRunning(): boolean {
		const { timerData } = this.state;
		return timerData.get("running");
	}

	private static getTime(): number {
		return (new Date()).getTime();
	}
}
