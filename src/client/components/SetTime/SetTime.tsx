import styles from "./SetTime.style";
import * as React from "react";
import ImmPureComponent from "@components/ImmPureComponent";

import { WithStyles, withStyles, Button } from "@material-ui/core";
import IncrementSetter, { SetIncrement } from "@components/IncrementSetter/IncrementSetter";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import { ImmutableTimerBreakdown } from "@typings/timer";

export type SetTimerHandler = (breakdown: ImmutableTimerBreakdown) => void;

export interface SetTimeProps extends WithStyles<typeof styles> {
	timerRunning: boolean;
	setTime: SetTimerHandler;
	timeBreakdown: ImmutableTimerBreakdown;
}
export interface SetTimeState {
	displayTime: ImmutableTimerBreakdown;
}

class SetTime extends ImmPureComponent<SetTimeProps, SetTimeState> {
	constructor(props: SetTimeProps) {
		super(props);

		this.state = {
			displayTime: props.timeBreakdown,
		};
	}

	public static getDerivedStateFromProps(props: SetTimeProps, state: SetTimeState): SetTimeState {
		const { timerRunning, timeBreakdown } = props;

		if (timerRunning) {
			return {
				...state,
				displayTime: timeBreakdown,
			}
		}

		return state;
	}

	public render(): React.ReactNode {
		const { classes, timerRunning } = this.props;
		const { displayTime } = this.state;

		return (
			<div className={classes.root}>
				<IncrementSetter
					classes={{
						root: classes.setter
					}}
					disabled={timerRunning}
					increment={displayTime}
					setIncrement={this.timeChanged} />
				<Button
					color="primary"
					variant="contained"
					onClick={this.buttonClicked}
					disabled={timerRunning}
					className={classes.button}>
					<AlarmOnIcon />
				</Button>
			</div>
		);
	}

	private timeChanged: SetIncrement = breakdown => {
		this.setState({
			displayTime: breakdown,
		});
	};

	private buttonClicked = () => {
		this.props.setTime(this.state.displayTime);
	};
}

export default withStyles(styles)(SetTime);
