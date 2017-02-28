/**
 * External dependencies
 */

import {
	applyMiddleware,
	createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { driveMiddleware } from 'state/drive/middleware';
import { downloadMiddleware } from 'state/download/middleware';
import { configMiddleware } from 'state/config/middleware';
import { initialActions } from './initial';

/**
 * Internal dependencies
 */

const composeEnhancers = composeWithDevTools( {
	name: 'Blog In A Box'
} );

const middlewares = [
	thunk,
	driveMiddleware,
	downloadMiddleware,
	configMiddleware,
];

export default function createReduxStore( initialState = {} ) {
	const store = createStore(
		reducers,
		initialState,
		composeEnhancers( applyMiddleware( ...middlewares ) )
	);

	if ( module.hot ) {
		module.hot.accept( './reducers', () => {
			store.replaceReducer( require( './reducers' ) );
		} );
	}

	initialActions( store );

	return store;
}
