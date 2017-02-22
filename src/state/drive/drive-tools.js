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
import * as unmounter from 'cli/unmount';

const escapeQuote = str => str.replace( /"/g, '\\"' );

export function writeImage( device, image, dispatch ) {
	const child = childwriter.write( image, { device: device.device }, {
		validateWriteOnSuccess: false,
		unmountOnSuccess: false,
	} );

	child.on( 'error', error => {
		console.error( error );  // eslint-disable-line no-console
		dispatch( burnError( 'Unable to write image to SD card' ) );
	} );

	child.on( 'done', status => {
		if ( status.cancelled ) {
			dispatch( gotoStage( STAGE_SELECT_DRIVE ) );
		} else {
			// status = { sourceChecksum = '1234' }
			dispatch( burnImageComplete() );
		}
	} );

	child.on( 'progress', state => {
		// { type: 'write', percentage: 34, eta: seconds, speed: bps }
		if ( state.type === 'write' ) {
			dispatch( burnProgress( state.percentage, state.eta, state.speed ) );
		}
	} );
}

function configToFile( config ) {
	const lines = [
		`SAMBA_WORKGROUP="${ config.samba }"`,
		'',
		`HOSTNAME="${ config.hostname }"`,
		`HOSTNAME_URL="${ config.hostname }.local"`,
		'',
		`NODE_VERSION=${ config.nodeVersion }`,
		'',
		`WP_USERNAME="${ config.wpUsername }"`,
		`WP_PASSWORD="${ escapeQuote( config.wpPassword ) }"`,
		`WP_EMAIL="${ escapeQuote( config.wpEmail ) }"`,
		`WP_TAGLINE="${ escapeQuote( config.wpTagline ) }"`,
		`WP_BLOG_TITLE="${ escapeQuote( config.wpTitle ) }"`,
		'',
		`MYSQL_ROOT_PASSWORD="${ escapeQuote( config.mysqlRootPassword ) }"`,
		`MYSQL_WP_USER="${ config.mysqlWpUser }"`,
		`MYSQL_WP_PASSWORD="${ escapeQuote( config.mysqlWpPassword ) }"`,
		`MYSQL_WP_DATABASE="${ config.mysqlWpDatabase }"`,
		'',
		`PI_USER_PASSWORD="${ escapeQuote( config.piPassword ) }"`,
		'',
		`SSH_KEY="${ escapeQuote( config.sshKey ) }"`,
		'',
		`WIFI_NETWORK="${ config.wifiNetwork }"`,
		`WIFI_PASSWORD="${ config.wifiPassword }"`,
		'WIFI_MGMT=WPA-PSK',
		'WIFI_PSK=PSK',
		'',
		`TIMEZONE=${ config.timezone }`,
		`LOCALE=${ config.locale }`,
	];

	return lines.join( '\n' );
}

export function updateImage( device, download, config, dispatch ) {
	const targetConfigName = path.join( getMountPoint( device ), 'biab', 'setup.conf' );
	const configData = configToFile( config.settings );

	debug( 'Saving config to ' + targetConfigName, configData );

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
