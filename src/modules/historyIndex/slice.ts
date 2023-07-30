import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../utils/types';
import { endStroke } from '../shareActions';

export const historyIndex = createSlice({
	name: "historyIndex",
	initialState: 0,
	reducers: {
		undo: (state, action: PayloadAction<number>) => {
			return Math.min(state + 1, action.payload)
		},
		redo: (state) => {
			return Math.max(state - 1, 0)
		}
	},
	extraReducers: (builders) => {
		builders.addCase(endStroke, () => {
			return 0
		});
	}
});

export default historyIndex.reducer;
export const {undo, redo} = historyIndex.actions;
export const historyIndexSelector = (state: RootState) => state.historyIndex;
