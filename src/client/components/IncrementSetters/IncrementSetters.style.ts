import { StyleRulesCallback } from "@material-ui/core";

export type IncrementSettersClassKeys =
	"root" |
	"row" |
	"setter" |
	"rowIcon";

const styles: StyleRulesCallback<IncrementSettersClassKeys> = theme => ({
	root: {
		marginTop: theme.spacing.unit * 2,
	},
	row: {
		display: "flex",
		alignItems: "center",
		paddingRight: theme.spacing.unit,
		position: "relative",
		paddingBottom: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,

		"&::after": {
			content: "''",
			position: "absolute",
			bottom: 0,
			left: theme.spacing.unit * 5,
			right: theme.spacing.unit * 5,
			borderBottom: `1px solid ${theme.palette.grey[400]}`,
		},

		"&:last-child": {
			paddingBottom: 0,

			"&::after": {
				borderBottom: "none",
			},
		},
	},
	setter: {
		flex: "1 1 auto",
	},
	rowIcon: {
		flex: "0 0 auto",
		margin: theme.spacing.unit * 2,
		cursor: "pointer",
	},
});

export default styles;
