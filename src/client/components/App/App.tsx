import styles from "./App.style";
import * as React from "react";
import { SetTimerData, SetGameData } from "@typings/timer";
import TimerUtils from "@utils/TimerUtils";
import { WithStyles, withStyles, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import TimerPanel from "@components/TimerPanel/TimerPanel";
import ClockReadout from "@components/ClockReadout/ClockReadout";
import TimerControls from "@components/TimerControls/TimerControls";
import Loading from "@components/Loading/Loading";
import SocketEndpoints, { GameDataChangedListener } from "@client/SocketEndpoints";
import { ImmutableGame } from "@typings/game";

export interface AppProps extends WithStyles<typeof styles> { }
export interface AppState {
	gameData: ImmutableGame;
}

class App extends React.PureComponent<AppProps, AppState> {
	// Recording in seconds to reduce udpates
	private msSinceLastSecond = 0;
	private lastTime = App.getTime();

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

	private gameDataUpdated: GameDataChangedListener = gameData => {

	};

	private setTimerData: SetTimerData = timerData => {
		this.setGameData(this.state.gameData.set("timerData", timerData));
	};

	private setGameData: SetGameData = gameData => {
		this.setState({ gameData });
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
