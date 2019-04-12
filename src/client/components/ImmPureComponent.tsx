import * as React from "react";
import * as Immutable from "immutable";


export default abstract class ImmPureComponent<PROPS, STATE> extends React.PureComponent<PROPS, STATE> {
	public shouldComponentUpdate(prevProps: PROPS, prevState: STATE, prevContext: any): boolean {
		return (
			this.__objChanged(this.props, prevProps) ||
			this.__objChanged(this.state, prevState) ||
			this.__objChanged(this.context, prevContext)
		);
	}

	private __objChanged<T extends { [key: string]: any }>(objA: T, objB: T): boolean {
		const aKeys = Object.keys(objA);
		const bKeys = Object.keys(objB);

		if (aKeys.length !== bKeys.length) return true;

		return !aKeys.every(key => {
			return Immutable.is(objA[key], objB[key]);
		});
	}
}
