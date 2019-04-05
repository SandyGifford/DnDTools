import styles from "./IncrementSetters.style";
import * as React from "react";
import * as Immutable from "immutable";

import { WithStyles, withStyles, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { ImmutableTimerData, ImmutableTimerBreakdown } from "@typings/timer";
import { SetTimerData } from "@components/TimerPanel/TimerPanel";
import IncrementSetter, { SetIncrement } from "@components/IncrementSetter/IncrementSetter";
import TimerUtils from "@utils/TimerUtils";
import TimeReadout from "@components/TimeReadout/TimeReadout";

export interface IncrementSettersProps extends WithStyles<typeof styles> {
	timerData: ImmutableTimerData;
	setTimerData: SetTimerData;
}
export interface IncrementSettersState {
	newIncrement: ImmutableTimerBreakdown;
}

class IncrementSetters extends React.PureComponent<IncrementSettersProps, IncrementSettersState> {
	constructor(props: IncrementSettersProps) {
		super(props);

		this.state = {
			newIncrement: Immutable.fromJS(
				TimerUtils.objectMapUnits(() => 0),
			),
		};
	}

	public render(): React.ReactNode {
		const { classes, timerData, setTimerData } = this.props;
		const { newIncrement } = this.state;
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
				<div className={classes.newIncrement}>
					<div className={classes.newIncrementSetter}>
						<IncrementSetter
							increment={newIncrement}
							setIncrement={this.newIncrementChanged} />
					</div>
					<div className={classes.newIncrementAdd}>
						<IconButton
							onClick={() => {
								const newTimerData = TimerUtils.addIncrement(timerData, newIncrement.toJS());
								setTimerData(newTimerData);
							}}>
							<AddIcon fontSize="large" color="primary" />
						</IconButton>
					</div>
				</div>
			</div>
		);
	}

	private newIncrementChanged: SetIncrement = increment => {
		this.setState({
			newIncrement: increment,
		});
	};
}

export default withStyles(styles)(IncrementSetters);
