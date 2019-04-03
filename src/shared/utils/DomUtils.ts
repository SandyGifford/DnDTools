export default class DomUtils {
	public static classList(...classNames: string[]): string {
		return classNames.filter(className => !!className).join(" ");
	}

	public static conditionalClasses(conditionals: { [className: string]: boolean }, ...always: string[]): string {
		return always.concat(
			Object.keys(conditionals)
				.filter(className => conditionals[className])
		)
			.join(" ");
	}
}