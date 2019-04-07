import { StyleRulesCallback } from "@material-ui/core";

export type LoadingClassKeys =
	"root" |
	"center";

const styles: StyleRulesCallback<LoadingClassKeys> = theme => ({
	root: {
		width: "100%",
		height: "100%",
	},
	center: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
});

export default styles;
