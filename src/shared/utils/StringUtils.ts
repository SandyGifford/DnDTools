export default class StringUtils {
	public static padLeft(str: string, size: number, char = " "): string {
		for (str; str.length < size; str = char + str);
		return str;
	}

	public static padRight(str: string, size: number, char = " "): string {
		for (str; str.length < size; str += char);
		return str;
	}
}