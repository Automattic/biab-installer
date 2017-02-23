/* global Notification */
/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:drive:middleware' );

/**
 * Internal dependencies
 */

import { DRIVE_SELECTOR_SHOW, DRIVE_BURN_FINISHED, DRIVE_SELECTOR_HIDE, DRIVE_SELECT } from './type';
import { getDriveList } from './drive-tools';

const DRIVE_PING = 2000;
let driveChecker = false, firstTime = true;

function disableDriveCheck() {
	debug( 'Disabling drive check' );
	driveChecker = false;
}

function enableDriveCheck( dispatch ) {
	const checker = () => {
		getDriveList( dispatch );

		if ( driveChecker ) {
			setTimeout( checker, DRIVE_PING );
		}
	};

	debug( 'Enabling drive check' );
	driveChecker = true;
	checker();
}

export const driveMiddleware = store => next => action => {
	if ( firstTime ) {
		debug( 'First drive check' );
		getDriveList( store.dispatch );
		firstTime = false;
	}

	if ( action.type === DRIVE_SELECTOR_SHOW ) {
		enableDriveCheck( store.dispatch );
	} else if ( action.type === DRIVE_SELECTOR_HIDE || action.type === DRIVE_SELECT ) {
		disableDriveCheck();
	}

	if ( action.type === DRIVE_BURN_FINISHED ) {
		debug( 'Showing complete notification' );
		const n = new Notification( 'Blog In A Box has finished!', {
			body: 'Blog In A Box has been copied to your SD card',
		} );
	}

	return next( action );
};
