import { StyleRulesCallback } from "@material-ui/core";

export type IncrementSetterClassKeys =
	"root" |
	"emptyField" |
	"field";

const styles: StyleRulesCallback<IncrementSetterClassKeys> = theme => ({
	root: {
		display: "flex",
		width: "100%",
		flexWrap: "wrap",
	},
	emptyField: {
		opacity: 0.25,
		transition: theme.transitions.create("opacity"),

		"&:hover": {
			opacity: 0.75,
		},
	},
	field: {
		flex: "1 1 auto",
		margin: theme.spacing.unit,
	}
});

export default styles;
