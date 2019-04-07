import styles from "./Loading.style";
import * as React from "react";

import { WithStyles, withStyles, Grow, CircularProgress } from "@material-ui/core";

export interface LoadingProps extends WithStyles<typeof styles> {
	readyToUnmount?: () => void;
}
export interface LoadingState {
	visible: boolean;
}

class Loading extends React.PureComponent<LoadingProps, LoadingState> {
	constructor(props: LoadingProps) {
		super(props);

		this.state = {
			visible: false,
		};
	}

	public componentDidMount() {
		setTimeout(() => {
			this.setState({
				visible: true,
			});
		}, 500);
	}

	public render(): React.ReactNode {
		const { classes, readyToUnmount } = this.props;
		const { visible } = this.state;

		return (
			<Grow
				timeout={1000}
				in={visible}
				onExited={readyToUnmount}>
				<div className={classes.root}>
					<div className={classes.center}>
						<CircularProgress size={100} />
					</div>
				</div>
			</Grow>
		);
	}
}

export default withStyles(styles)(Loading);
