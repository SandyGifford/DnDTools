
import * as React from "react";
import styles from "./TimerPanel.style";

import { WithStyles, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core";
import { ImmutableTimerData, SetTimerData } from "@typings/timer";
import IncrementSetters from "@components/IncrementSetters/IncrementSetters";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

export interface TimerPanelProps extends WithStyles<typeof styles> {
	timerData: ImmutableTimerData;
	setTimerData: SetTimerData;

}
export interface TimerPanelState { }

class TimerPanel extends React.PureComponent<TimerPanelProps, TimerPanelState> {
	constructor(props: TimerPanelProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { timerData, classes, setTimerData } = this.props;

		return (
			<ExpansionPanel className={classes.root} CollapseProps={{ unmountOnExit: true }} defaultExpanded={true}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h5">skip increments</Typography></ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<IncrementSetters
						timerData={timerData}
						setTimerData={setTimerData} />
				</ExpansionPanelDetails>
			</ExpansionPanel>
		)
	}
}

export default withStyles(styles)(TimerPanel);
