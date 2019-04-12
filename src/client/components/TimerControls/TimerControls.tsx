import styles from "./TimerControls.style";
import * as React from "react";

import { WithStyles, withStyles, Button, Menu, MenuItem } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { ImmutableTimerData } from "@typings/timer";
import TimeReadout from "@components/TimeReadout/TimeReadout";
import TimerUtils from "@utils/TimerUtils";
import ImmPureComponent from "@components/ImmPureComponent";

export type SetTimerRunningHandler = (timerRunning: boolean) => void;
export type SkipIncrementHandler = (seconds: number) => void;
export type SetSelectedIncrementHandler = (uid: string) => void;

export interface TimerControlsProps extends WithStyles<typeof styles> {
	timerData: ImmutableTimerData;
	timerRunning: boolean;
	setTimerRunning: SetTimerRunningHandler;
	skipIncrement: SkipIncrementHandler;
}
export interface TimerControlsState {
	selectedIncrementUid: string;
	dropdownAnchor: HTMLElement;
}

class TimerControls extends ImmPureComponent<TimerControlsProps, TimerControlsState> {
	constructor(props: TimerControlsProps) {
		super(props);

		this.state = {
			dropdownAnchor: null,
			selectedIncrementUid: props.timerData.get("incrementOrder").first(),
		};
	}

	public render(): React.ReactNode {
		const { classes, timerData, timerRunning } = this.props;
		const { dropdownAnchor, selectedIncrementUid } = this.state;

		const increments = timerData.get("increments");
		const incrementOrder = timerData.get("incrementOrder");
		const currentIncrement = increments.get(selectedIncrementUid);

		const hasIncrements = !!incrementOrder.size;

		return (
			<div className={classes.root}>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={this.togglePlaying}>
					{
						timerRunning ?
							<PauseIcon /> :
							<PlayArrowIcon />
					}
				</Button>
				<Button
					disabled={timerRunning || !hasIncrements}
					className={classes.button}
					onClick={this.skipIncrement}
					variant="contained">
					<SkipNextIcon />
				</Button>
				<Button
					className={`${classes.button}
					${classes.dropdown}`}
					disabled={!hasIncrements}
					onClick={this.openDrop}
					variant="contained">
					{
						hasIncrements ?
							<TimeReadout breakdown={currentIncrement} /> :
							"--"
					}
					<ArrowDropDownIcon />
				</Button>
				<Menu
					anchorEl={dropdownAnchor}
					open={!!dropdownAnchor}
					onClose={this.closeDrop}
				>
					{
						incrementOrder.map(uid => <MenuItem key={uid} onClick={() => this.dropDownItemSelected(uid)}>
							<TimeReadout breakdown={increments.get(uid)} />
						</MenuItem>)
					}

				</Menu>
			</div>
		);
	}

	private dropDownItemSelected(uid: string): void {
		this.setIncrement(uid);
		this.closeDrop();
	}

	private setIncrement(uid: string): void {
		this.setState({
			selectedIncrementUid: uid,
		});
	}

	private skipIncrement = () => {
		let { timerData, skipIncrement } = this.props;
		let { selectedIncrementUid } = this.state;

		const increments = timerData.get("increments");
		const currentIncrement = increments.get(selectedIncrementUid);
		const seconds = TimerUtils.debreak(timerData, currentIncrement);

		skipIncrement(seconds);
	};

	private openDrop: React.MouseEventHandler<HTMLElement> = e => {
		this.setState({ dropdownAnchor: e.currentTarget });
	};

	private closeDrop = () => {
		this.setState({ dropdownAnchor: null });
	};

	private togglePlaying = () => {
		let { setTimerRunning, timerRunning } = this.props;

		setTimerRunning(!timerRunning);
	};
}

export default withStyles(styles)(TimerControls);
