import styles from "./Loading.style";
import * as React from "react";

import { WithStyles, withStyles, CircularProgress } from "@material-ui/core";

export interface LoadingProps extends WithStyles<typeof styles> {
}
export interface LoadingState {
}

class Loading extends React.PureComponent<LoadingProps, LoadingState> {
	constructor(props: LoadingProps) {
		super(props);
	}

	public render(): React.ReactNode {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.center}>
					<CircularProgress size={100} />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Loading);
