import { RootState } from '../../utils/types';
import { END_STROKE, HistoryIndexAction, REDO, UNDO } from './action';

export const historyIndexSelector = (state: RootState) => state.historyIndex;

export const reducer = (state: RootState['historyIndex'] = 0, action: HistoryIndexAction) => {
	switch (action.type) {
		case END_STROKE:
			return 0;
			case UNDO:
				return Math.min(state + 1, action.payload)
			case REDO:
				return Math.max(state - 1, 0)
		default:
			return state;
	}
}