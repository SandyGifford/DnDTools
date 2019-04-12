import styles from "./App.style";
import * as React from "react";
import { SetTimerData } from "@typings/timer";
import TimerUtils from "@utils/TimerUtils";
import { WithStyles, withStyles, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import TimerPanel from "@components/TimerPanel/TimerPanel";
import ClockReadout from "@components/ClockReadout/ClockReadout";
import TimerControls, { SetTimerRunningHandler, SkipIncrementHandler } from "@components/TimerControls/TimerControls";
import Loading from "@components/Loading/Loading";
import SocketEndpoints, { GameDataChangedListener } from "@client/SocketEndpoints";
import { ImmutableGame } from "@typings/game";
import ImmPureComponent from "@components/ImmPureComponent";

export interface AppProps extends WithStyles<typeof styles> { }
export interface AppState {
	gameData: ImmutableGame;
}

class App extends ImmPureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			gameData: null,
		};
	}

	public componentDidMount() {
		SocketEndpoints.addDataChangedListener(this.gameDataUpdated)
	}

	public componentWillUnmount() {
		SocketEndpoints.removeDataChangedListener(this.gameDataUpdated)
	}

	public componentDidUpdate(prevProps: AppProps, prevState: AppState) {
		const { gameData } = this.state;

		if (!gameData) return;
	}

	public render(): React.ReactNode {
		const { classes } = this.props;
		const { gameData } = this.state;

		if (!gameData) {
			return <Loading />;
		}

		const timerData = gameData.get("timerData");
		const timerRunning = gameData.get("timerRunning");
		const seconds = gameData.get("seconds");
		const timeBreakdown = TimerUtils.breakdownTimer(timerData, seconds);

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
									timerRunning={timerRunning}
									setTimerRunning={this.setTimerRunning}
									skipIncrement={this.skipIncrement} />
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

	private setTimerRunning: SetTimerRunningHandler = timerRunning => {
		SocketEndpoints.setTimerRunning(timerRunning);
	};

	private skipIncrement: SkipIncrementHandler = seconds => {
		this.setSeconds(this.state.gameData.get("seconds") + seconds);
	};

	private setSeconds = (seconds: number) => {
		SocketEndpoints.setSeconds(seconds);
	};

	private gameDataUpdated: GameDataChangedListener = gameData => {
		this.setState({ gameData });
	};

	private setTimerData: SetTimerData = timerData => {
		SocketEndpoints.setTimerData(timerData);
	};
}

export default withStyles(styles)(App);
