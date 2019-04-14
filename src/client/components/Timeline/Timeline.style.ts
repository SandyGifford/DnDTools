import { StyleRulesCallback } from "@material-ui/core";

export type TimelineClassKeys =
	"root" |
	"row" |
	"event" |
	"eventLabel";

const styles: StyleRulesCallback<TimelineClassKeys> = theme => ({
	root: {
		overflow: "hidden",
	},
	row: {
		position: "relative",
		marginBottom: theme.spacing.unit,
		height: theme.spacing.unit * 4,
	},
	event: {
		position: "absolute",
		color: "white",
		textAlign: "left",
		transition: theme.transitions.create(["left", "top"]),
	},
	eventLabel: {
		flex: "1 1 auto",
	},
});

export default styles;
