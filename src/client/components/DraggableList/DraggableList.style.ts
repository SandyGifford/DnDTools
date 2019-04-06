import { StyleRulesCallback } from "@material-ui/core";

export type DraggableListClassKeys =
	"root" |
	"row" |
	"rowPlaceholder" |
	"rowDragged" |
	"dragTarget" |
	"dragTargetListening" |
	"dragTargetHover";

const styles: StyleRulesCallback<DraggableListClassKeys> = theme => ({
	root: {},
	row: {},
	rowPlaceholder: {},
	rowDragged: {
		position: "fixed",
		zIndex: 2,
		pointerEvents: "none",
		opacity: 0.5,
	},
	dragTarget: {
		height: 0,
		position: "relative",
		transition: theme.transitions.create("height"),

		"&::after": {
			content: "''",
			position: "absolute",
			top: -theme.spacing.unit,
			left: 0,
			right: 0,
			bottom: -theme.spacing.unit,
			zIndex: 1,

			pointerEvents: "none",
		}
	},
	dragTargetListening: {
		"&::after": {
			pointerEvents: "all",
		}
	},
	dragTargetHover: {
		height: theme.spacing.unit * 3,
	},
});

export default styles;
