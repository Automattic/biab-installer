/* global alert */
/**
 * External dependencies
 */

import drivelist from 'drivelist';
import childwriter from 'child-writer';
import fs from 'fs';
import { ncp } from 'ncp';
import path from 'path';

const debug = require( 'debug' )( 'biab:drive-tools' );

/**
 * Internal dependencies
 */

import { gotoStage } from 'state/config/action';
import { STAGE_SELECT_DRIVE } from 'state/config/type';
import { burnProgress, setAvailableDrives, burnError, burnImageComplete, burnFinished } from 'state/drive/action';
import { getMountPoint } from 'state/drive/selector';
import { getSettingsAsText } from 'state/config/selector';
import * as unmounter from 'cli/unmount';

export function writeImage( device, image, dispatch ) {
	dispatch( burnProgress( 45, 123, 232323 ) );
	// const child = childwriter.write( image, { device: device.device }, {
	// 	validateWriteOnSuccess: false,
	// 	unmountOnSuccess: false,
	// } );
	//
	// child.on( 'error', error => {
	// 	console.error( error );  // eslint-disable-line no-console
	// 	dispatch( burnError( 'Unable to write image to SD card' ) );
	// } );
	//
	// child.on( 'done', status => {
	// 	if ( status.cancelled ) {
	// 		dispatch( gotoStage( STAGE_SELECT_DRIVE ) );
	// 	} else {
	// 		// status = { sourceChecksum = '1234' }
	// 		dispatch( burnImageComplete() );
	// 	}
	// } );
	//
	// child.on( 'progress', state => {
	// 	// { type: 'write', percentage: 34, eta: seconds, speed: bps }
	// 	if ( state.type === 'write' ) {
	// 		dispatch( burnProgress( state.percentage, state.eta, state.speed ) );
	// 	}
	// } );
}

export function updateImage( device, download, config, dispatch ) {
	const targetConfigName = path.join( getMountPoint( device ), 'biab', 'setup.conf' );
	const configData = getSettingsAsText( config.settings );

	debug( 'Saving config to ' + targetConfigName, configData );

	// Nag the user to insert the SD card - on Linux it gets unmounted after burning
	while ( ! fs.existsSync( targetConfigName ) ) {
		alert( 'Please re-insert your SD card' );
	}

	// Write config to /boot/biab/setup.conf
	fs.writeFile( targetConfigName, configData, err => {
		if ( err ) {
			debug( 'Error writing config', err );
			dispatch( burnError( 'Unable to save settings to SD card' ) );
			return;
		}

		const targetWPName = path.join( getMountPoint( device ), 'biab', 'wordpress.zip' );

		debug( `Copying WordPress from ${ download.localFile } to ${ targetWPName }` );

		// Write wordpress.zip to /boot/biab/wordpress.zip
		ncp( download.localFile, targetWPName, error => {
			if ( error ) {
				debug( 'Error copying WordPress', error );
				dispatch( burnError( 'Unable to copy WordPress to SD card' ) );
				return;
			}

			unmounter.unmountDrive( device );
			dispatch( burnFinished() );
		} );
	} );
}

export function getDriveList( dispatch ) {
	drivelist.list( ( error, drives ) => {
		if ( error ) {
			console.error( error );  // eslint-disable-line no-console
		} else {
			dispatch( setAvailableDrives( drives ) );
		}
	} );
}
