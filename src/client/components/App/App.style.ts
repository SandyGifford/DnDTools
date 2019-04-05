import { StyleRulesCallback } from "@material-ui/core";

export type AppClassKeys =
	"root" |
	"bar" |
	"content";

const styles: StyleRulesCallback<AppClassKeys> = theme => ({
	root: {
		...theme.typography.body1,
	},
	bar: {
		...theme.mixins.toolbar,
	},
	content: {},
});

export default styles;
