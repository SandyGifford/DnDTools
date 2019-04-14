import styles from "./App.style";
import * as React from "react";
import * as Immutable from "immutable";
import { SetTimerData } from "@typings/timer";
import TimerUtils from "@utils/TimerUtils";
import { WithStyles, withStyles, CssBaseline, AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";
import TimerPanel from "@components/TimerPanel/TimerPanel";
import ClockReadout from "@components/ClockReadout/ClockReadout";
import TimerControls, { SetTimerRunningHandler, SkipIncrementHandler } from "@components/TimerControls/TimerControls";
import Loading from "@components/Loading/Loading";
import SocketEndpoints, { GameDataChangedListener } from "@client/SocketEndpoints";
import { ImmutableGame } from "@typings/game";
import ImmPureComponent from "@components/ImmPureComponent";
import Swipable from "react-swipeable-views";
import Timeline from "@components/Timeline/Timeline";


export interface AppProps extends WithStyles<typeof styles> { }
export interface AppState {
	gameData: ImmutableGame;
	tabIndex: number;
}

type AppTabs = "Timeline" | "Timer Options";

class App extends ImmPureComponent<AppProps, AppState> {
	private tabRenderers: { [tabName in AppTabs]: (key: string) => React.ReactNode };
	private readonly tabs: AppTabs[] = ["Timeline", "Timer Options"];

	constructor(props: AppProps) {
		super(props);

		this.tabRenderers = {
			"Timeline": this.renderTimeline,
			"Timer Options": this.renderTimerPanel,
		};

		this.state = {
			gameData: null,
			tabIndex: 0,
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
		const { gameData, tabIndex } = this.state;

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
					<Tabs value={tabIndex} variant="fullWidth">
						{
							this.tabs.map((tab, index) => <Tab key={index} value={index} onClick={() => {
								this.setState({ tabIndex: index })
							}} label={tab} />)
						}
					</Tabs>
					<Swipable index={tabIndex}>
						{
							this.tabs.map((tab, index) => this.tabRenderers[tab](index + ""))
						}
					</Swipable>
				</div>
			</div>
		);
	}

	private renderTimerPanel = (key: string) => {
		const { gameData } = this.state;
		const timerData = gameData.get("timerData");

		return <TimerPanel
			key={key}
			timerData={timerData}
			setTimerData={this.setTimerData} />
	}

	private renderTimeline = (key: string) => {
		const seconds = this.state.gameData.get("seconds");

		return <Timeline
			key={key}
			events={Immutable.fromJS([
				{ uid: "All Before", start: 10, duration: 20 },
				{ uid: "Start Before", start: 40, duration: 20 },
				{ uid: "Encompassing", start: 40, duration: 120 },
				{ uid: "Internal", start: 60, duration: 80 },
				{ uid: "Match", start: 50, duration: 100 },
				{ uid: "End After", start: 140, duration: 20 },
				{ uid: "All After", start: 170, duration: 20 },
			])}
			time={seconds}
			span={100}
			offset={-10} />
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
