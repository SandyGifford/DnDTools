import styles from "./TimeReadout.style";
import * as React from "react";

import { WithStyles, withStyles } from "@material-ui/core";

export interface TimeReadoutProps extends WithStyles<typeof styles> { }
export interface TimeReadoutState { }

class TimeReadout extends React.PureComponent<TimeReadoutProps, TimeReadoutState> {
	constructor(props: TimeReadoutProps) {
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

export default withStyles(styles)(TimeReadout);
