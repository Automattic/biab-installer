/* global localStorage */
/**
 * External dependencies
 */

import request from 'request';
import fs from 'fs';

const debug = require( 'debug' )( 'biab:download:action' );

/**
 * Internal dependencies
 */
import {
	downloadCheck,
	downloadError,
	downloadComplete,
	downloadStart,
	downloadProgress,
} from './action';
import { DOWNLOAD_TYPE_WORDPRESS, DOWNLOAD_TYPE_RASPBIAN, DOWNLOAD_START_CHECK } from './type';
import { CONFIG_CLEAR_ALL } from 'state/config/type';
import { getWordPressResource, getRaspbianResource } from './selector';

const WP_VERSION = 'https://api.wordpress.org/core/version-check/1.7/';
const RASPBIAN_VERSION = 'https://raw.githubusercontent.com/tinkertinker/biab-raspbian/dev/package.json';
const raspbianRelease = version => `https://github.com/tinkertinker/biab-raspbian/releases/download/v${ version }/blog-in-a-box.zip`;

function checkNewVersion( checkUrl, existingDownload, dispatch, versionExtract, downloadExtract ) {
	dispatch( downloadCheck( existingDownload ) );

	debug( `Checking for new version of ${ existingDownload.title }: ${ checkUrl } for ${ existingDownload.localFile }` );

	// Check for new version
	request( checkUrl, ( error, response ) => {
		if ( error ) {
			dispatch( downloadError( existingDownload.name ) );
			return;
		}

		const resp = JSON.parse( response.body );
		const latest = versionExtract( resp );

		debug( `${ existingDownload.name } current=${ existingDownload.installed } latest=${ latest }` );

		if ( existingDownload.installed !== latest ) {
			downloadFile( existingDownload, downloadExtract( resp ), latest, dispatch );
		} else {
			dispatch( downloadComplete( existingDownload.name, existingDownload.installed ) );
		}
	} );
}

function downloadFile( existingDownload, url, version, dispatch ) {
	const tmpFile = existingDownload.localFile + '.tmp';

	debug( 'Downloading v' + version + ' from ' + url + ' to ' + existingDownload.localFile );
	dispatch( downloadStart( existingDownload.name, url, version ) );

	const out = fs.createWriteStream( tmpFile, { autoClose: true } );
	let total = 0;
	let current = 0;

	const req = request( {
		method: 'GET',
		uri: url,
	} );

	req.pipe( out );

	req.on( 'response', response => {
		if ( response.statusCode === 200 ) {
			total = parseInt( response.headers[ 'content-length' ], 10 );
		}
	} );

	req.on( 'data', chunk => {
		current += parseInt( chunk.length, 10 );

		const progress = total > 0 ? Math.round( ( current / total ) * 100 ) : 0;

		dispatch( downloadProgress( existingDownload.name, progress ) );
	} );

	req.on( 'end', () => {
		if ( total > 0 ) {
			fs.renameSync( tmpFile, existingDownload.localFile );
			localStorage.setItem( 'installed-' + existingDownload.name, version );

			dispatch( downloadComplete( existingDownload.name, version ) );
		} else {
			try {
				fs.unlinkSync( tmpFile );
			} catch ( e ) {
			}

			dispatch( downloadError( existingDownload.name ) );
		}
	} );

	req.on( 'error', () => {
		try {
			fs.unlinkSync( tmpFile );
		} catch ( e ) {
		}

		dispatch( downloadError( existingDownload.name ) );
	} );
}

export const downloadMiddleware = store => next => action => {
	if ( action.type === DOWNLOAD_START_CHECK ) {
		if ( action.name === DOWNLOAD_TYPE_WORDPRESS ) {
			checkNewVersion( WP_VERSION, getWordPressResource(), store.dispatch, json => json.offers[ 0 ].version, json => json.offers[ 0 ].download );
		} else if ( action.name === DOWNLOAD_TYPE_RASPBIAN ) {
			checkNewVersion( RASPBIAN_VERSION, getRaspbianResource(), store.dispatch, json => json.version, json => raspbianRelease( json.version ) );
		}
	} else if ( action.type === CONFIG_CLEAR_ALL ) {
		[ getWordPressResource(), getRaspbianResource() ].map( resource => {
			debug( 'Deleting ' + resource.localFile );

			try {
				fs.unlinkSync( resource.localFile );
			} catch ( e ) {
			}

			localStorage.removeItem( 'installed-' + resource.name );
		} );
	}

	return next( action );
};
