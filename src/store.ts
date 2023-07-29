import {configureStore} from '@reduxjs/toolkit'
import { currentStroke } from './module/currentStroke/slice'
import historyIndex from './module/historyIndex/slice'
import strokes from './module/strokes/slice'
import logger from 'redux-logger'

export const store = configureStore({
	reducer: {
		historyIndex,
		strokes,
		currentStroke
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})