import { StyleRulesCallback } from "@material-ui/core";

export type TimelineClassKeys =
	"root" |
	"event" |
	"cursor" |
	"eventLabel";

const styles: StyleRulesCallback<TimelineClassKeys> = theme => ({
	root: {
		overflow: "hidden",
		position: "relative",
		transition: theme.transitions.create("height"),
	},
	cursor: {
		position: "absolute",
		top: 0,
		left: "50%",
		bottom: 0,
		borderLeft: "1px solid #CCC",
	},
	event: {
		position: "absolute",
		transition: theme.transitions.create(["left", "top", "background"]),
	},
	eventLabel: {
		flex: "1 1 auto",
		textOverflow: "ellipsis",
		overflow: "hidden",
		display: "block",
	},
});

export default styles;
