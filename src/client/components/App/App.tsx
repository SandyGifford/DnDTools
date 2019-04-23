import styles from "./App.style";

import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core";
import ImmPureComponent from "@components/ImmPureComponent";
import Game from "@components/Game/Game";


export interface AppProps extends WithStyles<typeof styles> { }
export interface AppState { }

class App extends ImmPureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			gameData: null,
			tabIndex: 0,
		};
	}

	public render(): React.ReactNode {
		return (
			<Game />
		);
	}
}

export default withStyles(styles)(App);
