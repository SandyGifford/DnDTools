import { StyleRulesCallback } from "@material-ui/core";

export type IncrementSettersClassKeys =
	"root" |
	"row" |
	"rowSummary" |
	"rowDetails" |
	"timerReadout" |
	"closeButton" |
	"newIncrement" |
	"newIncrementSetter" |
	"newIncrementAdd";

const styles: StyleRulesCallback<IncrementSettersClassKeys> = theme => ({
	root: {
		marginTop: theme.spacing.unit * 2,
		flex: "1 1 auto",
	},
	row: {},
	rowSummary: {
		display: "flex",
		alignItems: "center",
		paddingRight: theme.spacing.unit,
	},
	rowDetails: {},
	timerReadout: {
		flex: "1 1 auto",
		padding: `0 ${theme.spacing.unit}`,
	},
	closeButton: {
		flex: "0 0 auto",
	},
	newIncrement: {
		marginTop: theme.spacing.unit,
		display: "flex",
		alignItems: "center",
	},
	newIncrementSetter: {
		flex: "1 1 auto",
	},
	newIncrementAdd: {
		flex: "0 0 auto",
	},
});

export default styles;
