import { StyleRulesCallback } from "@material-ui/core";

export type SetTimeClassKeys =
	"root" |
	"setter" |
	"button";

const styles: StyleRulesCallback<SetTimeClassKeys> = theme => ({
	root: {
		display: "flex",
	},
	setter: {
		flex: "1 1 auto",
	},
	button: {
		flex: "0 0 auto",
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	},
});

export default styles;
