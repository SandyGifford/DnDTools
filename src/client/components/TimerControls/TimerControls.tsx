import styles from "./TimerControls.style";
import * as React from "react";

import { WithStyles, withStyles } from "@material-ui/core";
import { ImmutableTimerData, SetTimerData } from "@typings/timer";

export interface TimerControlsProps extends WithStyles<typeof styles> {
	timerData: ImmutableTimerData;
	setTimerData: SetTimerData;
}
export interface TimerControlsState { }

class TimerControls extends React.PureComponent<TimerControlsProps, TimerControlsState> {
	constructor(props: TimerControlsProps) {
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode {
		const { classes } = this.props;

		return (
			<div className={classes.root}></div>
		);
	}
}

export default withStyles(styles)(TimerControls);
