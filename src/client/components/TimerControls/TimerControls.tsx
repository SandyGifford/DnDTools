import styles from "./TimerControls.style";
import * as React from "react";

import { WithStyles, withStyles, Button, Menu, MenuItem } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { ImmutableTimerData, SetTimerData } from "@typings/timer";
import TimeReadout from "@components/TimeReadout/TimeReadout";
import TimerUtils from "@utils/TimerUtils";

export interface TimerControlsProps extends WithStyles<typeof styles> {
	timerData: ImmutableTimerData;
	setTimerData: SetTimerData;
}
export interface TimerControlsState {
	dropdownAnchor: HTMLElement;
}

class TimerControls extends React.PureComponent<TimerControlsProps, TimerControlsState> {
	constructor(props: TimerControlsProps) {
		super(props);

		this.state = {
			dropdownAnchor: null,
		};
	}

	public render(): React.ReactNode {
		const { classes, timerData } = this.props;
		const { dropdownAnchor } = this.state;

		const running = timerData.get("running");
		const increments = timerData.get("increments");
		const incrementOrder = timerData.get("incrementOrder");
		const selectedIncrementUid = timerData.get("selectedIncrementUid");
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
						running ?
							<PauseIcon /> :
							<PlayArrowIcon />
					}
				</Button>
				<Button
					disabled={running || !hasIncrements}
					className={classes.button}
					onClick={this.addIncrement}
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
		let { timerData, setTimerData } = this.props;

		timerData = timerData.set("selectedIncrementUid", uid);

		setTimerData(timerData);
	}

	private addIncrement = () => {
		let { timerData, setTimerData } = this.props;

		const increments = timerData.get("increments");
		const selectedIncrementUid = timerData.get("selectedIncrementUid");
		const currentIncrement = increments.get(selectedIncrementUid);

		timerData = TimerUtils.addTimeToTimer(timerData, currentIncrement);

		setTimerData(timerData);
	};

	private openDrop: React.MouseEventHandler<HTMLElement> = e => {
		this.setState({ dropdownAnchor: e.currentTarget });
	};

	private closeDrop = () => {
		this.setState({ dropdownAnchor: null });
	};

	private togglePlaying = () => {
		let { timerData, setTimerData } = this.props;

		const running = timerData.get("running");
		timerData = timerData.set("running", !running);

		setTimerData(timerData);
	};
}

export default withStyles(styles)(TimerControls);
