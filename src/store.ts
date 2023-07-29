import { applyMiddleware, legacy_createStore as createStore, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import { reducer as historyIndex } from './module/HistoryIndex/reducer'
import { reducer as currentStroke } from './module/currentStroke/reducer'
import { reducer as strokes } from './module/strokes/reducer'

import {logger} from 'redux-logger';

export const store = createStore(
	combineReducers({historyIndex, currentStroke, strokes }), 
	composeWithDevTools(applyMiddleware(logger))
);
