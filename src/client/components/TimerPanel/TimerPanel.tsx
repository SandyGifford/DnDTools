
import * as React from "react";
import styles from "./TimerPanel.style";

import { WithStyles, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core";
import { ImmutableTimerData } from "@typings/timer";
import StringUtils from "@utils/StringUtils";
import TimerUtils from "@utils/TimerUtils";
import IncrementSetters from "@components/IncrementSetters/IncrementSetters";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

export type SetTimerData = (timerData: ImmutableTimerData) => void;

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

	public componentDidMount() {
		this.setRunning(true);
		document.addEventListener("click", this.toggleTimer);
	}

	public render(): React.ReactNode {
		const { timerData, classes, setTimerData } = this.props;

		const { years, days, hours, minutes, seconds } = TimerUtils.breakdownTimer(timerData);

		return (
			<ExpansionPanel className={classes.root}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h5">skip increments</Typography></ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div>
						{years ? `${StringUtils.padLeft(years + "", 3, "0")} years` : null}
						{days ? `${StringUtils.padLeft(days + "", 3, "0")} days` : null}
						{StringUtils.padLeft(hours + "", 2, "0")}:
					{StringUtils.padLeft(minutes + "", 2, "0")}:
					{StringUtils.padLeft(seconds + "", 2, "0")}
					</div>
					<div>
						<IncrementSetters
							timerData={timerData}
							setTimerData={setTimerData} />
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		)
	}

	private toggleTimer = () => {
		this.setRunning(!this.props.timerData.get("running"));
	};

	private setRunning = (running: boolean) => {
		this.props.setTimerData(this.props.timerData.set("running", running));
	};
}

export default withStyles(styles)(TimerPanel);
