import styles from "./ClockReadout.style";
import * as React from "react";

import { WithStyles, withStyles } from "@material-ui/core";
import { ImmutableTimerBreakdown, TimerPeriod } from "@typings/timer";
import StringUtils from "@utils/StringUtils";
import ImmPureComponent from "@components/ImmPureComponent";

export interface ClockReadoutProps extends WithStyles<typeof styles> {
	breakdown: ImmutableTimerBreakdown;
}
export interface ClockReadoutState { }

class ClockReadout extends ImmPureComponent<ClockReadoutProps, ClockReadoutState> {
	constructor(props: ClockReadoutProps) {
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode {
		const { classes, breakdown } = this.props;

		let disp = "";

		const years = breakdown.get("years");
		const days = breakdown.get("days");
		let hours = breakdown.get("hours");
		const minutes = breakdown.get("minutes");
		const seconds = breakdown.get("seconds");

		let period: TimerPeriod = "AM";

		if (hours === 12) period = "PM";
		else if (hours > 12) {
			period = "PM";
			hours -= 12;
		} else if (hours === 0) {
			hours = 12;
		}

		if (years && days) disp += `day ${days + 1} of year ${years + 1}, `;
		else if (years) disp += `year ${years + 1}, `;
		else if (days) disp += `day ${days + 1}, `;

		disp += `${StringUtils.padLeft(hours + "", 2, "0")}:${StringUtils.padLeft(minutes + "", 2, "0")}:${StringUtils.padLeft(seconds + "", 2, "0")} ${period}`;

		return (
			<div className={classes.root}>{disp}</div>
		);
	}
}

export default withStyles(styles)(ClockReadout);
