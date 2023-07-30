import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../utils/types';
import { endStroke } from '../shareActions';
import { getProject, newProject } from './api';

type SaveProjectArg = {
	projectName: string
	thumbnail: string
}

const initialState: RootState['strokes'] = []

export const saveProject = createAsyncThunk("SAVE_PROJECT", async (
	{ projectName, thumbnail }: SaveProjectArg,
	{ getState }
) => {
	try {
		const response = await newProject(projectName, (getState() as RootState)?.strokes, thumbnail);
		console.log(response);
	} catch (err) {
		console.log(err);
	}
})

export const loadProject = createAsyncThunk(
	"LOAD_PROJECT",
	async (projectId: string) => {
		try {
			const { project } = await getProject(projectId)
			return project.strokes;
		} catch (err) {
			console.error(err);
		}
	}
)

export const strokes = createSlice({
	name: 'strokes',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(endStroke, (state, action) => {
			const { historyIndex, stroke } = action.payload;
			if (historyIndex === 0) {
				state.push(stroke)
			} else {
				state.splice(-historyIndex, historyIndex, stroke)
			}
		})
	}
})

export default strokes.reducer;
