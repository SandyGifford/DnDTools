import { StyleRulesCallback } from "@material-ui/core";

export type GameClassKeys =
	"root" |
	"swipable" |
	"bar" |
	"playControls" |
	"content";

const styles: StyleRulesCallback<GameClassKeys> = theme => ({
	root: {
		...theme.typography.body1,
	},
	swipable: {
		marginTop: theme.spacing.unit
	},
	bar: {
		...theme.mixins.toolbar,
	},
	playControls: {
		marginLeft: theme.spacing.unit * 2,
	},
	content: {},
});

export default styles;
