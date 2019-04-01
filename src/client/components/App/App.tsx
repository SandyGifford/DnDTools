import * as React from "react";
import * as Immutable from "immutable";
import TimerData, { ImmutableTimerData } from "@typings/timer";
import TimerPanel, { SetTimerData } from "@components/TimerPanel/TimerPanel";
import TimerUtils from "@utils/TimerUtils";

export interface AppProps { }
export interface AppState {
	timerData: ImmutableTimerData;
}

export default class App extends React.PureComponent<AppProps, AppState> {
	// Recording in seconds to reduce udpates
	private msSinceLastSecond = 0;
	private lastTime = 0;

	constructor(props: AppProps) {
		super(props);

		const timerData: TimerData = {
			seconds: 0,
			running: false,
			increment: 30,
			multiplier: 1,
		}

		this.state = {
			timerData: Immutable.fromJS(timerData)
		};
	}

	public componentDidUpdate() {
		if (this.timerRunning()) requestAnimationFrame(this.timerFrame);
	}

	public render(): React.ReactNode {
		const { timerData } = this.state;

		return (
			<div className="App">
				<TimerPanel
					timerData={timerData}
					setTimerData={this.setTimerData} />
			</div>
		);
	}

	private setTimerData: SetTimerData = (timerData) => {
		this.setState({ timerData });
	};

	private timerFrame: FrameRequestCallback = (time) => {
		const { timerData } = this.state;
		const dt = time - this.lastTime;
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
}
