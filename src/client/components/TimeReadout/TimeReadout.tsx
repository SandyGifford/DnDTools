import styles from "./TimeReadout.style";
import * as React from "react";

import pluralize from "pluralize";

import { WithStyles, withStyles } from "@material-ui/core";
import { ImmutableTimerBreakdown } from "@typings/timer";
import TimerUtils from "@utils/TimerUtils";

export interface TimeReadoutProps extends WithStyles<typeof styles> {
	breakdown: ImmutableTimerBreakdown;
}
export interface TimeReadoutState { }

class TimeReadout extends React.PureComponent<TimeReadoutProps, TimeReadoutState> {
	constructor(props: TimeReadoutProps) {
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode {
		const { classes, breakdown } = this.props;

		const disp = TimerUtils.reduceUnits((arr, unit) => {
			const amount = breakdown.get(unit);
			if (amount) arr.push(`${amount}\u00A0${pluralize(unit, amount)}`);
			return arr;
		}, []).join(", ");

		return (
			<div className={classes.root}>{disp}</div>
		);
	}
}

export default withStyles(styles)(TimeReadout);
