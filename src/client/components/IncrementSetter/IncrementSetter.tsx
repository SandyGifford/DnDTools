import styles from "./IncrementSetter.style";
import * as React from "react";

import { WithStyles, withStyles, TextField } from "@material-ui/core";
import { ImmutableTimerBreakdown, TimerUnit } from "@typings/timer";
import DomUtils from "@utils/DomUtils";

export type SetIncrement = (increment: ImmutableTimerBreakdown) => void;

export interface IncrementSetterProps extends WithStyles<typeof styles> {
	increment: ImmutableTimerBreakdown;
	setIncrement: SetIncrement;
}
export interface IncrementSetterState { }

class IncrementSetter extends React.PureComponent<IncrementSetterProps, IncrementSetterState> {
	constructor(props: IncrementSetterProps) {
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode {
		const { classes, increment } = this.props;

		const years = increment.get("years");
		const days = increment.get("days");
		const hours = increment.get("hours");
		const minutes = increment.get("minutes");
		const seconds = increment.get("seconds");

		return (
			<div className={classes.root}>
				{this.renderTextField("years", years)}
				{this.renderTextField("days", days)}
				{this.renderTextField("hours", hours)}
				{this.renderTextField("minutes", minutes)}
				{this.renderTextField("seconds", seconds)}
			</div>
		);
	}

	private renderTextField(label: TimerUnit, value: number): React.ReactNode {
		const { classes, setIncrement, increment } = this.props;

		const className = DomUtils.conditionalClasses({
			[classes.emptyField]: !value
		}, classes.field);


		return <TextField
			className={className}
			onChange={e => {
				setIncrement(increment.set(label, parseFloat(e.target.value)))
			}}
			label={label}
			type="number"
			variant="outlined"
			margin="dense"
			value={value} />
	}
}

export default withStyles(styles)(IncrementSetter);
