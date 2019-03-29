import * as React from "react";

export interface AppProps { }
export interface AppState { }

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div />
		);
	}
}
