
import * as React from "react";
import styles from "./TimerPanel.style";

import {
	WithStyles,
	withStyles,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography
} from "@material-ui/core";
import { ImmutableTimerData, SetTimerData, ImmutableTimerBreakdown } from "@typings/timer";
import IncrementSetters from "@components/IncrementSetters/IncrementSetters";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImmPureComponent from "@components/ImmPureComponent";
import SetTime, { SetTimerHandler } from "@components/SetTime/SetTime";

export interface TimerPanelProps extends WithStyles<typeof styles> {
	timerRunning: boolean;
	setTime: SetTimerHandler;
	timeBreakdown: ImmutableTimerBreakdown;
	timerData: ImmutableTimerData;
	setTimerData: SetTimerData;

}
export interface TimerPanelState { }

class TimerPanel extends ImmPureComponent<TimerPanelProps, TimerPanelState> {
	constructor(props: TimerPanelProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { timerData, classes, setTimerData, timeBreakdown, setTime, timerRunning } = this.props;

		return (
			<div className={classes.root}>
				<ExpansionPanel CollapseProps={{ unmountOnExit: true }}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h5">skip increments</Typography></ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<IncrementSetters
							timerData={timerData}
							setTimerData={setTimerData} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel CollapseProps={{ unmountOnExit: true }}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h5">set time</Typography></ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<SetTime
							timerRunning={timerRunning}
							timeBreakdown={timeBreakdown}
							setTime={setTime} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
	}
}

export default withStyles(styles)(TimerPanel);
