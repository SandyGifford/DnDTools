import styles from "./Timeline.style";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { WithStyles, withStyles, Chip, Avatar } from "@material-ui/core";
import Immutalizer from "@typings/immutalizer";
import ImmPureComponent from "@components/ImmPureComponent";
import Icon from "@material-ui/icons/PhonelinkLock"

export interface TimelineEvent {
	uid: string;
	start: number;
	duration?: number;
}

export type TimelineEventList = Immutalizer<TimelineEvent[]>;
export type ImmutableTimelineEvent = Immutalizer<TimelineEvent>;

export interface TimelineProps extends WithStyles<typeof styles> {
	events: TimelineEventList;
	time: number;
	span: number;
	offset?: number;
}
export interface TimelineState {
}

class Timeline extends ImmPureComponent<TimelineProps, TimelineState> {
	private static readonly ROW_HEIGHT = 40;
	private rowEnds: number[];

	constructor(props: TimelineProps) {
		super(props);

		this.state = {};
	}

	public componentDidMount() {
		this.adjustHeight();
	}

	public componentDidUpdate() {
		this.adjustHeight();
	}

	public render(): React.ReactNode {
		const { classes, events, time, span, offset } = this.props;

		const offsetTime = time - offset;
		const end = offsetTime + span / 2;
		const start = offsetTime - span / 2;
		this.rowEnds = [];

		return (
			<div className={classes.root}>
				{
					events.map(event => {
						const eventStart = event.get("start");
						const eventDuration = event.get("duration");
						const eventEnd = eventDuration + eventStart;

						if (eventEnd < start || eventStart > end) return null;

						const uid = event.get("uid");

						let rowIndex = this.rowEnds.findIndex(rowEnd => rowEnd < eventStart);
						if (rowIndex === -1) {
							this.rowEnds.push(eventEnd);
							rowIndex = this.rowEnds.length - 1;
						} else {
							this.rowEnds[rowIndex] = eventEnd;
						}

						return <Chip
							key={uid}
							className={classes.event}
							style={{
								top: Timeline.ROW_HEIGHT * rowIndex,
								width: 100 * eventDuration / span + "%",
								left: 100 * (eventStart - start) / span + "%",
							}}
							classes={{
								label: classes.eventLabel,
							}}
							label={uid}
							color="primary"
							avatar={<Avatar><Icon /></Avatar>} />
					})
				}
				<div className={classes.cursor} style={{ left: 100 * (0.5 + offset / span) + "%" }} />
			</div>
		);
	}

	private adjustHeight(): void {
		const el = ReactDOM.findDOMNode(this) as HTMLElement;
		el.style.height = Timeline.ROW_HEIGHT * this.rowEnds.length + "px";
	}
}

export default withStyles(styles)(Timeline);
