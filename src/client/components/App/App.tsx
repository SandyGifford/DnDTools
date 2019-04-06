import styles from "./App.style";
import * as React from "react";
import * as Immutable from "immutable";
import TimerData, { ImmutableTimerData, SetTimerData } from "@typings/timer";
import TimerUtils from "@utils/TimerUtils";
import { WithStyles, withStyles, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import TimerPanel from "@components/TimerPanel/TimerPanel";
import ClockReadout from "@components/ClockReadout/ClockReadout";
import TimerControls from "@components/TimerControls/TimerControls";

export interface AppProps extends WithStyles<typeof styles> { }
export interface AppState {
	timerData: ImmutableTimerData;
}

class App extends React.PureComponent<AppProps, AppState> {
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
		immutableTimerData = immutableTimerData.set("selectedIncrementUid", immutableTimerData.get("incrementOrder").first());

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
		const { classes } = this.props;
		const { timerData } = this.state;

		const timeBreakdown = TimerUtils.breakdownTimer(timerData);

		return (
			<div className={classes.root}>
				<CssBaseline />
				<div className={classes.bar}>
					<AppBar position="fixed" color="default">
						<Toolbar>
							<ClockReadout breakdown={timeBreakdown} />
							<div className={classes.playControls}>
								<TimerControls
									timerData={timerData}
									setTimerData={this.setTimerData} />
							</div>
						</Toolbar>
					</AppBar>
				</div>
				<div className={classes.content}>
					<TimerPanel
						timerData={timerData}
						setTimerData={this.setTimerData} />
				</div>
			</div>
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

export default withStyles(styles)(App);
