import styles from "./IncrementSetters.style";
import * as React from "react";
import * as Immutable from "immutable";

import { WithStyles, withStyles, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { ImmutableTimerData, ImmutableTimerBreakdown, SetTimerData } from "@typings/timer";
import IncrementSetter, { SetIncrement } from "@components/IncrementSetter/IncrementSetter";
import TimerUtils from "@utils/TimerUtils";
import TimeReadout from "@components/TimeReadout/TimeReadout";
import DraggableList, { RowRenderer, RowMovedHandler } from "@components/DraggableList/DraggableList";

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

		const incrementOrder = timerData.get("incrementOrder");

		return (
			<div className={classes.root}>
				{
					<DraggableList
						rowMoved={this.rowMoved}
						keys={incrementOrder}
						rowRenderer={this.renderRow} />
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

	private renderRow: RowRenderer = (uid, r, dragged, startDrag) => {
		const { classes, timerData, setTimerData } = this.props;
		const increments = timerData.get("increments");
		const increment = increments.get(uid);

		return (
			<ExpansionPanel
				CollapseProps={{ unmountOnExit: true }}
				expanded={dragged ? false : undefined}
				className={classes.row}>
				<ExpansionPanelSummary classes={{ content: classes.rowSummary }}>
					<div className={classes.dragIndicator} onMouseDown={startDrag}>
						<DragIndicatorIcon />
					</div>
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
		);
	};

	private newIncrementChanged: SetIncrement = increment => {
		this.setState({
			newIncrement: increment,
		});
	};

	private rowMoved: RowMovedHandler = (key, fromRow, toRow, newIncrementOrder) => {
		const { timerData, setTimerData } = this.props;

		setTimerData(timerData.set("incrementOrder", newIncrementOrder));
	};
}

export default withStyles(styles)(IncrementSetters);
