import styles from "./Timeline.style";
import * as React from "react";

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
	start: number;
	duration: number;
}
export interface TimelineState {
}

class Timeline extends ImmPureComponent<TimelineProps, TimelineState> {
	constructor(props: TimelineProps) {
		super(props);

		this.state = {
		};
	}

	public render(): React.ReactNode {
		const { classes, events, start, duration } = this.props;

		const end = start + duration;
		const rowEnds: number[] = [];

		return (
			<div className={classes.root}>
				{
					events.map(event => {
						const eventStart = event.get("start");
						const eventDuration = event.get("duration");
						const eventEnd = eventDuration + eventStart;

						if (eventEnd < start || eventStart > end) return null;

						const uid = event.get("uid");

						let rowIndex = rowEnds.findIndex(rowEnd => rowEnd < eventStart);
						if (rowIndex === -1) {
							rowEnds.push(eventEnd);
							rowIndex = rowEnds.length - 1;
						} else {
							rowEnds[rowIndex] = eventEnd;
						}

						return <Chip
							key={uid}
							className={classes.event}
							style={{
								top: 40 * rowIndex,
								width: 100 * eventDuration / duration + "%",
								left: 100 * (eventStart - start) / duration + "%",
							}}
							classes={{
								label: classes.eventLabel,
							}}
							label={uid}
							color="primary"
							avatar={<Avatar><Icon /></Avatar>} />
					})
				}
			</div>
		);
	}
}

export default withStyles(styles)(Timeline);
