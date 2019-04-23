import styles from "./Game.style";
import * as React from "react";
import * as Immutable from "immutable";
import ImmPureComponent from "@components/ImmPureComponent";

import { WithStyles, withStyles, CssBaseline, AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";
import { ImmutableGame } from "@typings/game";
import Loading from "@components/Loading/Loading";
import TimerUtils from "@utils/TimerUtils";
import ClockReadout from "@components/ClockReadout/ClockReadout";
import TimerControls, { SetTimerRunningHandler, SkipIncrementHandler } from "@components/TimerControls/TimerControls";
import Swipable from "react-swipeable-views";
import Timeline from "@components/Timeline/Timeline";
import TimerPanel from "@components/TimerPanel/TimerPanel";
import SocketEndpoints, { GameDataChangedListener } from "@client/SocketEndpoints";
import { SetTimerHandler } from "@components/SetTime/SetTime";
import { SetTimerData } from "@typings/timer";

export interface GameProps extends WithStyles<typeof styles> {
}

export interface GameState {
	tabIndex: number;
	gameData: ImmutableGame;
}

class Game extends ImmPureComponent<GameProps, GameState> {
	constructor(props: GameProps) {
		super(props);

		this.state = {
			tabIndex: 0,
			gameData: null,
		};
	}

	public componentDidMount() {
		SocketEndpoints.addDataChangedListener(this.gameDataChanged);
	}

	public componentWillUnmount() {
		SocketEndpoints.addDataChangedListener(this.gameDataChanged);
	}

	public render(): React.ReactNode {
		const { classes } = this.props;
		const { tabIndex, gameData } = this.state;

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
						<Tab
							onClick={() => this.setState({ tabIndex: 0 })}
							label="Timeline" />
						<Tab
							onClick={() => this.setState({ tabIndex: 1 })}
							label="Timer Options" />
					</Tabs>
					<Swipable index={tabIndex} className={classes.swipable}>
						<Timeline
							key="timeline"
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
						<TimerPanel
							timerRunning={timerRunning}
							key="timeroptions"
							timerData={timerData}
							setTimerData={this.setTimerData}
							timeBreakdown={timeBreakdown}
							setTime={this.setTime} />
					</Swipable>
				</div>
			</div>
		);
	}

	private gameDataChanged: GameDataChangedListener = gameData => {
		this.setState({
			gameData,
		});
	};

	private setTimerData: SetTimerData = timerData => {
		SocketEndpoints.setTimerData(timerData);
	};

	private setTime: SetTimerHandler = breakdown => {
		SocketEndpoints.setSeconds(TimerUtils.debreak(this.state.gameData.get("timerData"), breakdown));
	};

	private setTimerRunning: SetTimerRunningHandler = timerRunning => {
		SocketEndpoints.setTimerRunning(timerRunning);
	};

	private skipIncrement: SkipIncrementHandler = seconds => {
		this.setSeconds(this.state.gameData.get("seconds") + seconds);
	};

	private setSeconds = (seconds: number) => {
		SocketEndpoints.setSeconds(seconds);
	};
}

export default withStyles(styles)(Game);
