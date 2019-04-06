import { StyleRulesCallback } from "@material-ui/core";

export type TimerControlsClassKeys =
	"root" |
	"button" |
	"dropdown";

const styles: StyleRulesCallback<TimerControlsClassKeys> = theme => ({
	root: {},
	button: {
		borderRadius: 0,
		boxShadow: "none",

		"&:first-child": {
			borderTopLeftRadius: theme.shape.borderRadius,
			borderBottomLeftRadius: theme.shape.borderRadius,
		},

		"&:last-child": {
			borderTopRightRadius: theme.shape.borderRadius,
			borderBottomRightRadius: theme.shape.borderRadius,
		},
	},
	dropdown: {
		minWidth: "auto",
		paddingLeft: theme.spacing.unit / 2,
		paddingRight: 0,
	},
});

export default styles;
