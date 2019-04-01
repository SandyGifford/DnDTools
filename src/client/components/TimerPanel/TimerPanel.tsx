import * as React from "react";
import { ImmutableTimerData } from "@typings/timer";

export type SetTimerData = (timerData: ImmutableTimerData) => void;

export interface TimerPanelProps {
	timerData: ImmutableTimerData;
	setTimerData: SetTimerData;

}
export interface TimerPanelState { }

export default class TimerPanel extends React.PureComponent<TimerPanelProps, TimerPanelState> {
	constructor(props: TimerPanelProps) {
		super(props);
		this.state = {};
	}

	public componentDidMount() {
		this.setRunning(true);
		document.addEventListener("click", this.toggleTimer);
	}

	public render(): React.ReactNode {
		return (
			<div className="TimerPanel">{this.props.timerData.get("seconds")}</div>
		)
	}

	private toggleTimer = () => {
		this.setRunning(!this.props.timerData.get("running"));
	};

	private setRunning = (running: boolean) => {
		this.props.setTimerData(this.props.timerData.set("running", running));
	};
}
