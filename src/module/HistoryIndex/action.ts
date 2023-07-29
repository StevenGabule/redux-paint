import { Stroke } from '../../utils/types';

export const UNDO = 'UNDO'
export const REDO = 'REDO'
export const END_STROKE = "END_STROKE";

export type HistoryIndexAction =
	| { type: typeof END_STROKE, payload: {stroke: Stroke, historyIndex: number} }
	| { type: typeof UNDO, payload: number }
	| { type: typeof REDO };

export const undo = (undoLimit: number) => {
	return { type: UNDO, payload: undoLimit }
}

export const redo = () => {
	return { type: REDO }
}

export const endStroke = (historyIndex: number, stroke: Stroke) => {
	return { type: END_STROKE, payload: {historyIndex, stroke} }
}
