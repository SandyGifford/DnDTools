import { StyleRulesCallback } from "@material-ui/core";

export type AppClassKeys =
	"root" |
	"bar" |
	"playControls" |
	"content";

const styles: StyleRulesCallback<AppClassKeys> = theme => ({
	root: {
		...theme.typography.body1,
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
