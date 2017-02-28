/**
 * External dependencies
 */

const { dialog, app } = require( 'electron' ).remote;
const debug = require( 'debug' )( 'biab:config:middleware' );

/**
 * Internal dependencies
 */

import { CONFIG_PICK_SSH } from 'state/config/type';
import { changeSetting } from 'state/config/action';

function getDefaultPath() {
	if ( process.env.HOME ) {
		return process.env.HOME + '/.ssh/';
	}

	return app.getPath( 'home' );
}

export const configMiddleware = store => next => action => {
	if ( action.type === CONFIG_PICK_SSH ) {
		debug( 'Showing SSH selector' );

		const file = dialog.showOpenDialog( {
			title: 'Pick your SSH public key',
			defaultPath: getDefaultPath(),
			filters: [ { name: 'SSH Public Key', extensions: [ 'pub' ] } ],
			properties: [ 'openFile', 'showHiddenFiles' ],
		} );

		if ( file ) {
			store.dispatch( changeSetting( 'sshKey', file[ 0 ] ) );
		}
	}

	return next( action );
};
