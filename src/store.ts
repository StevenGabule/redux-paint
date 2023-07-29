import {configureStore} from '@reduxjs/toolkit'
import { reducer as currentStroke } from './module/currentStroke/reducer'
import { reducer as historyIndex } from './module/historyIndex/reducer'
import { reducer as strokes} from './module/strokes/reducer'
import logger from 'redux-logger'

export const store = configureStore({
	reducer: {
		historyIndex,
		strokes,
		currentStroke
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})