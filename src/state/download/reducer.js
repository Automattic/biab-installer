/**
 * Internal dependencies
 */

import {
	DOWNLOAD_CHECK,
	DOWNLOAD_START,
	DOWNLOAD_COMPLETE,
	DOWNLOAD_ERROR,
	DOWNLOAD_PROGRESS,

	DOWNLOAD_STATUS_DOWNLOADING,
	DOWNLOAD_STATUS_COMPLETE,
	DOWNLOAD_STATUS_ERROR,
} from './type';
import { getResource } from './selector';

function replaceResources( resources, name, newResource ) {
	const pos = resources.findIndex( item => item.name === name );

	if ( pos !== -1 ) {
		return [].concat( resources.slice( 0, pos ), [ newResource ], resources.slice( pos + 1 ) );
	}

	return resources;
}

function setResource( state, action, replacement ) {
	const existing = getResource( action.name, state.resources );
	const updatedResource = Object.assign( {}, existing, replacement );

	return { ... state, resources: replaceResources( state.resources, action.name, updatedResource ) };
}

export default function Download( state = {}, action ) {
	switch ( action.type ) {
		case DOWNLOAD_CHECK:
			return { ... state, resources: state.resources.concat( [ action.resource ] ) };

		case DOWNLOAD_START:
			return setResource( state, action, { progress: 0, status: DOWNLOAD_STATUS_DOWNLOADING, url: action.url, available: action.version } );

		case DOWNLOAD_PROGRESS:
			return setResource( state, action, { progress: action.progress, status: DOWNLOAD_STATUS_DOWNLOADING } );

		case DOWNLOAD_COMPLETE:
			return setResource( state, action, { status: DOWNLOAD_STATUS_COMPLETE, progress: 100, installed: action.version } );

		case DOWNLOAD_ERROR:
			return setResource( state, action, { status: DOWNLOAD_STATUS_ERROR } );
	}

	return state;
}
