import { StyleRulesCallback } from "@material-ui/core";

export type AppClassKeys =
	"root";

const styles: StyleRulesCallback<AppClassKeys> = theme => ({
	root: {
		...theme.typography.body1,
	},
});

export default styles;
