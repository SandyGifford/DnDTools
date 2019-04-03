import styles from "./IncrementSetters.style";
import * as React from "react";

import { WithStyles, withStyles, IconButton } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import CloseIcon from "@material-ui/icons/Close";
import { ImmutableTimerData } from "@typings/timer";
import { SetTimerData } from "@components/TimerPanel/TimerPanel";
import IncrementSetter from "@components/IncrementSetter/IncrementSetter";

export interface IncrementSettersProps extends WithStyles<typeof styles> {
	timerData: ImmutableTimerData;
	setTimerData: SetTimerData;
}
export interface IncrementSettersState { }

class IncrementSetters extends React.PureComponent<IncrementSettersProps, IncrementSettersState> {
	constructor(props: IncrementSettersProps) {
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode {
		const { classes, timerData, setTimerData } = this.props;
		const increments = timerData.get("increments");
		const incrementOrder = timerData.get("incrementOrder");

		return (
			<div className={classes.root}>
				{
					incrementOrder.toArray().map(uid => {
						const increment = increments.get(uid);
						return <div key={uid} className={classes.row}>
							<DragIndicatorIcon className={classes.rowIcon} />
							<div className={classes.setter}>
								<IncrementSetter
									increment={increment}
									setIncrement={newIncrement => {
										const newIncrements = increments.set(uid, newIncrement);
										setTimerData(timerData.set("increments", newIncrements))
									}} />
							</div>
							<IconButton>
								<CloseIcon fontSize="small" color="error" />
							</IconButton>
						</div>
					})
				}
			</div>
		);
	}
}

export default withStyles(styles)(IncrementSetters);
