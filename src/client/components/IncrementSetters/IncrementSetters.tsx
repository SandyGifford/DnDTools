import styles from "./IncrementSetters.style";
import * as React from "react";

import { WithStyles, withStyles, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import CloseIcon from "@material-ui/icons/Close";
import { ImmutableTimerData } from "@typings/timer";
import { SetTimerData } from "@components/TimerPanel/TimerPanel";
import IncrementSetter from "@components/IncrementSetter/IncrementSetter";
import TimerUtils from "@utils/TimerUtils";
import TimeReadout from "@components/TimeReadout/TimeReadout";

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
						return <ExpansionPanel key={uid} className={classes.row}>
							<ExpansionPanelSummary classes={{ content: classes.rowSummary }}>
								<DragIndicatorIcon />
								<div className={classes.timerReadout}>
									<Typography variant="h6"><TimeReadout breakdown={increment} /></Typography>
								</div>
								<div className={classes.closeButton}>
									<IconButton onClick={() => {
										const newTimerData = TimerUtils.removeIncrement(timerData, uid);
										setTimerData(newTimerData);
									}}>
										<CloseIcon fontSize="small" color="error" />
									</IconButton>
								</div>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails className={classes.rowDetails}>
								<IncrementSetter
									increment={increment}
									setIncrement={newIncrement => {
										const newIncrements = increments.set(uid, newIncrement);
										setTimerData(timerData.set("increments", newIncrements))
									}} />
							</ExpansionPanelDetails>
						</ExpansionPanel>
					})
				}
			</div>
		);
	}
}

export default withStyles(styles)(IncrementSetters);
