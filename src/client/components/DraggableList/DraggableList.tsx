import styles from "./DraggableList.style";
import * as React from "react";

import { WithStyles, withStyles, Collapse } from "@material-ui/core";
import { ImmutalizerList } from "@typings/immutalizer";
import DomUtils from "@utils/DomUtils";
import UidUtils from "@utils/UidUtils";

export type RowMovedHandler = (key: string, fromRow: number, toRow: number, suggestedNewKeys: ImmutalizerList<string[]>) => void;
export type StartDragHandler = (d: React.MouseEvent) => void;
export type RowRenderer = (key: string, rowIndex: number, dragged: boolean, startDrag: StartDragHandler) => React.ReactNode;

export interface DraggableListProps extends WithStyles<typeof styles> {
	keys: ImmutalizerList<string[]>;
	rowRenderer: RowRenderer;
	rowMoved: RowMovedHandler;
}
export interface DraggableListState {
	draggedKey: string;
	dragOffset: number;
	dragPosition: number;
	dragWidth: number;
	dragHeight: number;
	dragTargetRow: number;
}

class DraggableList extends React.PureComponent<DraggableListProps, DraggableListState> {
	private static readonly LIST_PLACEHOLDER = UidUtils.generate();
	private wasDragging = false;

	private rowRefs: { [key: string]: React.RefObject<HTMLElement> } = {};

	constructor(props: DraggableListProps) {
		super(props);

		this.state = {
			draggedKey: null,
			dragOffset: 0,
			dragPosition: 0,
			dragWidth: 0,
			dragHeight: 0,
			dragTargetRow: null,
		};
	}

	public componentWillUnmount() {
		this.removeDragListeners();
	}

	public componentDidUpdate() {
		this.wasDragging = typeof this.state.draggedKey === "string";
	}

	public render(): React.ReactNode {
		const { classes, keys, rowRenderer } = this.props;
		const { dragPosition, draggedKey, dragWidth, dragHeight, dragTargetRow } = this.state;

		const dragging = this.isDragging();
		const firstFrameNotDragging = this.firstFrameNotDragging();

		this.rowRefs = {};

		const targetClassName = DomUtils.conditionalClasses({
			[classes.dragTargetListening]: dragging,
		}, classes.dragTarget);

		const topTargetClassName = DomUtils.conditionalClasses({
			[classes.dragTargetHover]: dragTargetRow === 0,
		}, targetClassName);

		return (
			<div className={classes.root}>
				<div
					className={topTargetClassName}
					onMouseEnter={this.makeTargetMouseEnterHandler(0)}
					onMouseLeave={this.targetMouseLeaveHandler} />
				{
					keys.toArray().map((key, r) => {
						const rowDragged = key === draggedKey;
						const targetPosition = r + 1;

						const rowStyle: React.CSSProperties = rowDragged ? {
							width: dragWidth,
							height: dragHeight,
							top: dragPosition,
						} : null;

						const targetStyle: React.CSSProperties = dragTargetRow === targetPosition ? {
							height: dragHeight,
						} : null;

						const placeholderStyle: React.CSSProperties = rowDragged ? {
							height: dragHeight,
						} : null;

						const rowTargetClassName = DomUtils.conditionalClasses({
							[classes.dragTargetHover]: dragging && dragTargetRow === targetPosition,
						}, targetClassName);

						const rowClassName = DomUtils.conditionalClasses({
							[classes.rowDragged]: rowDragged,
						}, classes.row);

						this.rowRefs[key] = React.createRef();

						return [
							<Collapse key={`row-${key}`} in={!rowDragged} timeout={firstFrameNotDragging ? 0 : undefined}>
								<div className={classes.rowPlaceholder} style={placeholderStyle}>
									<div ref={this.rowRefs[key] as any} className={rowClassName} style={rowStyle}>
										{rowRenderer(key, r, rowDragged, e => this.dragStart(e, key))}
									</div>
								</div>
							</Collapse>,
							<div
								key={`target-${key}`}
								style={targetStyle}
								className={rowTargetClassName}
								onMouseEnter={this.makeTargetMouseEnterHandler(targetPosition)}
								onMouseLeave={this.targetMouseLeaveHandler} />
						];
					})
				}
			</div>
		);
	}

	private isDragging(): boolean {
		return typeof this.state.draggedKey === "string";
	}

	private firstFrameNotDragging(): boolean {
		return this.wasDragging && !this.isDragging();
	}

	private makeTargetMouseEnterHandler = (row: number): React.MouseEventHandler => {
		return () => this.setState({ dragTargetRow: row });
	};

	private targetMouseLeaveHandler: React.MouseEventHandler = (): void => {
		this.setState({ dragTargetRow: null });
	};

	private dragStart = (e: React.MouseEvent, key: string) => {
		const rowEl = this.rowRefs[key].current;
		const rect = rowEl.getBoundingClientRect();

		this.setState({
			dragOffset: e.clientY - rect.top,
			draggedKey: key,
			dragPosition: rect.top,
			dragWidth: rect.width,
			dragHeight: rect.height,
		});

		this.addDragListeners();
	};

	private endDrag = () => {
		let { rowMoved, keys } = this.props;
		const { dragTargetRow, draggedKey } = this.state;

		if (typeof dragTargetRow === "number") {
			const fromRow = keys.indexOf(draggedKey);
			const toRow = dragTargetRow;

			keys = keys.set(fromRow, DraggableList.LIST_PLACEHOLDER);
			keys = keys.insert(toRow, draggedKey);

			const indexToRemove = keys.indexOf(DraggableList.LIST_PLACEHOLDER);
			keys = keys.remove(indexToRemove);

			rowMoved(draggedKey, fromRow, toRow, keys)
		}

		this.setState({
			dragOffset: 0,
			dragTargetRow: null,
			draggedKey: null,
			dragPosition: 0,
		});

		this.removeDragListeners();
	};

	private drag = (e: MouseEvent) => {
		this.setState({
			dragPosition: e.clientY - this.state.dragOffset,
		})
	};

	private addDragListeners() {
		document.addEventListener("mouseup", this.endDrag);
		document.addEventListener("mousemove", this.drag);
	}

	private removeDragListeners() {
		document.removeEventListener("mouseup", this.endDrag);
		document.removeEventListener("mousemove", this.drag);
	}
}

export default withStyles(styles)(DraggableList);
